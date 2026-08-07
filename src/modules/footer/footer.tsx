import Link from 'next/link'
import { getSiteContent } from '@/shared/content'
import { GOALS } from '@/shared/lib/metrika'
import { nbp } from '@/shared/lib/typography'
import { Glyph } from '@ui/glyph'
import { Logo } from '@ui/logo'

import { TrackedLink } from '@/components/analytics/TrackedLink'
import { YandexMap } from '@/components/widgets/YandexMap'

import styles from './footer.module.scss'

const Footer = async () => {
  const { header, footer, contacts } = await getSiteContent()

  return (
    <footer className={styles.root}>
      <div className={styles.wrap}>
        <div className={styles.leftCol}>
          <div className={styles.left}>
            <nav className={styles.nav}>
              {header.nav.map((link) => (
                <Link key={link.href} href={link.href}>
                  {nbp(link.label)}
                </Link>
              ))}
            </nav>

            <div className={styles.links}>
              {footer.legalLinks.map((link) => (
                <Link key={link.label} href={link.href}>
                  {nbp(link.label)}
                </Link>
              ))}
            </div>
          </div>

          <div className={styles.legal}>
            <span className={styles.legalName}>{footer.legalName}</span>
            <span className={styles.legalReq}>{footer.legalReq}</span>
          </div>
        </div>

        <Link
          href="/"
          className={styles.logoLink}
          aria-label="Чайка — верёвочный парк"
        >
          <Logo width={85} />
        </Link>

        <div className={styles.right}>
          <div className={styles.mapBlock}>
            <YandexMap />
          </div>

          <div className={styles.info}>
            <TrackedLink
              href={contacts.vk}
              target="_blank"
              rel="noreferrer"
              className={styles.infoRow}
              goal={GOALS.clickVk}
              goalParams={{ place: 'footer' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icons/icon-vk.svg" alt="" className={styles.vkIcon} />
              <span>
                {nbp(footer.vkPrefix)}
                <span className={styles.underline}>{nbp(footer.vkAccent)}</span>
              </span>
            </TrackedLink>

            <div className={styles.infoRow}>
              <Glyph name="clock" className={styles.infoGlyph} />
              <span>
                {nbp(contacts.hours)}
                <br />
                <span className={styles.muted}>{nbp(contacts.hoursNote)}</span>
              </span>
            </div>

            <div className={styles.infoRow}>
              <Glyph name="map-pin" className={styles.infoGlyph} />
              <span>{nbp(contacts.address)}</span>
            </div>
          </div>

          <div className={styles.buttons}>
            <TrackedLink
              className={styles.contactBtn}
              href={contacts.phoneHref}
              goal={GOALS.clickPhone}
              goalParams={{ place: 'footer' }}
            >
              <Glyph name="phone" />
              Позвонить
            </TrackedLink>
            <TrackedLink
              className={styles.contactBtn}
              href={contacts.telegram}
              target="_blank"
              rel="noreferrer"
              goal={GOALS.clickTelegram}
              goalParams={{ place: 'footer' }}
            >
              <Glyph name="telegram" />
              Написать в телеграм
            </TrackedLink>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
