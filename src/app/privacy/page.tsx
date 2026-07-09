import { FC } from 'react'
import { privacyTitle, privacyBlocks } from './privacyContent'
import { highlightContacts } from './highlight'

import styles from './privacy.module.scss'

export const metadata = {
  title: 'Политика конфиденциальности',
  description:
    'Политика обработки персональных данных и пользовательское соглашение верёвочного парка «Чайка».',
  alternates: { canonical: '/privacy' }
}

const PrivacyPage: FC = () => (
  <main className={styles.root}>
    <div className={styles.wrap}>
      <h1 className={styles.title}>{privacyTitle}</h1>

      {privacyBlocks.map((block, i) => {
        const [head, ...rest] = block.split('\n')
        const body = rest.join('\n')
        const isPart = head.startsWith('Часть')

        return (
          <section key={i} className={styles.block}>
            <h2 className={isPart ? styles.part : styles.heading}>{head}</h2>
            {body && (
              <p className={styles.body}>{highlightContacts(body)}</p>
            )}
          </section>
        )
      })}
    </div>
  </main>
)

export default PrivacyPage
