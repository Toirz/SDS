import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { event } from "@/features/event/config";
import { getRegistrationState } from "@/features/event/registration";
import { RegistrationCTA } from "./registration-cta";

export function EventFAQ() {
  const { href } = getRegistrationState(event);
  const registrationMessage = event.registrationMessages[href ? "open" : event.registrationStatus === "closed" ? "closed" : "unavailable"];

  return (
    <section id="faq" tabIndex={-1} className="section faq" aria-label="Frequently asked questions">
      <Container className="faq-grid">
        <SectionHeading number="04" label="FAQ" title="A few things to know." />
        <div className="faq-list">
          {event.faq.map(({ question, answer }) => <details key={question}><summary>{question}<span className="faq-plus" aria-hidden="true" /></summary><div className="faq-answer"><p>{answer}</p></div></details>)}
          <details><summary>{event.registrationQuestion}<span className="faq-plus" aria-hidden="true" /></summary><div className="faq-answer"><p>{registrationMessage}</p><RegistrationCTA /></div></details>
          <details><summary>{event.contactQuestion}<span className="faq-plus" aria-hidden="true" /></summary><div className="faq-answer"><p>Email <a href={`mailto:${event.contactEmail}`}>{event.contactEmail}</a> or connect with <a href={event.instagramUrl}>{event.organizer} on Instagram</a>.</p></div></details>
        </div>
      </Container>
    </section>
  );
}
