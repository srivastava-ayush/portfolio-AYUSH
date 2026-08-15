export default function Bio() {
  return (
    <section className=" py-6">
      <div className="flex items-center w-full  border-y border-[var(--border-color)] mb-4">
        <span className="px-2 border-r border-[var(--border-color)] h-6 flex items-center font-mono text-[10px] text-[var(--secondary-text)]">$</span>
        <span className="px-2 h-6 flex items-center font-mono text-[10px] text-[var(--secondary-text)]">about --verbose</span>
      </div>
      <p className="px-4 sm:px-6 text-sm text-[var(--secondary-text)] leading-relaxed font-mono w-full">
        <span className="text-[var(--secondary-text)]">
          Engineer from India specializing in the{" "}
        </span>
        <span className="font-semibold text-[var(--text-color)]">
          TypeScript/Node.js ecosystem
        </span>
        <span className="text-[var(--secondary-text)]">
          , building scalable applications with a focus on clean code and
          developer experience. I work across the{" "}
        </span>
        <span className="font-semibold text-[var(--text-color)]">full stack</span>
        <span className="text-[var(--secondary-text)]"> - from </span>
        <span className="font-semibold text-[var(--text-color)]">
          backend APIs
        </span>
        <span className="text-[var(--secondary-text)]"> and </span>
        <span className="font-semibold text-[var(--text-color)]">database design</span>
        <span className="text-[var(--secondary-text)]">
          {" "}to responsive{" "}
        </span>
        <span className="font-semibold text-[var(--text-color)]">
          frontend interfaces
        </span>
        <span className="text-[var(--secondary-text)]">
          , using React, Next.js, Bun, and PostgreSQL.
        </span>
        <br />
        Most of what I build is shaped by one question:
        <span className="text-[var(--text-color)] italic">
          {" "}does this stay fast and cost less as it scales?
        </span>
      </p>
    </section>
  );
}
