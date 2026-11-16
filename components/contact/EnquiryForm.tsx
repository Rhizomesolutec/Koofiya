"use client";

import { useMemo, useState } from "react";
import { businesses } from "@/lib/data/businesses";
import { siteConfig } from "@/lib/data/site";
import { honeyProduct } from "@/lib/data/product";
import { isNonEmpty, isValidIndianMobile } from "@/lib/utils/validation";
import {
  buildSimpleWhatsAppUrl,
  isWhatsAppConfigured,
} from "@/lib/utils/whatsapp";
import { Button } from "@/components/ui/Button";

type EnquiryFormProps = {
  defaultBusiness?: string;
};

type FormState = {
  name: string;
  phone: string;
  email: string;
  business: string;
  message: string;
};

const initial: FormState = {
  name: "",
  phone: "",
  email: "",
  business: "",
  message: "",
};

export function EnquiryForm({ defaultBusiness = "" }: EnquiryFormProps) {
  const [form, setForm] = useState<FormState>({
    ...initial,
    business: defaultBusiness,
  });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submittedHint, setSubmittedHint] = useState("");

  const whatsappReady = isWhatsAppConfigured(honeyProduct.whatsappNumber);
  const emailConfigured = Boolean(siteConfig.contact.email);

  const businessOptions = useMemo(
    () => [
      { value: "", label: "General enquiry" },
      ...businesses.map((b) => ({ value: b.slug, label: b.name })),
    ],
    [],
  );

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validate(): boolean {
    const next: Partial<FormState> = {};
    if (!isNonEmpty(form.name)) next.name = "Please enter your name.";
    if (!isValidIndianMobile(form.phone)) {
      next.phone = "Enter a valid 10-digit Indian mobile number.";
    }
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Enter a valid email address.";
    }
    if (!isNonEmpty(form.message, 10)) {
      next.message = "Please share a short message (at least 10 characters).";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmittedHint("");
    if (!validate()) return;

    const businessLabel =
      businessOptions.find((b) => b.value === form.business)?.label ??
      "General enquiry";

    const body = [
      "Hello Koofiya Group!",
      "",
      "I would like to make an enquiry.",
      "",
      `Name: ${form.name.trim()}`,
      `Phone: ${form.phone.trim()}`,
      `Email: ${form.email.trim() || "Not provided"}`,
      `Business: ${businessLabel}`,
      "",
      "Message:",
      form.message.trim(),
      "",
      "Please get back to me when convenient.",
      "",
      "Thank you!",
    ].join("\n");

    if (whatsappReady) {
      window.open(
        buildSimpleWhatsAppUrl(honeyProduct.whatsappNumber, body),
        "_blank",
        "noopener,noreferrer",
      );
      setSubmittedHint(
        "WhatsApp is opening with your enquiry. This does not confirm a response — the team will follow up when available.",
      );
      return;
    }

    if (emailConfigured) {
      const subject = encodeURIComponent(
        `Koofiya Group enquiry — ${businessLabel}`,
      );
      const mailto = `mailto:${siteConfig.contact.email}?subject=${subject}&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;
      setSubmittedHint(
        "Your email client should open with the enquiry drafted. Sending the email completes your request.",
      );
      return;
    }

    setSubmittedHint(
      "Enquiry channels are not configured yet. Please set NEXT_PUBLIC_WHATSAPP_NUMBER or NEXT_PUBLIC_CONTACT_EMAIL in your environment.",
    );
  }

  const fieldClass =
    "mt-1.5 w-full rounded-md border border-border bg-white px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted/70 focus:border-foreground/40";

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="font-medium text-foreground">Name</span>
          <input
            type="text"
            name="name"
            autoComplete="name"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className={fieldClass}
            placeholder="Your full name"
            required
          />
          {errors.name ? (
            <span className="mt-1 block text-xs text-red-600">{errors.name}</span>
          ) : null}
        </label>

        <label className="block text-sm">
          <span className="font-medium text-foreground">Mobile number</span>
          <input
            type="tel"
            name="phone"
            autoComplete="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className={fieldClass}
            placeholder="10-digit Indian mobile"
            required
          />
          {errors.phone ? (
            <span className="mt-1 block text-xs text-red-600">
              {errors.phone}
            </span>
          ) : null}
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="font-medium text-foreground">
            Email <span className="font-normal text-muted">(optional)</span>
          </span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className={fieldClass}
            placeholder="you@example.com"
          />
          {errors.email ? (
            <span className="mt-1 block text-xs text-red-600">
              {errors.email}
            </span>
          ) : null}
        </label>

        <label className="block text-sm">
          <span className="font-medium text-foreground">Related business</span>
          <select
            name="business"
            value={form.business}
            onChange={(e) => update("business", e.target.value)}
            className={fieldClass}
          >
            {businessOptions.map((opt) => (
              <option key={opt.value || "general"} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="block text-sm">
        <span className="font-medium text-foreground">Message</span>
        <textarea
          name="message"
          rows={5}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          className={`${fieldClass} resize-y`}
          placeholder="Tell us how we can help…"
          required
        />
        {errors.message ? (
          <span className="mt-1 block text-xs text-red-600">
            {errors.message}
          </span>
        ) : null}
      </label>

      <Button type="submit" className="w-full sm:w-auto">
        {whatsappReady
          ? "Send via WhatsApp"
          : emailConfigured
            ? "Send via Email"
            : "Submit Enquiry"}
      </Button>

      {submittedHint ? (
        <p className="text-sm leading-relaxed text-muted" role="status">
          {submittedHint}
        </p>
      ) : (
        <p className="text-xs leading-relaxed text-muted">
          Enquiries are confirmed only after the Koofiya team responds.
          {!whatsappReady && !emailConfigured
            ? " Configure WhatsApp or email to enable sending."
            : null}
        </p>
      )}
    </form>
  );
}
