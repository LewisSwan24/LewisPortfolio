/**
 * Self-contained Byte-mode QR Code matrix + SVG encoder (ISO/IEC 18004, EC Level L).
 * Supports URLs up to 106 UTF-8 bytes (Versions 2..5) with zero external packages.
 */

interface QrVersionSpec {
  version: number;
  size: number;
  dataCodewords: number;
  eccPerBlock: number;
  alignPositions: readonly number[];
}

const VERSIONS: readonly QrVersionSpec[] = [
  { version: 2, size: 25, dataCodewords: 34, eccPerBlock: 10, alignPositions: [6, 18] },
  { version: 3, size: 29, dataCodewords: 55, eccPerBlock: 15, alignPositions: [6, 22] },
  { version: 4, size: 33, dataCodewords: 80, eccPerBlock: 20, alignPositions: [6, 26] },
  { version: 5, size: 37, dataCodewords: 108, eccPerBlock: 26, alignPositions: [6, 30] },
];

// GF(256) log / antilog tables using primitive polynomial 0x11D
const EXP = new Uint8Array(512);
const LOG = new Uint8Array(256);
{
  let x = 1;
  for (let i = 0; i < 255; i++) {
    EXP[i] = x;
    LOG[x] = i;
    x <<= 1;
    if (x & 0x100) x ^= 0x11d;
  }
  for (let i = 255; i < 512; i++) {
    EXP[i] = EXP[i - 255]!;
  }
}

function gfMul(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return EXP[(LOG[a]! + LOG[b]!) % 255]!;
}

function rsGeneratorPoly(degree: number): number[] {
  let poly = [1];
  for (let i = 0; i < degree; i++) {
    const next = new Array<number>(poly.length + 1).fill(0);
    const root = EXP[i]!;
    for (let j = 0; j < poly.length; j++) {
      next[j]! ^= poly[j]!;
      next[j + 1]! ^= gfMul(poly[j]!, root);
    }
    poly = next;
  }
  return poly;
}

function computeRsEcc(data: number[], eccCount: number): number[] {
  const gen = rsGeneratorPoly(eccCount);
  const work = [...data, ...new Array<number>(eccCount).fill(0)];
  for (let i = 0; i < data.length; i++) {
    const coef = work[i]!;
    if (coef !== 0) {
      for (let j = 0; j < gen.length; j++) {
        work[i + j]! ^= gfMul(gen[j]!, coef);
      }
    }
  }
  return work.slice(data.length);
}

// Precomputed 15-bit format info values for EC Level L (01) and masks 0..7 with BCH(15,5) + XOR 0x5412
const FORMAT_BITS_L: readonly number[] = [
  0x77c4, 0x72f3, 0x7daa, 0x789d, 0x662f, 0x6318, 0x6c41, 0x6976,
];

export interface QrMatrix {
  size: number;
  get: (row: number, col: number) => boolean;
}

