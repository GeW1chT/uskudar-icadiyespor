import { deleteNews, saveNews } from '@/app/admin/content-actions'
import { requireAdmin } from '@/lib/auth/require-admin'

const field = 'mt-1 w-full min-w-0 rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-red-500'

export default async function NewsAdminPage() {
  const { supabase } = await requireAdmin()
  const { data: news } = await supabase.from('news').select('*').order('created_at', { ascending: false })
  return <section className="space-y-8"><div><p className="text-sm font-semibold text-red-600">Duyurular</p><h1 className="text-3xl font-bold tracking-tight">Haber yönetimi</h1></div><NewsForm action={saveNews} />
    <div className="space-y-3"><h2 className="text-xl font-bold">Haberler</h2>{news?.length ? news.map((item) => <details key={item.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><summary className="cursor-pointer font-semibold">{item.title} <span className="text-sm font-normal text-slate-500">{item.status === 'published' ? 'Yayında' : 'Taslak'}</span></summary><div className="mt-4"><NewsForm action={saveNews} item={item} /><form action={deleteNews} className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-end"><input type="hidden" name="id" value={item.id} /><input name="confirmation" required placeholder="DELETE yazın" className={field} /><button className="rounded-lg border border-red-700 px-3 py-2 text-red-700">Sil</button></form></div></details>) : <p className="rounded border border-dashed p-6 text-slate-500">Henüz haber yok.</p>}</div></section>
}

function NewsForm({ action, item }: { action: (data: FormData) => Promise<void>; item?: Record<string, unknown> }) {
  const value = (key: string) => String(item?.[key] ?? '')
  const date = value('published_at') ? value('published_at').slice(0, 16) : ''
  return <form action={action} className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5 md:grid-cols-2"><input type="hidden" name="id" value={value('id')} /><h2 className="md:col-span-2 font-bold">{item ? 'Haberi düzenle' : 'Yeni haber'}</h2><label>Başlık<input required name="title" defaultValue={value('title')} className={field} /></label><label>Slug<input required name="slug" defaultValue={value('slug')} className={field} placeholder="haber-basligi" /></label><label>Kategori<input required name="category" defaultValue={value('category')} className={field} /></label><label>Durum<select name="status" defaultValue={value('status') || 'draft'} className={field}><option value="draft">Taslak</option><option value="published">Yayında</option></select></label><label>Yayın tarihi<input type="datetime-local" name="publishedAt" defaultValue={date} className={field} /></label><label className="md:col-span-2">Özet<textarea required name="summary" defaultValue={value('summary')} className={field} /></label><label className="md:col-span-2">İçerik<textarea required name="content" defaultValue={value('content')} className={`${field} min-h-40`} /></label><button className="w-full rounded-lg bg-red-700 px-4 py-2 font-semibold text-white hover:bg-red-800 md:w-auto">{item ? 'Güncelle' : 'Haber oluştur'}</button></form>
}
