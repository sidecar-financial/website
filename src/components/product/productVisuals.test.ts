import assert from "node:assert/strict";
import test from "node:test";
import { productVisuals } from "./productVisuals";

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
