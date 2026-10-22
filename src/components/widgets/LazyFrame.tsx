'use client'

import { FC, ReactNode, useEffect, useRef, useState } from 'react'

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
 * статичная заглушка того же размера. Виджет подгружается при прокрутке к блоку
 * (за ~1 экран — preconnect, за 300px — сам iframe) или сразу по клику.
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

  useEffect(() => {
    const el = ref.current
    if (show || !el) return
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
  }, [show, src])

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
          aria-label={title}
        >
          {placeholder}
        </button>
      )}
    </div>
  )
}
