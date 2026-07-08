import { FC } from 'react'

import styles from './widgets.module.scss'

/** Yandex.Maps location widget for the «Чайка» org (embedded iframe). */
export const YandexMap: FC = () => (
  <div className={styles.map}>
    <iframe
      className={styles.mapFrame}
      src="https://yandex.ru/map-widget/v1/?ll=37.837522%2C55.939790&mode=poi&poi%5Bpoint%5D=37.834791%2C55.940463&poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D193894342382&z=17.16"
      title="Парк «Чайка» на карте — Яндекс Карты"
      allowFullScreen
    />
  </div>
)
