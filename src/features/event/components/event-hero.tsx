import { Container } from "@/components/ui/container";
import { event, formatEventDate } from "@/features/event/config";
import { RegistrationCTA } from "./registration-cta";
import { HeroTitle } from "./hero-title";
import { HeroDecor } from "./hero-decor";
import { HeroVideo } from "./hero-video";

export function EventHero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <Container className="hero-inner">
        <div className="hero-head">
          <HeroDecor />
          <p className="hero-badge">
            <time dateTime={event.dates.start}>{formatEventDate(event.dates.start, "short")}</time>
            <span aria-hidden="true"> — </span><span className="sr-only"> to </span>
            <time dateTime={event.dates.end}>{formatEventDate(event.dates.end, "short")}</time>
            <span className="hero-badge-free" data-tone="green">{event.entryFee.replace(/ for all participants$/, "")} to join</span>
          </p>
          <HeroTitle name={event.name} organizer={event.organizer} year={event.year} />
          <div className="hero-actions"><RegistrationCTA /><a className="button button-secondary" href="#about">About the event <span aria-hidden="true">↓</span></a></div>
        </div>
        <HeroVideo
          src="/videos/datathon-promo.mp4"
          poster="/videos/datathon-promo-poster.jpg"
          label={`${event.name} promo video: two tracks, key dates, prizes and how to register.`}
        />
      </Container>
    </section>
  );
}
