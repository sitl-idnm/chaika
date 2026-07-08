import type { Metadata } from 'next'
import { HomeView } from '@views/home'

export const metadata: Metadata = {
  title: 'Верёвочный парк «Чайка» в Королёве',
  description:
    'Верёвочный парк «Чайка» для всей семьи в Королёве: 4 трассы для всех возрастов, батут, праздники под ключ. Сопровождение инструктором, непрерывная страховка.'
}

export default function Home() {
  return <HomeView />
}
