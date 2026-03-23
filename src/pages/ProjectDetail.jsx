import { useParams, useNavigate } from "react-router-dom";
import { projects } from "../data";
import TechTag from "../components/TechTag";

export default function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div style={{ padding: "120px 64px", color: "var(--muted)", fontSize: 12 }}>
        Project not found.{" "}
        <span onClick={() => navigate("/")} style={{ color: "var(--accent)", cursor: "pointer" }}>← Back</span>
      </div>
    );
  }

  const paragraphs = project.longDescription.split("\n\n");

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "80px 64px" }}>

      {/* Back */}
      <div
        onClick={() => navigate("/#projects")}
        style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--muted)", cursor: "pointer", marginBottom: 48, display: "inline-flex", alignItems: "center", gap: 8, transition: "color 0.2s" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
      >
        ← Back
      </div>

      {/* Header */}
      <div style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--muted)", marginBottom: 8 }}>
        {project.num} · {project.type} · {project.year}
      </div>
      <h1 className="serif" style={{ fontStyle: "italic", fontSize: "clamp(36px, 5vw, 60px)", color: "var(--bright)", fontWeight: 400, lineHeight: 1.1, marginBottom: 24 }}>
        {project.title}
      </h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 48 }}>
        {project.techStack.map((t) => <TechTag key={t}>{t}</TechTag>)}
      </div>

      {/* Video / Preview area */}
      <div style={{
        width: "100%", aspectRatio: "16/9", marginBottom: 48,
        background: "var(--surface)", border: "1px solid var(--border)",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8,
      }}>
        {project.videoUrl ? (
          <iframe
            src={project.videoUrl}
            title={project.title}
            style={{ width: "100%", height: "100%", border: "none" }}
            allowFullScreen
          />
        ) : project.previewImage ? (
          <img src={project.previewImage} alt={project.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <>
            <div style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--muted)" }}>
              Preview
            </div>
            <div style={{ fontSize: 11, color: "var(--border)" }}>
              Add <code style={{ color: "var(--accent)" }}>previewImage</code> or <code style={{ color: "var(--accent)" }}>videoUrl</code> in data/index.js
            </div>
          </>
        )}
      </div>

      {/* Long description */}
      <div style={{ marginBottom: 48 }}>
        {paragraphs.map((p, i) => (
          <p key={i} className="serif" style={{ fontSize: 16, lineHeight: 1.85, color: "var(--text)", marginBottom: 20 }}>
            {p}
          </p>
        ))}
      </div>

      {/* Links */}
      <div style={{ display: "flex", gap: 16, paddingTop: 32, borderTop: "1px solid var(--border)" }}>
        <a
          href={project.githubLink} target="_blank" rel="noreferrer"
          style={{
            fontSize: 9, textTransform: "uppercase", letterSpacing: "0.14em",
            padding: "10px 24px", border: "1px solid var(--border)",
            color: "var(--dim)", textDecoration: "none", transition: "all 0.2s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--dim)"; }}
        >
          GitHub ↗
        </a>
        <a
          href={project.liveLink} target="_blank" rel="noreferrer"
          style={{
            fontSize: 9, textTransform: "uppercase", letterSpacing: "0.14em",
            padding: "10px 24px", background: "var(--accent)",
            color: "#000", textDecoration: "none", border: "1px solid var(--accent)",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Live site ↗
        </a>
      </div>
    </div>
  );
}