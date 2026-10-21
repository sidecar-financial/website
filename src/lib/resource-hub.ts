import data from "@/content/resource-hub.json";

/** A run of inline text, optionally bold / italic / linked. */
export type Run = { t: string; b?: 1; i?: 1; href?: string };

export type Block =
  | { type: "h2" | "h3" | "h4" | "p"; runs: Run[] }
  | { type: "ul" | "ol"; items: Run[][] }
  | { type: "table"; caption: string; head: string[]; rows: string[][] };

export type Article = {
  slug: string;
  title: string;
  /** Short plain-text summary (first paragraph of the article, trimmed). */
  excerpt: string;
  blocks: Block[];
};

/** All articles, in the same order as the navable.com Resource Hub. */
export const articles = data as Article[];

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

/** The next `count` articles after `slug` (wrapping), used for "Keep reading". */
export function getRelated(slug: string, count = 3): Article[] {
  const index = articles.findIndex((a) => a.slug === slug);
  if (index === -1) return articles.slice(0, count);
  return Array.from({ length: count }, (_, n) => articles[(index + 1 + n) % articles.length]);
}

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function runsToText(runs: Run[]): string {
  return runs.map((r) => r.t).join("");
}

export type TocItem = { id: string; text: string };

/** Heading ids are unique within an article (duplicates get a numeric suffix). */
export function withHeadingIds(blocks: Block[]): { blocks: (Block & { id?: string })[]; toc: TocItem[] } {
  const seen = new Map<string, number>();
  const toc: TocItem[] = [];
  const out = blocks.map((block) => {
    if (block.type !== "h2") return block;
    const text = runsToText(block.runs);
    const base = slugifyHeading(text) || "section";
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    const id = count === 0 ? base : `${base}-${count + 1}`;
    toc.push({ id, text });
    return { ...block, id };
  });
  return { blocks: out, toc };
}
