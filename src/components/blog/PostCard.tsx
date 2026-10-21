import Image from "next/image";
import Link from "next/link";
import { formatPostDate, type Post } from "@/lib/blog";

type Props = {
  post: Post;
  /** Column-rule classes; defaults to the blog index's 1 / 2 / 3 column pattern. */
  borders?: string;
  /** Eager-load the cover (use for above-the-fold cards). */
  priority?: boolean;
};

export const POST_GRID_BORDERS =
  "md:border-r md:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(3n)]:border-r-0";

/**
 * One bordered cell of the blog grid. The title is the only link; its ::after stretches
 * over the whole card so the card is fully clickable without nesting links.
 */
export default function PostCard({ post, borders = POST_GRID_BORDERS, priority = false }: Props) {
  return (
    <li className={`border-b border-line ${borders}`}>
      <article className="group relative flex h-full flex-col transition-colors hover:bg-soft">
        <div className="relative aspect-video overflow-hidden border-b border-line bg-soft">
          <Image
            src={post.cover.src}
            alt=""
            fill
            priority={priority}
            sizes="(min-width: 1200px) 376px, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-1 flex-col px-6 pb-8 pt-6 lg:px-8">
          <time
            dateTime={post.date}
            className="font-mono text-[11px] uppercase tracking-[0.12em] text-subtle"
          >
            {formatPostDate(post.date)}
          </time>
          <h3 className="mt-4 line-clamp-3 text-lg font-medium leading-[26px] text-ink">
            <Link
              href={`/blog/${post.slug}`}
              className="rounded-sm after:absolute after:inset-0 focus-visible:after:outline-2 focus-visible:after:outline-offset-[-2px] focus-visible:after:outline-ink"
            >
              {post.title}
            </Link>
          </h3>
          <p className="mt-3 line-clamp-3 text-sm leading-[22px] text-body">{post.excerpt}</p>
          <span
            aria-hidden="true"
            className="mt-auto flex items-center gap-1.5 pt-6 text-sm font-medium text-ink"
          >
            Read article
            <svg
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 group-focus-within:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </div>
      </article>
    </li>
  );
}
