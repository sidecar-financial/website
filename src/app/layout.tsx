import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col antialiased">
        <Header />
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
