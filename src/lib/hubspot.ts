import "server-only";
import { splitName, type LeadPayload } from "@/lib/leads";

/**
 * Creates (or updates) a HubSpot contact + company and links them. Company + contact only:
 * deals are created manually by the sales team.
 *
 * Needs a private-app token with scopes:
 *   crm.objects.contacts.read / .write, crm.objects.companies.read / .write
 */

const API = "https://api.hubapi.com";

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
    signal: AbortSignal.timeout(8000),
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

export async function createHubSpotLead(lead: LeadPayload): Promise<void> {
  const { firstName, lastName } = splitName(lead.fullName);
  const emailDomain = lead.email.split("@")[1]?.toLowerCase() ?? "";
  const domain = emailDomain && !FREE_MAIL.has(emailDomain) ? emailDomain : null;

  // Upsert by email so a repeat submission updates the contact instead of failing with a 409.
  const contactProps: Record<string, string> = { email: lead.email, hs_lead_status: "NEW" };
  if (firstName) contactProps.firstname = firstName;
  if (lastName) contactProps.lastname = lastName;
  if (lead.company) contactProps.company = lead.company;

  const contact = await hs<{ results: { id: string }[] }>("/crm/v3/objects/contacts/batch/upsert", {
    method: "POST",
    body: JSON.stringify({
      inputs: [{ idProperty: "email", id: lead.email, properties: contactProps }],
    }),
  });
  const contactId = contact.results[0]?.id;
  if (!contactId) throw new Error("HubSpot contact upsert returned no id");

  // Waitlist signups have no company name; the contact alone is still a valid lead.
  if (!lead.company) return;

  const companyId = await findOrCreateCompany(lead.company, domain);
  await hs(`/crm/v4/objects/contacts/${contactId}/associations/default/companies/${companyId}`, {
    method: "PUT",
  });
}
