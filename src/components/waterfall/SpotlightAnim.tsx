"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { CSSProperties } from "react";

/**
 * Four small product mock-ups for the "Product spotlights" on /waterfall
 * (ported from the design build's SpotlightAnim): Trace, Compare, Review and
 * Exceptions. Each plays once, the first time it scrolls into view.
 *
 * - Server and no-JS render the finished frame (END), so there is always a
 *   meaningful, layout-stable image.
 * - prefers-reduced-motion keeps the finished frame and never starts a timer.
 * - The visual is decorative (aria-hidden); the wrapper carries a text equivalent.
 * - All data below is illustrative sample data.
 */

export type SpotlightKind = "trace" | "compare" | "review" | "exceptions";

const END = 3400;
const TICK_MS = 40;

const ease = (p: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, p)), 3);

const LABELS: Record<SpotlightKind, string> = {
  trace:
    "The amount 1,971,538.71 for LP-03 traced to its tier, its formula, its source records and the LPA clause behind it.",
  compare:
    "Navable's results compared with the client's own Excel model: 41 of 42 cells match, and the one difference of 126.41 is explained.",
  review:
    "A distribution record with its inputs, terms and versions confirmed, then signed off by the reviewer and locked.",
  exceptions:
    "A work list across clients re-sorting so items that need sign-off or are waiting on the client appear first.",
};

// [chip bg, chip border, chip text, sort rank]
const STATES: Record<string, [string, string, string, number]> = {
  "Needs sign-off": ["#EEEDF8", "#EEEDF8", "#2E2A6B", 0],
  "Waiting on client": ["#FFF1D6", "#FFF1D6", "#7A4A00", 1],
  "In setup": ["#FFF8EB", "#F2D29A", "#7A4A00", 2],
  Draft: ["#FFFFFF", "#CFCEDB", "#3E3C5A", 3],
  Locked: ["#F4F4F8", "#F4F4F8", "#5E5C78", 4],
};

const WORK: [string, string, string][] = [
  ["Draft", "Q3 valuation", "Meridian Ridge Real Estate Fund II"],
  ["Locked", "Q2 2026 distribution · Investment A", "Meridian Ridge Real Estate Fund II"],
  ["In setup", "Terms being confirmed", "Growth Fund III"],
  ["Needs sign-off", "Q2 distribution v2 · Investment B", "Meridian Ridge Real Estate Fund II"],
  ["Draft", "Q3 distribution · Investment B", "Meridian Ridge Real Estate Fund II"],
  ["Waiting on client", "Client confirmation · 22 of 34", "Meridian Ridge Real Estate Fund II"],
];

const PREF: [string, string, string?][] = [
  ["LP-01", "2,957,308.07"],
  ["LP-02", "2,464,423.39"],
  ["LP-03", "1,971,538.71", "1,971,412.30"],
  ["LP-04", "1,725,096.38"],
  ["LP-05", "1,223,954.71"],
  ["LP-06", "985,769.36"],
];

const TRACE_STEPS: [string, string, boolean][] = [
  ["Tier", "(i) Preferred return, compounded monthly", false],
  ["Formula", "=MIN(Alloc!D4, Calc!C6+Calc!C9)", true],
  ["Records", "Contributions from 2023-09-01 · ledger load 28 Sep, checks passed", false],
  ["LPA clause", "§4.2(a)(i) · Pref is paid before capital", false],
];

const REVIEW_ROWS: [string, string][] = [
  ["Inputs", "Ledger load 28 Sep · checks passed"],
  ["Terms", "23 terms confirmed"],
  ["Versions", "Model v3 · operations 2026.09.2"],
];

const monoCaps = "font-mono text-[11px] font-medium uppercase leading-none tracking-[0.1em]";

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";
function subscribeReduced(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}
const getReduced = () => window.matchMedia(REDUCED_QUERY).matches;
const getReducedServer = () => false;

const subscribeNone = () => () => {};
const getHydrated = () => true;
const getHydratedServer = () => false;

