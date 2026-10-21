import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { event } from "@/features/event/config";

export function EventTracks() {
  return (
    <section id="tracks" tabIndex={-1} className="section tracks" aria-label="Competition tracks">
      <Container>
        <SectionHeading title={event.tracks.title} />
        <p className="tracks-intro">{event.tracks.intro}</p>
        <div className="track-list">
          {event.tracks.items.map(({ name, level, description }) => (
            <article className="track-card" key={name}>
              <span className="eyebrow track-level">{level}</span>
              <h3>{name}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
