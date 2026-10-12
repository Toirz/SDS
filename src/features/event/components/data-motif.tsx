export function DataMotif() {
  return (
    <svg viewBox="0 0 480 400" fill="none" aria-hidden="true" className="data-motif">
      <defs>
        <pattern id="data-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 H 0 V 40" stroke="currentColor" strokeOpacity="0.16" />
        </pattern>
      </defs>
      <rect width="480" height="400" fill="url(#data-grid)" />
      <g stroke="currentColor" strokeOpacity="0.35">
        <path d="M40 320H440M40 240H440M40 160H440M40 80H440" />
        <path d="M80 40V360M160 40V360M240 40V360M320 40V360M400 40V360" />
      </g>
      <g className="motif-blocks">
        <rect x="80" y="240" width="80" height="80" fill="var(--amber)" />
        <rect x="160" y="160" width="80" height="80" fill="var(--yellow)" />
        <rect x="240" y="80" width="80" height="80" fill="var(--yellow)" />
        <rect x="320" y="160" width="80" height="80" fill="var(--amber)" />
        <rect x="240" y="240" width="80" height="80" fill="var(--yellow)" />
        <rect x="160" y="320" width="40" height="40" fill="var(--yellow)" fillOpacity="0.35" />
        <rect x="360" y="40" width="40" height="40" fill="var(--yellow)" fillOpacity="0.55" />
        <rect x="40" y="160" width="40" height="40" fill="var(--yellow)" fillOpacity="0.2" />
      </g>
      <g stroke="var(--charcoal)" strokeWidth="1" strokeOpacity="0.2">
        <path d="M120 240V320M160 200H240M280 80V160M320 200H400M280 240V320" />
      </g>
      <path d="M40 280H120V200H200V120H280V200H360" stroke="var(--charcoal)" strokeWidth="2" />
      <g fill="var(--paper)" stroke="var(--charcoal)" strokeWidth="2">
        <circle cx="40" cy="280" r="5" /><circle cx="120" cy="280" r="5" />
        <circle cx="200" cy="200" r="5" /><circle cx="280" cy="120" r="5" /><circle cx="360" cy="200" r="5" />
      </g>
      <path d="M424 348H440V332M40 40H56M40 40V56" stroke="var(--yellow)" strokeWidth="2" />
    </svg>
  );
}
