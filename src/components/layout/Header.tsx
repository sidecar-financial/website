"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [mobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
      {/* Skip to main content link for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60] focus:px-4 focus:py-2 focus:bg-[#5046e5] focus:text-white focus:rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5046e5]"
      >
        Skip to main content
      </a>
      <nav className="max-w-7xl mx-auto px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center focus:outline-none focus:ring-2 focus:ring-[#5046e5] focus:ring-offset-2 rounded-md">
            <Image
              src="/images/navable-logo.png"
              alt="Navable - Home"
              width={140}
              height={32}
              className="h-8 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8" role="navigation" aria-label="Primary">
            <Link href="/platform" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-[#5046e5] focus:ring-offset-2 rounded-md px-1 py-0.5">
              Platform
            </Link>
            <Link href="/why-navable" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-[#5046e5] focus:ring-offset-2 rounded-md px-1 py-0.5">
              Why Navable
            </Link>
            <Link href="/how-it-works" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-[#5046e5] focus:ring-offset-2 rounded-md px-1 py-0.5">
              How it works
            </Link>
            <Link href="/faq" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-[#5046e5] focus:ring-offset-2 rounded-md px-1 py-0.5">
              FAQ
            </Link>
            <Link href="/about" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-[#5046e5] focus:ring-offset-2 rounded-md px-1 py-0.5">
              Company
            </Link>
          </div>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-6">
            <Link href="/sign-in" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-[#5046e5] focus:ring-offset-2 rounded-md px-1 py-0.5">
              Sign in
            </Link>
            <Link
              href="/demo"
              className="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white bg-[#5046e5] rounded-full hover:bg-[#4038c7] transition-colors focus:outline-none focus:ring-2 focus:ring-[#5046e5] focus:ring-offset-2"
            >
              Book a Free Demo
            </Link>
          </div>

          {/* Mobile menu button - meets 44x44 touch target */}
          <button
            className="lg:hidden p-3 -mr-3 min-w-[44px] min-h-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#5046e5] focus:ring-offset-2 rounded-md"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          className={`lg:hidden border-t border-gray-100 transition-all duration-200 ${
            mobileMenuOpen ? "max-h-screen py-4 opacity-100" : "max-h-0 py-0 opacity-0 overflow-hidden"
          }`}
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col gap-1">
            <Link
              href="/platform"
              className="text-sm font-medium text-gray-600 py-3 px-2 min-h-[44px] flex items-center hover:bg-gray-50 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5046e5] focus:ring-inset"
              onClick={() => setMobileMenuOpen(false)}
            >
              Platform
            </Link>
            <Link
              href="/why-navable"
              className="text-sm font-medium text-gray-600 py-3 px-2 min-h-[44px] flex items-center hover:bg-gray-50 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5046e5] focus:ring-inset"
              onClick={() => setMobileMenuOpen(false)}
            >
              Why Navable
            </Link>
            <Link
              href="/how-it-works"
              className="text-sm font-medium text-gray-600 py-3 px-2 min-h-[44px] flex items-center hover:bg-gray-50 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5046e5] focus:ring-inset"
              onClick={() => setMobileMenuOpen(false)}
            >
              How it works
            </Link>
            <Link
              href="/faq"
              className="text-sm font-medium text-gray-600 py-3 px-2 min-h-[44px] flex items-center hover:bg-gray-50 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5046e5] focus:ring-inset"
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-gray-600 py-3 px-2 min-h-[44px] flex items-center hover:bg-gray-50 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5046e5] focus:ring-inset"
              onClick={() => setMobileMenuOpen(false)}
            >
              Company
            </Link>
            <hr className="border-gray-100 my-2" aria-hidden="true" />
            <Link
              href="/sign-in"
              className="text-sm font-medium text-gray-600 py-3 px-2 min-h-[44px] flex items-center hover:bg-gray-50 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5046e5] focus:ring-inset"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sign in
            </Link>
            <Link
              href="/demo"
              className="inline-flex items-center justify-center px-5 py-3 min-h-[44px] text-sm font-semibold text-white bg-[#5046e5] rounded-full mt-2 focus:outline-none focus:ring-2 focus:ring-[#5046e5] focus:ring-offset-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Book a Free Demo
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
