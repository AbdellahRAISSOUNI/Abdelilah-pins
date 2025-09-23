import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="bg-gray-50 py-20 sm:py-32">
      <div className="container">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Ready to create stunning Pinterest posts?
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Join thousands of creators and businesses who are already using
            PinSlayer to boost their Pinterest engagement and drive more traffic to
            their content.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="group" asChild>
              <Link href="/signup">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </div>
          <p className="mt-6 text-sm text-gray-500">
            No credit card required • Free forever plan available • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
}
