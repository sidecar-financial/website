/**
 * Notice shown above the demo form fields (on the dark panel) because we save the name and email
 * once they are entered, before the visitor clicks submit. Keep the wording in step with
 * `saveDraft` in useDemoRequest.ts and the privacy policy.
 */
export default function DraftNotice({ className = "" }: { className?: string }) {
  return (
    <p className={`text-[13px] leading-5 text-navy-text ${className}`}>
      We save your name and email as you fill this in, so we can follow up if you don&apos;t finish.{" "}
      <a
        href="/privacy"
        className="rounded-sm font-medium text-white underline decoration-orange decoration-2 underline-offset-[3px] transition-all hover:decoration-4"
      >
        Privacy Policy
      </a>
    </p>
  );
}
