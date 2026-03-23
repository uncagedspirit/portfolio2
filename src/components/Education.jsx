import { useReveal } from "../hooks/useReveal";
import { educationData } from "../data";
import SectionLabel from "./SectionLabel";

function EducationCard({ edu, isFirst, isLast }) {
  return (
    <div
      style={{
        padding: "28px 24px",
        borderRight: isLast ? "none" : "1px solid var(--border)",
        borderStyle: edu.planned ? "dashed" : "solid",
        borderColor: edu.planned ? "var(--muted)" : undefined,
        background: edu.planned ? "transparent" : "transparent",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: 0,
        transition: "background 0.2s",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.background = "var(--surface)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
    >
      {edu.planned && (
        <div style={{
          position: "absolute",
          top: 12,
          right: 12,
          fontSize: 7,
          textTransform: "uppercase",
          letterSpacing: "0.14em",
          color: "var(--accent)",
          border: "1px dashed var(--accent)",
          padding: "2px 6px",
          opacity: 0.8,
        }}>
          Planned
        </div>
      )}

      <div
        className="serif"
        style={{
          fontStyle: "italic",
          fontSize: 16,
          marginBottom: 6,
          color: edu.planned ? "var(--dim)" : "var(--bright)",
          lineHeight: 1.3,
        }}
      >
        {edu.instituteName}
      </div>

      <div style={{
        fontSize: 9,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        color: edu.planned ? "var(--muted)" : "var(--accent)",
        marginBottom: 6,
      }}>
        {edu.level}
      </div>

      <div style={{
        fontSize: 9,
        color: "var(--muted)",
        marginBottom: 16,
        letterSpacing: "0.04em",
      }}>
        {edu.specialization}
      </div>

      <div style={{ marginTop: "auto" }}>
        <span
          className="serif"
          style={{
            fontStyle: "italic",
            fontSize: 26,
            display: "block",
            color: edu.planned ? "var(--dim)" : "var(--accent)",
            lineHeight: 1,
            marginBottom: 4,
          }}
        >
          {edu.scoreValue}
        </span>
        <span style={{
          fontSize: 8,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: "var(--muted)",
          display: "block",
          marginBottom: 12,
        }}>
          {edu.scoreLabel}
        </span>
        <span style={{
          fontSize: 9,
          color: "var(--muted)",
          letterSpacing: "0.04em",
        }}>
          {edu.duration}
        </span>
      </div>
    </div>
  );
}

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

      <style>{`
        .edu-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border: 1px solid var(--border);
          gap: 0;
        }
        @media (max-width: 800px) {
          .edu-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 500px) {
          .edu-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="edu-grid">
        {educationData.map((edu, i) => (
          <EducationCard
            key={edu.instituteName}
            edu={edu}
            isFirst={i === 0}
            isLast={i === educationData.length - 1}
          />
        ))}
      </div>
    </section>
  );
}