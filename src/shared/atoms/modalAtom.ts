import { atom } from 'jotai'

export type ModalId = 'booking' | 'event' | null

/** Which global modal is currently open (null = none). */
export const modalAtom = atom<ModalId>(null)
