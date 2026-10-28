import 'server-only'

import { unstable_cache } from 'next/cache'
import { Pool } from 'pg'

/**
 * Server-only store for the single `site_content` row (admin overrides) in the
 * site's own PostgreSQL (same VPS, 127.0.0.1). Reads are cached under
 * CONTENT_TAG so public pages stay static and refresh on admin save via
 * revalidateTag(CONTENT_TAG). Without DATABASE_URL (local dev) the site falls
 * back to code defaults.
 */
const ROW_ID = 1

/** Cache tag for the public content read — busted on admin save. */
export const CONTENT_TAG = 'site-content'

// One pool per server process (survives dev hot-reload via globalThis).
const globalForPg = globalThis as unknown as { chaikaPgPool?: Pool }

function pool(): Pool | null {
  const url = process.env.DATABASE_URL
  if (!url) return null
  globalForPg.chaikaPgPool ??= new Pool({ connectionString: url, max: 3 })
  return globalForPg.chaikaPgPool
}

type ContentRow = { data: Record<string, unknown>; updated_at: string }

const readRow = unstable_cache(
  async (): Promise<ContentRow | null> => {
    const db = pool()
    if (!db) return null
    const { rows } = await db.query<{
      data: Record<string, unknown>
      updated_at: Date
    }>('SELECT data, updated_at FROM site_content WHERE id = $1', [ROW_ID])
    if (!rows[0]) return null
    // Date → string: the cache stores JSON
    return { data: rows[0].data, updated_at: rows[0].updated_at.toISOString() }
  },
  ['site-content-row'],
  { tags: [CONTENT_TAG], revalidate: 60 }
)

/** Raw override JSON stored in the DB (partial, deep-merged over defaults). */
export async function readContentOverride(): Promise<Record<string, unknown>> {
  return (await readRow())?.data ?? {}
}

/** When the content was last saved in the admin (null if unknown). */
export async function readContentUpdatedAt(): Promise<Date | null> {
  try {
    const row = await readRow()
    const date = row ? new Date(row.updated_at) : null
    return date && !Number.isNaN(date.getTime()) ? date : null
  } catch {
    return null
  }
}

/** Overwrite the override JSON. */
export async function writeContentOverride(
  data: Record<string, unknown>
): Promise<void> {
  const db = pool()
  if (!db) throw new Error('DATABASE_URL is not set')
  await db.query(
    `INSERT INTO site_content (id, data, updated_at) VALUES ($1, $2, now())
     ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data, updated_at = now()`,
    [ROW_ID, JSON.stringify(data)]
  )
}
