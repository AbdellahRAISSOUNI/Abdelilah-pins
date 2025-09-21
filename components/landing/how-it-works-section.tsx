import { Globe, Zap, CheckCircle } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Enter Your Sitemap",
    description: "Simply paste your website's sitemap URL and let our AI do the work",
    icon: Globe,
    visual: (
      <div className="relative">
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
            <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
            <div className="h-3 w-3 rounded-full bg-red-500"></div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="h-3 w-full rounded bg-gray-200"></div>
            <div className="h-3 w-3/4 rounded bg-primary/20"></div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            https://yoursite.com/sitemap.xml
          </div>
        </div>
      </div>
    ),
  },
  {
    number: "02",
    title: "AI Generates Posts",
    description: "Our AI analyzes your content and creates Pinterest-optimized posts with titles, descriptions, and images",
    icon: Zap,
    visual: (
      <div className="relative">
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-center space-x-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-primary"></div>
            <div className="h-2 w-2 animate-pulse rounded-full bg-primary delay-100"></div>
            <div className="h-2 w-2 animate-pulse rounded-full bg-primary delay-200"></div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="h-3 w-full rounded bg-primary/20"></div>
            <div className="h-3 w-5/6 rounded bg-primary/10"></div>
            <div className="h-3 w-4/5 rounded bg-primary/15"></div>
          </div>
          <div className="mt-4 text-sm text-primary font-medium">
            AI Processing Content...
          </div>
        </div>
      </div>
    ),
  },
  {
    number: "03",
    title: "Review & Schedule",
    description: "Review generated posts, make edits, and schedule them for maximum impact",
    icon: CheckCircle,
    visual: (
      <div className="relative">
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="grid grid-cols-2 gap-3">
            <div className="aspect-square rounded bg-gradient-to-br from-primary/20 to-primary/10"></div>
            <div className="aspect-square rounded bg-gradient-to-br from-primary/15 to-primary/5"></div>
            <div className="aspect-square rounded bg-gradient-to-br from-primary/10 to-primary/20"></div>
            <div className="aspect-square rounded bg-gradient-to-br from-primary/5 to-primary/15"></div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            Ready to Schedule ✓
          </div>
        </div>
      </div>
    ),
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-20 sm:py-32 bg-gray-50">
      <div className="container">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-20">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Get Pinterest-Ready Posts in{" "}
            <span className="text-primary">3 Simple Steps</span>
          </h2>
          <p className="mt-6 text-xl leading-8 text-gray-600">
            Transform your blog content into viral Pinterest posts in minutes, not hours.
          </p>
        </div>

        {/* Steps - Desktop Timeline */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute top-24 left-1/2 h-0.5 w-full -translate-x-1/2 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20"></div>
            
            <div className="grid grid-cols-3 gap-12">
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.number} className="relative">
                    {/* Step Number Circle */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white text-lg font-bold shadow-lg">
                        {step.number}
                      </div>
                    </div>

                    {/* Step Content */}
                    <div className="pt-12">
                      <div className="text-center mb-8">
                        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-6">
                          <Icon className="h-8 w-8" />
                        </div>
                        <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {step.description}
                        </p>
                      </div>

                      {/* Visual Mockup */}
                      <div className="flex justify-center">
                        {step.visual}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Steps - Mobile Vertical Layout */}
        <div className="lg:hidden space-y-16">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === steps.length - 1;
            
            return (
              <div key={step.number} className="relative">
                {/* Connecting Line */}
                {!isLast && (
                  <div className="absolute top-16 left-8 h-16 w-0.5 bg-gradient-to-b from-primary/40 to-primary/20"></div>
                )}

                <div className="flex items-start space-x-6">
                  {/* Step Number Circle */}
                  <div className="flex-shrink-0">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white text-lg font-bold shadow-lg">
                      {step.number}
                    </div>
                  </div>

                  {/* Step Content */}
                  <div className="flex-1">
                    <div className="mb-6">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    {/* Visual Mockup */}
                    <div className="max-w-xs">
                      {step.visual}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <div className="inline-flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
            <div className="flex items-center space-x-2 text-gray-600">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-sm font-medium">No coding required</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-sm font-medium">Works with any website</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-sm font-medium">Results in minutes</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
