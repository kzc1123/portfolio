export interface Grid {
  cols: number;
  rows: number;
  cellW: number;
  cellH: number;
}

export interface Area {
  top: number;
  left: number;
  right: number;
  bottom: number;
}

const WEIGHT = 800;
// Line gap as a fraction of cap height.
const GAP = 0.28;
// Space between words, in em. Wider than the font's own space so "I CODE" never reads as one word.
const WORD_SPACE = 0.42;
// Short words stop growing at this share of the area's height, so every word sits at a similar size.
const MAX_FILL = 0.62;

// Every way to break the words into 1, 2 or 3 lines, keeping word order.
function lineSplits(words: readonly string[]): string[][] {
  const splits: string[][] = [[words.join(" ")]];
  for (let i = 1; i < words.length; i++) {
    splits.push([words.slice(0, i).join(" "), words.slice(i).join(" ")]);
    for (let j = i + 1; j < words.length; j++) {
      splits.push([
        words.slice(0, i).join(" "),
        words.slice(i, j).join(" "),
        words.slice(j).join(" "),
      ]);
    }
  }
  return splits;
}

/**
 * Renders `text` in large bold type across `area` (in cell units) and returns,
 * for every cell in the grid, 1 if the cell falls inside a letter.
 */
export function wordMask(
  text: string,
  grid: Grid,
  area: Area,
  family: string
): Uint8Array {
  const width = grid.cols * grid.cellW;
  const height = grid.rows * grid.cellH;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  const mask = new Uint8Array(grid.cols * grid.rows);
  if (!ctx) return mask;

  const availW = (area.right - area.left) * grid.cellW;
  const availH = (area.bottom - area.top) * grid.cellH;

  // Width of a line at the current font, with our own word spacing.
  const lineWidth = (line: string, em: number) => {
    const words = line.split(" ");
    const letters = words.reduce((sum, w) => sum + ctx.measureText(w).width, 0);
    return letters + (words.length - 1) * WORD_SPACE * em;
  };

  ctx.font = `${WEIGHT} 100px ${family}`;
  const capRatio = ctx.measureText("H").actualBoundingBoxAscent / 100;

  let best = { size: 0, lines: [text] };
  for (const lines of lineSplits(text.split(" "))) {
    const widest = Math.max(...lines.map((l) => lineWidth(l, 100))) / 100;
    const stack = lines.length * capRatio + (lines.length - 1) * capRatio * GAP;
    const size = Math.min(availW / widest, availH / stack, (availH * MAX_FILL) / capRatio);
    // Prefer fewer lines unless more lines make the type clearly bigger.
    if (size > best.size * 1.08) best = { size, lines };
  }

  ctx.font = `${WEIGHT} ${best.size}px ${family}`;
  ctx.fillStyle = "#000";
  const cap = capRatio * best.size;
  const gap = cap * GAP;
  const block = best.lines.length * cap + (best.lines.length - 1) * gap;
  let y = area.top * grid.cellH + (availH - block) / 2;
  for (const line of best.lines) {
    y += cap;
    let x = area.left * grid.cellW;
    for (const word of line.split(" ")) {
      ctx.fillText(word, x, y);
      x += ctx.measureText(word).width + WORD_SPACE * best.size;
    }
    y += gap;
  }

  const pixels = ctx.getImageData(0, 0, width, height).data;
  for (let r = 0; r < grid.rows; r++) {
    const py = Math.floor(r * grid.cellH + grid.cellH / 2);
    for (let c = 0; c < grid.cols; c++) {
      const px = Math.floor(c * grid.cellW + grid.cellW / 2);
      if (pixels[(py * width + px) * 4 + 3] > 110) mask[r * grid.cols + c] = 1;
    }
  }
  return mask;
}
