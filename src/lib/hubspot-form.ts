import { fillBlankProperties } from "@/lib/contact-merge";
import { splitName, type LeadPayload } from "@/lib/leads";

/**
 * Submits each real lead to its HubSpot form through the Forms API: demo leads to the "Request a
 * demo" form, Waterfall waitlist signups to the "Waterfall waitlist" form.
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

const WAITLIST_PAGE_NAME = "Waterfall waitlist";

export type DemoFormConfig = { portalId: string; formGuid: string };

type Env = Record<string, string | undefined>;

function formConfig(env: Env, guidVar: string): DemoFormConfig | null {
  const formGuid = env[guidVar]?.trim();
  if (!formGuid) return null;
  return { portalId: env.HUBSPOT_PORTAL_ID?.trim() || DEFAULT_PORTAL_ID, formGuid };
}

/** Null (feature off, a no-op) unless HUBSPOT_DEMO_FORM_GUID is set. */
export function demoFormConfig(env: Env = process.env): DemoFormConfig | null {
  return formConfig(env, "HUBSPOT_DEMO_FORM_GUID");
}

/** Null (feature off, a no-op) unless HUBSPOT_WAITLIST_FORM_GUID is set. */
export function waitlistFormConfig(env: Env = process.env): DemoFormConfig | null {
  return formConfig(env, "HUBSPOT_WAITLIST_FORM_GUID");
}

export type FormTarget = { kind: "demo" | "waitlist"; config: DemoFormConfig };

/**
 * Which form (if any) a lead is posted to: demo leads only to the demo form, waitlist signups only
 * to the waitlist form, never partial drafts. Null when the matching form's env var is unset.
 */
export function formTargetForLead(lead: LeadPayload, env: Env = process.env): FormTarget | null {
  if (lead.stage !== "submitted") return null;
  const kind = lead.source === "waterfall-waitlist" ? "waitlist" : lead.source === "demo" ? "demo" : null;
  if (!kind) return null;
  const config = kind === "waitlist" ? waitlistFormConfig(env) : demoFormConfig(env);
  return config ? { kind, config } : null;
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

function pageUri(siteUrl: string, pagePath: string): string {
  const path = pagePath.startsWith("/") ? pagePath : `/${pagePath}`;
  return `${siteUrl.replace(/\/$/, "")}${path}`;
}

/**
 * Pure: waitlist lead -> Forms API payload. The waitlist form has a single field, email, so only the
 * email is sent: a submission only writes the fields it contains, so an existing contact's name,
 * company and other properties are left untouched.
 */
export function buildWaitlistFormSubmission(lead: LeadPayload, { siteUrl }: BuildOptions): DemoFormBuild {
  if (lead.stage !== "submitted") return { ok: false, reason: "partial lead, not submitted yet" };
  if (lead.source !== "waterfall-waitlist") return { ok: false, reason: "not a waitlist signup" };
  return {
    ok: true,
    body: {
      fields: [{ name: "email", value: lead.email }],
      context: { pageUri: pageUri(siteUrl, lead.pagePath), pageName: WAITLIST_PAGE_NAME },
    },
  };
}

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

  return {
    ok: true,
    body: {
      fields: [
        { name: "email", value: lead.email },
        { name: "firstname", value: merged.firstname },
        { name: "lastname", value: merged.lastname },
        { name: "company", value: merged.company },
      ],
      context: { pageUri: pageUri(siteUrl, lead.pagePath), pageName: PAGE_NAME },
    },
  };
}

export type SubmitResult = { submitted: true } | { submitted: false; reason: string };

async function postForm(
  config: DemoFormConfig,
  body: DemoFormBody,
  fetchImpl: typeof fetch | undefined,
): Promise<SubmitResult> {
  const doFetch = fetchImpl ?? fetch;
  const res = await doFetch(`${FORMS_API}/${config.portalId}/${config.formGuid}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(FORM_TIMEOUT_MS),
  });
  if (!res.ok) {
    throw new Error(`HubSpot form submit -> ${res.status} ${(await res.text()).slice(0, 300)}`);
  }
  return { submitted: true };
}

/** Builds and POSTs the demo submission. Throws if HubSpot rejects it; the caller logs and carries on. */
export async function submitDemoForm(
  config: DemoFormConfig,
  lead: LeadPayload,
  options: BuildOptions & { fetchImpl?: typeof fetch },
): Promise<SubmitResult> {
  const built = buildDemoFormSubmission(lead, options);
  if (!built.ok) return { submitted: false, reason: built.reason };
  return postForm(config, built.body, options.fetchImpl);
}

/** Builds and POSTs the waitlist submission. Throws if HubSpot rejects it; the caller logs and carries on. */
export async function submitWaitlistForm(
  config: DemoFormConfig,
  lead: LeadPayload,
  options: BuildOptions & { fetchImpl?: typeof fetch },
): Promise<SubmitResult> {
  const built = buildWaitlistFormSubmission(lead, options);
  if (!built.ok) return { submitted: false, reason: built.reason };
  return postForm(config, built.body, options.fetchImpl);
}
