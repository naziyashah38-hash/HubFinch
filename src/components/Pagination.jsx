import { ChevronLeft, ChevronRight } from "lucide-react";

function getPages(current, total) {
  const pages = new Set([1, total, current, current - 1, current + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  const out = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) out.push("gap-" + p);
    out.push(p);
  });
  return out;
}

export default function Pagination({ page, totalPages, onChange, disabled }) {
  if (totalPages <= 1) return null;

  return (
    <nav aria-label="Repository pages" className="mt-8 flex flex-wrap items-center justify-center gap-2">
      <button
        onClick={() => onChange(page - 1)}
        disabled={disabled || page <= 1}
        className="btn-quiet !px-3"
        aria-label="Previous page"
      >
        <ChevronLeft size={18} />
      </button>

      {getPages(page, totalPages).map((p) =>
        typeof p === "string" ? (
          <span key={p} className="px-1 opacity-50" aria-hidden>
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onChange(p)}
            disabled={disabled}
            aria-current={p === page ? "page" : undefined}
            className={`h-10 min-w-10 rounded-full px-3 text-sm font-semibold transition-colors ${
              p === page ? "bg-sage text-ink" : "hover:bg-sage/25 dark:hover:bg-sage/15"
            }`}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => onChange(page + 1)}
        disabled={disabled || page >= totalPages}
        className="btn-quiet !px-3"
        aria-label="Next page"
      >
        <ChevronRight size={18} />
      </button>
    </nav>
  );
}