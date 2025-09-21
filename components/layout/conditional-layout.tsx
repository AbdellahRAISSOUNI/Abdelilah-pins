"use client";

import { usePathname } from "next/navigation";
import { Navigation } from "./navigation";
import { Footer } from "./footer";

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();
  const isDashboardRoute = pathname?.startsWith("/dashboard");

  if (isDashboardRoute) {
    // Dashboard routes don't need navigation and footer
    return <>{children}</>;
  }

  // Landing page routes get navigation and footer
  return (
    <div className="relative flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
