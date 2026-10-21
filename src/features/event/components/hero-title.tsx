"use client";

import { Fragment, useEffect, useState } from "react";

export function HeroTitle({ name, organizer, year }: { name: string; organizer: string; year: string }) {
  const lines = [organizer, name.replace(`${organizer} `, "").replace(` ${year}`, ""), year];
  const total = lines.join("").length;
  const [step, setStep] = useState(0);

  useEffect(() => {
    let next = 0;
    const timer = window.setInterval(() => {
      next += 1;
      setStep(next);
      if (next === total + 20) window.clearInterval(timer);
    }, 70);
    return () => window.clearInterval(timer);
  }, [total]);

  return (
    <>
    <h1 id="hero-title" aria-label={name}>
      {lines.map((line, index) => {
        const offset = lines.slice(0, index).join("").length;
        const visible = Math.max(0, Math.min(line.length, step - offset));
        const cursor = step >= offset && (step < offset + line.length || (index === lines.length - 1 && step < total + 20));
        return (
          <Fragment key={index}>
            {index > 0 && " "}
            <span aria-hidden="true" className={`hero-title-line${index === lines.length - 1 ? " hero-year" : ""}`} data-text={line} data-complete={step >= total}>
              <span className="hero-typed-line">{line.slice(0, visible)}{cursor && <span className="typing-cursor" />}</span>
            </span>
          </Fragment>
        );
      })}
    </h1>
    <noscript><style>{`.hero-title-line::before { visibility: visible; } .hero-typed-line { visibility: hidden; } .hero-year::after { transform: scaleX(1); }`}</style></noscript>
    </>
  );
}
