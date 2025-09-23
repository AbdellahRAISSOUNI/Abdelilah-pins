export const SITE_CONFIG = {
  name: "PinSlayer",
  description: "Generate stunning Pinterest posts with AI-powered design tools",
  url: "https://pinslayer.com",
  ogImage: "/og-image.jpg",
  links: {
    twitter: "https://twitter.com/pinslayer",
    github: "https://github.com/pinslayer",
  },
} as const;

export const NAVIGATION_ITEMS = [
  {
    title: "Features",
    href: "/#features",
  },
  {
    title: "Pricing",
    href: "/#pricing",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Contact",
    href: "/contact",
  },
] as const;

export const FEATURES = [
  {
    title: "AI-Powered Design",
    description: "Create stunning Pinterest posts with our advanced AI design engine that understands your brand and content.",
    icon: "sparkles",
  },
  {
    title: "Templates Library",
    description: "Choose from hundreds of professionally designed templates for every niche and occasion.",
    icon: "layout",
  },
  {
    title: "Brand Consistency",
    description: "Maintain consistent branding across all your Pinterest posts with custom color palettes and fonts.",
    icon: "palette",
  },
  {
    title: "Bulk Generation",
    description: "Generate multiple posts at once to maintain a consistent posting schedule on Pinterest.",
    icon: "layers",
  },
  {
    title: "Analytics & Insights",
    description: "Track performance and get insights to optimize your Pinterest strategy.",
    icon: "bar-chart",
  },
  {
    title: "Easy Export",
    description: "Download your posts in high quality or publish directly to Pinterest with one click.",
    icon: "download",
  },
] as const;

export const COLORS = {
  primary: {
    50: "#fef2f2",
    100: "#fee2e2",
    200: "#fecaca",
    300: "#fca5a5",
    400: "#f87171",
    500: "#ef4444",
    600: "#dc2626",
    700: "#b91c1c",
    800: "#991b1b",
    900: "#7f1d1d",
  },
} as const;
