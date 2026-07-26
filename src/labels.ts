import qrcode from "qrcode-generator";
import type { FreezerItem } from "./types";
import { formatDate } from "./localize";
import type { LocalizeFunc } from "./localize";

export const QR_PREFIX = "fi:";

/** QR payload encoded on printed labels. */
export function qrPayload(item: Pick<FreezerItem, "id">): string {
  return `${QR_PREFIX}${item.id}`;
}

/** Item id from a scanned QR payload, or null when it is not ours. */
export function itemIdFromQr(payload: string): string | null {
  return payload.startsWith(QR_PREFIX) ? payload.slice(QR_PREFIX.length) : null;
}

/** SVG markup of the item QR code. */
export function qrSvg(item: Pick<FreezerItem, "id">, cellSize = 4): string {
  const qr = qrcode(0, "M");
  qr.addData(qrPayload(item));
  qr.make();
  return qr.createSvgTag({ cellSize, margin: 0, scalable: true });
}

export interface LabelFormat {
  /** null = A4 sheet with a grid of 88×36 mm labels */
  width: number | null;
  height: number | null;
}

/** Parse "a4" or "<W>x<H>" (mm, e.g. "50x30" for Niimbot B1/B21). */
export function parseLabelFormat(value: string | undefined): LabelFormat {
  const match = /^(\d{1,3})x(\d{1,3})$/.exec((value || "").trim());
  if (!match) return { width: null, height: null };
  return { width: Number(match[1]), height: Number(match[2]) };
}

function labelHtml(item: FreezerItem, l: LocalizeFunc): string {
  const amount: string[] = [];
  if (item.weight != null) amount.push(`${item.weight} ${item.unit || "g"}`);
  if (item.pieces != null) amount.push(`${item.pieces} ${l("pieces_short")}`);
  return `
    <div class="label">
      <div class="qr">${qrSvg(item)}</div>
      <div class="text">
        <div class="name">${escapeHtml(item.product_name)}</div>
        <div class="meta">${formatDate(item)}${
          amount.length ? " · " + amount.join(" · ") : ""
        }</div>
        ${item.note ? `<div class="note">${escapeHtml(item.note)}</div>` : ""}
      </div>
    </div>`;
}

