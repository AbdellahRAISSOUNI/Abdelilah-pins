import { Metadata } from "next";
import { CTASection } from "@/components/landing/cta-section";

export const metadata: Metadata = {
  title: "About Us - PinSlayer",
  description: "Learn about PinSlayer's mission to help content creators and businesses grow their Pinterest presence with AI-powered tools.",
};

export default function AboutPage() {
  return (
    <div className="pt-20">
      <div className="container py-16">
        {/* Hero Section */}
        <div className="mx-auto max-w-3xl text-center mb-20">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            About <span className="text-primary">PinSlayer</span>
          </h1>
          <p className="mt-6 text-xl leading-8 text-gray-600">
            We&apos;re on a mission to help content creators and businesses 
            transform their blog content into viral Pinterest posts.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Pinterest is one of the most powerful platforms for driving traffic and sales, 
              but creating engaging posts manually is time-consuming and often ineffective.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              PinSlayer was born from the frustration of spending hours creating Pinterest 
              posts that didn&apos;t perform. We believe every piece of great content deserves 
              to reach its audience, and we&apos;re here to make that happen.
            </p>
            <p className="text-lg text-gray-600">
              Our AI-powered platform analyzes your content, understands what makes posts 
              go viral on Pinterest, and creates optimized posts that drive real results.
            </p>
          </div>
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
                <div className="text-sm text-gray-600">Posts Generated</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">500+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">95%</div>
                <div className="text-sm text-gray-600">Time Saved</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                <div className="text-sm text-gray-600">Support</div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Values
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Innovation
              </h3>
              <p className="text-gray-600">
                We constantly push the boundaries of what&apos;s possible with AI 
                and automation to deliver cutting-edge solutions.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Partnership
              </h3>
              <p className="text-gray-600">
                We work closely with our customers to understand their needs 
                and deliver solutions that drive real business results.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Results
              </h3>
              <p className="text-gray-600">
                Every feature we build is designed with one goal: helping our 
                customers achieve measurable success on Pinterest.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="text-center">
              <div className="w-24 h-24 bg-primary/10 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Coming Soon
              </h3>
              <p className="text-primary mb-2">Team Member</p>
              <p className="text-gray-600 text-sm">
                We&apos;re building an amazing team of passionate individuals 
                who share our vision for Pinterest marketing.
              </p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-primary/10 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Join Our Team
              </h3>
              <p className="text-primary mb-2">We&apos;re Hiring</p>
              <p className="text-gray-600 text-sm">
                Looking for talented individuals who want to revolutionize 
                how content creators approach Pinterest marketing.
              </p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-primary/10 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Remote First
              </h3>
              <p className="text-primary mb-2">Global Team</p>
              <p className="text-gray-600 text-sm">
                We believe great talent can come from anywhere. 
                Our distributed team spans multiple time zones.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gray-50 rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of creators who are already using PinSlayer 
            to grow their Pinterest presence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="rounded-lg bg-primary text-white px-8 py-3 font-medium transition-colors hover:bg-primary/90">
              Start Free Trial
            </button>
            <button className="rounded-lg border border-primary text-primary px-8 py-3 font-medium transition-colors hover:bg-primary/5">
              Contact Us
            </button>
          </div>
        </div>
      </div>

      <CTASection />
    </div>
  );
}
