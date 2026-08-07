'use client'

import { FC, FormEvent, useRef, useState } from 'react'
import Link from 'next/link'
import { tariffPrefillAtom } from '@/shared/atoms/modalAtom'
import { submitLead } from '@/shared/lib/leads'
import { GOALS, ymGoal } from '@/shared/lib/metrika'
import { isCompleteRuPhone } from '@/shared/lib/phone'
import { Button } from '@ui/button'
import { useAtomValue } from 'jotai'

import { Dropdown } from '@/components/form/Dropdown'
import { NumberField } from '@/components/form/NumberField'
import { PhoneInput } from '@/components/form/PhoneInput'
import {
  SmartCaptcha,
  type SmartCaptchaHandle
} from '@/components/form/SmartCaptcha'

import { Modal } from './Modal'
import styles from './modal.module.scss'
import { type ModalContent } from './ModalHost'
import { ThanksBody } from './ThanksBody'

const START_TIMES = ['11:00', '12:00', '13:00', '14:00', '15:00', '16:00']

export const EventModal: FC<{ onClose: () => void } & ModalContent> = ({
  onClose,
  modals,
  forms,
  contacts,
  tariffs
}) => {
  // Pre-selected tariff (set when a tariff card's «Забронировать» is clicked).
  const prefillTariff = useAtomValue(tariffPrefillAtom)
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    type: 'День Рождения',
    kids: '',
    tariff: prefillTariff,
    startTime: '',
    date: ''
  })
  const [agree, setAgree] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [submitted, setSubmitted] = useState(false)
  const captchaRef = useRef<SmartCaptchaHandle>(null)

  const set = (key: keyof typeof form) => (value: string) =>
    setForm((f) => ({ ...f, [key]: value }))

  const canSubmit =
    form.name.trim() !== '' && isCompleteRuPhone(form.phone) && agree

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!canSubmit || status === 'loading') return

    setStatus('loading')

    let captchaToken = ''
    try {
      captchaToken = (await captchaRef.current?.execute()) ?? ''
    } catch {
      ymGoal(GOALS.submitError, { form: 'event' })
      setStatus('error')
      return
    }

    const res = await submitLead({
      form: 'event',
      name: form.name,
      phone: form.phone,
      email: form.email,
      eventType: form.type,
      kids: form.kids,
      tariff: form.tariff,
      startTime: form.startTime,
      date: form.date,
      captchaToken
    })

    if (res.ok) {
      ymGoal(GOALS.submitEvent, { type: form.type })
      setSubmitted(true)
    } else {
      ymGoal(GOALS.submitError, { form: 'event' })
      setStatus('error')
    }
  }

  if (submitted) {
    return (
      <Modal
        title={modals.thanksTitle}
        subtitle={modals.thanksSubtitle}
        onClose={onClose}
      >
        <ThanksBody modals={modals} contacts={contacts} />
      </Modal>
    )
  }

  return (
    <Modal
      title={modals.eventTitle}
      subtitle={modals.eventSubtitle}
      onClose={onClose}
    >
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label htmlFor="e-name">{forms.nameLabel}</label>
          <input
            id="e-name"
            type="text"
            placeholder={forms.namePlaceholder}
            value={form.name}
            onChange={(e) => set('name')(e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="e-phone">{forms.phoneLabel}</label>
          <PhoneInput
            id="e-phone"
            value={form.phone}
            onChange={set('phone')}
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="e-email">Почта</label>
          <input
            id="e-email"
            type="email"
            placeholder="email@mail.ru"
            value={form.email}
            onChange={(e) => set('email')(e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="e-type">Тип мероприятия</label>
          <Dropdown
            id="e-type"
            value={form.type}
            options={['День Рождения', 'Выпускной', 'Корпоратив']}
            onChange={set('type')}
          />
        </div>

        {tariffs.length > 0 && (
          <div className={styles.field}>
            <label htmlFor="e-tariff">Тариф</label>
            <Dropdown
              id="e-tariff"
              value={form.tariff}
              options={tariffs}
              onChange={set('tariff')}
              placeholder="Выберите тариф"
            />
          </div>
        )}

        <div className={styles.grid2}>
          <div className={styles.field}>
            <label htmlFor="e-kids">Количество детей:</label>
            <NumberField
              id="e-kids"
              placeholder="12"
              value={form.kids}
              onChange={set('kids')}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="e-start">Время начала мероприятия:</label>
            <Dropdown
              id="e-start"
              value={form.startTime}
              options={START_TIMES}
              onChange={set('startTime')}
              placeholder="Выберите время"
            />
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor="e-date">Напишите желаемую дату:</label>
          <input
            id="e-date"
            type="text"
            placeholder="12.08.2026"
            value={form.date}
            onChange={(e) => set('date')(e.target.value)}
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

        {status === 'error' && <p className={styles.error}>{forms.error}</p>}

        <SmartCaptcha ref={captchaRef} />

        <Button
          variant="orange"
          block
          type="submit"
          disabled={!canSubmit || status === 'loading'}
        >
          {status === 'loading' ? forms.sending : forms.submitEvent}
        </Button>
      </form>
    </Modal>
  )
}
