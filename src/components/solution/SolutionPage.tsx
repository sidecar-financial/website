import Image from "next/image";
import DemoForm from "@/components/home/DemoForm";
import { ProductVisual } from "@/components/product/ProductVisual";
import { builtForPanel } from "@/components/product/productVisuals";
import Button from "@/components/ui/Button";
import { Gap, Section } from "@/components/ui/Frame";
import { CheckBadge, PageHero, SectionIntro } from "@/components/ui/PageBlocks";
import {
  COMPARE,
  CUSTOMER_LOGOS,
  TESTIMONIALS,
  TRIAL_STEPS,
  quoteFor,
  solutionImages,
  splitQuote,
  type PageQuote,
  type SolutionPageData,
} from "./data";

/**
 * Shared template for the six solution pages. Section order follows the design
 * build's Solution component: hero → dashboard image → customer quote → logos →
 * features → "built for" list → tags → comparison → testimonials → trial steps →
 * demo form. Optional sections render only when the page data provides them.
 */
export default function SolutionPage({ page }: { page: SolutionPageData }) {
  const id = (name: string) => `${page.slug}-${name}`;
  // Every feature card on a page shares the aspect ratio of its graphics so rows line up,
  // including cards that still use a plain image.
  const cardVisual = page.features?.find((feature) => feature.visual)?.visual;
  const slotAspect = cardVisual ? cardVisual.width / cardVisual.height : undefined;

  return (
    <>
      <PageHero
        id={id("hero")}
        eyebrow={page.eyebrow}
        title={page.title}
        description={page.sub}
        ruled={!page.heroVisual}
      >
        <Button href="/demo" size="lg">
          Book a Free Demo
        </Button>
        {page.whitePaper !== false && (
          <Button href="/resource-hub" variant="secondary" size="lg">
            Get Free White Paper
          </Button>
        )}
      </PageHero>

      {page.heroVisual && (
        <Section noBorder>
          <div className="dot-grid border-b border-line px-3 sm:px-8 lg:px-12">
            <ProductVisual
              visual={page.heroVisual}
              sizes="(min-width: 1128px) 1030px, 100vw"
              className="w-full overflow-hidden rounded-t-xl border border-b-0 border-line-strong bg-white shadow-[0_-2px_0_4px_rgba(27,27,61,0.04),0_30px_60px_-30px_rgba(30,27,54,0.35)]"
            />
          </div>
        </Section>
      )}

      <CustomerQuote {...quoteFor(page)} />
      <CustomerLogos id={id("trust")} />

      {page.features && page.featuresTitle && (
        <Section id="features" label="Features" labelledBy={id("features")}>
          <SectionIntro id={id("features")} title={page.featuresTitle} ruled />
          <ul role="list" className="grid md:grid-cols-2">
            {page.features.map((feature) => {
              const image = feature.image
                ? solutionImages[feature.image]
                : undefined;
              return (
                <li
                  key={feature.title}
                  className="border-b border-line px-6 pb-10 pt-8 last:border-b-0 md:border-b-0 md:[&:nth-child(-n+2)]:border-b md:[&:nth-child(odd)]:border-r lg:px-8"
                >
                  <div
                    className={
                      slotAspect
                        ? "flex w-full items-center justify-center rounded bg-soft"
                        : "flex h-[240px] items-center justify-center overflow-hidden rounded bg-soft sm:h-[280px]"
                    }
                    style={slotAspect ? { aspectRatio: slotAspect } : undefined}
                  >
                    {feature.visual ? (
                      <ProductVisual
                        visual={feature.visual}
                        sizes="(min-width: 1128px) 524px, (min-width: 768px) 50vw, 100vw"
                        className="w-full"
                        controlPlacement="below"
                      />
                    ) : (
                      image && (
                        <Image
                          src={image.src}
                          alt={feature.alt}
                          width={image.width}
                          height={image.height}
                          sizes="(min-width: 1128px) 524px, (min-width: 768px) 50vw, 100vw"
                          className="h-auto max-h-full w-auto max-w-full object-contain"
                          unoptimized
                        />
                      )
                    )}
                  </div>
                  <h3 className="mt-8 text-xl font-medium leading-7 text-ink">{feature.title}</h3>
                  <p className="mt-3 text-[15px] leading-[25px] text-body">{feature.body}</p>
                </li>
              );
            })}
          </ul>
        </Section>
      )}

      {/* "Built for" list beside the participant total-compensation view */}
      <Section label="Built for" labelledBy={id("list")}>
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.78fr)]">
          <div className="px-6 py-12 lg:px-12 lg:py-[72px]">
            <h2
              id={id("list")}
              className="text-[28px] font-semibold leading-[1.25] text-ink lg:text-[40px] lg:leading-[50px]"
            >
              {page.listTitle}
            </h2>
            <ul role="list" className="mt-9 border-t border-line">
              {page.listItems.map((item) => (
                <li key={item} className="flex items-start gap-4 border-b border-line py-5">
                  <CheckBadge className="mt-0.5" />
                  <p className="text-base font-medium leading-6 text-ink">{item}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center justify-center border-t border-line bg-soft px-6 py-12 lg:border-l lg:border-t-0 lg:px-12">
            <ProductVisual
              visual={builtForPanel}
              sizes="312px"
              className="block w-full max-w-[312px]"
            />
          </div>
        </div>
      </Section>

      {page.tags && page.tagsTitle && (
        <Section label="Supports" labelledBy={id("tags")}>
          <div className="px-6 py-12 lg:px-12 lg:py-[60px]">
            <h2
              id={id("tags")}
              className="text-[26px] font-semibold leading-[1.25] text-ink lg:text-[34px] lg:leading-[42px]"
            >
              {page.tagsTitle}
            </h2>
            <ul role="list" className="mt-7 flex flex-wrap gap-2.5">
              {page.tags.map((tag) => (
                <li
                  key={tag}
                  className="flex items-center gap-2.5 rounded-md border border-line-strong px-4 py-3 text-[15px] leading-[1.3] text-ink"
                >
                  <span aria-hidden="true" className="block size-1.5 shrink-0 bg-orange" />
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </Section>
      )}

      {page.comparison && <ComparisonTable id={id("compare")} />}

      <CustomerTestimonials id={id("proof")} />
      {page.trialSteps !== false && <TrialSteps id={id("trial")} />}

      <Gap />
      <DemoForm
        id="contact"
        label="Contact"
        title={
          <>
            Have Questions? <span className="text-orange">We Have Answers.</span>
          </>
        }
        description="Get in touch with our expert team for a demo or any inquiries."
      />
    </>
  );
}

function CustomerQuote({ quote, attribution, featured, emphasis }: PageQuote) {
  if (featured) return <FeaturedQuote quote={quote} attribution={attribution} emphasis={emphasis} />;
  return (
    <Section>
      <figure className="flex flex-wrap items-baseline gap-x-12 gap-y-4 px-6 py-9 lg:px-12 lg:py-12">
        <blockquote className="min-w-0 flex-[3_1_480px]">
          <p className="text-xl font-medium leading-[1.4] text-ink lg:text-2xl">
            &ldquo;{quote}&rdquo;
          </p>
        </blockquote>
        <figcaption className="flex-[1_1_220px] text-[15px] leading-6 text-body">
          {attribution.map((line, i) => (
            <span key={line} className="block">
              {i === 0 ? "– " : ""}
              {line}
            </span>
          ))}
        </figcaption>
      </figure>
    </Section>
  );
}

/**
 * Opt-in "featured" quote (PageQuote.featured): same blockquote/figcaption semantics and text as the
 * default, set larger on a soft panel with a decorative orange mark, highlighted key phrases and a
 * ruled attribution block. Everything orange here is decorative and aria-hidden; text stays ink/body.
 * The curly quotes stay in the DOM (screen-reader-only) so the reading is identical to the default.
 */
function FeaturedQuote({ quote, attribution, emphasis }: PageQuote) {
  const [name, ...roles] = attribution;
  return (
    <Section>
      <figure className="bg-soft px-6 py-12 lg:px-12 lg:py-16">
        <svg
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 48 36"
          className="mb-6 h-7 w-auto text-orange lg:mb-8 lg:h-10"
        >
          <path
            fill="currentColor"
            d="M0 36V20C0 8 6 2 18 0l2 5C14 7 11 10 10.6 16H20v20H0ZM27 36V20C27 8 33 2 45 0l2 5C41 7 38 10 37.6 16H47v20H27Z"
          />
        </svg>
        <blockquote className="max-w-[31em] text-xl font-medium leading-[1.45] text-ink lg:text-[28px] lg:leading-[1.4]">
          <p>
            <span className="sr-only">&ldquo;</span>
            {splitQuote(quote, emphasis).map((segment, i) =>
              segment.emphasis ? (
                <span
                  key={i}
                  className="font-semibold [background-image:linear-gradient(transparent_58%,rgba(245,166,29,0.32)_58%)] [box-decoration-break:clone]"
                >
                  {segment.text}
                </span>
              ) : (
                segment.text
              ),
            )}
            <span className="sr-only">&rdquo;</span>
          </p>
        </blockquote>
        <figcaption className="mt-8 flex items-start gap-4 border-t border-line-strong pt-6 lg:mt-10">
          <span aria-hidden="true" className="mt-2 block h-0.5 w-8 shrink-0 bg-orange" />
          <span>
            {name && <span className="block text-base font-semibold leading-6 text-ink">{name}</span>}
            {roles.map((line) => (
              <span key={line} className="block text-[15px] leading-6 text-body">
                {line}
              </span>
            ))}
          </span>
        </figcaption>
      </figure>
    </Section>
  );
}

function CustomerLogos({ id }: { id: string }) {
  return (
    <Section labelledBy={id}>
      <div className="grid lg:grid-cols-[393px_1fr]">
        <div className="flex flex-col justify-center px-6 py-10 lg:px-[30px] lg:py-0">
          <h2 id={id} className="text-lg font-medium leading-7 text-ink lg:text-[22px] lg:leading-[1.3]">
            Firms with over $150B AUM use Navable.
          </h2>
        </div>
        <ul
          role="list"
          className="grid min-h-[104px] grid-cols-2 border-t border-line sm:grid-cols-4 lg:min-h-[168px] lg:border-t-0"
          aria-label="Customers"
        >
          {CUSTOMER_LOGOS.map((logo) => (
            <li key={logo.name} className="flex items-center justify-center border-l border-line px-4 py-7">
              <Image
                src={logo.src}
                alt={logo.name}
                width={logo.width}
                height={logo.height}
                className="h-auto max-w-full"
                unoptimized
              />
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

const compareHeadCell =
  "border-b border-line px-6 py-[18px] text-left font-mono text-xs font-semibold uppercase leading-none tracking-[0.1em] text-ink";

function ComparisonTable({ id }: { id: string }) {
  return (
    <Section label="The Problem" labelledBy={id}>
      <div className="flex flex-wrap items-end gap-x-16 gap-y-6 px-6 py-12 lg:px-12 lg:py-[72px]">
        <h2
          id={id}
          className="min-w-0 flex-[1_1_420px] text-[28px] font-semibold leading-[1.25] text-ink lg:text-[40px] lg:leading-[50px]"
        >
          Carry Ops Were Never Meant to <span className="text-orange">Live in Excel</span>
        </h2>
        <div className="flex flex-[1_1_360px] flex-col gap-3 text-base leading-[1.55] text-body">
          <p>
            Most carry models grow into fragile webs of tabs, links, and hidden formulas understood by
            only a few; <strong className="font-semibold text-ink">which works, until it doesn&rsquo;t</strong>.
          </p>
          <p>
            Teams spend hours reconciling spreadsheets, tracing changes, and validating numbers. Every
            new version increases operational and audit risk, which keeps compounding to year-end.
          </p>
        </div>
      </div>
      <p aria-hidden="true" className="px-6 pb-3 font-mono text-[11px] uppercase leading-none tracking-[0.12em] text-subtle md:hidden">
        Swipe sideways to compare →
      </p>
      {/* Focusable scroll region so keyboard users can pan the table on narrow screens. */}
      <div
        role="region"
        aria-labelledby={id}
        tabIndex={0}
        className="overflow-x-auto border-t border-line"
      >
        <table className="w-full min-w-[680px] border-collapse text-[15px] leading-normal">
          <caption className="sr-only">Spreadsheets compared with Navable</caption>
          <thead>
            <tr>
              <th scope="col" className={`${compareHeadCell} w-[22%] px-6 lg:px-12`}>
                <span className="sr-only">Area</span>
              </th>
              <th scope="col" className={compareHeadCell}>
                With spreadsheets
              </th>
              <th scope="col" className={`${compareHeadCell} bg-orange/10 pr-6 lg:pr-12`}>
                With Navable
              </th>
            </tr>
          </thead>
          <tbody className="[&>tr:last-child>*]:border-b-0">
            {COMPARE.map((row) => (
              <tr key={row.area}>
                <th
                  scope="row"
                  className="border-b border-line px-6 py-[22px] text-left align-top font-medium text-ink lg:px-12"
                >
                  {row.area}
                </th>
                <td className="border-b border-line px-6 py-[22px] align-top text-body">{row.spreadsheets}</td>
                <td className="border-b border-line bg-orange/10 py-[22px] pl-6 pr-6 align-top text-ink lg:pr-12">
                  {row.navable}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}

function CustomerTestimonials({ id }: { id: string }) {
  return (
    <Section label="Testimonials" labelledBy={id}>
      <div className="px-6 pb-10 pt-12 lg:px-12 lg:pt-[72px]">
        <h2
          id={id}
          className="text-[28px] font-semibold leading-[1.25] text-ink lg:text-[40px] lg:leading-[50px]"
        >
          What Our Customers Say
        </h2>
      </div>
      <ul role="list" className="grid border-t border-line md:grid-cols-3">
        {TESTIMONIALS.map((item) => (
          <li
            key={item.quote}
            className="border-b border-line last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"
          >
            <figure className="flex h-full flex-col gap-7 px-6 py-10 lg:px-10">
              <blockquote>
                <p className="text-[22px] font-medium leading-[1.35] text-ink">&ldquo;{item.quote}&rdquo;</p>
              </blockquote>
              <figcaption className="mt-auto text-base leading-6 text-body">
                {item.attribution.map((line, i) => (
                  <span key={line} className="block">
                    {i === 0 ? "– " : ""}
                    {line}
                  </span>
                ))}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function TrialSteps({ id }: { id: string }) {
  return (
    <Section labelledBy={id}>
      <SectionIntro
        id={id}
        title="Try Us Out With Your Actual Fund Data"
        description="We set up a working fund from your own plans so you can test Navable against your real structure before you commit."
      />
      <ol role="list" className="grid gap-y-10 pb-14 md:grid-cols-3">
        {TRIAL_STEPS.map((step, index) => (
          <li
            key={step.title}
            className="relative flex flex-col items-center px-6 text-center before:absolute before:inset-x-0 before:top-7 before:border-t before:border-dashed before:border-subtle/50"
          >
            <span
              aria-hidden="true"
              className={`relative flex size-14 items-center justify-center rounded-full border border-ink text-[15px] text-ink ${
                index === TRIAL_STEPS.length - 1 ? "bg-orange" : "bg-white"
              }`}
            >
              {index + 1}
            </span>
            <h3 className="mt-7 text-xl font-medium leading-[1.3] text-ink">{step.title}</h3>
            <p className="mt-3 max-w-[240px] text-base leading-6 text-body">{step.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
