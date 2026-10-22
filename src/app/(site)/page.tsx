import { getSiteContent } from '@/shared/content'
import { HomeView } from '@views/home'

/**
 * schema.org для поиска: только данные, которые есть на сайте (контакты из
 * админки). Часы не размечены: на сайте «Июнь–август: с 11:00 до 19:00» без
 * дней недели и точных дат сезона — openingHoursSpecification из этого не
 * собрать без домысливания. Координаты — точка организации из виджета карты.
 */
async function LocalBusinessJsonLd() {
  const { contacts, meta } = await getSiteContent()
  const [locality, ...street] = contacts.address.split(',')

  const data = {
    '@context': 'https://schema.org',
    '@type': 'SportsActivityLocation',
    name: meta.applicationName,
    description: meta.description,
    url: contacts.site,
    image: `${contacts.site}/og/home.jpg`,
    telephone: contacts.phoneHref.replace(/^tel:/, ''),
    email: contacts.email,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'RU',
      addressLocality: locality.trim(),
      streetAddress: street.join(',').replace(/\s*\(.*\)\s*$/, '').trim()
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 55.940463,
      longitude: 37.834791
    },
    hasMap: contacts.maps,
    sameAs: [contacts.vk, contacts.telegram].filter(Boolean)
  }

  return (
    <script
      type="application/ld+json"
      // JSON.stringify не экранирует «<» — защищаемся от «</script>» в контенте админки
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c')
      }}
    />
  )
}

export default function Home() {
  return (
    <>
      <LocalBusinessJsonLd />
      <HomeView />
    </>
  )
}
