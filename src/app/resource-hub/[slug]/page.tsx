import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/resource-hub/ArticleBody";
import ArticleCard from "@/components/resource-hub/ArticleCard";
import HubCta from "@/components/resource-hub/HubCta";
import { Gap, Section } from "@/components/ui/Frame";
import { articles, getArticle, getRelated, withHeadingIds } from "@/lib/resource-hub";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: `${article.title} | Navable Resource Hub`,
    description: article.excerpt,
  };
}

export default async function ResourceArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const { toc } = withHeadingIds(article.blocks);
  const related = getRelated(article.slug);
  const position = articles.findIndex((a) => a.slug === article.slug);

  return (
    <>
      <Section labelledBy="article-heading" label="Resource Hub" noBorder>
        <nav aria-label="Breadcrumb" className="border-b border-line px-6 py-5 lg:px-12">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-body">
            <li>
              <Link href="/resource-hub" className="rounded-sm transition-colors hover:text-ink">
                Resource Hub
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-ink">
              {article.title}
            </li>
          </ol>
        </nav>

        <header className="dot-grid border-b border-line px-6 py-14 lg:px-12 lg:py-[72px]">
          <p className="flex items-center gap-2.5 font-mono text-[10px] uppercase leading-none tracking-[0.16em] text-subtle">
            <span aria-hidden="true" className="block size-2 bg-orange" />
            Answer /{String(position + 1).padStart(2, "0")}
          </p>
          <h1
            id="article-heading"
            className="mt-6 max-w-[800px] text-[32px] font-semibold leading-[1.2] text-ink sm:text-[40px] lg:text-[44px] lg:leading-[54px]"
          >
            {article.title}
          </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[376px_minmax(0,1fr)]">
          <aside className="border-b border-line px-6 py-8 lg:border-b-0 lg:border-r lg:px-12 lg:py-14">
            {toc.length > 0 && (
              <nav aria-labelledby="toc-heading" className="lg:sticky lg:top-[100px]">
                <h2
                  id="toc-heading"
                  className="font-mono text-[10px] uppercase leading-none tracking-[0.16em] text-subtle"
                >
                  In this answer
                </h2>
                <ul className="mt-5 space-y-1">
                  {toc.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="block rounded-sm py-1.5 text-sm leading-5 text-body transition-colors hover:text-ink"
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </aside>

          <article className="min-w-0 px-6 py-12 lg:px-12 lg:py-14">
            <div className="max-w-[680px]">
              <ArticleBody blocks={article.blocks} />
            </div>
          </article>
        </div>
      </Section>
      <Gap ruled />

      <Section labelledBy="keep-reading-heading">
        <div className="border-b border-line px-6 py-10 lg:px-12 lg:py-12">
          <h2 id="keep-reading-heading" className="text-[28px] font-semibold leading-9 text-ink lg:text-[32px]">
            Keep reading
          </h2>
        </div>
        <ul className="grid md:grid-cols-3">
          {related.map((item) => (
            <ArticleCard
              key={item.slug}
              article={item}
              index={articles.findIndex((a) => a.slug === item.slug)}
              borders="md:border-r md:[&:nth-child(3n)]:border-r-0"
            />
          ))}
        </ul>
      </Section>
      <Gap />
      <HubCta />
    </>
  );
}
