import { FC } from 'react'
import { Button } from '@ui/button'

import styles from './not-found.module.scss'

const NotFound: FC = () => (
  <main className={styles.root}>
    <div className={styles.inner}>
      <div className={styles.code}>#404</div>
      <p className={styles.text}>Данная страница недоступна.</p>
      <Button as="a" href="/" variant="orange">
        Вернуться на главную
      </Button>
    </div>
    <div className={styles.stripes} aria-hidden="true" />
  </main>
)

export default NotFound
