"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";

export type SelectOption = { value: string; label: string };

type SelectProps = {
  /** Id of the trigger button (so callers can focus it / target it). */
  id: string;
  /** Name for the hidden input that carries the value in a native form post. */
  name?: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly SelectOption[];
  /** Shown (muted) while nothing is selected. */
  placeholder: string;
  /** Id of the element (visible or sr-only) that labels the control. */
  labelledBy: string;
  /** Field styling for the trigger (height, border, padding, focus glow). */
  triggerClassName?: string;
};

/**
 * Custom select for the dark navy forms, built to the WAI-ARIA select-only
 * combobox pattern: DOM focus stays on the trigger and the highlighted option
 * is exposed through `aria-activedescendant`.
 *
 * Keyboard: Enter/Space/Arrow keys open it; Arrow keys, Home/End and type-ahead
 * move the highlight; Enter/Space select; Escape closes; Tab closes.
 */
export default function Select({
  id,
  name,
  value,
  onChange,
  options,
  placeholder,
  labelledBy,
  triggerClassName = "",
}: SelectProps) {
  const uid = useId();
  const listId = `${uid}-listbox`;
  const valueId = `${uid}-value`;
  const optionId = (i: number) => `${uid}-option-${i}`;

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const typed = useRef({ text: "", timer: 0 });

  const selectedIndex = options.findIndex((o) => o.value === value);
  const selected = selectedIndex >= 0 ? options[selectedIndex] : undefined;

  const openList = (index = selectedIndex >= 0 ? selectedIndex : 0) => {
    setActive(index);
    setOpen(true);
  };

  const choose = (index: number) => {
    onChange(options[index].value);
    setOpen(false);
  };

  // Close when the pointer goes down outside the control.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  // Keep the highlighted option visible inside the (scrollable) popup.
  useEffect(() => {
    if (!open) return;
    // Scroll only the popup (scrollIntoView would also scroll the page).
    const list = listRef.current;
    const item = list?.children[active] as HTMLElement | undefined;
    if (!list || !item) return;
    if (item.offsetTop < list.scrollTop) list.scrollTop = item.offsetTop - 6;
    else if (item.offsetTop + item.offsetHeight > list.scrollTop + list.clientHeight)
      list.scrollTop = item.offsetTop + item.offsetHeight - list.clientHeight + 6;
  }, [open, active]);

  useEffect(() => () => window.clearTimeout(typed.current.timer), []);

  const typeAhead = (char: string) => {
    const t = typed.current;
    window.clearTimeout(t.timer);
    t.text += char.toLowerCase();
    t.timer = window.setTimeout(() => {
      t.text = "";
    }, 600);
    // A repeated single letter cycles through matches; a longer string narrows them.
    const cycling = t.text.split("").every((c) => c === t.text[0]);
    const needle = cycling ? t.text[0] : t.text;
    const start = open ? active + (cycling ? 1 : 0) : selectedIndex + (cycling ? 1 : 0);
    for (let n = 0; n < options.length; n++) {
      const i = (start + n + options.length) % options.length;
      if (options[i].label.toLowerCase().startsWith(needle)) {
        if (open) setActive(i);
        else openList(i);
        return;
      }
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.ctrlKey || e.metaKey) return;
    const last = options.length - 1;

    if (!open) {
      switch (e.key) {
        case "Enter":
        case " ":
          if (e.key === " " && typed.current.text) break; // part of a type-ahead word
          e.preventDefault();
          openList();
          return;
        case "ArrowDown":
        case "ArrowUp":
          e.preventDefault();
          openList();
          return;
        case "Home":
          e.preventDefault();
          openList(0);
          return;
        case "End":
          e.preventDefault();
          openList(last);
          return;
      }
      if (e.key.length === 1 && !e.altKey) {
        e.preventDefault();
        typeAhead(e.key);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActive((i) => Math.min(i + 1, last));
        return;
      case "ArrowUp":
        e.preventDefault();
        setActive((i) => Math.max(i - 1, 0));
        return;
      case "Home":
        e.preventDefault();
        setActive(0);
        return;
      case "End":
        e.preventDefault();
        setActive(last);
        return;
      case "Enter":
      case " ":
        if (e.key === " " && typed.current.text) break;
        e.preventDefault();
        choose(active);
        return;
      case "Escape":
        e.preventDefault();
        e.stopPropagation();
        setOpen(false);
        return;
      case "Tab":
        setOpen(false);
        return;
    }
    if (e.key.length === 1 && !e.altKey) {
      e.preventDefault();
      typeAhead(e.key);
    }
  };

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onBlur={(e) => {
        // Focus left the control entirely (e.g. via touch or programmatic focus).
        if (!wrapperRef.current?.contains(e.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      {name && <input type="hidden" name={name} value={value} />}

      <button
        type="button"
        id={id}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        // Label + current value; the placeholder is skipped (it often repeats the label).
        aria-labelledby={selected ? `${labelledBy} ${valueId}` : labelledBy}
        aria-activedescendant={open ? optionId(active) : undefined}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
        className={`${triggerClassName} flex cursor-pointer items-center justify-between gap-4 text-left aria-expanded:border-orange aria-expanded:shadow-[0_0_24px_-8px_rgba(245,166,29,0.55)]`}
      >
        <span id={valueId} className={`min-w-0 truncate ${selected ? "text-white" : "text-navy-text"}`}>
          {selected ? selected.label : placeholder}
        </span>
        <svg
          className={`size-4 shrink-0 text-navy-text transition-transform duration-200 ease-out ${
            open ? "rotate-180 text-orange" : ""
          }`}
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <ul
        ref={listRef}
        id={listId}
        role="listbox"
        aria-labelledby={labelledBy}
        // Not focusable: DOM focus stays on the trigger (aria-activedescendant).
        tabIndex={-1}
        // Keep focus on the trigger while clicking options or dragging the scrollbar.
        onMouseDown={(e) => e.preventDefault()}
        className={`absolute inset-x-0 top-full z-50 mt-1.5 max-h-72 origin-top overflow-y-auto rounded-md border border-navy-border bg-navy-line p-1.5 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.65)] outline-none transition-[opacity,transform,visibility] duration-150 ease-out motion-reduce:transition-none ${
          open
            ? "visible translate-y-0 scale-100 opacity-100"
            : "pointer-events-none invisible -translate-y-1 scale-[0.98] opacity-0"
        }`}
      >
        {options.map((option, i) => {
          const isSelected = i === selectedIndex;
          return (
            <li
              key={option.value}
              id={optionId(i)}
              role="option"
              aria-selected={isSelected}
              onMouseMove={() => i !== active && setActive(i)}
              onClick={() => choose(i)}
              className={`flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded-[4px] px-4 py-2.5 text-[15px] leading-5 transition-colors duration-100 ${
                i === active ? "bg-orange/15" : ""
              } ${isSelected ? "font-medium text-white" : "text-white/85"}`}
            >
              <span className="min-w-0">{option.label}</span>
              {isSelected && (
                <svg className="size-4 shrink-0 text-orange" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
