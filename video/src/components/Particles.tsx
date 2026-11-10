import { interpolate, interpolateColors, random, useCurrentFrame } from "remotion";
import { colors, easeInOut, easeOut, HEIGHT, WIDTH } from "../theme";
import { cubeFaces, POSES } from "./Logo";

const GRID = 7; // points per face edge → 3 × 49 = 147 particles
const FACE_COLORS = ["#fbbf2c", colors.orange, "#f6d920"];

// Scatter plot area and the trend the points follow (shared with SignalChart).
export const CHART = { left: 360, right: 1560, top: 330, bottom: 880 };
export const trendY = (t: number) => 820 - t * 400;
export const trendX = (t: number) => 420 + t * 1080;

type Particle = {
  noise: { x: number; y: number };
  scatter: { x: number; y: number };
  cube: { x: number; y: number };
  baseColor: string;
  faceColor: string;
  noiseSize: number;
  appear: number;
  toScatter: number;
  toCube: number;
  phase: number;
};

const { faces, edge } = cubeFaces(POSES.hero);

const particles: Particle[] = faces.flatMap((face, f) =>
  Array.from({ length: GRID * GRID }, (_, k) => {
    const i = f * GRID * GRID + k;
    const a = (k % GRID + 0.5) / GRID;
    const b = (Math.floor(k / GRID) + 0.5) / GRID;
    const t = random(`t${i}`);
    const gauss = (random(`g1${i}`) + random(`g2${i}`) + random(`g3${i}`) - 1.5) * 1.7;
    return {
      noise: { x: 80 + random(`nx${i}`) * (WIDTH - 160), y: 80 + random(`ny${i}`) * (HEIGHT - 160) },
      scatter: { x: trendX(t), y: trendY(t) + gauss * 55 },
      cube: {
        x: face.origin.x + a * face.u.x + b * face.v.x,
        y: face.origin.y + a * face.u.y + b * face.v.y,
      },
      baseColor: random(`c${i}`) < 0.3 ? colors.muted : colors.yellow,
      faceColor: FACE_COLORS[f],
      noiseSize: 3 + random(`s${i}`) * 6,
      appear: random(`a${i}`) * 45,
      toScatter: 90 + random(`d1${i}`) * 22,
      // Assemble the cube roughly top-to-bottom.
      toCube: 200 + (b * 0.6 + random(`d2${i}`) * 0.4) * 30,
      phase: random(`p${i}`) * Math.PI * 2,
    };
  }),
);

const dotSize = edge / GRID * 0.5;

export const Particles = () => {
  const frame = useCurrentFrame();
  if (frame > 290) return null;
  const fadeOut = interpolate(frame, [258, 284], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <svg width={WIDTH} height={HEIGHT} style={{ position: "absolute", inset: 0 }}>
      {particles.map((p, i) => {
        const p1 = interpolate(frame, [p.toScatter, p.toScatter + 40], [0, 1], { easing: easeInOut, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        const p2 = interpolate(frame, [p.toCube, p.toCube + 38], [0, 1], { easing: easeOut, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        const drift = (1 - p1) * 8;
        const nx = p.noise.x + Math.sin(frame / 18 + p.phase) * drift;
        const ny = p.noise.y + Math.cos(frame / 22 + p.phase) * drift;
        const sx = nx + (p.scatter.x - nx) * p1;
        const sy = ny + (p.scatter.y - ny) * p1;
        const x = sx + (p.cube.x - sx) * p2;
        const y = sy + (p.cube.y - sy) * p2;
        const appear = interpolate(frame, [p.appear, p.appear + 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        const flicker = 0.35 + 0.65 * Math.abs(Math.sin(frame / 9 + p.phase));
        const alpha = appear * (flicker + (1 - flicker) * p1) * fadeOut;
        const r = (p.noiseSize + (7 - p.noiseSize) * p1 + (dotSize - 7) * p2) / 2;
        const fill = interpolateColors(p2, [0, 1], [p1 > 0.5 ? colors.yellow : p.baseColor, p.faceColor]);
        return <circle key={i} cx={x} cy={y} r={Math.max(r, 1.5)} fill={fill} opacity={alpha} />;
      })}
    </svg>
  );
};
