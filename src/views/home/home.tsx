import { getSiteContent } from '@/shared/content'

import Care from './sections/care/Care'
import Hammock from './sections/hammock/Hammock'
import Hero from './sections/hero/Hero'
import Party from './sections/party/Party'
import Safety from './sections/safety/Safety'
import Tariffs from './sections/tariffs/Tariffs'
import Tracks from './sections/tracks/Tracks'

const Home = async () => {
  const content = await getSiteContent()

  return (
    <main>
      <Hero data={content.hero} />
      <Care data={content.care} />
      <Tracks data={content.tracks} />
      <Hammock data={content.hammock} />
      <Party data={content.party} />
      <Tariffs data={content.tariffs} />
      <Safety
        data={content.safety}
        forms={content.forms}
        contacts={content.contacts}
      />
    </main>
  )
}

export default Home
