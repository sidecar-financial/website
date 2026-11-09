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
 * "Time" is the database's built-in Created time column.
 *
 * Partial leads (name + email entered, submit not clicked) are saved as Status = Partial, never New,
 * so they do not trigger the Slack automation. When the visitor does submit, a fresh New row is
 * created (which fires the automation) and the Partial row for that email is archived.
 *
 * Run `scripts/setup-consent-fields.mjs` once to add the Consent property.
 * Needs a Notion internal integration shared with the database.
 */

const SOURCE_LABEL: Record<LeadPayload["source"], string> = {
  demo: "Demo form",
  "waterfall-waitlist": "Waterfall waitlist",
};

export function isNotionConfigured() {
  return Boolean(process.env.NOTION_API_KEY && process.env.NOTION_LEADS_DATABASE_ID);
}

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
    signal: AbortSignal.timeout(8000),
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

export async function createNotionLead(lead: LeadPayload, spam: boolean): Promise<void> {
  const partial = lead.stage === "partial";

  // One Partial row per email is enough; do not add another if this email is already recorded.
  if (partial && (await findRows(lead.email)).length > 0) return;

  const interest = interestLabel(lead.interest);
  const properties: Record<string, unknown> = {
    Name: { title: [{ text: { content: (lead.fullName || lead.email).slice(0, 200) } }] },
    Email: { email: lead.email },
    Company: text(lead.company),
    "Source page": text(`${SOURCE_LABEL[lead.source]} (${lead.pagePath || "unknown page"})`),
    Status: { select: { name: partial ? "Partial" : spam ? "Spam" : "New" } },
    Consent: { select: { name: CONSENT_LABEL[lead.stage] } },
  };
  if (interest) properties.Interest = { select: { name: interest.replace(" (coming soon)", "") } };

  const parent = { database_id: process.env.NOTION_LEADS_DATABASE_ID };
  try {
    await notion("/pages", "POST", { parent, properties });
  } catch (error) {
    // Consent column not added yet: still record the lead rather than losing it.
    if (!String(error).includes("Consent is not a property")) throw error;
    console.error("[leads] Notion 'Consent' property is missing; run scripts/setup-consent-fields.mjs");
    const withoutConsent = { ...properties };
    delete withoutConsent.Consent;
    await notion("/pages", "POST", { parent, properties: withoutConsent });
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
}
