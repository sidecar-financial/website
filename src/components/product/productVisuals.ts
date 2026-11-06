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

export const productVisuals = {
  heroTour: {
    kind: "animation",
    src: "/product-graphics/animations/hero-tour.html",
    fallback: "/product-graphics/svg/03-hero-c-total-compensation.svg",
    width: 1128,
    height: 640,
    alt: "Alex Morgan's 2026 total compensation of $5,000,000: salary $400,000, bonus $500,000, carry $3,600,000 and co-invest $500,000. Carry by fund: Fund I $720,000 (20%), Fund II $1,080,000 (30%), Fund III $1,800,000 (50%), totaling $3,600,000.",
    rootClass: "hx-root",
    pausedClass: "hx-paused",
  },
  coinvestStoryboard: {
    kind: "animation",
    src: "/product-graphics/animations/coinvest-storyboard.html",
    fallback: "/product-graphics/svg/11-coinvest-hero-frame3-called.svg",
    width: 1280,
    height: 800,
    alt: "Fund III employee co-invest contributions: $1,825,000 called of $2,920,000 committed (62.5%) for Alex Morgan, Taylor Smith and Jamie Chen.",
    rootClass: "cx-root",
    pausedClass: "cx-paused",
  },
  createPlan: {
    kind: "animation",
    src: "/product-graphics/animations/create-plan.html",
    fallback: "/product-graphics/svg/04-carry-create-plan.svg",
    width: 1280,
    height: 800,
    alt: "New Fund III carry plan with a straight-line vesting schedule of 10% per year over 10 years, allocating 50.0% of the pool to Alex Morgan, 20.0% to Taylor Smith and 2.0% to Jamie Chen, leaving 28.0% unallocated.",
    rootClass: "px-root",
    pausedClass: "px-paused",
  },
  forfeiture: {
    kind: "animation",
    src: "/product-graphics/animations/forfeiture.html",
    fallback: "/product-graphics/svg/05-carry-forfeiture.svg",
    width: 1280,
    height: 800,
    alt: "Forfeiture for Jamie Chen effective 10/30/2026: total carry value $420,000, of which $294,000 unvested forfeits and $126,000 vested is retained, so the new total carry value is $126,000.",
    rootClass: "fx-root",
    pausedClass: "fx-paused",
  },
  carryFirmOverview: {
    kind: "static",
    src: "/product-graphics/svg/06-carry-firm-overview.svg",
    width: 1280,
    height: 800,
    alt: "Northfield Capital carry across three participants: total carry value $9,020,000, vested $4,046,000, unvested $4,974,000, 2026 carry $4,585,000, with a row each for Alex Morgan, Taylor Smith and Jamie Chen.",
  },
  compTotalCompensation: {
    kind: "static",
    src: "/product-graphics/svg/07-comp-total-compensation-alex.svg",
    width: 1280,
    height: 800,
    alt: "Alex Morgan's 2026 total compensation of $5,000,000 with breakdown (salary $400,000, bonus $500,000, carry $3,600,000, co-invest $500,000), carry by fund totaling $3,600,000, and related documents.",
  },
  compEmployeePortal: {
    kind: "static",
    src: "/product-graphics/svg/08-comp-employee-portal-jamie.svg",
    width: 1280,
    height: 800,
    alt: "Employee portal view for Jamie Chen: total carry value $420,000, 30% vested ($126,000), unvested $294,000; 2026 total compensation $300,000; Fund III co-invest $120,000 committed, $75,000 called (62.5%); and her documents.",
  },
  coinvestDashboard: {
    kind: "static",
    src: "/product-graphics/svg/12-coinvest-dashboard.svg",
    width: 1280,
    height: 800,
    alt: "Fund III employee co-invest dashboard: $2,920,000 committed, $1,825,000 called (62.5%), $1,095,000 uncalled, with commitment, called and uncalled amounts for Alex Morgan, Taylor Smith and Jamie Chen.",
  },
  fundAdminPortal: {
    kind: "static",
    src: "/product-graphics/svg/13-fund-admin-portal.svg",
    width: 1280,
    height: 800,
    alt: "Admin portal listing eight funds across four fictional clients with carry status per fund: four active, three in review, one draft.",
  },
} as const satisfies Record<string, ProductVisual>;
