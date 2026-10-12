import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { event, formatEventDate } from "@/features/event/config";

export function EventOverview() {
  const facts = [
    { label: "Event dates", value: `${formatEventDate(event.dates.start, "short")} — ${formatEventDate(event.dates.end, "short")}` },
    { label: "Venue", value: event.venue },
    { label: "Who it’s for", value: event.audience },
    { label: "Prizes", value: event.prizes.statement },
  ];

  return (
    <section id="about" tabIndex={-1} className="section overview" aria-label="About the event">
      <Container>
        <div className="overview-grid">
          <SectionHeading number="01" label="The event" title={event.overview.title} />
          <div className="overview-copy"><p className="lead">{event.overview.intro}</p><p>{event.overview.detail}</p></div>
        </div>
        <dl className="event-details">
          {facts.map(({ label, value }) => <div key={label}><dt className="eyebrow">{label}</dt><dd>{value}</dd></div>)}
        </dl>
      </Container>
    </section>
  );
}
