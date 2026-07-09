import { FC } from 'react'
import { Button } from '@ui/button'

import styles from './not-found.module.scss'

const NotFound: FC = () => (
  <main className={styles.root}>
    <div className={styles.inner}>
      <div className={styles.text}>
        <div className={styles.code}>#404</div>
        <p className={styles.subtitle}>Данная страница недоступна.</p>
      </div>
      <Button as="a" href="/" variant="orange" className={styles.button}>
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
