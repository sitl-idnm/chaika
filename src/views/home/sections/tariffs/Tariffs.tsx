'use client'

import { FC, useState } from 'react'
import { type SiteContent } from '@/shared/content'
import { nbp } from '@/shared/lib/typography'
import classNames from 'classnames'

import { CtaButton } from '@/components/cta/CtaButton'

import styles from './Tariffs.module.scss'

const CheckIcon: FC = () => (
  <svg width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden>
    <path
      d="M3 8.5 6.5 12 13 4.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const CaretIcon: FC = () => (
  <svg
    className={styles.caret}
    width="14"
    height="14"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden
  >
    <path
      d="M3.5 6 8 10.5 12.5 6"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

type Card = SiteContent['tariffs']['cards'][number]

const TariffCard: FC<{ card: Card; data: SiteContent['tariffs'] }> = ({
  card,
  data
}) => {
  const [open, setOpen] = useState(false)

  return (
    <div className={classNames(styles.card, { [styles.highlight]: card.highlight })}>
      <div className={styles.head}>
        <div className={styles.nameRow}>
          <span className={styles.name}>{card.name}</span>
          {card.highlight && card.badge && (
            <span className={styles.badge}>{card.badge}</span>
          )}
        </div>
        <div className={styles.priceRow}>
          <span className={styles.price}>{card.price} ₽</span>
          <span className={styles.per}>{data.perPerson}</span>
        </div>
        <span className={styles.hours}>
          {card.hours} {data.hoursSuffix}
        </span>
      </div>

      <span className={styles.divider} />

      <ul className={styles.features}>
        {card.features.map((f, i) => (
          <li key={i} className={styles.feature}>
            <span className={styles.check}>
              <CheckIcon />
            </span>
            <span>{nbp(f)}</span>
          </li>
        ))}
      </ul>

      <div className={styles.footer}>
        <button
          type="button"
          className={styles.toggle}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
        >
          <span>{data.timingLabel}</span>
          <span className={classNames(styles.caretWrap, { [styles.caretOpen]: open })}>
            <CaretIcon />
          </span>
        </button>

        <div
          className={classNames(styles.timingWrap, {
            [styles.timingOpen]: open
          })}
        >
          <div className={styles.timingInner}>
            <div className={styles.timing}>
              {card.timing.map((row, i) => (
                <div key={i} className={styles.timingRow}>
                  <span className={styles.timingTime}>{row.time}</span>
                  <span>{row.what}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <CtaButton
          modal="event"
          tariff={card.name}
          variant={card.highlight ? 'orange' : 'light'}
          bordered={!card.highlight}
          block
        >
          {data.cta}
        </CtaButton>
      </div>
    </div>
  )
}

const Tariffs: FC<{ data: SiteContent['tariffs'] }> = ({ data }) => {
  return (
    <section className={styles.root} id="tariffs">
      <div className={styles.wrap}>
        <div className={styles.intro}>
          <h2 className={styles.title}>{nbp(data.title)}</h2>
          <p className={styles.subtitle}>{nbp(data.subtitle)}</p>
        </div>

        <div className={styles.grid}>
          {data.cards.map((card) => (
            <TariffCard key={card.name} card={card} data={data} />
          ))}
        </div>

        <div className={styles.panels}>
          <div className={styles.included}>
            <h3 className={styles.panelTitle}>{data.includedTitle}</h3>
            <ul className={styles.includedList}>
              {data.included.map((item, i) => (
                <li key={i} className={styles.includedItem}>
                  <span className={styles.checkBig}>
                    <CheckIcon />
                  </span>
                  <span>{nbp(item)}</span>
                </li>
              ))}
            </ul>
            <span className={styles.divider} />
            <div className={styles.extras}>
              <h4 className={styles.extrasTitle}>{data.extrasTitle}</h4>
              <div className={styles.chips}>
                {data.extras.map((e, i) => (
                  <span key={i} className={styles.chip}>
                    {e}
                  </span>
                ))}
              </div>
              <span className={styles.extrasNote}>{data.extrasNote}</span>
            </div>
          </div>

          <div className={styles.booking}>
            <h3 className={styles.panelTitle}>{data.bookingTitle}</h3>
            <p className={styles.bookingText}>{nbp(data.bookingText)}</p>
            <p className={styles.bookingNote}>{nbp(data.bookingNote)}</p>
            <div className={styles.bookingContact}>
              <a className={styles.bookingPhone} href={data.bookingPhoneHref}>
                {data.bookingPhoneDisplay}
              </a>
              <span className={styles.bookingManager}>{data.bookingManager}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Tariffs
