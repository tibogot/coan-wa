import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

type CtaLinkProps = {
  href: string;
  children: ReactNode;
  /** `solid` = one orange pill. `split` = label + arrow as separate orange blocks. */
  variant?: "solid" | "split";
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;

const labelClass =
  "font-pp-neue-montreal-mono bg-secondary text-foreground group-hover:bg-secondary/90 inline-flex items-center px-5 py-2.5 text-xs tracking-wide uppercase transition-colors duration-200 md:px-6 md:py-3";

const arrowClass =
  "bg-secondary text-foreground group-hover:bg-secondary/90 inline-flex items-center justify-center px-3 transition-colors duration-200 md:px-3.5";

export default function CtaLink({
  href,
  children,
  variant = "solid",
  className = "",
  ...rest
}: CtaLinkProps) {
  if (variant === "split") {
    return (
      <Link
        href={href}
        className={`group inline-flex w-fit cursor-pointer items-stretch gap-1 ${className}`}
        {...rest}
      >
        <span className={labelClass}>{children}</span>
        <span className={arrowClass} aria-hidden="true">
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
      className={`${labelClass} w-fit cursor-pointer rounded-px ${className}`}
      {...rest}
    >
      {children}
    </Link>
  );
}
