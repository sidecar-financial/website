/**
 * Shared lead-capture types and validation, used by the browser (to build the request)
 * and by POST /api/leads (to validate it again; never trust the client).
 */

export type LeadSource = "demo" | "waterfall-waitlist";

/**
 * "partial": the visitor entered a name and email but has not clicked submit (saved so sales can
 * follow up; recorded with consent "Not submitted"). "submitted": they clicked submit.
 */
export type LeadStage = "partial" | "submitted";

export const CONSENT_LABEL: Record<LeadStage, string> = {
  partial: "Not submitted",
  submitted: "Submitted",
};

/**
 * Visitors from these countries (EU/EEA, UK, Switzerland) are never saved before they click submit:
 * that needs opt-in consent, and a notice under the form is not enough.
 */
const PARTIAL_CAPTURE_BLOCKED = new Set([
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IE", "IT", "LV",
  "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE", "IS", "LI", "NO", "GB", "CH",
]);

/** True when it is OK to save a not-yet-submitted lead for a visitor in this country (ISO code, may be missing). */
export function partialCaptureAllowed(country: string | null | undefined): boolean {
  if (!country) return false; // unknown location: do not capture
  return !PARTIAL_CAPTURE_BLOCKED.has(country.toUpperCase());
}

export type LeadPayload = {
  /** Which form produced the lead. */
  source: LeadSource;
  /** Whether the visitor has clicked submit (see `LeadStage`). */
  stage: LeadStage;
  fullName: string;
  email: string;
  /** Empty for the email-only Waterfall waitlist form. */
  company: string;
  /** Raw select value (e.g. "carry"); the server maps it to a readable label. */
  interest: string;
  /** Path of the page the form was on, e.g. "/about". */
  pagePath: string;
  /** Epoch ms when the form was first shown; bots submit instantly. */
  startedAt: number;
  /** Honeypot: hidden from people, so any value means a bot filled it in. */
  website: string;
};

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** "What would you like to explore" choices, shared so every demo form (and the server) stays in sync. */
export const INTEREST_OPTIONS = [
  { value: "carry", label: "Carry Management" },
  { value: "waterfall", label: "Waterfall (coming soon)" },
  { value: "compensation", label: "Compensation Management" },
  { value: "coinvest", label: "Employee Co-Invest" },
  { value: "gpcommit", label: "GP Commit" },
  { value: "all", label: "All of the above" },
] as const;

export function interestLabel(value: string): string {
  return INTEREST_OPTIONS.find((o) => o.value === value)?.label ?? "";
}

const MAX = { name: 120, email: 254, company: 160, interest: 40, path: 200 } as const;

export type ValidationResult =
  | { ok: true; lead: LeadPayload }
  | { ok: false; error: string };

/** Validate and normalize an untrusted request body. */
export function parseLead(body: unknown): ValidationResult {
  if (!body || typeof body !== "object") return { ok: false, error: "Invalid request" };
  const b = body as Record<string, unknown>;
  const str = (key: string, max: number) =>
    typeof b[key] === "string" ? (b[key] as string).trim().slice(0, max) : "";

  const source = b.source;
  if (source !== "demo" && source !== "waterfall-waitlist") {
    return { ok: false, error: "Invalid request" };
  }

  const email = str("email", MAX.email);
  if (!EMAIL_RE.test(email)) return { ok: false, error: "Please enter a valid email address" };

  // Only the demo forms save a lead before submit; the email-only waitlist never does.
  const stage: LeadStage = b.stage === "partial" && source === "demo" ? "partial" : "submitted";

  const fullName = str("fullName", MAX.name);
  const company = str("company", MAX.company);
  if (stage === "partial") {
    if (!fullName) return { ok: false, error: "Invalid request" };
  } else if (source === "demo" && (!fullName || !company)) {
    return { ok: false, error: "Name and company are required" };
  }

  const startedAt = typeof b.startedAt === "number" && Number.isFinite(b.startedAt) ? b.startedAt : 0;

  return {
    ok: true,
    lead: {
      source,
      stage,
      fullName,
      email,
      company,
      interest: source === "waterfall-waitlist" ? "waterfall" : str("interest", MAX.interest),
      pagePath: str("pagePath", MAX.path),
      startedAt,
      website: str("website", 200),
    },
  };
}

/** Minimum plausible time (ms) between a form appearing and being submitted by a person. */
export const MIN_FILL_MS = 2500;

/** True when the submission looks automated. Spam is still recorded (as Spam) but never reaches HubSpot. */
export function looksLikeSpam(lead: LeadPayload, now = Date.now()): boolean {
  if (lead.website) return true; // honeypot filled
  if (!lead.startedAt) return true; // missing timestamp: not our form
  const elapsed = now - lead.startedAt;
  return elapsed < MIN_FILL_MS || elapsed < 0;
}

export function splitName(fullName: string): { firstName: string; lastName: string } {
  const [first = "", ...rest] = fullName.trim().split(/\s+/);
  return { firstName: first, lastName: rest.join(" ") };
}
