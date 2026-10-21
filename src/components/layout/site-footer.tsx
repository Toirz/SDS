import Image from "next/image";
import { Container } from "@/components/ui/container";
import { event } from "@/features/event/config";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Container>
        <div className="footer-top">
          <div className="brand">
            <span className="brand-logo"><Image src={event.logo.src} alt={event.logo.alt} width={event.logo.width} height={event.logo.height} sizes="48px" /></span>
            <span className="brand-text"><strong>{event.organizer}</strong><span>DATATHON {event.year}</span></span>
          </div>
          <div className="footer-links">
            <a href={`mailto:${event.contactEmail}`}>{event.contactEmail}<span aria-hidden="true">↗</span></a>
            <a href={event.instagramUrl}>Instagram<span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <div className="footer-bottom"><p>{event.name}</p><p>Organised by {event.organizer}</p><a href="#main-content">Back to top <span aria-hidden="true">↑</span></a></div>
      </Container>
    </footer>
  );
}
