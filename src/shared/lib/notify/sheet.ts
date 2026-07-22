/** Google Sheets delivery channel for site leads (same sheet as VK leads). */

import { appendLeadRow, sheetsConfigured } from '@/shared/lib/sheets'
import { LeadBody, leadTitle } from './lead'
import type { DeliveryResult } from './telegram'

/** Row layout matches the VK adapter: id | date | name | phone | email | form | campaign | source. */
function leadToRow(b: LeadBody): string[] {
  const id = `site-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
  return [
    id,
    new Date().toISOString(),
    b.name?.trim() ?? '',
    b.phone?.trim() ?? '',
    b.email?.trim() ?? '',
    leadTitle(b.form),
    b.page?.trim() ?? '',
    'site'
  ]
}

export async function sendSheet(b: LeadBody): Promise<DeliveryResult> {
  if (!sheetsConfigured()) {
    console.warn('[lead] Sheets web app not set — skipping Sheets delivery')
    return { ok: false, skipped: true }
  }
  try {
    await appendLeadRow(leadToRow(b))
    return { ok: true }
  } catch (e) {
    console.error('[lead] Sheets append failed', e)
    return { ok: false, error: 'sheets append failed' }
  }
}
