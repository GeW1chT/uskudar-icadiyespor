import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Üsküdar İcadiye Spor - Resmi Web Sitesi',
  description: 'Üsküdar İcadiye Spor Kulübü resmi web sitesi. Takım haberleri, maç sonuçları, oyuncu kadroları ve daha fazlası.',
  keywords: 'üsküdar, icadiye, spor, futbol, kulüp, istanbul, süper amatör',
  authors: [{ name: 'Üsküdar İcadiye Spor' }],
  openGraph: {
    title: 'Üsküdar İcadiye Spor',
    description: 'Üsküdar İcadiye Spor Kulübü resmi web sitesi',
    url: 'https://uskudaricadiyespor.com',
    siteName: 'Üsküdar İcadiye Spor',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Üsküdar İcadiye Spor',
      },
    ],
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Üsküdar İcadiye Spor',
    description: 'Üsküdar İcadiye Spor Kulübü resmi web sitesi',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}