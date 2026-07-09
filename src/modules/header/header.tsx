'use client'

import { FC, useState } from 'react'
import classNames from 'classnames'
import { Glyph } from '@ui/glyph'
import { Logo } from '@ui/logo'
import { GOALS, ymGoal } from '@/shared/lib/metrika'
import { CONTACTS } from '@/shared/const/contacts'

import styles from './header.module.scss'

const navLinks = [
  { href: '/#tracks', label: 'Трассы и цены' },
  { href: '/#safety', label: 'Безопасность' },
  { href: '/#party', label: 'Мероприятия' }
]

const Header: FC = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className={styles.root}>
      <div className={styles.inner}>
        <nav className={styles.nav}>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className={styles.navLink}>
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="/"
          className={styles.logoLink}
          aria-label="Чайка — верёвочный парк"
        >
          <Logo width={85} />
        </a>

        <div className={styles.right}>
          <a
            className={styles.routeLink}
            href={CONTACTS.maps}
            target="_blank"
            rel="noreferrer"
          >
            <Glyph name="map-pin" className={styles.glyph} />
            <span className={styles.routeText}>Построить маршрут</span>
          </a>

          <div className={styles.contacts}>
            <a
              href={CONTACTS.telegram}
              target="_blank"
              rel="noreferrer"
              aria-label="Telegram"
              onClick={() => ymGoal(GOALS.clickTelegram, { place: 'header' })}
            >
              <Glyph name="telegram" className={styles.glyph} />
            </a>
            <a
              href={CONTACTS.phoneHref}
              aria-label="Позвонить"
              onClick={() => ymGoal(GOALS.clickPhone, { place: 'header' })}
            >
              <Glyph name="phone" className={styles.glyph} />
            </a>
            <a
              href={CONTACTS.vk}
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
            <a
              key={link.href}
              href={link.href}
              className={styles.mobileLink}
              onClick={closeMenu}
            >
              {link.label}
            </a>
          ))}
          <a
            href={CONTACTS.maps}
            target="_blank"
            rel="noreferrer"
            className={styles.mobileRoute}
            onClick={closeMenu}
          >
            <Glyph name="map-pin" className={styles.glyph} />
            Построить маршрут
          </a>
        </nav>
      )}
    </header>
  )
}

export default Header