function escapeHtml(text: string): string {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function labelPrinterCss(format: LabelFormat): string {
  // One label per page, page size = label size (for label printers with a
  // print driver, e.g. Brother/Dymo; Niimbot users use the image mode instead)
  const width = format.width ?? 88;
  const height = format.height ?? 36;
  const thin = height <= 20;
  return `
  @page { size: ${width}mm ${height}mm; margin: 0; }
  body { margin: 0; font-family: system-ui, sans-serif; color: #000; background: #fff; }
  .label {
    display: flex;
    align-items: center;
    gap: ${thin ? 1.5 : 3}mm;
    width: ${width}mm;
    height: ${height}mm;
    padding: ${thin ? 1 : 2}mm;
    box-sizing: border-box;
    page-break-after: always;
    overflow: hidden;
  }
  .qr { flex: none; width: ${height - (thin ? 2 : 4)}mm; height: ${height - (thin ? 2 : 4)}mm; }
  .qr svg { width: 100%; height: 100%; }
  .text { min-width: 0; }
  .name { font-size: ${thin ? 8 : 12}pt; font-weight: 700; line-height: 1.15; }
  .meta { font-size: ${thin ? 7 : 10}pt; margin-top: ${thin ? 0.5 : 1.5}mm; }
  .note { font-size: ${thin ? 6 : 8}pt; font-style: italic; margin-top: ${thin ? 0 : 1}mm; }`;
}

const A4_SHEET_CSS = `
  @page { margin: 10mm; }
  body {
    margin: 0;
    font-family: system-ui, sans-serif;
    color: #000;
    background: #fff;
    display: flex;
    flex-wrap: wrap;
    gap: 4mm;
    align-content: flex-start;
  }
  .label {
    display: flex;
    align-items: center;
    gap: 4mm;
    width: 88mm;
    min-height: 36mm;
    border: 0.3mm dashed #999;
    border-radius: 2mm;
    padding: 3mm;
    box-sizing: border-box;
    page-break-inside: avoid;
  }
  .qr { flex: none; width: 28mm; height: 28mm; }
  .qr svg { width: 100%; height: 100%; }
  .text { min-width: 0; }
  .name { font-size: 14pt; font-weight: 700; line-height: 1.2; }
  .meta { font-size: 12pt; margin-top: 1.5mm; }
  .note { font-size: 10pt; font-style: italic; margin-top: 1mm; }`;

/**
 * Print labels via a hidden iframe (more reliable than window.open in kiosk
 * browsers). Default is an A4 sheet with a grid of ~88×36 mm labels; with a
 * label format set, each page is exactly one label of that size.
 */
export function printLabels(
  items: FreezerItem[],
  l: LocalizeFunc,
  format: LabelFormat = { width: null, height: null }
): void {
  const iframe = document.createElement("iframe");
  iframe.style.position = "fixed";
  iframe.style.right = "0";
  iframe.style.bottom = "0";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "0";
  document.body.appendChild(iframe);

  const doc = iframe.contentDocument;
  if (!doc) {
    iframe.remove();
    return;
  }
  const css = format.width ? labelPrinterCss(format) : A4_SHEET_CSS;
  doc.open();
  doc.write(`<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Freezer Inventory Labels</title>
<style>${css}</style>
</head>
<body>${items.map((item) => labelHtml(item, l)).join("")}</body>
</html>`);
  doc.close();

  // The document is written synchronously (no external resources), so it is
  // complete right after close() — waiting for iframe.onload here would miss
  // the event entirely (it fires during close, before a handler could attach).
  const win = iframe.contentWindow;
  if (win) {
    win.focus();
    win.print();
  }
  setTimeout(() => iframe.remove(), 60_000);
}

/**
 * The Home Assistant companion app WebView has no print support at all
 * (window.print is a silent no-op there) — detect it so the card can show
 * an explanation instead of doing nothing.
 */
export function printUnsupported(): boolean {
  return navigator.userAgent.includes("Home Assistant");
}

// ---------------------------------------------------------------------
// Image mode: render the label as a PNG for label-printer apps (Niimbot,
// Brother iPrint, …) that print images instead of exposing a print driver.

const PX_PER_MM = 8; // ≈203 dpi, the native resolution of most label printers

function drawLabelCanvas(
  item: FreezerItem,
  l: LocalizeFunc,
  format: LabelFormat
): HTMLCanvasElement {
  const widthMm = format.width ?? 50;
  const heightMm = format.height ?? 30;
  const width = widthMm * PX_PER_MM;
  const height = heightMm * PX_PER_MM;
  const thin = heightMm <= 20;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, width, height);

  // QR on the left: fits the height but never eats the text's width
  const pad = Math.round((thin ? 1 : 2) * PX_PER_MM);
  const qrSize = Math.min(height - 2 * pad, Math.round(width * 0.36));
  const qrY = Math.round((height - qrSize) / 2);
  const qr = qrcode(0, "M");
  qr.addData(qrPayload(item));
  qr.make();
  const modules = qr.getModuleCount();
  const cell = qrSize / modules;
  ctx.fillStyle = "#000";
  for (let row = 0; row < modules; row++) {
    for (let col = 0; col < modules; col++) {
      if (qr.isDark(row, col)) {
        ctx.fillRect(
          pad + Math.floor(col * cell),
          qrY + Math.floor(row * cell),
          Math.ceil(cell),
          Math.ceil(cell)
        );
      }
    }
  }

  // Texts on the right: shrink the font to fit first, ellipsize only after
  const textX = pad + qrSize + pad;
  const maxTextWidth = width - textX - pad;

  const fitLine = (
    text: string,
    baseSize: number,
    style: string
  ): { text: string; font: string; size: number } => {
    let size = baseSize;
    const minSize = Math.round(baseSize * 0.6);
    let font = "";
    while (true) {
      font = `${style} ${size}px system-ui, sans-serif`.trim();
      ctx.font = font;
      if (ctx.measureText(text).width <= maxTextWidth || size <= minSize) break;
      size -= 1;
    }
    if (ctx.measureText(text).width <= maxTextWidth) return { text, font, size };
    let trimmed = text;
    while (trimmed.length > 1 && ctx.measureText(`${trimmed}…`).width > maxTextWidth) {
      trimmed = trimmed.slice(0, -1);
    }
    return { text: `${trimmed}…`, font, size };
  };

  const amount: string[] = [];
  if (item.weight != null) amount.push(`${item.weight} ${item.unit || "g"}`);
  if (item.pieces != null) amount.push(`${item.pieces} ${l("pieces_short")}`);
  const meta = `${formatDate(item)}${amount.length ? " · " + amount.join(" · ") : ""}`;

  const lines = [
    fitLine(item.product_name, Math.round((thin ? 2.9 : 4) * PX_PER_MM), "700"),
    fitLine(meta, Math.round((thin ? 2.4 : 3) * PX_PER_MM), ""),
  ];
  if (item.note && !thin) {
    lines.push(fitLine(item.note, Math.round(2.4 * PX_PER_MM), "italic"));
  }

  // Vertically center the text block next to the QR
  const gap = Math.round(0.9 * PX_PER_MM);
  const blockHeight =
    lines.reduce((sum, line) => sum + line.size, 0) + gap * (lines.length - 1);
  let y = Math.max(pad, Math.round((height - blockHeight) / 2));
  ctx.fillStyle = "#000";
  ctx.textBaseline = "top";
  for (const line of lines) {
    ctx.font = line.font;
    ctx.fillText(line.text, textX, y);
    y += line.size + gap;
  }
  return canvas;
}

