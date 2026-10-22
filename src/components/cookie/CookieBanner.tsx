'use client'

import { FC, useEffect, useState } from 'react'
import Link from 'next/link'
import {
  giveConsent,
  GOALS,
  hasConsent,
  ymGoal
} from '@/shared/lib/metrika'
import { nbp } from '@/shared/lib/typography'
import { Button } from '@ui/button'

import styles from './cookie.module.scss'

export const CookieBanner: FC = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!hasConsent()) setVisible(true)
  }, [])

  const accept = () => {
    // Метрика стартует только здесь (см. YandexMetrika) — цель уже в очередь ym
    giveConsent()
    ymGoal(GOALS.cookieAccept)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className={styles.root} role="dialog" aria-label="Cookie">
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
  )
}
