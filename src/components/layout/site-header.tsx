import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { event } from "@/features/event/config";
import { RegistrationCTA } from "@/features/event/components/registration-cta";
import { MobileNavigation } from "./mobile-navigation";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Container className="header-inner">
        <Link className="brand" href="/" aria-label={`${event.organizer} — ${event.shortName} home`}>
          <span className="brand-logo"><Image src={event.logo.src} alt="" width={event.logo.width} height={event.logo.height} sizes="48px" /></span>
          <span className="brand-text"><strong>{event.organizer}</strong><span>DATATHON {event.year}</span></span>
        </Link>
        <nav className="desktop-navigation" aria-label="Main navigation">
          {event.navigation.map(({ href, label }) => <a href={href} key={href}>{label}</a>)}
        </nav>
        <div className="header-registration"><RegistrationCTA /></div>
        <MobileNavigation links={event.navigation}><RegistrationCTA /></MobileNavigation>
      </Container>
    </header>
  );
}
