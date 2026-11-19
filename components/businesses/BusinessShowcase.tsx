import Image from "next/image";
import Link from "next/link";
import type { Business } from "@/lib/data/businesses";
import { VehicleBooking } from "@/components/holidays/VehicleBooking";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ParallaxImageFrame } from "@/components/ui/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

type BusinessShowcaseProps = {
  business: Business;
};

export function BusinessShowcase({ business }: BusinessShowcaseProps) {
  return (
    <>
      <section className="relative overflow-hidden bg-background-soft">
        <Container className="grid items-center gap-10 py-16 lg:grid-cols-2 lg:gap-16 lg:py-24">
          <Reveal variant="heading">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
              {business.industry}
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
              {business.name}
            </h1>
            <p className="mt-3 text-lg text-muted">{business.heroHeadline}</p>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
              {business.heroDescription}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {business.slug === "holidays" ? (
                <Button href="#vehicle-booking">Book a Vehicle</Button>
              ) : (
                <Button href={business.ctaHref}>{business.ctaLabel}</Button>
              )}
              <Button
                href={business.slug === "holidays" ? business.ctaHref : "/businesses"}
                variant="secondary"
              >
                {business.slug === "holidays" ? "Travel Enquiry" : "All Businesses"}
              </Button>
            </div>
            <p className="mt-6 text-sm text-muted">
              Part of{" "}
              <Link href="/" className="underline-offset-4 hover:underline">
                Koofiya Group
              </Link>
            </p>
          </Reveal>
          <Reveal delay={0.1} variant="image" className="relative">
            <ParallaxImageFrame className="relative aspect-[5/4] bg-border">
              <Image
                src={business.image}
                alt={business.imageAlt}
                fill
                priority
                quality={90}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </ParallaxImageFrame>
          </Reveal>
        </Container>
      </section>

      <section className="py-16 lg:py-24">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <SectionHeading
              eyebrow="Introduction"
              title={`About ${business.shortName}`}
              description={business.description}
            />
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-7">
            <div className="grid gap-6 sm:grid-cols-2">
              {business.offerings.map((item) => (
                <div
                  key={item.title}
                  className="border-t border-border pt-5"
                >
                  <h3 className="text-base font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-background-soft py-16 lg:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Approach"
              title={`Why ${business.shortName}`}
              description="Editable content reflecting how this business serves its customers."
            />
          </Reveal>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {business.whyChoose.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.06}>
                <div className="border-l-2 border-accent/40 pl-5">
                  <h3 className="text-lg font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Gallery"
              title={`${business.shortName} in focus`}
              description="A clear visual look at the atmosphere and work behind this venture."
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {business.gallery.slice(0, 3).map((image, i) => (
              <Reveal key={`${business.slug}-${image.src}`} delay={i * 0.05}>
                <figure className="group overflow-hidden">
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#eceeea]">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      quality={90}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                  <figcaption className="border-b border-border pt-3 pb-4 text-sm text-muted">
                    {image.alt}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {business.slug === "holidays" ? <VehicleBooking /> : null}

      <section className="bg-dark py-16 lg:py-20">
        <Container className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="max-w-xl">
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Ready to connect?
            </h2>
            <p className="mt-3 text-base text-white/65">
              Reach out to {business.name} through the enquiry path below. The
              team will follow up on WhatsApp or email.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href={business.ctaHref} variant="primary">
              {business.ctaLabel}
            </Button>
            <Button href="/contact" variant="secondary" className="!border-white/20 !text-white hover:!bg-white/10">
              Group Contact
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
