import { useReveal } from "../hooks/useReveal";
import { educationData } from "../data";
import SectionLabel from "./SectionLabel";

export default function Education() {
  const ref = useReveal();

  return (
    <section
      id="education"
      ref={ref}
      className="reveal"
      style={{
        padding: "80px 64px",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <SectionLabel>004 / Education</SectionLabel>

      <div>
        {educationData.map((edu, i) => (
          <div
            key={edu.instituteName}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              alignItems: "start",
              gap: 32,
              padding: "28px 0",
              borderBottom: i < educationData.length - 1 ? "1px solid var(--border)" : "none",
            }}
          >
            <div>
              <div className="serif" style={{ fontStyle: "italic", fontSize: 18, marginBottom: 4, color: "var(--bright)" }}>
                {edu.instituteName}
              </div>
              <div style={{ fontSize: 10, letterSpacing: "0.06em", marginBottom: 2, color: "var(--dim)" }}>
                {edu.level}
              </div>
              <div style={{ fontSize: 10, color: "var(--muted)" }}>
                {edu.specialization} · {edu.duration}
              </div>
            </div>

            <div style={{ textAlign: "right" }}>
              <span className="serif" style={{ fontStyle: "italic", display: "block", fontSize: 22, color: "var(--accent)" }}>
                {edu.scoreValue}
              </span>
              <span style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted)" }}>
                {edu.scoreLabel}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}