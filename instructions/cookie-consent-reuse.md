# Cookie consent bundle — reuse on another website

This document describes the **self-contained cookie consent** used on prestige-cabinet.com: Google **Consent Mode v2** defaults in the `<head>`, a **`<dialog>`** banner, **localStorage** persistence, and **gtag** updates when the user accepts or declines.

It is **not legal advice**. Align copy and behaviour with your counsel and applicable laws (e.g. GDPR, ePrivacy, U.S. state privacy laws).

---

## What you copy

From this repository’s `public/` folder:

| File | Role |
|------|------|
| `cookie-consent-init.js` | Runs **synchronously** in `<head>`: reads `localStorage`, sets Consent Mode **defaults** before tags load, defines globals for the UI script. |
| `cookie-consent-ui.js` | Runs on **DOMContentLoaded**: wires Accept / Decline, persists choice, pushes **consent update** + custom `dataLayer` event, opens the dialog if needed. |
| `cookie-consent.css` | Styles the `<dialog>` bottom sheet (uses CSS variables with fallbacks). |

Minified pairs (optional): `cookie-consent-init.min.js`, `cookie-consent-ui.min.js`, `cookie-consent.min.css` — same behaviour, smaller transfer.

---

## Load order (critical)

1. **`cookie-consent-init.js` — first executable in `<head>`**, before **Google Tag Manager** (or any `gtag.js` / tags that read Consent Mode).
2. **GTM snippet** (or your tag loader) **after** that init script.
3. In `<head>` or early body: **`cookie-consent.css`** (or `.min.css`).
4. Near **`</body>`**: the **HTML `<dialog>`** markup (see below), then **`cookie-consent-ui.js`** with **`defer`**.

If init runs **after** GTM, the first page view may miss correct default consent.

---

## HTML to add (before `</body>`)

Required **element IDs** (the UI script depends on them):

- `cookie-consent-dialog` — `<dialog class="cookie-consent-dialog" …>`
- `cookie-consent-title` — heading (e.g. `<h2>`)
- `cookie-consent-desc` — short description paragraph (`aria-describedby` target)
- `cookie-consent-accept` — Accept button
- `cookie-consent-decline` — Decline button

Example structure (adjust copy and **Privacy Policy** URL for your site):

```html
<dialog
  class="cookie-consent-dialog"
  id="cookie-consent-dialog"
  aria-labelledby="cookie-consent-title"
  aria-describedby="cookie-consent-desc">
  <div class="cookie-consent-shell">
    <div class="cookie-consent-grid">
      <div class="cookie-consent-copy">
        <div class="cookie-consent-badge">California privacy · Cookies</div>
        <h2 class="cookie-consent-title" id="cookie-consent-title">This website uses cookies</h2>
        <p class="cookie-consent-body" id="cookie-consent-desc">
          <!-- Your disclosure text -->
        </p>
        <p class="cookie-consent-ca">
          <!-- Optional: CCPA / region-specific supplement -->
        </p>
      </div>
      <div class="cookie-consent-aside">
        <div class="cookie-consent-actions">
          <button type="button" class="cookie-consent-btn-decline" id="cookie-consent-decline">
            Decline optional cookies
          </button>
          <button type="button" class="cookie-consent-btn-accept" id="cookie-consent-accept">Accept</button>
        </div>
        <p class="cookie-consent-links"><a href="/privacy-policy/">Privacy Policy</a></p>
      </div>
    </div>
  </div>
</dialog>

<script src="/cookie-consent-ui.min.js" defer></script>
```

Use root-relative paths (`/cookie-consent-ui.min.js`) or absolute URLs consistent with your deploy.

**Dismissal:** the UI script calls `e.preventDefault()` on the dialog **`cancel`** event so Escape does not close the banner until a choice is stored (first visit only).

---

## `<head>` snippet

```html
<script src="/cookie-consent-init.min.js"></script>
<!-- Then: GTM or gtag as you use today -->
<link rel="stylesheet" href="/cookie-consent.min.css">
```

---

## Behaviour summary

### Storage (`localStorage`)

- **Primary key:** `prestige_cookie_consent_v1` — values: `accepted` | `declined` (anything else is treated as “no decision yet”).
- **Legacy key:** `prestige_home_cookie_consent_v1` — if present and the new key is missing, the init script **migrates** the value to the new key.

For a **new** site, rename these strings in `cookie-consent-init.js` (and keep the same names in `cookie-consent-ui.js` via `window.__prestigeCookieConsentStorageKey`, which init sets — see **Rebrand checklist** below).

### Consent Mode (`gtag('consent', …)`)

