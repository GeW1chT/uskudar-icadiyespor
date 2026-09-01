import Link from 'next/link'
import { CalendarDays, ImageIcon, Newspaper, Users } from 'lucide-react'
import { requireAdmin } from '@/lib/auth/require-admin'

const sections = [
  { table: 'teams', label: 'Takım', href: '/admin/takimlar', icon: Users },
  { table: 'matches', label: 'Maç', href: '/admin/maclar', icon: CalendarDays },
  { table: 'news', label: 'Haber', href: '/admin/haberler', icon: Newspaper },
  { table: 'gallery_items', label: 'Galeri öğesi', href: '/admin/galeri', icon: ImageIcon },
] as const

export default async function AdminDashboardPage() {
  const { supabase } = await requireAdmin()
  const counts = await Promise.all(sections.map(async ({ table }) => {
    const { count } = await supabase.from(table).select('*', { count: 'exact', head: true })
    return count ?? 0
  }))

  return <section>
    <p className="text-sm font-semibold text-red-600">İçerik yönetimi</p>
    <h1 className="mt-1 text-3xl font-bold tracking-tight">Genel bakış</h1>
    <p className="mt-2 max-w-2xl text-slate-600">Yayımladığınız değişiklikler güvenli RLS kuralları altında kaydedilir ve public sayfalara yansır.</p>
    <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {sections.map(({ label, href, icon: Icon }, index) => <Link key={href} href={href} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-red-300 hover:shadow">
        <Icon className="text-red-600" /><p className="mt-6 text-3xl font-bold">{counts[index]}</p><p className="text-sm text-slate-600">{label}</p>
      </Link>)}
    </div>
  </section>
}
