import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { getPublicNews } from '@/lib/content/public'
import { Calendar, Newspaper } from 'lucide-react'

const formatDate = (value: string | null) => value ? new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(value)) : 'Tarih belirtilmedi'

export default async function NewsPage() {
  const news = await getPublicNews()
  return <div className="min-h-screen bg-gray-50"><Header /><section className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 py-16 text-white"><div className="container mx-auto px-4 text-center"><h1 className="text-4xl font-bold md:text-5xl">Haberler</h1><p className="mt-4 text-xl text-red-100">Kulübümüzden son haberler ve gelişmeler</p></div></section><main className="container mx-auto px-4 py-12"><h2 className="mb-6 text-2xl font-bold text-gray-900">Güncel duyurular</h2>{news.length ? <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{news.map((item) => <article key={item.id} className="rounded-lg bg-white p-6 shadow"><div className="mb-4 flex items-center justify-between gap-3 text-sm"><span className="rounded-full bg-red-100 px-3 py-1 font-semibold text-red-800">{item.category}</span><span className="flex items-center text-gray-500"><Calendar className="mr-1 h-4 w-4" />{formatDate(item.published_at)}</span></div><h3 className="text-xl font-bold text-gray-900">{item.title}</h3><p className="mt-3 text-gray-600">{item.summary}</p><details className="mt-4"><summary className="cursor-pointer font-semibold text-red-700">Haberi oku</summary><p className="mt-3 whitespace-pre-line leading-relaxed text-gray-700">{item.content}</p></details></article>)}</div> : <div className="rounded-lg bg-white p-12 text-center shadow"><Newspaper className="mx-auto h-16 w-16 text-gray-300" /><h3 className="mt-4 text-xl font-semibold text-gray-700">Henüz yayınlanmış haber yok</h3><p className="mt-2 text-gray-500">Yeni duyurular burada görünecek.</p></div>}</main><Footer /></div>
}
