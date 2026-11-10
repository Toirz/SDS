"use client";

import { useEffect, useSyncExternalStore, type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { event } from "@/features/event/config";
import { RegistrationCTA } from "@/features/event/components/registration-cta";
import { MobileNavigation } from "./mobile-navigation";

function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

function isScrolled() { return window.scrollY > 0; }
function isScrolledOnServer() { return false; }

function applyTheme(theme: "light" | "dark") {
  document.documentElement.dataset.theme = theme;
  try { localStorage.setItem("theme", theme); } catch { /* Keep switching available when storage is blocked. */ }
}

// The new theme spreads out as a circle from the toggle until it covers the whole screen.
function toggleTheme(clickEvent: MouseEvent<HTMLButtonElement>) {
  const theme = document.documentElement.dataset.theme === "light" ? "dark" : "light";
  if (!document.startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    applyTheme(theme);
    return;
  }
  const button = clickEvent.currentTarget.getBoundingClientRect();
  const x = button.left + button.width / 2;
  const y = button.top + button.height / 2;
  const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
  const transition = document.startViewTransition(() => applyTheme(theme));
  transition.ready.then(() => {
    document.documentElement.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
      { duration: 700, easing: "cubic-bezier(0.65, 0, 0.35, 1)", pseudoElement: "::view-transition-new(root)" },
    );
  }).catch(() => { /* The theme is already applied if the animation cannot run. */ });
}

export function SiteHeader() {
  const scrolled = useSyncExternalStore(subscribeToScroll, isScrolled, isScrolledOnServer);

  useEffect(() => {
    const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    if (navigation?.type === "reload") {
      let frame = 0;
      // Reset after the browser restores the scroll position or URL fragment.
      const resetScroll = () => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: "instant" }));
      };
      resetScroll();
      if (document.readyState !== "complete") window.addEventListener("pageshow", resetScroll, { once: true });
      return () => {
        cancelAnimationFrame(frame);
        window.removeEventListener("pageshow", resetScroll);
      };
    }
  }, []);

  return (
    <header className="site-header" data-scrolled={scrolled}>
      <Container className="header-inner">
        <Link className="brand" href="/" aria-label={`${event.organizer} — ${event.shortName} home`}>
          <span className="brand-logo"><Image src={event.logo.src} alt="" width={event.logo.width} height={event.logo.height} sizes="48px" /></span>
          <span className="brand-text"><strong>{event.organizer}</strong><span>DATATHON {event.year}</span></span>
        </Link>
        <nav className="desktop-navigation" aria-label="Main navigation">
          {event.navigation.map(({ href, label }) => <a href={href} key={href}>{label}</a>)}
        </nav>
        <div className="header-actions">
          <button className="theme-toggle" type="button" onClick={toggleTheme}>
            <span className="theme-toggle-light">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" /></svg>
              <span className="sr-only">Switch to light theme</span>
            </span>
            <span className="theme-toggle-dark">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20.5 14A9 9 0 0 1 10 3.5 9 9 0 1 0 20.5 14Z" /></svg>
              <span className="sr-only">Switch to dark theme</span>
            </span>
          </button>
          <div className="header-registration"><RegistrationCTA /></div>
          <MobileNavigation links={event.navigation}><RegistrationCTA /></MobileNavigation>
        </div>
      </Container>
    </header>
  );
}
