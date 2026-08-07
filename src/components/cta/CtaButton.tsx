'use client'

import { FC, ReactNode } from 'react'
import { modalAtom, ModalId, tariffPrefillAtom } from '@/shared/atoms/modalAtom'
import { GOALS, ymGoal } from '@/shared/lib/metrika'
import { Button } from '@ui/button'
import { useSetAtom } from 'jotai'

type CtaButtonProps = {
  modal: Exclude<ModalId, null>
  variant?: 'orange' | 'light'
  bordered?: boolean
  block?: boolean
  /** Pre-select this tariff in the event form (used by tariff cards). */
  tariff?: string
  children: ReactNode
}

/** Client CTA that opens a global modal — usable inside server components. */
export const CtaButton: FC<CtaButtonProps> = ({
  modal,
  variant = 'orange',
  bordered,
  block,
  tariff,
  children
}) => {
  const setModal = useSetAtom(modalAtom)
  const setTariffPrefill = useSetAtom(tariffPrefillAtom)

  const open = () => {
    ymGoal(modal === 'booking' ? GOALS.openBooking : GOALS.openEvent)
    setTariffPrefill(tariff ?? '')
    setModal(modal)
  }

  return (
    <Button variant={variant} bordered={bordered} block={block} onClick={open}>
      {children}
    </Button>
  )
}
