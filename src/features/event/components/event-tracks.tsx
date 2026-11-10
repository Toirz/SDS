import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { event } from "@/features/event/config";
import { getRegistrationState } from "@/features/event/registration";
import { AdvancedArt, StandardArt } from "./track-art";

const DIFFICULTY_STEPS = 4;

export function EventTracks() {
  const { href } = getRegistrationState(event);
  return (
    <section id="tracks" tabIndex={-1} className="section tracks" aria-label="Competition tracks">
      <Container>
        <SectionHeading title={event.tracks.title} label="Tracks" tone="purple" icon="layers" highlight="starting point" />
        <div className="track-list">
          {event.tracks.items.map(({ name, level }, index) => {
            const advanced = index > 0;
            const filled = advanced ? DIFFICULTY_STEPS : 2;
            return (
              <article className={`track-panel${advanced ? " track-panel-advanced" : ""}`} data-tone={advanced ? "orange" : "green"} key={name}>
                <div className="track-head">
                  <div>
                    <h3 className="track-title">{name} Dataset <span>({level})</span></h3>
                    <p className="track-difficulty">
                      <span>Difficulty</span>
                      <span className="difficulty-meter" role="img" aria-label={`${level} difficulty`}>
                        {Array.from({ length: DIFFICULTY_STEPS }, (_, step) => <i key={step} data-on={step < filled} />)}
                      </span>
                    </p>
                  </div>
                  {href && (
                    <a className="track-arrow" href={href} target="_blank" rel="noopener noreferrer" aria-label={`Register for ${event.name} (opens in a new tab)`}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                    </a>
                  )}
                </div>
                <div className="track-stage" aria-hidden="true">
                  <div className="track-art-frame">{advanced ? <AdvancedArt /> : <StandardArt />}</div>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
