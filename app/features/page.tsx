import { Metadata } from "next";
import { FeaturesSection } from "@/components/landing/features-section";
import { CTASection } from "@/components/landing/cta-section";

export const metadata: Metadata = {
  title: "Features - PinSlayer",
  description: "Discover all the powerful features that make PinSlayer the best Pinterest post generator for content creators and businesses.",
};

export default function FeaturesPage() {
  return (
    <div className="pt-20">
      <div className="container py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Powerful Features for{" "}
            <span className="text-primary">Pinterest Success</span>
          </h1>
          <p className="mt-6 text-xl leading-8 text-gray-600">
            Everything you need to transform your blog content into viral Pinterest posts 
            that drive traffic, engagement, and sales.
          </p>
        </div>
      </div>
      
      <FeaturesSection />
      <CTASection />
    </div>
  );
}
