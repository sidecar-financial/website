"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="14" stroke="#5046e5" strokeWidth="3" />
              <circle cx="16" cy="16" r="5" fill="#5046e5" />
            </svg>
            <span className="text-lg font-bold text-gray-900 tracking-tight">NAVABLE</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <Link href="/platform" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Platform
            </Link>
            <Link href="/why-navable" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Why Navable
            </Link>
            <Link href="/how-it-works" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              How it works
            </Link>
            <Link href="/faq" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              FAQ
            </Link>
            <Link href="/about" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Company
            </Link>
          </div>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-6">
            <Link href="/sign-in" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Sign in
            </Link>
            <Link
              href="/demo"
              className="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white bg-[#5046e5] rounded-full hover:bg-[#4038c7] transition-colors"
            >
              Book a Free Demo
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 -mr-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            <div className="flex flex-col gap-4">
              <Link href="/platform" className="text-sm font-medium text-gray-600" onClick={() => setMobileMenuOpen(false)}>
                Platform
              </Link>
              <Link href="/why-navable" className="text-sm font-medium text-gray-600" onClick={() => setMobileMenuOpen(false)}>
                Why Navable
              </Link>
              <Link href="/how-it-works" className="text-sm font-medium text-gray-600" onClick={() => setMobileMenuOpen(false)}>
                How it works
              </Link>
              <Link href="/faq" className="text-sm font-medium text-gray-600" onClick={() => setMobileMenuOpen(false)}>
                FAQ
              </Link>
              <Link href="/about" className="text-sm font-medium text-gray-600" onClick={() => setMobileMenuOpen(false)}>
                Company
              </Link>
              <hr className="border-gray-100" />
              <Link href="/sign-in" className="text-sm font-medium text-gray-600" onClick={() => setMobileMenuOpen(false)}>
                Sign in
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-[#5046e5] rounded-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                Book a Free Demo
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
