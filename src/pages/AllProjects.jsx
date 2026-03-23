import { useNavigate } from "react-router-dom";
import { projects } from "../data";
import TechTag from "../components/TechTag";

export default function AllProjects() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "80px 64px" }}>

      {/* Back */}
      <div
        onClick={() => navigate("/")}
        style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--muted)", cursor: "pointer", marginBottom: 48, display: "inline-flex", alignItems: "center", gap: 8 }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
      >
        ← Back to home
      </div>

      {/* Header */}
      <div style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.18em", color: "var(--muted)", marginBottom: 8 }}>
        All work
      </div>
      <h1 className="serif" style={{ fontStyle: "italic", fontSize: "clamp(32px, 4vw, 56px)", color: "var(--bright)", fontWeight: 400, lineHeight: 1.1, marginBottom: 64 }}>
        Projects
      </h1>

      {/* Horizontal list — each project as a row */}
      <div>
        {projects.map((project, i) => (
          <div
            key={project.projectId}
            onClick={() => navigate(`/projects/${project.slug}`)}
            style={{
              display: "grid",
              gridTemplateColumns: "180px 1fr auto",
              alignItems: "center",
              gap: 32,
              padding: "28px 0",
              borderBottom: "1px solid var(--border)",
              cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            {/* Preview image */}
            <div style={{
              width: 180, height: 110,
              background: "var(--surface)", border: "1px solid var(--border)",
              display: "flex", alignItems: "center", justifyContent: "center",
              overflow: "hidden", flexShrink: 0,
            }}>
              {project.previewImage ? (
                <img src={project.previewImage} alt={project.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <span style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted)" }}>
                  {project.type}
                </span>
              )}
            </div>

            {/* Info */}
            <div>
              <div style={{ fontSize: 9, color: "var(--muted)", letterSpacing: "0.1em", marginBottom: 6 }}>
                {project.num} · {project.year}
              </div>
              <div className="serif" style={{ fontStyle: "italic", fontSize: 22, color: "var(--bright)", marginBottom: 8 }}>
                {project.title}
              </div>
              <div style={{ fontSize: 11, color: "var(--dim)", lineHeight: 1.6, marginBottom: 12, maxWidth: 500 }}>
                {project.description}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {project.techStack.map((t) => <TechTag key={t}>{t}</TechTag>)}
              </div>
            </div>

            {/* Arrow */}
            <div style={{ fontSize: 20, color: "var(--border)", transition: "color 0.2s" }}>↗</div>
          </div>
        ))}
      </div>
    </div>
  );
}