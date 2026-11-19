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
            description="Holidays, Dry Fruits, CCTV Installation & Service, Job Hub and Home Maintenance — each with its own focus under Koofiya Group."
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
