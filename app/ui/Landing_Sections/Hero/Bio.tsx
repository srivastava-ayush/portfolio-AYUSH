import SectionHeading from "./SectionHeading";

export default function Bio() {
  return (
    <section className="mt-10 mb-10">
      <SectionHeading command="about --verbose" />

      <div className="mt-6 px-4 sm:px-6">
        <div className=" ">
          <p className="text-sm text-[var(--secondary-text)] leading-relaxed font-mono w-full">
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
        </div>
      </div>
    </section>
  );
}
