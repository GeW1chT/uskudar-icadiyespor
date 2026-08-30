import { z } from 'zod'

const publicEnvSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z
    .string({ error: 'Supabase URL gereklidir.' })
    .url('Supabase URL geçerli bir URL olmalıdır.'),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z
    .string({ error: 'Supabase anonim anahtarı gereklidir.' })
    .min(1, 'Supabase anonim anahtarı gereklidir.'),
  NEXT_PUBLIC_SITE_URL: z
    .string({ error: 'Site URL gereklidir.' })
    .url('Site URL geçerli bir URL olmalıdır.'),
})

const serverEnvSchema = publicEnvSchema.extend({
  SUPABASE_SERVICE_ROLE_KEY: z
    .string({ error: 'Supabase service role anahtarı gereklidir.' })
    .min(1, 'Supabase service role anahtarı gereklidir.'),
})

export type PublicEnv = {
  supabaseUrl: string
  supabaseAnonKey: string
  siteUrl: string
}

export function parsePublicEnv(input: Record<string, string | undefined>): PublicEnv {
  const value = publicEnvSchema.parse(input)

  return {
    supabaseUrl: value.NEXT_PUBLIC_SUPABASE_URL,
    supabaseAnonKey: value.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    siteUrl: value.NEXT_PUBLIC_SITE_URL,
  }
}

export function getPublicEnv(): PublicEnv {
  return parsePublicEnv({
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  })
}

export function getServerEnv() {
  const value = serverEnvSchema.parse({
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  })

  return {
    ...parsePublicEnv(value),
    serviceRoleKey: value.SUPABASE_SERVICE_ROLE_KEY,
  }
}
