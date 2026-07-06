import { MoonIcon, SunIcon } from "@phosphor-icons/react";

function ThemeToggleBtn({
  theme,
  toggleTheme,
  mobile = false,
  dock = false,
}: {
  theme: string;
  toggleTheme: () => void;
  mobile?: boolean;
  dock?: boolean;
}) {
  return (
    <button
      aria-label="Toggle theme"
      onClick={toggleTheme}
      className={`hover:bg-[var(--hover-color)] transition-colors ${
        mobile && dock
          ? "w-10 h-10 rounded-lg flex items-center justify-center"
          : mobile
            ? "w-10 h-10 rounded-lg flex items-center justify-center"
            : "w-7 h-7 rounded-sm flex items-center justify-center"
      }`}
    >
      {theme === "dark" ? (
        <MoonIcon size={mobile ? 18 : 14} weight="fill" className="text-[var(--text-color)]" />
      ) : (
        <SunIcon size={mobile ? 18 : 14} weight="fill" className="text-[var(--accent-color)]" />
      )}
    </button>
  );
}

export default ThemeToggleBtn;
