import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { event } from "../../../src/features/event/config";
import { SceneTitle } from "../components/Header";
import { colors, progress, scenes } from "../theme";

const [, teamRange = "3–5", teamDetail = event.teamSize] = event.teamSize.match(/^(\S+) (.*)$/) ?? [];

const tiles = [
  { eyebrow: "Entry fee", value: "Free", detail: event.entryFee.replace(/^Free /, "") },
  { eyebrow: "Team size", value: teamRange, detail: teamDetail },
  { eyebrow: "Open to", value: "Any major", detail: "Undergraduates at universities in Singapore" },
];

export const Facts = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const [start, end] = scenes.facts;
  if (frame < start || frame > end) return null;
  const exit = progress(frame, end - 12, end);
  return (
    <AbsoluteFill>
      <SceneTitle frame={frame} start={start} end={end} eyebrow="At a glance" title="Free to join. Built for teams." />
      <div style={{ position: "absolute", left: 160, right: 160, top: 470, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 40 }}>
        {tiles.map((tile, i) => {
          const enter = spring({ frame: frame - start - 12 - i * 6, fps, config: { damping: 16, mass: 0.7 } });
          return (
            <div
              key={tile.eyebrow}
              style={{
                height: 330,
                padding: "40px 44px",
                borderRadius: 20,
                border: `1px solid ${colors.line}`,
                background: colors.surface,
                opacity: enter * (1 - exit),
                transform: `translateY(${(1 - enter) * 60 - exit * 20}px) scale(${0.94 + enter * 0.06})`,
              }}
            >
              <div style={{ fontSize: 26, color: colors.muted, fontWeight: 500 }}>{tile.eyebrow}</div>
              <div style={{ marginTop: 22, fontSize: 88, fontWeight: 750, letterSpacing: "-0.05em", lineHeight: 1, whiteSpace: "nowrap", color: colors.yellow }}>{tile.value}</div>
              <div style={{ marginTop: 26, fontSize: 28, lineHeight: 1.4 }}>{tile.detail.charAt(0).toUpperCase() + tile.detail.slice(1)}</div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
