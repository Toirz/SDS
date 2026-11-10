import { AbsoluteFill, useCurrentFrame } from "remotion";
import { event, formatEventDate } from "../../../src/features/event/config";
import { CHART, trendX, trendY } from "../components/Particles";
import { colors, easeInOut, progress, reveal, scenes } from "../theme";

const Headline = ({ children, start, end, top }: { children: React.ReactNode; start: number; end: number; top: number }) => {
  const frame = useCurrentFrame();
  if (frame < start || frame > end) return null;
  return (
    <div style={{ position: "absolute", top, left: 0, right: 0, textAlign: "center", fontSize: 92, fontWeight: 700, letterSpacing: "-0.035em", ...reveal(frame, start, end) }}>
      {children}
    </div>
  );
};

// Axes and the regression line that "finds" the trend in the scatter.
const SignalChart = () => {
  const frame = useCurrentFrame();
  const [start] = scenes.signal;
  if (frame < start || frame > 230) return null;
  const axes = progress(frame, start + 6, start + 40, easeInOut);
  const line = progress(frame, start + 48, start + 92, easeInOut);
  const fade = 1 - progress(frame, 200, 218);
  const x1 = trendX(-0.02);
  const x2 = trendX(1.02);
  const y1 = trendY(-0.02);
  const y2 = trendY(1.02);
  const length = Math.hypot(x2 - x1, y2 - y1);
  return (
    <svg width={1920} height={1080} style={{ position: "absolute", inset: 0, opacity: fade }}>
      <path
        d={`M ${CHART.left} ${CHART.top} V ${CHART.bottom} H ${CHART.right}`}
        stroke={colors.line}
        strokeWidth={2}
        fill="none"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1 - axes}
      />
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={colors.text} strokeWidth={4} strokeLinecap="round" strokeDasharray={length} strokeDashoffset={length * (1 - line)} />
      <circle cx={x1 + (x2 - x1) * line} cy={y1 + (y2 - y1) * line} r={9} fill={colors.text} opacity={line > 0 && line < 1 ? 1 : 0} />
    </svg>
  );
};

const Title = () => {
  const frame = useCurrentFrame();
  const [, end] = scenes.logo;
  const start = 252;
  if (frame < start || frame > end) return null;
  const line = (delay: number) => reveal(frame, start + delay, end - (8 - delay / 2), 40);
  return (
    <div style={{ position: "absolute", left: 1010, top: 0, bottom: 0, display: "flex", flexDirection: "column", justifyContent: "center", gap: 18 }}>
      <div style={{ fontSize: 34, fontWeight: 600, color: colors.yellow, ...line(0) }}>{event.organizer}</div>
      <div style={{ fontSize: 148, fontWeight: 750, lineHeight: 0.95, letterSpacing: "-0.05em", ...line(4) }}>
        Datathon
        <br />
        {event.year}
      </div>
      <div style={{ fontSize: 38, color: colors.muted, marginTop: 8, ...line(8) }}>{event.hero.motifCaption}</div>
      <div style={{ ...line(12), marginTop: 18 }}>
        <span style={{ display: "inline-block", padding: "12px 22px", borderRadius: 999, border: `1px solid ${colors.yellowLine}`, background: colors.yellowSoft, color: colors.yellow, fontSize: 28, fontWeight: 500 }}>
          {formatEventDate(event.dates.start, "short").replace(/ \d{4}$/, "")} – {formatEventDate(event.dates.end, "short")}
        </span>
      </div>
    </div>
  );
};

export const Opening = () => (
  <AbsoluteFill>
    <Headline start={12} end={88} top={470}>Every dataset has a story.</Headline>
    <SignalChart />
    <Headline start={108} end={200} top={150}>
      Find the <span style={{ color: colors.yellow }}>signal</span>.
    </Headline>
    <Title />
  </AbsoluteFill>
);

