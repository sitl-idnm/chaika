'use client'

import { FC, useState } from 'react'
import Link from 'next/link'
import { type SiteContent } from '@/shared/content/defaults'
import { GOALS, ymGoal } from '@/shared/lib/metrika'
import { nbp } from '@/shared/lib/typography'
import { Glyph } from '@ui/glyph'
import { Logo } from '@ui/logo'
import classNames from 'classnames'

import styles from './header.module.scss'

type HeaderProps = {
  header: SiteContent['header']
  contacts: SiteContent['contacts']
}

const Header: FC<HeaderProps> = ({ header, contacts }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const navLinks = header.nav

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className={styles.root}>
      <div className={styles.inner}>
        <nav className={styles.nav}>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={styles.navLink}>
              {nbp(link.label)}
            </Link>
          ))}
        </nav>

        <Link
          href="/"
          className={styles.logoLink}
          aria-label="Чайка — верёвочный парк"
        >
          <Logo width={85} />
        </Link>

        <div className={styles.right}>
          <a
            className={styles.routeLink}
            href={contacts.maps}
            target="_blank"
            rel="noreferrer"
            aria-label={`${header.routeText} — Яндекс Карты`}
          >
            <Glyph name="map-pin" className={styles.glyph} />
            <span className={styles.routeText}>{header.routeText}</span>
          </a>

          <div className={styles.contacts}>
            <a
              href={contacts.telegram}
              target="_blank"
              rel="noreferrer"
              aria-label="Telegram"
              onClick={() => ymGoal(GOALS.clickTelegram, { place: 'header' })}
            >
              <Glyph name="telegram" className={styles.glyph} />
            </a>
            <a
              href={contacts.phoneHref}
              aria-label="Позвонить"
              onClick={() => ymGoal(GOALS.clickPhone, { place: 'header' })}
            >
              <Glyph name="phone" className={styles.glyph} />
            </a>
            <a
              href={contacts.vk}
              target="_blank"
              rel="noreferrer"
              aria-label="ВКонтакте"
              className={styles.vkLink}
              onClick={() => ymGoal(GOALS.clickVk, { place: 'header' })}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icons/icon-vk.svg" alt="" className={styles.vkIcon} />
            </a>
          </div>

          <button
            className={classNames(styles.burger, {
              [styles.burgerOpen]: menuOpen
            })}
            aria-label="Меню"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className={styles.mobileMenu}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={styles.mobileLink}
              onClick={closeMenu}
            >
              {nbp(link.label)}
            </Link>
          ))}
          <a
            href={contacts.maps}
            target="_blank"
            rel="noreferrer"
            className={styles.mobileRoute}
            onClick={closeMenu}
          >
            <Glyph name="map-pin" className={styles.glyph} />
            {header.routeText}
          </a>
        </nav>
      )}
    </header>
  )
}

export default Header