function labelFileName(item: FreezerItem): string {
  const slug = item.product_name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `stitek-${slug || "polozka"}-${String(item.month).padStart(2, "0")}-${item.year}.png`;
}

function dataUrlToFile(dataUrl: string, name: string): File {
  const [head, body] = dataUrl.split(",");
  const mime = /data:(.*?);/.exec(head)?.[1] ?? "image/png";
  const binary = atob(body);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index++) {
    bytes[index] = binary.charCodeAt(index);
  }
  return new File([bytes], name, { type: mime });
}

function downloadDataUrl(dataUrl: string, name: string): void {
  const anchor = document.createElement("a");
  anchor.href = dataUrl;
  anchor.download = name;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
}

/**
 * Render labels as PNG images and hand them to the system: one label is
 * offered to the Android/iOS share sheet (→ share straight into the Niimbot
 * or another label-printer app); multiple labels, or platforms without the
 * Web Share API, fall back to downloads.
 * Returns how the labels were delivered.
 */
export async function shareLabelImages(
  items: FreezerItem[],
  l: LocalizeFunc,
  format: LabelFormat
): Promise<"shared" | "downloaded"> {
  const rendered = items.map((item) => ({
    name: labelFileName(item),
    dataUrl: drawLabelCanvas(item, l, format).toDataURL("image/png"),
  }));

  if (rendered.length === 1 && typeof navigator.share === "function") {
    try {
      const file = dataUrlToFile(rendered[0].dataUrl, rendered[0].name);
      if (!navigator.canShare || navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file] });
        return "shared";
      }
    } catch (err) {
      if ((err as DOMException)?.name === "AbortError") return "shared";
      // fall through to download
    }
  }
  for (const label of rendered) {
    downloadDataUrl(label.dataUrl, label.name);
  }
  return "downloaded";
}

declare global {
  interface Navigator {
    canShare?: (data: { files: File[] }) => boolean;
  }
}

// ---------------------------------------------------------------------
// Direct printing via the hass-niimbot integration (service niimbot.print):
// the label is described as imagespec elements (text + qrcode) and rendered
// by the printer integration itself — crisp output, no PNG scaling.

export interface NiimbotPrintData {
  payload: Record<string, unknown>[];
  width: number;
  height: number;
}

/** Split a name into at most two lines that fit maxChars per line. */
function wrapName(name: string, maxChars: number): string[] {
  if (name.length <= maxChars) return [name];
  const words = name.split(/\s+/);
  if (words.length === 1) return [name];
  let first = words[0];
  let index = 1;
  while (
    index < words.length &&
    `${first} ${words[index]}`.length <= maxChars
  ) {
    first = `${first} ${words[index]}`;
    index += 1;
  }
  const rest = words.slice(index).join(" ");
  return rest ? [first, rest] : [first];
}

