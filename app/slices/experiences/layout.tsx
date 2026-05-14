"use client";
import { useRouter, usePathname } from "next/navigation";

const options = ["apple", "banana", "orange"];

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
      <nav className="m-4 fixed top-16 z-999">
        <select
          className="backdrop-blur-md decoration-none rounded-2xl px-4 py-1 border border-[--border-color]/10 shadow-[inset_0_1px_4px_rgba(255,255,255,0.3),inset_0_-4px_2px_rgba(0,0,0,0.2)]"
          name="experience"
          id="experience"
          value={currentSlug}
          onChange={handleChange}
        >
          {options.map((option) => (
            <option
              className="bg-[#00000055] backdrop-blur-md border-white/10 shadow-[inset_0_1px_4px_rgba(255,255,255,0.3),inset_0_-4px_2px_rgba(0,0,0,0.2)]"
              key={option}
              value={option}
            >
              {option}
            </option>
          ))}
        </select>
      </nav>
      <div className="flex justify-center w-full">{children}</div>
    </div>
  );
}
