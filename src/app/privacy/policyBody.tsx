import { ReactNode } from 'react'
import { highlightContacts } from './highlight'

import styles from './privacy.module.scss'

const isClause = (line: string) => /^\d/.test(line)

/**
 * Рендерит тело блока политики/правил:
 * - строки-пункты «N.», «N.N.» — абзацы;
 * - строки после пункта, оканчивающегося на «:», — маркированный список (точки);
 * - контакты (телефон/e-mail) подсвечиваются зелёным и становятся ссылками.
 */
export function renderPolicyBody(body: string): ReactNode {
  const lines = body
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)

  const out: ReactNode[] = []
  let bullets: string[] = []
  let inList = false

  const flush = () => {
    if (bullets.length) {
      out.push(
        <ul className={styles.list} key={`ul-${out.length}`}>
          {bullets.map((b, i) => (
            <li key={i}>{highlightContacts(b)}</li>
          ))}
        </ul>
      )
      bullets = []
    }
  }

  for (const line of lines) {
    if (isClause(line)) {
      flush()
      inList = line.endsWith(':')
      out.push(
        <p className={styles.clause} key={`p-${out.length}`}>
          {highlightContacts(line)}
        </p>
      )
    } else if (inList) {
      bullets.push(line)
    } else {
      flush()
      out.push(
        <p className={styles.line} key={`p-${out.length}`}>
          {highlightContacts(line)}
        </p>
      )
    }
  }
  flush()

  return out
}
