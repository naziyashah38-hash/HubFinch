export default function FinchMark({ className = "w-8 h-8", title }) {
  return (
    <svg viewBox="0 0 64 64" className={className} role={title ? "img" : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      <circle cx="29" cy="28" r="14" fill="none" stroke="#9CAF88" strokeWidth="6" />
      <line x1="40" y1="39" x2="52" y2="51" stroke="#9CAF88" strokeWidth="7" strokeLinecap="round" />
      <circle cx="29" cy="28" r="5.5" fill="#E8412C" />
      <polygon points="12,23 3,28 12,33" fill="#E8412C" />
    </svg>
  );
}