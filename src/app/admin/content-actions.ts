'use server'

import { revalidatePath } from 'next/cache'
import { requireAdmin } from '@/lib/auth/require-admin'
import { galleryInputSchema, matchInputSchema, newsInputSchema, personInputSchema, settingsInputSchema, teamInputSchema } from '@/lib/validation/content'

const publicPaths = ['/', '/takimlar', '/maclar', '/haberler', '/galeri', '/iletisim']
const text = (data: FormData, name: string) => String(data.get(name) ?? '')
const checked = (data: FormData, name: string) => data.get(name) === 'on'

function refreshContent() {
  publicPaths.forEach((path) => revalidatePath(path))
  revalidatePath('/admin', 'layout')
}

function ensureDeleteConfirmation(data: FormData) {
  if (text(data, 'confirmation') !== 'DELETE') throw new Error('Silme işlemini onaylamalısınız.')
}

export async function saveTeam(data: FormData) {
  const input = teamInputSchema.parse({ id: text(data, 'id') || undefined, name: text(data, 'name'), slug: text(data, 'slug'), ageGroup: text(data, 'ageGroup'), league: text(data, 'league'), description: text(data, 'description'), activeSeason: text(data, 'activeSeason'), sortOrder: text(data, 'sortOrder') || 0, isActive: checked(data, 'isActive') })
  const { supabase } = await requireAdmin()
  const payload = { name: input.name, slug: input.slug, age_group: input.ageGroup, league: input.league, description: input.description, active_season: input.activeSeason, sort_order: input.sortOrder, is_active: input.isActive }
  const query = input.id ? supabase.from('teams').update(payload).eq('id', input.id) : supabase.from('teams').insert(payload)
  const { error } = await query
  if (error) throw new Error('Takım kaydedilemedi.')
  refreshContent()
}

export async function deleteTeam(data: FormData) {
  ensureDeleteConfirmation(data)
  const { supabase } = await requireAdmin()
  const { error } = await supabase.from('teams').delete().eq('id', text(data, 'id'))
  if (error) throw new Error('Bağlı kadro veya maç kaydı bulunan takım silinemez.')
  refreshContent()
}

async function savePerson(data: FormData, table: 'players' | 'staff') {
  const input = personInputSchema.parse({ id: text(data, 'id') || undefined, teamId: text(data, 'teamId'), fullName: text(data, 'fullName'), position: text(data, 'position') || undefined, jobTitle: text(data, 'jobTitle') || undefined, shirtNumber: text(data, 'shirtNumber') || undefined, sortOrder: text(data, 'sortOrder') || 0, isActive: checked(data, 'isActive') })
  const { supabase } = await requireAdmin()
  const { error } = table === 'players'
    ? await (input.id
      ? supabase.from('players').update({ team_id: input.teamId, full_name: input.fullName, position: input.position, shirt_number: input.shirtNumber, sort_order: input.sortOrder, is_active: input.isActive }).eq('id', input.id)
      : supabase.from('players').insert({ team_id: input.teamId, full_name: input.fullName, position: input.position, shirt_number: input.shirtNumber, sort_order: input.sortOrder, is_active: input.isActive }))
    : await (input.id
      ? supabase.from('staff').update({ team_id: input.teamId, full_name: input.fullName, job_title: input.jobTitle, sort_order: input.sortOrder, is_active: input.isActive }).eq('id', input.id)
      : supabase.from('staff').insert({ team_id: input.teamId, full_name: input.fullName, job_title: input.jobTitle, sort_order: input.sortOrder, is_active: input.isActive }))
  if (error) throw new Error('Kadro kaydı kaydedilemedi.')
  refreshContent()
}

export async function savePlayer(data: FormData) { await savePerson(data, 'players') }
export async function saveStaff(data: FormData) { await savePerson(data, 'staff') }

export async function deletePerson(data: FormData) {
  ensureDeleteConfirmation(data)
  const table = text(data, 'table') === 'staff' ? 'staff' : 'players'
  const { supabase } = await requireAdmin()
  const { error } = await supabase.from(table).delete().eq('id', text(data, 'id'))
  if (error) throw new Error('Kadro kaydı silinemedi.')
  refreshContent()
}

export async function saveMatch(data: FormData) {
  const input = matchInputSchema.parse({ id: text(data, 'id') || undefined, teamId: text(data, 'teamId'), homeTeam: text(data, 'homeTeam'), awayTeam: text(data, 'awayTeam'), competition: text(data, 'competition'), week: text(data, 'week') || undefined, matchDate: text(data, 'matchDate'), kickoffTime: text(data, 'kickoffTime'), stadium: text(data, 'stadium'), homeScore: text(data, 'homeScore') || undefined, awayScore: text(data, 'awayScore') || undefined, status: text(data, 'status'), isHome: checked(data, 'isHome'), isActive: checked(data, 'isActive') })
  const { supabase } = await requireAdmin()
  const payload = { team_id: input.teamId, home_team: input.homeTeam, away_team: input.awayTeam, competition: input.competition, week: input.week, match_date: input.matchDate, kickoff_time: input.kickoffTime, stadium: input.stadium, home_score: input.homeScore, away_score: input.awayScore, status: input.status, is_home: input.isHome, is_active: input.isActive }
  const query = input.id ? supabase.from('matches').update(payload).eq('id', input.id) : supabase.from('matches').insert(payload)
  const { error } = await query
  if (error) throw new Error('Maç kaydedilemedi.')
  refreshContent()
}

