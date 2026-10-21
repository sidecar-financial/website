import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  solutions: [
    { name: "Turnkey Employee Co-Invest", href: "/solutions/employee-co-invest" },
    { name: "Carried Interest Software", href: "/platform" },
    { name: "Total Compensation Solutions", href: "/solutions/compensation-management" },
  ],
  whoWeServe: [
    { name: "Real Estate", href: "/who-we-serve/real-estate" },
    { name: "Venture Capital", href: "/who-we-serve/venture-capital" },
    { name: "Private Equity & Private Credit", href: "/who-we-serve/private-equity" },
  ],
  company: [
    { name: "About us", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Resource Hub", href: "/resources" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Cookie Policy", href: "/cookies" },
    { name: "Terms of Service", href: "/terms" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Logo and contact */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block">
              <Image
                src="/images/navable-logo.png"
                alt="Navable"
                width={140}
                height={32}
                className="h-8 w-auto"
              />
            </Link>
            <div className="mt-4 space-y-2">
              <a
                href="https://www.linkedin.com/company/navable/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm text-gray-500 hover:text-[#5046e5] transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
              <a
                href="tel:+15122700291"
                className="flex items-center text-sm text-gray-500 hover:text-[#5046e5] transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +1 (512) 270-0291
              </a>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Solutions
            </h3>
            <ul className="space-y-2">
              {footerLinks.solutions.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-[#5046e5] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Who we serve */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Who we serve
            </h3>
            <ul className="space-y-2">
              {footerLinks.whoWeServe.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-[#5046e5] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Company
            </h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-[#5046e5] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Legal
            </h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-[#5046e5] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-gray-100">
          <p className="text-sm text-gray-400 text-center">
            © 2026 Navable Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
