import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

type LeadBody = {
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
}

const FORM_TITLES: Record<string, string> = {
  booking: '🎟️ Бронирование онлайн',
  event: '🎉 Заявка на мероприятие',
  safety: '📞 Заявка «Запишитесь прямо сейчас»'
}

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function buildMessage(b: LeadBody): string {
  const title = FORM_TITLES[b.form ?? ''] ?? '📩 Заявка с сайта'
  const lines = [`<b>${esc(title)}</b>`, '']

  const add = (label: string, value?: string) => {
    if (value && value.trim()) lines.push(`<b>${label}:</b> ${esc(value.trim())}`)
  }

  add('Имя', b.name)
  add('Телефон', b.phone)
  add('Почта', b.email)
  add('Тип мероприятия', b.eventType)
  add('Детей', b.kids)
  add('Взрослых', b.adults)
  add('Желаемая дата', b.date)

  lines.push('')
  add('Страница', b.page)
  return lines.join('\n')
}

export async function POST(req: Request) {
  let body: LeadBody
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Некорректный запрос' }, { status: 400 })
  }

  // Minimal server-side validation.
  const name = (body.name ?? '').trim()
  const phoneDigits = (body.phone ?? '').replace(/\D/g, '')
  if (!name) {
    return NextResponse.json({ error: 'Укажите имя' }, { status: 422 })
  }
  if (phoneDigits.length !== 11) {
    return NextResponse.json({ error: 'Некорректный телефон' }, { status: 422 })
  }

  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  // Graceful degradation: without creds we accept the lead so the UI works,
  // but log a warning so it's obvious delivery is not yet configured.
  if (!token || !chatId) {
    console.warn(
      '[lead] TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID not set — lead not delivered:',
      { name, phone: body.phone, form: body.form }
    )
    return NextResponse.json({ ok: true, delivered: false })
  }

  try {
    const tg = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: buildMessage(body),
        parse_mode: 'HTML',
        disable_web_page_preview: true
      })
    })

    if (!tg.ok) {
      const detail = await tg.text().catch(() => '')
      console.error('[lead] Telegram error', tg.status, detail)
      return NextResponse.json(
        { error: 'Не удалось отправить заявку' },
        { status: 502 }
      )
    }

    return NextResponse.json({ ok: true, delivered: true })
  } catch (e) {
    console.error('[lead] Telegram request failed', e)
    return NextResponse.json(
      { error: 'Не удалось отправить заявку' },
      { status: 502 }
    )
  }
}
