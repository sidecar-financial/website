import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Navable",
  description: "Navable's terms of service govern your use of our website and services.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
        <p className="text-gray-500 mb-8">Last updated: October 2026</p>

        <div className="prose prose-gray max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Agreement to Terms</h2>
          <p className="text-gray-600 mb-4">
            By accessing or using the Navable website and services, you agree to be 
            bound by these Terms of Service and all applicable laws and regulations.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Use of Services</h2>
          <p className="text-gray-600 mb-4">
            You may use our services only for lawful purposes and in accordance with 
            these Terms. You agree not to use our services in any way that violates 
            applicable laws or regulations.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Intellectual Property</h2>
          <p className="text-gray-600 mb-4">
            The Navable website and its original content, features, and functionality 
            are owned by Navable Inc. and are protected by international copyright, 
            trademark, and other intellectual property laws.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Limitation of Liability</h2>
          <p className="text-gray-600 mb-4">
            Navable shall not be liable for any indirect, incidental, special, 
            consequential, or punitive damages resulting from your use of or 
            inability to use the services.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Contact Us</h2>
          <p className="text-gray-600 mb-4">
            If you have questions about these Terms, please contact us at:
          </p>
          <p className="text-gray-600 mb-4">
            Navable Inc.<br />
            Email: legal@navable.com<br />
            Phone: +1 (512) 270-0291
          </p>
        </div>
      </div>
    </div>
  );
}
