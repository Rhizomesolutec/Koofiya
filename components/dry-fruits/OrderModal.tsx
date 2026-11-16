"use client";

import { useEffect, useId, useState } from "react";
import {
  formatInr,
  honeyProduct,
  lineTotalInr,
  type ProductVariant,
} from "@/lib/data/product";
import {
  isNonEmpty,
  isValidIndianMobile,
  isValidIndianPin,
  normalizeIndianMobile,
} from "@/lib/utils/validation";
import {
  buildHoneyOrderMessage,
  buildWhatsAppUrl,
  isWhatsAppConfigured,
} from "@/lib/utils/whatsapp";
import { Button } from "@/components/ui/Button";

type OrderModalProps = {
  open: boolean;
  onClose: () => void;
  quantity: number;
  variant: ProductVariant;
};

type FormState = {
  customerName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pinCode: string;
  message: string;
};

const empty: FormState = {
  customerName: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pinCode: "",
  message: "",
};

export function OrderModal({
  open,
  onClose,
  quantity,
  variant,
}: OrderModalProps) {
  const titleId = useId();
  const [form, setForm] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<"idle" | "opening" | "hint">("idle");
  const [hint, setHint] = useState("");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

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
    if (!isNonEmpty(form.address, 5)) {
      next.address = "Enter a complete delivery address.";
    }
    if (!isNonEmpty(form.city)) next.city = "City is required.";
    if (!isNonEmpty(form.state)) next.state = "State is required.";
    if (!isValidIndianPin(form.pinCode)) {
      next.pinCode = "Enter a valid 6-digit Indian PIN code.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setHint("");
    if (!validate()) return;

    if (!isWhatsAppConfigured(honeyProduct.whatsappNumber)) {
      setStatus("hint");
      setHint(
        "WhatsApp number is not configured yet. Set NEXT_PUBLIC_WHATSAPP_NUMBER (digits with country code, e.g. 9198XXXXXXXX) and try again.",
      );
      return;
    }

    setStatus("opening");
    const message = buildHoneyOrderMessage(honeyProduct, {
      customerName: form.customerName.trim(),
      phone: normalizeIndianMobile(form.phone),
      address: form.address.trim(),
      city: form.city.trim(),
      state: form.state.trim(),
      pinCode: form.pinCode.trim(),
      message: form.message.trim(),
      quantity,
      variant,
    });

    const url = buildWhatsAppUrl(honeyProduct.whatsappNumber, message);
    window.open(url, "_blank", "noopener,noreferrer");

    setStatus("hint");
    setHint(honeyProduct.confirmationNote);
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
        aria-label="Close order form"
        onClick={onClose}
      />
      <div className="relative z-10 max-h-[92vh] w-full overflow-y-auto rounded-t-2xl bg-white shadow-xl sm:mx-4 sm:max-w-lg sm:rounded-2xl">
        <div className="sticky top-0 flex items-start justify-between gap-4 border-b border-border bg-white px-5 py-4 sm:px-6">
          <div>
            <h2
              id={titleId}
              className="text-lg font-semibold tracking-tight text-foreground"
            >
              Complete your order
            </h2>
            <p className="mt-1 text-sm text-muted">
              Delivery details for WhatsApp confirmation
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

        <form onSubmit={handleSubmit} className="space-y-4 px-5 py-5 sm:px-6" noValidate>
          <div className="rounded-md border border-border bg-[#fcfaf7] px-4 py-3 text-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium text-foreground">{honeyProduct.name}</p>
                <p className="mt-0.5 text-muted">
                  {variant.weightLabel} · Qty {quantity}
                </p>
              </div>
              <p className="font-semibold text-foreground">
                {formatInr(lineTotalInr(variant.priceInr, quantity))}
              </p>
            </div>
            {honeyProduct.isDemoPricing ? (
              <p className="mt-2 text-xs text-muted">
                Demo pricing — final amount confirmed on WhatsApp.
              </p>
            ) : null}
          </div>

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
            <span className="font-medium">Delivery address</span>
            <textarea
              className={`${fieldClass} resize-y`}
              rows={2}
              value={form.address}
              onChange={(e) => update("address", e.target.value)}
              autoComplete="street-address"
              required
            />
            {errors.address ? (
              <span className="mt-1 block text-xs text-red-600">
                {errors.address}
              </span>
            ) : null}
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm">
              <span className="font-medium">City</span>
              <input
                className={fieldClass}
                value={form.city}
                onChange={(e) => update("city", e.target.value)}
                autoComplete="address-level2"
                required
              />
              {errors.city ? (
                <span className="mt-1 block text-xs text-red-600">
                  {errors.city}
                </span>
              ) : null}
            </label>
            <label className="block text-sm">
              <span className="font-medium">State</span>
              <input
                className={fieldClass}
                value={form.state}
                onChange={(e) => update("state", e.target.value)}
                autoComplete="address-level1"
                required
              />
              {errors.state ? (
                <span className="mt-1 block text-xs text-red-600">
                  {errors.state}
                </span>
              ) : null}
            </label>
          </div>

          <label className="block text-sm">
            <span className="font-medium">PIN code</span>
            <input
              className={fieldClass}
              value={form.pinCode}
              onChange={(e) => update("pinCode", e.target.value)}
              autoComplete="postal-code"
              inputMode="numeric"
              maxLength={6}
              required
            />
            {errors.pinCode ? (
              <span className="mt-1 block text-xs text-red-600">
                {errors.pinCode}
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
              placeholder="Delivery preferences, landmarks, etc."
            />
          </label>

          <p className="text-xs leading-relaxed text-muted">
            {honeyProduct.deliveryNote}
          </p>

          <Button
            type="submit"
            variant="whatsapp"
            className="w-full"
            disabled={status === "opening"}
          >
            {status === "opening" ? "Opening WhatsApp…" : "Send Order on WhatsApp"}
          </Button>

          {hint ? (
            <p className="text-sm leading-relaxed text-muted" role="status">
              {hint}
            </p>
          ) : (
            <p className="text-xs leading-relaxed text-muted">
              {honeyProduct.confirmationNote}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
