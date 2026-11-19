import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of Use for the Koofiya Group website.",
};

export default function TermsPage() {
  return (
    <section className="py-16 lg:py-24">
      <Container className="max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight text-foreground">
          Terms of Use
        </h1>
        <p className="mt-4 text-sm text-muted">
          Placeholder terms — replace with the official legal text when ready.
        </p>
        <div className="mt-10 space-y-5 text-sm leading-relaxed text-muted">
          <p>
            This website provides information about Koofiya Group and its
            businesses. Content is for general information and may be updated
            without notice.
          </p>
          <p>
            WhatsApp orders for Koofiya Dry Fruits honey are requests, not
            confirmed purchases, until the Koofiya team responds and confirms
            availability, pricing and delivery.
          </p>
          <p>
            Demo product prices and vehicle rates shown on the website are for
            preview only and must be confirmed by the relevant Koofiya team.
          </p>
        </div>
      </Container>
    </section>
  );
}
