'use client'

import { FC, FormEvent, useState } from 'react'
import { Button } from '@ui/button'
import { PhoneInput } from '@/components/form/PhoneInput'
import { NumberField } from '@/components/form/NumberField'
import { Dropdown } from '@/components/form/Dropdown'
import { isCompleteRuPhone } from '@/shared/lib/phone'
import { submitLead } from '@/shared/lib/leads'
import { GOALS, ymGoal } from '@/shared/lib/metrika'
import { Modal } from './Modal'
import { ThanksBody } from './ThanksBody'

import styles from './modal.module.scss'

export const EventModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    type: 'День Рождения',
    kids: '',
    adults: '',
    date: ''
  })
  const [agree, setAgree] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [submitted, setSubmitted] = useState(false)

  const set = (key: keyof typeof form) => (value: string) =>
    setForm((f) => ({ ...f, [key]: value }))

  const canSubmit =
    form.name.trim() !== '' && isCompleteRuPhone(form.phone) && agree

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!canSubmit || status === 'loading') return

    setStatus('loading')
    const res = await submitLead({
      form: 'event',
      name: form.name,
      phone: form.phone,
      email: form.email,
      eventType: form.type,
      kids: form.kids,
      adults: form.adults,
      date: form.date
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
        title="Ваша заявка принята!"
        subtitle="Спасибо! Мы свяжемся с вами в ближайшее время для подтверждения бронирования."
        onClose={onClose}
      >
        <ThanksBody />
      </Modal>
    )
  }

  return (
    <Modal
      title="Оставьте заявку на мероприятие"
      subtitle="Рассчитаем стоимость, согласуем дату и программу"
      onClose={onClose}
    >
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label htmlFor="e-name">Имя*</label>
          <input
            id="e-name"
            type="text"
            placeholder="Как вас зовут?"
            value={form.name}
            onChange={(e) => set('name')(e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="e-phone">Телефон*</label>
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
            <label htmlFor="e-adults">Количество взрослых:</label>
            <NumberField
              id="e-adults"
              placeholder="12"
              value={form.adults}
              onChange={set('adults')}
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
          {status === 'loading' ? 'Отправляем…' : 'Отправить заявку'}
        </Button>
      </form>
    </Modal>
  )
}
