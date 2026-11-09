/**
 * Hidden anti-bot field. People never see or reach it (off-screen, not focusable, ignored by
 * assistive tech and autofill); bots that fill every input reveal themselves.
 */
export default function HoneypotField({ inputRef }: { inputRef: React.Ref<HTMLInputElement> }) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>
        Website
        <input
          ref={inputRef}
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </label>
    </div>
  );
}
