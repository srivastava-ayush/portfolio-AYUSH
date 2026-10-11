export default function PageWithBorderStrips({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative w-full max-w-(--landing-frame)"
      style={{ "--landing-frame": "57.6rem" } as React.CSSProperties}
    >
      <div className="hidden md:block absolute right-full top-0 bottom-0 w-5 bg-slant-pattern border-y border-l border-[var(--border-color)]" />
      {children}
      <div className="hidden md:block absolute left-full top-0 bottom-0 w-5 bg-slant-pattern border-y border-r border-[var(--border-color)]" />
    </div>
  );
}