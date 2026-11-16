"use client";

import Image from "next/image";
import { useEffect, useId, useState } from "react";
import {
  formatVehicleRate,
  holidayVehicles,
  type HolidayVehicle,
} from "@/lib/data/vehicles";
import { siteConfig } from "@/lib/data/site";
import {
  isNonEmpty,
  isValidIndianMobile,
  normalizeIndianMobile,
} from "@/lib/utils/validation";
import {
  buildVehicleBookingMessage,
  buildWhatsAppUrl,
  isWhatsAppConfigured,
} from "@/lib/utils/whatsapp";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

type FormState = {
  customerName: string;
  phone: string;
  travelDate: string;
  pickup: string;
  destination: string;
  passengers: string;
  message: string;
};

const empty: FormState = {
  customerName: "",
  phone: "",
  travelDate: "",
  pickup: "",
  destination: "",
  passengers: "1",
  message: "",
};

export function VehicleBooking() {
  const [selected, setSelected] = useState<HolidayVehicle | null>(null);

  return (
    <section id="vehicle-booking" className="scroll-mt-24 border-t border-border bg-background-soft py-16 lg:py-24">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Vehicle booking"
            title="Book coaches, buses & travellers"
            description="Choose from Armenia Coach and other buses or coaches. Booking opens WhatsApp so the Koofiya Holidays team can confirm availability and final rates."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {holidayVehicles.map((vehicle, i) => (
            <Reveal key={vehicle.id} delay={i * 0.04}>
              <article className="flex h-full flex-col overflow-hidden border border-border bg-white">
                <div className="relative aspect-[16/10] bg-[#eceeea]">
                  <Image
                    src={vehicle.image}
                    alt={vehicle.imageAlt}
                    fill
                    quality={90}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <span className="absolute top-3 left-3 bg-white/95 px-2.5 py-1 text-[0.65rem] font-medium uppercase tracking-[0.12em] text-foreground">
                    {vehicle.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold tracking-tight text-foreground">
                        {vehicle.name}
                      </h3>
                      <p className="mt-1 text-sm text-muted">
                        Up to {vehicle.seats} seats
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-base font-semibold text-foreground">
                        {formatVehicleRate(vehicle.demoRateInr)}
                      </p>
                      <p className="text-[0.65rem] uppercase tracking-[0.12em] text-muted">
                        Demo / day
                      </p>
                    </div>
                  </div>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                    {vehicle.description}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {vehicle.features.map((feature) => (
                      <li
                        key={feature}
                        className="border border-border px-2 py-1 text-xs text-muted"
                      >
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    type="button"
                    variant="whatsapp"
                    className="mt-5 w-full"
                    disabled={!vehicle.available}
                    onClick={() => setSelected(vehicle)}
                  >
                    Book on WhatsApp
                  </Button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-xs leading-relaxed text-muted">
          Demo rates are for website preview only. Opening WhatsApp does not
          confirm a booking — availability, route and final quote are confirmed
          by Koofiya Holidays after they reply.
        </p>
      </Container>

      {selected ? (
        <VehicleBookingModal
          vehicle={selected}
          onClose={() => setSelected(null)}
        />
      ) : null}
    </section>
  );
}

function VehicleBookingModal({
  vehicle,
  onClose,
}: {
  vehicle: HolidayVehicle;
  onClose: () => void;
}) {
  const titleId = useId();
  const [form, setForm] = useState<FormState>({
    ...empty,
    passengers: String(Math.min(4, vehicle.seats)),
  });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<"idle" | "opening" | "hint">("idle");
  const [hint, setHint] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validate(): boolean {
    const next: Partial<FormState> = {};
    if (!isNonEmpty(form.customerName)) next.customerName = "Name is required.";
    if (!isValidIndianMobile(form.phone)) {
      next.phone = "Enter a valid 10-digit Indian mobile number.";
    }
    if (!form.travelDate) next.travelDate = "Select a travel date.";
    if (!isNonEmpty(form.pickup, 2)) next.pickup = "Pickup location is required.";
    if (!isNonEmpty(form.destination, 2)) {
      next.destination = "Destination is required.";
    }
    const pax = Number(form.passengers);
    if (!Number.isFinite(pax) || pax < 1 || pax > vehicle.seats) {
      next.passengers = `Enter passengers between 1 and ${vehicle.seats}.`;
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setHint("");
    if (!validate()) return;

    const number = siteConfig.contact.whatsappNumber;
    if (!isWhatsAppConfigured(number)) {
      setStatus("hint");
      setHint("WhatsApp number is not configured.");
      return;
    }

    setStatus("opening");
    const message = buildVehicleBookingMessage({
      vehicleName: vehicle.name,
      category: vehicle.category,
      seats: vehicle.seats,
      demoRateInr: vehicle.demoRateInr,
      travelDate: form.travelDate,
      pickup: form.pickup.trim(),
      destination: form.destination.trim(),
      passengers: Number(form.passengers),
      customerName: form.customerName.trim(),
      phone: normalizeIndianMobile(form.phone),
      message: form.message.trim(),
    });

    window.open(buildWhatsAppUrl(number, message), "_blank", "noopener,noreferrer");
    setStatus("hint");
    setHint(
      "WhatsApp is opening with your booking request. This does not confirm the booking until Koofiya Holidays replies.",
    );
  }

  const fieldClass =
    "mt-1.5 w-full rounded-md border border-border bg-white px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted/70 focus:border-foreground/40";

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        className="absolute inset-0 bg-dark/50"
        aria-label="Close booking form"
        onClick={onClose}
      />
      <div className="relative z-10 max-h-[92vh] w-full overflow-y-auto rounded-t-2xl bg-white shadow-xl sm:mx-4 sm:max-w-lg sm:rounded-2xl">
        <div className="sticky top-0 flex items-start justify-between gap-4 border-b border-border bg-white px-5 py-4 sm:px-6">
          <div>
            <h2
              id={titleId}
              className="text-lg font-semibold tracking-tight text-foreground"
            >
              Book {vehicle.name}
            </h2>
            <p className="mt-1 text-sm text-muted">
              {vehicle.category} · {vehicle.seats} seats ·{" "}
              {formatVehicleRate(vehicle.demoRateInr)}/day (demo)
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-border px-2.5 py-1 text-sm text-muted hover:text-foreground"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 px-5 py-5 sm:px-6"
          noValidate
        >
          <label className="block text-sm">
            <span className="font-medium">Full name</span>
            <input
              className={fieldClass}
              value={form.customerName}
              onChange={(e) => update("customerName", e.target.value)}
              autoComplete="name"
              required
            />
            {errors.customerName ? (
              <span className="mt-1 block text-xs text-red-600">
                {errors.customerName}
              </span>
            ) : null}
          </label>

          <label className="block text-sm">
            <span className="font-medium">Mobile number</span>
            <input
              className={fieldClass}
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              autoComplete="tel"
              placeholder="10-digit Indian mobile"
              required
            />
            {errors.phone ? (
              <span className="mt-1 block text-xs text-red-600">
                {errors.phone}
              </span>
            ) : null}
          </label>

          <label className="block text-sm">
            <span className="font-medium">Travel date</span>
            <input
              type="date"
              className={fieldClass}
              value={form.travelDate}
              onChange={(e) => update("travelDate", e.target.value)}
              required
            />
            {errors.travelDate ? (
              <span className="mt-1 block text-xs text-red-600">
                {errors.travelDate}
              </span>
            ) : null}
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm">
              <span className="font-medium">Pickup</span>
              <input
                className={fieldClass}
                value={form.pickup}
                onChange={(e) => update("pickup", e.target.value)}
                placeholder="City / location"
                required
              />
              {errors.pickup ? (
                <span className="mt-1 block text-xs text-red-600">
                  {errors.pickup}
                </span>
              ) : null}
            </label>
            <label className="block text-sm">
              <span className="font-medium">Destination</span>
              <input
                className={fieldClass}
                value={form.destination}
                onChange={(e) => update("destination", e.target.value)}
                placeholder="City / place"
                required
              />
              {errors.destination ? (
                <span className="mt-1 block text-xs text-red-600">
                  {errors.destination}
                </span>
              ) : null}
            </label>
          </div>

          <label className="block text-sm">
            <span className="font-medium">Passengers</span>
            <input
              type="number"
              min={1}
              max={vehicle.seats}
              className={fieldClass}
              value={form.passengers}
              onChange={(e) => update("passengers", e.target.value)}
              required
            />
            {errors.passengers ? (
              <span className="mt-1 block text-xs text-red-600">
                {errors.passengers}
              </span>
            ) : null}
          </label>

          <label className="block text-sm">
            <span className="font-medium">
              Message <span className="font-normal text-muted">(optional)</span>
            </span>
            <textarea
              className={`${fieldClass} resize-y`}
              rows={2}
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              placeholder="Trip type, nights, special requests…"
            />
          </label>

          <Button
            type="submit"
            variant="whatsapp"
            className="w-full"
            disabled={status === "opening"}
          >
            {status === "opening"
              ? "Opening WhatsApp…"
              : "Send booking on WhatsApp"}
          </Button>

          {hint ? (
            <p className="text-sm leading-relaxed text-muted" role="status">
              {hint}
            </p>
          ) : (
            <p className="text-xs leading-relaxed text-muted">
              Booking is confirmed only after Koofiya Holidays responds on
              WhatsApp.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
