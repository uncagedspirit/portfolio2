import { useReveal } from "../hooks/useReveal";
import { projects } from "../data";
import SectionLabel from "./SectionLabel";
import TechTag from "./TechTag";

function ProjectCard({ project }) {
  return (
    <div
      style={{
        padding: 24,
        borderRight: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        background: "transparent",
        cursor: "default",
        transition: "background 0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      <div style={{ fontSize: 9, letterSpacing: "0.1em", marginBottom: 16, color: "var(--border)" }}>
        {project.num}
      </div>
      <div className="serif" style={{ fontStyle: "italic", fontSize: 20, lineHeight: 1.25, marginBottom: 8, color: "var(--bright)" }}>
        {project.title}
      </div>
      <div style={{ fontSize: 11, lineHeight: 1.7, marginBottom: 20, color: "var(--dim)" }}>
        {project.description}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
        {project.techStack.map((t) => (
          <TechTag key={t}>{t}</TechTag>
        ))}
      </div>
      <div style={{ display: "flex", gap: 16 }}>
        <a
          href={project.githubLink}
          target="_blank"
          rel="noreferrer"
          style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.12em", display: "flex", alignItems: "center", gap: 4, color: "var(--muted)", textDecoration: "none", transition: "color 0.2s" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
        >
          GitHub <span>↗</span>
        </a>
        <a
          href={project.liveLink}
          target="_blank"
          rel="noreferrer"
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

  return (
    <section
      id="projects"
      ref={ref}
      className="reveal"
      style={{
        padding: "80px 64px",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <SectionLabel>003 / Projects</SectionLabel>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          border: "1px solid var(--border)",
          gap: 0,
        }}
      >
        {projects.map((project) => (
          <ProjectCard key={project.projectId} project={project} />
        ))}
      </div>
    </section>
  );
}