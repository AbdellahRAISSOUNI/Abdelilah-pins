export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PinterestPost {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  template: string;
  tags: string[];
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Template {
  id: string;
  name: string;
  category: string;
  previewUrl: string;
  isPremium: boolean;
}

export interface Brand {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  logoUrl?: string;
  fonts: string[];
  userId: string;
}

export type NavigationItem = {
  title: string;
  href: string;
};

export type Feature = {
  title: string;
  description: string;
  icon: string;
};

export type PricingTier = {
  name: string;
  price: number;
  period: "month" | "year";
  features: string[];
  isPopular?: boolean;
  cta: string;
};
