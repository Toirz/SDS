import { Easing, interpolate } from "remotion";

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const DURATION = 990;

// Mirrors the site's dark theme tokens in src/app/globals.css.
export const colors = {
  bg: "#0a0d14",
  surface: "#0d1118",
  text: "#ffffff",
  muted: "#a3a3a3",
  line: "#333333",
  yellow: "#ffdf57",
  amber: "#efc52f",
  orange: "#f08c0f",
  yellowSoft: "#28230d",
  yellowLine: "#5c4d20",
  ink: "#111111",
};

export const fontFamily = `Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif`;
export const monoFamily = `"SFMono-Regular", Consolas, "Liberation Mono", monospace`;

export const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
export const easeInOut = Easing.bezier(0.65, 0, 0.35, 1);

// Scene windows in frames (30 fps).
export const scenes = {
  noise: [0, 90],
  signal: [90, 200],
  logo: [200, 335],
  tracks: [345, 482],
  timeline: [487, 662],
  facts: [667, 762],
  prizes: [767, 882],
  cta: [887, 990],
} as const;

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export function progress(frame: number, start: number, end: number, easing = easeOut) {
  return interpolate(frame, [start, end], [0, 1], { ...clamp, easing });
}

// Fade + rise in at `start`, fade + drift up out before `end`.
export function reveal(frame: number, start: number, end: number, distance = 36, inDuration = 20, outDuration = 12) {
  const enter = progress(frame, start, start + inDuration);
  const exit = progress(frame, end - outDuration, end, easeInOut);
  return {
    opacity: enter * (1 - exit),
    transform: `translateY(${(1 - enter) * distance - exit * distance * 0.5}px)`,
  };
}

export function formatShortDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", timeZone: "UTC" })
    .format(new Date(`${value}T00:00:00Z`));
}
