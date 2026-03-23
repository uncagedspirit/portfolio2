import { useReveal } from "../hooks/useReveal";
import { projects } from "../data";
import SectionLabel from "./SectionLabel";
import TechTag from "./TechTag";

function ProjectCard({ project }) {
  return (
    <div
      className="p-6 transition-colors duration-200 cursor-default"
      style={{
        borderRight: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      <div className="text-[9px] tracking-[0.1em] mb-4" style={{ color: "var(--border)" }}>
        {project.num}
      </div>
      <div className="serif italic text-xl leading-tight mb-2" style={{ color: "var(--bright)" }}>
        {project.title}
      </div>
      <div className="text-[11px] leading-relaxed mb-5" style={{ color: "var(--dim)" }}>
        {project.description}
      </div>
      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.techStack.map((t) => (
          <TechTag key={t}>{t}</TechTag>
        ))}
      </div>
      <div className="flex gap-4">
        <a
          href={project.githubLink}
          target="_blank"
          rel="noreferrer"
          className="text-[9px] uppercase tracking-[0.12em] flex items-center gap-1 transition-colors duration-200"
          style={{ color: "var(--muted)", textDecoration: "none" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
        >
          GitHub <span>↗</span>
        </a>
        <a
          href={project.liveLink}
          target="_blank"
          rel="noreferrer"
          className="text-[9px] uppercase tracking-[0.12em] flex items-center gap-1 transition-colors duration-200"
          style={{ color: "var(--muted)", textDecoration: "none" }}
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
      className="reveal px-8 md:px-16 py-20"
      style={{ borderBottom: "1px solid var(--border)" }}
    >
      <SectionLabel>003 / Projects</SectionLabel>

      <div
        className="grid"
        style={{
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
