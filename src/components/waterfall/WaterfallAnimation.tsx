"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { CSSProperties } from "react";

/**
 * Animated illustration of a distribution waterfall for the /waterfall
 * page (ported from the design build's WaterfallAnimation). A fixed 960×420
 * stage is scaled to the container width; an 11s loop fills the proceeds bar,
 * then each tier in turn.
 *
 * - Server renders the completed frame (STATIC_T), so there is a meaningful,
 *   layout-stable image before/without JavaScript and for reduced motion.
 * - The loop stops when offscreen, when the tab is hidden, when paused, and is
 *   never started for prefers-reduced-motion (static frame, no button).
 */

const STAGE_W = 960;
const STAGE_H = 420;
const LOOP_MS = 11000;
const STATIC_T = 8000;
const UPDATE_INTERVAL_MS = 40;

const X0 = 260;
const TRACK_W = 672;
const TOTAL = 100_000_000;

// [tier label, name, amount, time (ms) the tier starts filling]
const TIERS: [string, string, number, number][] = [
  ["TIER 01", "Return of capital", 60_000_000, 1300],
  ["TIER 02", "Preferred return (8%)", 9_600_000, 2500],
  ["TIER 03", "GP catch-up", 2_400_000, 3500],
  ["TIER 04", "Carried interest 80/20", 28_000_000, 4400],
];

// Static geometry: each tier's bar starts where the previous one ended.
const ROWS = TIERS.map(([tier, name, v, cue], i) => {
  const before = TIERS.slice(0, i).reduce((sum, [, , amount]) => sum + amount, 0);
  return {
    tier,
    name,
    v,
    cue,
    i,
    x: X0 + (before / TOTAL) * TRACK_W,
    w: Math.max(14, (v / TOTAL) * TRACK_W),
    top: 142 + i * 58,
    isSplit: i === 3,
  };
});

const INK = "#1E1B3A";
const SUB = "#5E5C78";
const PURPLE = "#4C46A3";
const ORANGE = "#F5A61D";
const TRACK = "#F4F4F8";

const ease = (p: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, p)), 3);
const money = (v: number) => "$" + Math.round(v).toLocaleString("en-US");

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReduced(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}
const getReduced = () => window.matchMedia(REDUCED_QUERY).matches;
const getReducedServer = () => false;

function subscribeVisibility(onChange: () => void) {
  document.addEventListener("visibilitychange", onChange);
  return () => document.removeEventListener("visibilitychange", onChange);
}
const getTabHidden = () => document.hidden;
const getTabHiddenServer = () => false;

const abs = (style: CSSProperties): CSSProperties => ({ position: "absolute", ...style });

const monoLabel: CSSProperties = {
  margin: 0,
  fontFamily: "var(--font-mono)",
  fontWeight: 500,
  fontSize: 10,
  lineHeight: 1,
  letterSpacing: ".12em",
  color: SUB,
};

type RowLabelProps = {
  tier: string;
  name: string;
  amount: string;
  style: CSSProperties;
};

function RowLabel({ tier, name, amount, style }: RowLabelProps) {
  return (
    <div style={abs({ left: 28, width: 220, ...style })}>
      <p style={monoLabel}>{tier}</p>
      <p style={{ margin: "6px 0 0", fontSize: 14, fontWeight: 500, color: INK }}>{name}</p>
      <p style={{ margin: "4px 0 0", fontSize: 13, color: SUB, fontVariantNumeric: "tabular-nums" }}>
        {amount}
      </p>
    </div>
  );
}

