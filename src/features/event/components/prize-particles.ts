// Dissolves the prize total into particles that fly onto the pixels of each award amount.

type Point = [x: number, y: number];

const STEP = 2; // sampling grid and particle size, in CSS px
const MAX_DELAY = 300;
const MIN_DURATION = 650;
const MAX_DURATION = 950;

// Pairs every source point with a target, keeping reading order so the top of the total lands on the top award.
export function pairPoints(sources: Point[], targets: Point[]): [Point, Point][] {
  if (targets.length === 0) return [];
  return sources.map((source, index) => [source, targets[Math.floor((index * targets.length) / sources.length)]]);
}

// Draws an element's text onto a canvas at its on-screen glyph positions (keeps letter spacing and tabular figures).
function drawText(ctx: CanvasRenderingContext2D, element: HTMLElement, origin: DOMRect) {
  const style = getComputedStyle(element);
  ctx.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
  ctx.textBaseline = "alphabetic";
  const ascent = ctx.measureText("0").fontBoundingBoxAscent;
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
  const range = document.createRange();
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const text = node.textContent ?? "";
    for (let index = 0; index < text.length; index += 1) {
      if (text[index].trim() === "") continue;
      range.setStart(node, index);
      range.setEnd(node, index + 1);
      const rect = range.getBoundingClientRect();
      ctx.fillText(text[index], rect.left - origin.left, rect.top - origin.top + ascent);
    }
  }
}

function samplePoints(width: number, height: number, elements: HTMLElement[], origin: DOMRect): Point[] {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return [];
  elements.forEach((element) => drawText(ctx, element, origin));
  const { data } = ctx.getImageData(0, 0, width, height);
  const points: Point[] = [];
  for (let y = 0; y < height; y += STEP) {
    for (let x = 0; x < width; x += STEP) {
      if (data[(y * width + x) * 4 + 3] > 110) points.push([x, y]);
    }
  }
  return points;
}

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

// Runs the merge on `canvas` (covering `figure`); resolves when every particle has landed.
export function mergeIntoAwards(canvas: HTMLCanvasElement, figure: HTMLElement, source: HTMLElement, groups: HTMLElement[][], sparkle: string) {
  const origin = figure.getBoundingClientRect();
  const width = Math.ceil(origin.width);
  const height = Math.ceil(origin.height);
  const ctx = canvas.getContext("2d");
  if (!ctx || width === 0 || height === 0) return Promise.resolve();

  // The left half of the total feeds the first group, the right half the second.
  const split = source.getBoundingClientRect().left + source.getBoundingClientRect().width / 2 - origin.left;
  const from = samplePoints(width, height, [source], origin);
  const halves = [from.filter(([x]) => x < split), from.filter(([x]) => x >= split)];
  const color = getComputedStyle(source).color;
  const landedColor = groups[0]?.[0] ? getComputedStyle(groups[0][0]).color : color;
  const particles = groups.flatMap((group, index) => pairPoints(halves[index] ?? [], samplePoints(width, height, group, origin))).map(([[x0, y0], [x1, y1]]) => {
    const bend = (Math.random() - 0.5) * 80;
    const length = Math.hypot(x1 - x0, y1 - y0) || 1;
    return {
      x0, y0, x1, y1,
      // Control point bowed off the straight line so particles drift in on gentle arcs.
      cx: (x0 + x1) / 2 + (-(y1 - y0) / length) * bend,
      cy: (y0 + y1) / 2 + ((x1 - x0) / length) * bend,
      delay: (x0 / width) * MAX_DELAY * 0.5 + Math.random() * MAX_DELAY * 0.5,
      duration: MIN_DURATION + Math.random() * (MAX_DURATION - MIN_DURATION),
      fill: Math.random() < 0.18 ? sparkle : color,
      twinkle: Math.random() * Math.PI * 2,
    };
  });
  if (particles.length === 0) return Promise.resolve();

  const ratio = window.devicePixelRatio || 1;
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

  return new Promise<void>((resolve) => {
    const start = performance.now();
    const frame = (now: number) => {
      const elapsed = now - start;
      let landed = 0;
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        const t = Math.min(Math.max((elapsed - p.delay) / p.duration, 0), 1);
        if (t === 1) landed += 1;
        const e = easeInOut(t);
        const u = 1 - e;
        const x = u * u * p.x0 + 2 * u * e * p.cx + e * e * p.x1;
        const y = u * u * p.y0 + 2 * u * e * p.cy + e * e * p.y1;
        // Particles shrink and twinkle mid-flight, then settle solid on their target pixel.
        const flight = Math.sin(Math.PI * t);
        ctx.globalAlpha = 1 - flight * (0.45 + 0.35 * Math.sin(p.twinkle + elapsed / 40));
        ctx.fillStyle = t === 1 ? landedColor : p.fill;
        const size = STEP * (1 - flight * 0.4);
        ctx.fillRect(x, y, size, size);
      }
      if (landed < particles.length) requestAnimationFrame(frame);
      else resolve();
    };
    // First frame draws synchronously so the canvas takes over in the same paint the digits hide.
    frame(start);
  });
}
