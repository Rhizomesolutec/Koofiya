import type { Metadata } from "next";
import { businesses } from "@/lib/data/businesses";
import { BusinessCard } from "@/components/businesses/BusinessCard";
import { Container } from "@/components/ui/Container";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Our Businesses",
  description:
    "Explore all Koofiya Group businesses — Holidays, Dry Fruits, CCTV Installation & Service, Job Hub and Home Maintenance.",
};

export default function BusinessesPage() {
  return (
    <section className="py-16 lg:py-24">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Businesses"
            title="Explore our ventures"
            description="Five focused businesses: Holidays, Dry Fruits, CCTV Installation & Service, Job Hub and Home Maintenance."
          />
        </Reveal>

        <Stagger className="mt-14 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
          {businesses.map((business, index) => (
            <StaggerItem key={business.slug}>
              <BusinessCard business={business} index={index} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
