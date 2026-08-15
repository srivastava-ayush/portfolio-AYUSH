import Image from "next/image";
import TypescriptIcon from "../../../../public/icons/typescript.svg";
import NextjsIcon from "../../../../public/icons/nextjs.svg";
import NodejsIcon from "../../../../public/icons/nodejs.svg";
import GolangIcon from "../../../../public/icons/golang.svg";
import PostgresqlIcon from "../../../../public/icons/postgresql.svg";

const currentStack = [
  { name: "TypeScript", icon: TypescriptIcon, href: "https://www.typescriptlang.org/" },
  { name: "Next.js", icon: NextjsIcon, href: "https://nextjs.org/" },
  { name: "Node.js", icon: NodejsIcon, href: "https://nodejs.org/" },
  { name: "Go", icon: GolangIcon, href: "https://go.dev/" },
  { name: "PostgreSQL", icon: PostgresqlIcon, href: "https://www.postgresql.org/" },
];

export default function CurrentStack() {
  return (
    <section className="flex flex-col gap-3 py-4 mt-2">
      <div className="flex items-center w-full border-t border-b border-[var(--border-color)]">
        <span className="px-2 border-r border-[var(--border-color)] h-6 flex items-center font-mono text-[10px] text-[var(--secondary-text)]">$</span>
        <span className="px-2 h-6 flex items-center font-mono text-[10px] text-[var(--secondary-text)]">what I ship with --list</span>
      </div>
     
   

      <div className="flex flex-wrap gap-2 px-4 sm:px-6">
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
              className="group-hover:scale-110 grayscale-100 transition-transform"
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
