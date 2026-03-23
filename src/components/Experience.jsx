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
      className="reveal px-8 md:px-16 py-20"
      style={{ borderBottom: "1px solid var(--border)" }}
    >
      <SectionLabel>002 / Experience</SectionLabel>

      <div>
        {experienceData.map((exp, i) => (
          <div
            key={exp.id}
            className="grid gap-8 py-8"
            style={{
              gridTemplateColumns: "1fr auto",
              borderBottom: i < experienceData.length - 1 ? "1px solid var(--border)" : "none",
            }}
          >
            <div>
              <div className="serif italic text-lg mb-1" style={{ color: "var(--bright)" }}>
                {exp.company}
              </div>
              <div
                className="text-[10px] uppercase tracking-[0.1em] mb-4"
                style={{ color: "var(--accent)" }}
              >
                {exp.role}
              </div>
              <div className="flex flex-wrap gap-4 text-[10px] mb-4" style={{ color: "var(--muted)" }}>
                <span>↳ {exp.workType}</span>
                <span>↳ {exp.location}</span>
                <a
                  href={exp.site}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors duration-200 hover:text-[color:var(--accent)]"
                  style={{ color: "var(--muted)", textDecoration: "none" }}
                >
                  {exp.site.replace("https://", "").replace(/\/$/, "")} ↗
                </a>
              </div>

              <ul className="space-y-1">
                {exp.points.map((pt, j) => (
                  <li
                    key={j}
                    className="text-[12px] leading-relaxed pl-4 relative"
                    style={{ color: "var(--text)" }}
                  >
                    <span className="absolute left-0" style={{ color: "var(--muted)" }}>·</span>
                    {pt}
                  </li>
                ))}
              </ul>

              {exp.techStack.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {exp.techStack.map((t) => (
                    <TechTag key={t}>{t}</TechTag>
                  ))}
                </div>
              )}
            </div>

            <div
              className="text-[10px] text-right whitespace-nowrap pt-1 tracking-[0.04em]"
              style={{ color: "var(--muted)" }}
            >
              {exp.duration.split("—").map((part, idx) => (
                <span key={idx}>
                  {idx > 0 && <><br />— </>}
                  {part.trim()}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
