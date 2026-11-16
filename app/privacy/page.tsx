import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Koofiya Group websites and enquiry forms.",
};

export default function PrivacyPage() {
  return (
    <section className="py-16 lg:py-24">
      <Container className="max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight text-foreground">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-muted">
          Placeholder policy — replace with the official legal text when ready.
        </p>
        <div className="prose-muted mt-10 space-y-5 text-sm leading-relaxed text-muted">
          <p>
            Koofiya Group respects your privacy. Information you submit through
            enquiry or WhatsApp order forms — such as name, phone number and
            delivery address — is used only to respond to your request and fulfil
            related services.
          </p>
          <p>
            We do not operate a payment gateway on this website. Orders for honey
            are communicated via WhatsApp and confirmed by the business team.
          </p>
          <p>
            Contact details and operational policies may be updated. For privacy
            questions, use the contact channels listed on the Contact page once
            configured.
          </p>
        </div>
      </Container>
    </section>
  );
}
