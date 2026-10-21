"use client";

import { useId, useState, type FormEvent } from "react";

export type DemoFormData = {
  fullName: string;
  email: string;
  company: string;
  interest: string;
};

export type DemoFormField = keyof DemoFormData;

/** "What would you like to explore" choices, shared so every demo form stays in sync. */
export const INTEREST_OPTIONS = [
  { value: "carry", label: "Carry Management" },
  { value: "waterfall", label: "Waterfall (coming soon)" },
  { value: "compensation", label: "Compensation Management" },
  { value: "coinvest", label: "Employee Co-Invest" },
  { value: "gpcommit", label: "GP Commit" },
  { value: "all", label: "All of the above" },
] as const;

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
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [firstName, setFirstName] = useState("");
  const formId = useId();

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
    try {
      // TODO: The submitted data is NOT transmitted anywhere yet (no HubSpot or
      // other API integration exists). Send `formData` to the real endpoint here
      // and let failures throw so the catch below shows the error state.
      setFirstName(formData.fullName.trim().split(/\s+/)[0]);
      setStatus("success");
      setFormData(EMPTY_FORM);
    } catch {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return { formData, setField, errors, isSubmitting, status, firstName, fieldId, handleSubmit };
}
