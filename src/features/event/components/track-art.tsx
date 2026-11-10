// Abstract, decorative artwork for the track panels. Standard is calm and ordered;
// Advanced is dense and layered so the step up in difficulty reads at a glance.

// Small deterministic PRNG so server and client render identical artwork.
function seeded(seed: number) {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

export function StandardArt() {
  const size = 64;
  const gap = 16;
  const x0 = 128;
  const y0 = 70;
  const filled: Record<string, { fill: string; opacity: number }> = {
    "2-0": { fill: "var(--yellow)", opacity: 1 },
    "1-1": { fill: "var(--yellow)", opacity: 1 },
    "2-1": { fill: "var(--amber)", opacity: 0.55 },
    "0-2": { fill: "var(--yellow)", opacity: 1 },
    "1-2": { fill: "var(--amber)", opacity: 0.55 },
    "2-2": { fill: "var(--amber)", opacity: 0.3 },
  };
  const cell = (row: number, col: number) => ({ x: x0 + col * (size + gap), y: y0 + row * (size + gap) });
  const steps = [[2, 0], [1, 1], [0, 2]].map(([r, c]) => cell(r, c));
  const ring = cell(0, 3);

  return (
    <svg className="track-art" viewBox="0 0 560 360" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {[0, 1, 2].flatMap((row) => [0, 1, 2, 3].map((col) => {
        const { x, y } = cell(row, col);
        const fill = filled[`${row}-${col}`];
        return fill
          ? <rect key={`${row}-${col}`} x={x} y={y} width={size} height={size} rx="10" fill={fill.fill} fillOpacity={fill.opacity} />
          : <rect key={`${row}-${col}`} x={x + 0.5} y={y + 0.5} width={size - 1} height={size - 1} rx="10" fill="none" stroke="currentColor" strokeOpacity="0.14" />;
      }))}
      <circle cx={ring.x + size / 2} cy={ring.y + size / 2} r="22" fill="none" stroke="var(--yellow)" strokeWidth="6" />
      <path d={`M${steps.map(({ x, y }) => `${x + size / 2} ${y + size / 2}`).join("L")}L${ring.x + size / 2 - 22} ${ring.y + size / 2}`} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {steps.map(({ x, y }) => <circle key={x} cx={x + size / 2} cy={y + size / 2} r="6" fill="var(--mock-bg)" stroke="currentColor" strokeWidth="2.5" />)}
    </svg>
  );
}

const CX = 280;
const CY = 190;
const random = seeded(2027);
const RINGS = [56, 100, 146, 194];
const nodes = RINGS.flatMap((r, ring) =>
  Array.from({ length: 4 + ring * 2 }, (_, i) => {
    const angle = (i / (4 + ring * 2)) * Math.PI * 2 + random() * 0.6;
    return { x: CX + Math.cos(angle) * r, y: CY + Math.sin(angle) * r, on: random() < 0.28 };
  }),
);
const edges = nodes.flatMap((node, i) =>
  [0, 1].map(() => nodes[Math.floor(random() * nodes.length)]).filter((other) => other !== node).map((other) => `M${node.x.toFixed(1)} ${node.y.toFixed(1)}L${other.x.toFixed(1)} ${other.y.toFixed(1)}`).slice(0, i % 3 === 0 ? 2 : 1),
);
const highlight = [0, 5, 13, 22, 9, 2].map((i) => nodes[i % nodes.length]);
const dust = Array.from({ length: 70 }, () => ({ x: random() * 560, y: random() * 360, r: 0.8 + random() * 1.6 }));

export function AdvancedArt() {
  return (
    <svg className="track-art" viewBox="0 0 560 360" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {dust.map((d, i) => <circle key={i} cx={d.x} cy={d.y} r={d.r} fill="currentColor" fillOpacity="0.22" />)}
      <g className="track-art-orbit">
        {RINGS.map((r, i) => (
          <circle key={r} cx={CX} cy={CY} r={r} fill="none" stroke="currentColor" strokeOpacity="0.14" strokeDasharray={i % 2 ? "3 7" : undefined} />
        ))}
        <path d={edges.join("")} stroke="currentColor" strokeOpacity="0.16" fill="none" />
        <path d={`M${highlight.map(({ x, y }) => `${x.toFixed(1)} ${y.toFixed(1)}`).join("L")}`} fill="none" stroke="var(--yellow)" strokeWidth="2.5" strokeLinejoin="round" />
        {nodes.map((node, i) => (
          <rect
            key={i}
            x={node.x - 5}
            y={node.y - 5}
            width="10"
            height="10"
            rx="2"
            transform={`rotate(45 ${node.x.toFixed(1)} ${node.y.toFixed(1)})`}
            fill={node.on || highlight.includes(node) ? "var(--yellow)" : "var(--mock-bg)"}
            stroke={node.on || highlight.includes(node) ? "var(--yellow)" : "currentColor"}
            strokeOpacity={node.on || highlight.includes(node) ? 1 : 0.5}
            strokeWidth="1.5"
          />
        ))}
      </g>
      {[{ s: 104, a: 12, f: "var(--amber)", o: 0.28 }, { s: 78, a: 34, f: "var(--yellow)", o: 0.4 }, { s: 52, a: 58, f: "var(--yellow)", o: 0.85 }].map(({ s, a, f, o }) => (
        <rect key={s} x={CX - s / 2} y={CY - s / 2} width={s} height={s} rx="10" fill={f} fillOpacity={o} transform={`rotate(${a} ${CX} ${CY})`} />
      ))}
      <rect x={CX - 26} y={CY - 26} width="52" height="52" rx="10" fill="none" stroke="currentColor" strokeOpacity="0.5" transform={`rotate(-20 ${CX} ${CY})`} />
    </svg>
  );
}
