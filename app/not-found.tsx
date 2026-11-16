import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="py-24 lg:py-32">
      <Container className="max-w-xl text-center">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
          404
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground">
          Page not found
        </h1>
        <p className="mt-4 text-muted">
          The page you are looking for does not exist or may have moved.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/">Go Home</Button>
          <Button href="/businesses" variant="secondary">
            Explore Businesses
          </Button>
        </div>
      </Container>
    </section>
  );
}
