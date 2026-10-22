'use client'

import { FC, useEffect } from 'react'
import {
  CONSENT_EVENT,
  hasConsent,
  initMetrika,
  rememberLanding,
  YM_ID
} from '@/shared/lib/metrika'

/**
 * Yandex.Metrika counter (id from NEXT_PUBLIC_YM_ID), started ONLY after
 * consent in the cookie banner: no tag.js, no hits, no cookies before
 * «Принять». Consent from an earlier visit → init right away.
 *
 * No `<noscript>` pixel: without JS the banner can't be accepted, so a no-JS
 * hit would be tracking without consent. (It was also the source of the stray
 * attribution-less hit fixed in aac16ba.)
 *
 * Renders nothing; does nothing when the id is missing (local/dev builds).
 */
export const YandexMetrika: FC = () => {
  useEffect(() => {
    if (!YM_ID) return
    if (hasConsent()) {
      initMetrika()
      return
    }

    const landing = rememberLanding()
    const onConsent = () => initMetrika(landing)
    window.addEventListener(CONSENT_EVENT, onConsent, { once: true })
    return () => window.removeEventListener(CONSENT_EVENT, onConsent)
  }, [])

  return null
}
