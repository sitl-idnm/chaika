'use client'

import { FC, FormEvent, useRef, useState } from 'react'
import Link from 'next/link'
import { type SiteContent } from '@/shared/content/defaults'
import { submitLead } from '@/shared/lib/leads'
import { GOALS, ymGoal } from '@/shared/lib/metrika'
import { isCompleteRuPhone } from '@/shared/lib/phone'
import { nbp } from '@/shared/lib/typography'
import { Button } from '@ui/button'
import { Glyph } from '@ui/glyph'
import { Icon } from '@ui/icon'

import { PhoneInput } from '@/components/form/PhoneInput'
import {
  SmartCaptcha,
  type SmartCaptchaHandle
} from '@/components/form/SmartCaptcha'
import { ReviewsWidget } from '@/components/widgets/ReviewsWidget'

import styles from './Safety.module.scss'

type SafetyProps = {
  data: SiteContent['safety']
  forms: SiteContent['forms']
  contacts: SiteContent['contacts']
}

const ChipGroup: FC<{ chips: string[]; ariaHidden?: boolean }> = ({
  chips,
  ariaHidden
}) => (
  <div className={styles.chipGroup} aria-hidden={ariaHidden}>
    {chips.map((chip) => (
      <span key={chip} className={styles.chip}>
        <Icon name="check-circle" size={24} className={styles.chipIcon} />
        {nbp(chip)}
      </span>
    ))}
  </div>
)

const Safety: FC<SafetyProps> = ({ data, forms, contacts }) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [agree, setAgree] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [submitted, setSubmitted] = useState(false)
  const captchaRef = useRef<SmartCaptchaHandle>(null)

  const canSubmit = name.trim() !== '' && isCompleteRuPhone(phone) && agree

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!canSubmit || status === 'loading') return

    setStatus('loading')

    let captchaToken = ''
    try {
      captchaToken = (await captchaRef.current?.execute()) ?? ''
    } catch {
      ymGoal(GOALS.submitError, { form: 'safety' })
      setStatus('error')
      return
    }

    const res = await submitLead({ form: 'safety', name, phone, captchaToken })

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
        <h2 className={styles.title}>{nbp(data.title)}</h2>

        <div className={styles.marquee}>
          <div className={styles.track}>
            <ChipGroup chips={data.chips} />
            <ChipGroup chips={data.chips} ariaHidden />
          </div>
        </div>

        <div className={styles.grid}>
          <div className={styles.leftCol}>
            {submitted ? (
              <div className={styles.panel}>
                <h3 className={styles.panelTitle}>{data.successTitle}</h3>
                <p className={styles.successText}>
                  {name.trim() ? `${name.trim()}, мы` : 'Мы'} перезвоним вам в
                  ближайшее время.
                </p>
              </div>
            ) : (
              <form className={styles.panel} onSubmit={handleSubmit}>
                <h3 className={styles.panelTitle}>{data.formTitle}</h3>

                <div className={styles.field}>
                  <label htmlFor="name">{forms.nameLabel}</label>
                  <input
                    id="name"
                    type="text"
                    placeholder={forms.namePlaceholder}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="phone">{forms.phoneLabel}</label>
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
                    {forms.consentPrefix}
                    <Link href="/privacy">{forms.consentLink}</Link>
                    {forms.consentSuffix}
                  </span>
                </label>

                {status === 'error' && (
                  <p className={styles.error}>{forms.error}</p>
                )}

                <SmartCaptcha ref={captchaRef} />

                <Button
                  variant="orange"
                  block
                  type="submit"
                  disabled={!canSubmit || status === 'loading'}
                >
                  {status === 'loading' ? forms.sending : forms.submitBooking}
                </Button>
              </form>
            )}

            <div className={styles.panel}>
              <h3 className={styles.panelSubtitle}>{nbp(data.contactTitle)}</h3>

              <div className={styles.actions}>
                <a
                  className={styles.contactBtn}
                  href={contacts.phoneHref}
                  onClick={() => ymGoal(GOALS.clickPhone, { place: 'safety' })}
                >
                  <Glyph name="phone" />
                  {data.phoneBtn}
                </a>
                <a
                  className={styles.contactBtn}
                  href={contacts.telegram}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() =>
                    ymGoal(GOALS.clickTelegram, { place: 'safety' })
                  }
                >
                  <Glyph name="telegram" />
                  {data.telegramBtn}
                </a>
              </div>

              <div className={styles.contactRow}>
                <Glyph name="map-pin" className={styles.rowGlyph} />
                <span>{nbp(contacts.address)}</span>
              </div>

              <div className={styles.contactRow}>
                <Glyph name="clock" className={styles.rowGlyph} />
                <span>
                  {contacts.hours}
                  <br />
                  <span className={styles.muted}>{nbp(contacts.hoursNote)}</span>
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
