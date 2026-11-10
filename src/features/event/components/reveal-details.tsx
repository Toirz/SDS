"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

// Marks the element with data-revealed="true" once it scrolls into view; CSS drives the animation.
function useRevealOnScroll<T extends HTMLElement>(threshold: number) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const reveal = () => { element.dataset.revealed = "true"; };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      reveal();
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          reveal();
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}

// Shows only the fact labels until the list scrolls into view, then lets each card drop open.
export function RevealDetails({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRevealOnScroll<HTMLDListElement>(0.35);
  return (
    <>
      <dl ref={ref} className={className} data-revealed="false">{children}</dl>
      <noscript><style>{`.event-details > div::before { height: 100%; } .event-details dd { opacity: 1; transform: none; }`}</style></noscript>
    </>
  );
}

// Pops the prize figure and fires its particle burst once it scrolls into view.
export function RevealPrize({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRevealOnScroll<HTMLDivElement>(0.6);
  return (
    <>
      <div ref={ref} className={className} data-revealed="false">{children}</div>
      <noscript><style>{`.prize-figure[data-revealed="false"] .prize-number { opacity: 1; }`}</style></noscript>
    </>
  );
}

// Draws the timeline line from the first milestone to the last once the list scrolls into view.
export function RevealTimeline({ children, className, style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  const ref = useRevealOnScroll<HTMLOListElement>(0.2);
  return (
    <>
      <ol ref={ref} className={className} style={style} data-revealed="false">{children}</ol>
      <noscript><style>{`.timeline::after { clip-path: none; } .timeline li > * { opacity: 1; transform: none; } .timeline-dot { background: var(--tone); border-color: var(--tone); }`}</style></noscript>
    </>
  );
}
