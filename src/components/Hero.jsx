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
      className="reveal"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "96px 64px",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 24, color: "var(--muted)" }}>
        001 / Introduction
      </div>

      <h1
        className="serif"
        style={{
          fontStyle: "italic",
          lineHeight: 1.1,
          marginBottom: 8,
          fontSize: "clamp(42px, 5vw, 72px)",
          color: "var(--bright)",
          fontWeight: 400,
        }}
      >
        Engineer.<br />
        <span style={{ color: "var(--accent)" }}>Builder.</span>
      </h1>

      <div style={{ fontSize: 11, marginBottom: 48, height: 20, overflow: "hidden", color: "var(--dim)" }}>
        <span className="typing-cursor">{typed}</span>
      </div>

      <p
        className="serif"
        style={{
          fontSize: 16,
          lineHeight: 1.8,
          marginBottom: 48,
          maxWidth: 480,
          color: "var(--text)",
        }}
      >
        {profileData.about}
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {[...profileData.skills, ...profileData.languages].map((item) => (
          <span
            key={item}
            style={{
              fontSize: 9,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              padding: "4px 10px",
              color: "var(--dim)",
              border: "1px solid var(--border)",
              cursor: "default",
              transition: "color 0.2s, border-color 0.2s",
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