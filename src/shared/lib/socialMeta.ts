import type { Metadata } from 'next'

/**
 * Social previews (Telegram, VK, WhatsApp…): og:image 1200×630 per page.
 * Static files in public/og/ — rendered from the hero photo in the site style
 * (generator: /work/audits/chaikapark/tools/og.js, not part of the build).
 */
const SITE_NAME = 'Верёвочный парк «Чайка»'

const og = (file: string, alt: string) => ({
  url: `/og/${file}`,
  width: 1200,
  height: 630,
  alt
})

export const OG_IMAGES = {
  home: og('home.jpg', 'Верёвочный парк «Чайка» в Королёве'),
  rules: og('rules.jpg', 'Правила посещения — верёвочный парк «Чайка»'),
  privacy: og('privacy.jpg', 'Политика конфиденциальности — верёвочный парк «Чайка»')
}

/**
 * openGraph + twitter for an inner page. Next replaces (not merges) the
 * layout's `openGraph`, so every field is set here — otherwise the page
 * inherits og:url / og:title of the home page.
 */
export function pageSocialMeta({
  path,
  title,
  description,
  image
}: {
  path: string
  title: string
  description: string
  image: ReturnType<typeof og>
}): Pick<Metadata, 'openGraph' | 'twitter'> {
  const fullTitle = `${title} — ${SITE_NAME}`
  return {
    openGraph: {
      type: 'website',
      locale: 'ru_RU',
      url: path,
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      images: [image]
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image.url]
    }
  }
}
