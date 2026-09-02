import { describe, expect, it } from 'vitest'
import { actionErrorMessage } from './action-result'

describe('actionErrorMessage', () => {
  it('returns the validation message supplied by the server-side schema', () => {
    expect(actionErrorMessage({ issues: [{ message: 'Başlık en az 3 karakter olmalıdır.' }] })).toBe('Başlık en az 3 karakter olmalıdır.')
  })

  it('keeps the explicit delete confirmation guidance actionable', () => {
    expect(actionErrorMessage(new Error('Silme işlemini onaylamalısınız.'))).toBe('Silme işlemini onaylamalısınız.')
  })

  it('does not expose unexpected server error details to an admin user', () => {
    expect(actionErrorMessage(new Error('database connection details'))).toBe('İşlem tamamlanamadı. Lütfen bilgileri kontrol edip tekrar deneyin.')
  })
})
