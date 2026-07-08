'use client'

import { FC } from 'react'
import { useAtom } from 'jotai'
import { modalAtom } from '@/shared/atoms/modalAtom'
import { BookingModal } from './BookingModal'
import { EventModal } from './EventModal'

export const ModalHost: FC = () => {
  const [modal, setModal] = useAtom(modalAtom)
  const close = () => setModal(null)

  if (modal === 'booking') return <BookingModal onClose={close} />
  if (modal === 'event') return <EventModal onClose={close} />
  return null
}
