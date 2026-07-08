import { FC, ReactNode } from 'react'

export type GlyphName =
  | 'map-pin'
  | 'telegram'
  | 'phone'
  | 'paper-plane'
  | 'clock'

const PATHS: Record<GlyphName, ReactNode> = {
  'map-pin': (
    <>
      <path d="M12 21c5-4.5 7.5-8 7.5-11.5A7.5 7.5 0 0 0 4.5 9.5C4.5 13 7 16.5 12 21Z" />
      <circle cx="12" cy="9.5" r="2.6" />
    </>
  ),
  telegram: (
    <>
      <path d="M20.5 4.5 2.8 11.3c-.7.3-.7 1.2 0 1.5l3.9 1.4 1.6 4.7c.2.6 1 .7 1.4.2l2.1-2.4 4 3c.5.4 1.2.1 1.4-.5l3.3-13c.2-.8-.6-1.5-1.5-1.2Z" />
      <path d="M8.7 14.2 18 7.3" />
    </>
  ),
  phone: (
    <path d="M6.6 4h2.2l1.4 3.4-1.7 1.3a11 11 0 0 0 5.1 5.1l1.3-1.7L18.3 15v2.2a1.8 1.8 0 0 1-2 1.8A14.5 14.5 0 0 1 4.8 6a1.8 1.8 0 0 1 1.8-2Z" />
  ),
  'paper-plane': (
    <>
      <path d="M20.5 4.5 3.8 10.2c-.8.3-.8 1.4 0 1.6l6.5 1.9 1.9 6.5c.2.8 1.3.8 1.6 0L20.5 4.5Z" />
      <path d="M10.3 13.7 20.5 4.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.2" />
      <path d="M12 7.5V12l3 2" />
    </>
  )
}

type GlyphProps = {
  name: GlyphName
  size?: number
  className?: string
}

export const Glyph: FC<GlyphProps> = ({ name, size = 24, className }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.6}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {PATHS[name]}
  </svg>
)
