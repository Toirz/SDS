"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { mergeIntoAwards } from "./prize-particles";

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

// Pops the prize figure and fires its particle burst once it scrolls into view,
// then dissolves the total into particles that land on each award amount.
export function RevealPrize({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRevealOnScroll<HTMLDivElement>(0.6);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const figure = ref.current;
    const canvas = canvasRef.current;
    if (!figure || !canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // data-phase hides the amounts until the particles land; without it (no JS, reduced motion) they show at once.
    figure.dataset.phase = "pending";
    let timer = 0;
    const onPopEnd = (animation: AnimationEvent) => {
      if (animation.animationName !== "prize-pop") return;
      figure.removeEventListener("animationend", onPopEnd);
      // Matches the CSS hold between the pop and --shatter-at.
      timer = window.setTimeout(() => {
        const source = figure.querySelector<HTMLElement>(".prize-digits");
        const groups = [...figure.querySelectorAll<HTMLElement>(".prize-category")].map((category) => [...category.querySelectorAll<HTMLElement>("strong")]);
        if (!source) {
          figure.dataset.phase = "done";
          return;
        }
        figure.dataset.phase = "merge";
        const sparkle = getComputedStyle(figure).getPropertyValue("--burst-1").trim() || "currentColor";
        mergeIntoAwards(canvas, figure, source, groups, sparkle).finally(() => { figure.dataset.phase = "done"; });
      }, 250);
    };
    figure.addEventListener("animationend", onPopEnd);
    return () => {
      figure.removeEventListener("animationend", onPopEnd);
      window.clearTimeout(timer);
    };
  }, [ref]);

  return (
    <>
      <div ref={ref} className={className} data-revealed="false">{children}<canvas ref={canvasRef} className="prize-particles" aria-hidden="true" /></div>
      <noscript><style>{`.prize-total { display: none; } .prize-figure[data-revealed="false"] .prize-category { opacity: 1; }`}</style></noscript>
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
