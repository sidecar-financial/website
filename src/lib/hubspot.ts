import "server-only";
import { fillBlankProperties } from "@/lib/contact-merge";
import { splitName, type LeadPayload } from "@/lib/leads";

/**
 * Creates (or updates) a HubSpot contact + company and links them. Company + contact only:
 * deals are created manually by the sales team.
 *
 * Needs a private-app token with scopes:
 *   crm.objects.contacts.read / .write, crm.objects.companies.read / .write
 */

const API = "https://api.hubapi.com";

/** HubSpot is normally fast; this only bounds the worst case so a request can never hang. */
const HUBSPOT_TIMEOUT_MS = 15_000;

/** Personal-mail domains are never a company's website domain. */
const FREE_MAIL = new Set([
  "gmail.com", "googlemail.com", "yahoo.com", "outlook.com", "hotmail.com", "live.com",
  "icloud.com", "me.com", "aol.com", "proton.me", "protonmail.com", "msn.com",
]);

export function isHubSpotConfigured() {
  return Boolean(process.env.HUBSPOT_PRIVATE_APP_TOKEN);
}

async function hs<T>(path: string, init: RequestInit): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${process.env.HUBSPOT_PRIVATE_APP_TOKEN}`,
      "Content-Type": "application/json",
    },
    signal: AbortSignal.timeout(HUBSPOT_TIMEOUT_MS),
  });
  if (!res.ok) {
    throw new Error(`HubSpot ${init.method} ${path} -> ${res.status} ${(await res.text()).slice(0, 300)}`);
  }
  return (res.status === 204 ? undefined : await res.json()) as T;
}

type SearchResult = { results: { id: string }[] };

async function findOrCreateCompany(name: string, domain: string | null): Promise<string> {
  // Prefer the domain (HubSpot's own dedupe key); fall back to the exact name.
  const filter = domain
    ? { propertyName: "domain", operator: "EQ", value: domain }
    : { propertyName: "name", operator: "EQ", value: name };
  const found = await hs<SearchResult>("/crm/v3/objects/companies/search", {
    method: "POST",
    body: JSON.stringify({ filterGroups: [{ filters: [filter] }], limit: 1 }),
  });
  if (found.results[0]) return found.results[0].id;

  const created = await hs<{ id: string }>("/crm/v3/objects/companies", {
    method: "POST",
    body: JSON.stringify({ properties: { name, ...(domain ? { domain } : {}) } }),
  });
  return created.id;
}

type ExistingContact = { id: string; properties: Record<string, string | null> };

const FILLABLE_PROPERTIES = ["firstname", "lastname", "company", "hs_lead_status"];

async function findContact(email: string): Promise<ExistingContact | null> {
  const found = await hs<{ results: ExistingContact[] }>("/crm/v3/objects/contacts/search", {
    method: "POST",
    body: JSON.stringify({
      filterGroups: [{ filters: [{ propertyName: "email", operator: "EQ", value: email }] }],
      properties: FILLABLE_PROPERTIES,
      limit: 1,
    }),
  });
  return found.results[0] ?? null;
}

export async function createHubSpotLead(lead: LeadPayload): Promise<void> {
  const { firstName, lastName } = splitName(lead.fullName);
  const emailDomain = lead.email.split("@")[1]?.toLowerCase() ?? "";
  const domain = emailDomain && !FREE_MAIL.has(emailDomain) ? emailDomain : null;
  const partial = lead.stage === "partial";

  const existing = await findContact(lead.email);

  // A half-finished form only ever creates a brand-new contact: it must never overwrite or
  // downgrade a contact that already exists (e.g. someone who submitted earlier).
  if (partial && existing) return;

  const incoming: Record<string, string> = {};
  if (firstName) incoming.firstname = firstName;
  if (lastName) incoming.lastname = lastName;
  if (lead.company) incoming.company = lead.company;
  // Partial leads are not given a lead status, so sales does not treat them as inbound requests.
  if (!partial) incoming.hs_lead_status = "NEW";

  let contactId: string | undefined;
  if (existing) {
    // A repeat submit from someone already in HubSpot: only fill in what is blank. Names, companies
    // and lead statuses people already have are never replaced by what a form visitor typed.
    const update = fillBlankProperties(existing.properties, incoming);
    if (Object.keys(update).length > 0) {
      await hs(`/crm/v3/objects/contacts/${existing.id}`, {
        method: "PATCH",
        body: JSON.stringify({ properties: update }),
      });
    }
    contactId = existing.id;
  } else {
    const contact = await hs<{ results: { id: string }[] }>("/crm/v3/objects/contacts/batch/upsert", {
      method: "POST",
      body: JSON.stringify({ inputs: [{ idProperty: "email", id: lead.email, properties: { email: lead.email, ...incoming } }] }),
    });
    contactId = contact.results[0]?.id;
  }
  if (!contactId) throw new Error("HubSpot contact has no id");

  // Waitlist signups have no company name; the contact alone is still a valid lead.
  // Partial leads stay contact-only: no company record until the visitor submits.
  if (!lead.company || partial) return;
  // A contact that already has a company keeps it; do not attach a second, newly typed one.
  if ((existing?.properties.company ?? "").trim() !== "") return;

  const companyId = await findOrCreateCompany(lead.company, domain);
  await hs(`/crm/v4/objects/contacts/${contactId}/associations/default/companies/${companyId}`, {
    method: "PUT",
  });
}
