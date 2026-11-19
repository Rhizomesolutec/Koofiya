import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { businesses } from "@/lib/data/businesses";
import { siteConfig } from "@/lib/data/site";
import { Container } from "@/components/ui/Container";
import { CopyrightYear } from "@/components/layout/CopyrightYear";

function displayContact(
  value: string,
  placeholder: string,
): { text: string; href?: string } {
  if (!value) return { text: placeholder };
  if (value.includes("@")) return { text: value, href: `mailto:${value}` };
  if (/^\+?[\d\s-]+$/.test(value)) {
    return { text: value, href: `tel:${value.replace(/\s/g, "")}` };
  }
  return { text: value };
}

export function Footer() {
  const email = displayContact(
    siteConfig.contact.email,
    siteConfig.contact.emailPlaceholder,
  );
  const phone = displayContact(
    siteConfig.contact.phone,
    siteConfig.contact.phonePlaceholder,
  );
  const address = displayContact(
    siteConfig.contact.address,
    siteConfig.contact.addressPlaceholder,
  );

  const socialEntries = Object.entries(siteConfig.social).filter(
    ([, url]) => Boolean(url),
  );

  return (
    <footer className="border-t border-border bg-background-soft">
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo size="lg" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
              {siteConfig.tagline} A diversified group building focused
              businesses across travel, food, CCTV, recruitment and home
              services.
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-8">
            <div>
              <h3 className="text-xs font-medium uppercase tracking-[0.16em] text-foreground">
                Navigate
              </h3>
              <ul className="mt-4 space-y-2.5">
                {siteConfig.nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/dry-fruits"
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    Shop Honey
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-medium uppercase tracking-[0.16em] text-foreground">
                Businesses
              </h3>
              <ul className="mt-4 space-y-2.5">
                {businesses.map((biz) => (
                  <li key={biz.slug}>
                    <Link
                      href={`/businesses/${biz.slug}`}
                      className="text-sm text-muted transition-colors hover:text-foreground"
                    >
                      {biz.shortName}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-medium uppercase tracking-[0.16em] text-foreground">
                Contact
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm text-muted">
                <li>
                  {email.href ? (
                    <a
                      href={email.href}
                      className="transition-colors hover:text-foreground"
                    >
                      {email.text}
                    </a>
                  ) : (
                    <span className="italic">{email.text}</span>
                  )}
                </li>
                <li>
                  {phone.href ? (
                    <a
                      href={phone.href}
                      className="transition-colors hover:text-foreground"
                    >
                      {phone.text}
                    </a>
                  ) : (
                    <span className="italic">{phone.text}</span>
                  )}
                </li>
                <li>
                  <span className={!address.href ? "italic" : undefined}>
                    {address.text}
                  </span>
                </li>
              </ul>

              {socialEntries.length > 0 ? (
                <ul className="mt-5 flex flex-wrap gap-3">
                  {socialEntries.map(([key, url]) => (
                    <li key={key}>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm capitalize text-muted underline-offset-4 hover:text-foreground hover:underline"
                      >
                        {key}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-5 text-xs italic text-muted">
                  [Social links — configure when available]
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted">
            © <CopyrightYear /> Koofiya Group. All rights reserved.
          </p>
          <div className="flex gap-5 text-sm text-muted">
            <Link href="/privacy" className="hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-foreground">
              Terms of Use
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
