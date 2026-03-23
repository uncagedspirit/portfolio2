import { useReveal } from "../hooks/useReveal";
import { experienceData } from "../data";
import SectionLabel from "./SectionLabel";
import TechTag from "./TechTag";

export default function Experience() {
  const ref = useReveal();

  return (
    <section
      id="experience"
      ref={ref}
      className="reveal"
      style={{
        padding: "80px 64px",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <SectionLabel>002 / Experience</SectionLabel>

      <div>
        {experienceData.map((exp, i) => (
          <div
            key={exp.id}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: 32,
              alignItems: "start",
              padding: "32px 0",
              borderBottom: i < experienceData.length - 1 ? "1px solid var(--border)" : "none",
            }}
          >
            <div>
              <div className="serif" style={{ fontStyle: "italic", fontSize: 18, marginBottom: 4, color: "var(--bright)" }}>
                {exp.company}
              </div>
              <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16, color: "var(--accent)" }}>
                {exp.role}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 16, fontSize: 10, marginBottom: 16, color: "var(--muted)" }}>
                <span>↳ {exp.workType}</span>
                <span>↳ {exp.location}</span>
                <a
                  href={exp.site}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "var(--muted)", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
                >
                  {exp.site.replace("https://", "").replace(/\/$/, "")} ↗
                </a>
              </div>

              <ul style={{ listStyle: "none", padding: 0 }}>
                {exp.points.map((pt, j) => (
                  <li
                    key={j}
                    style={{
                      fontSize: 12,
                      lineHeight: 1.7,
                      paddingLeft: 16,
                      position: "relative",
                      marginBottom: 4,
                      color: "var(--text)",
                    }}
                  >
                    <span style={{ position: "absolute", left: 0, color: "var(--muted)" }}>·</span>
                    {pt}
                  </li>
                ))}
              </ul>

              {exp.techStack.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 16 }}>
                  {exp.techStack.map((t) => (
                    <TechTag key={t}>{t}</TechTag>
                  ))}
                </div>
              )}
            </div>

            <div style={{ fontSize: 10, textAlign: "right", whiteSpace: "nowrap", paddingTop: 4, letterSpacing: "0.04em", color: "var(--muted)" }}>
              {exp.duration.split("—").map((part, idx) => (
                <span key={idx} style={{ display: "block" }}>
                  {idx > 0 ? `— ${part.trim()}` : part.trim()}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}