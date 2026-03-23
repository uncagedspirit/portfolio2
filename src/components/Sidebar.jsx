import { useState, useEffect } from "react";
import { profileData } from "../data";

const navItems = [
  { href: "#home", label: "Home" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#education", label: "Education" },
  { href: "#social", label: "Elsewhere" },
];

export default function Sidebar() {
  const [active, setActive] = useState("home");

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
    <>
      {/* Desktop sidebar */}
      <aside
        className="fixed top-0 left-0 h-screen flex flex-col py-10 px-7 z-50 hidden md:flex"
        style={{
          width: 220,
          borderRight: "1px solid var(--border)",
          background: "var(--bg)",
        }}
      >
        <div className="serif italic text-xl leading-tight mb-1" style={{ color: "var(--bright)" }}>
          {profileData.name}<br />{profileData.surname}
        </div>
        <div className="text-[10px] tracking-widest mb-9" style={{ color: "var(--dim)" }}>
          {profileData.handle}
        </div>

        <div className="flex items-center gap-2 text-[10px] mb-10" style={{ color: "var(--green)" }}>
          <span
            className="status-dot w-1.5 h-1.5 rounded-full"
            style={{ background: "var(--green)" }}
          />
          available · pune, in
        </div>

        <nav className="flex-1">
          {navItems.map(({ href, label }) => {
            const id = href.slice(1);
            const isActive = active === id;
            return (
              <a
                key={id}
                href={href}
                className="flex items-center gap-2.5 text-[11px] uppercase tracking-widest py-1.5 transition-colors duration-200"
                style={{ color: isActive ? "var(--bright)" : "var(--dim)", textDecoration: "none" }}
              >
                <span style={{ color: isActive ? "var(--accent)" : "var(--border)", fontSize: 10 }}>—</span>
                {label}
              </a>
            );
          })}
        </nav>

        <div
          className="text-[9px] tracking-wide leading-relaxed mt-auto pt-6 break-all"
          style={{ color: "var(--muted)", borderTop: "1px solid var(--border)" }}
        >
          <a
            href={`mailto:${profileData.email}`}
            className="transition-colors duration-200 hover:text-[color:var(--accent)]"
            style={{ color: "var(--dim)", textDecoration: "none" }}
          >
            {profileData.email}
          </a>
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <nav
        className="fixed bottom-0 left-0 w-full flex items-center px-6 py-3.5 z-50 md:hidden"
        style={{
          borderTop: "1px solid var(--border)",
          background: "rgba(12,12,12,0.95)",
          backdropFilter: "blur(12px)",
          gap: 4,
        }}
      >
        {navItems.map(({ href, label }) => {
          const id = href.slice(1);
          const isActive = active === id;
          return (
            <a
              key={id}
              href={href}
              className="text-[10px] uppercase tracking-widest px-2.5 py-1.5 transition-colors duration-200"
              style={{
                color: isActive ? "var(--bright)" : "var(--dim)",
                textDecoration: "none",
              }}
            >
              {label}
            </a>
          );
        })}
      </nav>
    </>
  );
}
