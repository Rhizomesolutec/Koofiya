export type BusinessSlug =
  | "dry-fruits"
  | "holidays"
  | "job-hub"
  | "home-maintenance"
  | "real-estate";

export type Business = {
  slug: BusinessSlug;
  name: string;
  shortName: string;
  industry: string;
  market: string;
  summary: string;
  description: string;
  heroHeadline: string;
  heroDescription: string;
  image: string;
  imageAlt: string;
  gallery: { src: string; alt: string }[];
  offerings: { title: string; description: string }[];
  whyChoose: { title: string; description: string }[];
  ctaLabel: string;
  ctaHref: string;
  shopHref?: string;
};

export const businesses: Business[] = [
  {
    slug: "dry-fruits",
    name: "Koofiya Dry Fruits",
    shortName: "Dry Fruits",
    industry: "Food & E-commerce",
    market: "India",
    summary:
      "Premium honey, carefully presented for everyday enjoyment — order directly via WhatsApp.",
    description:
      "Koofiya Dry Fruits currently focuses on honey — a single, thoughtfully presented product experience designed for customers who value quality and straightforward ordering.",
    heroHeadline: "Nature's goodness, delivered with care.",
    heroDescription:
      "Explore our honey offering and place orders through a simple WhatsApp flow — no complicated checkout, just clear product details and direct confirmation.",
    image: "/images/honey-card-v4.jpg",
    imageAlt: "Natural honey jar with wooden dipper — Koofiya Dry Fruits",
    gallery: [
      {
        src: "/images/honey-jar-clean-bg.jpg",
        alt: "Koofiya branded honey jar",
      },
      {
        src: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=1200&q=80",
        alt: "Honey jar with honeycomb texture",
      },
      {
        src: "https://images.unsplash.com/photo-1471943311424-646960669fbc?auto=format&fit=crop&w=1200&q=80",
        alt: "Honey on a rustic wooden surface",
      },
    ],
    offerings: [
      {
        title: "Premium Honey",
        description:
          "A dedicated honey product experience with clear details and configurable variants as they become available.",
      },
      {
        title: "WhatsApp Ordering",
        description:
          "Select quantity, share delivery details and send a formatted order message directly on WhatsApp.",
      },
      {
        title: "India Delivery Enquiries",
        description:
          "Delivery availability and charges are confirmed by the Koofiya team after your WhatsApp order message.",
      },
    ],
    whyChoose: [
      {
        title: "Focused product offering",
        description:
          "We currently sell honey only — so the experience stays clear, premium and easy to navigate.",
      },
      {
        title: "Direct communication",
        description:
          "Orders go straight to the business on WhatsApp, with confirmation before fulfilment.",
      },
    ],
    ctaLabel: "Shop Honey",
    ctaHref: "/dry-fruits",
    shopHref: "/dry-fruits",
  },
  {
    slug: "holidays",
    name: "Koofiya Holidays",
    shortName: "Holidays",
    industry: "Travel & Tourism",
    market: "India",
    summary:
      "Travel experiences, holiday planning and vehicle booking — Armenia Coach, buses and coaches via WhatsApp.",
    description:
      "Koofiya Holidays helps travellers explore destinations and plan journeys — including coach and bus bookings such as Armenia Coach and other group vehicles, confirmed directly on WhatsApp.",
    heroHeadline: "Journeys shaped around you.",
    heroDescription:
      "Discover destinations, plan holidays and book coaches or buses for your group. Select a vehicle and send your booking request on WhatsApp.",
    image: "/images/businesses/holidays-v5.jpg",
    imageAlt: "Koofiya Holidays travel van tour in the mountains",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
        alt: "Tropical coastline destination",
      },
      {
        src: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80",
        alt: "Lake and mountain travel scenery",
      },
      {
        src: "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&w=1200&q=80",
        alt: "Travel planning and journey moments",
      },
    ],
    offerings: [
      {
        title: "Vehicle booking",
        description:
          "Book Armenia Coach, luxury coaches, AC buses, mini buses and tempo travellers for your trip.",
      },
      {
        title: "Travel Experiences",
        description:
          "Curated ideas for leisure travel, short getaways and longer holidays based on your interests.",
      },
      {
        title: "Holiday Planning",
        description:
          "Help structuring itineraries and clarifying next steps before you book or travel.",
      },
      {
        title: "WhatsApp confirmation",
        description:
          "Send a booking request with trip details — availability and final rates are confirmed by the team.",
      },
    ],
    whyChoose: [
      {
        title: "Coaches & buses ready to enquire",
        description:
          "From Armenia Coach to mini buses and travellers — choose a vehicle and request a booking quickly.",
      },
      {
        title: "Direct WhatsApp booking",
        description:
          "No complicated checkout. Share pickup, destination and dates, then confirm with Koofiya Holidays.",
      },
    ],
    ctaLabel: "Book a Vehicle",
    ctaHref: "/businesses/holidays#vehicle-booking",
  },
  {
    slug: "job-hub",
    name: "Koofiya Job Hub",
    shortName: "Job Hub",
    industry: "Recruitment & Employment",
    market: "India",
    summary:
      "Connecting candidates and employers through recruitment support and career opportunity enquiries.",
    description:
      "Koofiya Job Hub supports job seekers and employers with recruitment-focused services — helping people explore opportunities and organisations find suitable candidates.",
    heroHeadline: "Careers connected with care.",
    heroDescription:
      "Whether you are exploring your next role or hiring for your team, Job Hub provides a clear path to start the conversation.",
    image: "/images/businesses/job-hub-v5.jpg",
    imageAlt: "Recruitment meeting between candidate and employer — Koofiya Job Hub",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
        alt: "Candidate reviewing career documents",
      },
      {
        src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80",
        alt: "Professional interview conversation",
      },
      {
        src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
        alt: "Team collaborating on hiring goals",
      },
    ],
    offerings: [
      {
        title: "Job Seeker Support",
        description:
          "Guidance for candidates exploring roles and sharing profiles for relevant opportunities.",
      },
      {
        title: "Employer Recruitment",
        description:
          "Support for organisations looking to connect with suitable candidates for open positions.",
      },
      {
        title: "Career Opportunities",
        description:
          "A growing space for listing and discovering roles — details shared as openings become available.",
      },
      {
        title: "Candidate Enquiries",
        description:
          "Submit an enquiry to begin a conversation about roles, hiring needs or recruitment support.",
      },
    ],
    whyChoose: [
      {
        title: "Two-sided focus",
        description:
          "Built to serve both candidates seeking roles and employers seeking people.",
      },
      {
        title: "Practical first steps",
        description:
          "Start with a clear enquiry — no unnecessary process before the conversation begins.",
      },
    ],
    ctaLabel: "Start a Career Enquiry",
    ctaHref: "/contact?business=job-hub",
  },
  {
    slug: "home-maintenance",
    name: "Koofiya Home Maintenance",
    shortName: "Home Maintenance",
    industry: "Home Services",
    market: "India",
    summary:
      "Home maintenance, repairs and property care support for households that value reliability.",
    description:
      "Koofiya Home Maintenance provides practical support for property care — from routine maintenance to repair-focused service requests.",
    heroHeadline: "Care for the places you live.",
    heroDescription:
      "Request maintenance support, explore service categories and start a service enquiry for your home or property.",
    image: "/images/businesses/home-maintenance-v5.jpg",
    imageAlt: "Koofiya technician installing a home security camera",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
        alt: "Bright living space reflecting property care",
      },
      {
        src: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=1200&q=80",
        alt: "Home maintenance tools ready for service",
      },
      {
        src: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80",
        alt: "Clean home interior after care service",
      },
    ],
    offerings: [
      {
        title: "Home Maintenance",
        description:
          "Support for ongoing upkeep that helps keep living spaces in good condition.",
      },
      {
        title: "Repairs",
        description:
          "Service requests for common repair needs — details confirmed after your enquiry.",
      },
      {
        title: "Property Care",
        description:
          "Practical assistance oriented around care, cleanliness and functional living spaces.",
      },
      {
        title: "Service Request Enquiry",
        description:
          "Tell us what you need and where you are — the team will follow up to confirm availability.",
      },
    ],
    whyChoose: [
      {
        title: "Practical and responsive",
        description:
          "Service conversations start with what needs doing and when you need support.",
      },
      {
        title: "Home-first thinking",
        description:
          "Every enquiry is treated as a real household need — not a generic ticket.",
      },
    ],
    ctaLabel: "Request a Service",
    ctaHref: "/contact?business=home-maintenance",
  },
  {
    slug: "real-estate",
    name: "Koofiya Real Estate",
    shortName: "Real Estate",
    industry: "Real Estate",
    market: "India",
    summary:
      "Property showcase, categories and enquiry support for people exploring homes and spaces.",
    description:
      "Koofiya Real Estate helps people explore property options and submit enquiries — with sample listings marked clearly as demo until live inventory is published.",
    heroHeadline: "Spaces worth discovering.",
    heroDescription:
      "Browse property categories, review demo listings and share an enquiry when you are ready to explore further.",
    image: "/images/businesses/real-estate.jpg",
    imageAlt: "Premium contemporary home exterior for real estate",
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        alt: "Bright residential living space",
      },
      {
        src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
        alt: "Luxury property with pool view",
      },
      {
        src: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
        alt: "Modern residential building exterior",
      },
    ],
    offerings: [
      {
        title: "Property Showcase",
        description:
          "A visual space to present properties as listings become available from the team.",
      },
      {
        title: "Property Categories",
        description:
          "Residential and related property types organised for easier browsing.",
      },
      {
        title: "Property Enquiry",
        description:
          "Share interest in a property type or location and receive follow-up from the team.",
      },
      {
        title: "Featured Listings (Demo)",
        description:
          "Sample properties below are for layout demonstration only until real listings are provided.",
      },
    ],
    whyChoose: [
      {
        title: "Transparent presentation",
        description:
          "Demo content is clearly marked — real listings will replace samples when ready.",
      },
      {
        title: "Simple enquiry path",
        description:
          "Tell us what you are looking for without navigating an overcomplicated property portal.",
      },
    ],
    ctaLabel: "Enquire About Property",
    ctaHref: "/contact?business=real-estate",
  },
];

/** Demo listings only — replace with real inventory when available */
export const demoProperties = [
  {
    id: "demo-1",
    title: "Sample Residence — Coastal View",
    category: "Residential",
    location: "[Location placeholder]",
    size: "[Area placeholder]",
    status: "Demo listing",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    note: "Demo content — not an actual listing.",
  },
  {
    id: "demo-2",
    title: "Sample Apartment — City Living",
    category: "Apartment",
    location: "[Location placeholder]",
    size: "[Area placeholder]",
    status: "Demo listing",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
    note: "Demo content — not an actual listing.",
  },
  {
    id: "demo-3",
    title: "Sample Villa — Garden Setting",
    category: "Villa",
    location: "[Location placeholder]",
    size: "[Area placeholder]",
    status: "Demo listing",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
    note: "Demo content — not an actual listing.",
  },
] as const;

export function getBusinessBySlug(slug: string): Business | undefined {
  return businesses.find((b) => b.slug === slug);
}

export function getAllBusinessSlugs(): BusinessSlug[] {
  return businesses.map((b) => b.slug);
}
