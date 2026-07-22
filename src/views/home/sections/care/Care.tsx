import { FC } from 'react'
import { nbp } from '@/shared/lib/typography'
import { Button } from '@ui/button'
import { Icon, IconName } from '@ui/icon'

import styles from './Care.module.scss'

type CareItem = {
  icon: IconName
  title: string
  body: string
  green?: boolean
}

const row1: CareItem[] = [
  {
    icon: 'helmet',
    title: 'Бесплатный инструктор',
    body: 'Проведем ребёнка по детской трассе, подстрахуем и поможем преодолеть страх. А вы отдыхайте в гамаке',
    green: true
  },
  {
    icon: 'stock',
    title: 'Непрерывная страховка',
    body: 'Используем профессиональное оборудование: Petzl, Kong, VENTO.\nРебенок не отстегнется на высоте'
  }
]

const row2: CareItem[] = [
  {
    icon: 'hourglass',
    title: 'Добавляем время, если ребёнок не успел пройти трассу',
    body: 'Купили билет на час и не успели пройти трассу? Добавим время, чтобы завершить приключение'
  },
  {
    icon: 'forest',
    title: 'Трассы для всех возрастов',
    body: 'Будет интересно и взрослым и детям.\nА еще лучше приходите большой компанией и провести время вместе',
    green: true
  },
  {
    icon: 'check-circle',
    title: 'Контроль качества',
    body: 'Ежедневная проверка трасс и снаряжения. Сертифицированные инструкторы'
  }
]

const CareCard: FC<{ item: CareItem }> = ({ item }) => (
  <div className={`${styles.card} ${item.green ? styles.green : styles.lite}`}>
    <div className={styles.head}>
      <Icon name={item.icon} size={32} className={styles.icon} />
      <span className={styles.cardTitle}>{nbp(item.title)}</span>
    </div>
    <div className={styles.body}>{nbp(item.body)}</div>
  </div>
)

const Care: FC = () => {
  return (
    <section className={styles.root}>
      <div className={styles.wrap}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/care.png" alt="" className={styles.photo} />

        <h2 className={styles.title}>
          {nbp('Парк, где заботятся о детях')}
          <br />
          {nbp('и спокойствии родителей')}
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
          Как обеспечивается безопасность?
        </Button>
      </div>
    </section>
  )
}

export default Care