/**
 * Build the niimbot.print service data for one item. Layout follows the
 * proven manual recipe: texts on the left, QR filling the right side.
 */
export function niimbotPrintData(
  item: FreezerItem,
  l: LocalizeFunc,
  format: LabelFormat,
  font?: string
): NiimbotPrintData {
  const widthMm = format.width ?? 50;
  const heightMm = format.height ?? 30;
  const width = widthMm * PX_PER_MM;
  const height = heightMm * PX_PER_MM;
  const thin = heightMm <= 20;

  const pad = thin ? 6 : 12;

  // QR sizing in the module-based form proven with hass-niimbot
  // (boxsize + eclevel: 2); the renderer adds a default 4-module border.
  const qr = qrcode(0, "H");
  qr.addData(qrPayload(item));
  qr.make();
  const modulesWithBorder = qr.getModuleCount() + 8;
  const qrBudget = Math.min(height - 2 * (thin ? 4 : 8), Math.round(width * 0.5));
  const boxsize = Math.max(2, Math.floor(qrBudget / modulesWithBorder));
  const qrSize = modulesWithBorder * boxsize;
  const qrX = width - qrSize - Math.max(4, pad - 8);
  const qrY = Math.round((height - qrSize) / 2);
  const textWidth = qrX - pad - 8;

  const nameBase = thin ? Math.round(height * 0.32) : 34;
  const metaBase = thin ? Math.round(height * 0.26) : 26;
  const noteSize = 20;
  const gap = thin ? 4 : 8;

  // Adaptive name size + wrapping (~0.55 px per char per size unit)
  const charsPerLine = (size: number) =>
    Math.max(3, Math.floor(textWidth / (size * 0.55)));
  let nameSize = nameBase;
  let nameLines = wrapName(item.product_name, charsPerLine(nameSize));
  const fitsName = () =>
    nameLines.every((line) => line.length <= charsPerLine(nameSize)) &&
    nameLines.length <= (thin ? 1 : 2);
  while (!fitsName() && nameSize > Math.round(nameBase * 0.6)) {
    nameSize -= 2;
    nameLines = wrapName(item.product_name, charsPerLine(nameSize));
  }
  if (nameLines.length > (thin ? 1 : 2)) {
    nameLines = nameLines.slice(0, thin ? 1 : 2);
    const last = nameLines.length - 1;
    const max = charsPerLine(nameSize);
    if (nameLines[last].length > max) {
      nameLines[last] = `${nameLines[last].slice(0, Math.max(1, max - 1))}…`;
    }
  }

  const amount: string[] = [];
  if (item.weight != null) amount.push(`${item.weight} ${item.unit || "g"}`);
  if (item.pieces != null) amount.push(`${item.pieces} ${l("pieces_short")}`);

  interface Line {
    value: string;
    size: number;
  }
  const lines: Line[] = nameLines.map((value) => ({ value, size: nameSize }));
  if (thin) {
    lines.push({
      value: `${formatDate(item)}${amount.length ? " · " + amount.join(" · ") : ""}`,
      size: metaBase,
    });
  } else {
    lines.push({ value: formatDate(item), size: metaBase });
    if (amount.length) lines.push({ value: amount.join(" · "), size: metaBase });
    if (item.note) lines.push({ value: item.note, size: noteSize });
  }

  // Drop the note, then shrink, if the block does not fit vertically
  const blockHeight = () =>
    lines.reduce((sum, line) => sum + line.size, 0) + gap * (lines.length - 1);
  if (blockHeight() > height - 2 * pad && item.note && !thin) {
    lines.pop();
  }

  let y = Math.max(pad, Math.round((height - blockHeight()) / 2));
  const payload: Record<string, unknown>[] = [];
  for (const line of lines) {
    payload.push({
      type: "text",
      value: line.value,
      x: pad,
      y,
      size: line.size,
      ...(font ? { font } : {}),
    });
    y += line.size + gap;
  }
  payload.push({
    type: "qrcode",
    data: qrPayload(item),
    x: qrX,
    y: qrY,
    boxsize,
    eclevel: 2,
  });

  return { payload, width, height };
}
