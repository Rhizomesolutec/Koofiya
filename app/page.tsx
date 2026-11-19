import type { Metadata } from "next";
import { AboutIntro } from "@/components/home/AboutIntro";
import { BusinessesGrid } from "@/components/home/BusinessesGrid";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { Hero } from "@/components/home/Hero";
import { WhyKoofiya } from "@/components/home/WhyKoofiya";

export const metadata: Metadata = {
  title: "Koofiya Group — Building Businesses. Creating Opportunities.",
  description:
    "Koofiya Group brings together diverse businesses across travel, food, CCTV, recruitment and home services.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutIntro />
      <BusinessesGrid />
      <WhyKoofiya />
      <ClosingCTA />
    </>
  );
}
