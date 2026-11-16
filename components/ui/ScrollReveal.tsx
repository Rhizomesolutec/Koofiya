"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  /** Animation style */
  variant?: "fade-up" | "fade" | "image" | "heading";
  delay?: number;
  /** Stagger child elements matching selector */
  staggerChildren?: string;
};

export function ScrollReveal({
  children,
  className = "",
  variant = "fade-up",
  delay = 0,
  staggerChildren,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useGSAP(
    () => {
      if (reduce || !ref.current) return;

      const el = ref.current;

      if (staggerChildren) {
        // Parent must be visible; only children animate
        gsap.set(el, { opacity: 1 });
        const items = el.querySelectorAll(staggerChildren);
        gsap.set(items, { opacity: 0, y: 36 });
        gsap.to(items, {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.1,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
        return;
      }

      const from: gsap.TweenVars =
        variant === "fade"
          ? { opacity: 0 }
          : variant === "image"
            ? { opacity: 0, scale: 1.08, y: 24 }
            : variant === "heading"
              ? { opacity: 0, y: 40, filter: "blur(4px)" }
              : { opacity: 0, y: 40 };

      const to: gsap.TweenVars =
        variant === "fade"
          ? { opacity: 1, duration: 0.9, delay, ease: "power2.out" }
          : variant === "image"
            ? {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 1.05,
                delay,
                ease: "power3.out",
              }
            : variant === "heading"
              ? {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  duration: 0.95,
                  delay,
                  ease: "power3.out",
                }
              : {
                  opacity: 1,
                  y: 0,
                  duration: 0.85,
                  delay,
                  ease: "power3.out",
                };

      gsap.fromTo(el, from, {
        ...to,
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });
    },
    { dependencies: [reduce, variant, delay, staggerChildren], scope: ref },
  );

  return (
    <div
      ref={ref}
      className={className}
      style={reduce ? undefined : { opacity: 0 }}
    >
      {children}
    </div>
  );
}

/** Subtle parallax zoom on scroll for hero / feature images */
export function ParallaxImageFrame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useGSAP(
    () => {
      if (reduce || !ref.current) return;
      const img = ref.current.querySelector("img");
      if (!img) return;

      gsap.fromTo(
        img,
        { scale: 1.12 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    },
    { dependencies: [reduce], scope: ref },
  );

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      {children}
    </div>
  );
}
