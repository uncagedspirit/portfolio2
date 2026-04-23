import { useState, useEffect, useRef, useCallback } from "react";
import { profileData } from "../data";

const SIDEBAR_WIDTH = 220;

const navItems = [
  { id: "home",       label: "Home"       },
  { id: "experience", label: "Experience" },
  { id: "projects",   label: "Projects"   },
  { id: "education",  label: "Education"  },
  { id: "social",     label: "Elsewhere"  },
];

function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

async function sendBrevoEmail({ name, email, message }) {
  const apiKey = import.meta.env.VITE_BREVO_API_KEY;
  if (!apiKey) { console.warn("VITE_BREVO_API_KEY not set."); return { ok: true }; }
  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: { "api-key": apiKey, "Content-Type": "application/json" },
    body: JSON.stringify({
      sender: { name: "Portfolio Contact Form", email: profileData.email },
      replyTo: { email, name },
      to: [{ email: profileData.email, name: `${profileData.name} ${profileData.surname}` }],
      subject: `Portfolio — new message from ${name}`,
      htmlContent: `<div style="font-family:monospace;font-size:13px;color:#222;line-height:1.7">
        <h2>New message from your portfolio</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <hr style="border:none;border-top:1px solid #ddd;margin:16px 0"/>
        <p style="white-space:pre-wrap">${message.replace(/</g, "&lt;")}</p>
      </div>`,
    }),
  });
  if (!res.ok) throw new Error(`Brevo ${res.status}`);
  return { ok: true };
}

// ─── GlitchAvatar ─────────────────────────────────────────────────────────────
// Short, sharp RGB split — 160ms total, 3px max offset, no shake.
// Triggered externally via the `trigger` prop (a counter that increments).
// Image swaps at the midpoint of the burst.
const BURST_MS = 160;

function GlitchAvatar({ src1, src2, size = 52, triggerCount, toAlt }) {
  const [src, setSrc]         = useState(src1);
  const [glitching, setGlitching] = useState(false);
  const [offsets, setOffsets] = useState({ r: [0,0], g: [0,0], b: [0,0] });
  const frameRef  = useRef(null);
  const swapped   = useRef(false);
  const startRef  = useRef(null);
  const toAltRef  = useRef(toAlt);

  // Run the burst animation
  const tick = useCallback(() => {
    const elapsed = performance.now() - startRef.current;
    const t       = Math.min(elapsed / BURST_MS, 1);

    // Sharp triangle envelope: rises to peak at t=0.3, then falls
    const env = t < 0.3 ? t / 0.3 : 1 - (t - 0.3) / 0.7;
    const mag = env * 3; // max 3px — subtle, not flashy

    // Swap image at midpoint
    if (t >= 0.5 && !swapped.current) {
      swapped.current = true;
      setSrc(toAltRef.current ? src2 : src1);
    }

    setOffsets({
      r: [(Math.random() - 0.5) * mag * 2, (Math.random() - 0.5) * mag * 0.5],
      g: [(Math.random() - 0.5) * mag * 2, (Math.random() - 0.5) * mag * 0.5],
      b: [(Math.random() - 0.5) * mag * 2, (Math.random() - 0.5) * mag * 0.5],
    });

    if (t < 1) {
      frameRef.current = requestAnimationFrame(tick);
    } else {
      setOffsets({ r: [0,0], g: [0,0], b: [0,0] });
      setGlitching(false);
      frameRef.current = null;
    }
  }, [src1, src2]);

  // Fire whenever triggerCount increments
  useEffect(() => {
    if (triggerCount === 0) return;
    toAltRef.current = toAlt;
    swapped.current  = false;
    startRef.current = performance.now();
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    setGlitching(true);
    frameRef.current = requestAnimationFrame(tick);
  }, [triggerCount]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => () => { if (frameRef.current) cancelAnimationFrame(frameRef.current); }, []);

  const { r, g, b } = offsets;

  return (
    <div style={{
      position: "relative",
      width: size, height: size,
      borderRadius: "50%",
      overflow: "hidden",
      border: "1px solid var(--border)",
      marginBottom: 12,
      flexShrink: 0,
      background: "#000",
    }}>
      {/* Base image — hidden only during glitch */}
      <img src={src} alt="avatar" draggable={false}
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          objectFit: "cover", borderRadius: "50%",
          opacity: glitching ? 0 : 1,
          transition: glitching ? "none" : "opacity 0.1s ease",
          userSelect: "none", pointerEvents: "none",
        }} />

      {/* R channel */}
      <img src={src} alt="" draggable={false}
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          objectFit: "cover", borderRadius: "50%",
          transform: `translate(${r[0]}px,${r[1]}px)`,
          filter: "saturate(0) sepia(1) hue-rotate(-40deg) saturate(8) brightness(1.1)",
          mixBlendMode: "screen",
          opacity: glitching ? 1 : 0,
          transition: "none",
          userSelect: "none", pointerEvents: "none",
        }} />

      {/* G channel */}
      <img src={src} alt="" draggable={false}
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          objectFit: "cover", borderRadius: "50%",
          transform: `translate(${g[0]}px,${g[1]}px)`,
          filter: "saturate(0) sepia(1) hue-rotate(75deg) saturate(8) brightness(1.1)",
          mixBlendMode: "screen",
          opacity: glitching ? 1 : 0,
          transition: "none",
          userSelect: "none", pointerEvents: "none",
        }} />

      {/* B channel */}
      <img src={src} alt="" draggable={false}
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          objectFit: "cover", borderRadius: "50%",
          transform: `translate(${b[0]}px,${b[1]}px)`,
          filter: "saturate(0) sepia(1) hue-rotate(195deg) saturate(8) brightness(1.1)",
          mixBlendMode: "screen",
          opacity: glitching ? 1 : 0,
          transition: "none",
          userSelect: "none", pointerEvents: "none",
        }} />
    </div>
  );
}

