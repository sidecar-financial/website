import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | Navable",
  description:
    "Learn how Navable uses cookies and similar technologies on our website.",
};

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Cookie Policy</h1>
        <p className="text-gray-500 mb-8">Last updated: October 2026</p>

        <div className="prose prose-gray max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            What Are Cookies
          </h2>
          <p className="text-gray-600 mb-4">
            Cookies are small text files that are stored on your computer or
            mobile device when you visit a website. They are widely used to make
            websites work more efficiently and to provide information to website
            owners.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            How We Use Cookies
          </h2>
          <p className="text-gray-600 mb-4">
            Navable uses cookies for a variety of purposes, including:
          </p>
          <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
            <li>
              <strong>Essential cookies:</strong> These are necessary for the
              website to function properly and cannot be switched off.
            </li>
            <li>
              <strong>Analytics cookies:</strong> These help us understand how
              visitors interact with our website by collecting and reporting
              information anonymously.
            </li>
            <li>
              <strong>Functional cookies:</strong> These enable enhanced
              functionality and personalization, such as remembering your
              preferences.
            </li>
            <li>
              <strong>Marketing cookies:</strong> These may be set by our
              advertising partners to build a profile of your interests and show
              you relevant ads on other sites.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Types of Cookies We Use
          </h2>

          <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">
            Strictly Necessary Cookies
          </h3>
          <p className="text-gray-600 mb-4">
            These cookies are essential for you to browse the website and use
            its features. Without these cookies, services like secure login
            cannot be provided.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">
            Performance Cookies
          </h3>
          <p className="text-gray-600 mb-4">
            These cookies collect information about how you use our website,
            such as which pages you visit most often. This data helps us improve
            how our website works.
          </p>

          <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">
            Functionality Cookies
          </h3>
          <p className="text-gray-600 mb-4">
            These cookies allow our website to remember choices you make (such
            as your language preference) and provide enhanced, more personal
            features.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Managing Cookies
          </h2>
          <p className="text-gray-600 mb-4">
            Most web browsers allow you to control cookies through their
            settings. You can set your browser to refuse cookies or delete
            certain cookies. However, if you block or delete cookies, some
            features of our website may not function properly.
          </p>
          <p className="text-gray-600 mb-4">
            Here are links to manage cookies in popular browsers:
          </p>
          <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
            <li>
              <a
                href="https://support.google.com/chrome/answer/95647"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#5046e5] hover:underline"
              >
                Google Chrome
              </a>
            </li>
            <li>
              <a
                href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#5046e5] hover:underline"
              >
                Mozilla Firefox
              </a>
            </li>
            <li>
              <a
                href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#5046e5] hover:underline"
              >
                Safari
              </a>
            </li>
            <li>
              <a
                href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#5046e5] hover:underline"
              >
                Microsoft Edge
              </a>
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Third-Party Cookies
          </h2>
          <p className="text-gray-600 mb-4">
            Some cookies on our website are set by third parties, such as
            analytics providers and advertising networks. These third parties
            may use cookies to collect information about your online activities
            across different websites.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Updates to This Policy
          </h2>
          <p className="text-gray-600 mb-4">
            We may update this Cookie Policy from time to time to reflect
            changes in our practices or for other operational, legal, or
            regulatory reasons. We encourage you to review this policy
            periodically.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Contact Us
          </h2>
          <p className="text-gray-600 mb-4">
            If you have any questions about our use of cookies, please contact
            us at:
          </p>
          <p className="text-gray-600 mb-4">
            Navable Inc.
            <br />
            Email: privacy@navable.com
            <br />
            Phone: +1 (512) 270-0291
          </p>
        </div>
      </div>
    </div>
  );
}
