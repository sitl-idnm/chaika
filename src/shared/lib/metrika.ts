/**
 * Yandex.Metrika integration — counter id, consent-gated init, typed
 * `reachGoal` wrapper. `<YandexMetrika/>` (components/analytics) decides when
 * to call `initMetrika()`: only after «Принять» in the cookie banner.
 */

export const YM_ID = Number(process.env.NEXT_PUBLIC_YM_ID) || 0

/** All conversion goals fired from the UI. Keep in sync with Метрика dashboard. */
export const GOALS = {
  // modal opens
  openBooking: 'open_booking_modal',
  openEvent: 'open_event_modal',
  // successful form submits
  submitBooking: 'submit_booking',
  submitEvent: 'submit_event',
  submitSafety: 'submit_safety',
  // failed submit (network / server)
  submitError: 'submit_error',
  // contact clicks
  clickPhone: 'click_phone',
  clickTelegram: 'click_telegram',
  clickVk: 'click_vk',
  // misc interactions
  cookieAccept: 'cookie_accept'
} as const

export type Goal = (typeof GOALS)[keyof typeof GOALS]

declare global {
  interface Window {
    ym?: ((id: number, action: string, ...args: unknown[]) => void) & {
      a?: unknown[]
      l?: number
    }
  }
}

/* ---------------- Cookie consent ---------------- */

/** localStorage flag set by the cookie banner on «Принять». */
export const CONSENT_KEY = 'chaika-cookie-accepted'
/** Window event fired right after consent is stored. */
export const CONSENT_EVENT = 'chaika:cookie-consent'

export function hasConsent(): boolean {
  try {
    return localStorage.getItem(CONSENT_KEY) === '1'
  } catch {
    return false
  }
}

export function giveConsent(): void {
  try {
    localStorage.setItem(CONSENT_KEY, '1')
  } catch {
    // private mode / storage disabled — consent lives for this page only
  }
  window.dispatchEvent(new Event(CONSENT_EVENT))
}

/* ---------------- Landing (for attribution) ---------------- */

export type Landing = { url: string; referrer: string }

const LANDING_KEY = 'chaika-landing'

/**
 * Remember the URL + referrer the visitor landed with (first page of the tab
 * session). Until consent the counter is not running, and in-page anchor
 * navigation strips `?utm_…`/`yclid` from the URL — so when consent comes later
 * the first hit is sent for the landing URL, keeping source attribution.
 * Stays in sessionStorage, is never sent anywhere before consent.
 */
export function rememberLanding(): Landing {
  const current = { url: window.location.href, referrer: document.referrer }
  try {
    const saved = sessionStorage.getItem(LANDING_KEY)
    if (saved) return JSON.parse(saved) as Landing
    sessionStorage.setItem(LANDING_KEY, JSON.stringify(current))
  } catch {
    // ignore — fall back to the current page
  }
  return current
}

/* ---------------- Counter ---------------- */

const TAG_SRC = 'https://mc.yandex.ru/metrika/tag.js'

const INIT_OPTIONS = {
  clickmap: true,
  trackLinks: true,
  accurateTrackBounce: true,
  webvisor: true
}

/**
 * Load tag.js and init the counter (standard Метрика snippet, as code).
 * - `landing` omitted: consent was given on an earlier visit — plain init,
 *   Метрика sends the page hit itself (same as before consent gating).
 * - `landing` given: consent was just given on this page — init with
 *   `defer: true` and send the first hit for the landing URL + referrer.
 */
export function initMetrika(landing?: Landing): void {
  if (typeof window === 'undefined' || !YM_ID || window.ym) return

  const ym: NonNullable<Window['ym']> = function (...args: unknown[]) {
    ;(ym.a = ym.a || []).push(args)
  }
  ym.l = Date.now()
  window.ym = ym

  if (!document.querySelector(`script[src="${TAG_SRC}"]`)) {
    const script = document.createElement('script')
    script.async = true
    script.src = TAG_SRC
    document.head.appendChild(script)
  }

  if (!landing) {
    ym(YM_ID, 'init', INIT_OPTIONS)
    return
  }

  ym(YM_ID, 'init', { ...INIT_OPTIONS, defer: true })
  ym(YM_ID, 'hit', landing.url, {
    referer: landing.referrer || undefined,
    title: document.title
  })
}

/** Fire a Метрика goal. No-op on the server or before the counter is ready. */
export function ymGoal(
  target: Goal | string,
  params?: Record<string, unknown>
) {
  if (
    typeof window === 'undefined' ||
    typeof window.ym !== 'function' ||
    !YM_ID
  ) {
    return
  }
  window.ym(YM_ID, 'reachGoal', target, params)
}
