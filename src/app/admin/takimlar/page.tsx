import { deletePerson, deleteTeam, savePlayer, saveStaff, saveTeam } from '@/app/admin/content-actions'
import { requireAdmin } from '@/lib/auth/require-admin'

const input = 'mt-1 w-full rounded border border-slate-300 px-2 py-1.5 text-sm'
const checkbox = 'ml-2 accent-red-700'

export default async function TeamsAdminPage() {
  const { supabase } = await requireAdmin()
  const [{ data: teams }, { data: players }, { data: staff }] = await Promise.all([
    supabase.from('teams').select('*').order('sort_order'),
    supabase.from('players').select('*, teams(name)').order('full_name'),
    supabase.from('staff').select('*, teams(name)').order('full_name'),
  ])
  const teamOptions = teams ?? []
  return <section className="space-y-10"><div><p className="text-sm font-semibold text-red-600">Takımlar ve kadro</p><h1 className="text-3xl font-bold">Takım yönetimi</h1></div>
    <form action={saveTeam} className="grid gap-3 rounded-xl border bg-white p-5 md:grid-cols-3"><h2 className="md:col-span-3 font-bold">Yeni takım</h2><label>Ad<input name="name" required className={input} /></label><label>Slug<input name="slug" required className={input} placeholder="a-takim" /></label><label>Yaş grubu<input name="ageGroup" className={input} /></label><label>Lig<input name="league" className={input} /></label><label>Sezon<input name="activeSeason" className={input} /></label><label>Sıra<input name="sortOrder" type="number" defaultValue="0" className={input} /></label><label className="md:col-span-3">Açıklama<textarea name="description" className={input} /></label><label>Aktif<input name="isActive" type="checkbox" defaultChecked className={checkbox} /></label><button className="rounded bg-red-700 px-4 py-2 font-semibold text-white">Takım ekle</button></form>
    <div className="space-y-3"><h2 className="text-xl font-bold">Mevcut takımlar</h2>{teamOptions.length ? teamOptions.map((team) => <details key={team.id} className="rounded-xl border bg-white p-4"><summary className="cursor-pointer font-semibold">{team.name} <span className="text-sm font-normal text-slate-500">{team.is_active ? 'Aktif' : 'Pasif'}</span></summary><div className="mt-4 grid gap-3 md:grid-cols-3"><form action={saveTeam} className="contents"><input name="id" type="hidden" value={team.id} /><label>Ad<input name="name" defaultValue={team.name} className={input} /></label><label>Slug<input name="slug" defaultValue={team.slug} className={input} /></label><label>Yaş grubu<input name="ageGroup" defaultValue={team.age_group ?? ''} className={input} /></label><label>Lig<input name="league" defaultValue={team.league ?? ''} className={input} /></label><label>Sezon<input name="activeSeason" defaultValue={team.active_season ?? ''} className={input} /></label><label>Sıra<input name="sortOrder" type="number" defaultValue={team.sort_order} className={input} /></label><label className="md:col-span-3">Açıklama<textarea name="description" defaultValue={team.description ?? ''} className={input} /></label><label>Aktif<input name="isActive" type="checkbox" defaultChecked={team.is_active} className={checkbox} /></label><button className="rounded bg-slate-900 px-3 py-2 text-white">Kaydet</button></form><form action={deleteTeam} className="flex items-end gap-2"><input name="id" type="hidden" value={team.id} /><input name="confirmation" required placeholder="DELETE yazın" className={input} /><button className="rounded border border-red-700 px-3 py-2 text-red-700">Sil</button></form></div></details>) : <p className="rounded border border-dashed p-6 text-slate-500">Henüz takım yok.</p>}</div>
    <RosterForm title="Oyuncu ekle" action={savePlayer} teams={teamOptions} personLabel="Pozisyon" personName="position" extra="shirtNumber" />
    <RosterForm title="Teknik ekip ekle" action={saveStaff} teams={teamOptions} personLabel="Görev" personName="jobTitle" />
    <RosterList title="Oyuncular" rows={players ?? []} table="players" personKey="position" />
    <RosterList title="Teknik ekip" rows={staff ?? []} table="staff" personKey="job_title" />
  </section>
}

function RosterForm({ title, action, teams, personLabel, personName, extra }: { title: string; action: (data: FormData) => Promise<void>; teams: { id: string; name: string }[]; personLabel: string; personName: string; extra?: string }) {
  return <form action={action} className="grid gap-3 rounded-xl border bg-white p-5 md:grid-cols-3"><h2 className="md:col-span-3 font-bold">{title}</h2><label>Takım<select name="teamId" required className={input}><option value="">Seçin</option>{teams.map((team) => <option key={team.id} value={team.id}>{team.name}</option>)}</select></label><label>Ad soyad<input name="fullName" required className={input} /></label><label>{personLabel}<input name={personName} required className={input} /></label>{extra && <label>Forma no<input name={extra} type="number" className={input} /></label>}<label>Sıra<input name="sortOrder" type="number" defaultValue="0" className={input} /></label><label>Aktif<input name="isActive" type="checkbox" defaultChecked className={checkbox} /></label><button className="rounded bg-red-700 px-4 py-2 font-semibold text-white">Kaydet</button></form>
}

function RosterList({ title, rows, table, personKey }: { title: string; rows: Record<string, unknown>[]; table: 'players' | 'staff'; personKey: string }) {
  return <div><h2 className="mb-3 text-xl font-bold">{title}</h2><div className="space-y-2">{rows.length ? rows.map((row) => <div key={String(row.id)} className="flex flex-wrap items-center justify-between gap-3 rounded border bg-white p-3"><span><b>{String(row.full_name)}</b> · {String(row[personKey] ?? '')}</span><form action={deletePerson} className="flex gap-2"><input type="hidden" name="id" value={String(row.id)} /><input type="hidden" name="table" value={table} /><input name="confirmation" required placeholder="DELETE" className="w-24 rounded border px-2 text-sm" /><button className="text-sm text-red-700">Sil</button></form></div>) : <p className="text-slate-500">Kayıt yok.</p>}</div></div>
}
