/**
 * RU phone mask helpers — hard `+7 (999) 999-99-99` format.
 * `formatRuPhone` is idempotent, so it can be used directly as a controlled
 * input's value transformer on every keystroke and paste.
 */

/** Format any raw input (digits, pasted `+7…`, leading 8) to the RU mask. */
export function formatRuPhone(input: string): string {
  let digits = input.replace(/\D/g, '')
  if (!digits) return ''

  // Normalise the country code: 8XXX / 7XXX / bare 10 digits → 7XXXXXXXXXX
  if (digits[0] === '8') digits = '7' + digits.slice(1)
  if (digits[0] !== '7') digits = '7' + digits
  digits = digits.slice(0, 11)

  const p = digits.slice(1) // up to 10 national digits
  let out = '+7'
  if (p.length) out += ` (${p.slice(0, 3)}`
  if (p.length >= 3) out += `) ${p.slice(3, 6)}`
  if (p.length >= 6) out += `-${p.slice(6, 8)}`
  if (p.length >= 8) out += `-${p.slice(8, 10)}`
  return out
}

/** True once a full 11-digit RU number has been entered. */
export function isCompleteRuPhone(input: string): boolean {
  return input.replace(/\D/g, '').length === 11
}

/** Bare digits (e.g. for tel: links or the API payload): `79991234567`. */
export function phoneDigits(input: string): string {
  return input.replace(/\D/g, '')
}
