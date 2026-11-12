import { Link } from "react-router-dom";
import FinchMark from "../components/FinchMark";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <FinchMark className="mx-auto h-24 w-24" />
      <h1 className="mt-6 text-4xl font-extrabold tracking-tight">This page doesn't exist</h1>
      <p className="mt-3 text-ink/70 dark:text-cream/70">The link may be broken or the page was moved.</p>
      <Link to="/" className="btn-primary mt-8">
        Go to search
      </Link>
    </div>
  );
}