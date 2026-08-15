import Image from "next/image";
import SectionHeading from "./SectionHeading";
import TypescriptIcon from "../../../../public/icons/typescript.svg";
import NextjsIcon from "../../../../public/icons/nextjs.svg";
import NodejsIcon from "../../../../public/icons/nodejs.svg";
import GolangIcon from "../../../../public/icons/golang.svg";
import PostgresqlIcon from "../../../../public/icons/postgresql.svg";
import PythonIcon from "../../../../public/icons/python.svg";

const currentStack = [
  {
    name: "TypeScript",
    icon: TypescriptIcon,
    href: "https://www.typescriptlang.org/",
  },
  { name: "Next.js", icon: NextjsIcon, href: "https://nextjs.org/" },
  { name: "Node.js", icon: NodejsIcon, href: "https://nodejs.org/" },
  { name: "Go", icon: GolangIcon, href: "https://go.dev/" },
  {
    name: "PostgreSQL",
    icon: PostgresqlIcon,
    href: "https://www.postgresql.org/",
  },
  { name: "Python", icon: PythonIcon, href: "https://www.python.org/" },
];

export default function CurrentStack() {
  return (
    <section className="mt-10">
      <SectionHeading command="what I ship with --list" />

      <div className="my-6 flex flex-wrap gap-2 px-4 sm:px-6">
        {currentStack.map(({ name, icon, href }) => (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            title={name}
            className="group flex items-center gap-2 border border-[var(--border-color)] bg-[var(--glass-bg-color)] px-3 py-1.5 rounded-md hover:border-[var(--accent-color)] hover:bg-[var(--accent-color)]/10 transition-all duration-200"
          >
            <Image
              unoptimized
              src={icon}
              alt={name}
              width={14}
              height={14}
              className="brand-icon group-hover:scale-110 transition-transform"
            />
            <span className="text-[11px] font-mono text-[var(--secondary-text)] group-hover:text-[var(--accent-color)] transition-colors">
              {name}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
