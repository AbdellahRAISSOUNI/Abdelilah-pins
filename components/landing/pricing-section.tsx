"use client";

import { useState } from "react";
import { Check } from "lucide-react";

type BillingPeriod = "monthly" | "yearly";

type Plan = {
  key: "free" | "starter" | "agency" | "enterprise";
  name: string;
  headline: string;
  popular?: boolean;
  prices: {
    monthly: string;
    yearly: string;
  };
  features: Array<{ label: string; value: string | boolean; accent?: string }>;
  cta: { label: string; variant: "primary" | "outline" };
};

const PLANS: Plan[] = [
  {
    key: "free",
    name: "Free",
    headline: "Perfect to get started",
    prices: { monthly: "Free", yearly: "Free" },
    features: [
      { label: "Pinterest Accounts", value: "1" },
      { label: "Websites", value: "1" },
      { label: "Pins per Month", value: "20" },
      { label: "Priority Support", value: false },
    ],
    cta: { label: "Get Started", variant: "outline" },
  },
  {
    key: "starter",
    name: "Starter",
    headline: "For creators who post often",
    prices: { monthly: "$7.99", yearly: "$70.99" },
    features: [
      { label: "Pinterest Accounts", value: "Unlimited" },
      { label: "Websites", value: "Unlimited" },
      { label: "Pins per Month", value: "250" },
      { label: "Priority Support", value: false },
    ],
    cta: { label: "Start Starter", variant: "primary" },
  },
  {
    key: "agency",
    name: "Agency",
    headline: "Our most popular plan",
    popular: true,
    prices: { monthly: "$29.99", yearly: "$299.90" },
    features: [
      { label: "Pinterest Accounts", value: "Unlimited" },
      { label: "Websites", value: "Unlimited" },
      { label: "Pins per Month", value: "2000" },
      { label: "Priority Support", value: true },
    ],
    cta: { label: "Choose Agency", variant: "primary" },
  },
  {
    key: "enterprise",
    name: "Enterprise",
    headline: "Scale without limits",
    prices: { monthly: "$99.99", yearly: "$999.90" },
    features: [
      { label: "Pinterest Accounts", value: "Unlimited" },
      { label: "Websites", value: "Unlimited" },
      { label: "Pins per Month", value: "20000" },
      { label: "Priority Support", value: true, accent: "Urgent" },
    ],
    cta: { label: "Get Enterprise", variant: "outline" },
  },
];

export function PricingSection() {
  const [billing, setBilling] = useState<BillingPeriod>("monthly");

  return (
    <section id="pricing" className="py-20 sm:py-32 bg-white">
      <div className="container">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-10 sm:mb-14">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Pricing made simple
          </h2>
          <p className="mt-6 text-lg sm:text-xl leading-8 text-gray-600">
            Flexible plans that grow with you. Switch or cancel anytime.
          </p>

          {/* Billing toggle */}
          <div className="mt-6 inline-flex items-center rounded-full border border-gray-200 bg-white p-1 text-sm shadow-sm">
            <button
              onClick={() => setBilling("monthly")}
              className={`px-4 py-2 rounded-full transition-colors ${
                billing === "monthly" ? "bg-primary text-white" : "text-gray-700 hover:text-gray-900"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling("yearly")}
              className={`px-4 py-2 rounded-full transition-colors ${
                billing === "yearly" ? "bg-primary text-white" : "text-gray-700 hover:text-gray-900"
              }`}
            >
              Yearly
            </button>
          </div>
        </div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4">
          {PLANS.map((plan) => (
            <div
              key={plan.key}
              className={`relative rounded-2xl border ${
                plan.popular ? "border-primary/50" : "border-gray-200"
              } bg-white p-6 sm:p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-medium text-white shadow-sm">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Header */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
                <p className="mt-1 text-sm text-gray-600">{plan.headline}</p>
                <div className="mt-6 flex items-end gap-1">
                  <span className={`text-4xl font-bold ${plan.popular ? "text-gray-900" : "text-gray-900"}`}>
                    {billing === "monthly" ? plan.prices.monthly : plan.prices.yearly}
                  </span>
                  <span className="mb-1 text-sm text-gray-500">
                    {billing === "monthly" ? "/month" : "/year"}
                  </span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3">
                {plan.features.map((f) => (
                  <li key={f.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`inline-flex h-6 w-6 items-center justify-center rounded-full ${
                        typeof f.value === "boolean" ? (f.value ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400") : "bg-primary/10 text-primary"
                      }`}>
                        {typeof f.value === "boolean" ? (
                          f.value ? <Check className="h-3.5 w-3.5" /> : <span className="text-xs">—</span>
                        ) : (
                          <span className="text-[10px] font-semibold">{String(f.value).replace("Unlimited", "∞")}</span>
                        )}
                      </div>
                      <span className="text-sm text-gray-700">{f.label}</span>
                    </div>
                    {f.accent && (
                      <span className="ml-2 inline-flex items-center rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                        {f.accent}
                      </span>
                    )}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="mt-8">
                <button
                  className={`w-full rounded-lg px-6 py-3 text-sm font-medium transition-all ${
                    plan.popular || plan.cta.variant === "primary"
                      ? "bg-primary text-white hover:bg-primary/90 shadow-sm"
                      : "border border-primary text-primary hover:bg-primary/5"
                  }`}
                >
                  {plan.cta.label}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footnote */}
        <p className="mt-8 text-center text-xs text-gray-500">
          Prices are in USD. Taxes may apply. You can change or cancel your plan at any time.
        </p>
      </div>
    </section>
  );
}

export default PricingSection;


