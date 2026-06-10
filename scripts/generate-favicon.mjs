import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import opentype from "opentype.js";
import { Resvg } from "@resvg/resvg-js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "public");
const assetsDir = join(__dirname, ".favicon-assets");
const fontPath = join(assetsDir, "EBGaramond-Bold.ttf");
const FONT_URL =
  "https://fonts.gstatic.com/s/ebgaramond/v32/SlGDmQSNjdsmc35JDF1K5E55YMjF_7DPuGi-DPNUAw.ttf";

async function ensureFont() {
  try {
    readFileSync(fontPath);
  } catch {
    mkdirSync(assetsDir, { recursive: true });
    const res = await fetch(FONT_URL);
    if (!res.ok) throw new Error(`Failed to download EB Garamond: ${res.status}`);
    writeFileSync(fontPath, Buffer.from(await res.arrayBuffer()));
  }
}

await ensureFont();

// Darkest red in the site palette (--accent / --ring)
const ACCENT = "#B83A4B";
const VIEW = 32;
const FONT_SIZE = 22;

const font = opentype.parse(readFileSync(fontPath));

function centeredPath(text) {
  const probe = font.getPath(text, 0, 0, FONT_SIZE);
  const box = probe.getBoundingBox();
  const x = (VIEW - (box.x2 - box.x1)) / 2 - box.x1;
  const y = (VIEW + (box.y2 - box.y1)) / 2 - box.y2;
  return font.getPath(text, x, y, FONT_SIZE).toPathData(2);
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VIEW} ${VIEW}" role="img" aria-label="Cl&#233;ment Portal">
  <path fill="${ACCENT}" d="${centeredPath("CP")}"/>
</svg>`;

writeFileSync(join(publicDir, "favicon.svg"), svg);

function renderPng(size) {
  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: size },
  });
  return resvg.render().asPng();
}

const png16 = renderPng(16);
const png32 = renderPng(32);
const png180 = renderPng(180);

writeFileSync(join(publicDir, "favicon-16.png"), png16);
writeFileSync(join(publicDir, "favicon-32.png"), png32);
writeFileSync(join(publicDir, "apple-touch-icon.png"), png180);

const pngSize = png32.readUInt32LE(20);
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);

const entry = Buffer.alloc(16);
entry.writeUInt8(32, 0);
entry.writeUInt8(32, 1);
entry.writeUInt8(0, 2);
entry.writeUInt8(0, 3);
entry.writeUInt16LE(1, 4);
entry.writeUInt16LE(32, 6);
entry.writeUInt32LE(pngSize, 8);
entry.writeUInt32LE(22, 12);

writeFileSync(
  join(publicDir, "favicon.ico"),
  Buffer.concat([header, entry, png32.subarray(0, pngSize)]),
);

console.log("Favicon generated in public/");
