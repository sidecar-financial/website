import { OG_SIZE, renderOgCard } from "@/lib/og-card";

export const alt = "Navable Waterfall: the provable distribution waterfall engine";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgCard({
    lines: ["The provable", "distribution", "waterfall engine."],
    subline: "Fund administrators run it. Auditors can recalculate it.",
  });
}
