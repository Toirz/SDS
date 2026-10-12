import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { event, formatEventDate } from "@/features/event/config";

export function EventOverview() {
  const facts = [
    { label: "Event dates", value: `${formatEventDate(event.dates.start, "short")} — ${formatEventDate(event.dates.end, "short")}`, icon: "M8 2v4m8-4v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" },
    { label: "Venue", value: event.venue, icon: "M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0ZM15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" },
    { label: "Eligibility", value: event.audience, icon: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2m20 0v-2a4 4 0 0 0-3-4M13 3a4 4 0 0 1 0 8M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" },
    { label: "Prizes", value: `Up to ${event.prizes.currency} ${event.prizes.amount}`, icon: "M8 21h8m-4-5v5M7 3h10v7a5 5 0 0 1-10 0V3ZM7 5H3v3a4 4 0 0 0 4 4m10-7h4v3a4 4 0 0 1-4 4" },
  ];

  return (
    <section id="about" tabIndex={-1} className="section overview" aria-label="About the event">
      <Container>
        <div className="overview-grid">
          <SectionHeading number="01" label="The event" title={event.overview.title} />
          <div className="overview-copy"><p className="lead">{event.overview.intro}</p><p>{event.overview.detail}</p></div>
        </div>
        <dl className="event-details">
          {facts.map(({ label, value, icon }) => <div key={label}><dt className="eyebrow"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={icon} /></svg>{label}</dt><dd>{value}</dd></div>)}
        </dl>
      </Container>
    </section>
  );
}
