"use client";

import { useId, useState, type FormEvent } from "react";
import Button from "@/components/ui/Button";

/**
 * Email-only waitlist signup for the Waterfall "coming soon" page.
 * Mirrors the validation / error / success behaviour of the demo forms.
 */
export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const id = useId();
  const inputId = `${id}-email`;
  const errorId = `${id}-error`;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Enter a valid work email.");
      document.getElementById(inputId)?.focus();
      return;
    }
    // TODO: The email is NOT transmitted anywhere yet (no HubSpot or other API
    // integration exists, same as the demo forms). Send `email` to the real
    // waitlist endpoint here and show the error state if it fails.
    setDone(true);
  };

  if (done) {
    return (
      <p
        role="status"
        className="mt-10 rounded-md border border-line-strong bg-white px-5 py-4 text-base text-ink"
      >
        You&apos;re on the list. We&apos;ll be in touch when early access opens.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Join the Waterfall waitlist"
      className="mt-10 flex w-full max-w-[480px] flex-col gap-2 text-left"
    >
      <label htmlFor={inputId} className="text-sm font-medium text-ink">
        Work email
      </label>
      <div className="flex flex-wrap gap-2">
        <input
          id={inputId}
          name="email"
          type="email"
          autoComplete="email"
          required
          aria-required="true"
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? errorId : undefined}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError("");
          }}
          className={`h-[54px] min-w-0 flex-[1_1_240px] rounded-md border bg-white px-4 text-base text-ink outline-none transition-colors focus-visible:ring-1 focus-visible:ring-ink ${
            error ? "border-[#B3261E]" : "border-[#CFCEDB]"
          }`}
        />
        <Button type="submit" size="lg" className="flex-none">
          Join the waitlist
        </Button>
      </div>
      {error && (
        <p id={errorId} className="text-sm text-[#B3261E]">
          {error}
        </p>
      )}
    </form>
  );
}
