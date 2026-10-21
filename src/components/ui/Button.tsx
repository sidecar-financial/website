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
}

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
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#5046e5] focus:ring-offset-2";

  const variants = {
    primary: "bg-[#5046e5] text-white hover:bg-[#3d36b8] shadow-sm",
    secondary: "bg-[#f8f7ff] text-[#5046e5] hover:bg-[#e8e4ff]",
    outline:
      "bg-transparent border-2 border-[#5046e5] text-[#5046e5] hover:bg-[#5046e5] hover:text-white",
  };

  // Ensure minimum 44x44 touch targets
  const sizes = {
    sm: "px-4 py-2 text-sm min-h-[44px]",
    md: "px-6 py-3 text-base min-h-[44px]",
    lg: "px-8 py-4 text-lg min-h-[48px]",
  };

  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed" : "";

  const styles = `${baseStyles} ${variants[variant]} ${sizes[size]} ${disabledStyles} ${className}`;

  if (href) {
    return (
      <Link href={href} className={styles} aria-label={ariaLabel}>
        {children}
        {variant === "primary" && (
          <svg
            className="ml-2 w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        )}
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
      {variant === "primary" && (
        <svg
          className="ml-2 w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      )}
    </button>
  );
}
