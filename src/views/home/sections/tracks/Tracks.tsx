import { FC } from 'react'
import { type SiteContent } from '@/shared/content'
import { nbp } from '@/shared/lib/typography'
import { Icon } from '@ui/icon'

import { CtaButton } from '@/components/cta/CtaButton'

import styles from './Tracks.module.scss'

const RopeDeco: FC = () => (
  // eslint-disable-next-line @next/next/no-img-element
  <img src="/icons/rope-deco.svg" alt="" className={styles.ropeDeco} />
)

const TrackCta: FC<{ book: string; event: string }> = ({ book, event }) => (
  <div className={styles.cta}>
    <CtaButton modal="booking">{book}</CtaButton>
    <CtaButton modal="event" variant="light" bordered>
      {event}
    </CtaButton>
  </div>
)

const Tracks: FC<{ data: SiteContent['tracks'] }> = ({ data }) => {
  return (
    <section className={styles.root} id="tracks">
      <div className={styles.wrap}>
        <h2 className={styles.title}>{nbp(data.title)}</h2>

        <div className={styles.desc}>
          <RopeDeco />
          {data.desc.map((p, i) =>
            i === 1 ? (
              <p key={i} className={styles.withIcon}>
                <Icon name="forest" size={32} className={styles.descIcon} />
                {nbp(p)}
              </p>
            ) : (
              <p key={i}>{nbp(p)}</p>
            )
          )}
        </div>

        <div className={styles.tableWrap}>
          <table className={styles.priceTable}>
            <thead>
              <tr>
                {data.priceHead.map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.priceRows.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell, i) => (
                    <td key={i}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <TrackCta book={data.ctaBook} event={data.ctaEvent} />

        <div className={styles.maps}>
          {data.maps.map((map) => (
            <div key={map.src} className={styles.map}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={map.src} alt={map.alt} />
              <span className={styles.cap}>{map.cap}</span>
            </div>
          ))}
        </div>

        <div className={styles.trampOuter}>
          <div className={styles.trampInner}>
            <h3 className={styles.trampTitle}>{data.trampTitle}</h3>
            <span className={styles.trampPrice}>
              <Icon name="coins" />
              {data.trampPrice}
            </span>
            <p>{nbp(data.trampBody)}</p>
            <TrackCta book={data.ctaBook} event={data.ctaEvent} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Tracks
