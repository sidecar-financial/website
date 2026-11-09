# Product Graphics Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Place the four supplied animations and 13 supplied graphics on their specified website sections with pause controls, exact aspect ratios, README alt text, and reduced-motion fallbacks.

**Architecture:** Public assets remain self-contained under `/product-graphics`. A typed visual registry defines every source, size, alt string, animation root class, and pause class. A small client component controls same-origin animation iframes; existing server-rendered page templates select visuals from the registry.

**Tech Stack:** Next.js 16.4 App Router, React 19.3, TypeScript, Tailwind CSS 4, Node 22 test runner through `tsx`.

## Global Constraints

- Keep `1128 / 640` for the homepage hero and `16 / 10` for every other supplied visual.
- Every animation has a 44px pause/play control and pauses while offscreen or while the tab is hidden.
- Under `prefers-reduced-motion: reduce`, show the designated supplied static SVG and no animation control.
- Preserve the README alt text exactly.
- Include graphic 13 as supplied; do not alter approval-dependent names, percentages, or the “Fund III” vesting label.
- Do not redesign unrelated sections.

---

### Task 1: Public assets and typed visual registry

**Files:**
- Create: `public/product-graphics/animations/hero-tour.html`
- Create: `public/product-graphics/animations/coinvest-storyboard.html`
- Create: `public/product-graphics/animations/create-plan.html`
- Create: `public/product-graphics/animations/forfeiture.html`
- Create: `public/product-graphics/svg/01-hero-a-carry-plans.svg` through `13-fund-admin-portal.svg`
- Create: `public/product-graphics/png/01-hero-a-carry-plans.png` through `13-fund-admin-portal.png`
- Create: `src/components/product/productVisuals.ts`
- Create: `src/components/product/productVisuals.test.ts`
- Modify: `package.json`
- Modify: `package-lock.json`

**Interfaces:**
- Produces: `ProductStaticVisual`, `ProductAnimationVisual`, `productVisuals`, `isAnimationVisual`.
- `ProductAnimationVisual` includes `src`, `fallback`, `width`, `height`, `alt`, `rootClass`, and `pausedClass`.

- [ ] **Step 1: Write the failing registry test**

Create a Node test that imports `productVisuals` and asserts:

```ts
import assert from "node:assert/strict";
import test from "node:test";
import { productVisuals } from "./productVisuals.ts";

test("uses the supplied aspect ratios and reduced-motion fallbacks", () => {
  assert.deepEqual(
    [productVisuals.heroTour.width, productVisuals.heroTour.height],
    [1128, 640],
  );
  assert.equal(productVisuals.heroTour.fallback, "/product-graphics/svg/03-hero-c-total-compensation.svg");
  assert.deepEqual(
    [productVisuals.coinvestStoryboard.width, productVisuals.coinvestStoryboard.height],
    [1280, 800],
  );
  assert.equal(productVisuals.coinvestStoryboard.fallback, "/product-graphics/svg/11-coinvest-hero-frame3-called.svg");
});

test("defines pause classes for all four animations", () => {
  assert.deepEqual(
    [
      productVisuals.heroTour.pausedClass,
      productVisuals.coinvestStoryboard.pausedClass,
      productVisuals.createPlan.pausedClass,
      productVisuals.forfeiture.pausedClass,
    ],
    ["hx-paused", "cx-paused", "px-paused", "fx-paused"],
  );
});

test("defines all nine placed visuals", () => {
  assert.deepEqual(Object.keys(productVisuals), [
    "heroTour",
    "coinvestStoryboard",
    "createPlan",
    "forfeiture",
    "carryFirmOverview",
    "compTotalCompensation",
    "compEmployeePortal",
    "coinvestDashboard",
    "fundAdminPortal",
  ]);
});
```

Install `tsx` as a development dependency and add `"test": "tsx --test src/**/*.test.ts"` to `package.json`.

- [ ] **Step 2: Run the test and verify RED**

Run: `npm test`

Expected: FAIL because `./productVisuals.ts` does not exist.

- [ ] **Step 3: Copy the supplied assets**

Copy the package's four standalone HTML files, all `svg/*.svg`, and all `png/*.png` into the exact public paths listed above. Do not copy the `.dc.html` canvas sources because they require canvas runtime support and are not production assets.

