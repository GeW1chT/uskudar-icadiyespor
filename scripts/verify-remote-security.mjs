import { randomUUID } from 'node:crypto'
import { createClient } from '@supabase/supabase-js'

const required = [
  'SUPABASE_URL',
  'SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
]

for (const name of required) {
  if (!process.env[name]) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
}

const url = process.env.SUPABASE_URL
const anonKey = process.env.SUPABASE_ANON_KEY
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const suffix = randomUUID()
const password = `S!${randomUUID()}Aa9`
const normalEmail = `rls-normal-${suffix}@example.invalid`
const adminEmail = `rls-admin-${suffix}@example.invalid`
const draftSlug = `rls-draft-${suffix}`
const adminSlug = `rls-admin-${suffix}`
const storagePath = `news/rls-${suffix}.png`

const service = createClient(url, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
})
const anonymous = createClient(url, anonKey, {
  auth: { autoRefreshToken: false, persistSession: false },
})

function assert(condition, message) {
  if (!condition) throw new Error(message)
}

async function expectDenied(operation, description) {
  const { error } = await operation()
  assert(error, `${description} unexpectedly succeeded`)
}

async function signIn(email) {
  const client = createClient(url, anonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
  const { error } = await client.auth.signInWithPassword({ email, password })
  assert(!error, 'Test user sign-in failed')
  return client
}

let normalUserId
let adminUserId

try {
  const normalCreation = await service.auth.admin.createUser({
    email: normalEmail,
    password,
    email_confirm: true,
  })
  assert(!normalCreation.error && normalCreation.data.user, 'Normal test user could not be created')
  normalUserId = normalCreation.data.user.id

  const adminCreation = await service.auth.admin.createUser({
    email: adminEmail,
    password,
    email_confirm: true,
  })
  assert(!adminCreation.error && adminCreation.data.user, 'Admin test user could not be created')
  adminUserId = adminCreation.data.user.id

  const profileInsert = await service.from('profiles').insert({ id: adminUserId, role: 'admin' })
  assert(!profileInsert.error, 'Admin test profile could not be created')

  const draftInsert = await service.from('news').insert({
    title: 'RLS taslak doğrulaması',
    slug: draftSlug,
    summary: 'Bu kayıt yalnızca RLS görünürlük testinde kullanılır.',
    content: 'Bu taslak kayıt, ziyaretçilere görünmemelidir.',
    category: 'test',
    status: 'draft',
  })
  assert(!draftInsert.error, 'Draft visibility fixture could not be created')

  const normal = await signIn(normalEmail)
  const admin = await signIn(adminEmail)

  const publicNews = await anonymous.from('news').select('slug, status')
  assert(!publicNews.error, 'Anonymous published-news read failed')
  assert(!publicNews.data.some((item) => item.slug === draftSlug), 'Anonymous visitor can read a draft')
  assert(publicNews.data.every((item) => item.status === 'published'), 'Anonymous visitor received non-published news')

  await expectDenied(
    () => anonymous.from('news').insert({
      title: 'Anon write', slug: `anon-${suffix}`, summary: 'Geçersiz anon yazma denemesi.',
      content: 'Bu kayıt oluşmamalıdır.', category: 'test', status: 'draft',
    }),
    'Anonymous news insert',
  )
  await expectDenied(
    () => normal.from('news').insert({
      title: 'User write', slug: `user-${suffix}`, summary: 'Geçersiz kullanıcı yazma denemesi.',
      content: 'Bu kayıt oluşmamalıdır.', category: 'test', status: 'draft',
    }),
    'Authenticated non-admin news insert',
  )
  await normal.from('news').update({ title: 'Changed' }).eq('slug', draftSlug)
  const unchangedDraft = await service.from('news').select('title').eq('slug', draftSlug).single()
  assert(!unchangedDraft.error && unchangedDraft.data.title === 'RLS taslak doğrulaması', 'Authenticated non-admin changed a draft')
  await normal.from('news').delete().eq('slug', draftSlug)
  const remainingDraft = await service.from('news').select('id').eq('slug', draftSlug).maybeSingle()
  assert(!remainingDraft.error && remainingDraft.data, 'Authenticated non-admin deleted a draft')

  const adminInsert = await admin.from('news').insert({
    title: 'Admin yazma doğrulaması', slug: adminSlug,
    summary: 'Bu kayıt admin yazma iznini doğrulamak için kullanılır.',
    content: 'Bu kayıt test sonunda silinecektir.', category: 'test', status: 'draft',
  })
  assert(!adminInsert.error, 'Admin news insert failed')

  const bytes = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10])
  await expectDenied(
    () => anonymous.storage.from('media').upload(storagePath, bytes, { contentType: 'image/png', upsert: false }),
    'Anonymous storage upload',
  )
  await expectDenied(
    () => normal.storage.from('media').upload(storagePath, bytes, { contentType: 'image/png', upsert: false }),
    'Authenticated non-admin storage upload',
  )

  const adminUpload = await admin.storage.from('media').upload(storagePath, bytes, { contentType: 'image/png', upsert: false })
  assert(!adminUpload.error, 'Admin storage upload failed')
  await expectDenied(() => anonymous.storage.from('media').download(storagePath), 'Anonymous storage download')
  await expectDenied(() => normal.storage.from('media').download(storagePath), 'Authenticated non-admin storage download')
  const adminDownload = await admin.storage.from('media').download(storagePath)
  assert(!adminDownload.error, 'Admin storage download failed')
  const adminRemove = await admin.storage.from('media').remove([storagePath])
  assert(!adminRemove.error, 'Admin storage delete failed')

  const adminDelete = await admin.from('news').delete().eq('slug', adminSlug)
  assert(!adminDelete.error, 'Admin news delete failed')
  process.stdout.write('Remote RLS and Storage verification passed.\n')
} finally {
  await service.from('news').delete().in('slug', [draftSlug, adminSlug])
  if (adminUserId) await service.auth.admin.deleteUser(adminUserId)
  if (normalUserId) await service.auth.admin.deleteUser(normalUserId)
}