// ─── GlitchText ───────────────────────────────────────────────────────────────
// Scrambles then locks left-to-right in ~12 frames. Only fires on text change.
const NOISE = "!<>-_\\/[]{}—=+*^?#▓▒░│┼";

function GlitchText({ text }) {
  const [display, setDisplay] = useState(text);
  const prevText = useRef(text);
  const frameRef = useRef(null);

  useEffect(() => {
    if (text === prevText.current) return;
    prevText.current = text;

    let frame = 0;
    const FRAMES = 12;

    const run = () => {
      const progress  = frame / FRAMES;
      const revealIdx = Math.floor(progress * text.length);
      const out = text.split("").map((ch, i) => {
        if (ch === " ") return " ";
        if (i < revealIdx) return ch;
        return NOISE[Math.floor(Math.random() * NOISE.length)];
      }).join("");

      setDisplay(out);
      frame++;

      if (frame <= FRAMES) {
        frameRef.current = requestAnimationFrame(run);
      } else {
        setDisplay(text);
        frameRef.current = null;
      }
    };

    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(run);
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current); };
  }, [text]);

  return <>{display}</>;
}

// ─── ContactModal ──────────────────────────────────────────────────────────────
function ContactModal({ onClose }) {
  const [form, setForm]     = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    try   { await sendBrevoEmail(form); setStatus("sent");  }
    catch { setStatus("error"); }
  };

  return (
    <div onClick={onClose}
      style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div onClick={(e) => e.stopPropagation()}
        style={{ background: "var(--surface)", border: "1px solid var(--border)", padding: 40, width: "100%", maxWidth: 480, position: "relative" }}>
        <button onClick={onClose}
          style={{ position: "absolute", top: 16, right: 20, background: "none", border: "none", color: "var(--muted)", fontSize: 18, cursor: "pointer" }}>×</button>

        {status === "sent" ? (
          <div style={{ textAlign: "center", padding: "32px 0" }}>
            <div className="serif" style={{ fontStyle: "italic", fontSize: 24, color: "var(--bright)", marginBottom: 12 }}>Noted.</div>
            <div style={{ fontSize: 12, color: "var(--dim)" }}>Message sent — I'll be in touch soon.</div>
          </div>
        ) : (
          <>
            <div style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.18em", color: "var(--muted)", marginBottom: 8 }}>Get in touch</div>
            <div className="serif" style={{ fontStyle: "italic", fontSize: 22, color: "var(--bright)", marginBottom: 32 }}>Work with me</div>

            {[{ key: "name", label: "Name", type: "text", placeholder: "Your name" },
              { key: "email", label: "Email", type: "email", placeholder: "your@email.com" }
            ].map(({ key, label, type, placeholder }) => (
              <div key={key} style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--muted)", marginBottom: 8 }}>{label}</label>
                <input type={type} placeholder={placeholder} value={form[key]}
                  onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                  style={{ width: "100%", background: "var(--bg)", border: "1px solid var(--border)", color: "var(--text)", fontSize: 12, padding: "10px 12px", outline: "none", fontFamily: "inherit" }}
                  onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                  onBlur={(e)  => (e.target.style.borderColor = "var(--border)")} />
              </div>
            ))}

            <div style={{ marginBottom: 28 }}>
              <label style={{ display: "block", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--muted)", marginBottom: 8 }}>Message</label>
              <textarea placeholder="Tell me about your project..." rows={4} value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                style={{ width: "100%", background: "var(--bg)", border: "1px solid var(--border)", color: "var(--text)", fontSize: 12, padding: "10px 12px", outline: "none", fontFamily: "inherit", resize: "vertical" }}
                onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                onBlur={(e)  => (e.target.style.borderColor = "var(--border)")} />
            </div>

            {status === "error" && (
              <div style={{ fontSize: 10, color: "#e07070", marginBottom: 12 }}>
                Something went wrong. Email directly: {profileData.email}
              </div>
            )}

            <button onClick={handleSubmit} disabled={status === "sending"}
              style={{ width: "100%", background: "var(--accent)", color: "#000", border: "none", padding: "12px 0", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.14em", cursor: status === "sending" ? "not-allowed" : "pointer", fontFamily: "inherit", opacity: status === "sending" ? 0.6 : 1 }}>
              {status === "sending" ? "Sending…" : "Send message"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Layout ────────────────────────────────────────────────────────────────────
export default function Layout({ children }) {
  const [active, setActive]         = useState("home");
  const [isMobile, setIsMobile]     = useState(() => window.innerWidth < 768);
  const [modalOpen, setModalOpen]   = useState(false);
  // hovered = whether the sidebar area is currently entered
  const [hovered, setHovered]       = useState(false);
  // triggerCount increments on each enter/leave — drives GlitchAvatar
  const [triggerCount, setTriggerCount] = useState(0);
  const rafRef    = useRef(null);
  const prevActive = useRef("home");

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll("section[id]"));
    if (!sections.length) return;
    const update = () => {
      const center = window.scrollY + window.innerHeight / 2;
      let closest = sections[0], minD = Infinity;
      for (const s of sections) {
        const d = Math.abs(center - (s.offsetTop + s.offsetHeight / 2));
        if (d < minD) { minD = d; closest = s; }
      }
      if (closest.id !== prevActive.current) {
        prevActive.current = closest.id;
        setActive(closest.id);
      }
    };
    const schedule = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", schedule);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Called when the whole sidebar <aside> is entered or left
  const handleSidebarEnter = useCallback(() => {
    setHovered(true);
    setTriggerCount((n) => n + 1);
  }, []);

  const handleSidebarLeave = useCallback(() => {
    setHovered(false);
    setTriggerCount((n) => n + 1);
  }, []);

  const displayName = hovered
    ? "UncagedSpirit"
    : `${profileData.name} ${profileData.surname}`;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg)" }}>

      {/* ── Desktop Sidebar ── */}
      {!isMobile && (
        <aside
          onMouseEnter={handleSidebarEnter}
          onMouseLeave={handleSidebarLeave}
          style={{
            position: "fixed", top: 0, left: 0,
            width: SIDEBAR_WIDTH, height: "100vh",
            display: "flex", flexDirection: "column",
            padding: "40px 28px", zIndex: 50,
            borderRight: "1px solid var(--border)",
            background: "var(--bg)", flexShrink: 0,
          }}
        >
          {/* Avatar — receives external trigger, not its own hover */}
          <GlitchAvatar
            src1="/dp1.jpg"
            src2="/dp2.png"
            size={52}
            triggerCount={triggerCount}
            toAlt={hovered}
          />

          {/* Name glitch */}
          <div className="serif" style={{ fontStyle: "italic", fontSize: 20, lineHeight: 1.2, marginBottom: 4, color: "var(--bright)" }}>
            <GlitchText text={displayName} />
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
                <button key={id} onClick={() => scrollTo(id)}
                  style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", padding: "6px 0", width: "100%", color: isActive ? "var(--bright)" : "var(--dim)", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", textAlign: "left", transition: "color 0.2s ease" }}
                  onMouseEnter={(e) => !isActive && (e.currentTarget.style.color = "var(--bright)")}
                  onMouseLeave={(e) => !isActive && (e.currentTarget.style.color = "var(--dim)")}>
                  <span style={{ color: isActive ? "var(--accent)" : "var(--border)", fontSize: 10, transition: "color 0.2s ease" }}>—</span>
                  {label}
                </button>
              );
            })}
          </nav>

          <button onClick={() => setModalOpen(true)}
            style={{ width: "100%", background: "transparent", border: "1px solid var(--border)", color: "var(--dim)", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.14em", padding: "9px 0", cursor: "pointer", fontFamily: "inherit", marginBottom: 12, transition: "border-color 0.2s, color 0.2s" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)";  e.currentTarget.style.color = "var(--dim)";    }}>
            Work with me
          </button>

          <div style={{ fontSize: 9, letterSpacing: "0.05em", lineHeight: 1.6, paddingTop: 16, borderTop: "1px solid var(--border)", wordBreak: "break-all" }}>
            <a href={`mailto:${profileData.email}`}
              style={{ color: "var(--dim)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--dim)")}>
              {profileData.email}
            </a>
          </div>
        </aside>
      )}

      {/* ── Main ── */}
      <main style={{ marginLeft: isMobile ? 0 : SIDEBAR_WIDTH, width: isMobile ? "100%" : `calc(100% - ${SIDEBAR_WIDTH}px)`, minWidth: 0, paddingBottom: isMobile ? 64 : 0 }}>
        {children}
      </main>

      {/* ── Mobile bottom nav ── */}
      {isMobile && (
        <nav style={{ position: "fixed", bottom: 0, left: 0, width: "100%", display: "flex", alignItems: "center", justifyContent: "space-around", padding: "10px 12px", zIndex: 50, borderTop: "1px solid var(--border)", background: "rgba(12,12,12,0.95)", backdropFilter: "blur(12px)" }}>
          {navItems.map(({ id, label }) => {
            const isActive = active === id;
            return (
              <button key={id} onClick={() => scrollTo(id)}
                style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.08em", padding: "6px 8px", color: isActive ? "var(--bright)" : "var(--dim)", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", transition: "color 0.2s ease" }}
                onMouseEnter={(e) => !isActive && (e.currentTarget.style.color = "var(--bright)")}
                onMouseLeave={(e) => !isActive && (e.currentTarget.style.color = "var(--dim)")}>
                {label}
              </button>
            );
          })}
        </nav>
      )}

      {modalOpen && <ContactModal onClose={() => setModalOpen(false)} />}
    </div>
  );
}