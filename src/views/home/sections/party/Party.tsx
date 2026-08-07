import { FC } from 'react'
import { type SiteContent } from '@/shared/content'
import { nbp } from '@/shared/lib/typography'
import { Icon } from '@ui/icon'

import { CtaButton } from '@/components/cta/CtaButton'

import styles from './Party.module.scss'

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

const Party: FC<{ data: SiteContent['party'] }> = ({ data }) => {
  return (
    <section className={styles.root} id="party">
      <div className={styles.wrap}>
        <div className={styles.left}>
          <h2 className={styles.title}>{nbp(data.title)}</h2>

          <div className={styles.tags}>
            {data.pills.map((pill) => (
              <span key={pill.label} className={styles.tag}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={pill.icon} alt="" className={styles.tagIcon} />
                {nbp(pill.label)}
              </span>
            ))}
          </div>

          <div className={styles.card}>
            <ul className={styles.list}>
              {data.list.map((item) => (
                <li key={item}>
                  <CheckBadge />
                  <span>{nbp(item)}</span>
                </li>
              ))}
            </ul>
            <span className={styles.price}>
              <Icon name="coins" />
              {nbp(data.price)}
            </span>
          </div>

          <CtaButton modal="event" block>
            {data.cta}
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
