'use client'

import { FormEvent, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createSupabaseBrowserClient } from '@/lib/supabase/browser'
import { safeAdminRedirect } from '@/lib/auth/safe-redirect'

export default function AdminLoginPage() {
  const router = useRouter()
  const params = useSearchParams()
  const [error, setError] = useState(params.get('error') === 'yetki' ? 'Bu hesap yönetim paneline erişemez.' : '')
  const [loading, setLoading] = useState(false)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError('')
    const data = new FormData(event.currentTarget)
    const { error: signInError } = await createSupabaseBrowserClient().auth.signInWithPassword({ email: String(data.get('email') ?? ''), password: String(data.get('password') ?? '') })
    if (signInError) {
      setError('E-posta veya parola hatalı. Lütfen tekrar deneyin.')
      setLoading(false)
      return
    }
    router.replace(safeAdminRedirect(params.get('next')))
    router.refresh()
  }

  return <main className="flex min-h-screen items-center justify-center bg-slate-950 p-4"><form onSubmit={submit} className="w-full max-w-md rounded-2xl bg-white p-7 shadow-2xl">
    <p className="text-sm font-semibold text-red-600">Üsküdar İcadiye Spor</p><h1 className="mt-1 text-2xl font-bold">Yönetici girişi</h1><p className="mt-2 text-sm text-slate-600">Yalnız yetkilendirilmiş yöneticiler giriş yapabilir.</p>
    {error && <p role="alert" className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-800">{error}</p>}
    <label className="mt-6 block text-sm font-medium">E-posta<input required type="email" name="email" autoComplete="email" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" /></label>
    <label className="mt-4 block text-sm font-medium">Parola<input required type="password" name="password" autoComplete="current-password" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2" /></label>
    <button disabled={loading} className="mt-6 w-full rounded-lg bg-red-700 px-4 py-2.5 font-semibold text-white disabled:opacity-60">{loading ? 'Giriş yapılıyor…' : 'Giriş yap'}</button>
  </form></main>
}
