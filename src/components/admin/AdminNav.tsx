'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CalendarDays, ImageIcon, LayoutDashboard, Menu, Newspaper, Settings, ShieldCheck, Users, X } from 'lucide-react'
import { useState } from 'react'

const items = [
  { href: '/admin', label: 'Genel bakış', icon: LayoutDashboard },
  { href: '/admin/takimlar', label: 'Takımlar ve kadro', icon: Users },
  { href: '/admin/maclar', label: 'Maçlar', icon: CalendarDays },
  { href: '/admin/haberler', label: 'Haberler', icon: Newspaper },
  { href: '/admin/galeri', label: 'Galeri', icon: ImageIcon },
  { href: '/admin/site-ayarlari', label: 'Site ayarları', icon: Settings },
]

export function AdminNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      <button type="button" className="fixed right-4 top-4 z-50 rounded-lg bg-slate-900 p-2 text-white lg:hidden" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label="Yönetim menüsünü aç">
        {open ? <X /> : <Menu />}
      </button>
      <aside className={`fixed inset-y-0 left-0 z-40 w-72 border-r border-slate-800 bg-slate-950 p-5 text-slate-100 transition-transform lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <Link href="/admin" className="mb-8 flex items-center gap-3 text-lg font-bold" onClick={() => setOpen(false)}>
          <ShieldCheck className="text-red-400" /> Üsküdar İcadiye Spor
        </Link>
        <nav className="space-y-1" aria-label="Yönetim bölümleri">
          {items.map(({ href, label, icon: Icon }) => {
            const active = href === '/admin' ? pathname === href : pathname.startsWith(href)
            return <Link key={href} href={href} onClick={() => setOpen(false)} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium ${active ? 'bg-red-600 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}><Icon size={18} />{label}</Link>
          })}
        </nav>
      </aside>
      {open && <button type="button" className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setOpen(false)} aria-label="Menüyü kapat" />}
    </>
  )
}
