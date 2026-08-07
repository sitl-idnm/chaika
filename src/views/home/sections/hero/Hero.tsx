import { FC } from 'react'
import { type SiteContent } from '@/shared/content'
import { nbp } from '@/shared/lib/typography'
import { Button } from '@ui/button'
import { Icon, IconName } from '@ui/icon'

import { CtaButton } from '@/components/cta/CtaButton'

import styles from './Hero.module.scss'

const Hero: FC<{ data: SiteContent['hero'] }> = ({ data }) => {
  const tags = data.tags
  return (
    <section className={styles.root}>
      <div className={styles.card}>
        <div className={styles.inner}>
          <div className={styles.left}>
            <h1 className={styles.title}>{nbp(data.title)}</h1>
            <div className={styles.buttons}>
              <CtaButton modal="booking">{data.btnBook}</CtaButton>
              <Button as="a" href="#tracks" variant="light">
                {data.btnTracks}
              </Button>
            </div>
          </div>

          <div className={styles.tags}>
            <div className={styles.tagRow}>
              {tags.slice(0, 2).map((tag) => (
                <span key={tag.label} className={styles.tag}>
                  <Icon name={tag.icon as IconName} />
                  {nbp(tag.label)}
                </span>
              ))}
            </div>
            <div className={styles.tagRow}>
              {tags.slice(2).map((tag) => (
                <span key={tag.label} className={styles.tag}>
                  <Icon name={tag.icon as IconName} />
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
