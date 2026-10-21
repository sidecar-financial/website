import Link from "next/link";
import Image from "next/image";
import { footerColumns, legalLinks, type FooterLink } from "./navigation";

const linkClass =
  "inline-block rounded py-1 text-sm text-navy-text transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 focus-visible:ring-offset-navy";

function FooterColumn({
  id,
  title,
  links,
}: {
  id: string;
  title: string;
  links: FooterLink[];
}) {
  return (
    <nav aria-labelledby={id}>
      <h3 id={id} className="mb-3 text-sm font-medium text-white">
        {title}
      </h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.label}>
            {link.href && link.external ? (
              <a href={link.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                {link.label}
                <span className="sr-only"> (opens in new tab)</span>
              </a>
            ) : link.href ? (
              <Link href={link.href} className={linkClass}>
                {link.label}
              </Link>
            ) : (
              // Announced product without a page yet: plain text, not a link.
              <span className="inline-flex cursor-default items-center gap-2 py-1 text-sm text-navy-text">
                {link.label}
                <span className="rounded-full border border-navy-border px-2 py-[3px] font-mono text-[9px] uppercase leading-none tracking-[0.14em] text-navy-text">
                  Coming soon
                </span>
              </span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function Footer() {
  return (
    <footer className="bg-navy" role="contentinfo">
      <div className="mx-auto max-w-[1128px] px-6 pb-8 pt-12 lg:px-[30px] lg:pt-[62px]">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          {/* Logo and contact */}
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="inline-block rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
            >
              <Image
                src="/images/logos/navable-footer.png"
                alt="Navable - Home"
                width={158}
                height={45}
                className="h-auto w-[132px]"
                unoptimized
              />
            </Link>
            <div className="mt-4 space-y-1">
              <a
                href="https://www.linkedin.com/company/navable/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[44px] items-center rounded-md py-2 text-sm text-navy-text transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
                aria-label="Follow Navable on LinkedIn (opens in new tab)"
              >
                <svg className="mr-2 size-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <span>LinkedIn</span>
              </a>
              <a
                href="tel:+15122700291"
                className="flex min-h-[44px] items-center rounded-md py-2 text-sm text-navy-text transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
                aria-label="Call Navable at +1 512 270 0291"
              >
                <svg className="mr-2 size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+1 (512) 270-0291</span>
              </a>
            </div>
          </div>

          {footerColumns.map((column) => (
            <FooterColumn
              key={column.id}
              id={`footer-${column.id}`}
              title={column.title}
              links={column.items}
            />
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center gap-3 border-t border-navy-line pt-6 md:flex-row md:justify-between">
          <p className="text-sm text-navy-text">© 2026 Navable Inc. All rights reserved.</p>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-1">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
