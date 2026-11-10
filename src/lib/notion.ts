import "server-only";
import { CONSENT_LABEL, interestLabel, type LeadPayload } from "@/lib/leads";

/**
 * Adds a row to the Notion "Website Leads" database. A Notion automation on that database
 * ("page added" where Status = New) posts each row to Slack; that is configured in Notion, not here.
 *
 * Expected database properties (names must match exactly):
 *   Name (title) · Email (email) · Company (text) · Interest (select) · Source page (text)
 *   · Status (select: New / Contacted / Spam / Partial)
 *   · Consent (select: Not submitted / Submitted)
 *   · HubSpot contact (url): link to the contact record, set after the fact by the leads route
 *     (see lib/hubspot-link.ts). Optional: the site works without it.
 * "Time" is the database's built-in Created time column.
 *
 * Partial leads (name + email entered, submit not clicked) are saved as Status = Partial, never New,
 * so they do not trigger the Slack automation. When the visitor does submit, a fresh New row is
 * created (which fires the automation) and the Partial row for that email is archived.
 *
 * Run `scripts/setup-consent-fields.mjs` once to add the Consent property, and
 * `scripts/setup-hubspot-link-field.mjs` once to add the HubSpot contact property.
 * Needs a Notion internal integration shared with the database.
 */

const SOURCE_LABEL: Record<LeadPayload["source"], string> = {
  demo: "Demo form",
  "waterfall-waitlist": "Waterfall waitlist",
};

export function isNotionConfigured() {
  return Boolean(process.env.NOTION_API_KEY && process.env.NOTION_LEADS_DATABASE_ID);
}

/** Notion is normally fast; this only bounds the worst case so a request can never hang. */
const NOTION_TIMEOUT_MS = 15_000;

/** A second submit from the same email inside this window (retry, double click) is not a new lead. */
const DUPLICATE_WINDOW_MS = 10 * 60 * 1000;

const text = (content: string) => ({ rich_text: content ? [{ text: { content: content.slice(0, 1900) } }] : [] });

async function notion<T>(path: string, method: "POST" | "PATCH", body: unknown): Promise<T> {
  const res = await fetch(`https://api.notion.com/v1${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(NOTION_TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`Notion ${method} ${path} -> ${res.status} ${(await res.text()).slice(0, 300)}`);
  return (await res.json()) as T;
}

type QueryResult = { results: { id: string }[] };

/** Rows in the leads database with this email, optionally only those with a given Status. */
async function findRows(email: string, status?: string): Promise<string[]> {
  const filters: unknown[] = [{ property: "Email", email: { equals: email } }];
  if (status) filters.push({ property: "Status", select: { equals: status } });
  const found = await notion<QueryResult>(`/databases/${process.env.NOTION_LEADS_DATABASE_ID}/query`, "POST", {
    filter: { and: filters },
    page_size: 10,
  });
  return found.results.map((r) => r.id);
}

/** New rows for this email created in the last few minutes (used to collapse retries and double clicks). */
async function findRecentNewRows(email: string): Promise<string[]> {
  const since = new Date(Date.now() - DUPLICATE_WINDOW_MS).toISOString();
  const found = await notion<QueryResult>(`/databases/${process.env.NOTION_LEADS_DATABASE_ID}/query`, "POST", {
    filter: {
      and: [
        { property: "Email", email: { equals: email } },
        { property: "Status", select: { equals: "New" } },
        { timestamp: "created_time", created_time: { on_or_after: since } },
      ],
    },
    page_size: 1,
  });
  return found.results.map((r) => r.id);
}

/**
 * Best-effort write of properties onto an existing row (used for the "HubSpot contact" link). Throws on
 * failure; linkNotionRowToHubSpot turns that into a result so callers never see it.
 */
export async function updateNotionRowProperties(pageId: string, properties: Record<string, unknown>): Promise<void> {
  await notion(`/pages/${pageId}`, "PATCH", { properties });
}

/**
 * Records the lead and returns the id of the row that now represents it (the new row, or the
 * existing one when this is a repeat/duplicate), so the caller can link it to HubSpot. Undefined
 * only when no row could be identified.
 */
export async function createNotionLead(
  lead: LeadPayload,
  spam: boolean,
  /** The form was submitted faster than a person usually types; kept as a real lead, flagged for review. */
  fast = false,
): Promise<string | undefined> {
  const partial = lead.stage === "partial";

  // One Partial row per email is enough; do not add another if this email is already recorded.
  if (partial) {
    const existingRows = await findRows(lead.email);
    if (existingRows.length > 0) return existingRows[0];
  }

  // The visitor already submitted moments ago (a retry after a slow response, or a double click):
  // keep the one row, but still clear their earlier Partial row below.
  const recentRows = !partial && !spam ? await findRecentNewRows(lead.email) : [];
  const alreadyRecorded = recentRows.length > 0;
  let pageId: string | undefined = recentRows[0];

  const interest = interestLabel(lead.interest);
  const properties: Record<string, unknown> = {
    Name: { title: [{ text: { content: (lead.fullName || lead.email).slice(0, 200) } }] },
    Email: { email: lead.email },
    Company: text(lead.company),
    "Source page": text(
      `${SOURCE_LABEL[lead.source]} (${lead.pagePath || "unknown page"})${fast ? " [fast submit: worth a quick look]" : ""}`,
    ),
    Status: { select: { name: partial ? "Partial" : spam ? "Spam" : "New" } },
    Consent: { select: { name: CONSENT_LABEL[lead.stage] } },
  };
  if (interest) properties.Interest = { select: { name: interest.replace(" (coming soon)", "") } };

  const parent = { database_id: process.env.NOTION_LEADS_DATABASE_ID };
  if (!alreadyRecorded) {
    try {
      pageId = (await notion<{ id: string }>("/pages", "POST", { parent, properties })).id;
    } catch (error) {
      // Consent column not added yet: still record the lead rather than losing it.
      if (!String(error).includes("Consent is not a property")) throw error;
      console.error("[leads] Notion 'Consent' property is missing; run scripts/setup-consent-fields.mjs");
      const withoutConsent = { ...properties };
      delete withoutConsent.Consent;
      pageId = (await notion<{ id: string }>("/pages", "POST", { parent, properties: withoutConsent })).id;
    }
  }

  if (!partial) {
    // The visitor finished: drop the earlier Partial row for this email. Best effort; a leftover
    // Partial row is harmless and the real lead is already recorded.
    try {
      const stale = await findRows(lead.email, "Partial");
      await Promise.all(stale.map((id) => notion(`/pages/${id}`, "PATCH", { archived: true })));
    } catch (error) {
      console.error("[leads] could not archive partial Notion row:", error);
    }
  }
  return pageId;
}
