/**
 * Client-side flow for the demo form's submit button.
 *
 * Saving the lead and showing the booking screen are separate: the booking link is a static
 * HubSpot URL, so a slow or failed save must never keep a visitor from booking. This never
 * throws. It reports whether the save worked, and after a failure it retries once in the
 * background (the server collapses a duplicate submit from the same email within minutes).
 */

type Options = {
  /** In-flight "name and email entered" save, if any. */
  pendingDraft: Promise<void> | null;
  /** Sends the real submit. Rejects when the lead could not be recorded. */
  submit: () => Promise<void>;
  /** Longest to wait for `pendingDraft` before submitting anyway. */
  draftWaitMs?: number;
  /** Delay before the single background retry. */
  retryDelayMs?: number;
  /** Injectable for tests; defaults to setTimeout. */
  setTimer?: (fn: () => void, ms: number) => void;
};

export async function runLeadSubmit({
  pendingDraft,
  submit,
  draftWaitMs = 2000,
  retryDelayMs = 3000,
  setTimer = (fn, ms) => void setTimeout(fn, ms),
}: Options): Promise<{ saved: boolean }> {
  if (pendingDraft) {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const cap = new Promise<void>((resolve) => {
      timer = setTimeout(resolve, draftWaitMs);
    });
    // The draft save is best effort; its failure or slowness must not block the real submit.
    await Promise.race([pendingDraft.catch(() => {}), cap]);
    clearTimeout(timer);
  }

  try {
    await submit();
    return { saved: true };
  } catch {
    setTimer(() => {
      submit().catch(() => {
        /* nothing more to do; the visitor can still book */
      });
    }, retryDelayMs);
    return { saved: false };
  }
}
