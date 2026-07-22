/** Shared lead shape + field extraction used by every delivery channel. */

export type LeadBody = {
  form?: string
  name?: string
  phone?: string
  email?: string
  eventType?: string
  kids?: string
  adults?: string
  date?: string
  page?: string
  referrer?: string
  captchaToken?: string
}

export const FORM_TITLES: Record<string, string> = {
  booking: '🎟️ Бронирование онлайн',
  event: '🎉 Заявка на мероприятие',
  safety: '📞 Заявка «Запишитесь прямо сейчас»'
}

export function leadTitle(form?: string): string {
  return FORM_TITLES[form ?? ''] ?? '📩 Заявка с сайта'
}

/** Ordered [label, value] pairs for the filled-in fields of a lead. */
export function leadFields(b: LeadBody): Array<[string, string]> {
  const pairs: Array<[string, string]> = []
  const add = (label: string, value?: string) => {
    if (value && value.trim()) pairs.push([label, value.trim()])
  }
  add('Имя', b.name)
  add('Телефон', b.phone)
  add('Почта', b.email)
  add('Тип мероприятия', b.eventType)
  add('Детей', b.kids)
  add('Взрослых', b.adults)
  add('Желаемая дата', b.date)
  add('Страница', b.page)
  return pairs
}

/** Escape text for HTML contexts (Telegram HTML parse_mode + email body). */
export function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
