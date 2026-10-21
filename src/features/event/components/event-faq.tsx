import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { event } from "@/features/event/config";
import { getRegistrationState } from "@/features/event/registration";
import { FAQItem } from "./faq-item";
import { RegistrationCTA } from "./registration-cta";

export function EventFAQ() {
  const { href } = getRegistrationState(event);
  const registrationMessage = event.registrationMessages[href ? "open" : event.registrationStatus === "closed" ? "closed" : "unavailable"];

  return (
    <section id="faq" tabIndex={-1} className="section faq" aria-label="Frequently asked questions">
      <Container className="faq-grid">
        <SectionHeading title="A few things to know." />
        <div className="faq-list">
          {event.faq.map(({ question, answer }) => <FAQItem key={question} question={question}><p>{answer}</p></FAQItem>)}
          <FAQItem question={event.registrationQuestion}><p>{registrationMessage}</p><RegistrationCTA /></FAQItem>
          <FAQItem question={event.contactQuestion}><p>Email <a href={`mailto:${event.contactEmail}`}>{event.contactEmail}</a> or connect with <a href={event.instagramUrl}>{event.organizer} on Instagram</a>.</p></FAQItem>
        </div>
      </Container>
    </section>
  );
}
