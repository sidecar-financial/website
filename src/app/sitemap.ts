import type { MetadataRoute } from "next";
import { posts } from "@/lib/blog";
import { articles } from "@/lib/resource-hub";
import { SITE_URL } from "@/lib/site";

// Every public, indexable route. (/sign-in is excluded: it redirects to the app.)
const staticRoutes = [
  "/",
  "/solutions/carried-interest-software",
  "/waterfall",
  "/solutions/compensation-management",
  "/solutions/employee-co-invest",
  "/who-we-serve/private-equity",
  "/who-we-serve/venture-capital",
  "/who-we-serve/real-estate",
  "/fund-admins",
  "/why-navable",
  "/how-it-works",
  "/about",
  "/demo",
  "/faq",
  "/blog",
  "/resource-hub",
  "/privacy",
  "/cookies",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...staticRoutes,
    ...articles.map((article) => `/resource-hub/${article.slug}`),
    ...posts.map((post) => `/blog/${post.slug}`),
  ];
  return paths.map((path) => ({
    url: path === "/" ? SITE_URL : `${SITE_URL}${path}`,
  }));
}
