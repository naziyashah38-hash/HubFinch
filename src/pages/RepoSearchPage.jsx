import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { REPOS_PER_PAGE, searchRepos } from "../api/github";
import RepoCard from "../components/RepoCard";
import Pagination from "../components/Pagination";
import ErrorMessage from "../components/ErrorMessage";
import { RepoSkeletons } from "../components/Loader";

// GitHub's search API only returns the first 1,000 results
const MAX_RESULTS = 1000;

export default function RepoSearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = (searchParams.get("q") || "").trim();
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10) || 1);

  const [results, setResults] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(Boolean(query));
  const [error, setError] = useState(null);
  const [retryKey, setRetryKey] = useState(0);
  const top = useRef(null);

  useEffect(() => {
    document.title = query ? `${query} · Repositories · Hubfinch` : "Search repositories · Hubfinch";
  }, [query]);

  useEffect(() => {
    if (!query) {
      setResults({ items: [], total: 0 });
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    setError(null);

    searchRepos(query, page, REPOS_PER_PAGE, controller.signal)
      .then((data) => {
        setResults({ items: data.items, total: data.total_count });
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError(err);
        setLoading(false);
      });

    return () => controller.abort();
  }, [query, page, retryKey]);

  const totalPages = Math.ceil(Math.min(results.total, MAX_RESULTS) / REPOS_PER_PAGE);

  function goToPage(next) {
    setSearchParams(next === 1 ? { q: query } : { q: query, page: String(next) });
    top.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <Link to="/" className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium hover:text-ember">
        <ArrowLeft size={16} aria-hidden /> New search
      </Link>

      <div ref={top} className="scroll-mt-24">
        {!query ? (
          <p className="text-ink/70 dark:text-cream/70">Type a repository name or topic in the search bar above.</p>
        ) : error ? (
          <ErrorMessage error={error} onRetry={() => setRetryKey((k) => k + 1)} />
        ) : (
          <>
            <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
              <h1 className="text-3xl font-extrabold tracking-tight">
                Repositories for “{query}”
              </h1>
              {!loading && results.total > 0 && (
                <p className="text-sm text-ink/60 dark:text-cream/60">
                  {results.total.toLocaleString()} found
                  {totalPages > 1 && ` · Page ${page} of ${totalPages}`}
                </p>
              )}
            </div>

            {loading && results.items.length === 0 ? (
              <RepoSkeletons />
            ) : !loading && results.total === 0 ? (
              <div className="card p-8 text-center text-ink/70 dark:text-cream/70">
                No repositories match “{query}”. Try fewer or different words.
              </div>
            ) : (
              <>
                <div
                  className={`grid gap-4 transition-opacity sm:grid-cols-2 lg:grid-cols-3 ${loading ? "opacity-50" : ""}`}
                  aria-busy={loading}
                >
                  {results.items.map((repo) => (
                    <RepoCard key={repo.id} repo={repo} detailed />
                  ))}
                </div>
                <Pagination page={page} totalPages={totalPages} onChange={goToPage} disabled={loading} />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}