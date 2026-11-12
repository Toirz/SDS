// Decorative product-style mockups for the track panels, each sketching its problem statement.
// Beginner: a fuel purchasing plan for 12 vessels built on price history and an uncertain forecast.
// Advanced: an AI answer engine that retrieves from the ATLAS data and cites its evidence.
// The real problem statements are given to screen readers by the panel; everything here is aria-hidden.

// Small deterministic PRNG so server and client render identical artwork.
function seeded(seed: number) {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

const point = (x: number, y: number) => `${x.toFixed(1)} ${y.toFixed(1)}`;

// --- Beginner: fuel purchasing ---
const CHART = { left: 4, today: 262, right: 416, base: 118 };
const fuelRandom = seeded(11);
const HISTORY_POINTS = 26; // about six months of weekly prices
const history = (() => {
  let level = 0.55;
  return Array.from({ length: HISTORY_POINTS }, (_, i) => {
    level = Math.min(0.88, Math.max(0.15, level + (fuelRandom() - 0.5) * 0.16 + Math.sin(i / 2.6) * 0.045));
    return { x: CHART.left + (i / (HISTORY_POINTS - 1)) * (CHART.today - CHART.left), y: CHART.base - 8 - level * 96 };
  });
})();
// Buy at the three cheapest dips (lowest price = largest y), spaced apart so each reads as its own purchase.
const buys = history
  .filter((p, i) => i > 0 && i < history.length - 1 && p.y > history[i - 1].y && p.y > history[i + 1].y)
  .sort((a, b) => b.y - a.y)
  .reduce<typeof history>((picked, p) => (picked.length < 3 && picked.every((q) => Math.abs(q.x - p.x) > 30) ? [...picked, p] : picked), []);
const last = history[history.length - 1];
const FORECAST_STEPS = 8;
const forecast = Array.from({ length: FORECAST_STEPS + 1 }, (_, i) => {
  const t = i / FORECAST_STEPS;
  return { x: last.x + t * (CHART.right - last.x), y: last.y - t * 8 + Math.sin(t * 5) * 3, spread: 3 + t * 38 };
});
const band = `M${forecast.map((p) => point(p.x, p.y - p.spread)).join("L")}L${[...forecast].reverse().map((p) => point(p.x, p.y + p.spread)).join("L")}Z`;
const historyLine = `M${history.map((p) => point(p.x, p.y)).join("L")}`;

const VESSELS = [
  { name: "Vessel 01", level: 82, action: "Hold" },
  { name: "Vessel 05", level: 47, action: "Buy at dip" },
  { name: "Vessel 08", level: 14, action: "Buy now", short: true },
  { name: "Vessel 11", level: 66, action: "Hold" },
];

export function BeginnerArt() {
  return (
    <div className="mock">
      <p className="mock-title">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16M3 21h12M7 8h4" /><path d="M14 10h2a2 2 0 0 1 2 2v4a1.5 1.5 0 0 0 3 0V8l-3-3" stroke="var(--yellow)" /></svg>
        Fuel Purchasing Plan
      </p>
      <p className="mock-tags"><span>12 vessels</span><span>6 months of prices</span><span data-accent>Price forecast</span></p>
      <div className="mock-chart">
        <p className="mock-legend"><span><i />Fuel price history</span><span><i data-band />Forecast range</span><span><i data-dot />Purchase</span></p>
        <svg viewBox="0 0 420 124">
          <path d={`M${CHART.left} ${CHART.base}H${CHART.right}`} stroke="currentColor" strokeOpacity="0.14" />
          <path d={band} fill="var(--amber)" fillOpacity="0.18" />
          <path d={`M${forecast.map((p) => point(p.x, p.y)).join("L")}`} fill="none" stroke="currentColor" strokeOpacity="0.55" strokeWidth="2" strokeDasharray="4 5" strokeLinecap="round" />
          <path d={`M${CHART.today} 4V${CHART.base}`} stroke="currentColor" strokeOpacity="0.25" strokeDasharray="2 4" />
          <path d={`${historyLine}L${point(last.x, CHART.base)}L${point(CHART.left, CHART.base)}Z`} fill="var(--yellow)" fillOpacity="0.14" />
          <path d={historyLine} fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinejoin="round" strokeLinecap="round" />
          {buys.map((p) => <circle key={p.x} cx={p.x} cy={p.y} r="6" fill="var(--yellow)" stroke="var(--mock-bg)" strokeWidth="2.5" />)}
          <circle cx={last.x} cy={last.y} r="4.5" fill="var(--mock-bg)" stroke="currentColor" strokeWidth="2.25" />
        </svg>
      </div>
      <table className="mock-table">
        <thead><tr><th>Vessel</th><th>Fuel on board</th><th>Plan</th></tr></thead>
        <tbody>
          {VESSELS.map((vessel) => (
            <tr key={vessel.name}>
              <td>{vessel.name}</td>
              <td><span className="mock-gauge" data-short={vessel.short}><i style={{ width: `${vessel.level}%` }} /></span>{vessel.level}%</td>
              <td><span className="mock-pill" data-accent={vessel.action !== "Hold"} data-short={vessel.short}>{vessel.action}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// --- Advanced: grounded, culturally aware question answering ---
export function AdvancedArt() {
  return (
    <div className="mock">
      <p className="mock-title">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.8 3 2.8 15 0 18M12 3c-2.8 3-2.8 15 0 18" /><circle cx="18.5" cy="5.5" r="2.5" fill="var(--yellow)" stroke="none" /></svg>
        ATLAS Answer Engine
      </p>
      <p className="mock-tags"><span>Seed prompts</span><span>ATLAS Data catalogue</span><span data-accent>Grounded</span></p>
      <p className="mock-ask">What is a polite gift to bring to a Hari Raya open house?</p>
      <div className="mock-answer">
        <span className="mock-avatar"><svg viewBox="0 0 24 24"><path d="M12 2C13 8 16 11 22 12C16 13 13 16 12 22C11 16 8 13 2 12C8 11 11 8 12 2Z" fill="#111111" /></svg></span>
        <p>A box of festive cookies or kuih is a thoughtful choice. Greet your host with “Selamat Hari Raya”<sup>1</sup> and avoid gifts containing alcohol<sup>2</sup>.</p>
      </div>
      <p className="mock-sources">
        <span><i>1</i>Festive customs</span>
        <span><i>2</i>Visiting etiquette</span>
      </p>
    </div>
  );
}

// Props that break out of the Advanced frame: a retrieved dataset, the question bar and a few sparkles.
export function AdvancedSpill() {
  const sparkle = "M12 0C13 7 17 11 24 12C17 13 13 17 12 24C11 17 7 13 0 12C7 11 11 7 12 0Z";
  return (
    <div className="track-spill" aria-hidden="true">
      <svg className="track-spill-dataset" viewBox="0 0 44 54">
        <path d="M4 1h26l13 13v35a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V5a4 4 0 0 1 4-4Z" fill="var(--yellow)" />
        <path d="M30 1v9a4 4 0 0 0 4 4h9" fill="var(--amber)" />
        <g fill="#111111" fillOpacity="0.55"><rect x="7" y="22" width="24" height="3.5" rx="1.75" /><rect x="7" y="30" width="30" height="3.5" rx="1.75" /><rect x="7" y="38" width="18" height="3.5" rx="1.75" /></g>
      </svg>
      <svg className="track-spill-sparkle" viewBox="0 0 24 24"><path d={sparkle} fill="var(--yellow)" /></svg>
      <svg className="track-spill-sparkle track-spill-sparkle-small" viewBox="0 0 24 24"><path d={sparkle} fill="currentColor" fillOpacity="0.5" /></svg>
      <p className="track-spill-prompt">
        <span>Ask a real-world question…</span>
        <i><svg viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M6 11l6-6 6 6" /></svg></i>
      </p>
    </div>
  );
}
