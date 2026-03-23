import { useParams, useNavigate } from "react-router-dom";
import { experienceData } from "../data";

// Dummy blog content keyed by slug
const blogContent = {
  hsbc: {
    subtitle: "Building at Scale — Inside a Global Financial Institution",
    date: "July 2025",
    readTime: "~4 min read",
    sections: [
      {
        heading: "First Impressions",
        body: `Walking into HSBC Technology India on day one felt different from any startup or college lab I'd been in before. The scale is immediately apparent — teams distributed across floors, codebases with decades of history, and processes designed to move carefully rather than fast. It was a reset.\n\nThe onboarding was thorough. Two weeks of setup, access provisioning, codebase orientation, and meeting the team. The engineering culture here is disciplined — code review isn't just a formality, it's where real knowledge transfer happens.`,
      },
      {
        heading: "What I'm Working On",
        body: `Details to follow once I'm a few sprints deep. The work sits at the intersection of internal tooling and customer-facing systems — more on the specifics as I'm able to share them.\n\nWhat I can say: the problems are genuinely interesting. Financial systems at this scale have constraints that most web development doesn't touch — latency, consistency, compliance, auditability. Each requirement has a reason, and learning those reasons is part of the job.`,
      },
      {
        heading: "What I'm Learning",
        body: `Enterprise engineering at this level is a different discipline. The emphasis on documentation, on backward compatibility, on understanding downstream effects before shipping — these are habits I'm building fast.\n\nI'm also learning how large teams stay aligned. The tooling, the ceremonies, the communication patterns — it's all infrastructure for human coordination, and it's fascinating to observe up close.`,
      },
      {
        heading: "More Soon",
        body: `This is a live entry. I'll keep updating this page as the role evolves — the wins, the challenges, the lessons. Check back in a few months for a fuller picture.`,
      },
    ],
  },
  cctech: {
    subtitle: "Rendering Reality — 3D Graphics, CAD & Cloud at CCTech",
    date: "March – June 2025",
    readTime: "~6 min read",
    sections: [
      {
        heading: "The Brief",
        body: `Centre for Computational Technologies (CCTech) works at the edge of engineering software — CAD, simulation, and cloud-based design tools. When I joined as a Software Engineering Intern, my mandate was split between frontend development and building interactive graphics applications.\n\nIt turned out to be one of the most technically dense experiences I've had. Going from React components to OpenGL primitives in the same sprint has a way of expanding what you think "software engineering" means.`,
      },
      {
        heading: "OpenGL & WebGL",
        body: `The first month was a steep but rewarding climb into OpenGL and WebGL. I started with the fundamentals — geometric primitives, vertex buffers, shader programs — and worked up to matrix transformations for 2D and 3D scenes.\n\nThe aha moment came when I finally understood the rendering pipeline end-to-end: from vertex data on the CPU, through the vertex shader, the rasterizer, the fragment shader, and out to the framebuffer. Once that clicked, building interactive graphics felt like working with a language I actually spoke.\n\nI built animated hierarchical visualizations — think robot arm mechanics where each joint transforms relative to its parent — using matrix stacks and scene graph logic.`,
      },
      {
        heading: "The Cloud Assembly System",
        body: `The more product-shaped project was a frontend for a cloud-based assembly visualization tool. The system takes CAD assemblies stored in AWS S3, processes them through an AI-driven part identification pipeline, and surfaces the results in a browser interface.\n\nMy job was to build that interface: file upload and S3 integration, a viewer panel for the processed assembly, and a parts inventory UI that mapped AI-identified components to their properties.\n\nWorking with AWS S3 from the frontend — presigned URLs, multipart uploads, progress tracking — was a new domain for me. The browser has more power than most people use.`,
      },
      {
        heading: "Reflection",
        body: `Four months isn't long, but this internship felt dense. I wrote C++ for the first time in a real codebase, shipped WebGL visualizations in a production context, and built product features that engineers at the company actually used.\n\nMore than the technical skills, I left with a sharper intuition for how complex software systems get designed and how teams divide that complexity into deliverable work. That's worth more than any specific API I learned.`,
      },
    ],
  },
};

export default function ExperienceDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const exp = experienceData.find((e) => e.slug === slug);
  const blog = blogContent[slug];

  if (!exp || !blog) {
    return (
      <div style={{ padding: "120px 64px", color: "var(--muted)", fontSize: 12 }}>
        Entry not found.{" "}
        <span onClick={() => navigate("/")} style={{ color: "var(--accent)", cursor: "pointer" }}>
          ← Back to home
        </span>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "80px 64px" }}>

      {/* Back */}
      <div
        onClick={() => navigate(-1)}
        style={{
          fontSize: 9, textTransform: "uppercase", letterSpacing: "0.14em",
          color: "var(--muted)", cursor: "pointer", marginBottom: 56,
          display: "inline-flex", alignItems: "center", gap: 8, transition: "color 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
      >
        ← Back
      </div>

      {/* Meta */}
      <div style={{
        fontSize: 9, textTransform: "uppercase", letterSpacing: "0.14em",
        color: "var(--muted)", marginBottom: 8,
        display: "flex", gap: 16,
      }}>
        <span>{exp.role}</span>
        <span style={{ color: "var(--border)" }}>·</span>
        <span>{blog.date}</span>
        <span style={{ color: "var(--border)" }}>·</span>
        <span>{blog.readTime}</span>
      </div>

      {/* Headline */}
      <h1 className="serif" style={{
        fontStyle: "italic",
        fontSize: "clamp(28px, 4vw, 48px)",
        color: "var(--bright)", fontWeight: 400, lineHeight: 1.15, marginBottom: 10,
      }}>
        {exp.company}
      </h1>
      <div className="serif" style={{
        fontStyle: "italic",
        fontSize: "clamp(16px, 2vw, 20px)",
        color: "var(--dim)", fontWeight: 400, lineHeight: 1.4, marginBottom: 48,
      }}>
        {blog.subtitle}
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: "var(--border)", marginBottom: 56 }} />

      {/* Sections */}
      <div>
        {blog.sections.map((section, i) => (
          <div key={i} style={{ marginBottom: 48 }}>
            <h2 style={{
              fontSize: 9, textTransform: "uppercase", letterSpacing: "0.16em",
              color: "var(--accent)", marginBottom: 16, fontWeight: 400,
            }}>
              {String(i + 1).padStart(2, "0")} / {section.heading}
            </h2>
            {section.body.split("\n\n").map((para, j) => (
              <p key={j} className="serif" style={{
                fontSize: 16, lineHeight: 1.85, color: "var(--text)", marginBottom: 18,
              }}>
                {para}
              </p>
            ))}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{
        marginTop: 64, paddingTop: 32, borderTop: "1px solid var(--border)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: 12,
      }}>
        <div style={{ fontSize: 10, color: "var(--muted)" }}>
          {exp.duration} · {exp.location}
        </div>
        <a
          href={exp.site} target="_blank" rel="noreferrer"
          style={{
            fontSize: 9, textTransform: "uppercase", letterSpacing: "0.12em",
            padding: "8px 20px", border: "1px solid var(--border)",
            color: "var(--dim)", textDecoration: "none", transition: "all 0.2s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--dim)"; }}
        >
          Visit {exp.company} ↗
        </a>
      </div>
    </div>
  );
}