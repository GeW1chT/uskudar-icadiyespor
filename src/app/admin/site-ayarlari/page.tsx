import { saveSettings } from '@/app/admin/content-actions'
import { AdminActionForm, AdminSubmitButton } from '@/components/admin/AdminActionForm'
import { requireAdmin } from '@/lib/auth/require-admin'

const field = 'mt-1 w-full min-w-0 rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-red-500'

export default async function SiteSettingsAdminPage() {
  const { supabase } = await requireAdmin()
  const { data: settings } = await supabase.from('site_settings').select('*').eq('id', true).maybeSingle()
  const value = (key: string) => String(settings?.[key as keyof NonNullable<typeof settings>] ?? '')

  return <section className="space-y-8"><div><p className="text-sm font-semibold text-red-600">Genel bilgiler</p><h1 className="text-3xl font-bold tracking-tight">Site ve iletişim ayarları</h1><p className="mt-2 text-sm text-slate-600">Kaydedilen bilgiler ana sayfa ve iletişim sayfasında görüntülenir.</p></div>
    <AdminActionForm action={saveSettings} successMessage="Değişiklikler kaydedildi." className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5 md:grid-cols-2"><label>Ana sayfa başlığı<input required name="homeHeroTitle" defaultValue={value('home_hero_title')} className={field} /></label><label>E-posta<input required type="email" name="email" defaultValue={value('email')} className={field} /></label><label className="md:col-span-2">Ana sayfa metni<textarea name="homeHeroText" defaultValue={value('home_hero_text')} className={field} /></label><label className="md:col-span-2">Kulüp açıklaması<textarea name="clubDescription" defaultValue={value('club_description')} className={`${field} min-h-28`} /></label><label className="md:col-span-2">Adres<textarea name="address" defaultValue={value('address')} className={field} /></label><label>Telefon<input name="phone" defaultValue={value('phone')} className={field} /></label><label>Instagram URL<input type="url" name="instagramUrl" defaultValue={value('instagram_url')} className={field} /></label><label>Facebook URL<input type="url" name="facebookUrl" defaultValue={value('facebook_url')} className={field} /></label><label>YouTube URL<input type="url" name="youtubeUrl" defaultValue={value('youtube_url')} className={field} /></label><AdminSubmitButton pendingLabel="Kaydediliyor..." className="w-full rounded-lg bg-red-700 px-4 py-2 font-semibold text-white hover:bg-red-800 md:w-auto">Ayarları kaydet</AdminSubmitButton></AdminActionForm>
  </section>
}
