'use client'

import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react'

/**
 * Invisible Yandex SmartCaptcha.
 *
 * Renders a hidden widget and exposes an imperative `execute()` that resolves
 * with a validation token (the challenge modal appears only when Yandex deems
 * the request suspicious, so the form layout is never affected).
 *
 * The script (~0.9 MB) is NOT loaded with the page: it starts loading when the
 * form is opened (`loadOn="mount"`, modals) or first focused / touched
 * (`loadOn="focus"`, inline form). `execute()` waits for the load, so a fast
 * submit never goes out without a token.
 *
 * Without `NEXT_PUBLIC_SMARTCAPTCHA_SITE_KEY` the component is a no-op and
 * `execute()` resolves with an empty string, so forms keep working in dev / until
 * keys are configured. The server (`/api/lead`) then skips validation to match.
 */

const SITE_KEY = process.env.NEXT_PUBLIC_SMARTCAPTCHA_SITE_KEY
const LOAD_TIMEOUT = 10_000
const SCRIPT_SRC =
  'https://smartcaptcha.yandexcloud.net/captcha.js?render=onload'

export type SmartCaptchaHandle = {
  /** Runs the captcha and resolves with a token (empty string when disabled). */
  execute: () => Promise<string>
}

type SmartCaptchaApi = {
  render: (
    container: HTMLElement,
    params: {
      sitekey: string
      invisible?: boolean
      hideShield?: boolean
      callback?: (token: string) => void
      'error-callback'?: () => void
    }
  ) => number
  execute: (widgetId: number) => void
  reset: (widgetId: number) => void
}

type SmartCaptchaProps = {
  /** When to load the script: on mount (modal opened) or on first form focus. */
  loadOn?: 'mount' | 'focus'
}

declare global {
  interface Window {
    smartCaptcha?: SmartCaptchaApi
    __smartCaptchaOnload?: () => void
  }
}

/** Load the SmartCaptcha script once and resolve when window.smartCaptcha is ready. */
function loadScript(): Promise<SmartCaptchaApi> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') return reject(new Error('no window'))
    if (window.smartCaptcha) return resolve(window.smartCaptcha)

    const finish = () => {
      if (window.smartCaptcha) resolve(window.smartCaptcha)
      else reject(new Error('smartCaptcha unavailable'))
    }

    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${SCRIPT_SRC}"]`
    )
    if (existing) {
      if (window.smartCaptcha) resolve(window.smartCaptcha)
      else existing.addEventListener('load', finish, { once: true })
      return
    }

    const script = document.createElement('script')
    script.src = SCRIPT_SRC
    script.defer = true
    script.addEventListener('load', finish, { once: true })
    script.addEventListener('error', () => reject(new Error('script error')), {
      once: true
    })
    document.head.appendChild(script)
  })
}

export const SmartCaptcha = forwardRef<SmartCaptchaHandle, SmartCaptchaProps>(
  ({ loadOn = 'focus' }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const widgetId = useRef<number | null>(null)
    const apiRef = useRef<SmartCaptchaApi | null>(null)
    const initRef = useRef<Promise<boolean> | null>(null)
    const unmounted = useRef(false)
    const pending = useRef<{
      resolve: (t: string) => void
      reject: (e: Error) => void
    } | null>(null)

    /** Load the script and render the widget once; resolves `true` when usable. */
    const init = useCallback((): Promise<boolean> => {
      if (!SITE_KEY) return Promise.resolve(false)
      if (initRef.current) return initRef.current

      initRef.current = loadScript()
        .then((api) => {
          if (unmounted.current || !containerRef.current) return false
          apiRef.current = api
          widgetId.current = api.render(containerRef.current, {
            sitekey: SITE_KEY,
            invisible: true,
            hideShield: true,
            callback: (token) => {
              pending.current?.resolve(token)
              pending.current = null
              if (widgetId.current !== null) api.reset(widgetId.current)
            },
            'error-callback': () => {
              pending.current?.reject(new Error('captcha error'))
              pending.current = null
              if (widgetId.current !== null) api.reset(widgetId.current)
            }
          })
          return true
        })
        // Failed to load — execute() falls back to resolving empty.
        .catch(() => false)

      return initRef.current
    }, [])

    useEffect(() => {
      unmounted.current = false
      if (!SITE_KEY) return

      if (loadOn === 'mount') {
        init()
        return () => {
          unmounted.current = true
        }
      }

      const form = containerRef.current?.closest('form')
      const start = () => {
        init()
        events.forEach((e) => form?.removeEventListener(e, start))
      }
      const events = ['focusin', 'pointerdown', 'touchstart'] as const
      events.forEach((e) =>
        form?.addEventListener(e, start, { passive: true })
      )

      return () => {
        unmounted.current = true
        events.forEach((e) => form?.removeEventListener(e, start))
      }
    }, [init, loadOn])

    useImperativeHandle(
      ref,
      () => ({
        execute: async () => {
          // Disabled or failed to load — behave as a no-op so the form submits.
          const ok = await Promise.race([
            init(),
            // Script stuck on a slow network — don't hang the submit forever.
            new Promise<boolean>((r) => setTimeout(() => r(false), LOAD_TIMEOUT))
          ])
          if (!ok || apiRef.current === null || widgetId.current === null) {
            return ''
          }
          const api = apiRef.current
          const id = widgetId.current
          return new Promise<string>((resolve, reject) => {
            pending.current = { resolve, reject }
            api.execute(id)
          })
        }
      }),
      [init]
    )

    if (!SITE_KEY) return null
    return <div ref={containerRef} aria-hidden />
  }
)

SmartCaptcha.displayName = 'SmartCaptcha'
