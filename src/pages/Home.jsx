import { useState } from "react";
import { Link } from "react-router-dom";
import FinchMark from "../components/FinchMark";
import SearchBar from "../components/SearchBar";
import { clearRecent, getRecent } from "../utils/recent";

const SUGGESTIONS = ["torvalds", "gaearon", "sindresorhus"];

export default function Home() {
  const [recent, setRecent] = useState(getRecent);

  return (
    <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-[1.4fr_1fr] md:py-24">
      <div>
        <h1 className="text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-7xl">
          Find anyone on GitHub.
        </h1>
        <p className="mt-5 max-w-md text-lg leading-relaxed text-ink/70 dark:text-cream/70">
          {/* Type a username to see their profile, follower count and public repositories. */}
            Look up a person to see their profile and repositories, or search every public repository to find its link.
        </p>

        <div className="mt-8 max-w-lg">
          <SearchBar size="lg" autoFocus />
        </div>

        <div className="mt-6 space-y-3 text-sm">
          <Chips label="Try" names={SUGGESTIONS} />
          {recent.length > 0 && (
            <Chips
              label="Recent"
              names={recent}
              onClear={() => {
                clearRecent();
                setRecent([]);
              }}
            />
          )}
        </div>
      </div>

      <div className="hidden justify-self-center md:block" aria-hidden>
        <FinchMark className="h-72 w-72 lg:h-80 lg:w-80" />
      </div>
    </section>
  );
}

function Chips({ label, names, onClear }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-ink/60 dark:text-cream/60">{label}</span>
      {names.map((name) => (
        <Link
          key={name}
          to={`/user/${name}`}
          className="rounded-full border border-ink/15 px-3 py-1 font-medium transition-colors hover:bg-sage/25 dark:border-cream/15 dark:hover:bg-sage/15"
        >
          {name}
        </Link>
      ))}
      {onClear && (
        <button onClick={onClear} className="ml-1 text-ink/60 underline hover:text-ember dark:text-cream/60">
          Clear
        </button>
      )}
    </div>
  );
}