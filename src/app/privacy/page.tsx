import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Navable",
  description: "Navable's privacy policy describes how we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        <p className="text-gray-500 mb-8">Last updated: October 2026</p>

        <div className="prose prose-gray max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Introduction</h2>
          <p className="text-gray-600 mb-4">
            Navable Inc. (&quot;Navable,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting 
            your privacy. This Privacy Policy explains how we collect, use, disclose, 
            and safeguard your information when you visit our website navable.com and 
            use our services.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Information We Collect</h2>
          <p className="text-gray-600 mb-4">
            We collect information that you provide directly to us, including:
          </p>
          <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
            <li>Contact information (name, email address, phone number)</li>
            <li>Company information (company name, role, industry)</li>
            <li>Account credentials</li>
            <li>Communications you send to us</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">How We Use Your Information</h2>
          <p className="text-gray-600 mb-4">
            We use the information we collect to:
          </p>
          <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
            <li>Provide, maintain, and improve our services</li>
            <li>Process transactions and send related information</li>
            <li>Send promotional communications (with your consent)</li>
            <li>Respond to your comments, questions, and requests</li>
            <li>Monitor and analyze trends, usage, and activities</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Data Security</h2>
          <p className="text-gray-600 mb-4">
            We implement appropriate technical and organizational measures to protect 
            the security of your personal information. However, no method of transmission 
            over the Internet or electronic storage is 100% secure.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Contact Us</h2>
          <p className="text-gray-600 mb-4">
            If you have questions about this Privacy Policy, please contact us at:
          </p>
          <p className="text-gray-600 mb-4">
            Navable Inc.<br />
            Email: privacy@navable.com<br />
            Phone: +1 (512) 270-0291
          </p>
        </div>
      </div>
    </div>
  );
}
