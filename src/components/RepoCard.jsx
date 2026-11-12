import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, Copy, GitFork, Star } from "lucide-react";
import { formatCount, timeAgo } from "../utils/format";

export default function RepoCard({ repo, detailed = false }) {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(repo.html_url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard can be blocked; the link is still visible and clickable
    }
  }

  return (
    <article className="card flex flex-col p-5 transition-colors hover:border-sage-dark">
      <div className="flex items-start justify-between gap-3">
        <h3 className="min-w-0 break-words text-lg font-extrabold leading-snug">
          {detailed && (
            <>
              <Link to={`/user/${repo.owner.login}`} className="font-semibold opacity-70 hover:text-ember hover:opacity-100">
                {repo.owner.login}
              </Link>
              <span className="opacity-40"> / </span>
            </>
          )}
          <a href={repo.html_url} target="_blank" rel="noreferrer" className="hover:text-ember">
            {repo.name}
          </a>
        </h3>
        {repo.fork && (
          <span className="shrink-0 rounded-full bg-sage/30 px-2 py-0.5 text-xs font-semibold dark:bg-sage/20">
            Fork
          </span>
        )}
      </div>

      <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-ink/70 dark:text-cream/70">
        {repo.description || "No description provided."}
      </p>

      {detailed && (
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-sage/20 px-3 py-2 text-xs dark:bg-sage/10">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
            className="min-w-0 flex-1 truncate font-medium hover:text-ember"
            title={repo.html_url}
          >
            {repo.html_url.replace("https://", "")}
          </a>
          <button
            type="button"
            onClick={copyLink}
            aria-label="Copy repository link"
            className="shrink-0 rounded-md p-1 transition-colors hover:bg-sage/30"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
          </button>
          <span className="sr-only" aria-live="polite">
            {copied ? "Link copied" : ""}
          </span>
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
        {repo.language && (
          <span className="flex items-center gap-1.5 font-medium">
            <span className="h-2.5 w-2.5 rounded-full bg-sage" aria-hidden />
            {repo.language}
          </span>
        )}
        <span className="flex items-center gap-1" title="Stars">
          <Star size={14} aria-hidden /> {formatCount(repo.stargazers_count)}
        </span>
        <span className="flex items-center gap-1" title="Forks">
          <GitFork size={14} aria-hidden /> {formatCount(repo.forks_count)}
        </span>
      </div>
      <p className="mt-2 text-xs text-ink/50 dark:text-cream/50">
        Updated {timeAgo(repo.pushed_at || repo.updated_at)}
      </p>
    </article>
  );
}