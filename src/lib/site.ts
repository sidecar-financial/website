/** Canonical origin used for sitemap/robots and as the layout's metadataBase. */
export const SITE_URL = "https://www.navable.com";

/**
 * Origin that relative metadata URLs (the social share image) resolve against.
 *
 * `productionUrl` is Vercel's VERCEL_PROJECT_PRODUCTION_URL (a bare host, no scheme). While the
 * site is still served from its vercel.app address, the share image has to live there, because
 * www.navable.com still points at the old site. Once a navable.com domain is the production
 * URL, always use the canonical www origin (the apex only redirects to it).
 */
export function resolveMetadataBase(productionUrl: string | undefined): string {
  if (!productionUrl) return SITE_URL;
  if (productionUrl === "navable.com" || productionUrl.endsWith(".navable.com")) return SITE_URL;
  return `https://${productionUrl}`;
}

/** Google Tag Manager container. It carries GA4, Google Ads, the LinkedIn Insight Tag and the Meta pixel. */
export const GTM_ID = "GTM-PJQBDPVX";

/** HubSpot portal for the tracking script (separate from GTM on purpose). */
export const HUBSPOT_PORTAL_ID = "43584751";
