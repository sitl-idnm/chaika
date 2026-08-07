import { FC } from 'react'
import { type SiteContent } from '@/shared/content'
import { nbp } from '@/shared/lib/typography'
import { Icon } from '@ui/icon'

import styles from './Hammock.module.scss'

const Hammock: FC<{ data: SiteContent['hammock'] }> = ({ data }) => {
  return (
    <section className={styles.root}>
      <div className={styles.wrap}>
        <div className={styles.inner}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/icons/rope-deco-8.svg"
            alt=""
            className={styles.ropeDeco}
          />

          <h2 className={styles.title}>{nbp(data.title)}</h2>

          <div className={styles.body}>
            <div className={styles.group}>
              <p>{nbp(data.para1)}</p>
              <div className={styles.free}>
                <Icon name="kid" size={32} className={styles.freeIcon} />
                <span>
                  {data.freePrefix}
                  <span className={styles.accent}>{data.freeAccent}</span>
                  {nbp(data.freeSuffix)}
                </span>
              </div>
            </div>
            <p>{nbp(data.para2)}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hammock
