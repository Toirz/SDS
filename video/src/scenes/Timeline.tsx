import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { event } from "../../../src/features/event/config";
import { SceneTitle } from "../components/Header";
import { colors, easeInOut, formatShortDate, progress, reveal, scenes } from "../theme";

// Every website milestone is shown on the chart.
const SHOWN = ["Registration opens", "Registration closes", "Online workshop 1", "Online workshop 2", "Submission deadline", "Finale and closing"];
const milestones = event.milestones.filter((m) => SHOWN.includes(m.label));

const LEFT = 250;
const RIGHT = 1670;
const BASELINE = 700;
const HEIGHTS = [0.12, 0.26, 0.36, 0.48, 0.66, 0.8, 1];
const points = milestones.map((m, i) => ({
  ...m,
  x: LEFT + (i * (RIGHT - LEFT)) / (milestones.length - 1),
  y: 650 - (HEIGHTS[i] ?? 1) * 240,
}));
const cumulative = points.map((p, i) => (i === 0 ? 0 : Math.hypot(p.x - points[i - 1].x, p.y - points[i - 1].y)));
for (let i = 1; i < cumulative.length; i++) cumulative[i] += cumulative[i - 1];
const total = cumulative[cumulative.length - 1];
const linePath = points.map((p, i) => `${i ? "L" : "M"} ${p.x} ${p.y}`).join(" ");
const areaPath = `${linePath} L ${RIGHT} ${BASELINE} L ${LEFT} ${BASELINE} Z`;

export const Timeline = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const [start, end] = scenes.timeline;
  if (frame < start || frame > end) return null;
  const drawStart = start + 22;
  const drawnAt = (f: number) => progress(f, drawStart, drawStart + 110, easeInOut) * total;
  const drawn = drawnAt(frame);
  // First frame at which the eased line reaches each point, so dots and labels pop in sync.
  const reachedAt = cumulative.map((length) => {
    let f = drawStart;
    while (f < drawStart + 110 && drawnAt(f) < length - 1) f++;
    return f;
  });
  const exit = progress(frame, end - 12, end);
  const area = progress(frame, drawStart + 100, drawStart + 130);

  return (
    <AbsoluteFill style={{ opacity: 1 - exit }}>
      <SceneTitle frame={frame} start={start} end={end + 20} eyebrow="Key dates" title="Mark your calendar." />
      <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
        <defs>
          <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={colors.yellow} stopOpacity={0.22} />
            <stop offset="100%" stopColor={colors.yellow} stopOpacity={0} />
          </linearGradient>
        </defs>
        <line x1={LEFT - 60} x2={RIGHT + 60} y1={BASELINE} y2={BASELINE} stroke={colors.line} strokeWidth={2} />
        <path d={areaPath} fill="url(#area)" opacity={area} />
        <path d={linePath} fill="none" stroke={colors.yellow} strokeWidth={5} strokeLinejoin="round" strokeLinecap="round" strokeDasharray={total} strokeDashoffset={total - drawn} />
        {points.map((p, i) => {
          const pop = spring({ frame: frame - reachedAt[i], fps, config: { damping: 12, mass: 0.6 } });
          const isFinale = i === points.length - 1;
          return (
            <g key={p.label} opacity={drawn >= cumulative[i] - 1 ? 1 : 0}>
              <line x1={p.x} x2={p.x} y1={p.y} y2={BASELINE} stroke={colors.line} strokeWidth={2} strokeDasharray="6 8" opacity={pop} />
              {isFinale && <circle cx={p.x} cy={p.y} r={30 * pop} fill={colors.yellow} opacity={0.18} />}
              <circle cx={p.x} cy={p.y} r={(isFinale ? 15 : 11) * pop} fill={isFinale ? colors.yellow : colors.bg} stroke={colors.yellow} strokeWidth={4} />
            </g>
          );
        })}
      </svg>
      {points.map((p, i) => {
        return (
          <div key={p.label} style={{ position: "absolute", top: BASELINE + 30, left: p.x - 115, width: 230, textAlign: "center", ...reveal(frame, reachedAt[i], end + 20, 20, 14) }}>
            <div style={{ fontSize: 34, fontWeight: 700, color: colors.yellow, letterSpacing: "-0.02em" }}>{formatShortDate(p.date)}</div>
            <div style={{ marginTop: 6, fontSize: 24, lineHeight: 1.3 }}>{p.label}</div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
