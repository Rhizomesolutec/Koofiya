import type { Metadata } from "next";
import { HoneyShop } from "@/components/dry-fruits/HoneyShop";
import { honeyProduct } from "@/lib/data/product";

export const metadata: Metadata = {
  title: "Honey — Koofiya Dry Fruits",
  description: honeyProduct.description,
  openGraph: {
    title: `${honeyProduct.tagline} | Koofiya Dry Fruits`,
    description: honeyProduct.description,
    images: [
      { url: honeyProduct.images[0].src, alt: honeyProduct.images[0].alt },
    ],
  },
};

export default function DryFruitsPage() {
  return <HoneyShop />;
}
