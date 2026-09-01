export function newsHref(slug: string) {
  return `/haberler/${encodeURIComponent(slug)}`
}
