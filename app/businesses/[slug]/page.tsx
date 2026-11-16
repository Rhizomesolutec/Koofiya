import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { BusinessShowcase } from "@/components/businesses/BusinessShowcase";
import { Container } from "@/components/ui/Container";
import {
  getAllBusinessSlugs,
  getBusinessBySlug,
} from "@/lib/data/businesses";

export function generateStaticParams() {
  return getAllBusinessSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/businesses/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const business = getBusinessBySlug(slug);
  if (!business) {
    return { title: "Business not found" };
  }
  return {
    title: business.name,
    description: business.summary,
    openGraph: {
      title: business.name,
      description: business.summary,
      images: [{ url: business.image, alt: business.imageAlt }],
    },
  };
}

export default function BusinessPage({
  params,
}: PageProps<"/businesses/[slug]">) {
  return (
    <Suspense fallback={<BusinessPageFallback />}>
      <BusinessPageContent params={params} />
    </Suspense>
  );
}

async function BusinessPageContent({
  params,
}: {
  params: PageProps<"/businesses/[slug]">["params"];
}) {
  const { slug } = await params;
  const business = getBusinessBySlug(slug);
  if (!business) notFound();
  return <BusinessShowcase business={business} />;
}

function BusinessPageFallback() {
  return (
    <section className="bg-background-soft py-16 lg:py-24">
      <Container>
        <div className="h-4 w-28 animate-pulse rounded bg-border" />
        <div className="mt-6 h-12 w-2/3 max-w-xl animate-pulse rounded bg-border" />
        <div className="mt-4 h-24 w-full max-w-2xl animate-pulse rounded bg-border" />
        <div className="mt-10 aspect-[5/4] w-full animate-pulse rounded bg-border lg:max-w-xl" />
      </Container>
    </section>
  );
}
