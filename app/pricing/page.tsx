import { Metadata } from "next";
import { CTASection } from "@/components/landing/cta-section";

export const metadata: Metadata = {
  title: "Pricing - PinGenerator",
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

        {/* Pricing Cards Placeholder */}
        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Free Plan */}
            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
              <div className="text-center">
                <h3 className="text-2xl font-semibold text-gray-900">Free</h3>
                <p className="mt-4 text-sm text-gray-600">
                  Perfect for getting started
                </p>
                <div className="mt-6">
                  <span className="text-4xl font-bold text-gray-900">$0</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <ul className="mt-8 space-y-4 text-sm text-gray-600">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    10 posts per month
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Basic templates
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Standard support
                  </li>
                </ul>
                <button className="mt-8 w-full rounded-lg border border-primary text-primary py-3 font-medium transition-colors hover:bg-primary/5">
                  Get Started Free
                </button>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="rounded-2xl border-2 border-primary bg-white p-8 shadow-lg relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="rounded-full bg-primary px-4 py-1 text-sm font-medium text-white">
                  Most Popular
                </span>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-semibold text-gray-900">Pro</h3>
                <p className="mt-4 text-sm text-gray-600">
                  For growing businesses
                </p>
                <div className="mt-6">
                  <span className="text-4xl font-bold text-gray-900">$29</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <ul className="mt-8 space-y-4 text-sm text-gray-600">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    500 posts per month
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Premium templates
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Priority support
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Analytics dashboard
                  </li>
                </ul>
                <button className="mt-8 w-full rounded-lg bg-primary text-white py-3 font-medium transition-colors hover:bg-primary/90">
                  Start Pro Trial
                </button>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
              <div className="text-center">
                <h3 className="text-2xl font-semibold text-gray-900">Enterprise</h3>
                <p className="mt-4 text-sm text-gray-600">
                  For large organizations
                </p>
                <div className="mt-6">
                  <span className="text-4xl font-bold text-gray-900">$99</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <ul className="mt-8 space-y-4 text-sm text-gray-600">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Unlimited posts
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Custom templates
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Dedicated support
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    API access
                  </li>
                </ul>
                <button className="mt-8 w-full rounded-lg border border-primary text-primary py-3 font-medium transition-colors hover:bg-primary/5">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
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
