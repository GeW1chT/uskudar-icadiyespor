'use client'

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Calendar, Clock, User, Tag, ArrowRight } from 'lucide-react';

const NewsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'Tüm Haberler' },
    { id: 'team', label: 'Takım Haberleri' },
    { id: 'matches', label: 'Maç Haberleri' },
    { id: 'transfers', label: 'Transfer Haberleri' },
    { id: 'youth', label: 'Altyapı Haberleri' },
    { id: 'announcements', label: 'Duyurular' }
  ];

  const news = [
    {
      id: 1,
      title: "A Takımımız Yeni Sezona Güçlü Başladı",
      excerpt: "Üsküdar İcadiye Spor A takımı, 2025 sezonuna hazırlık sürecinde önemli transferler gerçekleştirdi. Takımımız bu sezon şampiyonluk hedefliyor.",
      content: "Kulübümüz A takımı, yeni sezon hazırlıklarını tamamladı. Teknik direktörümüz Ahmet Koç'un yönetiminde yapılan antrenmanlar ve hazırlık maçları sonucunda takımımız sezona hazır durumda. Bu sezon kadromuza katılan yeni oyuncularımızla birlikte hedefimiz şampiyonluk.",
      date: "2025-08-20",
      time: "14:30",
      author: "Spor Editörü",
      category: "team",
      image: "/news-1.jpg",
      featured: true,
      tags: ["A Takım", "Sezon Başlangıcı", "Transfer"]
    },
    {
      id: 2,
      title: "U18 B Ligi'nde Müthiş Galibiyet: 4-1",
      excerpt: "U18 takımımız, lig maçında rakibini 4-1 yenerek sezonun en güzel galibiyetini aldı. Genç oyuncularımız muhteşem bir performans sergiledi.",
      content: "U18 B Ligi takımımız, dün akşam oynanan maçta Fenerbahçe SK'yı 4-1 yenerek büyük bir başarıya imza attı. Maçta hat-trick yapan Emir Çelik ve bir gol atan Kaan Öztürk takımımızı galibiyete taşıdı.",
      date: "2025-08-18",
      time: "16:45",
      author: "Maç Muhabiri",
      category: "matches",
      image: "/news-2.jpg",
      featured: false,
      tags: ["U18", "Galibiyet", "Gol"]
    },
    {
      id: 3,
      title: "Yeni Transfer: Serkan Polat Takımımızda",
      excerpt: "Deneyimli forvet Serkan Polat, kulübümüzle 2 yıllık sözleşme imzaladı. 29 yaşındaki oyuncu A takımımızın forvet hattını güçlendirecek.",
      content: "Kulübümüz, transfer çalışmaları kapsamında deneyimli forvet Serkan Polat ile 2 yıllık sözleşme imzaladı. Daha önce çeşitli amatör liglerde forma giyen Polat, takımımıza tecrübesi ve gol yeteneğiyle katkı sağlayacak.",
      date: "2025-08-15",
      time: "10:00",
      author: "Transfer Editörü",
      category: "transfers",
      image: "/news-3.jpg",
      featured: false,
      tags: ["Transfer", "A Takım", "Forvet"]
    },
    {
      id: 4,
      title: "U16 Altyapımızdan Büyük Başarı",
      excerpt: "U16 takımımızdan 3 oyuncumuz İstanbul Bölge Seçmelerine davet edildi. Genç yeteneklerimiz dikkat çekmeye devam ediyor.",
      content: "Altyapımızın değerli oyuncularından Alp Kırmızı, Efe Sarı ve Mert Beyaz, İstanbul Bölge Seçmelerine davet edildi. Bu başarı, kulübümüzün altyapı çalışmalarının meyvelerini verdiğini gösteriyor.",
      date: "2025-08-12",
      time: "09:15",
      author: "Altyapı Sorumlusu",
      category: "youth",
      image: "/news-4.jpg",
      featured: false,
      tags: ["U16", "Altyapı", "Seçmeler", "Başarı"]
    },
    {
      id: 5,
      title: "Yeni Antrenman Sahaları Açılıyor",
      excerpt: "Kulübümüz, İcadiye'de yeni antrenman sahalarının yapımını tamamladı. Modern tesisler takımlarımızın hizmetinde olacak.",
      content: "İcadiye Mahallesi'nde uzun süredir devam eden yeni antrenman sahalarının yapımı tamamlandı. 2 tam boy çim saha ve modern soyunma odalarından oluşan tesis, tüm takımlarımızın kullanımına açılacak.",
      date: "2025-08-10",
      time: "11:30",
      author: "Yönetim",
      category: "announcements",
      image: "/news-5.jpg",
      featured: false,
      tags: ["Tesis", "Antrenman", "Yatırım"]
    },
    {
      id: 6,
      title: "U17 Takımından Art Arda İkinci Galibiyet",
      excerpt: "U17 B Ligi takımımız, Çengelköy SK'yı 2-0 yenerek ligdeki yükselişini sürdürdü. Ege Tan ve Kerem Uz golleri kaydetti.",
      content: "U17 takımımız, evinde oynadığı maçta Çengelköy SK'yı 2-0 yenerek art arda ikinci galibiyetini aldı. İlk yarıda Ege Tan, ikinci yarıda Kerem Uz'un golleriyle takımımız 3 puanı aldı.",
      date: "2025-08-08",
      time: "17:00",
      author: "Maç Muhabiri",
      category: "matches",
      image: "/news-6.jpg",
      featured: false,
      tags: ["U17", "Galibiyet", "Ev Sahipliği"]
    }
  ];

  const filteredNews = selectedCategory === 'all' 
    ? news 
    : news.filter(item => item.category === selectedCategory);

  const featuredNews = news.filter(item => item.featured);
  const regularNews = filteredNews.filter(item => !item.featured);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('tr-TR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const getCategoryColor = (category: string) => {
    switch(category) {
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

        {/* Featured News */}
        {selectedCategory === 'all' && featuredNews.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Öne Çıkan Haberler</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredNews.map((article) => (
                <article key={article.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="aspect-video bg-gray-200 relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-2 ${getCategoryColor(article.category)}`}>
                        {getCategoryLabel(article.category)}
                      </span>
                      <h3 className="text-white text-xl font-bold leading-tight">{article.title}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <Calendar size={16} className="mr-2" />
                      <span>{formatDate(article.date)}</span>
                      <Clock size={16} className="ml-4 mr-2" />
                      <span>{article.time}</span>
                      <User size={16} className="ml-4 mr-2" />
                      <span>{article.author}</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed mb-4">{article.excerpt}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.tags.map((tag, index) => (
                        <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button className="text-red-600 hover:text-red-800 font-medium inline-flex items-center">
                      Devamını Oku <ArrowRight size={16} className="ml-1" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Regular News */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            {selectedCategory === 'all' ? 'Tüm Haberler' : getCategoryLabel(selectedCategory)}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularNews.map((article) => (
              <article key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gray-200"></div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                      {getCategoryLabel(article.category)}
                    </span>
                    <div className="text-sm text-gray-500">
                      {formatDate(article.date)}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-gray-900 leading-tight hover:text-red-600 cursor-pointer">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 leading-relaxed">{article.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-500">
                      <User size={14} className="mr-1" />
                      <span>{article.author}</span>
                    </div>
                    <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                      Oku →
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium">
            Daha Fazla Haber Yükle
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default NewsPage;