export default function SpotlightAnim({ kind }: { kind: SpotlightKind }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [t, setT] = useState(0);
  const hydrated = useSyncExternalStore(subscribeNone, getHydrated, getHydratedServer);
  const reduced = useSyncExternalStore(subscribeReduced, getReduced, getReducedServer);

  const animate = hydrated && !reduced;

  // Play once, when the mock-up scrolls into view.
  useEffect(() => {
    const el = rootRef.current;
    if (!animate || !el || !("IntersectionObserver" in window)) return;
    let timer: ReturnType<typeof setInterval> | undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        timer = setInterval(() => {
          const elapsed = performance.now() - start;
          setT(Math.min(elapsed, END));
          if (elapsed >= END && timer) clearInterval(timer);
        }, TICK_MS);
      },
      { threshold: 0, rootMargin: "0px 0px -20% 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (timer) clearInterval(timer);
    };
  }, [animate]);

  // Without IntersectionObserver the effect above never plays, so show the finished frame.
  const canObserve = typeof window !== "undefined" && "IntersectionObserver" in window;
  const shownT = animate && canObserve ? t : END;
  const on = (cue: number) => shownT >= cue;
  // Transitions only run once the clock has started (so the reset to frame 0 is instant).
  const tr = (value: string) => (animate && t > 0 ? value : "none");
  const fade = (cue: number, dy = 10): CSSProperties => ({
    opacity: on(cue) ? 1 : 0,
    transform: on(cue) ? "none" : `translateY(${dy}px)`,
    transition: tr("opacity .4s, transform .5s cubic-bezier(.2,.8,.2,1.1)"),
  });

  return (
    <div ref={rootRef} role="img" aria-label={LABELS[kind]} className="w-full text-left text-ink tabular-nums">
      <div aria-hidden="true">
        {kind === "trace" && <Trace on={on} tr={tr} fade={fade} />}
        {kind === "compare" && <Compare on={on} tr={tr} fade={fade} t={shownT} />}
        {kind === "review" && <Review on={on} tr={tr} />}
        {kind === "exceptions" && <Exceptions on={on} tr={tr} />}
      </div>
    </div>
  );
}

type Helpers = {
  on: (cue: number) => boolean;
  tr: (value: string) => string;
};
type FadeHelpers = Helpers & { fade: (cue: number, dy?: number) => CSSProperties };

/* ------------------------------- Trace ------------------------------- */

