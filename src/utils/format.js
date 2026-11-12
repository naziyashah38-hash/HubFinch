const compact = new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 });
export const formatCount = (n) => compact.format(n ?? 0);

export function formatDate(iso) {
  return new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(new Date(iso));
}

export function timeAgo(iso) {
  const seconds = Math.round((new Date(iso) - Date.now()) / 1000);
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  const units = [
    ["year", 31536000],
    ["month", 2592000],
    ["week", 604800],
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
  ];
  for (const [unit, size] of units) {
    if (Math.abs(seconds) >= size) return rtf.format(Math.round(seconds / size), unit);
  }
  return "just now";
}

export function formatTime(date) {
  return new Intl.DateTimeFormat("en", { hour: "numeric", minute: "2-digit" }).format(date);
}

export const isValidUsername = (name) => /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i.test(name);