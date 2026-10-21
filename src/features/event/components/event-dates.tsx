import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { event, formatEventDate } from "@/features/event/config";

export function EventDates() {
  return (
    <section id="dates" tabIndex={-1} className="section dates" aria-label="Key dates">
      <Container>
        <div className="dates-heading"><SectionHeading title="Mark the milestones." /><p className="dates-note">The published competition dates.</p></div>
        <ol className="timeline">
          {event.milestones.map(({ label, date, description }, index) => (
            <li key={label}>
              <div className="timeline-line"><span className="timeline-dot" /><span className="eyebrow" aria-hidden="true">0{index + 1}</span></div>
              <time dateTime={date}>{formatEventDate(date, "short")}</time><h3>{label}</h3><p>{description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
