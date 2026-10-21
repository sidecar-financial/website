import { Metadata } from "next";
import { Section } from "@/components/ui/Frame";
import { PageHero } from "@/components/ui/PageBlocks";

export const metadata: Metadata = {
  title: "Terms of Service | Navable",
  description: "Navable's terms of service govern your use of our website and services.",
};

export default function TermsPage() {
  return (
    <>
      <PageHero id="legal-heading" title="Terms of Service" description="Last updated: October 2026" />
      <Section label="Legal">
        <div className="px-6 py-12 lg:px-12 lg:py-[72px]">
          <div className="max-w-3xl text-[15px] leading-[25px]">
            <h2 className="text-2xl font-semibold leading-8 text-ink mt-10 mb-4 first:mt-0">Agreement to Terms</h2>
            <p className="text-body mb-4">
              By accessing or using the Navable website and services, you agree to be 
              bound by these Terms of Service and all applicable laws and regulations.
            </p>

            <h2 className="text-2xl font-semibold leading-8 text-ink mt-10 mb-4 first:mt-0">Use of Services</h2>
            <p className="text-body mb-4">
              You may use our services only for lawful purposes and in accordance with 
              these Terms. You agree not to use our services in any way that violates 
              applicable laws or regulations.
            </p>

            <h2 className="text-2xl font-semibold leading-8 text-ink mt-10 mb-4 first:mt-0">Intellectual Property</h2>
            <p className="text-body mb-4">
              The Navable website and its original content, features, and functionality 
              are owned by Navable Inc. and are protected by international copyright, 
              trademark, and other intellectual property laws.
            </p>

            <h2 className="text-2xl font-semibold leading-8 text-ink mt-10 mb-4 first:mt-0">Limitation of Liability</h2>
            <p className="text-body mb-4">
              Navable shall not be liable for any indirect, incidental, special, 
              consequential, or punitive damages resulting from your use of or 
              inability to use the services.
            </p>

            <h2 className="text-2xl font-semibold leading-8 text-ink mt-10 mb-4 first:mt-0">Contact Us</h2>
            <p className="text-body mb-4">
              If you have questions about these Terms, please contact us at:
            </p>
            <p className="text-body mb-4">
              Navable Inc.<br />
              Email: legal@navable.com<br />
              Phone: +1 (512) 270-0291
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
