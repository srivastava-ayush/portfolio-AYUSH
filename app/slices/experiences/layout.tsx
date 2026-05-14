"use client";
import { CodeIcon, CopyIcon } from "@phosphor-icons/react";
import { useRouter, usePathname } from "next/navigation";

const options = [ "parallax-reveal", "pop-blur", "reveal-slices"];

export default function ExperiencesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const currentSlug = pathname.split("/").pop() || "apple";

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    router.push(`/slices/experiences/${e.target.value}`);
  };

  return (
    <div className="flex flex-col w-full min-h-screen">
      <nav className="m-4 fixed top-16 z-999 flex justify-center items-center gap-4 text-[var(--secondary-text)] ">
        <select
          className="backdrop-blur-md bg-[var(--bg-color)]/50  decoration-none rounded-2xl px-4 py-1 border border-[--border-color]/10 shadow-[inset_0_1px_4px_rgba(255,255,255,0.3),inset_0_-4px_2px_rgba(0,0,0,0.2)]"
          name="experience"
          id="experience"
          value={currentSlug}
          onChange={handleChange}
        >
          {options.map((option) => (
            <option
              className="bg-[#ffffffca] backdrop-blur-md border-white/10 shadow-[inset_0_1px_4px_rgba(255,255,255,0.3),inset_0_-4px_2px_rgba(0,0,0,0.2)]"
              key={option}
              value={option}
            >
              {option}
            </option>
          ))}
        </select>
  <button className="bg-[var(--bg-color)]/50   flex justify-center items-center gap-1 cursor-pointer  backdrop-blur-md decoration-none rounded-2xl px-4 py-1 border border-[--border-color]/10 shadow-[inset_0_1px_4px_rgba(255,255,255,0.3),inset_0_-4px_2px_rgba(0,0,0,0.2)]" >
          view code <CodeIcon/>
        </button>
        <button className="bg-[var(--bg-color)]/50   flex justify-center items-center gap-1 cursor-pointer  backdrop-blur-md decoration-none rounded-2xl px-4 py-1 border border-[--border-color]/10 shadow-[inset_0_1px_4px_rgba(255,255,255,0.3),inset_0_-4px_2px_rgba(0,0,0,0.2)]" >
          copy code <CopyIcon/>
        </button>

         
      </nav>
      <div className="flex justify-center w-full">{children}</div>
    </div>
  );
}
