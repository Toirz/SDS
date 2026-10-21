"use client";

import { useId, useState, type ReactNode } from "react";

export function FAQItem({ question, children }: { question: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const answerId = useId();

  return (
    <div className="faq-item">
      <button
        type="button"
        className="faq-question"
        aria-expanded={open}
        aria-controls={answerId}
        onClick={() => setOpen(!open)}
      >
        {question}<span className="faq-plus" aria-hidden="true" />
      </button>
      <div id={answerId} className="faq-content" data-open={open} aria-hidden={!open} inert={!open}>
        <div className="faq-content-inner">
          <div className="faq-answer">{children}</div>
        </div>
      </div>
    </div>
  );
}
