'use client'

import { FC, ReactNode, useEffect, useRef, useState } from 'react'
import { CONSENT_EVENT, hasConsent } from '@/shared/lib/metrika'

import styles from './widgets.module.scss'

type LazyFrameProps = {
  src: string
  title: string
  frameClassName: string
  placeholderClassName: string
  /** Текст на статичной заглушке (по клику виджет грузится сразу). */
  placeholder: ReactNode
  allowFullScreen?: boolean
}

/** Заранее открыть соединение с доменом виджета, когда блок на подходе. */
function preconnect(href: string) {
  const origin = new URL(href).origin
  if (document.head.querySelector(`link[rel="preconnect"][href="${origin}"]`))
    return
  const link = document.createElement('link')
  link.rel = 'preconnect'
  link.href = origin
  document.head.appendChild(link)
}

/**
 * Iframe виджета Яндекса, который не грузится на старте страницы: вместо него
 * статичная заглушка того же размера. Виджеты Яндекса ставят свои cookie
 * (yandexuid и др.), поэтому сами по прокрутке они грузятся только после
 * «Принять» в cookie-баннере (за ~1 экран — preconnect, за 300px — iframe).
 * До согласия — только по клику на заглушку: это явное действие посетителя.
 */
export const LazyFrame: FC<LazyFrameProps> = ({
  src,
  title,
  frameClassName,
  placeholderClassName,
  placeholder,
  allowFullScreen
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState(false)
  const [consent, setConsent] = useState(false)

  useEffect(() => {
    if (hasConsent()) {
      setConsent(true)
      return
    }
    const onConsent = () => setConsent(true)
    window.addEventListener(CONSENT_EVENT, onConsent, { once: true })
    return () => window.removeEventListener(CONSENT_EVENT, onConsent)
  }, [])

  useEffect(() => {
    const el = ref.current
    if (show || !consent || !el) return
    if (typeof IntersectionObserver === 'undefined') {
      setShow(true)
      return
    }

    const far = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        preconnect(src)
        far.disconnect()
      },
      { rootMargin: '1000px 0px' }
    )
    const near = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setShow(true)
        near.disconnect()
      },
      { rootMargin: '300px 0px' }
    )
    far.observe(el)
    near.observe(el)
    return () => {
      far.disconnect()
      near.disconnect()
    }
  }, [show, consent, src])

  return (
    <div ref={ref} className={styles.lazy}>
      {show ? (
        <iframe
          className={frameClassName}
          src={src}
          title={title}
          allowFullScreen={allowFullScreen}
        />
      ) : (
        <button
          type="button"
          className={placeholderClassName}
          onClick={() => setShow(true)}
          aria-label={
            typeof placeholder === 'string' ? `${placeholder}: ${title}` : title
          }
        >
          {placeholder}
        </button>
      )}
    </div>
  )
}
