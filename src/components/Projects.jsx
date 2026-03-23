import { useNavigate } from "react-router-dom";
import { useReveal } from "../hooks/useReveal";
import { projects } from "../data";
import SectionLabel from "./SectionLabel";
import TechTag from "./TechTag";

const PREVIEW_LIMIT = 3;

function ProjectCard({ project }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/projects/${project.slug}`)}
      style={{
        padding: 24, cursor: "pointer",
        borderRight: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        background: "transparent", transition: "background 0.2s",
        display: "flex", flexDirection: "column",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      <div style={{ fontSize: 9, letterSpacing: "0.1em", marginBottom: 16, color: "var(--border)" }}>
        {project.num}
      </div>

      {/* Preview image placeholder */}
      {project.previewImage ? (
        <img
          src={project.previewImage}
          alt={project.title}
          style={{ width: "100%", height: 140, objectFit: "cover", marginBottom: 16, border: "1px solid var(--border)" }}
        />
      ) : (
        <div style={{
          width: "100%", height: 140, marginBottom: 16,
          background: "var(--surface)", border: "1px solid var(--border)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <span style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--muted)" }}>
            {project.type}
          </span>
        </div>
      )}

      <div className="serif" style={{ fontStyle: "italic", fontSize: 20, lineHeight: 1.25, marginBottom: 8, color: "var(--bright)" }}>
        {project.title}
      </div>
      <div style={{ fontSize: 11, lineHeight: 1.7, marginBottom: 20, color: "var(--dim)", flex: 1 }}>
        {project.description}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
        {project.techStack.map((t) => <TechTag key={t}>{t}</TechTag>)}
      </div>
      <div style={{ display: "flex", gap: 16 }}>
        <a
          href={project.githubLink} target="_blank" rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.12em", display: "flex", alignItems: "center", gap: 4, color: "var(--muted)", textDecoration: "none", transition: "color 0.2s" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
        >
          GitHub <span>↗</span>
        </a>
        <a
          href={project.liveLink} target="_blank" rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.12em", display: "flex", alignItems: "center", gap: 4, color: "var(--muted)", textDecoration: "none", transition: "color 0.2s" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
        >
          Live <span>↗</span>
        </a>
      </div>
    </div>
  );
}

export default function Projects() {
  const ref = useReveal();
  const navigate = useNavigate();
  const visible = projects.slice(0, PREVIEW_LIMIT);
  const hasMore = projects.length > PREVIEW_LIMIT;

  return (
    <section id="projects" ref={ref} className="reveal"
      style={{ padding: "80px 64px", borderBottom: "1px solid var(--border)" }}
    >
      <SectionLabel>003 / Projects</SectionLabel>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        border: "1px solid var(--border)", gap: 0,
      }}>
        {visible.map((project) => (
          <ProjectCard key={project.projectId} project={project} />
        ))}
      </div>

      {/* View all button — always shown, prominent when hasMore */}
      <div style={{ marginTop: 32, display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={() => navigate("/projects")}
          style={{
            background: "transparent",
            border: "1px solid var(--border)",
            color: hasMore ? "var(--bright)" : "var(--dim)",
            fontSize: 9, textTransform: "uppercase", letterSpacing: "0.14em",
            padding: "10px 24px", cursor: "pointer", fontFamily: "inherit",
            transition: "border-color 0.2s, color 0.2s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = hasMore ? "var(--bright)" : "var(--dim)"; }}
        >
          {hasMore ? `View all projects (${projects.length}) ↗` : "View all projects ↗"}
        </button>
      </div>
    </section>
  );
}