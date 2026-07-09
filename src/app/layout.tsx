import { ReactNode } from 'react'
import type { Metadata, Viewport } from 'next'
import { Footer } from '@modules/footer'
import { Header } from '@modules/header'
import { ModalHost } from '@/components/modal/ModalHost'
import { CookieBanner } from '@/components/cookie/CookieBanner'
import { YandexMetrika } from '@/components/analytics/YandexMetrika'
import { CONTACTS } from '@/shared/const/contacts'
import { Inter_Tight, Arsenal } from 'next/font/google'

import '@styles/global.scss'

import { Provider } from '@service/provider'

const description =
  'Верёвочный парк «Чайка» в Королёве — 4 трассы для всей семьи: детская, ' +
  'учебная и взрослые маршруты, батут, дни рождения и мероприятия под ключ. ' +
  'Непрерывная страховка и бесплатный инструктор для детской трассы.'

export const metadata: Metadata = {
  metadataBase: new URL(CONTACTS.site),
  title: {
    default: 'Верёвочный парк «Чайка» в Королёве — трассы для всей семьи',
    template: '%s — Верёвочный парк «Чайка»'
  },
  description,
  applicationName: 'Верёвочный парк «Чайка»',
  keywords: [
    'верёвочный парк',
    'Чайка',
    'Королёв',
    'верёвочный парк Королёв',
    'активный отдых',
    'детская трасса',
    'день рождения',
    'мероприятия для детей',
    'батут'
  ],
  authors: [{ name: 'Верёвочный парк «Чайка»' }],
  alternates: {
    canonical: '/'
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: CONTACTS.site,
    siteName: 'Верёвочный парк «Чайка»',
    title: 'Верёвочный парк «Чайка» в Королёве — трассы для всей семьи',
    description
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

export const viewport: Viewport = {
  themeColor: '#355c4b',
  width: 'device-width',
  initialScale: 1
}

const interTight = Inter_Tight({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter-tight',
  display: 'swap'
})

const arsenal = Arsenal({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '700'],
  variable: '--font-arsenal',
  display: 'swap'
})

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html
      lang="ru"
      className={`${interTight.variable} ${arsenal.variable}`}
    >
      <body>
        <YandexMetrika />
        <Provider>
          <div id="root">
            <Header />
            {children}
            <Footer />
          </div>

          <ModalHost />
          <CookieBanner />
          <div id="modal-root" />
        </Provider>
      </body>
    </html>
  )
}
