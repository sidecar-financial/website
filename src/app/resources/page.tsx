import { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Resource Hub | Navable",
  description:
    "Explore guides, whitepapers, and educational content about carried interest management and alternative asset operations.",
};

const resources = [
  {
    category: "Guide",
    title: "The Complete Guide to Carried Interest Management",
    description:
      "Everything you need to know about structuring, calculating, and administering carried interest for your fund.",
    href: "#",
  },
  {
    category: "Whitepaper",
    title: "Why Spreadsheets Fail for Carry Administration",
    description:
      "An analysis of common pitfalls and risks associated with managing carry in Excel, and how modern solutions address them.",
    href: "#",
  },
  {
    category: "Checklist",
    title: "Employee Co-Investment Program Checklist",
    description:
      "A comprehensive checklist for launching and managing an employee co-investment program at your firm.",
    href: "#",
  },
  {
    category: "Guide",
    title: "Understanding Waterfall Structures",
    description:
      "A deep dive into European, American, and hybrid waterfall arrangements, with examples and calculations.",
    href: "#",
  },
  {
    category: "Webinar",
    title: "Best Practices for LP Reporting",
    description:
      "Expert insights on creating clear, accurate, and timely reports for your limited partners.",
    href: "#",
  },
  {
    category: "Case Study",
    title: "How a $10B PE Firm Streamlined Operations",
    description:
      "Learn how a leading private equity firm reduced carry administration time by 80% with Navable.",
    href: "#",
  },
];

const categories = ["All", "Guide", "Whitepaper", "Checklist", "Webinar", "Case Study"];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#f8f7ff] to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-[#5046e5] font-semibold text-sm uppercase tracking-wide mb-4">
              Resource Hub
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Learn from{" "}
              <span className="text-[#5046e5]">Industry Experts</span>
            </h1>
            <p className="mt-6 text-xl text-gray-600">
              Explore our collection of guides, whitepapers, and educational
              content to enhance your understanding of carry management and
              alternative asset operations.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  category === "All"
                    ? "bg-[#5046e5] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.map((resource, index) => (
              <Link
                key={index}
                href={resource.href}
                className="group bg-white rounded-2xl border border-gray-100 hover:border-[#e8e4ff] hover:shadow-lg transition-all overflow-hidden"
              >
                <div className="aspect-video bg-[#f8f7ff] flex items-center justify-center">
                  <span className="text-gray-400">Resource Image</span>
                </div>
                <div className="p-6">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-[#e8e4ff] text-[#5046e5] mb-3">
                    {resource.category}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#5046e5] transition-colors mb-2">
                    {resource.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{resource.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-[#f8f7ff]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Stay Updated
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Get the latest insights on carry management and alternative asset
            operations delivered to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#5046e5] focus:border-transparent outline-none"
            />
            <Button type="submit">Subscribe</Button>
          </form>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#5046e5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to See Navable in Action?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Book a demo to learn how we can help streamline your carry and
            compensation management.
          </p>
          <Button href="/demo" variant="secondary" size="lg">
            Book a Free Demo
          </Button>
        </div>
      </section>
    </div>
  );
}
