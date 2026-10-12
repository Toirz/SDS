import { Container } from "@/components/ui/container";
import { event } from "@/features/event/config";
import { RegistrationCTA } from "./registration-cta";

export function EventClosing() {
  return (
    <section className="closing" aria-labelledby="closing-title">
      <Container className="closing-inner">
        <div><p className="eyebrow">{event.shortName}</p><h2 id="closing-title">{event.closing.title}</h2><p>{event.closing.intro}</p></div>
        <div className="closing-actions"><RegistrationCTA /><a className="contact-link" href={`mailto:${event.contactEmail}`}>{event.closing.contactLabel}<span aria-hidden="true">↗</span></a></div>
      </Container>
    </section>
  );
}
