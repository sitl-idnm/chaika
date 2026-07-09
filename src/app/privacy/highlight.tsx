import { ReactNode } from 'react'

import styles from './privacy.module.scss'

// Email or Russian phone number
const CONTACT = /([\w.+-]+@[\w-]+\.[A-Za-zА-Яа-я]{2,}|\+7[\s\d()–—-]{9,}\d)/g

/** Highlights contact details (emails, phone numbers) in brand green, matching Figma. */
export function highlightContacts(text: string): ReactNode {
  const parts = text.split(CONTACT)
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className={styles.hl}>
        {part}
      </span>
    ) : (
      part
    )
  )
}
