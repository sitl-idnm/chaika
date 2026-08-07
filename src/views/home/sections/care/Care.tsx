import { FC, Fragment } from 'react'
import { type SiteContent } from '@/shared/content'
import { nbp } from '@/shared/lib/typography'
import { Button } from '@ui/button'
import { Icon, IconName } from '@ui/icon'

import styles from './Care.module.scss'

type CareItem = SiteContent['care']['cards'][number]

const CareCard: FC<{ item: CareItem }> = ({ item }) => (
  <div className={`${styles.card} ${item.green ? styles.green : styles.lite}`}>
    <div className={styles.head}>
      <Icon name={item.icon as IconName} size={32} className={styles.icon} />
      <span className={styles.cardTitle}>{nbp(item.title)}</span>
    </div>
    <div className={styles.body}>{nbp(item.body)}</div>
  </div>
)

const Care: FC<{ data: SiteContent['care'] }> = ({ data }) => {
  const row1 = data.cards.slice(0, 2)
  const row2 = data.cards.slice(2, 5)
  const titleLines = data.title.split('\n')

  return (
    <section className={styles.root}>
      <div className={styles.wrap}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/care.png" alt="" className={styles.photo} />

        <h2 className={styles.title}>
          {titleLines.map((line, i) => (
            <Fragment key={i}>
              {i > 0 && <br />}
              {nbp(line)}
            </Fragment>
          ))}
        </h2>

        <div className={styles.grid}>
          <div className={`${styles.gridRow} ${styles.rowTwo}`}>
            {row1.map((item) => (
              <CareCard key={item.title} item={item} />
            ))}
          </div>
          <div className={`${styles.gridRow} ${styles.rowThree}`}>
            {row2.map((item) => (
              <CareCard key={item.title} item={item} />
            ))}
          </div>
        </div>

        <Button
          as="a"
          href="#safety"
          variant="orange"
          className={styles.safetyBtn}
        >
          {data.safetyBtn}
        </Button>
      </div>
    </section>
  )
}

export default Care
