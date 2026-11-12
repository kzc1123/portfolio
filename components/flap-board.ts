import { wordMask, type Grid } from "@/components/flap-mask";

export interface BoardFrame {
  text: string;
  // Shorter line breaks for narrow boards, e.g. "I PLAY BAD- MINTON".
  compact?: string;
  tile: string;
  ink: string;
}

export interface BoardOptions {
  frames: readonly BoardFrame[];
  header: string;
  headerRight?: string;
  sans: string;
  mono: string;
  reduce: boolean;
}

export interface Board {
  next: () => void;
  point: (x: number, y: number) => void;
  setVisible: (visible: boolean) => void;
  resize: () => void;
  destroy: () => void;
}

interface Face {
  ch: string;
  tile: string | null;
  ink: string;
}

interface Cell {
  col: number;
  row: number;
  field: Face;
  base: Face;
  shown: Face;
  seq: Face[];
  t0: number;
  step: number;
}

const PAPER = "#ffffff";
const FIELD_INK = "#e4e4e7";
const HOT_INK = "#52525b";
const HEADER_TILE = "#09090b";
const HEADER_INK = "#fafafa";
const FIELD_CHARS = "abcdefghijklmnopqrstuvwxyz0123456789";
const FLAP_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const GLYPHS = "{}[]();=<>/*+01";
const FIELD_DENSITY = 0.16;
const FLAP_MS = 70;
const SCRAMBLE_MS = 55;
const WAVE_MS_PER_COL = 11;
const HOLD_MS = 2500;
const POINTER_RADIUS = 36;
// Below this many columns, long words need their compact breaks to stay readable.
const NARROW_COLS = 70;

const pick = (chars: string) => chars[Math.floor(Math.random() * chars.length)];

const sameFace = (a: Face, b: Face) =>
  a.ch === b.ch && a.tile === b.tile && a.ink === b.ink;

