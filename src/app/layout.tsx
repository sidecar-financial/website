import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnnouncementBanner, {
  BANNER_HTML_ATTR,
  BANNER_STORAGE_KEY,
} from "@/components/layout/AnnouncementBanner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// Small uppercase eyebrow / index labels (e.g. "SOFTWARE FOR PRIVATE FUNDS", "/01")
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-label",
});

export const metadata: Metadata = {
  title: "Navable | Carry Management Software for Private Funds",
  description:
    "One system for carry, commit, and compensation. Give Finance, Ops and HR teams a configurable platform to manage growing complexity with greater accuracy, control, and visibility.",
  keywords: [
    "carried interest",
    "carry management",
    "private equity",
    "venture capital",
    "real estate funds",
    "GP compensation",
    "co-invest",
    "fund administration",
  ],
  openGraph: {
    title: "Navable | Carry Management Software for Private Funds",
    description:
      "One system for carry, commit, and compensation. Give Finance, Ops and HR teams a configurable platform to manage growing complexity.",
    url: "https://navable.com",
    siteName: "Navable",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Navable | Carry Management Software for Private Funds",
    description:
      "One system for carry, commit, and compensation for alternative asset firms.",
  },
};

// Runs before first paint: if the visitor already dismissed the announcement, flag <html> so CSS
// hides the (server-rendered) banner immediately. Avoids a flash of the banner and a layout jump.
const bannerDismissedScript = `try{if(localStorage.getItem(${JSON.stringify(
  BANNER_STORAGE_KEY,
)})==="1")document.documentElement.setAttribute(${JSON.stringify(BANNER_HTML_ATTR)},"")}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col antialiased">
        <script dangerouslySetInnerHTML={{ __html: bannerDismissedScript }} />
        {/* Skip link stays the first focusable element, ahead of the announcement banner. */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-[60] focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-white focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2"
        >
          Skip to main content
        </a>
        {/* Banner is in normal flow (scrolls away); the header below is sticky, so no offsets to manage. */}
        <AnnouncementBanner />
        <Header />
        <main id="main-content" className="flex-1" tabIndex={-1}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
