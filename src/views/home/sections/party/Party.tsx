import { FC } from 'react'
import { Icon } from '@ui/icon'
import { CtaButton } from '@/components/cta/CtaButton'
import { nbp } from '@/shared/lib/typography'

import styles from './Party.module.scss'

const pills = [
  { icon: '/icons/icon-gift.svg', label: 'День рождения' },
  { icon: '/icons/icon-confetti.svg', label: 'Выпускной' },
  { icon: '/icons/icon-cheers.svg', label: 'Корпоратив' }
]

const listItems = [
  'от 4 часов активностей',
  'Верёвочный парк + лазертаг + безлимитный батут',
  'Часовая программа на выбор: квест, лазертаг, различные мастер классы и много других интересных активностей',
  'Фото и видеосъемка',
  'Быстрое согласование дат и программ'
]

const CheckBadge: FC = () => (
  <svg
    className={styles.check}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="12" fill="var(--orange-main)" />
    <path
      d="M6.8 12.4 10.4 16 17.2 8.6"
      fill="none"
      stroke="#fff"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const Party: FC = () => {
  return (
    <section className={styles.root} id="party">
      <div className={styles.wrap}>
        <div className={styles.left}>
          <h2 className={styles.title}>
            {nbp('Устройте незабываемый праздник под ключ')}
          </h2>

          <div className={styles.tags}>
            {pills.map((pill) => (
              <span key={pill.label} className={styles.tag}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={pill.icon} alt="" className={styles.tagIcon} />
                {nbp(pill.label)}
              </span>
            ))}
          </div>

          <div className={styles.card}>
            <ul className={styles.list}>
              {listItems.map((item) => (
                <li key={item}>
                  <CheckBadge />
                  <span>{nbp(item)}</span>
                </li>
              ))}
            </ul>
            <span className={styles.price}>
              <Icon name="coins" />
              {nbp('от 2400 ₽ за человека. родители — бесплатно')}
            </span>
          </div>

          <CtaButton modal="event" block>
            Оставить заявку
          </CtaButton>
        </div>

        <div className={styles.photo}>
          <div className={styles.ring} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/kids.png"
            alt="Дети в парке Чайка"
            className={styles.photoImg}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/icons/rope-horizontal.svg"
            alt=""
            className={styles.ropeFeet}
          />
        </div>
      </div>
    </section>
  )
}

export default Party
