import { FC } from 'react'
import Hero from './sections/hero/Hero'
import Care from './sections/care/Care'
import Tracks from './sections/tracks/Tracks'
import Hammock from './sections/hammock/Hammock'
import Party from './sections/party/Party'
import Safety from './sections/safety/Safety'

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
