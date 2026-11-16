import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "dark" | "whatsapp";

const variants: Record<Variant, string> = {
  primary:
    "bg-foreground text-white hover:bg-[#2a2f2d] border border-transparent",
  secondary:
    "bg-transparent text-foreground border border-border hover:border-foreground/40 hover:bg-background-soft",
  ghost:
    "bg-transparent text-foreground border border-transparent hover:bg-background-soft",
  dark: "bg-dark text-white hover:bg-[#2a302e] border border-transparent",
  whatsapp:
    "bg-[#25D366] text-white hover:bg-[#1ebe57] border border-transparent",
};

type CommonProps = {
  children: ReactNode;
  className?: string;
  variant?: Variant;
};

type ButtonAsButton = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className"> & {
    href: string;
  };

export function Button({
  children,
  className = "",
  variant = "primary",
  ...props
}: ButtonAsButton | ButtonAsLink) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-medium tracking-wide transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-50 disabled:pointer-events-none";

  const classes = `${base} ${variants[variant]} ${className}`;

  if ("href" in props && props.href) {
    const { href, ...rest } = props;
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButton;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
