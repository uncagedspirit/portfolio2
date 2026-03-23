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

export default function Layout({ children }) {
  const [active, setActive] = useState("home");
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { threshold: 0.3, rootMargin: "-10% 0px -60% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg)" }}>

      {/* ── Desktop Sidebar ── fixed, full height, exactly SIDEBAR_WIDTH wide */}
      {!isMobile && (
        <aside
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: SIDEBAR_WIDTH,
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            padding: "40px 28px",
            zIndex: 50,
            borderRight: "1px solid var(--border)",
            background: "var(--bg)",
            flexShrink: 0,
          }}
        >
          <div
            className="serif"
            style={{ fontStyle: "italic", fontSize: 20, lineHeight: 1.2, marginBottom: 4, color: "var(--bright)" }}
          >
            {profileData.name}<br />{profileData.surname}
          </div>
          <div style={{ fontSize: 10, letterSpacing: "0.1em", marginBottom: 36, color: "var(--dim)" }}>
            {profileData.handle}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 10, marginBottom: 40, color: "var(--green)" }}>
            <span
              className="status-dot"
              style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--green)", display: "inline-block" }}
            />
            available · pune, in
          </div>

          <nav style={{ flex: 1 }}>
            {navItems.map(({ href, label }) => {
              const id = href.slice(1);
              const isActive = active === id;
              return (
                <a
                  key={id}
                  href={href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    padding: "6px 0",
                    color: isActive ? "var(--bright)" : "var(--dim)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                >
                  <span style={{ color: isActive ? "var(--accent)" : "var(--border)", fontSize: 10 }}>—</span>
                  {label}
                </a>
              );
            })}
          </nav>

          <div
            style={{
              fontSize: 9,
              letterSpacing: "0.05em",
              lineHeight: 1.6,
              marginTop: "auto",
              paddingTop: 24,
              borderTop: "1px solid var(--border)",
              wordBreak: "break-all",
            }}
          >
            <a
              href={`mailto:${profileData.email}`}
              style={{ color: "var(--dim)", textDecoration: "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--dim)")}
            >
              {profileData.email}
            </a>
          </div>
        </aside>
      )}

      {/* ── Main content ── offset by exactly SIDEBAR_WIDTH on desktop, full width on mobile */}
      <main
        style={{
          marginLeft: isMobile ? 0 : SIDEBAR_WIDTH,
          width: isMobile ? "100%" : `calc(100% - ${SIDEBAR_WIDTH}px)`,
          minWidth: 0,
          paddingBottom: isMobile ? 64 : 0,
        }}
      >
        {children}
      </main>

      {/* ── Mobile bottom nav ── */}
      {isMobile && (
        <nav
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            padding: "10px 12px",
            zIndex: 50,
            borderTop: "1px solid var(--border)",
            background: "rgba(12,12,12,0.95)",
            backdropFilter: "blur(12px)",
          }}
        >
          {navItems.map(({ href, label }) => {
            const id = href.slice(1);
            const isActive = active === id;
            return (
              <a
                key={id}
                href={href}
                style={{
                  fontSize: 9,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  padding: "6px 8px",
                  color: isActive ? "var(--bright)" : "var(--dim)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
              >
                {label}
              </a>
            );
          })}
        </nav>
      )}
    </div>
  );
}