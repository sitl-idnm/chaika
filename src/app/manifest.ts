import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Верёвочный парк «Чайка»',
    short_name: 'Чайка',
    description:
      'Верёвочный парк «Чайка» в Королёве — трассы для всей семьи, батут и мероприятия под ключ.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f0f0f0',
    theme_color: '#355c4b',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' }
    ]
  }
}
