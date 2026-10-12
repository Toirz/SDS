import { Container } from "@/components/ui/container";
import { event } from "@/features/event/config";

export function EventPrizes() {
  return (
    <section className="prizes" aria-labelledby="prizes-title">
      <Container className="prizes-inner">
        <div><p className="eyebrow">The prizes</p><h2 id="prizes-title">{event.prizes.intro}</h2><p className="prize-statement">{event.prizes.statement}</p></div>
        <div className="prize-amount" aria-hidden="true"><span className="eyebrow">Prizes worth up to</span><p><span>{event.prizes.currency}</span>{event.prizes.amount}</p></div>
      </Container>
    </section>
  );
}
