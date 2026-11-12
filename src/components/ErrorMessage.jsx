import { Link } from "react-router-dom";
import { Clock, SearchX, WifiOff, TriangleAlert } from "lucide-react";
import { formatTime } from "../utils/format";

export default function ErrorMessage({ error, username, onRetry }) {
  const content = describe(error, username);
  const Icon = content.icon;

  return (
    <div role="alert" className="card mx-auto max-w-xl p-8 text-center">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-ember/10 text-ember">
        <Icon size={28} />
      </div>
      <h2 className="mt-5 text-2xl font-extrabold tracking-tight">{content.title}</h2>
      <p className="mx-auto mt-2 max-w-md text-ink/70 dark:text-cream/70">{content.body}</p>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        {onRetry && content.canRetry && (
          <button onClick={onRetry} className="btn-primary">
            Try again
          </button>
        )}
        <Link to="/" className="btn-quiet">
          Search another user
        </Link>
      </div>
    </div>
  );
}

function describe(error, username) {
  switch (error?.type) {
    case "not_found":
      return {
        icon: SearchX,
        title: `No user named "${username}"`,
        body: "Check the spelling. GitHub usernames don't include the @ sign.",
        canRetry: false,
      };
    case "rate_limit": {
      const { resetAt, authenticated } = error.details;
      const when = resetAt ? `The limit resets at ${formatTime(resetAt)}.` : "Try again in a few minutes.";
      const tip = authenticated
        ? ""
        : " You can raise the limit from 60 to 5,000 requests an hour by adding a GitHub token (see the README).";
      return {
        icon: Clock,
        title: "GitHub's request limit is reached",
        body: `${when}${tip}`,
        canRetry: true,
      };
    }
    case "network":
      return { icon: WifiOff, title: "You're offline", body: error.message, canRetry: true };
    default:
      return {
        icon: TriangleAlert,
        title: "Something went wrong",
        body: error?.message || "An unexpected error occurred.",
        canRetry: true,
      };
  }
}