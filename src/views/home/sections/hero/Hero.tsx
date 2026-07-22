import { FC } from 'react'
import { nbp } from '@/shared/lib/typography'
import { Button } from '@ui/button'
import { Icon, IconName } from '@ui/icon'

import { CtaButton } from '@/components/cta/CtaButton'

import styles from './Hero.module.scss'

// Ordered by increasing amount of text (shortest first)
const tags: { icon: IconName; label: string }[] = [
  { icon: 'kid', label: 'от 4 лет' },
  { icon: 'coins', label: 'от 1000 ₽' },
  { icon: 'stock', label: '7 м максимальная высота' },
  { icon: 'forest', label: '348 м протяженность трасс' },
  { icon: 'helmet', label: 'сопровождение инструктором' }
]

const Hero: FC = () => {
  return (
    <section className={styles.root}>
      <div className={styles.card}>
        <div className={styles.inner}>
          <div className={styles.left}>
            <h1 className={styles.title}>
              {nbp('Верёвочный парк «Чайка» для всей семьи в Королёве')}
            </h1>
            <div className={styles.buttons}>
              <CtaButton modal="booking">Забронировать онлайн</CtaButton>
              <Button as="a" href="#tracks" variant="light">
                Посмотреть трассы
              </Button>
            </div>
          </div>

          <div className={styles.tags}>
            <div className={styles.tagRow}>
              {tags.slice(0, 2).map((tag) => (
                <span key={tag.label} className={styles.tag}>
                  <Icon name={tag.icon} />
                  {nbp(tag.label)}
                </span>
              ))}
            </div>
            <div className={styles.tagRow}>
              {tags.slice(2).map((tag) => (
                <span key={tag.label} className={styles.tag}>
                  <Icon name={tag.icon} />
                  {nbp(tag.label)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
