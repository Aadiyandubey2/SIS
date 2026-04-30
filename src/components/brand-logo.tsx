import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

type LogoSize = "xs" | "sm" | "md" | "lg";

interface BrandLogoProps {
  className?: string;
  href?: string;
  markClassName?: string;
  priority?: boolean;
  showText?: boolean;
  size?: LogoSize;
  subtitle?: string;
  textClassName?: string;
}

const markSizes: Record<LogoSize, string> = {
  xs: "h-6 w-6 rounded-md",
  sm: "h-8 w-8 rounded-lg",
  md: "h-9 w-9 rounded-lg",
  lg: "h-12 w-12 rounded-lg",
};

const imageSizes: Record<LogoSize, string> = {
  xs: "24px",
  sm: "32px",
  md: "36px",
  lg: "48px",
};

export function BrandLogo({
  className,
  href,
  markClassName,
  priority = false,
  showText = true,
  size = "md",
  subtitle,
  textClassName,
}: BrandLogoProps) {
  const content = (
    <>
      <span
        className={cn(
          "relative shrink-0 overflow-hidden bg-foreground ring-1 ring-black/10",
          markSizes[size],
          markClassName
        )}
      >
        <Image
          alt={showText ? "" : "SIS logo"}
          className="object-cover"
          fill
          priority={priority}
          sizes={imageSizes[size]}
          src="/icon.png"
        />
      </span>
      {showText && (
        <span className={cn("min-w-0 leading-none", textClassName)}>
          <span className="block truncate font-semibold text-foreground">
            SIS
          </span>
          {subtitle && (
            <span className="mt-1 block truncate text-xs font-medium text-muted-foreground">
              {subtitle}
            </span>
          )}
        </span>
      )}
    </>
  );

  const classes = cn("inline-flex items-center gap-2.5", className);

  if (href) {
    return (
      <Link className={classes} href={href}>
        {content}
      </Link>
    );
  }

  return <div className={classes}>{content}</div>;
}
