import { useEffect, useRef, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getRepos, getUser, REPOS_PER_PAGE } from "../api/github";
import { addRecent } from "../utils/recent";
import ProfileCard from "../components/ProfileCard";
import RepoList from "../components/RepoList";
import ErrorMessage from "../components/ErrorMessage";
import { ProfileSkeleton, RepoSkeletons } from "../components/Loader";

export default function UserPage() {
  const { username } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10) || 1);

  const [user, setUser] = useState(null);
  const [userError, setUserError] = useState(null);
  const [repos, setRepos] = useState([]);
  const [reposLoading, setReposLoading] = useState(true);
  const [reposError, setReposError] = useState(null);
  const [retryKey, setRetryKey] = useState(0);
  const reposTop = useRef(null);

  // 1) Load the profile whenever the username changes
  useEffect(() => {
    const controller = new AbortController();
    setUser(null);
    setUserError(null);

    getUser(username, controller.signal)
      .then((data) => {
        setUser(data);
        addRecent(data.login);
        document.title = `${data.name || data.login} · Hubfinch`;
      })
      .catch((err) => {
        if (err.name !== "AbortError") setUserError(err);
      });

    return () => controller.abort();
  }, [username, retryKey]);

  // 2) Load repos whenever the username or the page changes
  useEffect(() => {
    const controller = new AbortController();
    setReposLoading(true);
    setReposError(null);

    getRepos(username, page, REPOS_PER_PAGE, controller.signal)
      .then((data) => {
        setRepos(data);
        setReposLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setReposError(err);
        setReposLoading(false);
      });

    return () => controller.abort();
  }, [username, page, retryKey]);

  // Reset the repo list when switching to a different user
  useEffect(() => setRepos([]), [username]);

  const totalPages = user ? Math.ceil(user.public_repos / REPOS_PER_PAGE) : 0;
  const retry = () => setRetryKey((k) => k + 1);

  function goToPage(next) {
    setSearchParams(next === 1 ? {} : { page: String(next) });
    reposTop.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  if (userError) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <ErrorMessage error={userError} username={username} onRetry={retry} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <Link to="/" className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium hover:text-ember">
        <ArrowLeft size={16} aria-hidden /> New search
      </Link>

      <div className="grid items-start gap-8 lg:grid-cols-[340px_1fr]">
        <div className="lg:sticky lg:top-24">{user ? <ProfileCard user={user} /> : <ProfileSkeleton />}</div>

        <section ref={reposTop} className="scroll-mt-24">
          <div className="mb-4 flex items-baseline justify-between gap-4">
            <h2 className="text-2xl font-extrabold tracking-tight">Repositories</h2>
            {user && totalPages > 1 && (
              <p className="text-sm text-ink/60 dark:text-cream/60">
                Page {page} of {totalPages}
              </p>
            )}
          </div>

          {!user && !reposError ? (
            <RepoSkeletons />
          ) : (
            <RepoList
              repos={repos}
              loading={reposLoading}
              error={reposError}
              page={page}
              totalPages={totalPages}
              onPageChange={goToPage}
              onRetry={retry}
              username={username}
            />
          )}
        </section>
      </div>
    </div>
  );
}