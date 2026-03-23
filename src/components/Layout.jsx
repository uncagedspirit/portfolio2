import { useState, useEffect } from "react";
import { profileData } from "../data";

const SIDEBAR_WIDTH = 220;

const navItems = [
  { href: "#home", label: "Home" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#education", label: "Education" },
  { href: "#social", label: "Elsewhere" },
];

function ContactModal({ onClose }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) return;
    console.log("Work with me — form submitted:", form);
    setSent(true);
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 200,
        background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 24,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--surface)", border: "1px solid var(--border)",
          padding: 40, width: "100%", maxWidth: 480, position: "relative",
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{ position: "absolute", top: 16, right: 20, background: "none", border: "none", color: "var(--muted)", fontSize: 18, cursor: "pointer" }}
        >×</button>

        {sent ? (
          <div style={{ textAlign: "center", padding: "32px 0" }}>
            <div className="serif" style={{ fontStyle: "italic", fontSize: 24, color: "var(--bright)", marginBottom: 12 }}>Noted.</div>
            <div style={{ fontSize: 12, color: "var(--dim)" }}>I'll be in touch soon.</div>
          </div>
        ) : (
          <>
            <div style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.18em", color: "var(--muted)", marginBottom: 8 }}>Get in touch</div>
            <div className="serif" style={{ fontStyle: "italic", fontSize: 22, color: "var(--bright)", marginBottom: 32 }}>Work with me</div>

            {[
              { key: "name", label: "Name", type: "text", placeholder: "Your name" },
              { key: "email", label: "Email", type: "email", placeholder: "your@email.com" },
            ].map(({ key, label, type, placeholder }) => (
              <div key={key} style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--muted)", marginBottom: 8 }}>{label}</label>
                <input
                  type={type}
                  placeholder={placeholder}
                  value={form[key]}
                  onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                  style={{
                    width: "100%", background: "var(--bg)", border: "1px solid var(--border)",
                    color: "var(--text)", fontSize: 12, padding: "10px 12px", outline: "none",
                    fontFamily: "inherit",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                  onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                />
              </div>
            ))}

            <div style={{ marginBottom: 28 }}>
              <label style={{ display: "block", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--muted)", marginBottom: 8 }}>Message</label>
              <textarea
                placeholder="Tell me about your project..."
                rows={4}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                style={{
                  width: "100%", background: "var(--bg)", border: "1px solid var(--border)",
                  color: "var(--text)", fontSize: 12, padding: "10px 12px", outline: "none",
                  fontFamily: "inherit", resize: "vertical",
                }}
                onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
              />
            </div>

            <button
              onClick={handleSubmit}
              style={{
                width: "100%", background: "var(--accent)", color: "#000",
                border: "none", padding: "12px 0", fontSize: 10,
                textTransform: "uppercase", letterSpacing: "0.14em",
                cursor: "pointer", fontFamily: "inherit", transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Send message
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default function Layout({ children }) {
  const [active, setActive] = useState("home");
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        // pick the one with highest intersection ratio
        let best = null;
        entries.forEach((e) => {
          if (e.isIntersecting) {
            if (!best || e.intersectionRatio > best.intersectionRatio) best = e;
          }
        });
        if (best) setActive(best.target.id);
      },
      {
        threshold: [0, 0.1, 0.2, 0.3],
        rootMargin: "0px 0px -40% 0px",
      }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg)" }}>

      {/* ── Desktop Sidebar ── */}
      {!isMobile && (
        <aside style={{
          position: "fixed", top: 0, left: 0,
          width: SIDEBAR_WIDTH, height: "100vh",
          display: "flex", flexDirection: "column",
          padding: "40px 28px", zIndex: 50,
          borderRight: "1px solid var(--border)",
          background: "var(--bg)", flexShrink: 0,
        }}>
          <div className="serif" style={{ fontStyle: "italic", fontSize: 20, lineHeight: 1.2, marginBottom: 4, color: "var(--bright)" }}>
            {profileData.name}<br />{profileData.surname}
          </div>
          <div style={{ fontSize: 10, letterSpacing: "0.1em", marginBottom: 36, color: "var(--dim)" }}>
            {profileData.handle}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 10, marginBottom: 40, color: "var(--green)" }}>
            <span className="status-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--green)", display: "inline-block" }} />
            available · pune, in
          </div>

          <nav style={{ flex: 1 }}>
            {navItems.map(({ href, label }) => {
              const id = href.slice(1);
              const isActive = active === id;
              return (
                <a key={id} href={href} style={{
                  display: "flex", alignItems: "center", gap: 10,
                  fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em",
                  padding: "6px 0",
                  color: isActive ? "var(--bright)" : "var(--dim)",
                  textDecoration: "none", transition: "color 0.2s",
                }}>
                  <span style={{ color: isActive ? "var(--accent)" : "var(--border)", fontSize: 10 }}>—</span>
                  {label}
                </a>
              );
            })}
          </nav>

          {/* Work with me button */}
          <button
            onClick={() => setModalOpen(true)}
            style={{
              width: "100%", background: "transparent",
              border: "1px solid var(--border)",
              color: "var(--dim)", fontSize: 9,
              textTransform: "uppercase", letterSpacing: "0.14em",
              padding: "9px 0", cursor: "pointer",
              fontFamily: "inherit", marginBottom: 12,
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--dim)"; }}
          >
            Work with me
          </button>

          {/* Email mailto link */}
          <div style={{ fontSize: 9, letterSpacing: "0.05em", lineHeight: 1.6, paddingTop: 16, borderTop: "1px solid var(--border)", wordBreak: "break-all" }}>
            <a
              href={`mailto:${profileData.email}`}
              style={{ color: "var(--dim)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--dim)")}
            >
              {profileData.email}
            </a>
          </div>
        </aside>
      )}

      {/* ── Main content ── */}
      <main style={{
        marginLeft: isMobile ? 0 : SIDEBAR_WIDTH,
        width: isMobile ? "100%" : `calc(100% - ${SIDEBAR_WIDTH}px)`,
        minWidth: 0,
        paddingBottom: isMobile ? 64 : 0,
      }}>
        {children}
      </main>

      {/* ── Mobile bottom nav ── */}
      {isMobile && (
        <nav style={{
          position: "fixed", bottom: 0, left: 0, width: "100%",
          display: "flex", alignItems: "center", justifyContent: "space-around",
          padding: "10px 12px", zIndex: 50,
          borderTop: "1px solid var(--border)",
          background: "rgba(12,12,12,0.95)", backdropFilter: "blur(12px)",
        }}>
          {navItems.map(({ href, label }) => {
            const id = href.slice(1);
            const isActive = active === id;
            return (
              <a key={id} href={href} style={{
                fontSize: 9, textTransform: "uppercase", letterSpacing: "0.08em",
                padding: "6px 8px",
                color: isActive ? "var(--bright)" : "var(--dim)",
                textDecoration: "none", transition: "color 0.2s",
              }}>
                {label}
              </a>
            );
          })}
        </nav>
      )}

      {/* ── Contact modal ── */}
      {modalOpen && <ContactModal onClose={() => setModalOpen(false)} />}
    </div>
  );
}