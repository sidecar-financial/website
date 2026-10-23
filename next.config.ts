import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  async redirects() {
    return [
      // The hub lives at /resource-hub on navable.com; keep the old placeholder URL working.
      { source: "/resources", destination: "/resource-hub", permanent: true },

      // --- Legacy navable.com URLs -> current local routes (308) ---
      { source: "/about-us", destination: "/about", permanent: true },
      // /platform was retired; the carried-interest page now lives at its legacy navable.com URL.
      { source: "/platform", destination: "/solutions/carried-interest-software", permanent: true },
      { source: "/features-and-services/employee-solutions", destination: "/solutions/compensation-management", permanent: true },
      { source: "/who-we-serve/real-estate-firms", destination: "/who-we-serve/real-estate", permanent: true },
      { source: "/who-we-serve-legacy/private-equity", destination: "/who-we-serve/private-equity", permanent: true },
      { source: "/who-we-serve-legacy/venture-capital", destination: "/who-we-serve/venture-capital", permanent: true },
      { source: "/who-we-serve-legacy/real-estate-firms", destination: "/who-we-serve/real-estate", permanent: true },
      { source: "/policies/privacy-policy", destination: "/privacy", permanent: true },
      { source: "/policies/cookie-policy", destination: "/cookies", permanent: true },
      { source: "/policies/terms-of-service", destination: "/terms", permanent: true },
      // Waterfall is a standalone product page, not a sub-section of /solutions.
      { source: "/solutions/waterfall", destination: "/waterfall", permanent: true },
      // /fund-admins keeps its legacy navable.com URL (now a real page). TODO: /webinar still has no local page.

      // The app lives on its own host; /sign-in is kept as a stable, bookmarkable entry point.
      // Temporary (307) on purpose so browsers don't cache the external destination forever.
      { source: "/sign-in", destination: "https://app.navable.com", permanent: false },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
