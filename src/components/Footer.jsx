import { useReveal } from "../hooks/useReveal";

export default function Footer() {
  const ref = useReveal();
  const year = new Date().getFullYear();

  return (
    <footer
      ref={ref}
      className="reveal flex flex-col md:flex-row justify-between items-center gap-3 px-8 md:px-16 py-12"
    >
      <div className="serif italic text-[15px]" style={{ color: "var(--dim)" }}>
        Saakshi Kobarne, {year}
      </div>
      <div className="text-[9px] uppercase tracking-[0.1em]" style={{ color: "var(--muted)" }}>
        Made with craft · Pune, India
      </div>
    </footer>
  );
}
