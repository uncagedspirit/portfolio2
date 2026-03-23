import { useReveal } from "../hooks/useReveal";
import { educationData } from "../data";
import SectionLabel from "./SectionLabel";

export default function Education() {
  const ref = useReveal();

  return (
    <section
      id="education"
      ref={ref}
      className="reveal px-8 md:px-16 py-20"
      style={{ borderBottom: "1px solid var(--border)" }}
    >
      <SectionLabel>004 / Education</SectionLabel>

      <div>
        {educationData.map((edu, i) => (
          <div
            key={edu.instituteName}
            className="grid items-start gap-8 py-7"
            style={{
              gridTemplateColumns: "1fr auto",
              borderBottom: i < educationData.length - 1 ? "1px solid var(--border)" : "none",
            }}
          >
            <div>
              <div className="serif italic text-lg mb-1" style={{ color: "var(--bright)" }}>
                {edu.instituteName}
              </div>
              <div className="text-[10px] tracking-[0.06em] mb-0.5" style={{ color: "var(--dim)" }}>
                {edu.level}
              </div>
              <div className="text-[10px]" style={{ color: "var(--muted)" }}>
                {edu.specialization} · {edu.duration}
              </div>
            </div>

            <div className="text-right">
              <span className="serif italic block" style={{ fontSize: 22, color: "var(--accent)" }}>
                {edu.scoreValue}
              </span>
              <span className="text-[9px] uppercase tracking-[0.1em]" style={{ color: "var(--muted)" }}>
                {edu.scoreLabel}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
