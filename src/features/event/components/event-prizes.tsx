import type { CSSProperties } from "react";
import { Container } from "@/components/ui/container";
import { event } from "@/features/event/config";
import { RevealPrize } from "./reveal-details";

const PARTICLE_COUNT = 56;

// Fixed pseudo-random noise so the server and browser render identical particles.
const noise = (index: number, seed: number) => {
  const value = Math.sin((index + 1) * 12.9898 + seed * 78.233) * 43758.5453;
  return value - Math.floor(value);
};

const particles = Array.from({ length: PARTICLE_COUNT }, (_, index) => ({
  angle: `${Math.round((index / PARTICLE_COUNT) * 360 + (noise(index, 1) - 0.5) * 12)}deg`,
  distance: (0.35 + noise(index, 2) * 0.65).toFixed(2),
  size: `${(0.3 + noise(index, 3) * 0.8).toFixed(2)}rem`,
  delay: `${Math.round(noise(index, 4) * 90)}ms`,
  tone: index % 3,
  round: index % 2 === 0,
}));

export function EventPrizes() {
  const { currency, amount, categories } = event.prizes;
  const digits = amount.replace(/,/g, "");
  return (
    <section className="prizes" aria-labelledby="prizes-title">
      <Container className="prizes-inner">
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
          <div className="prize-total">
            <h2 id="prizes-title" className="prize-label">Total cash prizes</h2>
            <p className="prize-number">
              <span className="prize-currency">{currency}</span>
              <span className="prize-digits">{digits}</span>
            </p>
          </div>
          {categories.map((category) => (
            <div key={category.name} className="prize-category">
              <h3>{category.name}</h3>
              <ul>
                {category.awards.map((award) => (
                  <li key={award.place}><span>{award.place}</span><strong>{currency} {award.amount}</strong></li>
                ))}
              </ul>
            </div>
          ))}
        </RevealPrize>
      </Container>
    </section>
  );
}