Init script defines `window.gtag` as `function(){ dataLayer.push(arguments); }` if needed, then:

- **Default** (before user choice, or if not accepted): `ad_storage`, `analytics_storage`, `ad_user_data`, `ad_personalization`, `personalization_storage` → **`denied`** unless stored value is `accepted`; `functionality_storage` and `security_storage` → **`granted`**; `wait_for_update` **500** ms when not yet accepted.
- If not accepted: `ads_data_redaction` and `url_passthrough` **enabled** (Google’s recommended pattern when ads consent is denied).

On **Accept** / **Decline**, the UI script calls `gtag('consent', 'update', { … })` and pushes:

```js
dataLayer.push({
  event: 'cookie_consent_update',
  prestige_cookie_consent: 'accepted' | 'declined',
});
```

You can add **GTM triggers** on the event name `cookie_consent_update` or on the variable `prestige_cookie_consent`.

### When the dialog opens

If stored value is **neither** `accepted` **nor** `declined`, after `DOMContentLoaded` the UI runs **two** `requestAnimationFrame` ticks then `dialog.showModal()` if supported.

---

## Optional: defer other modals (Prestige pattern)

`cookie-consent-init.js` sets:

```js
window.__prestigeDeferAppointmentAutoOpen = function () {
  var el = document.getElementById('cookie-consent-dialog');
  return !!(el && el.open);
};
```

Other scripts can skip auto-opening their modal while the cookie dialog is open. On another site you can remove this or point it at your own modal guard.

---

## Styling on a different design system

`cookie-consent.css` uses optional theme variables (with hex/rgba **fallbacks**):

- `--ink`, `--surface`, `--text`, `--muted`, `--rim`, `--white`, `--gold` (and related)

Define them on `:root` or `body` **before** or **after** loading this CSS to match your brand. If you omit them, fallbacks keep the sheet usable on a neutral dark layout.

The title uses **Playfair Display** if available; you can override `.cookie-consent-title { font-family: … }` on the new site.

---

## Rebrand checklist (remove “Prestige” naming)

On a **different** property, search and replace in the **source** JS (then re-minify if you use min files):

| Location | What to change |
|----------|----------------|
| `cookie-consent-init.js` | `STORAGE_KEY_NEW`, `STORAGE_KEY_LEGACY` — use a site-specific prefix, e.g. `mysite_cookie_consent_v1`. |
| Same file | `window.__prestigeDeferAppointmentAutoOpen` → optional rename; update any consumer script. |
| Same file | `window.__prestigeCookieConsentStorageKey` / `window.__prestigeCookieConsentNeedsBanner` — rename globals if you want neutral names; then **`cookie-consent-ui.js`** must use the **same** names (it reads `window.__prestigeCookieConsentStorageKey` and `window.__prestigeCookieConsentNeedsBanner`). |
| `cookie-consent-ui.js` | `dataLayer` event field `prestige_cookie_consent` → e.g. `cookie_consent` for GTM. |

Keeping **one** shared init + UI pair avoids drift.

---

## GTM / Google Ads checklist

1. In **Google Tag Manager**, enable **Consent Overview** and tag each tag with the consent types it needs.
2. Ensure the **default** command runs **before** the container fires tags that set cookies (hence init **before** GTM in `<head>`).
3. Test with **Tag Assistant** / **Consent Mode** debug: first visit denied, after Accept granted, after Decline denied for ads/analytics-related types.

---

## Build / minify (optional)

If you edit the `.js` / `.css` sources, regenerate minified assets with your usual pipeline (e.g. terser, esbuild, cssnano). This repo ships pre-built `.min.*` files in `public/`.

---

## Quick verification

1. Clear site data or remove the `localStorage` key you use.
2. Hard reload: dialog should appear; `dataLayer` should show `consent` **default** with denied ad/analytics types (until Accept).
3. Click **Accept**: dialog closes; reload — dialog should **not** reappear; tags should see **granted** update.
4. Clear storage, reload, click **Decline**: dialog closes; subsequent loads no banner; consent remains **denied** for marketing/analytics types per your update map.

---

## Files in this repo (reference)

- `public/cookie-consent-init.js` — head bootstrap + Consent Mode defaults  
- `public/cookie-consent-ui.js` — dialog + persistence + updates  
- `public/cookie-consent.css` — presentation  
- Minified: `public/cookie-consent-init.min.js`, `public/cookie-consent-ui.min.js`, `public/cookie-consent.min.css`  

Example integration order: `public/index.html` (`<head>` init + CSS, end of body dialog + deferred UI).
