'use client'

export default function AdminError({ reset }: { error: Error; reset: () => void }) {
  return <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-900"><h1 className="text-lg font-bold">Yönetim paneli yüklenemedi</h1><p className="mt-2">Lütfen bağlantınızı kontrol edip tekrar deneyin.</p><button type="button" onClick={reset} className="mt-4 rounded-lg bg-red-700 px-4 py-2 font-semibold text-white">Tekrar dene</button></div>
}
