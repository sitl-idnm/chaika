import { CSSProperties, FC } from 'react'
import heroDesktop from '@public/images/hero-desktop.jpg'
import heroMobile from '@public/images/hero-mobile.jpg'
import heroTablet from '@public/images/hero-tablet.jpg'
import { type SiteContent } from '@/shared/content'
import { nbp } from '@/shared/lib/typography'
import { Button } from '@ui/button'
import { Icon, IconName } from '@ui/icon'

import { CtaButton } from '@/components/cta/CtaButton'

import styles from './Hero.module.scss'

// Брейкпоинты как в mixins (tablet ≤900, mobile ≤560)
const HERO_IMAGES = [
  { src: heroDesktop.src, media: '(min-width: 901px)' },
  { src: heroTablet.src, media: '(min-width: 561px) and (max-width: 900px)' },
  { src: heroMobile.src, media: '(max-width: 560px)' }
]

const heroBg = {
  '--hero-desktop': `url(${heroDesktop.src})`,
  '--hero-tablet': `url(${heroTablet.src})`,
  '--hero-mobile': `url(${heroMobile.src})`
} as CSSProperties

const Hero: FC<{ data: SiteContent['hero'] }> = ({ data }) => {
  const tags = data.tags
  return (
    <section className={styles.root}>
      {/* Фон Hero — LCP-элемент: preload только картинки своего брейкпоинта */}
      {HERO_IMAGES.map((img) => (
        <link
          key={img.src}
          rel="preload"
          as="image"
          href={img.src}
          media={img.media}
          fetchPriority="high"
        />
      ))}
      <div className={styles.card} style={heroBg}>
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
