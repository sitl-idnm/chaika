'use client'

import { FC } from 'react'
import { formatRuPhone } from '@/shared/lib/phone'

type PhoneInputProps = {
  id?: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  required?: boolean
  className?: string
}

/**
 * Controlled phone field with a hard RU mask `+7 (999) 999-99-99`.
 * Re-formats on every keystroke/paste; emits the masked string upward.
 */
export const PhoneInput: FC<PhoneInputProps> = ({
  id,
  value,
  onChange,
  placeholder = '+7 (999) 999-99-99',
  required,
  className
}) => (
  <input
    id={id}
    type="tel"
    inputMode="tel"
    autoComplete="tel"
    placeholder={placeholder}
    required={required}
    className={className}
    value={value}
    onChange={(e) => onChange(formatRuPhone(e.target.value))}
  />
)
