# Product Graphics Integration Design

## Goal

Integrate the supplied Navable product-graphics package into the existing Next.js site, preserving each asset's intended placement, aspect ratio, accessible description, animation controls, and reduced-motion fallback.

## Asset strategy

- Copy the four self-contained animation HTML files into a dedicated directory under `public/`.
- Copy all 13 SVG graphics and their 2x PNG alternates into the same public asset namespace.
- Render animations through a reusable same-origin iframe wrapper so the supplied SVG, timing, and embedded fonts remain unchanged.
- Use SVGs for visible static graphics because they scale cleanly and contain the supplied embedded fonts. Retain PNGs as packaged alternates.

## Animation wrapper

The wrapper will:

- enforce `1128 / 640` for the homepage hero and `16 / 10` for all other animations;
- expose a site-native 44px pause/play control;
- pause the iframe animation while it is offscreen or when the browser tab is hidden;
- hide the animation and control when `prefers-reduced-motion: reduce` is active;
- show the designated supplied SVG fallback with the README alt text for reduced-motion visitors;
- keep animation iframes out of the accessibility tree and expose the meaningful description through the fallback image semantics.

Because the iframe content is served from the same origin, the wrapper can toggle the supplied root pause class without modifying the generated animation markup.

## Placement

- Homepage hero: `hero-tour.html`; fallback graphics 01–03, with graphic 03 as the stable reduced-motion frame.
- Employee co-invest page hero: `coinvest-storyboard.html`; fallback graphics 09–11, with graphic 11 as the stable reduced-motion frame.
- Carried interest, “Centralized Carry Plans & Allocations”: `create-plan.html`; fallback 04.
- Carried interest, “Structured Rules & Vesting Logic”: `forfeiture.html`; fallback 05.
- Carried interest, “Clear Visibility for Finance & Leadership”: static graphic 06.
- Compensation, “Unified Total Compensation View”: static graphic 07.
- Compensation, “Replace Inquiries with Transparency”: static graphic 08.
- Employee co-invest, “One Place to Manage With Confidence”: static graphic 12.
- Fund Administrators page: static graphic 13, included as supplied despite its changelog noting that fictional client names await approval.

Other feature cards keep their current imagery. Solution pages without a supplied hero animation no longer receive the homepage product tour by default.

## Data model and components

- Extend solution-page content data so a page can select a dedicated hero visual and each feature can select either a static image or an animation with fallback metadata.
- Keep asset dimensions and README alt text in typed configuration.
- Add one reusable product-animation component rather than duplicating iframe, pause, visibility, and reduced-motion logic.
- Adapt the shared solution-page template to render configured hero and feature visuals.

## Verification

- Add focused tests for asset mapping and generated animation behavior where supported by the existing project.
- Run lint and production build.
- Start the local development server.
- Check the homepage, carried-interest, compensation, co-invest, and fund-administrator routes at desktop and narrow widths.
- Emulate reduced motion and verify that animations and controls are replaced by the correct static SVGs.

## Out of scope

- Changing the invented fund-administrator client names.
- Changing Fund III allocation percentages.
- Renaming the Fund III vesting label.
- Redesigning unrelated page sections or copy.
