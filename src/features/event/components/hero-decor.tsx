import type { CSSProperties, ReactNode } from "react";
import type { Tone } from "@/components/ui/section-heading";

// Flat, Notion-style data doodles that pop in around the hero title and then drift gently.
type Doodle = { tone: Tone; x: string; y: string; size: string; rotate: string; mobile?: boolean; art: ReactNode };

const doodles: Doodle[] = [
  {
    tone: "blue", x: "3%", y: "6%", size: "4.5rem", rotate: "-10deg", mobile: true,
    art: (<><rect x="4" y="4" width="56" height="56" rx="14" fill="var(--tone)" /><path d="M20 44V34M32 44V22M44 44V28" stroke="#fff" strokeWidth="6" strokeLinecap="round" /></>),
  },
  {
    tone: "pink", x: "11%", y: "44%", size: "3.25rem", rotate: "8deg",
    art: (<><circle cx="32" cy="32" r="28" fill="var(--tone)" /><path d="M32 16c1.6 9 6 13.4 15 15-9 1.6-13.4 6-15 15-1.6-9-6-13.4-15-15 9-1.6 13.4-6 15-15Z" fill="#fff" /></>),
  },
  {
    tone: "orange", x: "2%", y: "74%", size: "5rem", rotate: "-4deg", mobile: true,
    art: <path d="M6 40c6-14 12-14 18 0s12 14 18 0 12-14 18 0" fill="none" stroke="var(--tone)" strokeWidth="7" strokeLinecap="round" />,
  },
  {
    tone: "purple", x: "90%", y: "2%", size: "4.25rem", rotate: "9deg", mobile: true,
    art: (<><rect x="4" y="4" width="56" height="56" rx="14" fill="var(--tone)" /><path d="M26 20c-5 0-5 3-5 6v2c0 2-1 4-4 4 3 0 4 2 4 4v2c0 3 0 6 5 6M38 20c5 0 5 3 5 6v2c0 2 1 4 4 4-3 0-4 2-4 4v2c0 3 0 6-5 6" fill="none" stroke="#fff" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" /></>),
  },
  {
    tone: "green", x: "95%", y: "40%", size: "3.75rem", rotate: "-12deg",
    art: (<><circle cx="32" cy="32" r="28" fill="var(--tone)" /><path d="M32 32V4a28 28 0 0 1 28 28H32Z" fill="#fff" opacity="0.9" /></>),
  },
  {
    tone: "red", x: "88%", y: "76%", size: "3.5rem", rotate: "0deg", mobile: true,
    art: <path d="M32 6v52M6 32h52M13.6 13.6l36.8 36.8M50.4 13.6 13.6 50.4" stroke="var(--tone)" strokeWidth="7" strokeLinecap="round" />,
  },
  {
    tone: "yellow", x: "27%", y: "1%", size: "2.25rem", rotate: "0deg",
    art: <g fill="var(--yellow)">{[12, 32, 52].flatMap((cx) => [12, 32, 52].map((cy) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="6" />))}</g>,
  },
  {
    tone: "blue", x: "74%", y: "2%", size: "1.75rem", rotate: "0deg",
    art: <circle cx="32" cy="32" r="24" fill="none" stroke="var(--tone)" strokeWidth="8" />,
  },
];

export function HeroDecor() {
  return (
    <div className="hero-decor" aria-hidden="true">
      {doodles.map(({ tone, x, y, size, rotate, mobile, art }, index) => (
        <span
          key={index}
          className="hero-doodle"
          data-tone={tone}
          data-mobile={mobile ?? false}
          style={{ "--x": x, "--y": y, "--size": size, "--rotate": rotate, "--i": index } as CSSProperties}
        >
          <svg viewBox="0 0 64 64">{art}</svg>
        </span>
      ))}
    </div>
  );
}
