import { useCurrentFrame } from "remotion";
import { event, formatEventDate } from "../../../src/features/event/config";
import { colors, reveal, scenes } from "../theme";

const handle = `@${event.instagramUrl.replace(/\/$/, "").split("/").pop()}`;

export const CallToAction = () => {
  const frame = useCurrentFrame();
  const [start, end] = scenes.cta;
  if (frame < start + 10) return null;
  const line = (delay: number) => reveal(frame, start + 10 + delay, end, 40, 20, 22);
  const open = event.registrationStatus === "open";
  return (
    <div style={{ position: "absolute", left: 1000, right: 120, top: 0, bottom: 0, display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <div style={{ fontSize: 30, fontWeight: 600, color: colors.yellow, ...line(0) }}>{event.name}</div>
      <div style={{ marginTop: 18, fontSize: 104, fontWeight: 750, lineHeight: 1, letterSpacing: "-0.05em", ...line(4) }}>{event.closing.title}</div>
      <div style={{ marginTop: 30, fontSize: 34, color: colors.muted, ...line(8) }}>
        {open ? `Registration closes ${formatEventDate(event.dates.registrationDeadline)}.` : event.closing.intro}
      </div>
      <div style={{ marginTop: 44, display: "flex", alignItems: "center", gap: 32, ...line(12) }}>
        {open && (
          <span style={{ padding: "22px 40px", borderRadius: 14, background: colors.yellow, color: colors.ink, fontSize: 34, fontWeight: 650 }}>
            Register now →
          </span>
        )}
        <span style={{ fontSize: 32, fontWeight: 500 }}>{handle}</span>
      </div>
    </div>
  );
};