- [ ] **Step 4: Implement the visual registry**

Create the discriminated union:

```ts
export type ProductStaticVisual = {
  kind: "static";
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type ProductAnimationVisual = {
  kind: "animation";
  src: string;
  fallback: string;
  width: number;
  height: number;
  alt: string;
  rootClass: string;
  pausedClass: string;
};

export type ProductVisual = ProductStaticVisual | ProductAnimationVisual;

export function isAnimationVisual(
  visual: ProductVisual,
): visual is ProductAnimationVisual {
  return visual.kind === "animation";
}
```

Populate `productVisuals` with the exact public paths, dimensions, root/pause classes, and README alt strings for hero tour, co-invest storyboard, create plan, forfeiture, graphics 06, 07, 08, 12, and 13.

- [ ] **Step 5: Run the test and verify GREEN**

Run: `npm test`

Expected: 3 tests pass.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json public/product-graphics src/components/product/productVisuals.ts src/components/product/productVisuals.test.ts
git commit -m "Add product graphics asset registry"
```

### Task 2: Accessible animation and static visual components

**Files:**
- Create: `src/components/product/animationState.ts`
- Create: `src/components/product/ProductAnimation.tsx`
- Create: `src/components/product/ProductVisual.tsx`

**Interfaces:**
- Consumes: `ProductVisual`, `ProductAnimationVisual`, and `isAnimationVisual` from Task 1.
- Produces: `<ProductAnimation visual className?>` and `<ProductVisual visual className sizes?>`.

- [ ] **Step 1: Add a failing animation-state test**

Extend `productVisuals.test.ts` with behavior assertions for the pause decision used by the component:

```ts
import { shouldPauseAnimation } from "./animationState.ts";

test("pauses unless the user is playing an in-view animation in a visible tab", () => {
  assert.equal(shouldPauseAnimation(true, true, false), false);
  assert.equal(shouldPauseAnimation(false, true, false), true);
  assert.equal(shouldPauseAnimation(true, false, false), true);
  assert.equal(shouldPauseAnimation(true, true, true), true);
});
```

- [ ] **Step 2: Run the test and verify RED**

Run: `npm test`

Expected: FAIL because `animationState.ts` does not exist.

- [ ] **Step 3: Implement `ProductAnimation`**

Create `animationState.ts` with:

```ts
export function shouldPauseAnimation(
  playing: boolean,
  inView: boolean,
  tabHidden: boolean,
) {
  return !playing || !inView || tabHidden;
}
```

Build a client component that consumes this function and includes:

- an iframe ref and root container ref;
- `playing`, `inView`, and `tabHidden` booleans;
- an iframe `onLoad` callback and effect that finds `.${visual.rootClass}` in `iframe.contentDocument` and toggles `visual.pausedClass` whenever `!playing || !inView || tabHidden`;
- `IntersectionObserver` setup/cleanup;
- `visibilitychange` setup/cleanup;
- a wrapper with `role="img"` and `aria-label={visual.alt}`;
- an `aria-hidden` iframe shown with `motion-reduce:hidden`;
- a decorative fallback `<Image alt="">` hidden normally and shown with `motion-reduce:block`;
- a 44px pause/play button hidden with `motion-reduce:hidden`, using dynamic `aria-label` and `aria-pressed={!playing}`.

Set the wrapper's inline `aspectRatio` from `visual.width / visual.height`; use `loading="eager"` for the homepage animation only and `"lazy"` for feature animations.

- [ ] **Step 4: Implement `ProductVisual`**

Render `ProductAnimation` for animation records. Render `next/image` with explicit width, height, alt, responsive sizes, `object-contain`, and `unoptimized` for static records.

- [ ] **Step 5: Run tests and verify GREEN**

Run: `npm test`

Expected: 4 tests pass.

- [ ] **Step 6: Commit**

```bash
git add src/components/product/animationState.ts src/components/product/ProductAnimation.tsx src/components/product/ProductVisual.tsx src/components/product/productVisuals.test.ts
git commit -m "Add accessible product visual components"
```

### Task 3: Page mapping and shared template integration

**Files:**
- Modify: `src/components/home/TourFrame.tsx`
- Modify: `src/components/solution/data.ts`
- Modify: `src/components/solution/SolutionPage.tsx`
- Modify: `src/components/product/productVisuals.test.ts`

**Interfaces:**
- Consumes: `ProductVisual` and `productVisuals`.
- Extends: `SolutionPageData.heroVisual?: ProductVisual`.
- Extends: `SolutionFeature.visual?: ProductVisual`; existing `image` becomes optional for cards that keep legacy imagery.

- [ ] **Step 1: Write the failing page-mapping test**

Add assertions:

```ts
import { solutionPages } from "../solution/data.ts";

