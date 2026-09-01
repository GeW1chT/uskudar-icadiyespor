export function safeAdminRedirect(value: string | null | undefined) {
  if (!value || !value.startsWith('/admin') || value.startsWith('//')) {
    return '/admin'
  }

  return value
}
