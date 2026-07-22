/**
 * Google Sheets writer via a Google Apps Script Web App — no GCP project, no
 * service account, no billing. The bound script (see docs) receives a POST of
 * `{ secret, rows }`, dedupes by lead id (column A) and appends.
 *
 * Requires env: SHEETS_WEBAPP_URL (the script's /exec URL), SHEETS_WEBAPP_SECRET.
 */

export function sheetsConfigured(): boolean {
  return Boolean(process.env.SHEETS_WEBAPP_URL)
}

/** Append one or more rows. Dedup by lead id happens inside the Apps Script. */
export async function appendLeadRows(rows: string[][]): Promise<void> {
  const url = process.env.SHEETS_WEBAPP_URL
  if (!url) throw new Error('SHEETS_WEBAPP_URL not set')
  if (rows.length === 0) return

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // Apps Script /exec answers a 302 → googleusercontent; fetch follows it.
    redirect: 'follow',
    body: JSON.stringify({
      secret: process.env.SHEETS_WEBAPP_SECRET || '',
      rows
    })
  })

  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    throw new Error(`sheets webapp ${res.status}: ${detail}`)
  }
}

export async function appendLeadRow(row: string[]): Promise<void> {
  return appendLeadRows([row])
}
