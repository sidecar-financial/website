import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import TrustBadges from "@/components/home/TrustBadges";
import Problem from "@/components/home/Problem";
import Features from "@/components/home/Features";
import Outcomes from "@/components/home/Outcomes";
import WhyNavable from "@/components/home/WhyNavable";
import Testimonials from "@/components/home/Testimonials";
import Validation from "@/components/home/Validation";
import DemoForm from "@/components/home/DemoForm";
import FAQ from "@/components/home/FAQ";
import { Gap } from "@/components/ui/Frame";

const title = "Navable | Carried Interest & GP Compensation Software for Private Markets";
const description =
  "Navable helps private equity, venture, and real asset firms manage carried interest, employee co-invest, and compensation in one audit-ready platform.";

export const metadata: Metadata = {
  title,
  description,
  // openGraph/twitter are replaced (not merged) per route, so restate them here.
  openGraph: { title, description, url: "https://navable.com", siteName: "Navable", type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBadges />
      <Problem />
      <Features />
      <Outcomes />
      <Gap />
      <WhyNavable />
      <Testimonials />
      <Validation />
      <Gap />
      <DemoForm />
      <Gap ruled />
      <FAQ />
    </>
  );
}
