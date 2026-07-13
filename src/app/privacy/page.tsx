import { FC } from 'react'
import { privacyBlocks } from './privacyContent'
import { renderPolicyBody } from './policyBody'

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
      <h1 className={styles.title}>
        Политика обработки персональных данных
        <br />и Пользовательское соглашение
      </h1>

      {privacyBlocks.map((block, i) => {
        const [head, ...rest] = block.split('\n')
        const body = rest.join('\n')
        const isPart = head.startsWith('Часть')

        return (
          <section key={i} className={styles.block}>
            <h2 className={isPart ? styles.part : styles.heading}>{head}</h2>
            {body && renderPolicyBody(body)}
          </section>
        )
      })}
    </div>
  </main>
)

export default PrivacyPage
