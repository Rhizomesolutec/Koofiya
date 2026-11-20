"use client";

import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ParallaxImageFrame } from "@/components/ui/ScrollReveal";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  useGSAP(
    () => {
      if (reduce || !root.current) return;

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: root.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
      tl.fromTo(
        "[data-hero='eyebrow']",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.55 },
      )
        .fromTo(
          "[data-hero='heading']",
          { opacity: 0, y: 40, filter: "blur(6px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9 },
          "-=0.2",
        )
        .fromTo(
          "[data-hero='copy']",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.45",
        )
        .fromTo(
          "[data-hero='cta']",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.35",
        )
        .fromTo(
          "[data-hero='image']",
          { opacity: 0, scale: 1.08 },
          { opacity: 1, scale: 1, duration: 1.1 },
          "-=0.85",
        );
    },
    { scope: root, dependencies: [reduce] },
  );

  return (
    <section ref={root} className="relative overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(181,138,82,0.08),_transparent_55%)]" />
      <Container className="relative grid items-center gap-12 py-16 lg:grid-cols-12 lg:gap-10 lg:py-24">
        <div className="lg:col-span-6 xl:col-span-5">
          <p
            data-hero="eyebrow"
            className="text-xs font-medium uppercase tracking-[0.2em] text-accent"
            style={reduce ? undefined : { opacity: 0 }}
          >
            Koofiya Group
          </p>
          <h2
            data-hero="heading"
            className="mt-5 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-[3.75rem] lg:leading-[1.05]"
            style={reduce ? undefined : { opacity: 0 }}
          >
            Building Businesses.
            <br />
            Creating Opportunities.
          </h2>
          <p
            data-hero="copy"
            className="mt-6 max-w-lg text-base leading-relaxed text-muted sm:text-lg"
            style={reduce ? undefined : { opacity: 0 }}
          >
            Koofiya Group brings together diverse businesses, services and
            opportunities under one vision — creating meaningful value through
            innovation, commitment and growth.
          </p>
          <div
            data-hero="cta"
            className="mt-9 flex flex-wrap gap-3"
            style={reduce ? undefined : { opacity: 0 }}
          >
            <Button href="/businesses">Explore Our Businesses</Button>
            <Button href="/about" variant="secondary">
              Discover Koofiya Group
            </Button>
          </div>
        </div>

        <div
          data-hero="image"
          className="relative lg:col-span-6 xl:col-span-7"
          style={reduce ? undefined : { opacity: 0 }}
        >
          <ParallaxImageFrame className="relative ml-auto aspect-[5/4] w-full bg-background-soft lg:aspect-[4/3]">
            <Image
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&h=1350&q=85"
              alt="Modern architectural exterior representing Koofiya Group"
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              quality={90}
              className="object-cover object-center"
            />
          </ParallaxImageFrame>
        </div>
      </Container>
    </section>
  );
}
