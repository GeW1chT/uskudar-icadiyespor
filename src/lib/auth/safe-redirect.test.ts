import { describe, expect, it } from 'vitest'
import { safeAdminRedirect } from '@/lib/auth/safe-redirect'

describe('safeAdminRedirect', () => {
  it('keeps an internal admin destination', () => {
    expect(safeAdminRedirect('/admin/haberler')).toBe('/admin/haberler')
  })

  it('rejects external and non-admin redirect destinations', () => {
    expect(safeAdminRedirect('https://example.com')).toBe('/admin')
    expect(safeAdminRedirect('//example.com')).toBe('/admin')
    expect(safeAdminRedirect('/haberler')).toBe('/admin')
  })
})
