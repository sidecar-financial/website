import data from "@/content/blog.json";
import { runsToText, slugifyHeading, type Block as HubBlock, type Run } from "@/lib/resource-hub";

export type { Run };

/** Resource Hub block schema, plus images and pull quotes. */
export type Block =
  | HubBlock
  | { type: "quote"; runs: Run[] }
  | { type: "img"; src: string; alt: string; width: number; height: number; caption?: Run[] };

export type BlogImage = { src: string; width: number; height: number; alt: string };

export type Post = {
  slug: string;
  title: string;
  /** Optional SEO title when it differs from the on-page headline. */
  seoTitle?: string;
  /** Subtitle shown under the headline and on blog cards. */
  excerpt: string;
  /** Meta description from navable.com. */
  description: string;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  author: string;
  cover: BlogImage;
  blocks: Block[];
};

/** All posts, in the same order as navable.com/blog (newest first). */
export const posts = data as Post[];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

/** The next `count` posts after `slug` (wrapping), used for "Keep reading". */
export function getRelatedPosts(slug: string, count = 3): Post[] {
  const index = posts.findIndex((p) => p.slug === slug);
  const others = posts.filter((_, i) => i !== index);
  if (index === -1) return others.slice(0, count);
  return Array.from({ length: Math.min(count, others.length) }, (_, n) => posts[(index + 1 + n) % posts.length]);
}

const dateFormat = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

/** "April 8, 2026" from an ISO date. */
export function formatPostDate(iso: string): string {
  return dateFormat.format(new Date(`${iso}T00:00:00Z`));
}

export type TocItem = { id: string; text: string };

/** h2 ids are unique within a post (duplicates get a numeric suffix). */
export function withPostHeadingIds(blocks: Block[]): { blocks: (Block & { id?: string })[]; toc: TocItem[] } {
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
