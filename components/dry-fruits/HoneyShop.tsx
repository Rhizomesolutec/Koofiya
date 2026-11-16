"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  formatInr,
  honeyProduct,
  lineTotalInr,
} from "@/lib/data/product";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { OrderModal } from "@/components/dry-fruits/OrderModal";

export function HoneyShop() {
  const product = honeyProduct;
  const availableVariants = useMemo(
    () => product.variants.filter((v) => v.available),
    [product.variants],
  );
  const [variantId, setVariantId] = useState(
    availableVariants[1]?.id ?? availableVariants[0]?.id ?? product.variants[0].id,
  );
  const [quantity, setQuantity] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  const variant =
    product.variants.find((v) => v.id === variantId) ?? product.variants[0];
  const total = lineTotalInr(variant.priceInr, quantity);

  return (
    <>
      <section className="relative overflow-hidden bg-honey-bg">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(181,138,82,0.12),_transparent_50%)]" />
        <Container className="relative grid items-center gap-10 py-14 lg:grid-cols-2 lg:gap-16 lg:py-20">
          <Reveal variant="heading">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-honey-accent">
              Koofiya Dry Fruits · Honey
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-[3.4rem] lg:leading-[1.08]">
              {product.tagline}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              {product.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                type="button"
                variant="primary"
                onClick={() =>
                  document
                    .getElementById("product")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Shop Honey
              </Button>
              <Button href="/businesses/dry-fruits" variant="secondary">
                About Dry Fruits
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative aspect-[4/5] overflow-hidden bg-white sm:aspect-[5/4] lg:aspect-[4/5]">
              <Image
                src={product.images[0].src}
                alt={product.images[0].alt}
                fill
                priority
                quality={90}
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </Container>
      </section>

      <section id="product" className="scroll-mt-24 bg-white py-14 lg:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <Reveal className="lg:col-span-6">
              <div className="relative aspect-square overflow-hidden bg-honey-bg">
                <Image
                  src={product.images[activeImage].src}
                  alt={product.images[activeImage].alt}
                  fill
                  quality={90}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="mt-3 flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={img.src}
                    type="button"
                    onClick={() => setActiveImage(i)}
                    className={`relative h-16 w-16 overflow-hidden border transition-colors sm:h-20 sm:w-20 ${
                      activeImage === i
                        ? "border-foreground"
                        : "border-border hover:border-foreground/40"
                    }`}
                    aria-label={`View image ${i + 1}`}
                  >
                    <Image
                      src={img.src}
                      alt=""
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.08} className="lg:col-span-6">
              <div className="flex h-full flex-col border border-border bg-[#fcfaf7] p-6 sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                      {product.name}
                    </h2>
                    <p className="mt-1 text-sm text-muted">
                      {product.availabilityLabel}
                    </p>
                  </div>
                  {product.isDemoPricing ? (
                    <span className="rounded-sm border border-accent/30 bg-white px-2.5 py-1 text-[0.65rem] font-medium uppercase tracking-[0.14em] text-accent">
                      Demo pricing
                    </span>
                  ) : null}
                </div>

                <p className="mt-5 text-sm leading-relaxed text-muted">
                  {product.longDescription}
                </p>

                <fieldset className="mt-8">
                  <legend className="text-sm font-medium text-foreground">
                    Pack size
                  </legend>
                  <div className="mt-3 grid gap-2 sm:grid-cols-3">
                    {product.variants.map((v) => {
                      const selected = variantId === v.id;
                      return (
                        <button
                          key={v.id}
                          type="button"
                          disabled={!v.available}
                          onClick={() => setVariantId(v.id)}
                          className={`rounded-md border px-3 py-3 text-left transition-colors disabled:opacity-40 ${
                            selected
                              ? "border-foreground bg-foreground text-white"
                              : "border-border bg-white hover:border-foreground/35"
                          }`}
                        >
                          <span className="block text-sm font-medium">
                            {v.weightLabel}
                          </span>
                          <span
                            className={`mt-1 block text-xs ${
                              selected ? "text-white/75" : "text-muted"
                            }`}
                          >
                            {formatInr(v.priceInr)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <div className="mt-6">
                  <label
                    htmlFor="qty"
                    className="text-sm font-medium text-foreground"
                  >
                    Quantity
                  </label>
                  <div className="mt-2 inline-flex items-center border border-border bg-white">
                    <button
                      type="button"
                      className="px-3.5 py-2.5 text-lg leading-none text-muted hover:text-foreground"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <input
                      id="qty"
                      type="number"
                      min={1}
                      max={99}
                      value={quantity}
                      onChange={(e) => {
                        const n = Number(e.target.value);
                        if (Number.isFinite(n)) {
                          setQuantity(Math.min(99, Math.max(1, n)));
                        }
                      }}
                      className="w-14 border-x border-border bg-transparent py-2.5 text-center text-sm outline-none"
                    />
                    <button
                      type="button"
                      className="px-3.5 py-2.5 text-lg leading-none text-muted hover:text-foreground"
                      onClick={() => setQuantity((q) => Math.min(99, q + 1))}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="mt-8 border-t border-border pt-5">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.14em] text-muted">
                        Estimated total
                      </p>
                      <p className="mt-1 text-2xl font-semibold text-foreground">
                        {formatInr(total)}
                      </p>
                    </div>
                    <p className="max-w-[10rem] text-right text-xs text-muted">
                      {variant.weightLabel} × {quantity}
                    </p>
                  </div>
                  {product.isDemoPricing ? (
                    <p className="mt-3 text-xs leading-relaxed text-muted">
                      Demo prices for website preview. Final amount is confirmed
                      on WhatsApp before payment or delivery.
                    </p>
                  ) : null}
                </div>

                <div className="mt-6 flex flex-col gap-3">
                  <Button
                    type="button"
                    variant="whatsapp"
                    className="w-full"
                    onClick={() => setModalOpen(true)}
                    disabled={!product.available || !variant.available}
                  >
                    Order via WhatsApp
                  </Button>
                  <p className="text-xs leading-relaxed text-muted">
                    {product.confirmationNote}
                  </p>
                  <p className="text-xs leading-relaxed text-muted">
                    {product.deliveryNote}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="border-t border-border bg-background-soft py-14 lg:py-16">
        <Container className="grid gap-8 sm:grid-cols-3">
          {[
            {
              title: "Select & order",
              text: "Choose pack size and quantity, then share delivery details.",
            },
            {
              title: "Confirm on WhatsApp",
              text: "We confirm availability, amount and delivery before packing.",
            },
            {
              title: "India delivery",
              text: "Dispatch details are shared after the team confirms your order.",
            },
          ].map((item) => (
            <div key={item.title} className="border-t border-border pt-5">
              <h3 className="text-base font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {item.text}
              </p>
            </div>
          ))}
        </Container>
      </section>

      <OrderModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        quantity={quantity}
        variant={variant}
      />
    </>
  );
}
