import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { getPublicMatches, getPublicNews, getPublicSettings, getPublicTeams } from '@/lib/content/public'
import { newsHref } from '@/lib/content/news-route'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Calendar, Newspaper, ShieldCheck, Trophy, Users } from 'lucide-react'

type ActivePlayer = { is_active: boolean }

export default async function HomePage() {
  const [settings, teams, matches, news] = await Promise.all([getPublicSettings(), getPublicTeams(), getPublicMatches(), getPublicNews(3)])
  const upcoming = matches.filter((match) => match.status === 'scheduled').slice(0, 3)
  const playerCount = teams.reduce((total, team) => total + ((team.players as ActivePlayer[] | undefined)?.filter((player) => player.is_active).length ?? 0), 0)
  const stats = [
    { label: 'Aktif takım', value: teams.length, Icon: ShieldCheck },
    { label: 'Aktif sporcu', value: playerCount, Icon: Users },
    { label: 'Yaklaşan maç', value: upcoming.length, Icon: Calendar },
    { label: 'Yayınlanan haber', value: news.length, Icon: Newspaper },
  ]

  return <div className="min-h-screen overflow-x-clip bg-slate-50 text-slate-900"><Header /><main>
    <section className="relative isolate overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(220,38,38,.9),transparent_45%),linear-gradient(135deg,#7f1d1d_0%,#991b1b_42%,#0f172a_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950/80 to-transparent" />
      <div className="container relative mx-auto px-4 pb-14 pt-12 text-center sm:pb-16 sm:pt-16 lg:pb-20 lg:pt-20">
        <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border border-white/25 bg-white/95 p-3 shadow-2xl shadow-black/30 sm:h-36 sm:w-36 lg:h-40 lg:w-40"><Image src="/logo.png" alt="Üsküdar İcadiye Spor Kulübü arması" width={144} height={144} priority className="h-full w-full object-contain" /></div>
        <p className="mt-7 text-xs font-bold uppercase tracking-[.28em] text-red-200">Üsküdar · İstanbul</p>
        <h1 className="mx-auto mt-3 max-w-4xl text-balance text-4xl font-black tracking-tight sm:text-5xl lg:text-7xl">{settings?.home_hero_title || 'Üsküdar İcadiye Spor'}</h1>
        <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-7 text-red-100 sm:text-lg">{settings?.home_hero_text || 'Gelenekten geleceğe, spor ruhuyla.'}</p>
        <div className="mx-auto mt-8 grid max-w-4xl grid-cols-2 gap-3 text-left sm:mt-9 sm:gap-4 lg:grid-cols-4">
          {stats.map(({ label, value, Icon }) => <div key={label} className="min-w-0 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur sm:p-5"><Icon className="h-5 w-5 text-red-200" /><p className="mt-5 text-3xl font-black tracking-tight sm:text-4xl">{value}</p><p className="mt-1 truncate text-xs font-medium text-red-100 sm:text-sm">{label}</p></div>)}
        </div>
      </div>
    </section>
    <section className="container mx-auto grid gap-10 px-4 py-14 lg:grid-cols-2 lg:py-20">
      <ContentSection title="Son haberler" href="/haberler" linkLabel="Tüm haberler">{news.length ? <div className="grid gap-4">{news.map((item) => <Link key={item.id} href={newsHref(item.slug)} className="group block rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-red-700 focus-visible:ring-offset-2"><article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition group-hover:-translate-y-0.5 group-hover:border-red-300 group-hover:shadow-lg group-focus-visible:border-red-400"><p className="text-xs font-bold uppercase tracking-wide text-red-700">{item.category}</p><h3 className="mt-2 break-words text-lg font-bold tracking-tight text-slate-900 transition group-hover:text-red-800">{item.title}</h3><p className="mt-2 line-clamp-2 break-words text-sm leading-6 text-slate-600">{item.summary}</p><span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-red-700">Haberi oku <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" /></span></article></Link>)}</div> : <Empty icon={<Newspaper />} text="Henüz yayınlanmış haber yok." />}</ContentSection>
      <ContentSection title="Yaklaşan maçlar" href="/maclar" linkLabel="Tüm maçlar">{upcoming.length ? <div className="grid gap-4">{upcoming.map((match) => <article key={match.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><p className="text-xs font-bold uppercase tracking-wide text-red-700">{match.competition}</p><div className="mt-3 grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-center"><strong className="min-w-0 truncate text-left text-sm sm:text-base">{match.home_team}</strong><span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-bold text-slate-500">VS</span><strong className="min-w-0 truncate text-right text-sm sm:text-base">{match.away_team}</strong></div><p className="mt-4 text-sm text-slate-500">{match.match_date || 'Tarih belirtilmedi'}{match.kickoff_time ? ` · ${match.kickoff_time.slice(0, 5)}` : ''}</p></article>)}</div> : <Empty icon={<Calendar />} text="Yaklaşan maç bulunmuyor." />}</ContentSection>
    </section>
    <section className="border-y border-slate-200 bg-white"><div className="container mx-auto grid gap-8 px-4 py-14 text-center md:grid-cols-[auto_1fr] md:items-center md:text-left"><div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-700 md:mx-0"><Trophy className="h-8 w-8" /></div><div><p className="text-sm font-bold uppercase tracking-wide text-red-700">Kulübümüz</p><h2 className="mt-2 text-2xl font-black tracking-tight text-slate-900">Saha içinde ve dışında birlikte büyüyoruz.</h2><p className="mt-3 max-w-3xl leading-7 text-slate-600">{settings?.club_description || 'Kulübümüzün güncel bilgileri yakında paylaşılacak.'}</p><Link className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-red-700 hover:text-red-900" href="/takimlar">Takımlarımızı inceleyin <ArrowRight className="h-4 w-4" /></Link></div></div></section>
  </main><Footer /></div>
}

function ContentSection({ title, href, linkLabel, children }: { title: string; href: string; linkLabel: string; children: React.ReactNode }) {
  return <div className="min-w-0"><div className="mb-5 flex items-end justify-between gap-4"><div><p className="text-sm font-bold uppercase tracking-wide text-red-700">Güncel</p><h2 className="mt-1 text-2xl font-black tracking-tight text-slate-900">{title}</h2></div><Link className="shrink-0 text-sm font-bold text-slate-700 hover:text-red-700" href={href}>{linkLabel}</Link></div>{children}</div>
}

function Empty({ icon, text }: { icon: React.ReactNode; text: string }) {
  return <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500"><span className="mx-auto block h-8 w-8 text-slate-300">{icon}</span><p className="mt-3 text-sm">{text}</p></div>
}
