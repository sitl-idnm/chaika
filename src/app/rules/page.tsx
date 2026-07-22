import { FC } from 'react'

import { renderPolicyBody } from '../privacy/policyBody'
import styles from '../privacy/privacy.module.scss'
import { rulesBlocks, rulesTitle } from './rulesContent'

export const metadata = {
  title: 'Правила посещения',
  description:
    'Правила посещения верёвочного парка «Чайка» в Королёве: допуск, экипировка, безопасность на трассах.',
  alternates: { canonical: '/rules' }
}

const RulesPage: FC = () => (
  <main className={styles.root}>
    <div className={styles.wrap}>
      <h1 className={styles.title}>{rulesTitle}</h1>

      {rulesBlocks.map((block, i) => {
        const [head, ...rest] = block.split('\n')
        const body = rest.join('\n')

        return (
          <section key={i} className={styles.block}>
            <h2 className={styles.heading}>{head}</h2>
            {body && renderPolicyBody(body, { bulletLines: true })}
          </section>
        )
      })}
    </div>
  </main>
)

export default RulesPage
