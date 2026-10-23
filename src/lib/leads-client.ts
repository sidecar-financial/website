"use client";

import { useEffect, useRef } from "react";
import type { LeadPayload } from "@/lib/leads";

/** Fields the visitor supplies; everything else is added by `submitLead`. */
export type LeadInput = Pick<LeadPayload, "source" | "fullName" | "email" | "company" | "interest">;

/**
 * Anti-bot helpers for a form: the time it first rendered (bots submit instantly) and a ref
 * for the hidden honeypot input (render it with `<HoneypotField inputRef={honeypot} />`).
 */
export function useLeadGuards() {
  // Set after mount (not during render) so prerendering never bakes in a build-time value.
  const startedAt = useRef(0);
  const honeypot = useRef<HTMLInputElement>(null);
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);
  return { startedAt, honeypot };
}

/** POST a lead to /api/leads. Throws when it could not be recorded. */
export async function submitLead(
  input: LeadInput,
  guards: { startedAt: React.RefObject<number>; honeypot: React.RefObject<HTMLInputElement | null> },
) {
  const res = await fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...input,
      pagePath: window.location.pathname,
      startedAt: guards.startedAt.current,
      website: guards.honeypot.current?.value ?? "",
    }),
  });
  if (!res.ok) throw new Error(`Lead submit failed: ${res.status}`);

  // GTM hook: lets Jen point Google Ads / GA4 conversion tags at real form submissions.
  const w = window as unknown as { dataLayer?: unknown[] };
  w.dataLayer?.push({ event: "generate_lead", lead_source: input.source });
}
