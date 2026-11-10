import { AbsoluteFill, useCurrentFrame } from "remotion";
import { colors } from "../theme";

const CELL = 80;

// Slowly drifting grid, echoing the DataMotif on the website.
export const Background = () => {
  const frame = useCurrentFrame();
  const offset = (frame * 0.25) % CELL;
  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg }}>
      <AbsoluteFill
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)`,
          backgroundSize: `${CELL}px ${CELL}px`,
          backgroundPosition: `${offset}px ${offset * 0.5}px`,
        }}
      />
      <AbsoluteFill style={{ background: `radial-gradient(60% 70% at 50% 45%, transparent 0%, ${colors.bg} 100%)` }} />
    </AbsoluteFill>
  );
};
