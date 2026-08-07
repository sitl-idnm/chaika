'use client'

import { FC } from 'react'
import { type SiteContent } from '@/shared/content/defaults'
import { modalAtom } from '@/shared/atoms/modalAtom'
import { useAtom } from 'jotai'

import { BookingModal } from './BookingModal'
import { EventModal } from './EventModal'

export type ModalContent = {
  modals: SiteContent['modals']
  forms: SiteContent['forms']
  contacts: SiteContent['contacts']
  /** Tariff names for the event form's «Тариф» select. */
  tariffs: string[]
}

export const ModalHost: FC<ModalContent> = ({
  modals,
  forms,
  contacts,
  tariffs
}) => {
  const [modal, setModal] = useAtom(modalAtom)
  const close = () => setModal(null)

  if (modal === 'booking')
    return (
      <BookingModal
        onClose={close}
        modals={modals}
        forms={forms}
        contacts={contacts}
        tariffs={tariffs}
      />
    )
  if (modal === 'event')
    return (
      <EventModal
        onClose={close}
        modals={modals}
        forms={forms}
        contacts={contacts}
        tariffs={tariffs}
      />
    )
  return null
}
