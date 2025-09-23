import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConditionalLayout } from "@/components/layout/conditional-layout";
import { AuthProvider } from "@/hooks/use-auth";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "PinSlayer - AI-Powered Pinterest Post Generator",
  description: "Generate stunning Pinterest posts with AI-powered design tools. Choose from hundreds of templates and boost your Pinterest engagement.",
  keywords: ["Pinterest", "AI", "design", "social media", "posts", "templates"],
  authors: [{ name: "PinSlayer Team" }],
  creator: "PinSlayer",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pinslayer.com",
    title: "PinSlayer - AI-Powered Pinterest Post Generator",
    description: "Generate stunning Pinterest posts with AI-powered design tools.",
    siteName: "PinSlayer",
  },
  twitter: {
    card: "summary_large_image",
    title: "PinSlayer - AI-Powered Pinterest Post Generator",
    description: "Generate stunning Pinterest posts with AI-powered design tools.",
    creator: "@pinslayer",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} antialiased`}>
        <AuthProvider>
          <ConditionalLayout>{children}</ConditionalLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
