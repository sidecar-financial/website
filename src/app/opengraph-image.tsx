import { OG_SIZE, renderOgCard } from "@/lib/og-card";

// Default social share card. Pages that set their own openGraph (waterfall) or image (blog posts)
// need their own opengraph-image, because a deeper segment's openGraph replaces this one.
export const alt = "Navable: one system for carry, commit, and compensation";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgCard({
    lines: ["One system for", "carry, commit, and", "compensation."],
    subline: "Carry management software for private funds",
  });
}
