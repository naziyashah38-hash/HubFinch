import { RepoSkeletons } from "./Loader";
import RepoCard from "./RepoCard";
import Pagination from "./Pagination";
import ErrorMessage from "./ErrorMessage";

export default function RepoList({ repos, loading, error, page, totalPages, onPageChange, onRetry, username }) {
  if (error) return <ErrorMessage error={error} username={username} onRetry={onRetry} />;
  if (loading && repos.length === 0) return <RepoSkeletons />;

  if (!loading && repos.length === 0) {
    return (
      <div className="card p-8 text-center text-ink/70 dark:text-cream/70">
        {username} has no public repositories yet.
      </div>
    );
  }

  return (
    <>
      <div
        className={`grid gap-4 sm:grid-cols-2 transition-opacity ${loading ? "opacity-50" : ""}`}
        aria-busy={loading}
      >
        {repos.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>
      <Pagination page={page} totalPages={totalPages} onChange={onPageChange} disabled={loading} />
    </>
  );
}