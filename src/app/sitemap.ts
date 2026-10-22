import type { MetadataRoute } from 'next'
import { CONTACTS } from '@/shared/const/contacts'
import { readContentUpdatedAt } from '@/shared/lib/siteContentStore'

/**
 * Last change of the page code/layout. Bump when the pages change in code.
 * All page copy (incl. /rules and /privacy) lives in the admin content row,
 * so lastmod = the later of this date and the last admin save — a real date
 * instead of «now» on every request.
 */
const CODE_UPDATED = new Date('2026-10-22')

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const contentUpdated = await readContentUpdatedAt()
  const lastModified =
    contentUpdated && contentUpdated > CODE_UPDATED
      ? contentUpdated
      : CODE_UPDATED

  return [
    {
      url: CONTACTS.site,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1
    },
    {
      url: `${CONTACTS.site}/rules`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.4
    },
    {
      url: `${CONTACTS.site}/privacy`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3
    }
  ]
}
