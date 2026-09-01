import 'server-only'

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { getPublicEnv } from '@/lib/env'

export function createSupabaseServerClient() {
  const cookieStore = cookies()
  const env = getPublicEnv()

  return createServerClient(env.supabaseUrl, env.supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(items) {
        try {
          items.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        } catch {
          // Server Components cannot change cookies. Middleware refreshes sessions instead.
        }
      },
    },
  })
}