export function createBoard(canvas: HTMLCanvasElement, opts: BoardOptions): Board {
  const ctx = canvas.getContext("2d");
  let grid: Grid = { cols: 0, rows: 0, cellW: 0, cellH: 0 };
  let ox = 0;
  let oy = 0;
  let cells: Cell[] = [];
  const active = new Set<number>();
  let frame = 0;
  let raf = 0;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let visible = false;
  let pointer: { x: number; y: number } | null = null;

  function layout() {
    const parent = canvas.parentElement;
    if (!parent || !ctx) return;
    const w = parent.clientWidth;
    const h = parent.clientHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const cellW = w < 640 ? 7 : 11;
    const cellH = Math.round(cellW * 1.45);
    grid = { cols: Math.floor(w / cellW), rows: Math.floor(h / cellH), cellW, cellH };
    ox = (w - grid.cols * cellW) / 2;
    oy = (h - grid.rows * cellH) / 2;

    ctx.font = `500 ${Math.round(cellH * 0.62)}px ${opts.mono}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    active.clear();
    cells = [];
    for (let row = 0; row < grid.rows; row++) {
      for (let col = 0; col < grid.cols; col++) {
        const field: Face = {
          ch: Math.random() < FIELD_DENSITY ? pick(FIELD_CHARS) : " ",
          tile: null,
          ink: FIELD_INK,
        };
        cells.push({ col, row, field, base: field, shown: field, seq: [], t0: 0, step: FLAP_MS });
      }
    }
    ctx.fillStyle = PAPER;
    ctx.fillRect(0, 0, w, h);
    cells.forEach((cell) => draw(cell, cell.field, 1));
  }

  function targets(index: number): Face[] {
    const { tile, ink, ...frameText } = opts.frames[index];
    const text =
      grid.cols < NARROW_COLS && frameText.compact ? frameText.compact : frameText.text;
    const out = cells.map((cell) => cell.field);
    const left = Math.min(2, grid.cols - 1);

    // Fixed label strips on the second row: one flush left, one flush right.
    // If both don't fit side by side, the right one drops to the row below.
    const label = (text: string, row: number, start: number) => {
      for (let i = 0; i < text.length; i++) {
        const col = start + i;
        if (col < 0 || col >= grid.cols) continue;
        out[row * grid.cols + col] = { ch: text[i], tile: HEADER_TILE, ink: HEADER_INK };
      }
    };
    label(opts.header, 1, left);
    if (opts.headerRight) {
      const fits = opts.header.length + opts.headerRight.length + left * 2 + 2 <= grid.cols;
      label(opts.headerRight, fits ? 1 : 2, grid.cols - left - opts.headerRight.length);
    }

    const mask = wordMask(
      text,
      grid,
      { top: 4, left, right: grid.cols - left, bottom: grid.rows - 2 },
      opts.sans
    );
    // Fill the letter shapes with the word's own letters, read left to right.
    const letters = text.replace(/[^A-Z0-9]/g, "") || "X";
    let n = 0;
    mask.forEach((on, i) => {
      if (!on) return;
      out[i] = { ch: letters[n % letters.length], tile, ink };
      n++;
    });
    return out;
  }

  function draw(cell: Cell, face: Face, squash: number) {
    if (!ctx) return;
    const { cellW, cellH } = grid;
    const x = ox + cell.col * cellW;
    const y = oy + cell.row * cellH;
    ctx.fillStyle = PAPER;
    ctx.fillRect(x, y, cellW, cellH);

    if (face.tile) {
      const h = (cellH - 2) * squash;
      ctx.fillStyle = face.tile;
      ctx.fillRect(x + 0.5, y + cellH / 2 - h / 2, cellW - 1, h);
      if (squash > 0.6) {
        ctx.fillStyle = "rgba(128, 128, 128, 0.22)";
        ctx.fillRect(x + 0.5, y + cellH / 2 - 0.5, cellW - 1, 1);
      }
    }
    if (face.ch !== " " && squash > 0.15) {
      ctx.save();
      ctx.translate(x + cellW / 2, y + cellH / 2 + 0.5);
      ctx.scale(1, squash);
      ctx.fillStyle = face.ink;
      ctx.fillText(face.ch, 0, 0);
      ctx.restore();
    }
    cell.shown = face;
  }

  function flip(index: number, seq: Face[], start: number, step: number) {
    const cell = cells[index];
    cell.seq = seq;
    cell.t0 = start;
    cell.step = step;
    active.add(index);
  }

  function advance(cell: Cell, index: number, now: number) {
    if (now < cell.t0) return;
    const elapsed = now - cell.t0;
    const k = Math.floor(elapsed / cell.step);
    if (k >= cell.seq.length) {
      const last = cell.seq[cell.seq.length - 1];
      cell.seq = [];
      active.delete(index);
      draw(cell, last, 1);
      return;
    }
    const p = (elapsed % cell.step) / cell.step;
    const prev = k === 0 ? cell.shown : cell.seq[k - 1];
    draw(cell, p < 0.5 ? prev : cell.seq[k], Math.abs(Math.cos(p * Math.PI)));
  }

  function show(index: number, wave: boolean) {
    const now = performance.now();
    const next = targets(index);
    next.forEach((target, i) => {
      const cell = cells[i];
      if (sameFace(cell.base, target)) return;
      cell.base = target;
      if (!wave) {
        cell.seq = [];
        active.delete(i);
        draw(cell, target, 1);
        return;
      }
      const tile = target.tile ?? cell.shown.tile;
      const rolls = tile ? 1 + Math.floor(Math.random() * 3) : 0;
      const seq: Face[] = [];
      for (let r = 0; r < rolls; r++) {
        seq.push({ ch: pick(FLAP_CHARS), tile, ink: target.tile ? target.ink : cell.shown.ink });
      }
      seq.push(target);
      flip(i, seq, now + cell.col * WAVE_MS_PER_COL + Math.random() * 90, FLAP_MS);
    });
    wake();
  }

  function scramble(now: number) {
    if (!pointer || opts.reduce) return;
    const { x, y } = pointer;
    pointer = null;
    const { cellW, cellH } = grid;
    const c0 = Math.floor((x - ox) / cellW);
    const r0 = Math.floor((y - oy) / cellH);
    const reachC = Math.ceil(POINTER_RADIUS / cellW);
    const reachR = Math.ceil(POINTER_RADIUS / cellH);
    for (let r = r0 - reachR; r <= r0 + reachR; r++) {
      if (r < 0 || r >= grid.rows) continue;
      for (let c = c0 - reachC; c <= c0 + reachC; c++) {
        if (c < 0 || c >= grid.cols) continue;
        const i = r * grid.cols + c;
        const cell = cells[i];
        const dist = Math.hypot((c - c0) * cellW, (r - r0) * cellH);
        if (dist > POINTER_RADIUS || cell.seq.length || Math.random() > 0.6) continue;
        const ink = cell.base.tile ? cell.base.ink : HOT_INK;
        const glyphs: Face[] = [{ ch: pick(GLYPHS), tile: cell.base.tile, ink }];
        if (Math.random() < 0.5) glyphs.push({ ch: pick(GLYPHS), tile: cell.base.tile, ink });
        flip(i, [...glyphs, cell.base], now + dist * 1.5, SCRAMBLE_MS);
      }
    }
  }

  function tick(now: number) {
    raf = 0;
    scramble(now);
    active.forEach((i) => advance(cells[i], i, now));
    if (active.size && visible) raf = requestAnimationFrame(tick);
  }

  function wake() {
    if (!raf && visible && !opts.reduce) raf = requestAnimationFrame(tick);
  }

  function schedule() {
    clearTimeout(timer);
    if (!visible || opts.frames.length < 2) return;
    const wave = opts.reduce ? 0 : grid.cols * WAVE_MS_PER_COL;
    timer = setTimeout(() => {
      frame = (frame + 1) % opts.frames.length;
      show(frame, !opts.reduce);
      schedule();
    }, wave + HOLD_MS);
  }

  layout();
  // The first word waits until the board is on screen, so the opening wave is actually seen.
  let started = false;

  return {
    next() {
      frame = (frame + 1) % opts.frames.length;
      show(frame, !opts.reduce);
      schedule();
    },
    point(x, y) {
      pointer = { x, y };
      wake();
    },
    setVisible(next) {
      visible = next;
      if (visible) {
        if (!started) {
          started = true;
          show(frame, !opts.reduce);
        }
        wake();
        schedule();
      } else {
        clearTimeout(timer);
        cancelAnimationFrame(raf);
        raf = 0;
      }
    },
    resize() {
      layout();
      if (started) show(frame, false);
    },
    destroy() {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    },
  };
}
