import Hero from "@/components/home/Hero";
import TrustBadges from "@/components/home/TrustBadges";
import Problem from "@/components/home/Problem";
import Features from "@/components/home/Features";
import Outcomes from "@/components/home/Outcomes";
import Testimonials from "@/components/home/Testimonials";
import WhyNavable from "@/components/home/WhyNavable";
import Validation from "@/components/home/Validation";
import FAQ from "@/components/home/FAQ";
import DemoForm from "@/components/home/DemoForm";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBadges />
      <Problem />
      <Features />
      <Outcomes />
      <Testimonials />
      <WhyNavable />
      <Validation />
      <FAQ />
      <DemoForm />
    </>
  );
}
