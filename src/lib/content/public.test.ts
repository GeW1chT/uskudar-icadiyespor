import { describe, expect, it } from 'vitest'
import { attachSignedGalleryUrls } from './gallery'

describe('attachSignedGalleryUrls', () => {
  it('keeps only gallery items that received a signed URL', () => {
    const result = attachSignedGalleryUrls([
      { id: 'one', title: 'Antrenman', image_path: 'gallery/one.jpg' },
      { id: 'two', title: 'Etkinlik', image_path: 'gallery/two.jpg' },
    ], new Map([['gallery/one.jpg', 'https://example.test/signed-one']]))

    expect(result).toEqual([{ id: 'one', title: 'Antrenman', image_path: 'gallery/one.jpg', signedUrl: 'https://example.test/signed-one' }])
  })
})
