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

/**
 * Print labels via a hidden iframe (more reliable than window.open in kiosk
 * browsers). One label per package; label size suits ~90×40 mm stickers and
 * flows as a grid on A4 for bulk printing.
 */
export function printLabels(items: FreezerItem[], l: LocalizeFunc): void {
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
  doc.open();
  doc.write(`<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Freezer Inventory Labels</title>
<style>
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
  .note { font-size: 10pt; font-style: italic; margin-top: 1mm; }
</style>
</head>
<body>${items.map((item) => labelHtml(item, l)).join("")}</body>
</html>`);
  doc.close();

  iframe.onload = () => {
    const win = iframe.contentWindow;
    if (win) {
      win.focus();
      win.print();
    }
    setTimeout(() => iframe.remove(), 60_000);
  };
}
