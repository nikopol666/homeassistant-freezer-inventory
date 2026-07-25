import { LitElement, html, css, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import jsQR from "jsqr";
import type { LocalizeFunc } from "../localize";
import { fireEvent } from "../ha-helpers";
import { sharedStyles } from "../styles";
import { itemIdFromQr } from "../labels";

interface DetectedBarcode {
  rawValue: string;
}

interface BarcodeDetectorLike {
  detect(source: HTMLVideoElement): Promise<DetectedBarcode[]>;
}

declare global {
  interface Window {
    BarcodeDetector?: new (options?: {
      formats?: string[];
    }) => BarcodeDetectorLike;
  }
}

/**
 * Always true: browsers without the BarcodeDetector API (companion app,
 * Firefox, iOS Safari, desktop Chrome) use the bundled jsQR decoder instead.
 * The camera itself still needs a secure (HTTPS) connection — the scan view
 * explains that when it applies.
 */
export function scanSupported(): boolean {
  return true;
}

/** Camera view: scan a printed label QR to jump straight to the item. */
export class FiScanView extends LitElement {
  @property({ attribute: false }) localize!: LocalizeFunc;

  @state() private _error = "";

  private _stream: MediaStream | null = null;
  private _timer?: ReturnType<typeof setInterval>;
  private _found = false;

  connectedCallback() {
    super.connectedCallback();
    this._start();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._stop();
  }

  private async _start() {
    const l = this.localize;
    if (!navigator.mediaDevices?.getUserMedia) {
      // Insecure context (plain http://) — the camera API does not exist
      this._error = l("scan_https");
      return;
    }
    try {
      this._stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      });
    } catch {
      this._error = l("scan_camera_denied");
      return;
    }
    await this.updateComplete;
    const video = this.renderRoot.querySelector("video");
    if (!video || !this._stream) return;
    video.srcObject = this._stream;
    await video.play().catch(() => undefined);

    const detect = this._makeDetector(video);
    this._timer = setInterval(async () => {
      if (this._found || !video.videoWidth) return;
      try {
        const payload = await detect();
        const itemId = payload ? itemIdFromQr(payload) : null;
        if (itemId) {
          this._found = true;
          this._stop();
          fireEvent(this, "fi-scan-found", { itemId });
        }
      } catch {
        // detection errors are transient; keep trying
      }
    }, 300);
  }

  /** Native BarcodeDetector when available, bundled jsQR otherwise. */
  private _makeDetector(
    video: HTMLVideoElement
  ): () => Promise<string | null> {
    if (typeof window.BarcodeDetector === "function") {
      const detector = new window.BarcodeDetector({ formats: ["qr_code"] });
      return async () => {
        const codes = await detector.detect(video);
        return codes[0]?.rawValue ?? null;
      };
    }
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
    return async () => {
      // Downscale for decode speed; jsQR handles ~480 px wide frames well
      const scale = Math.min(1, 480 / video.videoWidth);
      canvas.width = Math.round(video.videoWidth * scale);
      canvas.height = Math.round(video.videoHeight * scale);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const image = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(image.data, image.width, image.height, {
        inversionAttempts: "dontInvert",
      });
      return code?.data ?? null;
    };
  }

  private _stop() {
    if (this._timer) clearInterval(this._timer);
    this._timer = undefined;
    this._stream?.getTracks().forEach((track) => track.stop());
    this._stream = null;
  }

  render() {
    const l = this.localize;
    return html`
      <h2 class="view-title">${l("scan_title")}</h2>
      ${this._error
        ? html`<div class="error-banner">${this._error}</div>`
        : html`
            <div class="viewport">
              <video playsinline muted></video>
              <div class="target"></div>
            </div>
            <p class="hint">${l("scan_hint")}</p>
          `}
      <div class="row-of-buttons">
        <button class="btn btn-outline" @click=${() => fireEvent(this, "fi-scan-cancel")}>
          ${l("cancel")}
        </button>
      </div>
      ${nothing}
    `;
  }

  static styles = [
    sharedStyles,
    css`
      .viewport {
        position: relative;
        border-radius: var(--fi-radius);
        overflow: hidden;
        background: #000;
        aspect-ratio: 4 / 3;
        margin-bottom: 12px;
      }

      video {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }

      .target {
        position: absolute;
        inset: 12%;
        border: 3px solid color-mix(in srgb, var(--fi-accent) 85%, white);
        border-radius: 14px;
        pointer-events: none;
        box-shadow: 0 0 0 100vmax rgba(0, 0, 0, 0.25);
      }

      .hint {
        color: var(--fi-secondary);
        font-size: 14px;
        margin: 0 0 14px;
        text-align: center;
      }
    `,
  ];
}

customElements.define("fi-scan-view", FiScanView);