function Trace({ on, tr, fade }: FadeHelpers) {
  const lit = on(200);
  return (
    <div className="flex flex-col">
      <div
        className="min-w-[min(100%,280px)] self-start rounded-lg border bg-white px-5 py-4"
        style={{
          borderColor: lit ? "#4C46A3" : "#E9E8F0",
          boxShadow: lit ? "0 0 0 4px rgba(76,70,163,.12)" : "none",
          transition: tr("border-color .3s, box-shadow .4s"),
        }}
      >
        <p className={`${monoCaps} text-[#5E5C78]`}>LP-03 · (i) Pref · Cell F4</p>
        <p className="mt-2.5 text-[clamp(24px,3vw,30px)] font-semibold tracking-[-0.01em] text-ink">
          1,971,538.71
        </p>
      </div>
      {TRACE_STEPS.map(([k, v, mono], i) => {
        const cue = 500 + i * 520;
        return (
          <div key={k} className="grid grid-cols-[28px_minmax(0,1fr)] gap-x-3">
            <div className="relative">
              <span
                className="absolute left-[13px] top-0 h-full w-0.5 bg-[#DCDAF0]"
                style={{
                  transformOrigin: "50% 0",
                  transform: `scaleY(${on(cue - 200) ? 1 : 0})`,
                  transition: tr("transform .35s ease-out"),
                }}
              />
              <span
                className="absolute left-2 top-[30px] size-3 rounded-full border-2 border-[#4C46A3] bg-white"
                style={{
                  transform: `scale(${on(cue) ? 1 : 0})`,
                  transition: tr("transform .3s cubic-bezier(.2,.8,.2,1.5)"),
                }}
              />
            </div>
            <div className="pt-3.5" style={fade(cue, 12)}>
              <div className="grid grid-cols-[minmax(84px,auto)_minmax(0,1fr)] items-baseline gap-x-4 gap-y-1 rounded-lg border border-line bg-white px-4 py-3">
                <span className={`${monoCaps} !leading-[1.4] text-[#4C46A3]`}>{k}</span>
                <span
                  className={`text-sm leading-[1.45] text-ink [overflow-wrap:anywhere] ${mono ? "font-mono" : ""}`}
                >
                  {v}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------ Compare ------------------------------ */

function Compare({ on, tr, fade, t }: FadeHelpers & { t: number }) {
  const count = Math.round(41 * ease((t - 400) / 1900));
  const cols = "grid grid-cols-[minmax(52px,.7fr)_minmax(0,1.2fr)_minmax(0,1.2fr)_64px]";
  return (
    <div className="overflow-hidden rounded-lg border border-line bg-white">
      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-2 border-b border-line px-[18px] py-4">
        <span className="mr-auto text-[15px] font-semibold">Compared with your own model</span>
        <span className="rounded bg-[#EEEDF8] px-[9px] py-[5px] text-xs font-medium text-[#2E2A6B]">
          {count} of 42 cells match
        </span>
        <span
          className="rounded bg-[#FFF1D6] px-[9px] py-[5px] text-xs font-medium text-[#7A4A00]"
          style={{ opacity: on(920) ? 1 : 0, transition: tr("opacity .3s") }}
        >
          1 difference
        </span>
      </div>
      <div className={`${cols} border-b border-line bg-soft px-[18px] py-2.5 text-[11px] font-medium text-[#5E5C78]`}>
        <span>LP · Pref</span>
        <span className="text-right">Navable</span>
        <span className="text-right">Your model</span>
        <span />
      </div>
      {PREF.map(([lp, nav, client], i) => {
        const done = on(400 + i * 260);
        const diff = !!client;
        const flagged = diff && done;
        return (
          <div
            key={lp}
            className={`${cols} h-10 items-center border-b border-[#F0EFF5] px-[18px] text-[13px]`}
            style={{ background: flagged ? "#FFF8EB" : "#FFFFFF", transition: tr("background .4s") }}
          >
            <span className="text-[#5E5C78]">{lp}</span>
            <span className="text-right">{nav}</span>
            <span
              className="text-right"
              style={{
                color: flagged ? "#B4540A" : "#1E1B3A",
                fontWeight: flagged ? 600 : 400,
                transition: tr("color .3s"),
              }}
            >
              {client ?? nav}
            </span>
            <span className="flex justify-end">
              <span
                className="flex size-[22px] items-center justify-center rounded-full text-xs font-bold text-white"
                style={{
                  background: diff ? "#F5A61D" : "#4C46A3",
                  transform: `scale(${done ? 1 : 0})`,
                  transition: tr("transform .3s cubic-bezier(.2,.8,.2,1.6), background .3s"),
                }}
              >
                {diff ? "!" : "✓"}
              </span>
            </span>
          </div>
        );
      })}
      <div className="flex items-start gap-3 px-[18px] pb-4 pt-3.5" style={fade(2500, 8)}>
        <span className="shrink-0 rounded border border-[#F5A61D] px-2 py-1 text-[11px] font-semibold text-[#7A4A00]">
          126.41 · Explained
        </span>
        <span className="text-[13px] leading-[1.5] text-[#3E3C5A]">
          The client model compounds pref quarterly. The LPA Preferred Return says monthly, so Navable
          compounds monthly.
        </span>
      </div>
    </div>
  );
}

/* ------------------------------- Review ------------------------------ */

function Review({ on, tr }: Helpers) {
  const signed = on(1900);
  const locked = on(2300);
  const lockColor = locked ? "#1E1B3A" : "#9A98AE";
  return (
    <div
      className="overflow-hidden rounded-lg border bg-white"
      style={{
        borderColor: locked ? "#4C46A3" : "#E9E8F0",
        boxShadow: locked ? "0 0 0 4px rgba(76,70,163,.12)" : "none",
        transition: tr("border-color .4s, box-shadow .5s"),
      }}
    >
      <div className="flex flex-wrap items-center gap-2.5 border-b border-line px-[18px] py-4">
        <svg width="18" height="20" viewBox="0 0 18 20" fill="none" className="shrink-0">
          <path
            d="M5 9V6a4 4 0 0 1 8 0v3"
            stroke={lockColor}
            strokeWidth="1.8"
            strokeLinecap="round"
            style={{
              transform: `translateY(${locked ? 0 : -3}px)`,
              transition: tr("transform .4s cubic-bezier(.2,.8,.2,1.4), stroke .3s"),
            }}
          />
          <rect
            x="2"
            y="9"
            width="14"
            height="10"
            rx="2"
            fill={locked ? "#F5A61D" : "#FFFFFF"}
            stroke={lockColor}
            strokeWidth="1.8"
            style={{ transition: tr("fill .3s, stroke .3s") }}
          />
        </svg>
        <span className="mr-auto text-[15px] font-semibold">Q3 2026 distribution · Investment B</span>
        <span
          className="rounded px-[9px] py-[5px] text-xs font-medium"
          style={{
            background: locked ? "#1F1C3A" : "#EEEDF8",
            color: locked ? "#FFFFFF" : "#2E2A6B",
            transition: tr("background .3s, color .3s"),
          }}
        >
          {locked ? "Signed off · locked" : "In review"}
        </span>
      </div>
      {REVIEW_ROWS.map(([k, v], i) => {
        const cue = 300 + i * 450;
        return (
          <div
            key={k}
            className="grid grid-cols-[96px_minmax(0,1fr)_22px] items-center gap-3 border-b border-[#F0EFF5] px-[18px] py-[13px]"
          >
            <span className={`${monoCaps} text-[#5E5C78]`}>{k}</span>
            <span className="relative min-h-5 text-sm leading-[1.4]">
              <span
                className="absolute left-0 top-[5px] h-2.5 w-[70%] rounded-[3px] bg-[#F0EFF5]"
                style={{ opacity: on(cue) ? 0 : 1, transition: tr("opacity .3s") }}
              />
              <span className="relative" style={{ opacity: on(cue) ? 1 : 0, transition: tr("opacity .4s") }}>
                {v}
              </span>
            </span>
            <span
              className="flex size-5 items-center justify-center rounded-full bg-[#4C46A3] text-[11px] font-bold text-white"
              style={{
                transform: `scale(${on(cue + 150) ? 1 : 0})`,
                transition: tr("transform .3s cubic-bezier(.2,.8,.2,1.6)"),
              }}
            >
              ✓
            </span>
          </div>
        );
      })}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2.5 bg-soft px-[18px] py-3.5">
        <span className="text-[13px] text-[#5E5C78]">
          Prepared by <strong className="font-semibold text-ink">M. Ortiz</strong>
        </span>
        <span className="text-[13px] text-[#5E5C78]">
          Reviewer <strong className="font-semibold text-ink">J. Chen</strong>
        </span>
        <span
          className="ml-auto inline-flex h-[34px] items-center rounded-md border px-3.5 text-[13px] font-medium text-ink"
          style={{
            background: signed ? "#FFFFFF" : "#F5A61D",
            borderColor: signed ? "#CFCEDB" : "#F5A61D",
            transform: `scale(${on(1750) && !signed ? 0.94 : 1})`,
            transition: tr("background .3s, color .3s, border-color .3s, transform .25s"),
          }}
        >
          {signed ? "Signed · J. Chen" : "Sign off"}
        </span>
      </div>
    </div>
  );
}

/* ----------------------------- Exceptions ---------------------------- */

const ROW_H = 52;

function Exceptions({ on, tr }: Helpers) {
  const go = on(800);
  const sorted = WORK.map((w, i) => ({ w, i })).sort(
    (a, b) => STATES[a.w[0]][3] - STATES[b.w[0]][3] || a.i - b.i,
  );
  const rank: Record<number, number> = {};
  sorted.forEach((s, r) => {
    rank[s.i] = r;
  });
  return (
    <div className="overflow-hidden rounded-lg border border-line bg-white">
      <div className="flex items-center gap-2.5 border-b border-line px-[18px] py-3.5">
        <span className="mr-auto text-[15px] font-semibold">Open items · all clients</span>
        <span
          className={monoCaps}
          style={{ color: go ? "#4C46A3" : "#767995", transition: tr("color .3s") }}
        >
          Exceptions first
        </span>
      </div>
      <div className="relative" style={{ height: WORK.length * ROW_H }}>
        {WORK.map(([state, item, fund], i) => {
          const [bg, border, color] = STATES[state];
          return (
            <div
              key={item}
              className="absolute inset-x-0 top-0 grid grid-cols-[132px_minmax(0,1fr)] items-center gap-3.5 border-b border-[#F0EFF5] bg-white px-[18px]"
              style={{
                height: ROW_H,
                transform: `translateY(${(go ? rank[i] : i) * ROW_H}px)`,
                opacity: state === "Locked" && on(2000) ? 0.55 : 1,
                transition: tr(
                  `transform .8s cubic-bezier(.65,0,.35,1) ${(rank[i] * 0.06).toFixed(2)}s, opacity .4s`,
                ),
              }}
            >
              <span
                className="justify-self-start whitespace-nowrap rounded-full border px-[9px] py-[5px] text-xs font-medium"
                style={{ background: bg, borderColor: border, color }}
              >
                {state}
              </span>
              <span className="flex min-w-0 flex-col gap-0.5">
                <span className="truncate text-sm text-ink">{item}</span>
                <span className="truncate text-xs text-[#5E5C78]">{fund}</span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
