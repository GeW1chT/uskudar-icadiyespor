import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'
import Link from 'next/link' // Link component'ini import ettik
import { Calendar, Trophy, Users, Target } from 'lucide-react'

const HomePage = () => {
  // Önceki haber objesinden kısaltılmış bir versiyonu buraya ekledik
  const recentNews = [
    {
      id: 1,
      title: 'Bugün Maç Günü! Takımımıza Destek Olmaya Gel!',
      excerpt: 'Bugün oynanacak önemli maç öncesi, tüm taraftarlarımızı tribünlerde yerini almaya ve takımımızı desteklemeye davet ediyoruz.',
      date: '23 Ağustos 2025',
      href: '/haberler', // Haber detay sayfasına yönlendirme için
    },
  ];

  const upcomingMatches = [
    {
      id: 1,
      team: "A Takım",
      opponent: "Vadı Spor",
      date: "23 Ağustos 2025",
      time: "18:00",
      venue: "Turnuva Sahası",
      league: "18. Amatör Turnuva"
    },
    {
      id: 2,
      team: "A Takım",
      opponent: "Üsküdar Altınşehir",
      date: "29 Ağustos 2025",
      time: "20:00",
      venue: "Turnuva Sahası",
      league: "18. Amatör Turnuva"
    },
    {
      id: 3,
      team: "A Takım",
      opponent: "Ünalan S.K.",
      date: "6 Eylül 2025",
      time: "18:00",
      venue: "Turnuva Sahası",
      league: "18. Amatör Turnuva"
    }
  ];

  const teamStats = [
    { label: "A Takım", value: "23", description: "Aktif Oyuncu" },
    { label: "U18 Takımı", value: "6", description: "Genç Yetenek" },
    { label: "U16 Takımı", value: "6", description: "Gelecek Yıldızlar" },
    { label: "Toplam", value: "35", description: "Kulüp Oyuncusu" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white py-20 overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto">
              <div className="w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl overflow-hidden bg-white">
                <Image
                  src="/logo.png"
                  alt="Üsküdar İcadiye Spor"
                  width={120}
                  height={120}
                  className="object-contain"
                />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
                Üsküdar İcadiye Spor
              </h1>
              <p className="text-xl md:text-2xl text-red-100 mb-8">
                Gelenekten Geleceğe, Spor Ruhuyla
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                {teamStats.map((stat, index) => (
                  <div key={index} className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-all">
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm font-medium">{stat.label}</div>
                    <div className="text-xs text-red-100 mt-1">{stat.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* İstatistikler */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="flex flex-col items-center">
                <Trophy className="w-12 h-12 text-red-600 mb-4" />
                <div className="text-3xl font-bold text-gray-900">74</div>
                <div className="text-gray-600">Yıllık Deneyim</div>
              </div>
              <div className="flex flex-col items-center">
                <Users className="w-12 h-12 text-blue-600 mb-4" />
                <div className="text-3xl font-bold text-gray-900">3</div>
                <div className="text-gray-600">Farklı Takım</div>
              </div>
              <div className="flex flex-col items-center">
                <Target className="w-12 h-12 text-green-600 mb-4" />
                <div className="text-3xl font-bold text-gray-900">35+</div>
                <div className="text-gray-600">Aktif Sporcu</div>
              </div>
              <div className="flex flex-col items-center">
                <Calendar className="w-12 h-12 text-purple-600 mb-4" />
                <div className="text-3xl font-bold text-gray-900">1951</div>
                <div className="text-gray-600">Kuruluş Yılı</div>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Son Haberler */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Son Haberler</h2>
                <a href="/haberler" className="text-red-600 hover:text-red-800 font-medium">
                  Tümünü Gör →
                </a>
              </div>
              <div className="space-y-6">
                {recentNews.length > 0 ? (
                  recentNews.map((news) => (
                    <Link key={news.id} href={news.href} passHref>
                      <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                        <div className="p-6">
                          <h3 className="text-xl font-bold mb-2 text-gray-900 hover:text-red-600">
                            {news.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-3 flex items-center">
                            <Calendar size={16} className="mr-2" />
                            {news.date}
                          </p>
                          <p className="text-gray-700 leading-relaxed">{news.excerpt}</p>
                          <span className="text-red-600 hover:text-red-800 font-medium mt-4 inline-flex items-center">
                            Devamını Oku →
                          </span>
                        </div>
                      </article>
                    </Link>
                  ))
                ) : (
                  <div className="bg-white rounded-lg shadow-md p-6 text-center">
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">Yakında Haberler</h3>
                    <p className="text-gray-500">Kulübümüzden son haberler yakında burada yer alacak.</p>
                  </div>
                )}
              </div>
            </section>

            {/* Yaklaşan Maçlar */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Yaklaşan Maçlar</h2>
                <a href="/maclar" className="text-red-600 hover:text-red-800 font-medium">
                  Tüm Maçlar →
                </a>
              </div>
              <div className="space-y-4">
                {upcomingMatches.map((match) => (
                  <div key={match.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
                        {match.league}
                      </span>
                      <span className="text-sm text-gray-500">{match.team}</span>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-gray-900">
                          ÜİSK vs {match.opponent}
                        </h3>
                        <p className="text-gray-600 text-sm">{match.venue}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-red-600">{match.date}</p>
                        <p className="text-gray-600 text-sm">{match.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Hızlı Aksiyonlar */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                <a href="/maclar" className="bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition-colors text-center font-medium">
                  Fikstür
                </a>
                <a href="/takimlar" className="border-2 border-red-600 text-red-600 py-3 px-6 rounded-lg hover:bg-red-600 hover:text-white transition-colors text-center font-medium">
                  Takımlar
                </a>
              </div>
            </section>
          </div>
        </div>

        {/* CTA Section */}
        <section className="bg-gray-900 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Üsküdar İcadiye Spor Ailesi</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              1951'den beri Üsküdar'ın gururu olan kulübümüze katılın.
              Gençlerimizi spora yönlendiriyor, gelecek nesillere spor kültürünü aktarıyoruz.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/iletisim" className="bg-red-600 text-white py-3 px-8 rounded-lg hover:bg-red-700 transition-colors font-medium">
                Bize Katılın
              </a>
              <a href="/takimlar" className="border-2 border-white text-white py-3 px-8 rounded-lg hover:bg-white hover:text-gray-900 transition-colors font-medium">
                Takımları İncele
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;