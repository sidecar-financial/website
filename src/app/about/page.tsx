import { Metadata } from "next";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About Us | Navable",
  description:
    "Navable provides cutting-edge technology tools and services for alternative asset managers to keep up with the changing investor landscape.",
};

const team = [
  {
    name: "Jen Anderson",
    role: "Co-Founder & CEO",
    bio: "Jen has over 20 years of experience in financial services. She started her career on trading floors at Morgan Stanley & Bank of America securities and then transitioned to Fintechs, leading product teams at industry leaders.",
  },
  {
    name: "Anna Enns",
    role: "COO",
    bio: "Anna is a Fintech executive with experience spanning over a decade in product development, strategy, operations, and compliance. She has exceptional ability to cultivate successful teams and products.",
  },
];

const advisors = [
  {
    name: "Ethan Kennedy",
    role: "Advisor",
    bio: "Ethan has more than two decades of experience in the financial services industry, a majority of which was focused on private equity co-investment and carried interest plan management.",
  },
  {
    name: "Josh Anbil",
    role: "Advisor",
    bio: "Josh is founder & CEO of Anbil Consulting, a compensation consulting firm focused exclusively on the real estate industry. Josh has 20+ years of experience and has completed over 1,200 compensation consulting projects.",
  },
  {
    name: "Michelle Brown",
    role: "Advisor",
    bio: "Michelle is CFO of Contrary Capital and has nearly 15 years of experience in financial services. After beginning her career at PwC, she has spent the better part of the last decade working to scale financial operations.",
  },
  {
    name: "Kristine Tech",
    role: "Advisor",
    bio: "With over 20 years of accounting experience Kristine brings a deep knowledge of Long-Term Incentives programs. She spent 12+ years with the Carlyle Group working on carried interest transactions.",
  },
  {
    name: "Leonard Speiser",
    role: "Advisor",
    bio: "Leonard founded Clover, currently serving over $230B in credit card processing a year, in addition to working at Intuit, eBay, Yahoo! and Credit Suisse First Boston.",
  },
  {
    name: "Ronnie Mongan",
    role: "Operating Advisor",
    bio: "With 20+ years in Fintech, Ronnie has extensive experience in product operations and customer success. She led teams within Fiserv and Clover focused on scaling operations and managing partnerships.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#f8f7ff] to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
              Empowering{" "}
              <span className="text-[#5046e5]">Alternative Asset Managers</span>
            </h1>
            <p className="mt-6 text-xl text-gray-600">
              Navable provides cutting-edge technology tools and services for 
              alternative asset managers to keep up with the changing investor landscape.
            </p>
          </div>
        </div>
      </section>

      {/* Who we are */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Who we are</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                We are an experienced team of professionals with deep expertise 
                spanning Wall Street and Silicon Valley. We are passionate about 
                providing solutions in the alternative asset space with the goal 
                of expanding investment opportunities and access for all different 
                categories of investors.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our seasoned team of financial services and technology professionals 
                brings world-class resources and capabilities to alternative asset 
                management LPs. We launched Navable as a purpose-built end-to-end 
                platform for carry, compensation, and GP commit management.
              </p>
            </div>
            <div className="bg-[#f8f7ff] rounded-2xl p-8">
              <div className="aspect-video bg-white rounded-lg flex items-center justify-center">
                <span className="text-gray-400">Team Image Placeholder</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founding Team */}
      <section className="py-20 bg-[#f8f7ff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Founding Team
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-2xl p-8 border border-gray-100"
              >
                <div className="w-20 h-20 rounded-full bg-[#e8e4ff] flex items-center justify-center text-[#5046e5] text-2xl font-bold mb-4">
                  {member.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                <p className="text-[#5046e5] font-medium mb-4">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advisors */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Our Advisors
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advisors.map((advisor) => (
              <div
                key={advisor.name}
                className="bg-[#f8f7ff] rounded-xl p-6 border border-[#e8e4ff]"
              >
                <div className="w-12 h-12 rounded-full bg-[#e8e4ff] flex items-center justify-center text-[#5046e5] font-bold mb-3">
                  {advisor.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <h3 className="text-lg font-bold text-gray-900">{advisor.name}</h3>
                <p className="text-[#5046e5] text-sm font-medium mb-3">{advisor.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{advisor.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join us */}
      <section className="py-20 bg-[#5046e5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Want to join us?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Navable is on a mission to streamline operations for alternative asset 
            managers and their investors. If you are interested in this space and 
            want to take your career to the next level, reach out!
          </p>
          <Button href="/careers" variant="secondary" size="lg">
            See our openings
          </Button>
        </div>
      </section>
    </div>
  );
}
