import { useReveal } from "../hooks/useReveal";

export default function Footer() {
  const ref = useReveal();
  const year = new Date().getFullYear();

  return (
    <footer
      ref={ref}
      className="reveal"
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 12,
        padding: "48px 64px",
      }}
    >
      <div className="serif" style={{ fontStyle: "italic", fontSize: 15, color: "var(--dim)" }}>
        Saakshi Kobarne, {year}
      </div>
      <div style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted)" }}>
        Made with craft · Pune, India
      </div>
    </footer>
  );
}