export function encodeQrMatrix(text: string): QrMatrix {
  const bytes = Array.from(new TextEncoder().encode(text));
  const spec =
    VERSIONS.find((v) => v.dataCodewords >= bytes.length + 2) ?? VERSIONS[VERSIONS.length - 1]!;
  const maxBytes = spec.dataCodewords - 2;
  const payload = bytes.slice(0, maxBytes);

  // Build data bit stream: Mode 0100 (byte) + 8-bit length + payload + terminator + padding
  const bits: number[] = [];
  const pushBits = (val: number, count: number) => {
    for (let i = count - 1; i >= 0; i--) bits.push((val >> i) & 1);
  };

  pushBits(0b0100, 4);
  pushBits(payload.length, 8);
  for (const b of payload) pushBits(b, 8);
  const targetBits = spec.dataCodewords * 8;
  for (let i = 0; i < 4 && bits.length < targetBits; i++) bits.push(0);
  while (bits.length % 8 !== 0) bits.push(0);

  const dataCodewords: number[] = [];
  for (let i = 0; i < bits.length; i += 8) {
    let val = 0;
    for (let j = 0; j < 8; j++) val = (val << 1) | (bits[i + j] ?? 0);
    dataCodewords.push(val);
  }
  const padBytes = [0xec, 0x11];
  let padIdx = 0;
  while (dataCodewords.length < spec.dataCodewords) {
    dataCodewords.push(padBytes[padIdx % 2]!);
    padIdx += 1;
  }

  const ecc = computeRsEcc(dataCodewords, spec.eccPerBlock);
  const fullStreamBits: number[] = [];
  for (const cw of [...dataCodewords, ...ecc]) {
    for (let i = 7; i >= 0; i--) fullStreamBits.push((cw >> i) & 1);
  }

  const n = spec.size;
  const grid = Array.from({ length: n }, () => new Array<boolean>(n).fill(false));
  const reserved = Array.from({ length: n }, () => new Array<boolean>(n).fill(false));

  const setModule = (r: number, c: number, dark: boolean, isFunc = true) => {
    if (r < 0 || c < 0 || r >= n || c >= n) return;
    grid[r]![c] = dark;
    if (isFunc) reserved[r]![c] = true;
  };

  const drawFinder = (r0: number, c0: number) => {
    for (let dr = -1; dr <= 7; dr++) {
      for (let dc = -1; dc <= 7; dc++) {
        const r = r0 + dr;
        const c = c0 + dc;
        if (r < 0 || c < 0 || r >= n || c >= n) continue;
        const inside = dr >= 0 && dr <= 6 && dc >= 0 && dc <= 6;
        const dark =
          inside &&
          (dr === 0 ||
            dr === 6 ||
            dc === 0 ||
            dc === 6 ||
            (dr >= 2 && dr <= 4 && dc >= 2 && dc <= 4));
        setModule(r, c, dark, true);
      }
    }
  };

  drawFinder(0, 0);
  drawFinder(0, n - 7);
  drawFinder(n - 7, 0);

  // Timing strips
  for (let i = 8; i < n - 8; i++) {
    setModule(6, i, i % 2 === 0, true);
    setModule(i, 6, i % 2 === 0, true);
  }

  // Alignment pattern (center [18, 18] etc., avoiding finders)
  for (const ar of spec.alignPositions) {
    for (const ac of spec.alignPositions) {
      if ((ar <= 8 && ac <= 8) || (ar <= 8 && ac >= n - 9) || (ar >= n - 9 && ac <= 8)) continue;
      for (let dr = -2; dr <= 2; dr++) {
        for (let dc = -2; dc <= 2; dc++) {
          const dark = Math.max(Math.abs(dr), Math.abs(dc)) !== 1;
          setModule(ar + dr, ac + dc, dark, true);
        }
      }
    }
  }

  // Dark module & reserve format info positions
  setModule(n - 8, 8, true, true);
  for (let i = 0; i <= 8; i++) {
    if (i !== 6) {
      reserved[8]![i] = true;
      reserved[i]![8] = true;
    }
    if (i < 8) {
      reserved[8]![n - 1 - i] = true;
      reserved[n - 1 - i]![8] = true;
    }
  }

  // Place data & ECC bits in standard upward/downward two-column zigzag
  let bitIdx = 0;
  let upward = true;
  for (let rightCol = n - 1; rightCol > 0; rightCol -= 2) {
    if (rightCol === 6) rightCol -= 1;
    for (let step = 0; step < n; step++) {
      const r = upward ? n - 1 - step : step;
      for (const c of [rightCol, rightCol - 1]) {
        if (!reserved[r]![c]) {
          const rawBit = (fullStreamBits[bitIdx] ?? 0) === 1;
          const maskedBit = (r + c) % 2 === 0 ? !rawBit : rawBit; // Mask 0
          grid[r]![c] = maskedBit;
          bitIdx += 1;
        }
      }
    }
    upward = !upward;
  }

  // Stamp format info for EC L + Mask 0
  const fmt = FORMAT_BITS_L[0]!;
  for (let i = 0; i < 15; i++) {
    const bit = ((fmt >> i) & 1) === 1;
    if (i < 6) setModule(i, 8, bit, true);
    else if (i < 8) setModule(i + 1, 8, bit, true);
    else setModule(n - 15 + i, 8, bit, true);

    if (i < 8) setModule(8, n - 1 - i, bit, true);
    else if (i < 9) setModule(8, 7, bit, true);
    else setModule(8, 14 - i, bit, true);
  }

  return {
    size: n,
    get: (row: number, col: number) => grid[row]?.[col] ?? false,
  };
}

export function qrMatrixToPath(matrix: QrMatrix, quiet = 2): { path: string; viewBoxSize: number } {
  const segments: string[] = [];
  for (let r = 0; r < matrix.size; r++) {
    for (let c = 0; c < matrix.size; c++) {
      if (matrix.get(r, c)) {
        segments.push(`M${c + quiet},${r + quiet}h1v1h-1z`);
      }
    }
  }
  return {
    path: segments.join(""),
    viewBoxSize: matrix.size + quiet * 2,
  };
}

export function generateQrSvgMarkup(url: string, sizePx = 88): string {
  const matrix = encodeQrMatrix(url);
  const { path, viewBoxSize } = qrMatrixToPath(matrix, 2);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${sizePx}" height="${sizePx}" viewBox="0 0 ${viewBoxSize} ${viewBoxSize}" shape-rendering="crispEdges"><rect width="${viewBoxSize}" height="${viewBoxSize}" fill="#FCFBF8"/><path d="${path}" fill="#151412"/></svg>`;
}
