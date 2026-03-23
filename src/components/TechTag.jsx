export default function TechTag({ children }) {
  return (
    <span
      className="text-[9px] tracking-[0.06em] px-1.5 py-0.5"
      style={{ color: "var(--muted)", border: "1px solid var(--border)" }}
    >
      {children}
    </span>
  );
}