export default function WaterfallAnimation() {
  const rootRef = useRef<HTMLDivElement>(null);
  const tRef = useRef(STATIC_T);
  const startedRef = useRef(false);

  const [t, setT] = useState(STATIC_T);
  const [playing, setPlaying] = useState(true);
  const [scale, setScale] = useState<number | null>(null);
  const [inView, setInView] = useState(true);
  const tabHidden = useSyncExternalStore(subscribeVisibility, getTabHidden, getTabHiddenServer);
  const reduced = useSyncExternalStore(subscribeReduced, getReduced, getReducedServer);

  // Scale the fixed-size stage to the container width.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / STAGE_W));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Pause while offscreen.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const running = playing && inView && !tabHidden && !reduced;

  // The clock. Only exists while the animation is actually running.
  useEffect(() => {
    if (!running) return;
    if (!startedRef.current) {
      // First run after hydration: begin the loop from the top.
      startedRef.current = true;
      tRef.current = 0;
    }
    const base = performance.now() - tRef.current;
    let raf = 0;
    let lastPaint = -Infinity;
    const frame = (now: number) => {
      const next = (now - base) % LOOP_MS;
      tRef.current = next;
      if (now - lastPaint >= UPDATE_INTERVAL_MS) {
        lastPaint = now;
        setT(next);
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [running]);

  const shownT = reduced ? STATIC_T : t;
  const on = (cue: number) => shownT >= cue;
  const count = (cue: number, dur: number, v: number) => money(v * ease((shownT - cue) / dur));

  // Transitions are disabled at loop restart and entirely for reduced motion.
  const settled = shownT >= 250 && !reduced;
  const trBar = settled ? "transform .8s cubic-bezier(.4,0,.2,1)" : "none";
  const trConn = settled ? "transform .35s ease-out" : "none";
  const trLabel = settled ? "opacity .4s, transform .5s cubic-bezier(.2,.8,.2,1.1)" : "none";
  const stageOpacity = shownT > LOOP_MS - 600 || shownT < 250 ? 0 : 1;

  const splitOn = on(5800);

  // Server / pre-measure: derive the scale in CSS from the container width.
  const stageTransform =
    scale !== null ? `scale(${scale})` : "scale(tan(atan2(100cqw, 960px)))";

  return (
    <div className="w-full bg-white">
      <div
        ref={rootRef}
        role="img"
        aria-label="Illustrative distribution waterfall: $100,000,000 of proceeds flows through return of capital ($60,000,000), an 8% preferred return ($9,600,000), a GP catch-up ($2,400,000), and an 80/20 carried interest split ($28,000,000), ending with $22,400,000 to LPs and $5,600,000 to the GP."
        className="font-sans"
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: `${STAGE_W}/${STAGE_H}`,
          overflow: "hidden",
          background: "#FFFFFF",
          textAlign: "left",
          lineHeight: "normal",
          containerType: "inline-size",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: STAGE_W,
            height: STAGE_H,
            transformOrigin: "0 0",
            transform: stageTransform,
            opacity: stageOpacity,
            transition: reduced ? "none" : "opacity .5s",
          }}
        >
          <div style={abs({ left: 28, top: 24, right: 28 })}>
            <span style={{ fontSize: 16, fontWeight: 600, color: INK }}>Distribution Waterfall</span>
          </div>

          {/* Source: distributable proceeds */}
          <RowLabel
            tier="PROCEEDS"
            name="Distributable proceeds"
            amount={count(300, 900, TOTAL)}
            style={{ top: 76 }}
          />
          <div
            style={abs({
              left: X0,
              top: 82,
              width: TRACK_W,
              height: 36,
              background: TRACK,
              borderRadius: 4,
              overflow: "hidden",
            })}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                background: "#1F1C3A",
                transformOrigin: "0 50%",
                transform: `scaleX(${on(300) ? 1 : 0})`,
                transition: trBar,
              }}
            />
          </div>

          {/* Tiers */}
          {ROWS.map(({ tier, name, v, cue, i, x, w, top, isSplit }) => (
            <div key={tier}>
              <RowLabel
                tier={tier}
                name={name}
                amount={count(cue, 800, v)}
                style={{
                  top,
                  opacity: on(cue - 200) ? 1 : 0,
                  transform: on(cue - 200) ? "none" : "translateX(-8px)",
                  transition: trLabel,
                }}
              />
              <div
                style={abs({
                  left: x,
                  top: top - 22,
                  width: 0,
                  height: 28,
                  borderLeft: "1.5px dashed #A9A5D6",
                  transformOrigin: "50% 0",
                  transform: `scaleY(${on(cue - 300) ? 1 : 0})`,
                  transition: trConn,
                })}
              />
              <div
                style={abs({
                  left: x,
                  top: top + 6,
                  width: w,
                  height: 36,
                  background: TRACK,
                  borderRadius: 4,
                  overflow: "hidden",
                  display: "flex",
                })}
              >
                <div
                  style={{
                    flex: isSplit ? 80 : 1,
                    height: "100%",
                    background: i === 0 ? "#2E2A6B" : PURPLE,
                    transformOrigin: "0 50%",
                    transform: `scaleX(${on(cue) ? 1 : 0})`,
                    transition: trBar,
                  }}
                />
                <div
                  style={{
                    flex: isSplit ? 20 : 0,
                    height: "100%",
                    background: ORANGE,
                    transformOrigin: "0 50%",
                    transform: `scaleX(${isSplit && on(cue + 800) ? 1 : 0})`,
                    transition: trBar,
                  }}
                />
              </div>
            </div>
          ))}

          {/* LP / GP split */}
          <div
            style={abs({
              left: 744,
              top: 376,
              display: "flex",
              gap: 8,
              opacity: splitOn ? 1 : 0,
              transform: splitOn ? "none" : "translateY(6px)",
              transition: trLabel,
            })}
          >
            <span className="flex items-center gap-1.5 rounded-md bg-[#EEEDF8] px-2.5 py-1.5 text-xs font-medium text-[#2E2A6B]">
              <span className="size-2 bg-[#4C46A3]" />
              LP $22.4M
            </span>
            <span className="flex items-center gap-1.5 rounded-md bg-[#FFF1D6] px-2.5 py-1.5 text-xs font-medium text-[#7A4A00]">
              <span className="size-2 bg-[#F5A61D]" />
              GP $5.6M
            </span>
          </div>
        </div>
      </div>

      {!reduced && (
        <div className="flex justify-end px-4 pb-4">
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "Pause animation" : "Play animation"}
            className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-line-strong bg-white text-ink transition-colors hover:border-ink"
          >
            {playing ? (
              <svg width="12" height="14" viewBox="0 0 12 14" aria-hidden="true">
                <path d="M1 1h3v12H1zM8 1h3v12H8z" fill="currentColor" />
              </svg>
            ) : (
              <svg width="12" height="14" viewBox="0 0 12 14" aria-hidden="true">
                <path d="M1 1l10 6-10 6z" fill="currentColor" />
              </svg>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