export async function deleteMatch(data: FormData) {
  ensureDeleteConfirmation(data)
  const { supabase } = await requireAdmin()
  const { error } = await supabase.from('matches').delete().eq('id', text(data, 'id'))
  if (error) throw new Error('Maç silinemedi.')
  refreshContent()
}

export async function saveNews(data: FormData) {
  const input = newsInputSchema.parse({ id: text(data, 'id') || undefined, title: text(data, 'title'), slug: text(data, 'slug'), summary: text(data, 'summary'), content: text(data, 'content'), category: text(data, 'category'), status: text(data, 'status'), publishedAt: text(data, 'publishedAt') })
  const { supabase } = await requireAdmin()
  const payload = { title: input.title, slug: input.slug, summary: input.summary, content: input.content, category: input.category, status: input.status, published_at: input.publishedAt ? new Date(input.publishedAt).toISOString() : null }
  const query = input.id ? supabase.from('news').update(payload).eq('id', input.id) : supabase.from('news').insert(payload)
  const { error } = await query
  if (error) throw new Error('Haber kaydedilemedi.')
  refreshContent()
}

export async function deleteNews(data: FormData) {
  ensureDeleteConfirmation(data)
  const { supabase } = await requireAdmin()
  const { error } = await supabase.from('news').delete().eq('id', text(data, 'id'))
  if (error) throw new Error('Haber silinemedi.')
  refreshContent()
}

export async function saveGalleryItem(data: FormData) {
  const input = galleryInputSchema.parse({ id: text(data, 'id') || undefined, title: text(data, 'title'), description: text(data, 'description'), category: text(data, 'category'), takenAt: text(data, 'takenAt'), sortOrder: text(data, 'sortOrder') || 0, isActive: checked(data, 'isActive') })
  const file = data.get('image')
  if (!(file instanceof File) || file.size === 0 || file.size > 5 * 1024 * 1024 || !['image/jpeg', 'image/png', 'image/webp', 'image/avif'].includes(file.type)) throw new Error('En fazla 5 MB JPEG, PNG, WebP veya AVIF görsel yükleyin.')
  const extension = file.type.split('/')[1]
  const imagePath = `gallery/${crypto.randomUUID()}.${extension}`
  const { supabase } = await requireAdmin()
  const { error: uploadError } = await supabase.storage.from('media').upload(imagePath, file, { contentType: file.type, upsert: false })
  if (uploadError) throw new Error('Görsel yüklenemedi.')
  const payload = { title: input.title, description: input.description, image_path: imagePath, category: input.category, taken_at: input.takenAt, sort_order: input.sortOrder, is_active: input.isActive }
  const { error } = await supabase.from('gallery_items').insert(payload)
  if (error) {
    await supabase.storage.from('media').remove([imagePath])
    throw new Error('Galeri kaydı kaydedilemedi.')
  }
  refreshContent()
}

export async function deleteGalleryItem(data: FormData) {
  ensureDeleteConfirmation(data)
  const { supabase } = await requireAdmin()
  const id = text(data, 'id')
  const { data: item } = await supabase.from('gallery_items').select('image_path').eq('id', id).maybeSingle()
  const { error } = await supabase.from('gallery_items').delete().eq('id', id)
  if (error) throw new Error('Galeri kaydı silinemedi.')
  if (item?.image_path) await supabase.storage.from('media').remove([item.image_path])
  refreshContent()
}

export async function saveSettings(data: FormData) {
  const input = settingsInputSchema.parse({ homeHeroTitle: text(data, 'homeHeroTitle'), homeHeroText: text(data, 'homeHeroText'), clubDescription: text(data, 'clubDescription'), address: text(data, 'address'), phone: text(data, 'phone'), email: text(data, 'email'), instagramUrl: text(data, 'instagramUrl'), facebookUrl: text(data, 'facebookUrl'), youtubeUrl: text(data, 'youtubeUrl') })
  const { supabase } = await requireAdmin()
  const { error } = await supabase.from('site_settings').upsert({ id: true, home_hero_title: input.homeHeroTitle, home_hero_text: input.homeHeroText, club_description: input.clubDescription, address: input.address, phone: input.phone, email: input.email, instagram_url: input.instagramUrl, facebook_url: input.facebookUrl, youtube_url: input.youtubeUrl })
  if (error) throw new Error('Site ayarları kaydedilemedi.')
  refreshContent()
}
