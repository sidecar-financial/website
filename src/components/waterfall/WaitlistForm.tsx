"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import Button from "@/components/ui/Button";
import HoneypotField from "@/components/ui/HoneypotField";
import { submitLead, useLeadGuards } from "@/lib/leads-client";

/**
 * Email-only early-access signup for the Waterfall "coming soon" page.
 * Mirrors the validation / error / success behaviour of the demo forms.
 *
 * Input and button sit in one pill-shaped row (stacked on mobile). Hovering
 * the row warms its border; focusing the input lifts the whole row with an
 * orange border and soft glow (same treatment as the demo form fields).
 */
export default function WaitlistForm({ className = "mt-10 max-w-[560px]" }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { startedAt, honeypot } = useLeadGuards();
  const successRef = useRef<HTMLParagraphElement>(null);
  const id = useId();
  const inputId = `${id}-email`;
  const errorId = `${id}-error`;

  // Jumping here via an in-page `#early-access` link: put the cursor in the field.
  // (Never on plain page load, so landing on /waterfall always stays at the top.)
  useEffect(() => {
    const focusIfTargeted = () => {
      if (window.location.hash === "#early-access") {
        document.getElementById(inputId)?.focus({ preventScroll: true });
      }
    };
    window.addEventListener("hashchange", focusIfTargeted);
    return () => window.removeEventListener("hashchange", focusIfTargeted);
  }, [inputId]);

  // The form unmounts on success, so move focus to the confirmation message.
  useEffect(() => {
    if (done) successRef.current?.focus();
  }, [done]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (submitting) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Enter a valid work email.");
      document.getElementById(inputId)?.focus();
      return;
    }
    setSubmitting(true);
    try {
      await submitLead(
        { source: "waterfall-waitlist", fullName: "", email: email.trim(), company: "", interest: "waterfall" },
        { startedAt, honeypot },
      );
      setDone(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div
        role="status"
        className={`success-in flex w-full items-center gap-4 rounded-[14px] border border-orange bg-white px-5 py-4 text-left shadow-[0_0_32px_-8px_rgba(245,166,29,0.55)] ${className}`}
      >
        {/* Decorative: ring and tick draw themselves once on mount */}
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true" className="flex-none">
          <circle className="check-draw" cx="22" cy="22" r="20" pathLength={1} stroke="#F5A61D" strokeWidth="2" />
          <path
            className="check-draw check-draw-tick"
            d="M13 23l6 6 12-13"
            pathLength={1}
            stroke="#F5A61D"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p ref={successRef} tabIndex={-1} className="text-base leading-[1.5] text-ink outline-none">
          <span className="font-semibold">You&apos;re on the list.</span> We&apos;ll be in touch when
          early access opens.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Get early access to Navable Waterfall"
      className={`flex w-full flex-col gap-2 text-left ${className}`}
    >
      <HoneypotField inputRef={honeypot} />
      <div
        className={`flex flex-col gap-2 rounded-[14px] border bg-white p-1.5 shadow-[0_1px_2px_rgba(27,27,61,0.04)] transition-[border-color,box-shadow,transform] duration-200 ease-out sm:flex-row sm:items-center ${
          error
            ? "border-[#B3261E] focus-within:shadow-[0_0_24px_-8px_rgba(179,38,30,0.45)]"
            : "border-[#CFCEDB] hover:border-orange/60 hover:shadow-[0_4px_18px_-8px_rgba(245,166,29,0.45)] focus-within:border-orange focus-within:shadow-[0_10px_32px_-8px_rgba(245,166,29,0.6)]"
        } focus-within:-translate-y-0.5 motion-reduce:transform-none`}
      >
        <label htmlFor={inputId} className="sr-only">
          Work email
        </label>
        <input
          id={inputId}
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Work email"
          required
          aria-required="true"
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? errorId : undefined}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError("");
          }}
          className="h-[56px] w-full min-w-0 rounded-lg sm:w-auto sm:flex-1 bg-transparent px-4 text-base text-ink outline-none transition-colors duration-200 placeholder:text-subtle hover:bg-soft/70 focus:bg-transparent"
        />
        <Button
          type="submit"
          size="lg"
          disabled={submitting}
          className="h-[56px] flex-none !px-8 !text-[17px] !font-semibold"
        >
          Get Early Access
        </Button>
      </div>
      {error && (
        <p id={errorId} role="alert" className="field-error px-1 text-sm text-[#B3261E]">
          {error}
        </p>
      )}
    </form>
  );
}
