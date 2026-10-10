import SectionHeading from "./SectionHeading";
import { Text } from "../primitives";

export default function Bio() {
  return (
    <section className="my-(--landing-block-space)">
      <SectionHeading command="about --verbose" />

      <div className="mt-(--landing-row-space) px-(--landing-gutter)">
        <div className=" ">
          <Text className="text-[var(--secondary-text)] font-mono w-full">
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
          </Text>
        </div>
      </div>
    </section>
  );
}
