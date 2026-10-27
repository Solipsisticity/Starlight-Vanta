export const MARK_PATH = "M11 13h10l9.5 27L40 13h4L31 51h-4z";

export default function VantaMark({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="8 8 50 48" className={className} aria-hidden="true">
      <path d={MARK_PATH} fill="#f2efff" />
      <rect x="46" y="46" width="8" height="5" rx="1" fill="#8b5cf6" />
    </svg>
  );
}
