export type Tone = "blue" | "red" | "green" | "purple" | "pink" | "orange" | "yellow";

// Lucide-style 24px outline paths for the small label above each section title.
const icons = {
  info: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm0-6v-4m0-4h.01",
  layers: "m12 2 10 5-10 5L2 7l10-5ZM2 17l10 5 10-5M2 12l10 5 10-5",
  calendar: "M8 2v4m8-4v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z",
  help: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3m.1 4h.01",
};

type SectionHeadingProps = {
  title: string;
  label?: string;
  tone?: Tone;
  icon?: keyof typeof icons;
  /** Part of the title to mark with a coloured highlight, as Notion does for key words. */
  highlight?: string;
};

export function SectionHeading({ title, label, tone = "yellow", icon = "info", highlight }: SectionHeadingProps) {
  const at = highlight ? title.indexOf(highlight) : -1;
  const heading = at < 0 || !highlight
    ? title
    : <>{title.slice(0, at)}<mark>{highlight}</mark>{title.slice(at + highlight.length)}</>;

  return (
    <div className="section-head" data-tone={tone}>
      {label && (
        <p className="section-label">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={icons[icon]} /></svg>
          {label}
        </p>
      )}
      <h2 className="section-heading">{heading}</h2>
    </div>
  );
}
