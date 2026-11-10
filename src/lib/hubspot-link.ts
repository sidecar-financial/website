/**
 * Links a Notion "Website Leads" row to the person's HubSpot contact record (which also shows the
 * associated company). Pure helpers plus one small orchestration function; no network of its own.
 *
 * The Notion column is a URL property named exactly "HubSpot contact". It is written as a separate,
 * best-effort step after the Notion row and the HubSpot contact both exist, so neither sink ever
 * depends on the other and a failure here is only ever logged, never shown to the visitor.
 */

/** The Navable HubSpot portal (also used by the tracking script, see lib/site.ts). */
export const DEFAULT_HUBSPOT_PORTAL_ID = "43584751";

export const NOTION_LINK_PROPERTY = "HubSpot contact";

type Env = Record<string, string | undefined>;

/** Portal id from HUBSPOT_PORTAL_ID, falling back to the Navable portal. */
export function hubspotPortalId(env: Env = process.env): string {
  return env.HUBSPOT_PORTAL_ID?.trim() || DEFAULT_HUBSPOT_PORTAL_ID;
}

/** Contact record URL, or null when either id is not a plain number (never build a bad link). */
export function hubspotContactUrl(contactId: string, portalId: string = DEFAULT_HUBSPOT_PORTAL_ID): string | null {
  if (!/^\d+$/.test(contactId) || !/^\d+$/.test(portalId)) return null;
  return `https://app.hubspot.com/contacts/${portalId}/record/0-1/${contactId}`;
}

/** Notion page properties that set the link column. */
export function hubspotLinkProperty(url: string) {
  return { [NOTION_LINK_PROPERTY]: { url } };
}

/** Notion rejects a write to a column that does not exist (schema not updated in this environment). */
export function isMissingLinkPropertyError(error: unknown): boolean {
  return String(error).includes(`${NOTION_LINK_PROPERTY} is not a property`);
}

export type LinkResult =
  | { status: "linked"; url: string }
  | { status: "skipped"; reason: string }
  | { status: "missing-property" }
  | { status: "failed"; error: unknown };

/**
 * Writes the HubSpot link onto the Notion row when both ids are known. Never throws: `write` errors
 * come back as a result so the caller can log them and carry on.
 */
export async function linkNotionRowToHubSpot(args: {
  spam: boolean;
  contactId: string | undefined;
  pageId: string | undefined;
  portalId?: string;
  write: (pageId: string, properties: Record<string, unknown>) => Promise<unknown>;
}): Promise<LinkResult> {
  const { spam, contactId, pageId, portalId, write } = args;
  if (spam) return { status: "skipped", reason: "spam lead is not sent to HubSpot" };
  if (!contactId) return { status: "skipped", reason: "no HubSpot contact id" };
  if (!pageId) return { status: "skipped", reason: "no Notion page id" };
  const url = hubspotContactUrl(contactId, portalId);
  if (!url) return { status: "skipped", reason: "HubSpot contact id or portal id is not numeric" };
  try {
    await write(pageId, hubspotLinkProperty(url));
    return { status: "linked", url };
  } catch (error) {
    return isMissingLinkPropertyError(error) ? { status: "missing-property" } : { status: "failed", error };
  }
}
