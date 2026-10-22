import { ReactNode } from 'react'
import type { Viewport } from 'next'
import { Arsenal, Inter_Tight } from 'next/font/google'

import '@styles/global.scss'

import { Provider } from '@service/provider'

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
  // 700 нигде не рендерится (hero/404 — 400; .brandMark/.loginTitle в
  // админке не используются) — не тянем лишние файлы на первый экран.
  weight: ['400'],
  variable: '--font-arsenal',
  display: 'swap'
})

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="ru" className={`${interTight.variable} ${arsenal.variable}`}>
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
