'use client'

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Calendar, Clock, User, Tag, ArrowRight, Newspaper } from 'lucide-react';

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

  // Fake haberler kaldırıldı - boş array
  const news: any[] = [];

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

        {/* News Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            {selectedCategory === 'all' ? 'Tüm Haberler' : getCategoryLabel(selectedCategory)}
          </h2>
          
          {/* No News Available */}
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
                • Sosyal medya hesaplarımızı takip edin<br/>
                • Web sitemizi düzenli olarak ziyaret edin<br/>
              
              </p>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default NewsPage;