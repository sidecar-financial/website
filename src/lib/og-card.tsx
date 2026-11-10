import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/** Social share cards are always 1200x630 (the size every platform crops to). */
export const OG_SIZE = { width: 1200, height: 630 };

const publicDir = join(process.cwd(), "public", "images");
const dataUrl = (file: string, mime: string) =>
  readFile(join(publicDir, file)).then((b) => `data:${mime};base64,${b.toString("base64")}`);
const logo = dataUrl("navable-logo.svg", "image/svg+xml");
const dashboard = dataUrl("hero-dashboard.png", "image/png");

const INK = "#1b1b3d";
const ORANGE = "#f5a61d";

type Card = {
  /** Headline lines, each on its own line. The last one is highlighted in orange. */
  lines: string[];
  subline: string;
};

/** Branded link-preview card (Slack, LinkedIn, iMessage, X, etc.). */
export async function renderOgCard({ lines, subline }: Card) {
  const [logoSrc, dashboardSrc] = await Promise.all([logo, dashboard]);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#ffffff",
          padding: "64px 72px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={225} height={55} alt="" />
        <div
          style={{
            marginTop: 56,
            display: "flex",
            flexDirection: "column",
            fontSize: 68,
            lineHeight: 1.08,
            fontWeight: 700,
            letterSpacing: -2,
            color: INK,
          }}
        >
          {lines.map((line, i) => (
            <span key={line} style={i === lines.length - 1 ? { color: ORANGE } : undefined}>
              {line}
            </span>
          ))}
        </div>
        <div style={{ marginTop: 32, display: "flex", fontSize: 28, color: "#5b5b78", width: 540 }}>
          {subline}
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={dashboardSrc}
          width={620}
          height={353}
          alt=""
          style={{
            position: "absolute",
            right: -90,
            bottom: -70,
            borderRadius: 16,
            border: "1px solid #e3e3ee",
            boxShadow: "0 24px 60px rgba(27,27,61,0.18)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            width: "100%",
            height: 12,
            background: ORANGE,
            display: "flex",
          }}
        />
      </div>
    ),
    { ...OG_SIZE },
  );
}
