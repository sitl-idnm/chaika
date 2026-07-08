'use client'

import { FC, ReactNode } from 'react'
import { useSetAtom } from 'jotai'
import { Button } from '@ui/button'
import { modalAtom, ModalId } from '@/shared/atoms/modalAtom'
import { GOALS, ymGoal } from '@/shared/lib/metrika'

type CtaButtonProps = {
  modal: Exclude<ModalId, null>
  variant?: 'orange' | 'light'
  block?: boolean
  children: ReactNode
}

/** Client CTA that opens a global modal — usable inside server components. */
export const CtaButton: FC<CtaButtonProps> = ({
  modal,
  variant = 'orange',
  block,
  children
}) => {
  const setModal = useSetAtom(modalAtom)

  const open = () => {
    ymGoal(modal === 'booking' ? GOALS.openBooking : GOALS.openEvent)
    setModal(modal)
  }

  return (
    <Button variant={variant} block={block} onClick={open}>
      {children}
    </Button>
  )
}
