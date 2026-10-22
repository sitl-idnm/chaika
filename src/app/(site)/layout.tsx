import { ReactNode } from 'react'
import type { Metadata } from 'next'
import { getSiteContent } from '@/shared/content'
import { OG_IMAGES } from '@/shared/lib/socialMeta'
import { Footer } from '@modules/footer'
import { Header } from '@modules/header'

import { UtmCapture } from '@/components/analytics/UtmCapture'
import { YandexMetrika } from '@/components/analytics/YandexMetrika'
import { CookieBanner } from '@/components/cookie/CookieBanner'
import { ModalHost } from '@/components/modal/ModalHost'

export async function generateMetadata(): Promise<Metadata> {
  const { meta, contacts } = await getSiteContent()

  return {
    metadataBase: new URL(contacts.site),
    title: {
      default: meta.title,
      template: meta.titleTemplate
    },
    description: meta.description,
    applicationName: meta.applicationName,
    keywords: meta.keywords,
    authors: [{ name: meta.applicationName }],
    alternates: { canonical: '/' },
    openGraph: {
      type: 'website',
      locale: 'ru_RU',
      url: contacts.site,
      siteName: meta.applicationName,
      title: meta.title,
      description: meta.description,
      images: [OG_IMAGES.home]
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [OG_IMAGES.home.url]
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large'
      }
    }
  }
}

export default async function SiteLayout({
  children
}: Readonly<{
  children: ReactNode
}>) {
  const content = await getSiteContent()

  return (
    <>
      <YandexMetrika />
      <UtmCapture />
      <div id="root">
        <Header header={content.header} contacts={content.contacts} />
        {children}
        <Footer />
      </div>

      <ModalHost
        modals={content.modals}
        forms={content.forms}
        contacts={content.contacts}
        tariffs={content.tariffs.cards.map((c) => c.name)}
      />
      <CookieBanner />
      <div id="modal-root" />
    </>
  )
}
