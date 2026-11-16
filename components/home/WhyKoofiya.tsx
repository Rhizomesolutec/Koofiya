import { whyKoofiya } from "@/lib/data/site";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function WhyKoofiya() {
  return (
    <section className="py-16 lg:py-24">
      <Container>
        <Reveal variant="heading">
          <SectionHeading
            eyebrow="Why Koofiya Group"
            title="How we build and grow."
            description="A practical approach to running diversified businesses — focused on customers, quality and collaboration."
          />
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
          {whyKoofiya.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05}>
              <div className="h-full bg-white p-8 sm:p-10">
                <span className="text-xs font-medium tracking-[0.16em] text-accent">
                  0{i + 1}
                </span>
                <h3 className="mt-4 text-xl font-semibold tracking-tight text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
