import { useReveal } from "../hooks/useReveal";
import { useTyping } from "../hooks/useTyping";
import { profileData } from "../data";

export default function Hero() {
  const ref = useReveal();
  const typed = useTyping(profileData.roles);

  return (
    <section
      id="home"
      ref={ref}
      className="reveal flex flex-col justify-center min-h-screen px-8 md:px-16 py-24"
      style={{ borderBottom: "1px solid var(--border)" }}
    >
      <div className="text-[10px] uppercase tracking-[0.15em] mb-6" style={{ color: "var(--muted)" }}>
        001 / Introduction
      </div>

      <h1
        className="serif italic leading-[1.1] mb-2"
        style={{
          fontSize: "clamp(42px, 5vw, 72px)",
          color: "var(--bright)",
          fontWeight: 400,
        }}
      >
        Engineer.<br />
        <span style={{ color: "var(--accent)" }}>Builder.</span>
      </h1>

      <div className="text-[11px] mb-12 h-[18px] overflow-hidden" style={{ color: "var(--dim)" }}>
        <span className="typing-cursor">{typed}</span>
      </div>

      <p
        className="serif text-base leading-[1.8] mb-12 max-w-[480px]"
        style={{ color: "var(--text)" }}
      >
        {profileData.about}
      </p>

      <div className="flex flex-wrap gap-2">
        {[...profileData.skills, ...profileData.languages].map((item) => (
          <span
            key={item}
            className="text-[9px] uppercase tracking-[0.1em] px-2.5 py-1 transition-all duration-200 cursor-default"
            style={{
              color: "var(--dim)",
              border: "1px solid var(--border)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--accent)";
              e.currentTarget.style.borderColor = "var(--accent)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--dim)";
              e.currentTarget.style.borderColor = "var(--border)";
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
