import { useState, useEffect, useRef } from "react";
import { profileData } from "../data";

const SIDEBAR_WIDTH = 220;

const navItems = [
  { id: "home", label: "Home" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "social", label: "Elsewhere" },
];

// Smooth scroll without touching the URL
function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

// ─── Brevo email sender ───────────────────────────────────────────────────────
async function sendBrevoEmail({ name, email, message }) {
  const apiKey = import.meta.env.VITE_BREVO_API_KEY;
  if (!apiKey) {
    console.warn("VITE_BREVO_API_KEY not set — skipping actual email send.");
    return { ok: true };
  }

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sender: {
        name: "Portfolio Contact Form",
        email: profileData.email,
      },
      replyTo: { email, name },
      to: [{ email: profileData.email, name: `${profileData.name} ${profileData.surname}` }],
      subject: `Portfolio — new message from ${name}`,
      htmlContent: `
        <div style="font-family:monospace;font-size:13px;color:#222;line-height:1.7">
          <h2 style="font-size:16px;margin-bottom:16px">New message from your portfolio</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <hr style="border:none;border-top:1px solid #ddd;margin:16px 0"/>
          <p style="white-space:pre-wrap">${message.replace(/</g, "&lt;")}</p>
        </div>
      `,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Brevo error ${res.status}: ${body}`);
  }
  return { ok: true };
}

// ─── Contact Modal ────────────────────────────────────────────────────────────
function ContactModal({ onClose }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    try {
      await sendBrevoEmail(form);
      setStatus("sent");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
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
        <button
          onClick={onClose}
          style={{ position: "absolute", top: 16, right: 20, background: "none", border: "none", color: "var(--muted)", fontSize: 18, cursor: "pointer" }}
        >×</button>

        {status === "sent" ? (
          <div style={{ textAlign: "center", padding: "32px 0" }}>
            <div className="serif" style={{ fontStyle: "italic", fontSize: 24, color: "var(--bright)", marginBottom: 12 }}>Noted.</div>
            <div style={{ fontSize: 12, color: "var(--dim)" }}>Message sent — I'll be in touch soon.</div>
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

            {status === "error" && (
              <div style={{ fontSize: 10, color: "#e07070", marginBottom: 12 }}>
                Something went wrong. Please try emailing directly at {profileData.email}.
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={status === "sending"}
              style={{
                width: "100%", background: "var(--accent)", color: "#000",
                border: "none", padding: "12px 0", fontSize: 10,
                textTransform: "uppercase", letterSpacing: "0.14em",
                cursor: status === "sending" ? "not-allowed" : "pointer",
                fontFamily: "inherit", transition: "opacity 0.2s",
                opacity: status === "sending" ? 0.6 : 1,
              }}
            >
              {status === "sending" ? "Sending…" : "Send message"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Layout ───────────────────────────────────────────────────────────────────
export default function Layout({ children }) {
  const [active, setActive] = useState("home");
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const [modalOpen, setModalOpen] = useState(false);
  const debounceTimerRef = useRef(null);
  const previousActiveRef = useRef("home");

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Smooth scroll detection using a simpler, more stable approach
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll("section[id]"));
    if (sections.length === 0) return;

    // Function to determine which section is in view
    const updateActiveSection = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const viewportCenter = scrollY + windowHeight / 2;

      let closestSection = sections[0];
      let closestDistance = Infinity;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionCenter = sectionTop + sectionHeight / 2;
        const distance = Math.abs(viewportCenter - sectionCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestSection = section;
        }
      });

      const newActive = closestSection.id;
      
      // Only update if it actually changed
      if (newActive !== previousActiveRef.current) {
        previousActiveRef.current = newActive;
        setActive(newActive);
      }
    };

    // Debounced scroll listener - update max once per 100ms during scroll
    const handleScroll = () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      debounceTimerRef.current = setTimeout(() => {
        updateActiveSection();
      }, 100);
    };

    // Also update on initial load
    updateActiveSection();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
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
            {navItems.map(({ id, label }) => {
              const isActive = active === id;
              return (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  style={{
                    display: "flex", alignItems: "center", gap: 10,
                    fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em",
                    padding: "6px 0", width: "100%",
                    color: isActive ? "var(--bright)" : "var(--dim)",
                    background: "none", border: "none", cursor: "pointer",
                    fontFamily: "inherit", textAlign: "left",
                    transition: "color 0.3s ease",
                  }}
                  onMouseEnter={(e) => !isActive && (e.currentTarget.style.color = "var(--bright)")}
                  onMouseLeave={(e) => !isActive && (e.currentTarget.style.color = "var(--dim)")}
                >
                  <span style={{ color: isActive ? "var(--accent)" : "var(--border)", fontSize: 10, transition: "color 0.3s ease" }}>—</span>
                  {label}
                </button>
              );
            })}
          </nav>

          {/* Work with me */}
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

          {/* Email */}
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
          {navItems.map(({ id, label }) => {
            const isActive = active === id;
            return (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                style={{
                  fontSize: 9, textTransform: "uppercase", letterSpacing: "0.08em",
                  padding: "6px 8px",
                  color: isActive ? "var(--bright)" : "var(--dim)",
                  background: "none", border: "none", cursor: "pointer",
                  fontFamily: "inherit", transition: "color 0.3s ease",
                }}
                onMouseEnter={(e) => !isActive && (e.currentTarget.style.color = "var(--bright)")}
                onMouseLeave={(e) => !isActive && (e.currentTarget.style.color = "var(--dim)")}
              >
                {label}
              </button>
            );
          })}
        </nav>
      )}

      {/* ── Contact modal ── */}
      {modalOpen && <ContactModal onClose={() => setModalOpen(false)} />}
    </div>
  );
}