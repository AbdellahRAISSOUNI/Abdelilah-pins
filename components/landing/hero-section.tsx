import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Sparkles, Users, Clock, TrendingUp } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-32 lg:py-40">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-white to-primary/3" />
        
        {/* Floating Elements */}
        <div className="absolute left-1/4 top-20 h-32 w-32 rounded-full bg-primary/10 blur-3xl animate-pulse" />
        <div className="absolute right-1/4 top-32 h-24 w-24 rounded-full bg-primary/20 blur-2xl animate-pulse delay-1000" />
        <div className="absolute bottom-20 left-1/3 h-20 w-20 rounded-full bg-primary/15 blur-2xl animate-pulse delay-2000" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
      </div>

      <div className="container">
        <div className="mx-auto max-w-5xl text-center">
          {/* Badge */}
          <div className="mb-8 flex justify-center">
            <div className="group relative inline-flex items-center rounded-full bg-primary/10 px-6 py-3 text-sm font-medium text-primary ring-1 ring-primary/20 transition-all hover:bg-primary/20 hover:ring-primary/30">
              <Sparkles className="mr-2 h-4 w-4 animate-pulse" />
              AI-Powered Pinterest Post Generator
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
            Transform Your Blog Content Into{" "}
            <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Viral Pinterest Posts
            </span>
          </h1>

          {/* Subheading */}
          <p className="mt-8 text-xl leading-8 text-gray-600 sm:text-2xl max-w-3xl mx-auto">
            Automatically generate Pinterest-ready posts from your website&apos;s articles. 
            Save hours of manual work and grow your Pinterest presence.
          </p>

          {/* CTA Buttons */}
          <div className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-4">
            <Button 
              size="lg" 
              className="group bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5" 
              asChild
            >
              <Link href="/signup">
                Generate Posts Now
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="group border-primary text-primary hover:bg-primary/10 px-8 py-4 text-lg font-semibold transition-all duration-300" 
              asChild
            >
              <Link href="/#how-it-works" className="flex items-center">
                <Play className="mr-2 h-5 w-5" />
                See How It Works
              </Link>
            </Button>
          </div>

          {/* Social Proof */}
          <div className="mt-20">
            <p className="text-sm font-medium text-gray-500 mb-8">
              Trusted by content creators and businesses worldwide
            </p>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 max-w-4xl mx-auto">
              <div className="group flex flex-col items-center p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-gray-100 hover:border-primary/20 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <div className="mt-4 text-3xl font-bold text-gray-900">10,000+</div>
                <div className="text-sm text-gray-600">Posts Generated</div>
              </div>
              
              <div className="group flex flex-col items-center p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-gray-100 hover:border-primary/20 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div className="mt-4 text-3xl font-bold text-gray-900">500+</div>
                <div className="text-sm text-gray-600">Happy Users</div>
              </div>
              
              <div className="group flex flex-col items-center p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-gray-100 hover:border-primary/20 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div className="mt-4 text-3xl font-bold text-gray-900">95%</div>
                <div className="text-sm text-gray-600">Time Saved</div>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span>Free forever plan</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
