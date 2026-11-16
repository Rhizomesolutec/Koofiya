/**
 * Honey product configuration for Koofiya Dry Fruits.
 * Demo prices/weights are for website preview — confirm on WhatsApp before fulfilment.
 */

export type ProductVariant = {
  id: string;
  label: string;
  weightLabel: string;
  /** Price in INR. null = show placeholder */
  priceInr: number | null;
  available: boolean;
};

export type HoneyProduct = {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  longDescription: string;
  images: { src: string; alt: string }[];
  available: boolean;
  availabilityLabel: string;
  currency: "INR";
  market: "India";
  /** Demo catalogue — replace when final pricing is confirmed */
  isDemoPricing: boolean;
  variants: ProductVariant[];
  whatsappNumber: string;
  deliveryNote: string;
  confirmationNote: string;
};

export const honeyProduct: HoneyProduct = {
  id: "honey-001",
  name: "Koofiya Honey",
  slug: "honey",
  tagline: "Nature's Golden Goodness.",
  description:
    "Pure, carefully packed honey from Koofiya Dry Fruits. Choose your pack size and order directly on WhatsApp.",
  longDescription:
    "Our honey is presented for everyday use — select a pack size, set your quantity, and share delivery details. Orders are reviewed and confirmed by the Koofiya team on WhatsApp before packing and dispatch.",
  images: [
    {
      src: "/images/honey-card-v4.jpg",
      alt: "Natural honey jar with wooden dipper",
    },
    {
      src: "/images/honey-jar-clean-bg.jpg",
      alt: "Koofiya branded honey jar on cream background",
    },
    {
      src: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=1400&q=80",
      alt: "Glass jar of honey with honeycomb",
    },
  ],
  available: true,
  availabilityLabel: "In stock · India delivery via WhatsApp confirmation",
  currency: "INR",
  market: "India",
  isDemoPricing: true,
  variants: [
    {
      id: "honey-250g",
      label: "Honey",
      weightLabel: "250 g",
      priceInr: 249,
      available: true,
    },
    {
      id: "honey-500g",
      label: "Honey",
      weightLabel: "500 g",
      priceInr: 449,
      available: true,
    },
    {
      id: "honey-1kg",
      label: "Honey",
      weightLabel: "1 kg",
      priceInr: 799,
      available: true,
    },
  ],
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "919497273333",
  deliveryNote:
    "Delivery across India is arranged after WhatsApp confirmation. Charges (if any) are shared by the team before dispatch.",
  confirmationNote:
    "Opening WhatsApp does not confirm an order. Your order is confirmed only after the Koofiya team responds.",
};

export function formatInr(amount: number | null): string {
  if (amount === null) return "Price on request";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function lineTotalInr(
  unitPrice: number | null,
  quantity: number,
): number | null {
  if (unitPrice === null) return null;
  return unitPrice * quantity;
}
