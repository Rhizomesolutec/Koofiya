export const siteConfig = {
  name: "Koofiya Group",
  tagline: "One Group. Multiple Businesses. Endless Possibilities.",
  description:
    "Koofiya Group brings together diverse businesses, services and opportunities under one vision — creating meaningful value through innovation, commitment and growth.",
  /** Update annually when rolling into a new year (avoids prerender Date evaluation). */
  copyrightYear: 2026,
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://koofiya.group",
  contact: {
    email:
      process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "koofiyaholidays@gmail.com",
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "+91 94972 73333",
    /** Digits only with country code — used for WhatsApp click-to-chat */
    whatsappNumber:
      process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "919497273333",
    address: process.env.NEXT_PUBLIC_CONTACT_ADDRESS ?? "",
    emailPlaceholder: "[Add contact email]",
    phonePlaceholder: "[Add contact phone]",
    addressPlaceholder: "[Add registered address]",
  },
  social: {
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "",
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "",
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL ?? "",
    twitter: process.env.NEXT_PUBLIC_TWITTER_URL ?? "",
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Businesses", href: "/businesses" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export const visionMission = {
  intro:
    "Koofiya Group is a diversified business group operating across food, travel, recruitment, home services and real estate — each venture guided by a shared commitment to quality and meaningful growth.",
  vision:
    "To build a family of businesses that create lasting value for customers, partners and communities across India.",
  mission:
    "To develop focused, customer-centred ventures that deliver reliable products and services while opening new opportunities for people and enterprises.",
} as const;

export const whyKoofiya = [
  {
    title: "Diversified Business Approach",
    description:
      "Each venture operates with clear focus while sharing the group's standards for quality, clarity and long-term thinking.",
  },
  {
    title: "Customer-Focused Services",
    description:
      "From honey orders to travel planning and property enquiries, every touchpoint is designed around real customer needs.",
  },
  {
    title: "Commitment to Quality",
    description:
      "We prioritise careful presentation, honest communication and products or services that stand up to scrutiny.",
  },
  {
    title: "Growth Through Collaboration",
    description:
      "We believe durable businesses grow through trust — with customers, partners and the teams behind each venture.",
  },
] as const;
