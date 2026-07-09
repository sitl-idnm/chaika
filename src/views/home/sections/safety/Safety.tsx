'use client'

import { FC, FormEvent, useState } from 'react'
import { Button } from '@ui/button'
import { Glyph } from '@ui/glyph'
import { Icon } from '@ui/icon'
import { ReviewsWidget } from '@/components/widgets/ReviewsWidget'
import { PhoneInput } from '@/components/form/PhoneInput'
import { isCompleteRuPhone } from '@/shared/lib/phone'
import { submitLead } from '@/shared/lib/leads'
import { GOALS, ymGoal } from '@/shared/lib/metrika'
import { CONTACTS } from '@/shared/const/contacts'

import styles from './Safety.module.scss'

const chips = [
  'Оборудование Petzl, Kong и VENTO — мировые лидеры',
  'Непрерывная страховка — невозможно отстегнуться на высоте',
  'Квалифицированные инструкторы с экипировкой для эвакуации',
  'Ежедневная проверка трасс и снаряжения',
  'Ежегодная независимая экспертиза'
]

const ChipGroup: FC<{ ariaHidden?: boolean }> = ({ ariaHidden }) => (
  <div className={styles.chipGroup} aria-hidden={ariaHidden}>
    {chips.map((chip) => (
      <span key={chip} className={styles.chip}>
        <Icon name="check-circle" size={24} className={styles.chipIcon} />
        {chip}
      </span>
    ))}
  </div>
)

const Safety: FC = () => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [agree, setAgree] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [submitted, setSubmitted] = useState(false)

  const canSubmit = name.trim() !== '' && isCompleteRuPhone(phone) && agree

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!canSubmit || status === 'loading') return

    setStatus('loading')
    const res = await submitLead({ form: 'safety', name, phone })

    if (res.ok) {
      ymGoal(GOALS.submitSafety)
      setSubmitted(true)
    } else {
      ymGoal(GOALS.submitError, { form: 'safety' })
      setStatus('error')
    }
  }

  return (
    <section className={styles.root} id="safety">
      <div className={styles.wrap}>
        <h2 className={styles.title}>Как мы обеспечиваем безопасность</h2>

        <div className={styles.marquee}>
          <div className={styles.track}>
            <ChipGroup />
            <ChipGroup ariaHidden />
          </div>
        </div>

        <div className={styles.grid}>
          <div className={styles.leftCol}>
            {submitted ? (
              <div className={styles.panel}>
                <h3 className={styles.panelTitle}>Заявка принята!</h3>
                <p className={styles.successText}>
                  {name.trim() ? `${name.trim()}, мы` : 'Мы'} перезвоним вам в
                  ближайшее время.
                </p>
              </div>
            ) : (
              <form className={styles.panel} onSubmit={handleSubmit}>
                <h3 className={styles.panelTitle}>Запишитесь прямо сейчас</h3>

                <div className={styles.field}>
                  <label htmlFor="name">Имя*</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Как вас зовут?"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="phone">Телефон*</label>
                  <PhoneInput
                    id="phone"
                    value={phone}
                    onChange={setPhone}
                    required
                  />
                </div>

                <label className={styles.consent}>
                  <input
                    type="checkbox"
                    required
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                  />
                  <span>
                    Я принимаю условия{' '}
                    <a href="/privacy">
                      Политики обработки персональных данных
                    </a>{' '}
                    и даю согласие на&nbsp;обработку моих персональных данных.
                  </span>
                </label>

                {status === 'error' && (
                  <p className={styles.error}>
                    Не удалось отправить заявку. Попробуйте ещё раз или позвоните
                    нам.
                  </p>
                )}

                <Button
                  variant="orange"
                  block
                  type="submit"
                  disabled={!canSubmit || status === 'loading'}
                >
                  {status === 'loading' ? 'Отправляем…' : 'Забронировать онлайн'}
                </Button>
              </form>
            )}

            <div className={styles.panel}>
              <h3 className={styles.panelSubtitle}>
                Или свяжитесь с нами любым удобным для вас способом:
              </h3>

              <div className={styles.actions}>
                <a
                  className={styles.contactBtn}
                  href={CONTACTS.phoneHref}
                  onClick={() => ymGoal(GOALS.clickPhone, { place: 'safety' })}
                >
                  <Glyph name="phone" />
                  Позвонить
                </a>
                <a
                  className={styles.contactBtn}
                  href={CONTACTS.telegram}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() =>
                    ymGoal(GOALS.clickTelegram, { place: 'safety' })
                  }
                >
                  <Glyph name="paper-plane" />
                  Написать в телеграм
                </a>
              </div>

              <div className={styles.contactRow}>
                <Glyph name="map-pin" className={styles.rowGlyph} />
                <span>
                  Королёв, ул. К.Д. Трофимова, 1/2 (справа от стадиона «Чайка»)
                </span>
              </div>

              <div className={styles.contactRow}>
                <Glyph name="clock" className={styles.rowGlyph} />
                <span>
                  Июнь–август: с 11:00 до 19:00
                  <br />
                  <span className={styles.muted}>
                    В мае и сентябре график может меняться. Позвоните нам для&nbsp;получения точной информации.
                  </span>
                </span>
              </div>
            </div>
          </div>

          <div className={styles.reviews}>
            <ReviewsWidget />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Safety
