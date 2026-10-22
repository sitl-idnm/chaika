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
 * paints ~3 s late on mobile and becomes the LCP element.
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
            'Мы используем файлы cookie, чтобы вам было удобнее пользоваться нашим сайтом. Продолжая просмотр, вы соглашаетесь на их использование. Подробнее — в '
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
