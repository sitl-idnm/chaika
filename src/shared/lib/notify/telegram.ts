/** Telegram delivery channel for site leads. */

import type { Agent } from 'node:http'
import { request } from 'node:https'
import { HttpsProxyAgent } from 'https-proxy-agent'
import { SocksProxyAgent } from 'socks-proxy-agent'

import { esc, LeadBody, leadFields, leadTitle, utmEntries } from './lead'

/** The Bot API host is unreachable from RU hosting — go through a proxy. */
const TIMEOUT_MS = 10_000

// TELEGRAM_PROXY_URL: socks5://user:pass@host:port or http(s)://user:pass@host:port
let proxyAgent: Agent | null | undefined
function getProxyAgent(): Agent | null {
  if (proxyAgent !== undefined) return proxyAgent
  const url = process.env.TELEGRAM_PROXY_URL
  proxyAgent = !url
    ? null
    : url.startsWith('socks')
      ? new SocksProxyAgent(url)
      : new HttpsProxyAgent(url)
  return proxyAgent
}

/** POST JSON to the Bot API via node:https (agent = optional proxy). */
function postJson(
  url: string,
  payload: unknown
): Promise<{ status: number; body: string }> {
  const data = JSON.stringify(payload)
  return new Promise((resolve, reject) => {
    const req = request(
      url,
      {
        method: 'POST',
        agent: getProxyAgent() ?? undefined,
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(data)
        },
        timeout: TIMEOUT_MS
      },
      (res) => {
        let body = ''
        res.setEncoding('utf8')
        res.on('data', (chunk) => (body += chunk))
        res.on('end', () => resolve({ status: res.statusCode ?? 0, body }))
      }
    )
    req.on('timeout', () => req.destroy(new Error('telegram timeout')))
    req.on('error', reject)
    req.end(data)
  })
}

function buildMessage(b: LeadBody): string {
  const lines = [`<b>${esc(leadTitle(b.form))}</b>`]

  // Main fields — Страница и UTM выносим в отдельные блоки ниже.
  for (const [label, value] of leadFields(b)) {
    if (label === 'Страница' || label === 'UTM') continue
    lines.push(`<b>${esc(label)}:</b> ${esc(value)}`)
  }

  // Блок «Страница» отделяем пустой строкой.
  if (b.page?.trim()) {
    lines.push('', `<b>Страница:</b> ${esc(b.page.trim())}`)
  }

  // UTM — каждая метка на своей строке, чтобы не было полотна.
  const utm = utmEntries(b)
  if (utm.length) {
    lines.push('', '<b>UTM-метки</b>')
    for (const [key, value] of utm) {
      lines.push(`  ${esc(key)}: <code>${esc(value)}</code>`)
    }
  }

  // Пустая строка-разделитель между заголовком и первым полем.
  lines.splice(1, 0, '')

  return lines.join('\n')
}

export type DeliveryResult = { ok: boolean; skipped?: boolean; error?: string }

export async function sendTelegram(b: LeadBody): Promise<DeliveryResult> {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) {
    console.warn('[lead] Telegram creds not set — skipping Telegram delivery')
    return { ok: false, skipped: true }
  }

  try {
    const res = await postJson(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        chat_id: chatId,
        text: buildMessage(b),
        parse_mode: 'HTML',
        disable_web_page_preview: true
      }
    )

    if (res.status !== 200) {
      console.error('[lead] Telegram error', res.status, res.body)
      return { ok: false, error: `telegram ${res.status}` }
    }
    return { ok: true }
  } catch (e) {
    console.error('[lead] Telegram request failed', e)
    return { ok: false, error: 'telegram request failed' }
  }
}
