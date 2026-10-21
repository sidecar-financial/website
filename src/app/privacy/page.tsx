import { Metadata } from "next";
import { Section } from "@/components/ui/Frame";
import { PageHero } from "@/components/ui/PageBlocks";

export const metadata: Metadata = {
  title: "Privacy Policy | Navable",
  description: "Navable's privacy policy describes how we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero id="legal-heading" title="Privacy Policy" description="Last updated: October 2026" />
      <Section label="Legal">
        <div className="px-6 py-12 lg:px-12 lg:py-[72px]">
          <div className="max-w-3xl text-[15px] leading-[25px]">
            <h2 className="text-2xl font-semibold leading-8 text-ink mt-10 mb-4 first:mt-0">Introduction</h2>
            <p className="text-body mb-4">
              Navable Inc. (&quot;Navable,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting 
              your privacy. This Privacy Policy explains how we collect, use, disclose, 
              and safeguard your information when you visit our website navable.com and 
              use our services.
            </p>

            <h2 className="text-2xl font-semibold leading-8 text-ink mt-10 mb-4 first:mt-0">Information We Collect</h2>
            <p className="text-body mb-4">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc pl-6 marker:text-orange text-body mb-4 space-y-2">
              <li>Contact information (name, email address, phone number)</li>
              <li>Company information (company name, role, industry)</li>
              <li>Account credentials</li>
              <li>Communications you send to us</li>
            </ul>

            <h2 className="text-2xl font-semibold leading-8 text-ink mt-10 mb-4 first:mt-0">How We Use Your Information</h2>
            <p className="text-body mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 marker:text-orange text-body mb-4 space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send promotional communications (with your consent)</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Monitor and analyze trends, usage, and activities</li>
            </ul>

            <h2 className="text-2xl font-semibold leading-8 text-ink mt-10 mb-4 first:mt-0">Data Security</h2>
            <p className="text-body mb-4">
              We implement appropriate technical and organizational measures to protect 
              the security of your personal information. However, no method of transmission 
              over the Internet or electronic storage is 100% secure.
            </p>

            <h2 className="text-2xl font-semibold leading-8 text-ink mt-10 mb-4 first:mt-0">Contact Us</h2>
            <p className="text-body mb-4">
              If you have questions about this Privacy Policy, please contact us at:
            </p>
            <p className="text-body mb-4">
              Navable Inc.<br />
              Email: privacy@navable.com<br />
              Phone: +1 (512) 270-0291
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
