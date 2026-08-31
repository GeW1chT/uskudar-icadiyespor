import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { getPublicGallery } from '@/lib/content/public'
import Image from 'next/image'
import { Camera, Calendar } from 'lucide-react'

const formatDate = (value: string | null) => value ? new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(value)) : 'Tarih belirtilmedi'

export default async function GalleryPage() {
  const items = await getPublicGallery()
  return <div className="min-h-screen bg-gray-50"><Header /><section className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 py-16 text-white"><div className="container mx-auto px-4 text-center"><h1 className="text-4xl font-bold md:text-5xl">Galeri</h1><p className="mt-4 text-xl text-red-100">Kulübümüzden fotoğraflar</p></div></section><main className="container mx-auto px-4 py-12">{items.length ? <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{items.map((item) => <article key={item.id} className="overflow-hidden rounded-lg bg-white shadow"><div className="relative aspect-video bg-gray-100"><Image src={item.signedUrl} alt={item.title} fill unoptimized className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" /></div><div className="p-4"><div className="flex justify-between gap-3 text-sm text-gray-500"><span>{item.category}</span><span className="flex items-center"><Calendar className="mr-1 h-4 w-4" />{formatDate(item.taken_at)}</span></div><h2 className="mt-2 font-bold text-gray-900">{item.title}</h2>{item.description ? <p className="mt-1 text-sm text-gray-600">{item.description}</p> : null}</div></article>)}</div> : <div className="rounded-lg bg-white p-12 text-center shadow"><Camera className="mx-auto h-16 w-16 text-gray-300" /><h2 className="mt-4 text-xl font-semibold text-gray-700">Henüz galeri içeriği yok</h2><p className="mt-2 text-gray-500">Yayınlanan görseller burada gösterilecek.</p></div>}</main><Footer /></div>
}
