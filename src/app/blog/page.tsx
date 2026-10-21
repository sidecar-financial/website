import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog | Navable",
  description: "Insights and articles about carry management, compensation, and GP operations for alternative asset firms.",
};

const articles = [
  {
    title: "How to Automate Carry and Allocation Management Without Losing Control",
    excerpt: "Automation isn't about removing humans from carry decisions. It's about removing carry decisions from spreadsheets.",
    date: "October 15, 2026",
    category: "Carry Management",
  },
  {
    title: "What Your Team Really Wants to Know About Their Carry",
    excerpt: "Carry is your most powerful retention tool. Unless nobody understands what they hold.",
    date: "October 10, 2026",
    category: "Employee Experience",
  },
  {
    title: "Designing Fair and Scalable Carry Plans for Private Capital Firms",
    excerpt: "Carry plans built for Fund I rarely survive Fund III. Here's how to design structures that scale with your firm.",
    date: "October 5, 2026",
    category: "Best Practices",
  },
  {
    title: "From Chaos to Clarity: How a Centralized Carry Engine Transforms Fund Operations",
    excerpt: "Why spreadsheet-driven carry breaks as firms scale, and what replaces it.",
    date: "September 28, 2026",
    category: "Operations",
  },
  {
    title: "2026 Compensation Planning for PE Firms: A Year-End Checklist",
    excerpt: "The decisions you make this December will shape your firm's retention, performance, and culture for the next twelve months.",
    date: "September 20, 2026",
    category: "Compensation",
  },
  {
    title: "Carried Interest: After the Waterfall",
    excerpt: "Explore the exponential growth of private equity, from its inception in 1946 to the explosive rise of over 19,000 funds by 2022.",
    date: "September 15, 2026",
    category: "Industry Insights",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#f8f7ff] to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
              Insights
            </h1>
            <p className="mt-6 text-xl text-gray-600">
              Expert perspectives on carry management, compensation, and 
              operations for alternative asset firms.
            </p>
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <article
                key={index}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-video bg-[#f8f7ff] flex items-center justify-center">
                  <span className="text-[#5046e5] font-semibold">{article.category}</span>
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-500 mb-3">{article.date}</p>
                  <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {article.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>
                  <Link
                    href="#"
                    className="text-[#5046e5] font-semibold hover:underline inline-flex items-center"
                  >
                    Read article
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
