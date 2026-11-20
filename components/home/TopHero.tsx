"use client";

import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { businesses } from "@/lib/data/businesses";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function TopHero() {
  const root = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  useGSAP(
    () => {
      if (reduce || !root.current) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        "[data-top-hero='eyebrow']",
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.5 },
      )
        .fromTo(
          "[data-top-hero='heading']",
          { opacity: 0, y: 28, filter: "blur(4px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8 },
          "-=0.2",
        )
        .fromTo(
          "[data-top-hero='copy']",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.65 },
          "-=0.45",
        )
        .fromTo(
          "[data-top-hero='cta']",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.55 },
          "-=0.35",
        )
        .fromTo(
          "[data-top-hero='ventures']",
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.65 },
          "-=0.25",
        );
    },
    { scope: root, dependencies: [reduce] },
  );

  return (
    <section
      ref={root}
      className="relative flex min-h-[32rem] flex-col justify-center overflow-hidden border-b border-border bg-background sm:min-h-[38rem] lg:min-h-[44rem]"
    >
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/images/hero-corporate-bg.jpg"
          alt="Modern luxury architectural pavilion representing Koofiya Group"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-bottom sm:object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/75 via-white/35 to-white/15" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_26%,_rgba(255,255,255,0.72),_transparent_62%)]" />
      </div>

      <Container className="relative flex flex-1 flex-col justify-between pt-14 pb-16 sm:pt-20 sm:pb-20 lg:pt-24 lg:pb-14">
        <div className="mx-auto max-w-3xl text-center">
          <div
            data-top-hero="eyebrow"
            className="inline-flex items-center gap-2.5 border border-border/80 bg-white/90 px-3.5 py-1.5 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-accent shadow-xs backdrop-blur-md"
            style={reduce ? undefined : { opacity: 0 }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Koofiya Group · India
          </div>

          <h1
            data-top-hero="heading"
            className="mt-6 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-[3.75rem] lg:leading-[1.06]"
            style={reduce ? undefined : { opacity: 0 }}
          >
            One Group. Multiple Businesses.
            <span className="mt-1 block text-accent">
              Endless Possibilities.
            </span>
          </h1>

          <p
            data-top-hero="copy"
            className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-foreground/80 sm:text-lg"
            style={reduce ? undefined : { opacity: 0 }}
          >
            Delivering trusted services across travel, natural foods, CCTV
            security, recruitment, and home care — united under one standard of
            quality and commitment.
          </p>

          <div
            data-top-hero="cta"
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
            style={reduce ? undefined : { opacity: 0 }}
          >
            <Button href="/businesses">Explore Our Businesses</Button>
            <Button
              href="/contact"
              variant="secondary"
              className="!bg-white/90 backdrop-blur-sm hover:!bg-white"
            >
              Get in Touch
            </Button>
          </div>
        </div>

        <div
          data-top-hero="ventures"
          className="hidden lg:mt-20 lg:block"
          style={reduce ? undefined : { opacity: 0 }}
        >
          <div className="grid grid-cols-5 gap-3">
            {businesses.map((biz, idx) => (
              <Link
                key={biz.slug}
                href={`/businesses/${biz.slug}`}
                className="group flex flex-col justify-between border border-white/70 bg-white/88 px-4 py-3.5 shadow-xs backdrop-blur-md transition-colors hover:border-accent/60 hover:bg-white"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[0.65rem] font-medium tracking-[0.16em] text-accent">
                    0{idx + 1}
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-xs text-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-foreground"
                  >
                    →
                  </span>
                </div>
                <p className="mt-2.5 text-sm font-semibold tracking-tight text-foreground">
                  {biz.shortName}
                </p>
                <p className="mt-0.5 text-xs text-muted">{biz.industry}</p>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
