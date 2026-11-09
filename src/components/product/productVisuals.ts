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

/**
 * The static final frame of an animation (the same graphic reduced-motion visitors
 * see). Use it where several animations would compete for attention on one page.
 */
export function staticFrameOf(
  visual: ProductAnimationVisual,
): ProductStaticVisual {
  return {
    kind: "static",
    src: visual.fallback,
    width: visual.width,
    height: visual.height,
    alt: visual.alt,
  };
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
    fallback: "/product-graphics/svg/04-card-carry-plan-allocation.svg",
    width: 960,
    height: 720,
    alt: "Fund III carry plan with straight-line vesting of 10% per year from 2023 to 2032, allocating 50.0% of the pool to Alex Morgan, 20.0% to Taylor Smith and 2.0% to Jamie Chen, with 72.0% allocated and 28.0% unallocated.",
    rootClass: "px-root",
    pausedClass: "px-paused",
  },
  forfeiture: {
    kind: "animation",
    src: "/product-graphics/animations/forfeiture.html",
    fallback: "/product-graphics/svg/05-card-forfeiture-impact.svg",
    width: 960,
    height: 720,
    alt: "Forfeiture for Jamie Chen effective 10/30/2026: total carry value $420,000, of which $294,000 unvested forfeits and $126,000 vested is retained, so the new total carry value is $126,000, fully vested.",
    rootClass: "fx-root",
    pausedClass: "fx-paused",
  },
  carryFirmOverview: {
    kind: "static",
    src: "/product-graphics/svg/06-card-firm-overview.svg",
    width: 960,
    height: 720,
    alt: "Northfield Capital carry totals: total carry value $9,020,000, 2026 carry $4,585,000, vested $4,046,000 and unvested $4,974,000, with vested and unvested carry for Alex Morgan ($6,200,000), Taylor Smith ($2,400,000) and Jamie Chen ($420,000).",
  },
  carryAuditTrail: {
    kind: "static",
    src: "/product-graphics/svg/14-card-audit-trail.svg",
    width: 960,
    height: 720,
    alt: "Change log: on 10/30/2026 Taylor Smith recorded a forfeiture for Jamie Chen, total carry value $420,000 to $126,000; on 04/01/2026 a scheduled vest moved Alex Morgan from 30% to 40% vested; on 02/12/2026 Taylor Smith set Jamie Chen's Fund III co-invest commitment from $0 to $120,000.",
  },
  compTotalCompensation: {
    kind: "static",
    src: "/product-graphics/svg/07-card-total-compensation.svg",
    width: 960,
    height: 720,
    alt: "Alex Morgan's 2026 total compensation of $5,000,000: salary $400,000 (8%), bonus $500,000 (10%), carry $3,600,000 (72%) and co-invest $500,000 (10%).",
  },
  compEmployeePortal: {
    kind: "static",
    src: "/product-graphics/svg/08-card-employee-portal.svg",
    width: 960,
    height: 720,
    alt: "Jamie Chen's employee portal summary: total carry value $420,000, 30% vested ($126,000), $294,000 unvested.",
  },
  compFirmCarry: {
    kind: "static",
    src: "/product-graphics/svg/18-card-firm-carry-by-participant.svg",
    width: 960,
    height: 720,
    alt: "Northfield Capital 2026 carry of $4,585,000: Alex Morgan $3,600,000 (78.5%), Taylor Smith $900,000 (19.6%), Jamie Chen $85,000 (1.9%); lifetime carry $4,046,000 vested and $4,974,000 unvested.",
  },
  compAnnualStatements: {
    kind: "static",
    src: "/product-graphics/svg/19-card-annual-statements.svg",
    width: 960,
    height: 720,
    alt: "2026 total compensation statements ready for Alex Morgan ($5,000,000), Taylor Smith ($1,700,000) and Jamie Chen ($300,000), totaling $7,000,000.",
  },
  coinvestProgress: {
    kind: "static",
    src: "/product-graphics/svg/12-card-coinvest-progress.svg",
    width: 960,
    height: 720,
    alt: "Fund III employee co-invest: $2,920,000 committed, $1,825,000 called (62.5%), $1,095,000 uncalled. Alex Morgan $1,250,000 of $2,000,000, Taylor Smith $500,000 of $800,000, Jamie Chen $75,000 of $120,000.",
  },
  coinvestInvestorPortal: {
    kind: "static",
    src: "/product-graphics/svg/15-card-investor-portal.svg",
    width: 960,
    height: 720,
    alt: "Investor portal for Jamie Chen, Fund III co-invest, Q3 2026, with a USD/EUR/GBP currency toggle: commitment $120,000, called $75,000 (62.5%), uncalled $45,000, and documents including the Q3 2026 quarterly statement, 2025 Schedule K-1 and signed subscription agreement.",
  },
  coinvestAlignedTransparency: {
    kind: "static",
    src: "/product-graphics/svg/16-card-aligned-transparency.svg",
    width: 960,
    height: 720,
    alt: "Side by side: Jamie Chen's participant view of her Fund III co-invest ($120,000 committed, $75,000 called, 62.5%) and the administrator view of the whole program ($1,825,000 of $2,920,000 called) listing Alex Morgan, Taylor Smith and Jamie Chen.",
  },
  coinvestParticipantOnboarding: {
    kind: "static",
    src: "/product-graphics/svg/17-card-participant-onboarding.svg",
    width: 960,
    height: 720,
    alt: "Fund III co-invest participants Alex Morgan ($2,000,000), Taylor Smith ($800,000) and Jamie Chen ($120,000) have each completed invited, KYC, signed and funded steps.",
  },
  fundAdminWaterfall: {
    kind: "static",
    src: "/product-graphics/svg/13-card-distribution-waterfall.svg",
    width: 960,
    height: 720,
    alt: "Kittering Credit Fund I distribution of $60,000,000: return of capital $40,000,000, preferred return $6,400,000, GP catch-up $1,600,000 and an 80/20 split of $12,000,000 ($9,600,000 to LPs, $2,400,000 to the GP). LPs receive $56,000,000 and GP carry is $4,000,000.",
  },
  fundAdminAuditorRecalculation: {
    kind: "static",
    src: "/product-graphics/svg/20-card-auditor-recalculation.svg",
    width: 960,
    height: 720,
    alt: "Kittering Credit Fund I GP carry recalculated from inputs: $60,000,000 distributed less $40,000,000 contributed capital gives $20,000,000 profit; times 20% carry equals $4,000,000, which ties to the waterfall's $1,600,000 catch-up plus $2,400,000 carry split.",
  },
  fundAdminSameSource: {
    kind: "static",
    src: "/product-graphics/svg/21-card-same-source.svg",
    width: 960,
    height: 720,
    alt: "Kittering Credit Fund I source data (distribution $60,000,000, contributed capital $40,000,000, 20% carry rate) feeds the distribution waterfall, investor statement and audit workpaper, each showing the same $4,000,000 GP carry.",
  },
  fundAdminReviewFunds: {
    kind: "static",
    src: "/product-graphics/svg/22-card-review-many-funds.svg",
    width: 960,
    height: 720,
    alt: "Fund administrator view of 8 funds across 4 fictional clients (Northfield Capital, Aldermoor Partners, Kittering Credit, Bellcourt Real Estate): 4 active, 3 in review, 1 draft.",
  },
} as const satisfies Record<string, ProductVisual>;

/**
 * Portrait firm-level panel shown beside the "Built for" list on every solution page.
 * 312x720 viewBox; its smallest text is 11px at a display width of 300-312px.
 */
export const builtForPanel: ProductStaticVisual = {
  kind: "static",
  src: "/product-graphics/svg/23-panel-built-for.svg",
  width: 312,
  height: 720,
  alt: "Northfield Capital at a glance: total carry value $9,020,000 with $4,046,000 vested; employee co-invest $1,825,000 called of $2,920,000 (62.5%); Alex Morgan's 2026 total compensation $5,000,000 including $3,600,000 carry; participants Alex Morgan, Taylor Smith and Jamie Chen.",
};
