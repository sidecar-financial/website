"use client";

import { useMemo, useState } from "react";
import ArticleCard from "./ArticleCard";
import type { Article } from "@/lib/resource-hub";

/** Searchable grid of every Resource Hub article. */
export default function ResourceIndex({ articles }: { articles: Article[] }) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    return articles
      .map((article, index) => ({ article, index }))
      .filter(({ article }) => {
        if (terms.length === 0) return true;
        const haystack = `${article.title} ${article.excerpt}`.toLowerCase();
        return terms.every((term) => haystack.includes(term));
      });
  }, [articles, query]);

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-line px-6 py-6 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <div className="relative w-full sm:max-w-[420px]">
          <label htmlFor="resource-search" className="sr-only">
            Search the Resource Hub
          </label>
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-body"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-4.3-4.3M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
          </svg>
          <input
            id="resource-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search carry, vesting, audits, co-invest…"
            autoComplete="off"
            className="h-11 w-full rounded-lg border border-line-strong bg-white pl-11 pr-4 text-[15px] text-ink placeholder:text-body focus:border-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
          />
        </div>
        <p role="status" aria-live="polite" className="font-mono text-[11px] uppercase tracking-[0.12em] text-subtle">
          {results.length === articles.length
            ? `${articles.length} answers`
            : `${results.length} of ${articles.length} answers`}
        </p>
      </div>

      {results.length > 0 ? (
        <ul className="grid md:grid-cols-2 lg:grid-cols-3">
          {results.map(({ article, index }) => (
            <ArticleCard key={article.slug} article={article} index={index} />
          ))}
        </ul>
      ) : (
        <div className="px-6 py-20 text-center lg:px-8">
          <p className="text-lg font-medium text-ink">No answers match &ldquo;{query}&rdquo;</p>
          <p className="mt-2 text-sm text-body">Try a broader term, or clear the search to browse everything.</p>
          <button
            type="button"
            onClick={() => setQuery("")}
            className="mt-6 inline-flex min-h-[44px] items-center rounded-lg border border-line-strong bg-white px-5 text-sm font-medium text-ink transition-colors hover:border-ink focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
          >
            Clear search
          </button>
        </div>
      )}
    </div>
  );
}
