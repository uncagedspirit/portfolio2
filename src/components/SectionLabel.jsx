export default function SectionLabel({ children }) {
  return (
    <div
      className="flex items-center gap-3 text-[9px] uppercase tracking-[0.18em] mb-12"
      style={{ color: "var(--muted)" }}
    >
      {children}
      <span className="flex-1 h-px" style={{ background: "var(--border)" }} />
    </div>
  );
}
