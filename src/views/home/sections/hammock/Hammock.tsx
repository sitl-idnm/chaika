import { FC } from 'react'
import { nbp } from '@/shared/lib/typography'
import { Icon } from '@ui/icon'

import styles from './Hammock.module.scss'

const Hammock: FC = () => {
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

          <h2 className={styles.title}>
            {nbp('Ребенок под присмотром инструктора, а вы отдыхаете в гамаке')}
          </h2>

          <div className={styles.body}>
            <div className={styles.group}>
              <p>
                {nbp(
                  `Боитесь, что ребенок испугается высоты или зависнет на трассе?
Наш инструктор пройдет маршрут вместе с ним: подстрахует, подскажет, поможет преодолеть страх.`
                )}
              </p>
              <div className={styles.free}>
                <Icon name="kid" size={32} className={styles.freeIcon} />
                <span>
                  Услуга — <span className={styles.accent}>бесплатная</span>
                  {nbp(' для детской трассы')}
                </span>
              </div>
            </div>
            <p>
              {nbp(
                `Также всегда дежурят инструкторы-спасатели, которые имеют сертификацию и спасательный комплект для эвакуации.
А вы можете спокойно сидеть в тени с видом на трассы, пить кофе и наблюдать.`
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hammock
