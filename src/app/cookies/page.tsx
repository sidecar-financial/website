import { Metadata } from "next";
import { Section } from "@/components/ui/Frame";
import { PageHero } from "@/components/ui/PageBlocks";

export const metadata: Metadata = {
  title: "Cookie Policy | Navable",
  description:
    "Learn how Navable uses cookies and similar technologies on our website.",
};

export default function CookiesPage() {
  return (
    <>
      <PageHero id="legal-heading" title="Cookie Policy" description="Last updated: October 2026" />
      <Section label="Legal">
        <div className="px-6 py-12 lg:px-12 lg:py-[72px]">
          <div className="max-w-3xl text-[15px] leading-[25px]">
            <h2 className="text-2xl font-semibold leading-8 text-ink mt-10 mb-4 first:mt-0">
              What Are Cookies
            </h2>
            <p className="text-body mb-4">
              Cookies are small text files that are stored on your computer or
              mobile device when you visit a website. They are widely used to make
              websites work more efficiently and to provide information to website
              owners.
            </p>

            <h2 className="text-2xl font-semibold leading-8 text-ink mt-10 mb-4 first:mt-0">
              How We Use Cookies
            </h2>
            <p className="text-body mb-4">
              Navable uses cookies for a variety of purposes, including:
            </p>
            <ul className="list-disc pl-6 marker:text-orange text-body mb-4 space-y-2">
              <li>
                <strong className="font-semibold text-ink">Essential cookies:</strong> These are necessary for the
                website to function properly and cannot be switched off.
              </li>
              <li>
                <strong className="font-semibold text-ink">Analytics cookies:</strong> These help us understand how
                visitors interact with our website by collecting and reporting
                information anonymously.
              </li>
              <li>
                <strong className="font-semibold text-ink">Functional cookies:</strong> These enable enhanced
                functionality and personalization, such as remembering your
                preferences.
              </li>
              <li>
                <strong className="font-semibold text-ink">Marketing cookies:</strong> These may be set by our
                advertising partners to build a profile of your interests and show
                you relevant ads on other sites.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold leading-8 text-ink mt-10 mb-4 first:mt-0">
              Types of Cookies We Use
            </h2>

            <h3 className="text-xl font-semibold leading-7 text-ink mt-6 mb-3">
              Strictly Necessary Cookies
            </h3>
            <p className="text-body mb-4">
              These cookies are essential for you to browse the website and use
              its features. Without these cookies, services like secure login
              cannot be provided.
            </p>

            <h3 className="text-xl font-semibold leading-7 text-ink mt-6 mb-3">
              Performance Cookies
            </h3>
            <p className="text-body mb-4">
              These cookies collect information about how you use our website,
              such as which pages you visit most often. This data helps us improve
              how our website works.
            </p>

            <h3 className="text-xl font-semibold leading-7 text-ink mt-6 mb-3">
              Functionality Cookies
            </h3>
            <p className="text-body mb-4">
              These cookies allow our website to remember choices you make (such
              as your language preference) and provide enhanced, more personal
              features.
            </p>

            <h2 className="text-2xl font-semibold leading-8 text-ink mt-10 mb-4 first:mt-0">
              Managing Cookies
            </h2>
            <p className="text-body mb-4">
              Most web browsers allow you to control cookies through their
              settings. You can set your browser to refuse cookies or delete
              certain cookies. However, if you block or delete cookies, some
              features of our website may not function properly.
            </p>
            <p className="text-body mb-4">
              Here are links to manage cookies in popular browsers:
            </p>
            <ul className="list-disc pl-6 marker:text-orange text-body mb-4 space-y-2">
              <li>
                <a
                  href="https://support.google.com/chrome/answer/95647"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-ink underline decoration-orange decoration-2 underline-offset-[3px] transition-all hover:decoration-4"
                >
                  Google Chrome
                </a>
              </li>
              <li>
                <a
                  href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-ink underline decoration-orange decoration-2 underline-offset-[3px] transition-all hover:decoration-4"
                >
                  Mozilla Firefox
                </a>
              </li>
              <li>
                <a
                  href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-ink underline decoration-orange decoration-2 underline-offset-[3px] transition-all hover:decoration-4"
                >
                  Safari
                </a>
              </li>
              <li>
                <a
                  href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-ink underline decoration-orange decoration-2 underline-offset-[3px] transition-all hover:decoration-4"
                >
                  Microsoft Edge
                </a>
              </li>
            </ul>

            <h2 className="text-2xl font-semibold leading-8 text-ink mt-10 mb-4 first:mt-0">
              Third-Party Cookies
            </h2>
            <p className="text-body mb-4">
              Some cookies on our website are set by third parties, such as
              analytics providers and advertising networks. These third parties
              may use cookies to collect information about your online activities
              across different websites.
            </p>

            <h2 className="text-2xl font-semibold leading-8 text-ink mt-10 mb-4 first:mt-0">
              Updates to This Policy
            </h2>
            <p className="text-body mb-4">
              We may update this Cookie Policy from time to time to reflect
              changes in our practices or for other operational, legal, or
              regulatory reasons. We encourage you to review this policy
              periodically.
            </p>

            <h2 className="text-2xl font-semibold leading-8 text-ink mt-10 mb-4 first:mt-0">
              Contact Us
            </h2>
            <p className="text-body mb-4">
              If you have any questions about our use of cookies, please contact
              us at:
            </p>
            <p className="text-body mb-4">
              Navable Inc.
              <br />
              Email: privacy@navable.com
              <br />
              Phone: +1 (512) 270-0291
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
