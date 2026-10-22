import { getSiteContent } from '@/shared/content'
import { OG_IMAGES, pageSocialMeta } from '@/shared/lib/socialMeta'

import { renderPolicyBody } from '../privacy/policyBody'
import styles from '../privacy/privacy.module.scss'

const TITLE = 'Правила посещения'
const DESCRIPTION =
  'Правила посещения верёвочного парка «Чайка» в Королёве: допуск, экипировка, безопасность на трассах.'

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/rules' },
  ...pageSocialMeta({
    path: '/rules',
    title: TITLE,
    description: DESCRIPTION,
    image: OG_IMAGES.rules
  })
}

const RulesPage = async () => {
  const { legal } = await getSiteContent()

  return (
    <main className={styles.root}>
      <div className={styles.wrap}>
        <h1 className={styles.title}>{legal.rulesTitle}</h1>

        {legal.rulesBlocks.map((block, i) => {
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
}

export default RulesPage
