import type { CSSProperties } from "react";
import { Container } from "@/components/ui/container";
import { SectionHeading, type Tone } from "@/components/ui/section-heading";
import { event, formatEventDate } from "@/features/event/config";
import { RevealTimeline } from "./reveal-details";

// One colour per milestone, from sign-up (green) to the finale (brand yellow); keep in step with the line gradient in globals.css.
const MILESTONE_TONES: Tone[] = ["green", "red", "blue", "purple", "orange", "pink", "blue", "yellow"];

export function EventDates() {
  const { milestones } = event;
  return (
    <section id="dates" tabIndex={-1} className="section dates" aria-label="Key dates">
      <Container>
        <SectionHeading title="Mark the milestones." label="Key dates" tone="green" icon="calendar" highlight="milestones" />
        <RevealTimeline className="timeline" style={{ "--timeline-count": milestones.length, "--timeline-columns": milestones.length + 1 } as CSSProperties}>
          {milestones.map(({ label, date, description }, index) => {
            const [day, month] = formatEventDate(date, "short").split(" ");
            return (
              <li key={label} data-tone={MILESTONE_TONES[index % MILESTONE_TONES.length]} style={{ "--i": index, "--col": index + 1 } as CSSProperties}>
                <span className="timeline-dot" aria-hidden="true" />
                <time dateTime={date}>
                  <span className="timeline-day">{day} {month}</span>
                </time>
                <h3>{label}</h3>
                <p>{description}</p>
              </li>
            );
          })}
        </RevealTimeline>
      </Container>
    </section>
  );
}
