import { FC } from 'react'

/** Faithful wordmark exported from Figma (light text + orange rope).
 *  Natural artwork is 85×51 → keep that ratio when only width is given. */
const RATIO = 51 / 85

type LogoProps = {
  width?: number
  height?: number
  className?: string
}

export const Logo: FC<LogoProps> = ({ width = 85, height, className }) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img
    src="/icons/logo.svg"
    alt="Чайка — верёвочный парк"
    width={width}
    height={height ?? Math.round(width * RATIO)}
    className={className}
  />
)
