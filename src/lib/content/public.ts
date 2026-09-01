import 'server-only'

import { createClient } from '@supabase/supabase-js'
import { getServerEnv } from '@/lib/env'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { attachSignedGalleryUrls } from './gallery'

export { attachSignedGalleryUrls } from './gallery'

export async function getPublicTeams() {
  const supabase = createSupabaseServerClient()
  const { data } = await supabase.from('teams').select('*, players(*), staff(*)').eq('is_active', true).order('sort_order')
  return data ?? []
}

export async function getPublicMatches() {
  const supabase = createSupabaseServerClient()
  const { data } = await supabase.from('matches').select('*, teams(name)').eq('is_active', true).order('match_date')
  return data ?? []
}

export async function getPublicNews(limit?: number) {
  const supabase = createSupabaseServerClient()
  let query = supabase.from('news').select('*').eq('status', 'published').order('published_at', { ascending: false })
  if (limit) query = query.limit(limit)
  const { data } = await query
  return data ?? []
}

export async function getPublicNewsBySlug(slug: string) {
  const supabase = createSupabaseServerClient()
  const { data } = await supabase.from('news').select('*').eq('slug', slug).eq('status', 'published').maybeSingle()
  return data
}

export async function getPublicSettings() {
  const supabase = createSupabaseServerClient()
  const { data } = await supabase.from('site_settings').select('*').eq('id', true).maybeSingle()
  return data
}

export async function getPublicGallery() {
  const supabase = createSupabaseServerClient()
  const { data } = await supabase.from('gallery_items').select('*').eq('is_active', true).order('sort_order').order('taken_at', { ascending: false })
  const galleryItems = data ?? []

  const env = getServerEnv()
  const privilegedStorage = createClient(env.supabaseUrl, env.serviceRoleKey, { auth: { autoRefreshToken: false, persistSession: false } })
  const signedEntries = await Promise.all(galleryItems.map(async (item) => {
    const { data } = await privilegedStorage.storage.from('media').createSignedUrl(item.image_path, 60)
    return [item.image_path, data?.signedUrl] as const
  }))

  return attachSignedGalleryUrls(galleryItems, new Map(signedEntries.filter((entry): entry is readonly [string, string] => Boolean(entry[1]))))
}
