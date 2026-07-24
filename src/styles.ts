import { css } from "lit";

/**
 * Shared styles — design "A" (HA-native minimalist) with the larger icon
 * treatment from design "C". All colors come from HA theme variables so
 * light and dark themes both work.
 */
export const sharedStyles = css`
  :host {
    --fi-accent: var(--primary-color, #03a9f4);
    --fi-text: var(--primary-text-color, #1c1e24);
    --fi-secondary: var(--secondary-text-color, #6f7480);
    --fi-divider: var(--divider-color, rgba(0, 0, 0, 0.08));
    --fi-chip-bg: var(--secondary-background-color, #e8eaee);
    --fi-warn: var(--warning-color, #ff9800);
    --fi-danger: var(--error-color, #f44336);
    --fi-success: var(--success-color, #4caf50);
    --fi-radius: 12px;
    --fi-row-height: 64px;
    --fi-avatar: 44px;
    --fi-avatar-icon: 26px;
    color: var(--fi-text);
  }

  :host([touch]) {
    --fi-row-height: 72px;
    --fi-avatar: 52px;
    --fi-avatar-icon: 30px;
  }

  * {
    box-sizing: border-box;
  }

  button {
    font: inherit;
    color: inherit;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
  }

  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    min-height: 48px;
    padding: 12px 16px;
    border-radius: var(--fi-radius);
    font-size: 15px;
    font-weight: 600;
    letter-spacing: 0.4px;
    transition: background 0.15s ease;
  }

  .btn-primary {
    background: var(--fi-accent);
    color: var(--text-primary-color, #fff);
  }

  .btn-primary:hover {
    filter: brightness(0.95);
  }

  .btn-outline {
    border: 1px solid var(--fi-divider);
    background: transparent;
    color: var(--fi-text);
  }

  .btn-outline:hover {
    background: color-mix(in srgb, var(--fi-accent) 7%, transparent);
  }

  .btn-danger {
    background: color-mix(in srgb, var(--fi-danger) 14%, transparent);
    color: var(--fi-danger);
  }

  .btn-quiet {
    background: transparent;
    color: var(--fi-secondary);
  }

  .avatar {
    flex: none;
    width: var(--fi-avatar);
    height: var(--fi-avatar);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: color-mix(
      in srgb,
      var(--fi-avatar-color, var(--fi-accent)) 14%,
      transparent
    );
    color: var(--fi-avatar-color, var(--fi-accent));
  }

  .avatar ha-icon {
    --mdc-icon-size: var(--fi-avatar-icon);
  }

  .avatar .emoji-icon {
    font-size: calc(var(--fi-avatar-icon) - 2px);
    line-height: 1;
  }

  .avatar.warn {
    background: color-mix(in srgb, var(--fi-warn) 16%, transparent);
    color: var(--fi-warn);
  }

  .avatar.danger {
    background: color-mix(in srgb, var(--fi-danger) 15%, transparent);
    color: var(--fi-danger);
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 16px;
  }

  .field label {
    font-size: 13px;
    font-weight: 600;
    color: var(--fi-secondary);
  }

  .field label .opt {
    font-weight: 400;
    opacity: 0.8;
  }

  .field input,
  .field select,
  .field textarea {
    font: inherit;
    color: var(--fi-text);
    background: var(--card-background-color, #fff);
    border: 1px solid var(--fi-divider);
    border-radius: 10px;
    min-height: 48px;
    padding: 10px 14px;
    width: 100%;
  }

  .field input:focus,
  .field select:focus,
  .field textarea:focus {
    outline: 2px solid var(--fi-accent);
    outline-offset: -1px;
  }

  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .chip {
    min-height: 40px;
    padding: 8px 16px;
    border-radius: 20px;
    background: var(--fi-chip-bg);
    color: var(--fi-text);
    font-size: 14px;
    font-weight: 500;
    white-space: nowrap;
  }

  .chip.active {
    background: color-mix(in srgb, var(--fi-accent) 16%, transparent);
    color: var(--fi-accent);
    font-weight: 700;
  }

  .error-banner {
    background: color-mix(in srgb, var(--fi-danger) 12%, transparent);
    color: var(--fi-danger);
    border-radius: 10px;
    padding: 10px 14px;
    margin-bottom: 12px;
    font-size: 14px;
  }

  .view-title {
    font-size: 20px;
    font-weight: 700;
    margin: 0 0 16px;
  }

  .row-of-buttons {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  @media (max-width: 450px) {
    :host {
      --fi-row-height: 60px;
    }
  }
`;
