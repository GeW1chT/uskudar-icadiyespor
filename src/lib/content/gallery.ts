export type GallerySource = { id: string; title: string; image_path: string; [key: string]: unknown }

export function attachSignedGalleryUrls<T extends GallerySource>(items: T[], signedUrls: Map<string, string>) {
  return items.flatMap((item) => {
    const signedUrl = signedUrls.get(item.image_path)
    return signedUrl ? [{ ...item, signedUrl }] : []
  })
}
