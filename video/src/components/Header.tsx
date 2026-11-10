import { useCurrentFrame } from "remotion";
import { event } from "../../../src/features/event/config";
import { colors, reveal } from "../theme";

// Small brand line next to the logo badge while the information scenes play.
export const Header = () => {
  const frame = useCurrentFrame();
  if (frame < 338 || frame > 890) return null;
  return (
    <div style={{ position: "absolute", left: 160, top: 70, fontSize: 30, fontWeight: 600, letterSpacing: "-0.01em", ...reveal(frame, 338, 890, 12) }}>
      {event.name}
    </div>
  );
};

export const SceneTitle = ({ eyebrow, title, frame, start, end }: { eyebrow: string; title: React.ReactNode; frame: number; start: number; end: number }) => (
  <div style={{ position: "absolute", left: 160, top: 190, right: 160 }}>
    <div style={{ fontSize: 26, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: colors.yellow, ...reveal(frame, start, end, 24) }}>{eyebrow}</div>
    <div style={{ marginTop: 14, fontSize: 76, fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1.05, ...reveal(frame, start + 4, end, 32) }}>{title}</div>
  </div>
);
