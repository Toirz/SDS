"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export function MobileNavigation({ links, children }: {
  links: { href: string; label: string }[];
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }
    const desktop = window.matchMedia("(min-width: 768px)");
    function onResize() { if (desktop.matches) setOpen(false); }
    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onResize);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);

  return (
    <div className="mobile-navigation">
      <button ref={toggleRef} className="menu-toggle" type="button" aria-expanded={open}
        aria-controls="mobile-menu" onClick={() => setOpen(!open)}>
        {open ? "Close" : "Menu"}
        <span className={`menu-lines ${open ? "is-open" : ""}`} aria-hidden="true"><i /><i /></span>
      </button>
      <nav id="mobile-menu" aria-label="Mobile navigation" hidden={!open}>
        {links.map(({ href, label }) => (
          <a key={href} href={href} onClick={() => {
            setOpen(false);
            document.getElementById(href.slice(1))?.focus({ preventScroll: true });
          }}>{label}<span aria-hidden="true">↗</span></a>
        ))}
        {children}
      </nav>
    </div>
  );
}
