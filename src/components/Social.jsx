import { useReveal } from "../hooks/useReveal";
import { socialData, testimonials } from "../data";
import SectionLabel from "./SectionLabel";

function SocialCard({ item }) {
  return (
    <a
      href={item.link}
      target="_blank"
      rel="noreferrer"
      style={{
        display: "block",
        padding: 24,
        position: "relative",
        borderRight: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        color: "inherit",
        textDecoration: "none",
        background: "transparent",
        transition: "background 0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      <span style={{ position: "absolute", top: 24, right: 24, fontSize: 14, color: "var(--border)" }}>↗</span>

      {/* Platform name LARGE (was username) */}
      <div className="serif" style={{ fontStyle: "italic", fontSize: 18, marginBottom: 4, color: "var(--bright)" }}>
        {item.platform}
      </div>

      {/* Username SMALL (was platform) */}
      <div style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 12, color: "var(--muted)" }}>
        {item.username}
      </div>

      <div style={{ fontSize: 11, lineHeight: 1.7, marginBottom: 16, color: "var(--dim)" }}>
        {item.bio}
      </div>
      <div style={{ fontSize: 10, color: "var(--accent)" }}>
        {item.metaValue}{" "}
        <span style={{ fontSize: 9, letterSpacing: "0.06em", color: "var(--muted)" }}>
          {item.metaLabel}
        </span>
      </div>
    </a>
  );
}

export default function Social() {
  const ref = useReveal();

  return (
    <section
      id="social"
      ref={ref}
      className="reveal"
      style={{ padding: "80px 64px", borderBottom: "1px solid var(--border)" }}
    >
      <SectionLabel>005 / Elsewhere</SectionLabel>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          border: "1px solid var(--border)",
          gap: 0,
          marginBottom: 64,
        }}
      >
        {socialData.map((item) => (
          <SocialCard key={item.key} item={item} />
        ))}
      </div>

      {/* Testimonials */}
      <div style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.18em", display: "flex", alignItems: "center", gap: 12, marginBottom: 32, color: "var(--muted)" }}>
        Kind words
        <span style={{ flex: 1, height: 1, background: "var(--border)" }} />
      </div>

      <div>
        {testimonials.map((t, i) => (
          <div
            key={t.name}
            style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr",
              alignItems: "start",
              gap: 28,
              padding: "28px 0",
              borderBottom: i < testimonials.length - 1 ? "1px solid var(--border)" : "none",
            }}
          >
            <div className="serif" style={{ fontStyle: "italic", fontSize: 48, lineHeight: 1, color: "var(--border)", marginTop: -8 }}>"</div>
            <div>
              <div className="serif" style={{ fontStyle: "italic", fontSize: 18, marginBottom: 14, lineHeight: 1.6, color: "var(--text)" }}>{t.text}</div>
              <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--muted)" }}>{t.name}</div>
              <div style={{ fontSize: 10, marginTop: 2, color: "var(--dim)" }}>{t.role}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}