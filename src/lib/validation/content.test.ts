import { describe, expect, it } from 'vitest'
import { newsInputSchema } from '@/lib/validation/content'

describe('newsInputSchema', () => {
  it('rejects a publish request without a publish date', () => {
    expect(() => newsInputSchema.parse({ title: 'Kulüpten önemli haber', slug: 'kulup-haberi', summary: 'Yeterince uzun haber özeti burada yer alır.', content: 'Yeterince uzun haber içeriği burada yer alır.', category: 'Kulüp', status: 'published', publishedAt: '' })).toThrow()
  })

  it('accepts a valid published news input', () => {
    expect(newsInputSchema.parse({ title: 'Kulüpten önemli haber', slug: 'kulup-haberi', summary: 'Yeterince uzun haber özeti burada yer alır.', content: 'Yeterince uzun haber içeriği burada yer alır.', category: 'Kulüp', status: 'published', publishedAt: '2026-09-01T12:00' }).status).toBe('published')
  })
})
