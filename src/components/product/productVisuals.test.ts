import assert from "node:assert/strict";
import test from "node:test";
import { shouldPauseAnimation } from "./animationState";
import { productVisuals } from "./productVisuals";
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

test("maps supplied visuals to their specified pages and feature cards", () => {
  assert.equal(
    solutionPages["co-invest"].heroVisual,
    productVisuals.coinvestStoryboard,
  );
  assert.equal(
    solutionPages["carried-interest"].features?.[0].visual,
    productVisuals.createPlan,
  );
  assert.equal(
    solutionPages["carried-interest"].features?.[1].visual,
    productVisuals.forfeiture,
  );
  assert.equal(
    solutionPages["carried-interest"].features?.[2].visual,
    productVisuals.carryFirmOverview,
  );
  assert.equal(
    solutionPages.compensation.features?.[0].visual,
    productVisuals.compTotalCompensation,
  );
  assert.equal(
    solutionPages.compensation.features?.[1].visual,
    productVisuals.compEmployeePortal,
  );
  assert.equal(
    solutionPages["co-invest"].features?.[0].visual,
    productVisuals.coinvestDashboard,
  );
  assert.equal(
    solutionPages["fund-admins"].features?.[0].visual,
    productVisuals.fundAdminPortal,
  );
});
