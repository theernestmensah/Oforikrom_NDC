/**
 * Kente-inspired strip patterns in NDC colours.
 *
 * A Kente cloth is woven as narrow strips that alternate between striped
 * (warp-faced) sections and patterned (weft-faced) blocks. This builds one
 * repeat of such a strip as SVG, from plain rectangles and diamonds, and
 * returns it as a data URI that can be tiled with CSS.
 */

const C = { r: '#c8102e', g: '#00843d', k: '#121512', w: '#f6f7f5' } as const;
type Colour = (typeof C)[keyof typeof C];

const H = 40; // strip thickness in SVG units
const n = (v: number) => +v.toFixed(2);

type Segment = (x: number, len: number) => string;

const rect = (x: number, y: number, w: number, h: number, fill: Colour) =>
  `<rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}" fill="${fill}"/>`;

/** Lengthwise stripes. `bands` are [colour, share of thickness] pairs. */
const warp =
  (bands: [Colour, number][]): Segment =>
  (x, len) => {
    let y = 0;
    return bands
      .map(([fill, share]) => {
        const out = rect(x, y, len, share * H, fill);
        y += share * H;
        return out;
      })
      .join('');
  };

const edges = (x: number, len: number) => rect(x, 0, len, H * 0.1, C.k) + rect(x, H * 0.9, len, H * 0.1, C.k);

const checker =
  (bg: Colour, fg: Colour): Segment =>
  (x, len) => {
    const cell = H * 0.2;
    const cols = Math.max(2, Math.round(len / cell));
    const cw = len / cols;
    let out = rect(x, 0, len, H, bg);
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < cols; col++) {
        if ((row + col) % 2 === 0) out += rect(x + col * cw, H * 0.1 + row * cell, cw, cell, fg);
      }
    }
    return out + edges(x, len);
  };

const diamond =
  (bg: Colour, fg: Colour, centre: Colour): Segment =>
  (x, len) => {
    const cx = x + len / 2;
    const half = Math.min(len * 0.36, H * 0.34);
    const pts = [
      [cx, H * 0.16],
      [cx + half, H * 0.5],
      [cx, H * 0.84],
      [cx - half, H * 0.5],
    ]
      .map(([px, py]) => `${n(px!)},${n(py!)}`)
      .join(' ');
    const s = H * 0.14;
    return (
      rect(x, 0, len, H, bg) +
      `<polygon points="${pts}" fill="${fg}"/>` +
      rect(cx - s / 2, H * 0.5 - s / 2, s, s, centre) +
      edges(x, len)
    );
  };

const ladder =
  (bg: Colour, fg: Colour): Segment =>
  (x, len) => {
    const bar = H * 0.075;
    const gap = H * 0.17;
    const count = Math.max(2, Math.floor(len / gap));
    const start = x + (len - (count - 1) * gap - bar) / 2;
    let out = rect(x, 0, len, H, bg);
    out += rect(x, H * 0.16, len, H * 0.05, fg) + rect(x, H * 0.79, len, H * 0.05, fg);
    for (let i = 0; i < count; i++) out += rect(start + i * gap, H * 0.24, bar, H * 0.52, fg);
    return out + edges(x, len);
  };

const stripesA = warp([[C.k, 0.1], [C.r, 0.16], [C.w, 0.05], [C.g, 0.38], [C.w, 0.05], [C.r, 0.16], [C.k, 0.1]]);
const stripesB = warp([[C.g, 0.12], [C.k, 0.12], [C.r, 0.52], [C.k, 0.12], [C.g, 0.12]]);
const stripesC = warp([[C.w, 0.1], [C.k, 0.2], [C.w, 0.05], [C.r, 0.3], [C.w, 0.05], [C.k, 0.2], [C.w, 0.1]]);

/** Each variant is a sequence of [segment, length as a multiple of thickness]. */
const variants: [Segment, number][][] = [
  [[stripesA, 1.6], [checker(C.r, C.w), 1.2], [stripesA, 1.6], [diamond(C.g, C.w, C.r), 1.2]],
  [[stripesB, 1.4], [ladder(C.k, C.w), 1.0], [stripesB, 1.4], [checker(C.g, C.k), 1.0]],
  [[stripesC, 1.2], [diamond(C.r, C.k, C.w), 1.2], [stripesC, 1.2], [ladder(C.g, C.w), 1.0]],
  [[stripesA, 1.0], [checker(C.k, C.r), 1.4], [stripesB, 1.0], [diamond(C.w, C.g, C.r), 1.2]],
];

export const KENTE_VARIANTS = variants.length;

export type KenteDirection = 'x' | 'y';

/** Returns a CSS `url("data:...")` for one repeat of the strip, plus its length/thickness ratio. */
export function kente(variant = 0, direction: KenteDirection = 'x') {
  const parts = variants[((variant % variants.length) + variants.length) % variants.length]!;
  let x = 0;
  let body = '';
  for (const [segment, mult] of parts) {
    const len = mult * H;
    body += segment(x, len);
    x += len;
  }
  const L = n(x);
  const svg =
    direction === 'x'
      ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${L} ${H}" shape-rendering="crispEdges">${body}</svg>`
      : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${H} ${L}" shape-rendering="crispEdges"><g transform="translate(${H} 0) rotate(90)">${body}</g></svg>`;
  return {
    url: `url("data:image/svg+xml,${encodeURIComponent(svg)}")`,
    ratio: L / H,
  };
}
