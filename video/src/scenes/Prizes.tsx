import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { event } from "../../../src/features/event/config";
import { SceneTitle } from "../components/Header";
import { colors, easeOut, progress, reveal, scenes } from "../theme";

const total = Number(event.prizes.amount.replace(/[^\d]/g, ""));

const ICONS = [
  // T-shirt
  "M8 3 3 6l2 5 3-1v11h8V10l3 1 2-5-5-3a4 4 0 0 1-8 0Z",
  // Cheque
  "M2 6h20v12H2zM6 14h5M15 10h3M15 14h3",
  // Meal
  "M7 3v8m-3-8v4a3 3 0 0 0 6 0V3M7 11v10M17 3c-2 0-3 3-3 6s1 4 3 4v8",
];

export const Prizes = () => {
  const frame = useCurrentFrame();
  const [start, end] = scenes.prizes;
  if (frame < start || frame > end) return null;
  const count = interpolate(frame, [start + 14, start + 54], [0, total], { easing: easeOut, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const exit = progress(frame, end - 12, end);

  return (
    <AbsoluteFill style={{ opacity: 1 - exit }}>
      <SceneTitle frame={frame} start={start} end={end + 20} eyebrow="Prizes" title={event.prizes.intro} />
      <div style={{ position: "absolute", left: 160, top: 470, width: 820, ...reveal(frame, start + 10, end + 20, 40) }}>
        <div style={{ fontSize: 28, color: colors.muted, fontWeight: 500 }}>Total cash prizes</div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 20, marginTop: 4 }}>
          <span style={{ fontSize: 48, fontWeight: 600, color: colors.yellow }}>{event.prizes.currency}</span>
          <span style={{ fontSize: 220, fontWeight: 750, letterSpacing: "-0.06em", lineHeight: 1, color: colors.yellow, fontVariantNumeric: "tabular-nums" }}>
            {Math.round(count).toLocaleString("en-US")}
          </span>
        </div>
        <div style={{ marginTop: 18, fontSize: 30, color: colors.text }}>Across both tracks</div>
      </div>
      <div style={{ position: "absolute", left: 1060, right: 160, top: 470, display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 28, color: colors.muted, fontWeight: 500, ...reveal(frame, start + 20, end + 20, 20) }}>Also included</div>
        {event.prizes.perks.map((perk, i) => (
          <div key={perk.title} style={{ display: "flex", alignItems: "center", gap: 28, padding: "26px 0", borderBottom: i < event.prizes.perks.length - 1 ? `1px solid ${colors.line}` : "none", ...reveal(frame, start + 28 + i * 8, end + 20, 30) }}>
            <div style={{ width: 72, height: 72, flex: "none", borderRadius: 16, background: colors.yellowSoft, border: `1px solid ${colors.yellowLine}`, display: "grid", placeItems: "center" }}>
              <svg width={38} height={38} viewBox="0 0 24 24" fill="none" stroke={colors.yellow} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                <path d={ICONS[i] ?? ICONS[0]} />
              </svg>
            </div>
            <div>
              <div style={{ fontSize: 36, fontWeight: 650, letterSpacing: "-0.02em" }}>{perk.title}</div>
              <div style={{ marginTop: 4, fontSize: 25, color: colors.muted }}>{perk.detail}</div>
            </div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
