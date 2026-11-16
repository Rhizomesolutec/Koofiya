"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  /** Use GSAP ScrollTrigger instead of Framer Motion */
  engine?: "framer" | "gsap";
  variant?: "fade-up" | "fade" | "image" | "heading";
};

export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 24,
  engine = "gsap",
  variant = "fade-up",
}: RevealProps) {
  const reduce = useReducedMotion();

  if (engine === "gsap") {
    return (
      <ScrollReveal
        className={className}
        delay={delay}
        variant={variant === "fade-up" ? "fade-up" : variant}
      >
        {children}
      </ScrollReveal>
    );
  }

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <ScrollReveal className={className} staggerChildren="[data-stagger-item]">
      {children}
    </ScrollReveal>
  );
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div data-stagger-item className={className}>
      {children}
    </div>
  );
}
