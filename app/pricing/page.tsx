import { Metadata } from "next";
import { CTASection } from "@/components/landing/cta-section";
import { PricingSection } from "@/components/landing/pricing-section";

export const metadata: Metadata = {
  title: "Pricing - PinSlayer",
  description: "Choose the perfect plan for your Pinterest marketing needs. Start free and scale as you grow.",
};

export default function PricingPage() {
  return (
    <div className="pt-20">
      <div className="container py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Simple, Transparent{" "}
            <span className="text-primary">Pricing</span>
          </h1>
          <p className="mt-6 text-xl leading-8 text-gray-600">
            Choose the perfect plan for your Pinterest marketing needs. 
            Start free and scale as you grow.
          </p>
        </div>

        <div className="mt-20">
          <PricingSection />
        </div>

        {/* FAQ Placeholder */}
        <div className="mt-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Can I change plans anytime?
                </h3>
                <p className="text-gray-600">
                  Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Is there a free trial?
                </h3>
                <p className="text-gray-600">
                  Yes, all paid plans come with a 14-day free trial. No credit card required.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  What payment methods do you accept?
                </h3>
                <p className="text-gray-600">
                  We accept all major credit cards, PayPal, and bank transfers for enterprise plans.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CTASection />
    </div>
  );
}
