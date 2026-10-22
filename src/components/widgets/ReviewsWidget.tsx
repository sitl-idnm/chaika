import { FC } from 'react'

import { LazyFrame } from './LazyFrame'
import styles from './widgets.module.scss'

/** Yandex.Maps reviews widget for the «Чайка» org (embedded iframe). */
export const ReviewsWidget: FC = () => (
  <div className={styles.reviews}>
    <LazyFrame
      frameClassName={styles.reviewsFrame}
      placeholderClassName={`${styles.reviewsFrame} ${styles.stub}`}
      src="https://yandex.ru/maps-reviews-widget/193894342382?comments"
      title="Отзывы о парке «Чайка» — Яндекс Карты"
      placeholder="Показать отзывы с Яндекс Карт"
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
