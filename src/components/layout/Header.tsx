"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SIGN_IN_URL } from "@/lib/site";
import NavIcon from "./NavIcon";
import { groupItems, navGroups, type NavGroup, type NavItem, type NavSection } from "./navigation";

const focusRing =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 rounded-md";

const mobileRowFocus =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-inset";

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-3 w-3 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 9l6 6 6-6" />
    </svg>
  );
}

/** The (single) item that matches the current page; used for `aria-current`. */
function currentItem(group: NavGroup, pathname: string): NavItem | undefined {
  return groupItems(group).find((item) => item.href === pathname);
}

const panelWidth: Record<string, string> = {
  solutions: "w-[min(760px,calc(100vw-48px))]",
  resources: "w-[360px]",
  company: "w-[360px]",
};

/** Small mono eyebrow with the orange square, as used in page heroes. */
function Eyebrow({ id, children }: { id?: string; children: string }) {
  return (
    <p
      id={id}
      className="flex items-center gap-2.5 px-3 pb-2 pt-3 font-mono text-[10px] uppercase leading-none tracking-[0.16em] text-subtle"
    >
      <span aria-hidden="true" className="block size-2 bg-orange" />
      {children}
    </p>
  );
}

function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`size-4 shrink-0 transition-transform duration-200 ${className}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

/** Small "Coming soon" pill (mono eyebrow style); ink on tint for >= 4.5:1 contrast. */
function SoonPill() {
  return (
    <span className="inline-flex shrink-0 items-center rounded-full border border-line-strong bg-soft px-2 py-[3px] font-mono text-[9px] uppercase leading-none tracking-[0.14em] text-ink">
      Coming soon
    </span>
  );
}

/** Desktop row for a product without a page yet: visible, readable, not interactive. */
function SoonRow({ item }: { item: NavItem }) {
  return (
    <div className="flex cursor-default items-center gap-3.5 rounded-md p-3">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-md border border-line bg-soft text-subtle">
        <NavIcon name={item.icon} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="text-sm font-semibold leading-5 text-body">{item.label}</span>
          <SoonPill />
        </span>
        <span className="block text-[13px] leading-[18px] text-subtle">{item.description}</span>
      </span>
    </div>
  );
}

/** Desktop dropdown row: icon tile + title + one-line description + sliding arrow. */
function MenuRow({
  item,
  href,
  current,
  onNavigate,
}: {
  item: NavItem;
  href: string;
  current: boolean;
  onNavigate: () => void;
}) {
  return (
    <Link
      href={href}
      aria-current={current ? "page" : undefined}
      onClick={onNavigate}
      className="group flex items-center gap-3.5 rounded-md p-3 transition-colors hover:bg-soft focus:outline-none focus-visible:bg-soft focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 aria-[current=page]:bg-soft"
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded-md border border-line bg-soft text-ink transition-colors group-hover:border-orange group-hover:bg-orange group-focus-visible:border-orange group-focus-visible:bg-orange">
        <NavIcon name={item.icon} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold leading-5 text-ink">{item.label}</span>
        <span className="block text-[13px] leading-[18px] text-body">{item.description}</span>
      </span>
      <ArrowRight className="text-subtle group-hover:translate-x-1 group-hover:text-ink group-focus-visible:translate-x-1 group-focus-visible:text-ink" />
    </Link>
  );
}

function MenuSection({
  section,
  groupId,
  current,
  onNavigate,
}: {
  section: NavSection;
  groupId: string;
  current: NavItem | undefined;
  onNavigate: () => void;
}) {
  const labelId = `nav-${groupId}-${section.id}-label`;
  return (
    <div>
      {section.label && <Eyebrow id={labelId}>{section.label}</Eyebrow>}
      <ul aria-labelledby={section.label ? labelId : undefined}>
        {section.items.map((item) => (
          <li key={item.label}>
            {item.href ? (
              <MenuRow item={item} href={item.href} current={item === current} onNavigate={onNavigate} />
            ) : (
              <SoonRow item={item} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Header() {
  const pathname = usePathname();

  // ---- Desktop dropdowns -------------------------------------------------
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const hoverOpened = useRef(false); // true while a menu is open only because of mouse hover
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const groupRefs = useRef<Record<string, HTMLLIElement | null>>({});

  // ---- Mobile menu -------------------------------------------------------
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const closeMobile = useCallback((returnFocus: boolean) => {
    setMobileOpen(false);
    setOpenAccordion(null);
    if (returnFocus) hamburgerRef.current?.focus();
  }, []);

  // Close everything on route change. Done during render (not in an effect) so the
  // menus never flash open on the new page.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setOpenGroup(null);
    setMobileOpen(false);
    setOpenAccordion(null);
  }

  // Desktop: Escape closes + returns focus to trigger; outside pointer press closes.
  useEffect(() => {
    if (!openGroup) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      const trigger = triggerRefs.current[openGroup];
      setOpenGroup(null);
      hoverOpened.current = false;
      trigger?.focus();
    };
    const handlePointerDown = (e: PointerEvent) => {
      const container = groupRefs.current[openGroup];
      if (container && !container.contains(e.target as Node)) {
        setOpenGroup(null);
        hoverOpened.current = false;
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [openGroup]);

  // Mobile: Escape closes the menu and returns focus to the hamburger.
  useEffect(() => {
    if (!mobileOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMobile(true);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen, closeMobile]);

  // Mobile: lock body scroll while open, and focus the first item.
  useEffect(() => {
    if (!mobileOpen) return;
    document.body.style.overflow = "hidden";
    mobileMenuRef.current?.querySelector<HTMLElement>("button, a[href]")?.focus();
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Mobile: if the viewport grows to the desktop layout, drop the mobile menu.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) closeMobile(false);
    };
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, [closeMobile]);

  const handleTriggerClick = (id: string) => {
    if (openGroup === id && hoverOpened.current) {
      // Opened by hover, then clicked: keep it open ("pin" it) rather than toggling shut.
      hoverOpened.current = false;
      return;
    }
    hoverOpened.current = false;
    setOpenGroup(openGroup === id ? null : id);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-white">
      {/* Skip to main content link for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-[60] focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-white focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2"
      >
        Skip to main content
      </a>
      <nav className="mx-auto max-w-[1128px] px-6 lg:px-[30px]" aria-label="Main navigation">
        <div className="flex h-[67px] items-center">
          {/* Logo */}
          <Link href="/" className={`flex items-center ${focusRing}`}>
            <Image
              src="/images/navable-logo.svg"
              alt="Navable - Home"
              width={150}
              height={37}
              className="h-auto w-[150px]"
              priority
            />
          </Link>

          {/* Desktop navigation */}
          <ul className="ml-10 hidden items-center gap-6 lg:flex xl:ml-[117px] xl:gap-7" aria-label="Primary">
            {navGroups.map((group) => {
              const isOpen = openGroup === group.id;
              const panelId = `nav-panel-${group.id}`;
              const current = currentItem(group, pathname);
              return (
                <li
                  key={group.id}
                  ref={(el) => {
                    groupRefs.current[group.id] = el;
                  }}
                  className="relative flex h-[67px] items-center"
                  onPointerEnter={(e) => {
                    if (e.pointerType !== "mouse" || isOpen) return;
                    hoverOpened.current = true;
                    setOpenGroup(group.id);
                  }}
                  onPointerLeave={(e) => {
                    if (e.pointerType !== "mouse" || !isOpen || !hoverOpened.current) return;
                    hoverOpened.current = false;
                    setOpenGroup(null);
                  }}
                  onBlur={(e) => {
                    // Focus moved out of this menu (relatedTarget is null when focus
                    // leaves the document or lands on a non-focusable element; the
                    // outside-pointer handler covers mouse clicks in that case).
                    const next = e.relatedTarget as Node | null;
                    if (isOpen && next && !e.currentTarget.contains(next)) {
                      hoverOpened.current = false;
                      setOpenGroup(null);
                    }
                  }}
                >
                  <button
                    type="button"
                    ref={(el) => {
                      triggerRefs.current[group.id] = el;
                    }}
                    className={`inline-flex items-center gap-1 px-1 py-0.5 text-sm text-ink transition-opacity hover:opacity-70 ${focusRing}`}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => handleTriggerClick(group.id)}
                  >
                    {group.label}
                    <Chevron open={isOpen} />
                  </button>
                  <div
                    id={panelId}
                    inert={!isOpen}
                    className={`absolute left-0 top-full z-50 overflow-hidden rounded-b-lg border border-line bg-white shadow-[0_16px_32px_-16px_rgba(27,27,61,0.22)] transition-[opacity,translate,visibility] [transition-duration:150ms,150ms,0s] ease-out ${
                      panelWidth[group.id]
                    } ${
                      isOpen
                        ? "visible translate-y-0 opacity-100"
                        : "invisible -translate-y-1 opacity-0 [transition-delay:0s,0s,150ms]"
                    }`}
                  >
                    <div
                      className={`p-2 ${
                        group.sections.length > 1 ? "grid grid-cols-2 gap-x-2 [&>div+div]:border-l [&>div+div]:border-line [&>div+div]:pl-2" : ""
                      }`}
                    >
                      {group.sections.map((section) => (
                        <MenuSection
                          key={section.id}
                          section={section}
                          groupId={group.id}
                          current={current}
                          onNavigate={() => setOpenGroup(null)}
                        />
                      ))}
                    </div>
                    {group.id === "solutions" && (
                      <div className="flex items-center justify-between gap-4 border-t border-line bg-soft px-5 py-3.5">
                        <p className="min-w-0">
                          <span className="block text-sm font-semibold leading-5 text-ink">See it on your own fund</span>
                          <span className="block text-[13px] leading-[18px] text-body">
                            Validate Navable before you commit.
                          </span>
                        </p>
                        <Link
                          href="/demo"
                          onClick={() => setOpenGroup(null)}
                          className="group inline-flex h-10 shrink-0 items-center rounded-lg bg-orange px-4 text-sm font-medium text-ink transition-[color,background-color,box-shadow] hover:bg-orange-dark hover:shadow-[0_8px_24px_-4px_rgba(245,166,29,0.6)] focus:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
                        >
                          Book a Free Demo
                          <ArrowRight className="ml-1.5 group-hover:translate-x-1 group-focus-visible:translate-x-1" />
                        </Link>
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Right side */}
          <div className="ml-auto hidden items-center gap-8 lg:flex">
            <a
              href={SIGN_IN_URL}
              className={`px-1 py-0.5 text-sm text-ink transition-opacity hover:opacity-70 ${focusRing}`}
            >
              Sign in
            </a>
            <Link
              href="/demo"
              className="inline-flex h-10 items-center rounded-lg bg-ink px-[18px] text-sm font-medium text-white transition-[color,background-color,box-shadow] hover:bg-[#2c2c5a] hover:shadow-[0_8px_24px_-4px_rgba(76,70,163,0.55)] focus:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
            >
              Book a Free Demo
            </Link>
          </div>

          {/* Mobile menu button - meets 44x44 touch target */}
          <button
            ref={hamburgerRef}
            type="button"
            className={`-mr-3 ml-auto flex min-h-[44px] min-w-[44px] items-center justify-center p-3 lg:hidden ${focusRing}`}
            onClick={() => (mobileOpen ? closeMobile(false) : setMobileOpen(true))}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            <svg className="h-6 w-6 text-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              {mobileOpen ? (
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
          ref={mobileMenuRef}
          className={`flex flex-col border-t border-line transition-all duration-200 lg:hidden ${
            mobileOpen
              ? "max-h-[calc(100dvh-68px)] opacity-100"
              : "max-h-0 overflow-hidden border-t-0 opacity-0"
          }`}
          aria-label="Mobile navigation"
          inert={!mobileOpen}
        >
          {/* Accordion groups (scrolls if the viewport is short) */}
          <ul className="min-h-0 flex-1 overflow-y-auto overscroll-contain py-2">
            {navGroups.map((group) => {
              const isOpen = openAccordion === group.id;
              const panelId = `mobile-panel-${group.id}`;
              const current = currentItem(group, pathname);
              return (
                <li key={group.id}>
                  <button
                    type="button"
                    className={`flex min-h-[44px] w-full items-center justify-between rounded-md px-2 py-3 text-left text-sm text-ink hover:bg-soft ${mobileRowFocus}`}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenAccordion(isOpen ? null : group.id)}
                  >
                    {group.label}
                    <Chevron open={isOpen} />
                  </button>
                  <div
                    id={panelId}
                    inert={!isOpen}
                    className={`grid transition-[grid-template-rows] duration-200 ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="min-h-0 overflow-hidden">
                      {group.sections.map((section) => {
                        const labelId = `mobile-${group.id}-${section.id}-label`;
                        return (
                          <div key={section.id}>
                            {section.label && (
                              <Eyebrow id={labelId}>{section.label}</Eyebrow>
                            )}
                            <ul aria-labelledby={section.label ? labelId : undefined}>
                              {section.items.map((item) => (
                                <li key={item.label}>
                                  {item.href ? (
                                    <Link
                                      href={item.href}
                                      aria-current={item === current ? "page" : undefined}
                                      className={`group flex min-h-[44px] items-center gap-3 rounded-md py-1.5 pl-4 pr-2 text-sm text-ink hover:bg-soft aria-[current=page]:bg-soft ${mobileRowFocus}`}
                                      onClick={() => closeMobile(true)}
                                    >
                                      <span className="flex size-8 shrink-0 items-center justify-center rounded-md border border-line bg-soft text-ink">
                                        <NavIcon name={item.icon} className="size-[18px]" />
                                      </span>
                                      <span className="font-medium">{item.label}</span>
                                    </Link>
                                  ) : (
                                    <div className="flex min-h-[44px] cursor-default items-center gap-3 py-1.5 pl-4 pr-2 text-sm">
                                      <span className="flex size-8 shrink-0 items-center justify-center rounded-md border border-line bg-soft text-subtle">
                                        <NavIcon name={item.icon} className="size-[18px]" />
                                      </span>
                                      <span className="font-medium text-body">{item.label}</span>
                                      <SoonPill />
                                    </div>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Pinned actions */}
          <div className="shrink-0 border-t border-line pb-4 pt-2">
            <a
              href={SIGN_IN_URL}
              className={`flex min-h-[44px] items-center rounded-md px-2 py-3 text-sm text-ink hover:bg-soft ${mobileRowFocus}`}
              onClick={() => closeMobile(false)}
            >
              Sign in
            </a>
            <Link
              href="/demo"
              className="mt-2 flex min-h-[44px] w-full items-center justify-center rounded-lg bg-ink px-5 py-3 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
              onClick={() => closeMobile(true)}
            >
              Book a Free Demo
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
