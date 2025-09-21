import Link from "next/link";
import { Pin, Twitter, Github, Mail, Linkedin, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="container py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
                <Pin className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold text-gray-900">PinGenerator</span>
            </Link>
            <p className="text-gray-600 max-w-md">
              Transform your blog content into viral Pinterest posts with our AI-powered platform. 
              Save hours of manual work and grow your Pinterest presence effortlessly.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://twitter.com/pingenerator"
                className="text-gray-400 transition-colors hover:text-primary"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="https://github.com/pingenerator"
                className="text-gray-400 transition-colors hover:text-primary"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href="https://linkedin.com/company/pingenerator"
                className="text-gray-400 transition-colors hover:text-primary"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                href="https://youtube.com/@pingenerator"
                className="text-gray-400 transition-colors hover:text-primary"
              >
                <Youtube className="h-5 w-5" />
              </Link>
              <Link
                href="mailto:hello@pingenerator.com"
                className="text-gray-400 transition-colors hover:text-primary"
              >
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Product</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/features"
                  className="text-gray-600 transition-colors hover:text-primary"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-gray-600 transition-colors hover:text-primary"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/templates"
                  className="text-gray-600 transition-colors hover:text-primary"
                >
                  Templates
                </Link>
              </li>
              <li>
                <Link
                  href="/api"
                  className="text-gray-600 transition-colors hover:text-primary"
                >
                  API
                </Link>
              </li>
              <li>
                <Link
                  href="/integrations"
                  className="text-gray-600 transition-colors hover:text-primary"
                >
                  Integrations
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Company</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 transition-colors hover:text-primary"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-600 transition-colors hover:text-primary"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-gray-600 transition-colors hover:text-primary"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 transition-colors hover:text-primary"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/press"
                  className="text-gray-600 transition-colors hover:text-primary"
                >
                  Press
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Resources</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/help"
                  className="text-gray-600 transition-colors hover:text-primary"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/docs"
                  className="text-gray-600 transition-colors hover:text-primary"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="/guides"
                  className="text-gray-600 transition-colors hover:text-primary"
                >
                  Guides
                </Link>
              </li>
              <li>
                <Link
                  href="/community"
                  className="text-gray-600 transition-colors hover:text-primary"
                >
                  Community
                </Link>
              </li>
              <li>
                <Link
                  href="/status"
                  className="text-gray-600 transition-colors hover:text-primary"
                >
                  Status
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold text-gray-900">Stay Updated</h3>
              <p className="text-sm text-gray-600 mt-1">
                Get the latest updates and Pinterest tips delivered to your inbox.
              </p>
            </div>
            <div className="flex w-full max-w-sm space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button className="rounded-lg bg-primary px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <p className="text-sm text-gray-600">
              © 2024 PinGenerator. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link
                href="/privacy"
                className="text-gray-600 transition-colors hover:text-primary"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-gray-600 transition-colors hover:text-primary"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookies"
                className="text-gray-600 transition-colors hover:text-primary"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}