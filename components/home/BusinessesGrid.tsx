import { businesses } from "@/lib/data/businesses";
import { BusinessCard } from "@/components/businesses/BusinessCard";
import { Container } from "@/components/ui/Container";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function BusinessesGrid() {
  return (
    <section className="bg-background-soft py-16 lg:py-24">
      <Container>
        <Reveal variant="heading">
          <SectionHeading
            eyebrow="Our Businesses"
            title="Five ventures. One standard of care."
            description="Explore the businesses under Koofiya Group — each with its own focus, connected by a shared commitment to quality and clarity."
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
