import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  href?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  priority?: boolean;
};

const sizes = {
  sm: { width: 160, height: 64, className: "h-11 w-auto sm:h-12" },
  md: { width: 200, height: 80, className: "h-12 w-auto sm:h-14" },
  lg: { width: 240, height: 96, className: "h-14 w-auto sm:h-[4.25rem]" },
};

export function Logo({
  href = "/",
  className = "",
  size = "md",
  showText = false,
  priority = false,
}: LogoProps) {
  const dim = sizes[size];

  const mark = (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Image
        src="/images/koofiya-logo.png"
        alt="Koofiya"
        width={dim.width}
        height={dim.height}
        priority={priority}
        className={`${dim.className} object-contain object-left`}
      />
      {showText ? (
        <span className="hidden text-[0.95rem] font-semibold tracking-tight text-foreground sm:inline">
          Group
        </span>
      ) : null}
    </span>
  );

  if (!href || href === "") return mark;

  return (
    <Link
      href={href}
      className="inline-flex shrink-0"
      aria-label="Koofiya Group home"
    >
      {mark}
    </Link>
  );
}
