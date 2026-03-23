export default function SectionLabel({ children }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        fontSize: 9,
        textTransform: "uppercase",
        letterSpacing: "0.18em",
        marginBottom: 48,
        color: "var(--muted)",
      }}
    >
      {children}
      <span style={{ flex: 1, height: 1, background: "var(--border)" }} />
    </div>
  );
}