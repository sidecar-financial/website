"use client";

import { ReactNode } from "react";
import Link from "next/link";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  ariaLabel?: string;
  /** For `href`s that leave the site: opens in a new tab with `rel="noopener noreferrer"`. */
  external?: boolean;
}

const Arrow = () => (
  <svg
    className="ml-1.5 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  className = "",
  type = "button",
  disabled = false,
  ariaLabel,
  external = false,
}: ButtonProps) {
  const baseStyles =
    "group inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 in-[.on-dark]:focus-visible:ring-white! in-[.on-dark]:focus-visible:ring-offset-navy!";

  const variants = {
    primary: "bg-orange text-ink hover:bg-orange-dark",
    secondary: "bg-white text-ink border border-line-strong hover:border-ink",
    outline: "bg-transparent border border-ink text-ink hover:bg-ink hover:text-white",
  };

  // Ensure minimum 44x44 touch targets
  const sizes = {
    sm: "px-4 py-2 text-sm min-h-[44px]",
    md: "px-6 py-3 text-[15px] min-h-[44px]",
    lg: "px-7 py-3.5 text-[15px] min-h-[52px]",
  };

  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed" : "";

  const styles = `${baseStyles} ${variants[variant]} ${sizes[size]} ${disabledStyles} ${className}`;

  if (href && external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={styles} aria-label={ariaLabel}>
        {children}
        {variant === "primary" && <Arrow />}
        <span className="sr-only"> (opens in new tab)</span>
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href} className={styles} aria-label={ariaLabel}>
        {children}
        {variant === "primary" && <Arrow />}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={styles}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
      {variant === "primary" && <Arrow />}
    </button>
  );
}
