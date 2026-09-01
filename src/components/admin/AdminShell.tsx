'use client'

import type { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { signOutAdmin } from '@/app/admin/actions'
import { AdminNav } from '@/components/admin/AdminNav'

export function AdminShell({ children }: { children: ReactNode }) {
  if (usePathname() === '/admin/login') return children

  return <div className="min-h-screen overflow-x-clip bg-slate-50 text-slate-900">
    <AdminNav />
    <main className="min-h-screen px-4 pb-10 pt-24 sm:px-6 lg:ml-72 lg:px-10 lg:py-10">
      <header className="mb-7 flex flex-col gap-3 border-b border-slate-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div><p className="text-sm text-slate-500">Yönetim paneli</p><p className="font-medium">Yetkili kullanıcı oturumu</p></div>
        <form action={signOutAdmin}><button className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold transition hover:border-red-200 hover:text-red-800">Çıkış yap</button></form>
      </header>
      {children}
    </main>
  </div>
}
