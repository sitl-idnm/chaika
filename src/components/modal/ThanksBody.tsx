'use client'

import { FC } from 'react'
import { CONTACTS } from '@/shared/const/contacts'
import { GOALS, ymGoal } from '@/shared/lib/metrika'

import styles from './modal.module.scss'

/** Shared "заявка принята" body (used by both modals after submit). */
export const ThanksBody: FC = () => (
  <div className={styles.thanks}>
    <p className={styles.thanksPrompt}>
      Подписывайтесь на наш канал в VK, чтобы следить за акциями и новостями:
    </p>
    <a
      href={CONTACTS.vk}
      target="_blank"
      rel="noreferrer"
      className={styles.subscribe}
      onClick={() => ymGoal(GOALS.clickVk)}
    >
      <span className={styles.vkIcon} aria-hidden="true" />
      Подписаться на группу в ВК
    </a>
  </div>
)
