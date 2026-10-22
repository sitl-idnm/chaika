import { FC } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@ui/button'

import styles from './not-found.module.scss'

export const metadata: Metadata = {
  title: 'Страница не найдена — Верёвочный парк «Чайка»',
  robots: { index: false }
}

const NotFound: FC = () => (
  <main className={styles.root}>
    <div className={styles.inner}>
      <div className={styles.text}>
        <h1 className={styles.code}>#404</h1>
        <p className={styles.subtitle}>Данная страница недоступна.</p>
      </div>
      <Button as={Link} href="/" variant="orange" className={styles.button}>
        Вернуться на главную
      </Button>
    </div>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src="/icons/error-stripes.svg"
      alt=""
      className={styles.stripes}
      aria-hidden="true"
    />
  </main>
)

export default NotFound
