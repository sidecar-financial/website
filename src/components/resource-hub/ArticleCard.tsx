import Link from "next/link";
import type { Article } from "@/lib/resource-hub";

type Props = {
  article: Article;
  /** Zero-based position in the full hub, shown as /01, /02, ... */
  index: number;
  /** Column-rule classes; defaults to the hub grid's 1 / 2 / 3 column pattern. */
  borders?: string;
};

const HUB_GRID_BORDERS =
  "md:border-r md:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(3n)]:border-r-0";

/** One bordered cell of the hub grid. Column rules are drawn by the parent grid via nth-child. */
export default function ArticleCard({ article, index, borders = HUB_GRID_BORDERS }: Props) {
  return (
    <li className={`border-b border-line ${borders}`}>
      <Link
        href={`/resource-hub/${article.slug}`}
        className="group flex h-full flex-col px-6 pb-8 pt-8 transition-colors hover:bg-soft focus-visible:-outline-offset-2 lg:px-8"
      >
        <span aria-hidden="true" className="font-mono text-[11px] leading-none text-ink">
          /{String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="mt-5 text-lg font-medium leading-[26px] text-ink">{article.title}</h3>
        <p className="mt-3 line-clamp-4 text-sm leading-[22px] text-body">{article.excerpt}</p>
        <span className="mt-auto flex items-center gap-1.5 pt-6 text-sm font-medium text-ink">
          Read the answer
          <svg
            aria-hidden="true"
            className="size-4 transition-transform group-hover:translate-x-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </span>
      </Link>
    </li>
  );
}
