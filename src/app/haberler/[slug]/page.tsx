import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { getPublicNewsBySlug } from '@/lib/content/public'
import { ArrowLeft, Calendar } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const formatDate = (value: string | null) => value ? new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(value)) : 'Tarih belirtilmedi'

export default async function NewsDetailPage({ params }: { params: { slug: string } }) {
  const news = await getPublicNewsBySlug(params.slug)
  if (!news) notFound()

  return <div className="min-h-screen overflow-x-clip bg-slate-50 text-slate-900"><Header /><main><article className="border-b border-red-900 bg-gradient-to-br from-red-800 via-red-700 to-slate-900 text-white"><div className="container mx-auto max-w-4xl px-4 py-12 sm:py-16"><Link href="/haberler" className="inline-flex items-center gap-2 rounded-lg text-sm font-bold text-red-100 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-red-800"><ArrowLeft className="h-4 w-4" /> Tüm haberler</Link><div className="mt-8 flex flex-wrap items-center gap-3 text-sm"><span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold text-red-100">{news.category}</span><span className="flex items-center text-red-100"><Calendar className="mr-1 h-4 w-4" />{formatDate(news.published_at)}</span></div><h1 className="mt-5 break-words text-3xl font-black tracking-tight sm:text-5xl">{news.title}</h1><p className="mt-5 max-w-3xl break-words text-base leading-7 text-red-100 sm:text-lg">{news.summary}</p></div></article><article className="container mx-auto max-w-4xl px-4 py-10 sm:py-14"><div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8"><div className="whitespace-pre-line break-words text-base leading-8 text-slate-700">{news.content}</div><div className="mt-10 border-t border-slate-100 pt-6"><Link href="/haberler" className="inline-flex items-center gap-2 text-sm font-bold text-red-700 transition hover:text-red-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-700 focus-visible:ring-offset-2"><ArrowLeft className="h-4 w-4" /> Tüm haberlere dön</Link></div></div></article></main><Footer /></div>
}
