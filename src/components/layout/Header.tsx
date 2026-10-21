"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "../ui/Button";

const navigation = {
  solutions: [
    {
      name: "Carried Interest Software",
      href: "/platform",
      description: "Manage carry plans, allocations, and vesting",
    },
    {
      name: "Employee Co-Invest",
      href: "/solutions/employee-co-invest",
      description: "Turnkey co-investment programs",
    },
    {
      name: "Compensation Management",
      href: "/solutions/compensation-management",
      description: "Unified total compensation visibility",
    },
  ],
  whoWeServe: [
    {
      name: "Private Equity & Private Credit",
      href: "/who-we-serve/private-equity",
    },
    { name: "Venture Capital", href: "/who-we-serve/venture-capital" },
    { name: "Real Estate", href: "/who-we-serve/real-estate" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Resource Hub", href: "/resources" },
  ],
};

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex items-center">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                className="text-[#5046e5]"
              >
                <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2.5" />
                <circle cx="16" cy="16" r="6" fill="currentColor" />
              </svg>
              <span className="ml-2 text-xl font-bold text-gray-900">NAVABLE</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {/* Platform Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("platform")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#5046e5] transition-colors">
                Platform
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {activeDropdown === "platform" && (
                <div className="absolute top-full left-0 w-72 bg-white rounded-xl shadow-lg border border-gray-100 py-2 mt-1">
                  {navigation.solutions.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-4 py-3 hover:bg-gray-50"
                    >
                      <div className="text-sm font-medium text-gray-900">{item.name}</div>
                      {item.description && (
                        <div className="text-xs text-gray-500 mt-0.5">{item.description}</div>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Why Navable */}
            <Link
              href="/why-navable"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#5046e5] transition-colors"
            >
              Why Navable
            </Link>

            {/* How it Works */}
            <Link
              href="/how-it-works"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#5046e5] transition-colors"
            >
              How it works
            </Link>

            {/* FAQ */}
            <Link
              href="/faq"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#5046e5] transition-colors"
            >
              FAQ
            </Link>

            {/* Company Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("company")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#5046e5] transition-colors">
                Company
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {activeDropdown === "company" && (
                <div className="absolute top-full left-0 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 mt-1">
                  {navigation.company.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#5046e5]"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right side buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              href="/sign-in"
              className="text-sm font-medium text-gray-700 hover:text-[#5046e5] transition-colors"
            >
              Sign in
            </Link>
            <Button href="/demo" size="sm">
              Book a Free Demo
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2">
                  Platform
                </div>
                {navigation.solutions.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-2 py-2 text-sm text-gray-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="space-y-2">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2">
                  Company
                </div>
                {navigation.company.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-2 py-2 text-sm text-gray-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="pt-4 space-y-3">
                <Link
                  href="/sign-in"
                  className="block text-center py-2 text-sm font-medium text-gray-700"
                >
                  Sign in
                </Link>
                <Button href="/demo" className="w-full">
                  Book a Free Demo
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
