import { ReactNode } from 'react'
import { CONTACTS } from '@/shared/const/contacts'

import styles from './privacy.module.scss'

// Email or Russian phone number
const CONTACT = /([\w.+-]+@[\w-]+\.[A-Za-zА-Яа-я]{2,}|\+7[\s\d()–—-]{9,}\d)/g

// Адрес парка — ведёт на маршрут в Яндекс.Картах. Пробелы гибкие (`\s+`),
// т.к. в контентах политики/правил обычные пробелы смешаны с неразрывными.
const ADDRESS =
  /(Королёв,\s+ул\.\s+К\.\s+Д\.\s+Трофимова,\s+½\s+\(справа\s+от\s+стадиона\s+«Чайка»\))/g

/** Разбивает строку на телефоны/e-mail и делает их зелёными ссылками. */
function highlightPhonesEmails(text: string, keyPrefix: string): ReactNode[] {
  return text.split(CONTACT).map((part, i) => {
    if (i % 2 === 0) return part
    const isEmail = part.includes('@')
    const href = isEmail
      ? `mailto:${part.trim()}`
      : `tel:+${part.replace(/\D/g, '')}`
    return (
      <a key={`${keyPrefix}-${i}`} href={href} className={styles.hl}>
        {part}
      </a>
    )
  })
}

/**
 * Подсвечивает контакты (e-mail, телефоны) и адрес зелёным и делает их
 * ссылками (mailto: / tel: / маршрут в Яндекс.Картах), как в макете.
 */
export function highlightContacts(text: string): ReactNode {
  // split с захватывающей группой: чётные индексы — обычный текст,
  // нечётные — совпавший адрес.
  return text.split(ADDRESS).flatMap<ReactNode>((segment, si) => {
    if (si % 2 === 1) {
      return [
        <a
          key={`addr-${si}`}
          href={CONTACTS.maps}
          target="_blank"
          rel="noreferrer"
          className={styles.hl}
        >
          {segment}
        </a>
      ]
    }
    return highlightPhonesEmails(segment, `c${si}`)
  })
}
