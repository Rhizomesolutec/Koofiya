import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function ClosingCTA() {
  return (
    <section className="bg-dark py-16 lg:py-24">
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
            Let&apos;s Build Something Meaningful.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/65 sm:text-lg">
            Connect with Koofiya Group to explore our businesses, services and
            opportunities.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/contact">Contact Us</Button>
            <Button
              href="/businesses"
              variant="secondary"
              className="!border-white/20 !text-white hover:!bg-white/10"
            >
              Explore Businesses
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
