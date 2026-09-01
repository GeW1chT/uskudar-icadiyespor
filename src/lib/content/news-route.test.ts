import { describe, expect, it } from 'vitest'
import { newsHref } from './news-route'

describe('newsHref', () => {
  it('creates a public detail path from the news slug', () => {
    expect(newsHref('sezon-acilis-duyurusu')).toBe('/haberler/sezon-acilis-duyurusu')
  })

  it('encodes a route segment before using it in a URL', () => {
    expect(newsHref('haber / deneme')).toBe('/haberler/haber%20%2F%20deneme')
  })
})
