export default function TechTag({ children }) {
  return (
    <span
      style={{
        fontSize: 9,
        letterSpacing: "0.06em",
        padding: "2px 6px",
        color: "var(--muted)",
        border: "1px solid var(--border)",
      }}
    >
      {children}
    </span>
  );
}