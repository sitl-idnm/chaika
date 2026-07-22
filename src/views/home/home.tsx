import { FC } from 'react'

import Care from './sections/care/Care'
import Hammock from './sections/hammock/Hammock'
import Hero from './sections/hero/Hero'
import Party from './sections/party/Party'
import Safety from './sections/safety/Safety'
import Tracks from './sections/tracks/Tracks'

const Home: FC = () => {
  return (
    <main>
      <Hero />
      <Care />
      <Tracks />
      <Hammock />
      <Party />
      <Safety />
    </main>
  )
}

export default Home
