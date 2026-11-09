import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { shouldPauseAnimation } from "./animationState";
import { isAnimationVisual, productVisuals, staticFrameOf } from "./productVisuals";
import { solutionPages } from "../solution/data";

test("pauses unless the user is playing an in-view animation in a visible tab", () => {
  assert.equal(shouldPauseAnimation(true, true, false), false);
  assert.equal(shouldPauseAnimation(false, true, false), true);
  assert.equal(shouldPauseAnimation(true, false, false), true);
  assert.equal(shouldPauseAnimation(true, true, true), true);
});

test("pauses while intersection or tab visibility is unknown", () => {
  assert.equal(shouldPauseAnimation(true, null, false), true);
  assert.equal(shouldPauseAnimation(true, true, null), true);
});

test("uses the supplied aspect ratios and reduced-motion fallbacks", () => {
  assert.deepEqual(
    [productVisuals.heroTour.width, productVisuals.heroTour.height],
    [1128, 640],
  );
  assert.equal(
    productVisuals.heroTour.fallback,
    "/product-graphics/svg/03-hero-c-total-compensation.svg",
  );
  assert.deepEqual(
    [
      productVisuals.coinvestStoryboard.width,
      productVisuals.coinvestStoryboard.height,
    ],
    [1280, 800],
  );
  assert.equal(
    productVisuals.coinvestStoryboard.fallback,
    "/product-graphics/svg/11-coinvest-hero-frame3-called.svg",
  );
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

test("defines all placed visuals", () => {
  assert.deepEqual(Object.keys(productVisuals), [
    "heroTour",
    "coinvestStoryboard",
    "createPlan",
    "forfeiture",
    "carryFirmOverview",
    "carryAuditTrail",
    "compTotalCompensation",
    "compEmployeePortal",
    "compFirmCarry",
    "compAnnualStatements",
    "coinvestProgress",
    "coinvestInvestorPortal",
    "coinvestAlignedTransparency",
    "coinvestParticipantOnboarding",
    "fundAdminWaterfall",
  ]);
});

test("maps supplied visuals to their specified pages and feature cards", () => {
  assert.equal(
    solutionPages["co-invest"].heroVisual,
    productVisuals.coinvestStoryboard,
  );
  assert.deepEqual(
    solutionPages["carried-interest"].features?.[0].visual,
    staticFrameOf(productVisuals.createPlan),
  );
  assert.deepEqual(
    solutionPages["carried-interest"].features?.[1].visual,
    staticFrameOf(productVisuals.forfeiture),
  );
  assert.equal(
    solutionPages["carried-interest"].features?.[2].visual,
    productVisuals.carryFirmOverview,
  );
  assert.equal(
    solutionPages["carried-interest"].features?.[3].visual,
    productVisuals.carryAuditTrail,
  );

  const expected = {
    compensation: [
      productVisuals.compTotalCompensation,
      productVisuals.compEmployeePortal,
      productVisuals.compFirmCarry,
      productVisuals.compAnnualStatements,
    ],
    "co-invest": [
      productVisuals.coinvestProgress,
      productVisuals.coinvestInvestorPortal,
      productVisuals.coinvestAlignedTransparency,
      productVisuals.coinvestParticipantOnboarding,
    ],
  } as const;
  for (const [slug, visuals] of Object.entries(expected)) {
    const page = solutionPages[slug as keyof typeof expected];
    visuals.forEach((visual, index) => {
      assert.equal(page.features?.[index].visual, visual, `${slug} card ${index}`);
    });
  }
  assert.equal(
    solutionPages["fund-admins"].features?.[0].visual,
    productVisuals.fundAdminWaterfall,
  );
});

test("every solution-page card graphic is a 960x720 (4:3) callout", () => {
  const heroes = new Set<unknown>([
    productVisuals.heroTour,
    productVisuals.coinvestStoryboard,
  ]);
  for (const [name, visual] of Object.entries(productVisuals)) {
    if (heroes.has(visual)) continue;
    assert.deepEqual([visual.width, visual.height], [960, 720], name);
  }
});

test("every registered graphic exists in public/", () => {
  for (const visual of Object.values(productVisuals)) {
    const files = [visual.src, "fallback" in visual ? visual.fallback : undefined];
    for (const file of files) {
      if (!file) continue;
      assert.ok(
        existsSync(path.join(process.cwd(), "public", file)),
        `missing ${file}`,
      );
    }
  }
});

test("staticFrameOf turns an animation into its static final frame", () => {
  const frame = staticFrameOf(productVisuals.createPlan);
  assert.equal(frame.kind, "static");
  assert.equal(frame.src, productVisuals.createPlan.fallback);
  assert.deepEqual(
    [frame.width, frame.height, frame.alt],
    [
      productVisuals.createPlan.width,
      productVisuals.createPlan.height,
      productVisuals.createPlan.alt,
    ],
  );
});

test("carried interest cards are all static so the grid is calm and consistent", () => {
  const carry = solutionPages["carried-interest"];
  const visuals = carry.features?.flatMap((f) => (f.visual ? [f.visual] : [])) ?? [];
  assert.equal(visuals.length, 4);
  for (const visual of visuals) {
    assert.equal(isAnimationVisual(visual), false);
  }
});
