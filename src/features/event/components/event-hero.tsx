import { Container } from "@/components/ui/container";
import { event, formatEventDate } from "@/features/event/config";
import { RegistrationCTA } from "./registration-cta";
import { DataMotif } from "./data-motif";

export function EventHero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <Container>
        <div className="hero-topline"><p className="eyebrow">{event.hero.eyebrow}</p><span className="edition-label">{event.year} EDITION</span></div>
        <div className="hero-grid">
          <div className="hero-content">
            <h1 id="hero-title"><span className="hero-organizer">{event.organizer}</span>{event.hero.title}<span className="hero-year">{event.year}<span aria-hidden="true">.</span></span></h1>
            <p className="hero-intro">{event.hero.intro}</p>
            <div className="hero-actions"><RegistrationCTA /><a className="button button-text" href="#about">Explore the event <span aria-hidden="true">↓</span></a></div>
          </div>
          <div className="hero-visual"><DataMotif /><p>{event.hero.motifCaption}<span aria-hidden="true">↗</span></p></div>
        </div>
        <div className="hero-facts">
          <div><span className="eyebrow">The dates</span><p><time dateTime={event.dates.start}>{formatEventDate(event.dates.start, "short")}</time><span aria-hidden="true"> — </span><span className="sr-only"> to </span><time dateTime={event.dates.end}>{formatEventDate(event.dates.end, "short")}</time></p></div>
          <div><span className="eyebrow">The people</span><p>{event.audience}</p></div>
          <a href="#about" className="hero-scroll" aria-label="Explore the event overview">↓</a>
        </div>
      </Container>
    </section>
  );
}
