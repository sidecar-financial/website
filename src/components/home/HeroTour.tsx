"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { CSSProperties } from "react";
import { LOOP_MS, STAGE_H, STAGE_W, STATIC_T, tourFrame } from "./heroTourModel";

/**
 * Animated product tour shown in the home hero (ported from the design build's
 * HeroAnimation). A fixed 1128×640 "app" stage is scaled to the container
 * width; a 25s loop walks through Carry Plans → Vesting → Participants.
 *
 * - Server renders the completed Participants frame (STATIC_T) so there is a
 *   meaningful, layout-stable image before/without JavaScript.
 * - Time is driven by requestAnimationFrame, state updates throttled to ~25fps.
 * - The loop stops when offscreen, when the tab is hidden, when paused, and is
 *   never started for prefers-reduced-motion (static completed frame, no button).
 */

const SCENE_EASE = "cubic-bezier(.2,.8,.2,1)";
const UPDATE_INTERVAL_MS = 40;

const INK = "#1E1B3A";
const SUB = "#5E5C78";
const BORDER = "#E9E8F0";
const PURPLE = "#4C46A3";

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

export default function HeroTour() {
  const rootRef = useRef<HTMLDivElement>(null);
  const tRef = useRef(STATIC_T);
  const startedRef = useRef(false);

  const [t, setT] = useState(STATIC_T);
  const [playing, setPlaying] = useState(true);
  const [scale, setScale] = useState<number | null>(null);
  const [inView, setInView] = useState(true);
  // Pause while the tab is hidden.
  const tabHidden = useSyncExternalStore(subscribeVisibility, getTabHidden, getTabHiddenServer);
  const reduced = useSyncExternalStore(subscribeReduced, getReduced, getReducedServer);

  // Scale the fixed-size stage to the container width.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / STAGE_W);
    });
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

  // The clock. Only exists while the tour is actually running.
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
  const f = tourFrame(shownT);
  // Transitions are disabled entirely for reduced motion.
  const tr = (value: string) => (reduced ? "none" : value);

  const stageScale = scale ?? undefined;
  const stageTransform =
    stageScale !== undefined
      ? `scale(${stageScale})`
      : // Before the ResizeObserver fires (SSR / no JS) derive the scale in CSS from the container width.
        "scale(tan(atan2(100cqw, 1128px)))";

  return (
    <div className="relative">
      <div
        ref={rootRef}
        role="img"
        aria-label="Animated product tour of Navable: a carry plan allocating Core Fund points to three participants, a vesting timeline comparing the current plan with a scenario, and John Roberts' total compensation dashboard totaling $2,521,483."
        className="font-sans"
        style={{
          lineHeight: "normal",
          position: "relative",
          width: "100%",
          aspectRatio: `${STAGE_W}/${STAGE_H}`,
          overflow: "hidden",
          background: "#F4F4F8",
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
          }}
        >
          {/* Top app bar */}
          <div
            style={abs({
              left: 0,
              top: 0,
              width: STAGE_W,
              height: 56,
              background: "#FFFFFF",
              borderBottom: `1px solid ${BORDER}`,
              display: "flex",
              alignItems: "center",
              padding: "0 40px",
              gap: 28,
            })}
          >
            <Image
              src="/images/navable-logo.svg"
              alt=""
              width={96}
              height={24}
              unoptimized
              style={{ width: 96, height: "auto", marginRight: 18 }}
            />
            <span style={{ fontSize: 13, fontWeight: 500, color: INK }}>Company</span>
            <span style={{ fontSize: 13, fontWeight: 500, color: INK }}>Fund Management</span>
            <span
              style={{
                position: "relative",
                height: 56,
                display: "flex",
                alignItems: "center",
                fontSize: 13,
                fontWeight: 500,
                color: PURPLE,
              }}
            >
              Carry Management
              <TabUnderline color={PURPLE} />
            </span>
            <span style={{ marginLeft: "auto", fontSize: 12, fontWeight: 600, color: INK }}>My Tasks</span>
            <span style={{ width: 4, height: 4, borderRadius: "50%", background: INK }} />
            <svg width="14" height="16" viewBox="0 0 14 16">
              <path
                d="M7 1.5a4 4 0 0 0-4 4v3.2L1.5 11.5h11L11 8.7V5.5a4 4 0 0 0-4-4zM5.5 13.5a1.5 1.5 0 0 0 3 0"
                stroke={INK}
                strokeWidth="1.3"
                fill="none"
              />
            </svg>
            <span style={{ width: 4, height: 4, borderRadius: "50%", background: INK }} />
            <span style={{ fontSize: 12, color: SUB }}>Log Out</span>
          </div>

          {/* Section tabs */}
          <div
            style={abs({
              left: 0,
              top: 56,
              width: STAGE_W,
              height: 56,
              background: "#FFFFFF",
              borderBottom: `1px solid ${BORDER}`,
              display: "flex",
              alignItems: "center",
              padding: "0 40px",
              gap: 26,
            })}
          >
            {f.tabs.map((tab) => (
              <span
                key={tab.label}
                style={{
                  position: "relative",
                  height: 56,
                  display: "flex",
                  alignItems: "center",
                  fontSize: 13,
                  fontWeight: 500,
                  color: tab.color,
                  transition: tr("color .3s"),
                }}
              >
                {tab.label}
                <TabUnderline color={tab.line} transition={tr("background-color .3s")} />
              </span>
            ))}
          </div>

          <div style={abs({ left: 0, top: 112, width: STAGE_W, height: 528 })}>
            {/* Scene 1: Carry Plans */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                opacity: f.scenes[0].o,
                transform: f.scenes[0].tf,
                transition: tr(`opacity .45s ease, transform .6s ${SCENE_EASE}`),
              }}
            >
              <p style={heading(26, 26, 600)}>Carry Plans</p>
              <p style={crumb(66)}>Carry Management  /  Carry Plans  /  Core Fund</p>
              <div
                style={abs({
                  left: 40,
                  top: 110,
                  width: 320,
                  background: "#FFFFFF",
                  border: `1px solid ${BORDER}`,
                  borderRadius: 8,
                  padding: 20,
                  boxShadow: "0 10px 30px -14px rgba(31,28,58,.18)",
                  opacity: f.a.panel.o,
                  transform: f.a.panel.tf,
                  transition: tr("opacity .5s, transform .6s cubic-bezier(.2,.8,.2,1.1)"),
                })}
              >
                <p style={{ margin: 0, fontSize: 12, color: SUB }}>Carry Plan</p>
                <p style={{ margin: "14px 0 0", fontSize: 14, fontWeight: 600, color: INK }}>Select a fund from list</p>
                <p style={{ margin: "4px 0 0", fontSize: 11, color: SUB }}>
                  Select a fund to create a fund level carry plan
                </p>
                <div
                  style={{
                    marginTop: 14,
                    display: "inline-flex",
                    border: `1px solid ${BORDER}`,
                    borderRadius: 6,
                    padding: 3,
                    gap: 2,
                    fontSize: 11,
                  }}
                >
                  <span style={{ padding: "6px 10px", borderRadius: 4, background: "#F4F4F8", color: INK, fontWeight: 500 }}>
                    Fund Level
                  </span>
                  <span style={{ padding: "6px 10px", color: PURPLE }}>Deal Level</span>
                </div>
                <div style={{ marginTop: 16, border: `1px solid ${BORDER}`, borderRadius: 6, overflow: "hidden" }}>
                  <div
                    style={{
                      height: 40,
                      background: "#2E2A6B",
                      color: "#FFFFFF",
                      fontSize: 12,
                      fontWeight: 500,
                      display: "flex",
                      alignItems: "center",
                      paddingLeft: 44,
                    }}
                  >
                    Fund Name
                  </div>
                  <div
                    style={{
                      height: 44,
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                      paddingLeft: 14,
                      borderBottom: `1px solid ${BORDER}`,
                      fontSize: 12,
                      color: INK,
                    }}
                  >
                    <span style={{ width: 14, height: 14, borderRadius: "50%", border: "1px solid #BDBBD0" }} />
                    Opportunity Fund
                  </div>
                  <div
                    style={{
                      height: 44,
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                      paddingLeft: 14,
                      fontSize: 12,
                      color: INK,
                      background: f.a.rowBg,
                      transition: tr("background .4s"),
                    }}
                  >
                    <span
                      style={{
                        width: 14,
                        height: 14,
                        borderRadius: "50%",
                        border: `1px solid ${f.a.radioBorder}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: tr("border-color .3s"),
                      }}
                    >
                      <span
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          background: "#2E2A6B",
                          transform: `scale(${f.a.radioDot})`,
                          transition: tr("transform .35s cubic-bezier(.2,.8,.2,1.4)"),
                        }}
                      />
                    </span>
                    Core Fund
                  </div>
                </div>
              </div>
              <svg
                width="1128"
                height="528"
                viewBox="0 0 1128 528"
                style={{ position: "absolute", left: 0, top: 0, pointerEvents: "none" }}
              >
                {f.links.map((l, i) => (
                  <path
                    key={i}
                    d={l.d}
                    pathLength={1}
                    stroke={l.color}
                    strokeWidth="1.5"
                    fill="none"
                    style={{
                      strokeDasharray: 1,
                      strokeDashoffset: l.off,
                      transition: tr("stroke-dashoffset .7s cubic-bezier(.4,0,.2,1), stroke .3s"),
                    }}
                  />
                ))}
                <circle
                  cx="360"
                  cy="364"
                  r="4"
                  fill={PURPLE}
                  style={{ opacity: f.a.lineDot, transition: tr("opacity .3s") }}
                />
              </svg>
              {f.people.map((p) => (
                <div
                  key={p.initials}
                  style={abs({
                    left: 520,
                    top: p.top,
                    width: 540,
                    height: 92,
                    background: "#FFFFFF",
                    border: `1px solid ${p.border}`,
                    borderRadius: 8,
                    padding: "0 20px",
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    boxShadow: p.shadow,
                    opacity: p.o,
                    transform: p.tf,
                    transition: tr(
                      "opacity .45s, transform .6s cubic-bezier(.2,.8,.2,1.15), box-shadow .5s, border-color .4s",
                    ),
                  })}
                >
                  <span
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      background: "#E6E4F5",
                      color: PURPLE,
                      fontSize: 14,
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {p.initials}
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: INK }}>{p.name}</p>
                    <p style={{ margin: "6px 0 0", fontSize: 11, color: SUB }}>{p.dept}</p>
                    <p style={{ margin: "4px 0 0", fontSize: 11, color: SUB }}>Hire Date: {p.hire}</p>
                  </div>
                  <div style={{ textAlign: "right", fontSize: 11, lineHeight: 1.75, color: "#3E3C5A" }}>
                    <p style={{ margin: 0 }}>Total Comp: {p.comp}</p>
                    <p style={{ margin: 0 }}>Total Carry Value: {p.carry}</p>
                    <p style={{ margin: 0 }}>Vested Carry Value: {p.vested}</p>
                  </div>
                  <span
                    style={{
                      position: "absolute",
                      left: "50%",
                      bottom: -13,
                      padding: "5px 10px",
                      borderRadius: 999,
                      background: "#F5A61D",
                      color: INK,
                      fontSize: 11,
                      fontWeight: 600,
                      opacity: p.badgeO,
                      transform: `translateX(-50%) scale(${p.badgeS})`,
                      transition: tr("opacity .3s, transform .45s cubic-bezier(.2,.8,.2,1.5)"),
                    }}
                  >
                    +16 points
                  </span>
                </div>
              ))}
            </div>

            {/* Scene 2: Vesting */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                opacity: f.scenes[1].o,
                transform: f.scenes[1].tf,
                transition: tr(`opacity .45s ease, transform .6s ${SCENE_EASE}`),
              }}
            >
              <p style={heading(26, 26, 600)}>Vesting</p>
              <p style={crumb(66)}>Carry Management  /  Vesting  /  Fund II</p>
              <div style={abs({ left: 40, top: 104, width: 1048, display: "flex", gap: 16 })}>
                {f.kpis.map((k) => (
                  <div
                    key={k.label}
                    style={{
                      flex: 1,
                      height: 76,
                      background: "#FFFFFF",
                      border: `1px solid ${BORDER}`,
                      borderRadius: 8,
                      padding: "16px 20px",
                      opacity: k.o,
                      transform: k.tf,
                      transition: tr("opacity .45s, transform .55s cubic-bezier(.2,.8,.2,1.1)"),
                    }}
                  >
                    <p style={{ margin: 0, fontSize: 11, color: SUB }}>{k.label}</p>
                    <p
                      style={{
                        margin: "8px 0 0",
                        fontSize: 20,
                        fontWeight: 600,
                        color: INK,
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {k.value}
                    </p>
                  </div>
                ))}
              </div>
              <div
                style={abs({
                  left: 40,
                  top: 196,
                  width: 1048,
                  height: 312,
                  background: "#FFFFFF",
                  border: `1px solid ${BORDER}`,
                  borderRadius: 8,
                  opacity: f.b.card.o,
                  transform: f.b.card.tf,
                  transition: tr("opacity .5s, transform .6s cubic-bezier(.2,.8,.2,1.1)"),
                })}
              >
                <div style={abs({ left: 24, top: 20, display: "flex", alignItems: "center", gap: 24 })}>
                  <span style={{ fontSize: 15, fontWeight: 600, color: INK }}>Vesting Timeline</span>
                  <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, color: SUB }}>
                    <span style={{ width: 16, height: 2, background: PURPLE }} />
                    Current plan
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, color: SUB }}>
                    <span style={{ width: 16, borderTop: "2px dashed #A9A5D6" }} />
                    Scenario
                  </span>
                </div>
                <span
                  style={abs({
                    right: 24,
                    top: 16,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "6px 12px",
                    borderRadius: 6,
                    background: "#EEEDF8",
                    fontSize: 11,
                    fontWeight: 500,
                    color: PURPLE,
                  })}
                >
                  <span style={{ width: 8, height: 8, background: PURPLE }} />
                  Fund II
                </span>
                <svg width="1048" height="250" viewBox="0 0 1048 250" style={{ position: "absolute", left: 0, top: 56 }}>
                  <g fontSize="10" fill="#8C8AA3">
                    <text x="24" y="24">$1.5M</text>
                    <text x="24" y="124">$750K</text>
                    <text x="24" y="224">0</text>
                  </g>
                  <path d="M70 20H1020M70 120H1020M70 220H1020" stroke="#EFEEF4" strokeWidth="1" />
                  <g style={{ clipPath: f.b.areaClip, transition: tr("clip-path 1.2s cubic-bezier(.4,0,.2,1)") }}>
                    <path d="M90 151V220H962V108H794V108H626V108L458 151H290H90Z" fill="#EEEDF8" />
                  </g>
                  <g style={{ clipPath: f.b.lineClip, transition: tr("clip-path 1.3s cubic-bezier(.4,0,.2,1)") }}>
                    <path d="M90 151H290H458L626 108H794H962" stroke={PURPLE} strokeWidth="2" fill="none" />
                    <circle cx="90" cy="151" r="3.5" fill={PURPLE} />
                    <circle cx="290" cy="151" r="3.5" fill={PURPLE} />
                    <circle cx="458" cy="151" r="3.5" fill={PURPLE} />
                    <circle cx="626" cy="108" r="3.5" fill={PURPLE} />
                    <circle cx="962" cy="108" r="3.5" fill={PURPLE} />
                  </g>
                  <g style={{ clipPath: f.b.scenClip, transition: tr("clip-path 1s cubic-bezier(.4,0,.2,1)") }}>
                    <path
                      d="M458 151C560 146 690 92 794 56L962 34"
                      stroke="#A9A5D6"
                      strokeWidth="2"
                      strokeDasharray="5 5"
                      fill="none"
                    />
                  </g>
                  <circle
                    cx="794"
                    cy="108"
                    r="6"
                    fill="#FFFFFF"
                    stroke="#F5A61D"
                    strokeWidth="2.5"
                    style={{ opacity: f.b.dot, transition: tr("opacity .3s") }}
                  />
                  <g fontSize="10" fill="#8C8AA3" textAnchor="middle">
                    <text x="90" y="244">Jan 25</text>
                    <text x="234" y="244">Apr 25</text>
                    <text x="378" y="244">Jul 25</text>
                    <text x="522" y="244">Oct 25</text>
                    <text x="666" y="244">Jan 26</text>
                    <text x="810" y="244">Apr 26</text>
                    <text x="954" y="244">Jul 26</text>
                  </g>
                </svg>
                <div
                  style={abs({
                    left: 620,
                    top: 72,
                    width: 230,
                    padding: "14px 16px",
                    background: "#FFFFFF",
                    border: `1px solid ${BORDER}`,
                    borderRadius: 8,
                    boxShadow: "0 14px 30px -12px rgba(31,28,58,.25)",
                    display: "flex",
                    gap: 12,
                    opacity: f.b.tip.o,
                    transform: f.b.tip.tf,
                    transition: tr("opacity .4s, transform .5s cubic-bezier(.2,.8,.2,1.3)"),
                  })}
                >
                  <span style={{ width: 3, alignSelf: "stretch", background: "#F5A61D", borderRadius: 2 }} />
                  <div>
                    <p style={{ margin: 0, fontSize: 13, color: INK }}>
                      Apr 2026 <strong style={{ marginLeft: 8, fontWeight: 600 }}>$1,295,700</strong>
                    </p>
                    <p style={{ margin: "6px 0 0", fontSize: 11, color: SUB }}>Upcoming Vest</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Scene 3: Participants */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                opacity: f.scenes[2].o,
                transform: f.scenes[2].tf,
                transition: tr(`opacity .45s ease, transform .6s ${SCENE_EASE}`),
              }}
            >
              <p style={heading(22, 28, 600)}>John Roberts, MD</p>
              <p style={crumb(64)}>Carry Management  /  Participants  /  John Roberts</p>
              <div
                style={abs({
                  left: 40,
                  top: 100,
                  width: 1048,
                  height: 440,
                  background: "#FFFFFF",
                  border: `1px solid ${BORDER}`,
                  borderRadius: 8,
                  opacity: f.c.card.o,
                  transform: f.c.card.tf,
                  transition: tr("opacity .5s, transform .6s cubic-bezier(.2,.8,.2,1.1)"),
                })}
              >
                <div
                  style={{
                    height: 50,
                    borderBottom: `1px solid ${BORDER}`,
                    background: "#FAFAFC",
                    borderRadius: "8px 8px 0 0",
                    display: "flex",
                    alignItems: "center",
                    gap: 24,
                    padding: "0 24px",
                    fontSize: 12,
                    color: INK,
                  }}
                >
                  <span
                    style={{
                      position: "relative",
                      height: 50,
                      display: "flex",
                      alignItems: "center",
                      color: "#3B82C4",
                    }}
                  >
                    Total Compensation
                    <TabUnderline color="#3B82C4" />
                  </span>
                  <span>Co-Invest</span>
                  <span>Carry Plan</span>
                  <span>Profile</span>
                  <span>Documents</span>
                </div>
                <p style={abs({ left: 24, top: 76, margin: 0, fontSize: 17, fontWeight: 600, color: INK })}>Summary</p>
                <div
                  style={abs({
                    left: 24,
                    top: 116,
                    width: 448,
                    height: 112,
                    display: "flex",
                    gap: 2,
                    opacity: f.c.t1.o,
                    transform: f.c.t1.tf,
                    transition: tr("opacity .45s, transform .55s cubic-bezier(.2,.8,.2,1.1)"),
                  })}
                >
                  <div style={{ flex: 1, background: "#F4F4F8", padding: "24px 16px" }}>
                    <p style={{ margin: 0, fontSize: 11, color: INK }}>2023 Salary</p>
                    <p style={bigNum()}>{f.c.salary}</p>
                  </div>
                  <div style={{ flex: 1, background: "#F4F4F8", padding: "24px 16px" }}>
                    <p style={{ margin: 0, fontSize: 11, color: INK }}>Annual Bonus</p>
                    <p style={bigNum()}>{f.c.bonus}</p>
                  </div>
                </div>
                <div
                  style={abs({
                    left: 24,
                    top: 244,
                    width: 448,
                    height: 112,
                    background: "#F4F4F8",
                    padding: "22px 16px",
                    opacity: f.c.t2.o,
                    transform: f.c.t2.tf,
                    transition: tr("opacity .45s, transform .55s cubic-bezier(.2,.8,.2,1.1)"),
                  })}
                >
                  <p style={{ margin: 0, fontSize: 11, color: INK }}>Estimated Carry Value</p>
                  <div style={{ marginTop: 12, display: "flex", gap: 14 }}>
                    <div>
                      <p style={{ ...bigNum(), margin: 0 }}>{f.c.carryTotal}</p>
                      <p style={{ margin: "4px 0 0", fontSize: 10, color: "#3E3C5A" }}>Total</p>
                    </div>
                    <span style={{ width: 1, background: "#9A98AE" }} />
                    <div>
                      <p style={{ ...bigNum(), margin: 0 }}>{f.c.carryAnn}</p>
                      <p style={{ margin: "4px 0 0", fontSize: 10, color: "#3E3C5A" }}>Annualized</p>
                    </div>
                  </div>
                </div>
                <svg
                  width="260"
                  height="260"
                  viewBox="0 0 260 260"
                  style={{ position: "absolute", left: 640, top: 96, transform: "rotate(-90deg)" }}
                >
                  {f.segs.map((s) => (
                    <circle
                      key={s.color}
                      cx="130"
                      cy="130"
                      r="96"
                      fill="none"
                      stroke={s.color}
                      strokeWidth="30"
                      style={{
                        strokeDasharray: s.dash,
                        strokeDashoffset: s.off,
                        transition: tr("stroke-dasharray .8s cubic-bezier(.4,0,.2,1)"),
                      }}
                    />
                  ))}
                </svg>
                <div
                  style={abs({
                    left: 640,
                    top: 96,
                    width: 260,
                    height: 260,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: f.c.centerO,
                    transition: tr("opacity .4s"),
                  })}
                >
                  <p style={{ margin: 0, fontSize: 11, color: INK }}>Total</p>
                  <p
                    style={{
                      margin: "6px 0 0",
                      fontSize: 20,
                      fontWeight: 500,
                      color: PURPLE,
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {f.c.total}
                  </p>
                </div>
                <div style={chartLabel(566, 110, f.c.l1, tr("opacity .4s"))}>
                  Salary
                  <br />
                  <strong>$400,000</strong>
                </div>
                <div style={chartLabel(900, 120, f.c.l2, tr("opacity .4s"))}>
                  Bonus
                  <br />
                  <strong>$500,000</strong>
                </div>
                <div style={chartLabel(530, 300, f.c.l3, tr("opacity .4s"))}>
                  Annualized
                  <br />
                  Estimated Carry
                  <br />
                  Value
                  <br />
                  <strong>$1,621,483</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pause/Play (WCAG 2.2.2). Outside the role="img" wrapper so it stays exposed to assistive tech. */}
      {!reduced && (
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          aria-label="Pause product tour animation"
          aria-pressed={!playing}
          className="absolute bottom-3 right-3 flex size-11 cursor-pointer items-center justify-center rounded-full border border-line-strong bg-white text-ink shadow-[0_6px_16px_-8px_rgba(31,28,58,0.3)] transition-colors hover:border-ink sm:bottom-4 sm:right-4"
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
      )}
    </div>
  );
}

/**
 * Active-tab underline. A real element rather than `box-shadow: inset 0 -2px`,
 * which leaves faint vertical hairlines at the tab's left/right edges when the
 * stage is scaled by a fractional factor.
 */
function TabUnderline({ color, transition }: { color: string; transition?: string }) {
  return (
    <span
      aria-hidden="true"
      style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 2, background: color, transition }}
    />
  );
}

function heading(top: number, size: number, weight: number): CSSProperties {
  return {
    position: "absolute",
    left: 40,
    top,
    margin: 0,
    fontSize: size,
    fontWeight: weight,
    letterSpacing: "-0.02em",
    color: INK,
  };
}

function crumb(top: number): CSSProperties {
  return { position: "absolute", left: 40, top, margin: 0, fontSize: 13, color: SUB };
}

function bigNum(): CSSProperties {
  return { margin: "14px 0 0", fontSize: 19, fontWeight: 500, color: INK, fontVariantNumeric: "tabular-nums" };
}

function chartLabel(left: number, top: number, o: number, transition: string): CSSProperties {
  return {
    position: "absolute",
    left,
    top,
    fontSize: 10,
    lineHeight: 1.5,
    color: INK,
    opacity: o,
    transition,
  };
}
