import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostBody } from "@/components/blog/PostBody";
import PostCard from "@/components/blog/PostCard";
import { Gap, Section } from "@/components/ui/Frame";
import { CtaBand } from "@/components/ui/PageBlocks";
import { formatPostDate, getPost, getRelatedPosts, posts, withPostHeadingIds } from "@/lib/blog";
import { SITE_URL } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const title = `${post.seoTitle ?? post.title} | Navable`;
  const url = `${SITE_URL}/blog/${post.slug}`;
  const image = { url: `${SITE_URL}${post.cover.src}`, width: post.cover.width, height: post.cover.height };
  return {
    title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: post.description,
      url,
      siteName: "Navable",
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: post.description,
      images: [image.url],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { toc } = withPostHeadingIds(post.blocks);
  const related = getRelatedPosts(post.slug);

  return (
    <>
      <Section labelledBy="post-heading" label="Insights" noBorder>
        <nav aria-label="Breadcrumb" className="border-b border-line px-6 py-5 lg:px-12">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-body">
            <li>
              <Link href="/blog" className="rounded-sm transition-colors hover:text-ink">
                Blog
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="min-w-0 text-ink">
              {post.title}
            </li>
          </ol>
        </nav>

        <header className="dot-grid border-b border-line px-6 py-14 lg:px-12 lg:py-[72px]">
          <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[10px] uppercase leading-none tracking-[0.16em] text-subtle">
            <span aria-hidden="true" className="block size-2 bg-orange" />
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            <span aria-hidden="true">/</span>
            <span>By {post.author}</span>
          </p>
          <h1
            id="post-heading"
            className="mt-6 max-w-[800px] text-[32px] font-semibold leading-[1.2] text-ink sm:text-[40px] lg:text-[44px] lg:leading-[54px]"
          >
            {post.title}
          </h1>
          <p className="mt-5 max-w-[680px] text-base leading-6 text-body lg:text-[17px] lg:leading-7">
            {post.excerpt}
          </p>
        </header>

        <div className="border-b border-line">
          <Image
            src={post.cover.src}
            alt=""
            width={post.cover.width}
            height={post.cover.height}
            priority
            sizes="(min-width: 1128px) 1128px, 100vw"
            className="mx-auto h-auto max-h-[560px] w-full object-cover"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[376px_minmax(0,1fr)]">
          <aside className="hidden border-r border-line px-12 py-14 lg:block">
            <div className="lg:sticky lg:top-[100px]">
              <Link
                href="/blog"
                className="group inline-flex items-center gap-1.5 rounded-sm text-sm font-medium text-ink"
              >
                <svg
                  aria-hidden="true"
                  className="size-4 transition-transform duration-200 group-hover:-translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
                Back to blog
              </Link>
              {toc.length > 0 && (
                <nav aria-labelledby="toc-heading" className="mt-10">
                  <h2
                    id="toc-heading"
                    className="font-mono text-[10px] uppercase leading-none tracking-[0.16em] text-subtle"
                  >
                    In this article
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
            </div>
          </aside>

          <article className="min-w-0 px-6 py-12 lg:px-12 lg:py-14">
            <div className="max-w-[680px]">
              <PostBody blocks={post.blocks} />
              <Link
                href="/blog"
                className="group mt-12 inline-flex items-center gap-1.5 rounded-sm text-sm font-medium text-ink lg:hidden"
              >
                <svg
                  aria-hidden="true"
                  className="size-4 transition-transform duration-200 group-hover:-translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
                Back to blog
              </Link>
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
            <PostCard key={item.slug} post={item} borders="md:border-r md:[&:nth-child(3n)]:border-r-0" />
          ))}
        </ul>
      </Section>

      <CtaBand
        title={
          <>
            Ready to Move Carry <span className="text-orange">Beyond Spreadsheets?</span>
          </>
        }
        description="See how Navable brings carry, commit, and compensation into one audit-ready system."
        cta="Book a Free Demo"
      />
    </>
  );
}
