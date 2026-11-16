import type { Metadata } from "next";
import { Suspense } from "react";
import { EnquiryForm } from "@/components/contact/EnquiryForm";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Koofiya Group to explore our businesses, services and opportunities.",
};

async function ContactFormSection({
  searchParams,
}: {
  searchParams: Promise<{ business?: string | string[] }>;
}) {
  const params = await searchParams;
  const raw = params.business;
  const defaultBusiness = Array.isArray(raw) ? (raw[0] ?? "") : (raw ?? "");

  return <EnquiryForm defaultBusiness={defaultBusiness} />;
}

export default function ContactPage({ searchParams }: PageProps<"/contact">) {
  const email = siteConfig.contact.email || siteConfig.contact.emailPlaceholder;
  const phone = siteConfig.contact.phone || siteConfig.contact.phonePlaceholder;
  const address =
    siteConfig.contact.address || siteConfig.contact.addressPlaceholder;

  return (
    <section className="py-16 lg:py-24">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
            Contact
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Let&apos;s start a conversation.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted">
            Share your enquiry and the Koofiya Group team will follow up.
            Opening WhatsApp or email does not confirm a response until the team
            replies.
          </p>

          <dl className="mt-10 space-y-5 border-t border-border pt-8">
            <div>
              <dt className="text-xs uppercase tracking-[0.14em] text-accent">
                Email
              </dt>
              <dd
                className={`mt-1 text-sm ${siteConfig.contact.email ? "text-foreground" : "italic text-muted"}`}
              >
                {siteConfig.contact.email ? (
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="hover:underline"
                  >
                    {email}
                  </a>
                ) : (
                  email
                )}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.14em] text-accent">
                Phone
              </dt>
              <dd
                className={`mt-1 text-sm ${siteConfig.contact.phone ? "text-foreground" : "italic text-muted"}`}
              >
                {phone}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.14em] text-accent">
                Address
              </dt>
              <dd
                className={`mt-1 text-sm ${siteConfig.contact.address ? "text-foreground" : "italic text-muted"}`}
              >
                {address}
              </dd>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={0.08} className="lg:col-span-7">
          <div className="border border-border bg-background-soft p-6 sm:p-8">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              Enquiry form
            </h2>
            <p className="mt-2 text-sm text-muted">
              Fields marked as required help us respond accurately.
            </p>
            <div className="mt-6">
              <Suspense fallback={<p className="text-sm text-muted">Loading form…</p>}>
                <ContactFormSection searchParams={searchParams} />
              </Suspense>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
