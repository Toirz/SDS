import type { CSSProperties } from "react";
import { Container } from "@/components/ui/container";
import { event } from "@/features/event/config";
import { RevealPrize } from "./reveal-details";

const PARTICLE_COUNT = 56;

// Fixed pseudo-random spread so the server and browser render identical particles.
const particles = Array.from({ length: PARTICLE_COUNT }, (_, index) => {
  const noise = (seed: number) => {
    const value = Math.sin((index + 1) * 12.9898 + seed * 78.233) * 43758.5453;
    return value - Math.floor(value);
  };
  return {
    angle: `${Math.round((index / PARTICLE_COUNT) * 360 + (noise(1) - 0.5) * 12)}deg`,
    distance: (0.35 + noise(2) * 0.65).toFixed(2),
    size: `${(0.3 + noise(3) * 0.8).toFixed(2)}rem`,
    delay: `${Math.round(noise(4) * 90)}ms`,
    tone: index % 3,
    round: index % 2 === 0,
  };
});

export function EventPrizes() {
  const { currency, amount, perks } = event.prizes;
  return (
    <section className="prizes" aria-labelledby="prizes-title">
      <Container className="prizes-inner">
        <h2 id="prizes-title" className="prize-label">Total cash prizes</h2>
        <RevealPrize className="prize-figure">
          <span className="prize-burst" aria-hidden="true">
            {particles.map((particle, index) => (
              <i
                key={index}
                data-tone={particle.tone}
                data-round={particle.round}
                style={{ "--angle": particle.angle, "--distance": particle.distance, "--size": particle.size, "--delay": particle.delay } as CSSProperties}
              />
            ))}
          </span>
          <p className="prize-number"><span className="prize-currency">{currency}</span>{amount.replace(/,/g, "")}</p>
        </RevealPrize>
        <ul className="prize-perks" aria-label="Also included">
          {perks.map((perk) => (
            <li key={perk.title}><strong>{perk.title}</strong><span>{perk.detail}</span></li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
