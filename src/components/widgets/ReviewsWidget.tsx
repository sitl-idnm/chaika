import { FC } from 'react'

import styles from './widgets.module.scss'

/** Yandex.Maps reviews widget for the «Чайка» org (embedded iframe). */
export const ReviewsWidget: FC = () => (
  <div className={styles.reviews}>
    <iframe
      className={styles.reviewsFrame}
      src="https://yandex.ru/maps-reviews-widget/193894342382?comments"
      title="Отзывы о парке «Чайка» — Яндекс Карты"
    />
    <a
      className={styles.reviewsLink}
      href="https://yandex.ru/maps/org/chayka/193894342382/"
      target="_blank"
      rel="noreferrer"
    >
      Чайка на карте Королёва — Яндекс Карты
    </a>
  </div>
)