test("maps supplied visuals to their specified pages and feature cards", () => {
  assert.equal(solutionPages["co-invest"].heroVisual, productVisuals.coinvestStoryboard);
  assert.equal(solutionPages["carried-interest"].features?.[0].visual, productVisuals.createPlan);
  assert.equal(solutionPages["carried-interest"].features?.[1].visual, productVisuals.forfeiture);
  assert.equal(solutionPages["carried-interest"].features?.[2].visual, productVisuals.carryFirmOverview);
  assert.equal(solutionPages.compensation.features?.[0].visual, productVisuals.compTotalCompensation);
  assert.equal(solutionPages.compensation.features?.[1].visual, productVisuals.compEmployeePortal);
  assert.equal(solutionPages["co-invest"].features?.[0].visual, productVisuals.coinvestDashboard);
  assert.equal(solutionPages["fund-admins"].features?.[0].visual, productVisuals.fundAdminPortal);
});
```

- [ ] **Step 2: Run the test and verify RED**

Run: `npm test`

Expected: FAIL because `heroVisual` and `visual` do not exist.

- [ ] **Step 3: Update the data model and mappings**

Import `productVisuals` and `ProductVisual`. Add optional visual fields. Preserve existing images for feature cards without supplied replacements. Map:

- co-invest hero → `coinvestStoryboard`;
- carried-interest cards 1–3 → `createPlan`, `forfeiture`, `carryFirmOverview`;
- compensation cards 1–2 → `compTotalCompensation`, `compEmployeePortal`;
- co-invest card 1 → `coinvestDashboard`;
- fund-admin card 1 → `fundAdminPortal`.

- [ ] **Step 4: Update shared rendering**

In `SolutionPage`:

- render a product-tour section only when `page.heroVisual` exists;
- render the hero visual through `ProductVisual`;
- for each feature card, select `feature.visual` first and fall back to the existing `solutionImages[feature.image]`;
- use a full-width aspect-ratio container for supplied 16:10 visuals instead of the current fixed 240/280px crop.

In `TourFrame`, replace the legacy `HeroTour` import with `ProductAnimation` and `productVisuals.heroTour`, preserving the existing browser chrome.

- [ ] **Step 5: Run tests and verify GREEN**

Run: `npm test`

Expected: all 5 tests pass.

- [ ] **Step 6: Commit**

```bash
git add src/components/home/TourFrame.tsx src/components/solution/data.ts src/components/solution/SolutionPage.tsx src/components/product/productVisuals.test.ts
git commit -m "Place product visuals across website pages"
```

### Task 4: Full verification and local launch

**Files:**
- Modify only files required by issues found during verification.

**Interfaces:**
- Validates all deliverables from Tasks 1–3.

- [ ] **Step 1: Run automated checks**

Run:

```bash
npm test
npm run lint
npm run build
```

Expected: all tests pass, ESLint exits 0, and Next.js completes a production build.

- [ ] **Step 2: Start the development server**

Run: `npm run dev`

Expected: Next.js reports a local URL and remains running.

- [ ] **Step 3: Browser-check required routes**

Inspect:

- `/`
- `/solutions/carried-interest-software`
- `/solutions/compensation-management`
- `/solutions/employee-co-invest`
- `/fund-admins`

Confirm correct placement, no clipping, no console errors, expected pause/play behavior, and responsive scaling at desktop and narrow widths.

- [ ] **Step 4: Verify reduced motion**

Emulate `prefers-reduced-motion: reduce`. Confirm each animation is replaced by the designated SVG, no pause control is visible, and all static images retain their README descriptions.

- [ ] **Step 5: Commit verification fixes if needed**

```bash
git add src/components/product src/components/home/TourFrame.tsx src/components/solution/data.ts src/components/solution/SolutionPage.tsx
git commit -m "Fix product visual integration verification issues"
```
