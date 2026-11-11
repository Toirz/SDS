import Image from "next/image";
import { Container } from "@/components/ui/container";
import { event, formatEventDate } from "@/features/event/config";
import { RegistrationCTA } from "./registration-cta";
import { HeroTitle } from "./hero-title";
import { HeroVideo } from "./hero-video";

// logo: file in public/images/sponsors with its intrinsic size; wordmark: the image already contains the name.
const sponsors = [
  { name: "AI SG", logo: { file: "aisg.png", width: 937, height: 724 } },
  { name: "Cargill", logo: { file: "cargill.svg", width: 215, height: 96 }, wordmark: true },
  { name: "gradSG" }, // shortcut: no public logo found, text only until the sponsor sends one
  { name: "Cloudflare", logo: { file: "cloudflare.svg", width: 24, height: 24 } },
  { name: "OpenAI", logo: { file: "openai.svg", width: 24, height: 24 } },
];

export function EventHero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <Container className="hero-inner">
        <p className="hero-badge">
          <time dateTime={event.dates.start}>{formatEventDate(event.dates.start, "short")}</time>
          <span aria-hidden="true"> — </span><span className="sr-only"> to </span>
          <time dateTime={event.dates.end}>{formatEventDate(event.dates.end, "short")}</time>
          <span className="hero-badge-free" data-tone="green">{event.entryFee.replace(/ for all participants$/, "")} to join</span>
        </p>
        <HeroTitle name={event.name} organizer={event.organizer} year={event.year} />
        <div className="hero-actions"><RegistrationCTA /><a className="button button-secondary" href="#about">About the event <span aria-hidden="true">↓</span></a></div>
        <HeroVideo
          src="/videos/datathon-promo.mp4"
          poster="/videos/datathon-promo-poster.jpg"
          label={`${event.name} promo video: two tracks, key dates, prizes and how to register.`}
        />
        <p className="hero-sponsors-label">Sponsored by</p>
        <ul className="hero-sponsors">
          {sponsors.map(({ name, logo, wordmark }) => (
            <li key={name} data-wordmark={wordmark || undefined}>
              {logo && <Image src={`/images/sponsors/${logo.file}`} width={logo.width} height={logo.height} alt={wordmark ? name : ""} unoptimized />}
              {!wordmark && <span>{name}</span>}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
