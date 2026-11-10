import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { event } from "../../../src/features/event/config";
import { SceneTitle } from "../components/Header";
import { colors, progress, scenes } from "../theme";

const BARS = [
  [0.35, 0.6, 0.45],
  [0.3, 0.55, 0.42, 0.78, 1],
];

export const Tracks = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const [start, end] = scenes.tracks;
  if (frame < start || frame > end) return null;
  const exit = progress(frame, end - 12, end);

  return (
    <AbsoluteFill>
      <SceneTitle frame={frame} start={start} end={end} eyebrow="Tracks" title={event.tracks.title} />
      <div style={{ position: "absolute", left: 160, right: 160, top: 450, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
        {event.tracks.items.map((track, i) => {
          const enter = spring({ frame: frame - start - 14 - i * 8, fps, config: { damping: 18, mass: 0.8 } });
          const bars = BARS[i] ?? BARS[0];
          return (
            <div
              key={track.name}
              style={{
                position: "relative",
                height: 400,
                padding: "44px 48px",
                borderRadius: 20,
                border: `1px solid ${i === 1 ? colors.yellowLine : colors.line}`,
                background: i === 1 ? colors.yellowSoft : colors.surface,
                opacity: enter * (1 - exit),
                transform: `translateX(${(1 - enter) * (i === 0 ? -80 : 80)}px) translateY(${-exit * 20}px)`,
              }}
            >
              <span style={{ display: "inline-block", padding: "8px 18px", borderRadius: 999, background: colors.yellow, color: colors.ink, fontSize: 24, fontWeight: 600 }}>{track.level}</span>
              <div style={{ marginTop: 26, fontSize: 68, fontWeight: 700, letterSpacing: "-0.04em" }}>{track.name}</div>
              <div style={{ marginTop: 14, fontSize: 28, lineHeight: 1.45, color: colors.muted, maxWidth: 560 }}>{track.description}</div>
              <div style={{ position: "absolute", top: 44, right: 48, height: 110, display: "flex", alignItems: "flex-end", gap: 10 }}>
                {bars.map((h, b) => {
                  const grow = progress(frame, start + 26 + i * 8 + b * 4, start + 50 + i * 8 + b * 4);
                  return <div key={b} style={{ width: 18, height: interpolate(grow, [0, 1], [4, h * 110]), borderRadius: 3, background: b % 2 ? colors.amber : colors.yellow }} />;
                })}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
