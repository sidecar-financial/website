import "server-only";
import { interestLabel, type LeadPayload } from "@/lib/leads";

/**
 * Adds a row to the Notion "Website Leads" database. A Notion automation on that database
 * ("page added" where Status = New) posts each row to Slack; that is configured in Notion, not here.
 *
 * Expected database properties (names must match exactly):
 *   Name (title) · Email (email) · Company (text) · Interest (select) · Source page (text)
 *   · Status (select: New / Contacted / Spam)
 * "Time" is the database's built-in Created time column.
 *
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

export async function createNotionLead(lead: LeadPayload, spam: boolean): Promise<void> {
  const interest = interestLabel(lead.interest);
  const properties: Record<string, unknown> = {
    Name: { title: [{ text: { content: (lead.fullName || lead.email).slice(0, 200) } }] },
    Email: { email: lead.email },
    Company: text(lead.company),
    "Source page": text(`${SOURCE_LABEL[lead.source]} (${lead.pagePath || "unknown page"})`),
    Status: { select: { name: spam ? "Spam" : "New" } },
  };
  if (interest) properties.Interest = { select: { name: interest.replace(" (coming soon)", "") } };

  const res = await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      parent: { database_id: process.env.NOTION_LEADS_DATABASE_ID },
      properties,
    }),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`Notion create page -> ${res.status} ${(await res.text()).slice(0, 300)}`);
}
