'use client'

import { FC, FormEvent, useRef, useState } from 'react'
import Link from 'next/link'
import { submitLead } from '@/shared/lib/leads'
import { GOALS, ymGoal } from '@/shared/lib/metrika'
import { isCompleteRuPhone } from '@/shared/lib/phone'
import { Button } from '@ui/button'

import { PhoneInput } from '@/components/form/PhoneInput'
import {
  SmartCaptcha,
  type SmartCaptchaHandle
} from '@/components/form/SmartCaptcha'

import { Modal } from './Modal'
import styles from './modal.module.scss'
import { ThanksBody } from './ThanksBody'

export const BookingModal: FC<{ onClose: () => void }> = ({ onClose }) => {
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
      ymGoal(GOALS.submitError, { form: 'booking' })
      setStatus('error')
      return
    }

    const res = await submitLead({ form: 'booking', name, phone, captchaToken })

    if (res.ok) {
      ymGoal(GOALS.submitBooking)
      setSubmitted(true)
    } else {
      ymGoal(GOALS.submitError, { form: 'booking' })
      setStatus('error')
    }
  }

  if (submitted) {
    return (
      <Modal
        title="Ваша заявка принята!"
        subtitle="Спасибо! Мы свяжемся с вами в ближайшее время для подтверждения бронирования."
        onClose={onClose}
      >
        <ThanksBody />
      </Modal>
    )
  }

  return (
    <Modal title="Запишитесь прямо сейчас" onClose={onClose}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label htmlFor="b-name">Имя*</label>
          <input
            id="b-name"
            type="text"
            placeholder="Как вас зовут?"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="b-phone">Телефон*</label>
          <PhoneInput id="b-phone" value={phone} onChange={setPhone} required />
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
            <Link href="/privacy">Политики обработки персональных данных</Link>{' '}
            и даю согласие на обработку моих персональных данных.
          </span>
        </label>

        {status === 'error' && (
          <p className={styles.error}>
            Не удалось отправить заявку. Попробуйте ещё раз или позвоните нам.
          </p>
        )}

        <SmartCaptcha ref={captchaRef} />

        <Button
          variant="orange"
          block
          type="submit"
          disabled={!canSubmit || status === 'loading'}
        >
          {status === 'loading' ? 'Отправляем…' : 'Забронировать онлайн'}
        </Button>
      </form>
    </Modal>
  )
}
