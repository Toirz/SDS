import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { event } from "@/features/event/config";

export function EventExpectations() {
  return (
    <section className="section expectations" aria-label="What to expect">
      <Container className="expectations-grid">
        <div><SectionHeading number="02" label="What to expect" title={event.expectations.title} /><div className="expectation-mark" aria-hidden="true">↗</div></div>
        <ol className="expectation-list">
          {event.expectations.items.map(({ title, description }, index) => (
            <li key={title}><span className="item-number" aria-hidden="true">0{index + 1}</span><div><h3>{title}</h3><p>{description}</p></div></li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
