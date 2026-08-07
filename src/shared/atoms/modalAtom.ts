import { atom } from 'jotai'

export type ModalId = 'booking' | 'event' | null

/** Which global modal is currently open (null = none). */
export const modalAtom = atom<ModalId>(null)

/**
 * Tariff name to pre-select in the event form. Set when a user clicks
 * «Забронировать» on a specific tariff card; the EventModal reads it on open
 * and clears it on close. Empty string = no preset.
 */
export const tariffPrefillAtom = atom<string>('')
