'use client'

import { FC, FormEvent, useState } from 'react'
import { Button } from '@ui/button'
import { PhoneInput } from '@/components/form/PhoneInput'
import { isCompleteRuPhone } from '@/shared/lib/phone'
import { submitLead } from '@/shared/lib/leads'
import { GOALS, ymGoal } from '@/shared/lib/metrika'
import { Modal } from './Modal'
import { ThanksBody } from './ThanksBody'

import styles from './modal.module.scss'

export const BookingModal: FC<{ onClose: () => void }> = ({ onClose }) => {
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
    const res = await submitLead({ form: 'booking', name, phone })

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
            <a href="/privacy">Политики обработки персональных данных</a> и даю
            согласие на обработку моих персональных данных.
          </span>
        </label>

        {status === 'error' && (
          <p className={styles.error}>
            Не удалось отправить заявку. Попробуйте ещё раз или позвоните нам.
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
    </Modal>
  )
}
