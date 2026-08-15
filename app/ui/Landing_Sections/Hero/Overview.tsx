import Link from "next/link";
import { MapPin, Briefcase, Envelope } from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";

function OverviewItem({
  icon: Icon,
  label,
  children,
  href,
}: {
  icon: Icon;
  label: string;
  children: React.ReactNode;
  href?: string;
}) {
  const content = (
    <>
      <Icon size={15} weight="duotone" className="shrink-0 text-[var(--accent-color)]" />

      <span className="text-xs font-mono text-[var(--text-color)] truncate">
        {children}
      </span>
    </>
  );

  return (
    <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[var(--border-color)] last:border-b-0">
      {href ? (
        <Link
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          className="flex items-center gap-2 min-w-0 w-full hover:opacity-80 transition-opacity"
        >
          {content}
        </Link>
      ) : (
        <div className="flex items-center gap-2 min-w-0 w-full">{content}</div>
      )}
    </div>
  );
}

export default function Overview() {
  return (
    <section className="grid sm:grid-cols-3">
      <OverviewItem icon={Briefcase} label="role">
        Full-Stack Engineer
      </OverviewItem>
      <OverviewItem
        icon={MapPin}
        label="location"
        href="https://www.google.com/maps/search/?api=1&query=Noida%2C%20Uttar%20Pradesh%2C%20India"
      >
        Noida, UP, India
      </OverviewItem>
      <OverviewItem icon={Envelope} label="email" href="mailto:constayush@gmail.com">
        constayush@gmail.com
      </OverviewItem>
    </section>
  );
}
