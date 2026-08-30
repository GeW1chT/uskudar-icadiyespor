import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { createClient } from '@supabase/supabase-js'

const outputDir = process.env.BACKUP_STORAGE_DIR
const url = process.env.SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!outputDir || !url || !serviceRoleKey) throw new Error('Backup storage environment is incomplete.')

const storage = createClient(url, serviceRoleKey, { auth: { persistSession: false } }).storage.from('media')

async function copyPrefix(prefix = '') {
  const { data, error } = await storage.list(prefix, { limit: 1000, sortBy: { column: 'name', order: 'asc' } })
  if (error) throw new Error('Storage listing failed.')
  for (const item of data) {
    const source = prefix ? `${prefix}/${item.name}` : item.name
    if (!item.id) {
      await copyPrefix(source)
      continue
    }
    const { data: file, error: downloadError } = await storage.download(source)
    if (downloadError || !file) throw new Error('Storage download failed.')
    const destination = path.join(outputDir, source)
    await mkdir(path.dirname(destination), { recursive: true })
    await writeFile(destination, Buffer.from(await file.arrayBuffer()), { mode: 0o600 })
  }
}

await copyPrefix()
process.stdout.write('Private Storage backup completed.\n')
