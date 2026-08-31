import { deleteGalleryItem, saveGalleryItem } from '@/app/admin/content-actions'
import { requireAdmin } from '@/lib/auth/require-admin'

const field = 'mt-1 w-full rounded border border-slate-300 px-2 py-1.5 text-sm'

export default async function GalleryAdminPage() {
  const { supabase } = await requireAdmin()
  const { data: items } = await supabase.from('gallery_items').select('*').order('sort_order').order('taken_at', { ascending: false })

  const gallery = await Promise.all((items ?? []).map(async (item) => {
    const { data } = await supabase.storage.from('media').createSignedUrl(item.image_path, 60)
    return { ...item, signedUrl: data?.signedUrl ?? null }
  }))

  return <section className="space-y-8"><div><p className="text-sm font-semibold text-red-600">Private media bucket</p><h1 className="text-3xl font-bold">Galeri yönetimi</h1><p className="mt-2 text-sm text-slate-600">Yalnızca JPEG, PNG, WebP veya AVIF; en fazla 5 MB. Dosyalar private <code>media</code> bucket’ında tutulur.</p></div>
    <form action={saveGalleryItem} encType="multipart/form-data" className="grid gap-3 rounded-xl border bg-white p-5 md:grid-cols-2"><h2 className="md:col-span-2 font-bold">Yeni görsel yükle</h2><label>Başlık<input required name="title" className={field} /></label><label>Kategori<input required name="category" className={field} placeholder="Etkinlik" /></label><label>Çekim tarihi<input type="date" name="takenAt" className={field} /></label><label>Sıra<input type="number" min="0" name="sortOrder" defaultValue="0" className={field} /></label><label className="md:col-span-2">Açıklama<textarea name="description" className={field} /></label><label className="md:col-span-2">Görsel<input required type="file" name="image" accept="image/jpeg,image/png,image/webp,image/avif" className={field} /></label><label>Yayında<input type="checkbox" name="isActive" defaultChecked /></label><button className="rounded bg-red-700 px-4 py-2 font-semibold text-white">Görseli yükle</button></form>
    <div className="space-y-3"><h2 className="text-xl font-bold">Yüklenen görseller</h2>{gallery.length ? gallery.map((item) => <article key={item.id} className="rounded-xl border bg-white p-4"><div className="flex flex-wrap items-start justify-between gap-3"><div><h3 className="font-semibold">{item.title}</h3><p className="text-sm text-slate-500">{item.category} · {item.is_active ? 'Yayında' : 'Gizli'} · {item.image_path}</p>{item.signedUrl ? <a className="mt-2 inline-block text-sm font-medium text-red-700 underline" href={item.signedUrl} target="_blank" rel="noreferrer">Güvenli önizlemeyi aç</a> : <p className="mt-2 text-sm text-amber-700">Önizleme bağlantısı oluşturulamadı.</p>}</div><form action={deleteGalleryItem} className="flex max-w-sm gap-2"><input type="hidden" name="id" value={item.id} /><input required name="confirmation" placeholder="DELETE yazın" className={field} /><button className="rounded border border-red-700 px-3 text-red-700">Sil</button></form></div></article>) : <p className="rounded border border-dashed p-6 text-slate-500">Henüz görsel yüklenmedi.</p>}</div>
  </section>
}
