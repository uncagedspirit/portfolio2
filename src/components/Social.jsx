import { useReveal } from "../hooks/useReveal";
import { socialData, testimonials } from "../data";
import SectionLabel from "./SectionLabel";

function SocialCard({ item, isLast }) {
  return (
    <a
      href={item.link}
      target="_blank"
      rel="noreferrer"
      style={{
        display: "block",
        padding: "20px 18px",
        position: "relative",
        borderRight: isLast ? "none" : "1px solid var(--border)",
        color: "inherit",
        textDecoration: "none",
        background: "transparent",
        transition: "background 0.2s",
        minWidth: 0,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      <span style={{ position: "absolute", top: 16, right: 14, fontSize: 12, color: "var(--border)" }}>↗</span>

      {/* Platform name */}
      <div className="serif" style={{
        fontStyle: "italic",
        fontSize: 15,
        marginBottom: 4,
        color: "var(--bright)",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        paddingRight: 20,
      }}>
        {item.platform}
      </div>

      {/* Username */}
      <div style={{
        fontSize: 8,
        textTransform: "uppercase",
        letterSpacing: "0.12em",
        marginBottom: 10,
        color: "var(--muted)",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}>
        {item.username}
      </div>

      {/* Bio */}
      <div style={{
        fontSize: 10,
        lineHeight: 1.55,
        marginBottom: 12,
        color: "var(--dim)",
        display: "-webkit-box",
        WebkitLineClamp: 2,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
      }}>
        {item.bio}
      </div>

      {/* Meta */}
      <div style={{ fontSize: 11, color: "var(--accent)" }}>
        {item.metaValue}{" "}
        <span style={{ fontSize: 8, letterSpacing: "0.06em", color: "var(--muted)" }}>
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

      {/* Single-row grid — 5 equal columns */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          border: "1px solid var(--border)",
          gap: 0,
          marginBottom: 64,
        }}
      >
        {socialData.map((item, i) => (
          <SocialCard key={item.key} item={item} isLast={i === socialData.length - 1} />
        ))}
      </div>

      {/* Testimonials */}
      <div style={{
        fontSize: 9,
        textTransform: "uppercase",
        letterSpacing: "0.18em",
        display: "flex",
        alignItems: "center",
        gap: 12,
        marginBottom: 32,
        color: "var(--muted)",
      }}>
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