import { ReactNode } from 'react'
import { Footer } from '@modules/footer'
import { Header } from '@modules/header'
import { ModalHost } from '@/components/modal/ModalHost'
import { CookieBanner } from '@/components/cookie/CookieBanner'
import { YandexMetrika } from '@/components/analytics/YandexMetrika'
import { Inter_Tight, Arsenal } from 'next/font/google'

import '@styles/global.scss'

import { Provider } from '@service/provider'

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
