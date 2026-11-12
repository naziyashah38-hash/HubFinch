import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { isValidUsername } from "../utils/format";

const MODES = {
  user: { label: "Users", placeholder: "GitHub username" },
  repo: { label: "Repositories", placeholder: "Search repositories, e.g. react router" },
};

export default function SearchBar({
  size = "lg",
  defaultValue = "",
  defaultMode = "user",
  autoFocus = false,
}) {
  const [value, setValue] = useState(defaultValue);
  const [mode, setMode] = useState(defaultMode);
  const [problem, setProblem] = useState("");
  const navigate = useNavigate();
  const large = size === "lg";

  function changeMode(next) {
    setMode(next);
    setProblem("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    const text = value.trim();

    if (!text) {
      return setProblem(mode === "user" ? "Type a GitHub username first." : "Type something to search for.");
    }

    if (mode === "user") {
      if (!isValidUsername(text)) {
        return setProblem("Usernames use letters, numbers and single hyphens only.");
      }
      setProblem("");
      navigate(`/user/${text}`);
    } else {
      setProblem("");
      navigate(`/repos?q=${encodeURIComponent(text)}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} role="search" className="w-full">
      {/* Large bar: segmented tabs above the input */}
      {large && (
        <div
          role="tablist"
          aria-label="Search type"
          className="mb-3 inline-flex rounded-full border border-ink/15 p-1 dark:border-cream/15"
        >
          {Object.entries(MODES).map(([key, m]) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={mode === key}
              onClick={() => changeMode(key)}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                mode === key ? "bg-sage text-ink" : "hover:bg-sage/25 dark:hover:bg-sage/15"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      )}

      <div
        className={`flex items-center gap-2 rounded-full border bg-white/70 transition-colors focus-within:border-ember dark:bg-ink-soft ${
          problem ? "border-ember" : "border-ink/15 dark:border-cream/15"
        } ${large ? "p-2 pl-5" : "p-1 pl-2"}`}
      >
        {/* Small bar (navbar): compact dropdown inside the pill */}
        {!large && (
          <select
            value={mode}
            onChange={(e) => changeMode(e.target.value)}
            aria-label="Search type"
            className="rounded-full bg-sage/30 px-2 py-1 text-xs font-semibold dark:bg-sage/20"
          >
            <option value="user" className="bg-cream text-ink dark:bg-ink-soft dark:text-cream">
              Users
            </option>
            <option value="repo" className="bg-cream text-ink dark:bg-ink-soft dark:text-cream">
              Repos
            </option>
          </select>
        )}
        {large && <Search size={20} className="shrink-0 opacity-60" aria-hidden />}

        <input
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            if (problem) setProblem("");
          }}
          autoFocus={autoFocus}
          autoComplete="off"
          autoCapitalize="none"
          spellCheck={false}
          placeholder={MODES[mode].placeholder}
          aria-label={MODES[mode].placeholder}
          aria-invalid={Boolean(problem)}
          className={`min-w-0 flex-1 bg-transparent placeholder:text-ink/40 dark:placeholder:text-cream/40 ${
            large ? "py-2 text-lg" : "py-1.5 text-sm"
          }`}
          style={{ outline: "none" }}
        />
        <button type="submit" className={`btn-primary ${large ? "" : "!px-4 !py-1.5"}`}>
          Find
        </button>
      </div>

      {problem && (
        <p role="alert" className="mt-2 pl-5 text-sm font-medium text-ember">
          {problem}
        </p>
      )}
    </form>
  );
}