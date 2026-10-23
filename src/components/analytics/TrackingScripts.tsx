import Script from "next/script";
import { GTM_ID, HUBSPOT_PORTAL_ID } from "@/lib/site";

/**
 * Third-party tracking. Everything marketing-related goes through the one GTM container
 * (GA4, Google Ads, LinkedIn Insight, Meta pixel; and RB2B if we keep it) so tags can be
 * changed or switched off in GTM without a deploy. The HubSpot tracking script is the one
 * exception: it was never in GTM on the old site.
 *
 * Production builds only (preview + live), so local dev never pollutes the data.
 * No consent banner at launch (same as the old site); a Consent Mode banner is the first follow-up.
 */
export function TrackingHead() {
  if (process.env.NODE_ENV !== "production") return null;
  return (
    <>
      <Script id="gtm" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
      </Script>
      <Script
        id="hs-script-loader"
        src={`https://js.hs-scripts.com/${HUBSPOT_PORTAL_ID}.js`}
        strategy="afterInteractive"
      />
    </>
  );
}

/** GTM's no-JavaScript fallback; render right after <body> opens. */
export function TrackingNoscript() {
  if (process.env.NODE_ENV !== "production") return null;
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
