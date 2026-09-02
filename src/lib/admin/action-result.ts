export type AdminActionResult = {
  ok: boolean
  message?: string
}

const safeMessages = new Set([
  'Silme işlemini onaylamalısınız.',
  'Bağlı kadro veya maç kaydı bulunan takım silinemez.',
  'Takım kaydedilemedi.',
  'Kadro kaydı kaydedilemedi.',
  'Kadro kaydı silinemedi.',
  'Maç kaydedilemedi.',
  'Maç silinemedi.',
  'Haber kaydedilemedi.',
  'Haber silinemedi.',
  'Görsel yüklenemedi.',
  'Galeri kaydı kaydedilemedi.',
  'Galeri kaydı silinemedi.',
  'Site ayarları kaydedilemedi.',
])

export function actionErrorMessage(error: unknown) {
  if (typeof error === 'object' && error !== null && 'issues' in error) {
    const issues = (error as { issues?: Array<{ message?: unknown }> }).issues
    const message = issues?.[0]?.message
    if (typeof message === 'string' && message) return message
  }

  if (error instanceof Error && safeMessages.has(error.message)) return error.message

  return 'İşlem tamamlanamadı. Lütfen bilgileri kontrol edip tekrar deneyin.'
}
