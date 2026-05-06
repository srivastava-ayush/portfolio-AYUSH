

import { AnimatePresence, motion } from "motion/react";
import { MoonIcon, SunIcon } from "@phosphor-icons/react";

function ThemeToggleBtn({
  theme,
  toggleTheme,
  mobile = false,
}: {
  theme: string;
  toggleTheme: () => void;
  mobile?: boolean;
}) {
  return (
    <button
      aria-label="Toggle theme"
      aria-pressed={theme === "light"}
      onClick={toggleTheme}
      className={`relative ${
        mobile ? "w-14 h-7" : "w-11 h-6 mt-2"
      } rounded-full border border-[var(--border-color)]/30 bg-[var(--bg-color)]/50 backdrop-blur-sm overflow-hidden shadow-[inset_0_1px_3px_rgba(0,0,0,0.2)] focus:outline-none focus:ring-2 focus:ring-[var(--text-color)]/10  transition-colors`}
    >
      {/* Background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background:
            theme === "dark"
              ? "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)"
              : "linear-gradient(135deg, #fff9e6 0%, #ffe4a8 100%)",
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Knob */}
      <motion.div
        className={`absolute ${
          mobile ? "top-1 left-1" : "top-0.5 left-0.5"
        } w-5 h-5 rounded-full flex items-center justify-center shadow-lg`}
        animate={{
          x: theme === "dark" ? 0 : mobile ? 24 : 20,
          backgroundColor: theme === "dark" ? "#1a1a1a" : "#fff",
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30,
        }}
      >
        <AnimatePresence mode="wait">
          {theme === "dark" ? (
            <motion.div
              key="moon"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 90 }}
              transition={{ duration: 0.25 }}
            >
              <MoonIcon
                size={mobile ? 12 : 10}
                weight="fill"
                className="text-blue-300"
              />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 90 }}
              transition={{ duration: 0.25 }}
            >
              <SunIcon
                size={mobile ? 12 : 10}
                weight="fill"
                className="text-amber-400"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Dark stars */}
      <AnimatePresence>
        {theme === "dark" && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className={`absolute ${
                mobile ? "top-1 right-3" : "top-1 right-2"
              } w-0.5 h-0.5 bg-white rounded-full`}
            />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.3, 0] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: 0.5,
              }}
              className={`absolute ${
                mobile ? "top-2.5 right-5" : "top-2.5 right-4"
              } w-0.5 h-0.5 bg-white rounded-full`}
            />
          </>
        )}
      </AnimatePresence>

      {/* Light cloud */}
      <AnimatePresence>
        {theme === "light" && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 0.4, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
            className={`absolute ${
              mobile ? "top-2 left-3" : "top-1.5 left-2"
            } w-3 h-1 bg-white rounded-full`}
          />
        )}
      </AnimatePresence>
    </button>
  );
}

export default ThemeToggleBtn;