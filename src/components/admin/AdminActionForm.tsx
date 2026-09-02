'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import type { AdminActionResult } from '@/lib/admin/action-result'

type ServerAction = (data: FormData) => Promise<AdminActionResult>
const initialState: AdminActionResult = { ok: false }

export function AdminActionForm({ action, children, className, successMessage, encType }: { action: ServerAction; children: ReactNode; className?: string; successMessage: string; encType?: 'multipart/form-data' }) {
  const [state, formAction] = useFormState<AdminActionResult, FormData>(async (_previous: AdminActionResult, data: FormData) => action(data), initialState)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!state.message && !state.ok) return
    setVisible(true)
    const timeout = window.setTimeout(() => setVisible(false), 4500)
    return () => window.clearTimeout(timeout)
  }, [state])

  return <form action={formAction} className={className} encType={encType}>{visible ? <div className={`fixed bottom-5 right-4 z-[60] max-w-sm rounded-xl border px-4 py-3 text-sm font-medium shadow-lg sm:right-6 ${state.ok ? 'border-emerald-200 bg-emerald-50 text-emerald-900' : 'border-red-200 bg-red-50 text-red-900'}`} role={state.ok ? 'status' : 'alert'} aria-live="polite">{state.ok ? successMessage : state.message}</div> : null}{children}</form>
}

export function AdminSubmitButton({ children, pendingLabel, className }: { children: ReactNode; pendingLabel: string; className?: string }) {
  const { pending } = useFormStatus()
  return <button type="submit" disabled={pending} aria-disabled={pending} className={`${className ?? ''} disabled:cursor-not-allowed disabled:opacity-60`}>{pending ? pendingLabel : children}</button>
}
