"use client";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import TerminalWindow from "../ui/terminal/TerminalWindow";

export default function Page() {
  const router = useRouter();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full lg:h-[98vh] h-[95vh]"
    >
      <TerminalWindow onClose={() => router.push("/")} />
    </motion.div>
  );
}
