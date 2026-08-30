import { describe, expect, it } from 'vitest'
import { parsePublicEnv } from '@/lib/env'

describe('parsePublicEnv', () => {
  it('rejects a missing public Supabase URL', () => {
    expect(() =>
      parsePublicEnv({
        NEXT_PUBLIC_SUPABASE_ANON_KEY: 'public-anon-key',
      }),
    ).toThrow('Supabase URL')
  })

  it('accepts the public values needed by a browser client', () => {
    expect(
      parsePublicEnv({
        NEXT_PUBLIC_SUPABASE_URL: 'https://project.supabase.co',
        NEXT_PUBLIC_SUPABASE_ANON_KEY: 'public-anon-key',
        NEXT_PUBLIC_SITE_URL: 'https://uskudaricadiyespor.com',
      }),
    ).toEqual({
      supabaseUrl: 'https://project.supabase.co',
      supabaseAnonKey: 'public-anon-key',
      siteUrl: 'https://uskudaricadiyespor.com',
    })
  })
})
