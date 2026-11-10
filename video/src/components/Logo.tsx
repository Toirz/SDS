import { Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { easeInOut } from "../theme";

// Where the cube sits inside the 1080×1080 logo image (fractions of the image size).
const CUBE = { centerX: 536 / 1080, centerY: 550 / 1080, edge: 416 / 1080 };
const COS30 = Math.cos(Math.PI / 6);

// The logo JPG has a white background; clip it to the cube's hexagon silhouette (slightly inset).
const inset = 0.012;
const hexagon = [
  [CUBE.centerX, CUBE.centerY - CUBE.edge + inset],
  [CUBE.centerX + CUBE.edge * COS30 - inset, CUBE.centerY - CUBE.edge / 2 + inset / 2],
  [CUBE.centerX + CUBE.edge * COS30 - inset, CUBE.centerY + CUBE.edge / 2 - inset / 2],
  [CUBE.centerX, CUBE.centerY + CUBE.edge - inset],
  [CUBE.centerX - CUBE.edge * COS30 + inset, CUBE.centerY + CUBE.edge / 2 - inset / 2],
  [CUBE.centerX - CUBE.edge * COS30 + inset, CUBE.centerY - CUBE.edge / 2 + inset / 2],
].map(([x, y]) => `${(x * 100).toFixed(2)}% ${(y * 100).toFixed(2)}%`).join(", ");

export type CubePose = { x: number; y: number; size: number };

/** Edge length (px) and the three visible faces of the cube for a logo drawn at `pose`. */
export function cubeFaces({ x, y, size }: CubePose) {
  const s = CUBE.edge * size;
  const c = s * COS30;
  const L = { x: x - c, y: y - s / 2 };
  const C = { x, y };
  return {
    edge: s,
    faces: [
      { origin: L, u: { x: c, y: -s / 2 }, v: { x: c, y: s / 2 } }, // top
      { origin: L, u: { x: c, y: s / 2 }, v: { x: 0, y: s } }, // left
      { origin: C, u: { x: c, y: -s / 2 }, v: { x: 0, y: s } }, // right
    ],
  };
}

export const LogoImage = ({ x, y, size, opacity = 1 }: CubePose & { opacity?: number }) => (
  <Img
    src={staticFile("images/sds-logo.jpg")}
    style={{
      position: "absolute",
      left: x - CUBE.centerX * size,
      top: y - CUBE.centerY * size,
      width: size,
      height: size,
      opacity,
      clipPath: `polygon(${hexagon})`,
    }}
  />
);

// Logo poses across the whole video: hero reveal → header badge → call to action.
export const POSES = {
  hero: { x: 600, y: 540, size: 680 },
  badge: { x: 92, y: 92, size: 132 },
  cta: { x: 560, y: 540, size: 620 },
};

const keyframes: { frame: number; pose: CubePose; opacity: number }[] = [
  { frame: 240, pose: { ...POSES.hero, size: 640 }, opacity: 0 },
  { frame: 268, pose: POSES.hero, opacity: 1 },
  { frame: 318, pose: POSES.hero, opacity: 1 },
  { frame: 350, pose: POSES.badge, opacity: 1 },
  { frame: 884, pose: POSES.badge, opacity: 1 },
  { frame: 916, pose: POSES.cta, opacity: 1 },
  { frame: 968, pose: POSES.cta, opacity: 1 },
  { frame: 989, pose: POSES.cta, opacity: 0 },
];

export const LogoTrack = () => {
  const frame = useCurrentFrame();
  if (frame < keyframes[0].frame) return null;
  const frames = keyframes.map((k) => k.frame);
  const opts = { easing: easeInOut, extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
  const pick = (get: (k: (typeof keyframes)[number]) => number) => interpolate(frame, frames, keyframes.map(get), opts);
  return (
    <LogoImage
      x={pick((k) => k.pose.x)}
      y={pick((k) => k.pose.y)}
      size={pick((k) => k.pose.size)}
      opacity={pick((k) => k.opacity)}
    />
  );
};
