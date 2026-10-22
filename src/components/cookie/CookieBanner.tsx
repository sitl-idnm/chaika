'use client'

import { FC, useEffect, useState } from 'react'
import Link from 'next/link'
import {
  CONSENT_KEY,
  giveConsent,
  GOALS,
  hasConsent,
  ymGoal
} from '@/shared/lib/metrika'
import { nbp } from '@/shared/lib/typography'
import { Button } from '@ui/button'

import styles from './cookie.module.scss'

/**
 * Runs while the HTML is parsed, before the banner markup: with earlier
 * consent marks <html data-consent> so CSS hides the banner without a flash.
 */
const HIDE_IF_CONSENTED = `try{if(localStorage.getItem(${JSON.stringify(
  CONSENT_KEY
)})==='1')document.documentElement.dataset.consent='1'}catch(e){}`

/**
 * Rendered on the server (not after hydration): otherwise the banner text
 * paints ~3 s late on mobile. Text is short and small on mobile so the banner
 * is never the LCP element (it was, at 4,4 s): LCP stays on the hero.
 */
export const CookieBanner: FC = () => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (hasConsent()) setVisible(false)
  }, [])

  const accept = () => {
    // Метрика стартует только здесь (см. YandexMetrika) — цель уже в очередь ym
    giveConsent()
    ymGoal(GOALS.cookieAccept)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: HIDE_IF_CONSENTED }} />
      <div
        className={styles.root}
        role="dialog"
        aria-label="Cookie"
        data-cookie-banner
      >
        <p className={styles.text}>
          {nbp(
            'Мы используем cookie: Метрика и виджеты Яндекса включаются только после «Принять». Подробнее — в '
          )}
          <Link href="/privacy">Политике обработки персональных данных</Link>
        </p>
        <Button variant="orange" onClick={accept}>
          Принять
        </Button>
      </div>
    </>
  )
}
