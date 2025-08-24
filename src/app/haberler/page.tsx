'use client'

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Calendar, Clock, User, ArrowRight, Newspaper, MapPin } from 'lucide-react';

// Maç detayları için bir type tanımı ekleyelim
interface MatchDetails {
  competition: string;
  homeTeam: string;
  awayTeam: string;
  stadium: string;
  kickOffTime: string;
}

// Haber için bir type tanımı ekleyelim
interface NewsItem {
  id: number;
  title: string;
  summary: string;
  date: string;
  author: string;
  category: string;
  image: string; // Resim yolu
  featured: boolean;
  content?: string; // Daha uzun içerik için
  matchDetails?: MatchDetails; // Maç haberi detayları için
}

const NewsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null); // Tıklanan haberi tutacak state

  const categories = [
    { id: 'all', label: 'Tüm Haberler' },
    { id: 'team', label: 'Takım Haberleri' },
    { id: 'matches', label: 'Maç Haberleri' },
    { id: 'transfers', label: 'Transfer Haberleri' },
    { id: 'youth', label: 'Altyapı Haberleri' },
    { id: 'announcements', label: 'Duyurular' }
  ];

  const news: NewsItem[] = [
    {
      id: 1,
      title: 'Bugün Maç Günü! Takımımıza Destek Olmaya Gel!',
      summary: 'Bugün oynanacak önemli maç öncesi, tüm taraftarlarımızı tribünlerde yerini almaya ve takımımızı desteklemeye davet ediyoruz. Maç heyecanı başlıyor!',
      date: '2025-08-23T15:00:00Z',
      author: 'Kulüp Yönetimi',
      category: 'matches',
      image: '/gallery/a-team-training.jpg',
      featured: true,
      content: 'Takımımız, bugün Beylerbeyi Stadyumu\'nda önemli bir maça çıkıyor. Üsküdar Kulüpler Birliği Kupası kapsamında oynanacak olan bu karşılaşmada, A takımımız Vadi Spor ile kozlarını paylaşacak. Saat 18:00\'da başlayacak mücadele için tüm taraftarlarımızı tribünlerdeki yerini almaya davet ediyoruz. Birlikte daha güçlüyüz!',
      matchDetails: {
        competition: 'Üsküdar Kulüpler Birliği Kupası',
        homeTeam: 'Üsküdar İcadiye',
        awayTeam: 'Vadi Spor',
        stadium: 'Beylerbeyi Stadyumu',
        kickOffTime: '18:00'
      }
    },
    {
      id: 2,
      title: 'Üsküdar İcadiye, Vadispor ile 1-1 Berabere Kaldı',
      summary: '18. Üsküdar Kulüpler Birliği Turnuvası’nın ilk maçında takımımız Vadispor ile 1-1 berabere kaldı. Mücadelede oyuncularımız üstün bir performans sergiledi.',
      date: '2025-08-23T18:00:00Z',
      author: 'Kulüp Yönetimi',
      category: 'matches',
      image: '/gallery/match-uskudar-vadispor.jpg', // Görseli buraya koy
      featured: false,
      content: 'Takımımız, Beylerbeyi 75. Yıl Stadyumu’nda oynanan Üsküdar Kulüpler Birliği Turnuvası ilk maçında Vadispor ile 1-1 berabere kaldı. Oyuncularımız sahada mücadeleci ruhlarıyla göz doldurdu. Takımımıza bundan sonraki maçlarında başarılar dileriz.',
      matchDetails: {
        competition: 'Üsküdar Kulüpler Birliği Turnuvası',
        homeTeam: 'Üsküdar İcadiye',
        awayTeam: 'Vadi Spor',
        stadium: 'Beylerbeyi 75. Yıl Stadyumu',
        kickOffTime: '18:00'
      }
    }
  ];

  const filteredNews = selectedCategory === 'all'
    ? news
    : news.filter(item => item.category === selectedCategory);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'team': return 'bg-red-100 text-red-800';
      case 'matches': return 'bg-green-100 text-green-800';
      case 'transfers': return 'bg-blue-100 text-blue-800';
      case 'youth': return 'bg-purple-100 text-purple-800';
      case 'announcements': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryLabel = (category: string) => {
    const cat = categories.find(c => c.id === category);
    return cat ? cat.label : category;
  };

  const NewsDetail = () => {
    if (!selectedNews) return null;

    const { title, date, author, content, image, matchDetails } = selectedNews;

    return (
      <div className="bg-white rounded-lg shadow-md p-6 lg:p-12 mb-8 animate-fade-in">
        <button
          onClick={() => setSelectedNews(null)}
          className="mb-6 flex items-center text-red-600 hover:text-red-800 transition-colors"
        >
          <ArrowRight size={16} className="rotate-180 mr-2" /> Haberlere Geri Dön
        </button>
        <img src={image} alt={title} className="w-full h-80 object-cover rounded-lg mb-8" />
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h1>
        <div className="flex items-center text-sm text-gray-500 mb-6 border-b pb-4">
          <Calendar size={16} className="mr-1" />
          <span>{formatDate(date)}</span>
          <Clock size={16} className="ml-4 mr-1" />
          <span>{new Date(date).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</span>
          <User size={16} className="ml-4 mr-1" />
          <span>{author}</span>
        </div>

        {matchDetails && (
          <div className="bg-white rounded-lg shadow-lg p-6 my-8 border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <span className="px-3 py-1 text-sm font-semibold rounded-full bg-red-100 text-red-800">{matchDetails.competition}</span>
              <div className="text-gray-500 text-sm flex items-center">
                <span>{formatDate(date)}</span>
                <span className="mx-2">•</span>
                <Clock size={16} className="mr-1" />
                <span>{matchDetails.kickOffTime}</span>
              </div>
            </div>
            <div className="grid grid-cols-3 items-center text-center font-bold">
              <h3 className="text-2xl text-red-700">{matchDetails.homeTeam}</h3>
              <span className="text-gray-400 text-xl mx-4">VS</span>
              <h3 className="text-2xl text-gray-800">{matchDetails.awayTeam}</h3>
            </div>
            <div className="mt-4 text-center text-gray-600 flex justify-center items-center">
              <MapPin size={16} className="mr-2" />
              <span>{matchDetails.stadium}</span>
            </div>
          </div>
        )}

        <div className="prose max-w-none text-gray-700 leading-relaxed text-lg">
          <p>{content}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Haberler</h1>
          <p className="text-xl text-red-100">Kulübümüzden son haberler ve gelişmeler</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {selectedNews ? (
          <NewsDetail />
        ) : (
          <>
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center mb-12">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 m-1 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-red-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {/* News List */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-gray-900">
                {selectedCategory === 'all' ? 'Tüm Haberler' : getCategoryLabel(selectedCategory)}
              </h2>

              {filteredNews.length === 0 ? (
                /* No News Available */
                <div className="bg-white rounded-lg shadow-md p-12 text-center">
                  <div className="text-gray-400 mb-6">
                    <Newspaper size={80} className="mx-auto mb-4 opacity-50" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-600 mb-4">Henüz Haber Bulunmuyor</h3>
                  <p className="text-gray-500 text-lg mb-6 max-w-md mx-auto">
                    Kulübümüzden haberler yakında paylaşılacak. Güncel gelişmeler için takipte kalın.
                  </p>
                  <div className="bg-red-50 rounded-lg p-6 max-w-lg mx-auto">
                    <h4 className="text-red-800 font-semibold mb-2">Haberdar Olmak İçin</h4>
                    <p className="text-red-700 text-sm">
                      • Sosyal medya hesaplarımızı takip edin<br />
                      • Web sitemizi düzenli olarak ziyaret edin<br />
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredNews.map((item) => (
                    <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer"
                         onClick={() => setSelectedNews(item)}>
                      <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                      <div className="p-6">
                        <div className="flex items-center text-sm text-gray-500 mb-4">
                          <Calendar size={16} className="mr-1" />
                          <span>{formatDate(item.date)}</span>
                          <span className={`ml-auto px-2 py-1 rounded-full text-xs font-semibold ${getCategoryColor(item.category)}`}>
                            {getCategoryLabel(item.category)}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                        <p className="text-gray-600 mb-4 line-clamp-3">{item.summary}</p>
                        <span className="flex items-center text-red-600 font-semibold hover:text-red-800">
                          Haberin Devamı <ArrowRight size={16} className="ml-1" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default NewsPage;