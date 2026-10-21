/**
 * Pure timeline model for the hero product tour (ported from the design build's
 * HeroAnimation component). Given a time `t` in milliseconds it returns every
 * visual value the stage needs, so rendering is deterministic: no Math.random,
 * no Date, same output on the server and the client for the same `t`.
 */

export const LOOP_MS = 25000;
export const STAGE_W = 1128;
export const STAGE_H = 640;
/** Frame shown for reduced motion and for the server-rendered markup (Participants scene, fully drawn). */
export const STATIC_T = 21000;

/** Scene windows [start, end) in ms. */
const SCENES: ReadonlyArray<readonly [number, number]> = [
  [0, 7600],
  [8000, 15600],
  [16000, 24600],
];

export const ease = (p: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, p)), 3);
const money = (v: number) => "$" + Math.round(v).toLocaleString("en-US");

type Fade = { o: number; tf: string };

export type Person = {
  initials: string;
  name: string;
  dept: string;
  hire: string;
  comp: string;
  carry: string;
  vested: string;
  top: number;
  o: number;
  tf: string;
  border: string;
  shadow: string;
  badgeO: number;
  badgeS: number;
};

export type TourFrame = {
  tabs: { label: string; color: string; line: string }[];
  scenes: [Fade, Fade, Fade];
  a: { panel: Fade; rowBg: string; radioBorder: string; radioDot: number; lineDot: number };
  people: Person[];
  links: { d: string; off: number; color: string }[];
  kpis: { label: string; value: string; o: number; tf: string }[];
  b: {
    card: Fade;
    lineClip: string;
    areaClip: string;
    scenClip: string;
    dot: number;
    tip: Fade;
  };
  segs: { color: string; dash: string; off: number }[];
  c: {
    card: Fade;
    t1: Fade;
    t2: Fade;
    salary: string;
    bonus: string;
    carryTotal: string;
    carryAnn: string;
    centerO: number;
    total: string;
    l1: number;
    l2: number;
    l3: number;
  };
};

const TAB_LABELS = ["Funds", "Investments", "Carry Plans", "Participants", "Distributions", "Vesting", "Vehicles"];
const CENTERS = [142, 264, 386];
const PEOPLE: ReadonlyArray<readonly [string, string, string, string, string, string, string]> = [
  ["AM", "Alex Morgan, Director", "Financial Analysis Department", "03/15/2021", "$12,345,678", "$8,345,672", "$1,143,162"],
  ["TS", "Taylor Smith, VP", "Risk Management Team", "11/09/2019", "$11,234,567", "$3,456,789", "$1,143,162"],
  ["JC", "Jamie Chen, Analyst", "Client Advisory Services", "05/30/2022", "$14,987,654", "$9,123,456", "$1,143,162"],
];
const KPIS: ReadonlyArray<readonly [string, number | null]> = [
  ["Vested", 2104300],
  ["Unvested", 1295700],
  ["Next vest", null],
];
const DONUT_R = 96;
const DONUT_C = 2 * Math.PI * DONUT_R;
const DONUT_SEGS: ReadonlyArray<readonly [string, number, number]> = [
  ["#4A1A75", 0.1586, 17000],
  ["#6A0DA0", 0.1983, 17400],
  ["#4C46A3", 0.6431, 17800],
];

export function tourFrame(t: number): TourFrame {
  const on = (c: number) => t >= c;
  const fade = (c: number, dy = 14): Fade => ({
    o: on(c) ? 1 : 0,
    tf: on(c) ? "none" : `translateY(${dy}px)`,
  });
  const count = (c: number, dur: number, v: number) => money(v * ease((t - c) / dur));
  const scene = (i: number): Fade => {
    const [a, b] = SCENES[i];
    const visible = t >= a && t < b;
    return { o: visible ? 1 : 0, tf: visible ? "none" : t < a ? "translateY(10px)" : "translateY(-10px)" };
  };
  const clip = (c: number) => (on(c) ? "inset(0 0 0 0)" : "inset(0 100% 0 0)");

  const active = t < 8000 ? "Carry Plans" : t < 16000 ? "Vesting" : "Participants";
  const tabs = TAB_LABELS.map((label) => ({
    label,
    color: label === active ? "#4C46A3" : "#1E1B3A",
    line: label === active ? "#4C46A3" : "transparent",
  }));

  const hl = on(3600);
  const people: Person[] = PEOPLE.map(([initials, name, dept, hire, comp, carry, vested], i) => {
    const f = fade(1900 + i * 300, 18);
    const isTarget = i === 1 && hl;
    return {
      initials,
      name,
      dept,
      hire,
      comp,
      carry,
      vested,
      top: CENTERS[i] - 46,
      o: f.o,
      tf: f.tf,
      border: isTarget ? "#F5A61D" : "#E9E8F0",
      shadow: isTarget
        ? "0 0 0 6px rgba(245,166,29,.22), 0 18px 36px -16px rgba(245,166,29,.55)"
        : "0 10px 30px -16px rgba(31,28,58,.2)",
      badgeO: i === 1 && on(3900) ? 1 : 0,
      badgeS: i === 1 && on(3900) ? 1 : 0.6,
    };
  });

  const links = CENTERS.map((cy, i) => ({
    d: `M360 364C440 364 440 ${cy} 520 ${cy}`,
    off: on(1700) ? 0 : 1,
    color: i === 1 && hl ? "#F5A61D" : "#BDBBD0",
  }));

  const kpis = KPIS.map(([label, v], i) => ({
    label,
    ...fade(8300 + i * 140),
    value: v ? count(8500 + i * 140, 1100, v) : "Apr 2026",
  }));

  let start = 0;
  const segs = DONUT_SEGS.map(([color, frac, cue]) => {
    const len = frac * DONUT_C - 5;
    const seg = { color, dash: `${on(cue) ? len : 0} ${DONUT_C}`, off: -start };
    start += frac * DONUT_C;
    return seg;
  });

  return {
    tabs,
    scenes: [scene(0), scene(1), scene(2)],
    a: {
      panel: fade(200),
      rowBg: on(1200) ? "#F1F0FA" : "#FFFFFF",
      radioBorder: on(1200) ? "#2E2A6B" : "#BDBBD0",
      radioDot: on(1200) ? 1 : 0,
      lineDot: on(1700) ? 1 : 0,
    },
    people,
    links,
    kpis,
    b: {
      card: fade(8200, 18),
      lineClip: clip(8800),
      areaClip: clip(9400),
      scenClip: clip(10600),
      dot: on(11700) ? 1 : 0,
      tip: fade(11800, 8),
    },
    segs,
    c: {
      card: fade(16200, 18),
      t1: fade(16600),
      t2: fade(16800),
      salary: count(16700, 1100, 400000),
      bonus: count(16800, 1100, 500000),
      carryTotal: count(16900, 1300, 9201300),
      carryAnn: count(16900, 1300, 1621483),
      centerO: on(17000) ? 1 : 0,
      total: count(17000, 1700, 2521483),
      l1: on(17500) ? 1 : 0,
      l2: on(17900) ? 1 : 0,
      l3: on(18400) ? 1 : 0,
    },
  };
}
