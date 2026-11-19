import Image from "next/image";
import Link from "next/link";
import type { Business } from "@/lib/data/businesses";

type BusinessCardProps = {
  business: Business;
  index?: number;
};

const imagePositions: Record<string, string> = {
  holidays: "object-[center_45%]",
  "dry-fruits": "object-center",
  cctv: "object-center",
  "job-hub": "object-[center_30%]",
  "home-maintenance": "object-center",
};

export function BusinessCard({ business }: BusinessCardProps) {
  const objectPos = imagePositions[business.slug] ?? "object-center";

  return (
    <article className="group relative flex flex-col overflow-hidden">
      <Link
        href={`/businesses/${business.slug}`}
        className="relative aspect-[4/3] overflow-hidden bg-[#eceeea]"
      >
        <Image
          src={business.image}
          alt={business.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={90}
          className={`object-cover ${objectPos} transition-transform duration-700 ease-out will-change-transform group-hover:scale-[1.04]`}
        />
      </Link>

      <div className="flex flex-1 flex-col border-b border-border pt-5 pb-8">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
          {business.industry}
        </p>
        <h3 className="mt-2 text-xl font-semibold tracking-tight text-foreground">
          <Link
            href={`/businesses/${business.slug}`}
            className="transition-colors hover:text-[#3d3428]"
          >
            {business.name}
          </Link>
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
          {business.summary}
        </p>
        <Link
          href={`/businesses/${business.slug}`}
          className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-foreground transition-all hover:gap-3"
        >
          Explore Business
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
