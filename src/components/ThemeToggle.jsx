import { Moon, Sun } from "lucide-react";
import useTheme from "../hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="grid h-10 w-10 place-items-center rounded-full border border-ink/15 transition-colors hover:bg-sage/25 dark:border-cream/15 dark:hover:bg-sage/15"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}