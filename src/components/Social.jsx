import { useReveal } from "../hooks/useReveal";
import { socialData, testimonials } from "../data";
import SectionLabel from "./SectionLabel";

function SocialCard({ item }) {
  return (
    <a
      href={item.link}
      target="_blank"
      rel="noreferrer"
      className="block p-6 relative transition-colors duration-200"
      style={{
        borderRight: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        color: "inherit",
        textDecoration: "none",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      <span
        className="absolute top-6 right-6 text-sm transition-colors duration-200"
        style={{ color: "var(--border)" }}
      >
        ↗
      </span>
      <div className="text-[9px] uppercase tracking-[0.14em] mb-2.5" style={{ color: "var(--muted)" }}>
        {item.platform}
      </div>
      <div className="serif italic text-lg mb-2" style={{ color: "var(--bright)" }}>
        {item.username}
      </div>
      <div className="text-[11px] leading-relaxed mb-4" style={{ color: "var(--dim)" }}>
        {item.bio}
      </div>
      <div className="text-[10px]" style={{ color: "var(--accent)" }}>
        {item.metaValue}{" "}
        <span className="text-[9px] tracking-[0.06em]" style={{ color: "var(--muted)" }}>
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
      className="reveal px-8 md:px-16 py-20"
      style={{ borderBottom: "1px solid var(--border)" }}
    >
      <SectionLabel>005 / Elsewhere</SectionLabel>

      <div
        className="grid"
        style={{
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
      <div
        className="text-[9px] uppercase tracking-[0.18em] flex items-center gap-3 mb-8"
        style={{ color: "var(--muted)" }}
      >
        Kind words
        <span className="flex-1 h-px" style={{ background: "var(--border)" }} />
      </div>

      <div>
        {testimonials.map((t, i) => (
          <div
            key={t.name}
            className="grid items-start gap-7 py-7"
            style={{
              gridTemplateColumns: "auto 1fr",
              borderBottom: i < testimonials.length - 1 ? "1px solid var(--border)" : "none",
            }}
          >
            <div
              className="serif italic leading-none"
              style={{ fontSize: 48, color: "var(--border)", marginTop: -8 }}
            >
              "
            </div>
            <div>
              <div className="serif italic text-lg mb-3.5 leading-relaxed" style={{ color: "var(--text)" }}>
                {t.text}
              </div>
              <div className="text-[10px] uppercase tracking-[0.08em]" style={{ color: "var(--muted)" }}>
                {t.name}
              </div>
              <div className="text-[10px] mt-0.5" style={{ color: "var(--dim)" }}>
                {t.role}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
