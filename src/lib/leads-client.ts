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

type Guards = {
  startedAt: React.RefObject<number>;
  honeypot: React.RefObject<HTMLInputElement | null>;
};

function post(input: LeadInput, stage: LeadPayload["stage"], guards: Guards) {
  return fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // keepalive lets a partial save finish even if the visitor navigates away right after.
    keepalive: true,
    body: JSON.stringify({
      ...input,
      stage,
      pagePath: window.location.pathname,
      startedAt: guards.startedAt.current,
      website: guards.honeypot.current?.value ?? "",
    }),
  });
}

/** POST a submitted lead to /api/leads. Throws when it could not be recorded. */
export async function submitLead(input: LeadInput, guards: Guards) {
  const res = await post(input, "submitted", guards);
  if (!res.ok) throw new Error(`Lead submit failed: ${res.status}`);

  // GTM hook: lets Jen point Google Ads / GA4 conversion tags at real form submissions.
  const w = window as unknown as { dataLayer?: unknown[] };
  w.dataLayer?.push({ event: "generate_lead", lead_source: input.source });
}

/**
 * Save a lead whose visitor has entered a name and email but not clicked submit. Failures are
 * swallowed (the real submit records the lead anyway) and no conversion event is fired.
 */
export async function savePartialLead(input: LeadInput, guards: Guards): Promise<void> {
  try {
    await post(input, "partial", guards);
  } catch {
    /* best effort */
  }
}
