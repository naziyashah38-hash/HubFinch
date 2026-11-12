import { Link, useLocation, useMatch, useSearchParams } from "react-router-dom";
import FinchMark from "./FinchMark";
import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const userMatch = useMatch("/user/:username");
  const [params] = useSearchParams();
  const { pathname } = useLocation();

  // Decide what the small search bar should show on this page
  let bar = null;
  if (userMatch) bar = { mode: "user", value: userMatch.params.username };
  else if (pathname === "/repos") bar = { mode: "repo", value: params.get("q") || "" };

  return (
    <header className="sticky top-0 z-20 border-b border-ink/10 bg-cream/85 backdrop-blur dark:border-cream/10 dark:bg-ink/85">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2" aria-label="Hubfinch home">
          <FinchMark className="h-9 w-9" />
          <span className="font-display text-xl font-extrabold tracking-tight">Hubfinch</span>
        </Link>

        <div className="ml-auto flex flex-1 items-center justify-end gap-3">
          {bar && (
            <div className="hidden w-full max-w-md sm:block">
              {/* key resets the input when the page or query changes */}
              <SearchBar
                key={`${bar.mode}:${bar.value}`}
                size="sm"
                defaultMode={bar.mode}
                defaultValue={bar.value}
              />
            </div>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}