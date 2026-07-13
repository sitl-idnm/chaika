import { ReactNode } from 'react'

import styles from './privacy.module.scss'

// Email or Russian phone number
const CONTACT = /([\w.+-]+@[\w-]+\.[A-Za-zА-Яа-я]{2,}|\+7[\s\d()–—-]{9,}\d)/g

/**
 * Подсвечивает контакты (e-mail, телефоны) зелёным и делает их ссылками
 * (mailto: / tel:), как в макете.
 */
export function highlightContacts(text: string): ReactNode {
  const parts = text.split(CONTACT)
  return parts.map((part, i) => {
    if (i % 2 === 0) return part
    const isEmail = part.includes('@')
    const href = isEmail
      ? `mailto:${part.trim()}`
      : `tel:+${part.replace(/\D/g, '')}`
    return (
      <a key={i} href={href} className={styles.hl}>
        {part}
      </a>
    )
  })
}
