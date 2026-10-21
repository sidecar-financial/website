import { Metadata } from "next";
import PostCard from "@/components/blog/PostCard";
import { Section } from "@/components/ui/Frame";
import { PageHero } from "@/components/ui/PageBlocks";
import { posts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog | Navable",
  description: "Insights and articles about carry management, compensation, and GP operations for alternative asset firms.",
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        title="Insights"
        description="Expert perspectives on carry management, compensation, and operations for alternative asset firms."
      />

      {/* Articles */}
      <Section label="Insights" labelledBy="articles-heading">
        <h2 id="articles-heading" className="sr-only">
          Latest articles
        </h2>
        <ul className="grid md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <PostCard key={post.slug} post={post} priority={index < 3} />
          ))}
        </ul>
      </Section>
    </>
  );
}
