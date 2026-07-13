import { FC } from 'react'
import { Glyph } from '@ui/glyph'
import { Logo } from '@ui/logo'
import { TrackedLink } from '@/components/analytics/TrackedLink'
import { YandexMap } from '@/components/widgets/YandexMap'
import { GOALS } from '@/shared/lib/metrika'
import { CONTACTS } from '@/shared/const/contacts'
import { nbp } from '@/shared/lib/typography'

import styles from './footer.module.scss'

const navLinks = [
  { href: '/#tracks', label: 'Трассы и цены' },
  { href: '/#safety', label: 'Безопасность' },
  { href: '/#party', label: 'Мероприятия' }
]

const legalLinks = [
  { href: '/rules', label: 'Правила посещения верёвочного парка «Чайка»' },
  {
    href: '/privacy',
    label:
      'Политика обработки персональных данных и\u00A0Пользовательское соглашение'
  }
]

const Footer: FC = () => {
  return (
    <footer className={styles.root}>
      <div className={styles.wrap}>
        <div className={styles.leftCol}>
          <div className={styles.left}>
            <nav className={styles.nav}>
              {navLinks.map((link) => (
                <a key={link.href} href={link.href}>
                  {nbp(link.label)}
                </a>
              ))}
            </nav>

            <div className={styles.links}>
              {legalLinks.map((link) => (
                <a key={link.label} href={link.href}>
                  {nbp(link.label)}
                </a>
              ))}
            </div>
          </div>

          <div className={styles.legal}>
            <span className={styles.legalName}>ИП АРХИПОВ ДЕНИС АНДРЕЕВИЧ</span>
            <span className={styles.legalReq}>
              {`ИНН: 773390244425
ОГРНИП: 324774600195600
Расчётный счёт: 40802810938000409599
Банк: ПАО Сбербанк
БИК банка: 044525225
Корсчёт: 30101810400000000225
ИНН банка: 7707083893
КПП банка: 773643001`}
            </span>
          </div>
        </div>

        <a href="/" className={styles.logoLink} aria-label="Чайка — верёвочный парк">
          <Logo width={85} />
        </a>

        <div className={styles.right}>
          <div className={styles.mapBlock}>
            <YandexMap />
          </div>

          <div className={styles.info}>
            <TrackedLink
              href={CONTACTS.vk}
              target="_blank"
              rel="noreferrer"
              className={styles.infoRow}
              goal={GOALS.clickVk}
              goalParams={{ place: 'footer' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icons/icon-vk.svg" alt="" className={styles.vkIcon} />
              <span>
                {nbp('Актуальные новости в ')}
                <span className={styles.underline}>{nbp('нашей группе в ВК')}</span>
              </span>
            </TrackedLink>

            <div className={styles.infoRow}>
              <Glyph name="clock" className={styles.infoGlyph} />
              <span>
                {nbp('Июнь–август: с 11:00 до 19:00')}
                <br />
                <span className={styles.muted}>
                  {nbp(
                    'В мае и сентябре график может меняться. Позвоните нам для получения точной информации'
                  )}
                </span>
              </span>
            </div>

            <div className={styles.infoRow}>
              <Glyph name="map-pin" className={styles.infoGlyph} />
              <span>
                Королёв, ул. К. Д. Трофимова, ½ (справа от&nbsp;стадиона «Чайка»)
              </span>
            </div>
          </div>

          <div className={styles.buttons}>
            <TrackedLink
              className={styles.contactBtn}
              href={CONTACTS.phoneHref}
              goal={GOALS.clickPhone}
              goalParams={{ place: 'footer' }}
            >
              <Glyph name="phone" />
              Позвонить
            </TrackedLink>
            <TrackedLink
              className={styles.contactBtn}
              href={CONTACTS.telegram}
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
