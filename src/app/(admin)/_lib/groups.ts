import { type SiteContent } from '@/shared/content/defaults'

export type GroupId = Exclude<keyof SiteContent, 'metrika'>

export type GroupDef = {
  id: GroupId
  title: string
  desc: string
}

/** Editable content groups shown as dashboard cards and sidebar links. */
export const GROUPS: GroupDef[] = [
  { id: 'contacts', title: 'Контакты и ссылки', desc: 'Телефон, VK, Telegram, сайт, адрес, часы работы.' },
  { id: 'hero', title: 'Главный экран', desc: 'Заголовок, кнопки и плашки первого экрана.' },
  { id: 'care', title: 'Забота о детях', desc: 'Заголовок и карточки блока «Парк, где заботятся».' },
  { id: 'hammock', title: 'Блок «Гамак»', desc: 'Тексты про инструктора и присмотр.' },
  { id: 'tracks', title: 'Трассы и цены', desc: 'Описание, таблица цен, карты трасс, батут.' },
  { id: 'party', title: 'Праздники', desc: 'Программа мероприятий, список, цена.' },
  { id: 'tariffs', title: 'Тарифы', desc: 'Карточки тарифов, тайминг, панели «В каждом тарифе» и «Как забронировать».' },
  { id: 'safety', title: 'Безопасность', desc: 'Заголовок, преимущества, контактный блок.' },
  { id: 'header', title: 'Шапка', desc: 'Пункты меню и подпись ссылки маршрута.' },
  { id: 'footer', title: 'Футер', desc: 'Реквизиты, юр. ссылки, подпись ВК.' },
  { id: 'forms', title: 'Формы заявок', desc: 'Подписи полей, согласие, кнопки.' },
  { id: 'modals', title: 'Окна заявок', desc: 'Заголовки модальных окон и «спасибо».' },
  { id: 'meta', title: 'SEO / мета', desc: 'Title, description и ключевые слова.' },
  { id: 'legal', title: 'Документы', desc: 'Политика конфиденциальности и правила.' }
]

export function groupById(id: string): GroupDef | undefined {
  return GROUPS.find((g) => g.id === id)
}
