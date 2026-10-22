import { getSiteContent } from '@/shared/content'
import { OG_IMAGES, pageSocialMeta } from '@/shared/lib/socialMeta'

import { renderPolicyBody } from './policyBody'
import styles from './privacy.module.scss'

const TITLE = 'Политика конфиденциальности'
const DESCRIPTION =
  'Политика обработки персональных данных и пользовательское соглашение верёвочного парка «Чайка».'

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/privacy' },
  ...pageSocialMeta({
    path: '/privacy',
    title: TITLE,
    description: DESCRIPTION,
    image: OG_IMAGES.privacy
  })
}

const PrivacyPage = async () => {
  const { legal } = await getSiteContent()

  return (
    <main className={styles.root}>
      <div className={styles.wrap}>
        <h1 className={styles.title}>
          Политика обработки персональных данных
          <br />и Пользовательское соглашение
        </h1>

        {legal.privacyBlocks.map((block, i) => {
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
}

export default PrivacyPage
