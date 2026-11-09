"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { EMAIL_RE, INTEREST_OPTIONS } from "@/lib/leads";
import { savePartialLead, submitLead, useLeadGuards } from "@/lib/leads-client";
import { runLeadSubmit } from "@/lib/submit-flow";

export { INTEREST_OPTIONS };

export type DemoFormData = {
  fullName: string;
  email: string;
  company: string;
  interest: string;
};

export type DemoFormField = keyof DemoFormData;

const EMPTY_FORM: DemoFormData = { fullName: "", email: "", company: "", interest: "" };

/** Quick horizontal nudge on a field that failed validation (skipped for reduced motion). */
function shake(el: HTMLElement | null) {
  if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  el.animate(
    [
      { transform: "translateX(0)" },
      { transform: "translateX(-6px)" },
      { transform: "translateX(5px)" },
      { transform: "translateX(-3px)" },
      { transform: "translateX(0)" },
    ],
    { duration: 380, easing: "ease-in-out" },
  );
}

/**
 * Shared state, validation and submit handling for the demo-request forms
 * (landing page, About page and /demo), so they all behave the same.
 */
export function useDemoRequest() {
  const [formData, setFormData] = useState<DemoFormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<DemoFormField, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success">("idle");
  // True when the lead could not be saved (the visitor still gets to book a time).
  const [saveFailed, setSaveFailed] = useState(false);
  const [firstName, setFirstName] = useState("");
  // Kept after the form resets so the booking link can prefill the scheduler.
  const [submittedContact, setSubmittedContact] = useState({ fullName: "", email: "" });
  const formId = useId();
  const { startedAt, honeypot } = useLeadGuards();
  // Email last saved as a partial lead, and the in-flight save (so submit can wait for it).
  const savedDraftEmail = useRef("");
  const pendingDraft = useRef<Promise<void> | null>(null);

  const fieldId = (field: DemoFormField) => `${formId}-${field}`;

  const validate = () => {
    const next: Partial<Record<DemoFormField, string>> = {};
    if (!formData.fullName.trim()) {
      next.fullName = "Full name is required";
    }
    if (!formData.email.trim()) {
      next.email = "Work email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      next.email = "Please enter a valid email address";
    }
    if (!formData.company.trim()) {
      next.company = "Company name is required";
    }
    setErrors(next);
    return next;
  };

  const setField = (field: DemoFormField, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => (prev[field] ? { ...prev, [field]: "" } : prev));
  };

  /**
   * Call when the name or email field loses focus. Once there is a name and a valid email, save
   * them as a not-yet-submitted lead (once per email address). The form shows a notice about this.
   */
  const saveDraft = () => {
    const email = formData.email.trim();
    if (status === "success" || isSubmitting) return;
    if (!formData.fullName.trim() || !EMAIL_RE.test(email)) return;
    if (savedDraftEmail.current === email.toLowerCase()) return;
    savedDraftEmail.current = email.toLowerCase();
    pendingDraft.current = savePartialLead(
      { source: "demo", ...formData, fullName: formData.fullName.trim(), email },
      { startedAt, honeypot },
    );
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const found = validate();
    const invalid = (["fullName", "email", "company"] as const).filter((f) => found[f]);
    if (invalid.length) {
      document.getElementById(fieldId(invalid[0]))?.focus();
      invalid.forEach((f) => shake(document.getElementById(fieldId(f))));
      return;
    }

    setIsSubmitting(true);
    setStatus("idle");
    // Booking a time never depends on saving the lead: the scheduler link is static, so a slow or
    // failed save must not block the visitor. A failed save is retried once in the background.
    const submission = { source: "demo" as const, ...formData };
    const { saved } = await runLeadSubmit({
      pendingDraft: pendingDraft.current,
      submit: () => submitLead(submission, { startedAt, honeypot }),
    });
    setSaveFailed(!saved);
    setFirstName(formData.fullName.trim().split(/\s+/)[0]);
    setSubmittedContact({ fullName: formData.fullName.trim(), email: formData.email.trim() });
    setStatus("success");
    setFormData(EMPTY_FORM);
    setIsSubmitting(false);
  };

  return {
    formData,
    setField,
    errors,
    isSubmitting,
    status,
    saveFailed,
    firstName,
    submittedContact,
    fieldId,
    saveDraft,
    handleSubmit,
    honeypot,
  };
}
