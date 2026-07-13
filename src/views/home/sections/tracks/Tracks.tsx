import { FC } from 'react'
import { Icon } from '@ui/icon'
import { CtaButton } from '@/components/cta/CtaButton'
import { nbp } from '@/shared/lib/typography'

import styles from './Tracks.module.scss'

const priceHead = [
  'Трасса',
  'Возраст / Рост',
  'Вес',
  'Высота',
  'Протяженность',
  'Цена'
]

const priceRows = [
  ['Детская', 'с 4 до 11 лет', 'до 80 кг', 'до 3 м', '36,2 м * 63,2 м', '1000 ₽'],
  ['Учебная', 'для всех возрастов', 'до 100 кг', 'до 3 м', '36,2 м * 27, 9 м', 'вкл. в комплект'],
  ['Верхняя семейная', 'c 11 лет, от 120 см', 'до 100 кг', 'до 7 м', '153,5 м', '1300 ₽'],
  ['Верхняя сложная', 'c 11 лет, от 120 см', 'до 100 кг', 'до 7 м', '103,6', '1300 ₽']
]

const trackMaps = [
  { src: '/icons/trail-kids.svg', alt: 'детская трасса', cap: 'детская трасса (8 этапов)' },
  { src: '/icons/trail-family.svg', alt: 'взрослая трасса', cap: 'взрослая трасса (семейная, 13 этапов)' },
  { src: '/icons/trail-hard.svg', alt: 'сложная трасса', cap: 'сложная трасса' },
  { src: '/icons/trail-training.svg', alt: 'учебная трасса', cap: 'учебная трасса (3 этапа)' }
]

const RopeDeco: FC = () => (
  // eslint-disable-next-line @next/next/no-img-element
  <img src="/icons/rope-deco.svg" alt="" className={styles.ropeDeco} />
)

const TrackCta: FC = () => (
  <div className={styles.cta}>
    <CtaButton modal="booking">Забронировать онлайн</CtaButton>
    <CtaButton modal="event" variant="light">
      Провести день рождения
    </CtaButton>
  </div>
)

const Tracks: FC = () => {
  return (
    <section className={styles.root} id="tracks">
      <div className={styles.wrap}>
        <h2 className={styles.title}>{nbp('4 трассы для всех возрастов')}</h2>

        <div className={styles.desc}>
          <RopeDeco />
          <p>
            {nbp(
              'Всего в парке 39 этапов-препятствий на 28 площадках. Трассы проложены между деревьями, и органично вписаны в природный ландшафт.'
            )}
          </p>
          <p className={styles.withIcon}>
            <Icon name="forest" size={32} className={styles.descIcon} />
            {nbp(
              'Активный отдых дает большой заряд энергии, позволяет провести время весело и с пользой. Верёвочный парк «Чайка» в Королёве — это открытый развлекательный комплекс на природе.'
            )}
          </p>
          <p>
            {nbp(
              'Верёвочные трассы парка проложены между деревьями, под открытым небом. Конструкция для лазания представляет собой многочисленные этапы-препятствия, мостики, канаты и сетки, объединенные в единую систему. Посещение маршрутов осуществляется с использованием страховочного снаряжения и оборудования мировых лидеров Petzl, Kong VENTO, поэтому наши гости чувствуют себя максимально безопасно.'
            )}
          </p>
        </div>

        <div className={styles.tableWrap}>
          <table className={styles.priceTable}>
            <thead>
            <tr>
              {priceHead.map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
            <tbody>
              {priceRows.map((row) => (
                <tr key={row[0]}>
                  {row.map((cell, i) => (
                    <td key={i}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <TrackCta />

        <div className={styles.maps}>
          {trackMaps.map((map) => (
            <div key={map.src} className={styles.map}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={map.src} alt={map.alt} />
              <span className={styles.cap}>{map.cap}</span>
            </div>
          ))}
        </div>

        <div className={styles.trampOuter}>
          <div className={styles.trampInner}>
            <h3 className={styles.trampTitle}>Батут</h3>
            <span className={styles.trampPrice}>
              <Icon name="coins" />
              400 ₽ за 10 минут | 800 ₽ за 30 минут
            </span>
            <p>
              {nbp(
                'Большой батут под открытым небом подходит для детей от 4 лет и даже для взрослых. Для маленьких посетителей — мягкое покрытие и безопасные борта. Отличный способ выплеснуть энергию, повеселиться и получить заряд бодрости. Можно купить отдельно или в дополнение к трассам.'
              )}
            </p>
            <TrackCta />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Tracks
