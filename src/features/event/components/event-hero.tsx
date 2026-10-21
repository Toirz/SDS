import { Container } from "@/components/ui/container";
import { event, formatEventDate } from "@/features/event/config";
import { RegistrationCTA } from "./registration-cta";
import { DataMotif } from "./data-motif";
import { HeroTitle } from "./hero-title";

export function EventHero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <Container>
        <div className="hero-grid">
          <div className="hero-content">
            <HeroTitle name={event.name} organizer={event.organizer} year={event.year} />
            <div className="hero-actions"><RegistrationCTA /><a className="button button-text" href="#about">Explore the event <span aria-hidden="true">↓</span></a></div>
          </div>
          <div className="hero-facts">
            <div><span className="eyebrow">The dates</span><p><time dateTime={event.dates.start}>{formatEventDate(event.dates.start, "short")}</time><span aria-hidden="true"> — </span><span className="sr-only"> to </span><time dateTime={event.dates.end}>{formatEventDate(event.dates.end, "short")}</time></p></div>
            <div><span className="eyebrow">The people</span><p>{event.audience}</p></div>
            <a href="#about" className="hero-scroll" aria-label="Explore the event overview">↓</a>
          </div>
          <div className="hero-visual"><DataMotif /><p>{event.hero.motifCaption}<span aria-hidden="true">↗</span></p></div>
        </div>
      </Container>
    </section>
  );
}
