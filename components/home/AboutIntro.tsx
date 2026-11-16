import { visionMission } from "@/lib/data/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function AboutIntro() {
  return (
    <section className="border-t border-border py-16 lg:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5" variant="heading">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
              About
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
              One Vision.
              <br />
              Multiple Ventures.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted">
              {visionMission.intro}
            </p>
            <div className="mt-8">
              <Button href="/about" variant="secondary">
                Read More
              </Button>
            </div>
          </Reveal>

          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-7">
            <Reveal delay={0.06} className="border-t border-border pt-6">
              <h3 className="text-sm font-medium uppercase tracking-[0.14em] text-foreground">
                Vision
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                {visionMission.vision}
              </p>
            </Reveal>
            <Reveal delay={0.12} className="border-t border-border pt-6">
              <h3 className="text-sm font-medium uppercase tracking-[0.14em] text-foreground">
                Mission
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                {visionMission.mission}
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
