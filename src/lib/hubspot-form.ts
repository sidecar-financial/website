import { fillBlankProperties } from "@/lib/contact-merge";
import { splitName, type LeadPayload } from "@/lib/leads";

/**
 * Submits each real demo lead to the existing HubSpot "Request a demo" form through the Forms API.
 *
 * Creating a contact through the CRM API does not record a form submission, so workflows that are
 * triggered by "Form submission" (confirmation email, internal alert) never fire. A genuine form
 * submission is recorded every time, including repeat submits from existing contacts.
 *
 * The public submit endpoint needs no token. The form (portal 43584751) has four required fields:
 * email, firstname, lastname, company. It has no interest dropdown and no legal-consent option, so
 * neither is sent.
 */

const FORMS_API = "https://api.hsforms.com/submissions/v3/integration/submit";

/** Same bound as the CRM calls in hubspot.ts, so a slow HubSpot can never hang the request. */
const FORM_TIMEOUT_MS = 15_000;

/** The Navable HubSpot portal (also used by the tracking script, see lib/site.ts). */
const DEFAULT_PORTAL_ID = "43584751";

const PAGE_NAME = "Request a demo";

export type DemoFormConfig = { portalId: string; formGuid: string };

/** Null (feature off, a no-op) unless HUBSPOT_DEMO_FORM_GUID is set. */
export function demoFormConfig(env: Record<string, string | undefined> = process.env): DemoFormConfig | null {
  const formGuid = env.HUBSPOT_DEMO_FORM_GUID?.trim();
  if (!formGuid) return null;
  return { portalId: env.HUBSPOT_PORTAL_ID?.trim() || DEFAULT_PORTAL_ID, formGuid };
}

export type DemoFormBody = {
  fields: { name: string; value: string }[];
  context: { pageUri: string; pageName: string };
};

export type DemoFormBuild = { ok: true; body: DemoFormBody } | { ok: false; reason: string };

type BuildOptions = {
  /** Site origin used to turn the lead's page path into a full pageUri. */
  siteUrl: string;
  /**
   * Properties the contact already has in HubSpot. A form submission overwrites contact values,
   * so values already set are sent back unchanged: repeat submits never replace a name or
   * company someone already has (same rule as the CRM write in hubspot.ts).
   */
  existing?: Record<string, string | null | undefined>;
};

/** Pure: lead -> Forms API payload, or the reason this lead is not sent to the form. */
export function buildDemoFormSubmission(lead: LeadPayload, { siteUrl, existing = {} }: BuildOptions): DemoFormBuild {
  if (lead.stage !== "submitted") return { ok: false, reason: "partial lead, not submitted yet" };
  if (lead.source !== "demo") {
    // The email-only waitlist has no name or company, which this form requires.
    return { ok: false, reason: "waitlist signup has no name or company, which the demo form requires" };
  }

  const { firstName, lastName } = splitName(lead.fullName);
  const typed: Record<string, string> = { firstname: firstName, lastname: lastName, company: lead.company };
  // Existing non-blank values win; typed values only fill blanks.
  const merged = { ...fillBlankProperties(existing, typed) };
  for (const key of Object.keys(typed)) {
    const current = (existing[key] ?? "").trim();
    if (current !== "") merged[key] = current;
  }

  if (!merged.firstname) return { ok: false, reason: "no first name" };
  if (!merged.lastname) return { ok: false, reason: "no last name (the demo form requires one)" };
  if (!merged.company) return { ok: false, reason: "no company (the demo form requires one)" };

  const path = lead.pagePath.startsWith("/") ? lead.pagePath : `/${lead.pagePath}`;
  return {
    ok: true,
    body: {
      fields: [
        { name: "email", value: lead.email },
        { name: "firstname", value: merged.firstname },
        { name: "lastname", value: merged.lastname },
        { name: "company", value: merged.company },
      ],
      context: { pageUri: `${siteUrl.replace(/\/$/, "")}${path}`, pageName: PAGE_NAME },
    },
  };
}

export type SubmitResult = { submitted: true } | { submitted: false; reason: string };

/** Builds and POSTs the submission. Throws if HubSpot rejects it; the caller logs and carries on. */
export async function submitDemoForm(
  config: DemoFormConfig,
  lead: LeadPayload,
  options: BuildOptions & { fetchImpl?: typeof fetch },
): Promise<SubmitResult> {
  const built = buildDemoFormSubmission(lead, options);
  if (!built.ok) return { submitted: false, reason: built.reason };

  const doFetch = options.fetchImpl ?? fetch;
  const res = await doFetch(`${FORMS_API}/${config.portalId}/${config.formGuid}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(built.body),
    signal: AbortSignal.timeout(FORM_TIMEOUT_MS),
  });
  if (!res.ok) {
    throw new Error(`HubSpot form submit -> ${res.status} ${(await res.text()).slice(0, 300)}`);
  }
  return { submitted: true };
}
