import {
  Brain,
  Image,
  Target,
  Layers,
  Calendar,
  BarChart3,
} from "lucide-react";

const features = [
  {
    title: "Automatic Content Analysis",
    description: "AI analyzes your articles and extracts the most engaging content",
    icon: Brain,
  },
  {
    title: "Pinterest-Optimized Images",
    description: "Generate beautiful, Pinterest-ready graphics for every post",
    icon: Image,
  },
  {
    title: "SEO-Friendly Titles",
    description: "Create compelling titles that drive clicks and engagement",
    icon: Target,
  },
  {
    title: "Bulk Generation",
    description: "Process entire sitemaps and generate hundreds of posts at once",
    icon: Layers,
  },
  {
    title: "Schedule & Edit",
    description: "Customize content and schedule posts for optimal timing",
    icon: Calendar,
  },
  {
    title: "Analytics Ready",
    description: "Track performance and optimize your Pinterest strategy",
    icon: BarChart3,
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 sm:py-32">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Everything You Need to{" "}
            <span className="text-primary">Dominate Pinterest</span>
          </h2>
          <p className="mt-6 text-xl leading-8 text-gray-600">
            Our AI-powered platform transforms your blog content into viral Pinterest posts 
            that drive traffic, engagement, and sales.
          </p>
        </div>

        <div className="mx-auto mt-20 max-w-7xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="group relative rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-primary/20 hover:-translate-y-1"
                >
                  <div className="mb-6">
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:scale-110">
                      <Icon className="h-7 w-7" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Additional feature highlight */}
        <div className="mt-20">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-primary/90 p-8 sm:p-12">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"></div>
            <div className="relative">
              <div className="mx-auto max-w-3xl text-center">
                <h3 className="text-3xl font-bold text-white sm:text-4xl">
                  Ready to transform your Pinterest strategy?
                </h3>
                <p className="mt-6 text-lg text-white/90">
                  Join thousands of creators who are already using PinGen to
                  create stunning Pinterest posts that drive traffic and sales.
                </p>
                <div className="mt-8">
                  <button className="rounded-lg bg-white px-8 py-4 text-lg font-semibold text-primary shadow-lg transition-all duration-300 hover:bg-primary/5 hover:shadow-xl hover:-translate-y-0.5">
                    Start Creating Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
