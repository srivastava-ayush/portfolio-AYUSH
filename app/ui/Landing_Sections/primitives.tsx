import type { ElementType, ReactNode } from "react";
import { cn } from "../utils/cn";

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("relative w-full max-w-(--landing-frame)", className)}>{children}</div>;
}

export function Section({
  children,
  className,
  space = "top",
}: {
  children: ReactNode;
  className?: string;
  space?: "top" | "both";
}) {
  return (
    <section className={cn("w-full", space === "both" ? "py-(--landing-section-space)" : "pt-(--landing-section-space)", className)}>
      {children}
    </section>
  );
}

export function Heading({
  as: Tag = "h2",
  variant,
  children,
  className,
}: {
  as?: ElementType;
  variant: "display" | "work";
  children: ReactNode;
  className?: string;
}) {
  return (
    <Tag className={cn(
      variant === "display" ? "text-(length:--landing-heading-display)" : "text-(length:--landing-heading-work)",
      className,
    )}>
      {children}
    </Tag>
  );
}

export function Text({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("text-(length:--landing-copy) leading-(--landing-line-copy)", className)}>{children}</p>;
}
