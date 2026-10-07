import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import GlitchText from "@/components/GlitchText";

type CtaLinkProps = {
  href: string;
  children: ReactNode;
  /** `solid` = one pill. `split` = label + arrow as separate blocks. */
  variant?: "solid" | "split";
  /** `orange` = brand fill. `dark` = black fill with soft-white text. */
  tone?: "orange" | "dark";
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;

const toneClasses = {
  orange: {
    surface:
      "bg-secondary text-foreground group-hover:bg-secondary/90",
  },
  dark: {
    surface:
      "bg-charcoal text-primary group-hover:bg-secondary group-hover:text-primary",
  },
} as const;

const baseLabel =
  "font-pp-neue-montreal-mono inline-flex items-center px-5 py-2.5 text-xs tracking-wide uppercase transition-colors duration-200 md:px-6 md:py-3";

const baseArrow =
  "inline-flex items-center justify-center px-3 transition-colors duration-200 md:px-3.5";

export default function CtaLink({
  href,
  children,
  variant = "solid",
  tone = "orange",
  className = "",
  ...rest
}: CtaLinkProps) {
  const surface = toneClasses[tone].surface;
  // Plain-text labels get the glitch hover; anything else renders untouched.
  const label =
    typeof children === "string" ? <GlitchText>{children}</GlitchText> : children;

  if (variant === "split") {
    return (
      <Link
        href={href}
        className={`group inline-flex w-fit cursor-pointer items-stretch gap-1 ${className}`}
        {...rest}
      >
        <span className={`${baseLabel} ${surface}`}>{label}</span>
        <span className={`${baseArrow} ${surface}`} aria-hidden="true">
          <ArrowRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-0.5"
          />
        </span>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={`${baseLabel} ${surface} w-fit cursor-pointer rounded-px ${className}`}
      {...rest}
    >
      {label}
    </Link>
  );
}
