import { useEffect, useState } from "react";

// Black → dark gold → bright gold scale (levels 0–4)
const LEVEL_COLORS = [
  "#161616",   // 0 — empty
  "#3a2808",   // 1 — faint
  "#6b4a0e",   // 2 — medium
  "#a87518",   // 3 — strong
  "#e8d5a3",   // 4 — full (matches --accent)
];

function buildWeeks(contributions) {
  if (!contributions || !contributions.length) return [];

  // Pad from the first day of the week (Sunday = 0)
  const first = new Date(contributions[0].date);
  const startDow = first.getDay();
  const padded = Array(startDow).fill(null).concat(contributions);

  const weeks = [];
  for (let i = 0; i < padded.length; i += 7) {
    weeks.push(padded.slice(i, Math.min(i + 7, padded.length)));
  }
  // Ensure each week has exactly 7 slots
  return weeks.map((w) => {
    while (w.length < 7) w.push(null);
    return w;
  });
}

const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function GithubGraph({ username = "uncagedspirit" }) {
  const [weeks, setWeeks] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [monthPositions, setMonthPositions] = useState([]);

  useEffect(() => {
    fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`)
      .then((r) => {
        if (!r.ok) throw new Error("API error");
        return r.json();
      })
      .then((data) => {
        const contributions = data.contributions || [];
        const built = buildWeeks(contributions.slice(-365));
        setWeeks(built);

        // Calculate month label positions
        const positions = [];
        let lastMonth = -1;
        built.forEach((week, wi) => {
          const firstReal = week.find((d) => d !== null);
          if (firstReal) {
            const month = new Date(firstReal.date).getMonth();
            if (month !== lastMonth) {
              positions.push({ wi, label: MONTH_LABELS[month] });
              lastMonth = month;
            }
          }
        });
        setMonthPositions(positions);

        const year = new Date().getFullYear();
        setTotal(data.total?.[year] || 0);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [username]);

  const CELL = 11;   // cell size px
  const GAP = 2;     // gap px
  const STEP = CELL + GAP;

  if (loading) {
    return (
      <div style={{ marginTop: 32, height: 96, display: "flex", alignItems: "center" }}>
        <span style={{ fontSize: 9, letterSpacing: "0.12em", color: "var(--muted)", textTransform: "uppercase" }}>
          loading contributions...
        </span>
      </div>
    );
  }

  if (error || !weeks.length) return null;

  return (
    <div style={{ marginTop: 32 }}>
      {/* Header */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        marginBottom: 10,
      }}>
        <span style={{ fontSize: 9, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--muted)" }}>
          GitHub Activity
        </span>
        {/* <span style={{ fontSize: 10, color: "var(--accent)", letterSpacing: "0.06em" }}>
          {total.toLocaleString()}{" "}
          <span style={{ fontSize: 9, color: "var(--muted)" }}>contributions this year</span>
        </span> */}
      </div>

      {/* Graph */}
      <div style={{ overflowX: "auto" }}>
        <div style={{ position: "relative", paddingTop: 16, minWidth: weeks.length * STEP }}>

          {/* Month labels */}
          <div style={{ position: "relative", height: 14, marginBottom: 4 }}>
            {monthPositions.map(({ wi, label }) => (
              <span
                key={`${wi}-${label}`}
                style={{
                  position: "absolute",
                  left: wi * STEP,
                  fontSize: 8,
                  letterSpacing: "0.06em",
                  color: "var(--dim)",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                }}
              >
                {label}
              </span>
            ))}
          </div>

          {/* Cell grid */}
          <div style={{ display: "flex", gap: GAP }}>
            {weeks.map((week, wi) => (
              <div key={wi} style={{ display: "flex", flexDirection: "column", gap: GAP }}>
                {week.map((day, di) => (
                  <div
                    key={di}
                    title={day ? `${day.date}  ·  ${day.count} contribution${day.count !== 1 ? "s" : ""}` : ""}
                    style={{
                      width: CELL,
                      height: CELL,
                      borderRadius: 2,
                      background: day ? LEVEL_COLORS[day.level ?? 0] : LEVEL_COLORS[0],
                      border: day && day.level > 0 ? "none" : "1px solid #1f1f1f",
                      flexShrink: 0,
                      transition: "transform 0.1s",
                      cursor: day ? "default" : "default",
                    }}
                    onMouseEnter={(e) => { if (day?.count > 0) e.currentTarget.style.transform = "scale(1.3)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            marginTop: 14,
            // justifyContent: "flex-end",
          }}>
            <span style={{ fontSize: 8, color: "var(--muted)", marginRight: 4 }}>Less</span>
            {LEVEL_COLORS.map((color, i) => (
              <div
                key={i}
                style={{
                  width: CELL,
                  height: CELL,
                  borderRadius: 2,
                  background: color,
                  border: i === 0 ? "1px solid #1f1f1f" : "none",
                }}
              />
            ))}
            <span style={{ fontSize: 8, color: "var(--muted)", marginLeft: 4 }}>More</span>
          </div>
        </div>
      </div>
    </div>
  );
}