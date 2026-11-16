import type { Metadata } from "next";
import Image from "next/image";
import { businesses } from "@/lib/data/businesses";
import { siteConfig, visionMission, whyKoofiya } from "@/lib/data/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Koofiya Group — a diversified business group building focused ventures across multiple industries.",
};

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-border bg-background-soft py-16 lg:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
              About Koofiya Group
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
              One Group.
              <br />
              Multiple Businesses.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              {siteConfig.tagline} {visionMission.intro}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative aspect-[5/4] overflow-hidden bg-border">
              <Image
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80"
                alt="Bright modern workspace representing Koofiya Group"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-16 lg:py-24">
        <Container className="grid gap-10 md:grid-cols-2">
          <Reveal className="border-t border-border pt-8">
            <h2 className="text-sm font-medium uppercase tracking-[0.14em] text-accent">
              Vision
            </h2>
            <p className="mt-4 text-xl font-medium leading-relaxed text-foreground sm:text-2xl">
              {visionMission.vision}
            </p>
          </Reveal>
          <Reveal delay={0.08} className="border-t border-border pt-8">
            <h2 className="text-sm font-medium uppercase tracking-[0.14em] text-accent">
              Mission
            </h2>
            <p className="mt-4 text-xl font-medium leading-relaxed text-foreground sm:text-2xl">
              {visionMission.mission}
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="bg-background-soft py-16 lg:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Our approach"
              title="How Koofiya Group works"
              description="Practical principles that guide every venture under the group — without unverified claims."
            />
          </Reveal>
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {whyKoofiya.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.05}>
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
              eyebrow="Businesses"
              title="Ventures under the group"
              description="Each business operates with its own focus while sharing Koofiya Group's commitment to clarity and quality."
            />
          </Reveal>
          <ul className="mt-12 divide-y divide-border border-y border-border">
            {businesses.map((biz, i) => (
              <Reveal key={biz.slug} delay={i * 0.03}>
                <li className="flex flex-col gap-2 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
                  <div>
                    <p className="text-xs uppercase tracking-[0.14em] text-accent">
                      {biz.industry}
                    </p>
                    <p className="mt-1 text-lg font-semibold text-foreground">
                      {biz.name}
                    </p>
                  </div>
                  <Button
                    href={`/businesses/${biz.slug}`}
                    variant="ghost"
                    className="!px-0 self-start sm:self-auto"
                  >
                    Explore →
                  </Button>
                </li>
              </Reveal>
            ))}
          </ul>
          <div className="mt-10">
            <Button href="/contact">Contact Koofiya Group</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
