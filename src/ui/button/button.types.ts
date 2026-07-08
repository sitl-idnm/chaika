import { ComponentProps, ElementType, ReactNode } from 'react'

export type ButtonVariant = 'orange' | 'light'

type ButtonOwnProps<E extends ElementType = ElementType> = {
  as?: E
  variant?: ButtonVariant
  block?: boolean
  className?: string
  children?: ReactNode
}

export type ButtonProps<E extends ElementType> = ButtonOwnProps<E> &
  Omit<ComponentProps<E>, keyof ButtonOwnProps>
