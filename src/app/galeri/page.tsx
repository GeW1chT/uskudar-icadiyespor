'use client'

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Camera, Calendar, Users, Trophy, Play, X } from 'lucide-react';

const GalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const categories = [
    { id: 'all', label: 'Tümü', icon: Camera },
    { id: 'matches', label: 'Maçlar', icon: Trophy },
    { id: 'training', label: 'Antrenmanlar', icon: Users },
    { id: 'events', label: 'Etkinlikler', icon: Calendar },
    { id: 'facilities', label: 'Tesisler', icon: Camera }
  ];

  const galleryItems = [
    {
      id: 1,
      title: "A Takım - Beylerbeyi SK Maçı",
      description: "Evimizde oynanan heyecanlı maçtan kareler",
      date: "2025-08-20",
      category: "matches",
      type: "image",
      thumbnail: "/gallery/match-1-thumb.jpg",
      fullImage: "/gallery/match-1.jpg",
      team: "A Takım"
    },
    {
      id: 2,
      title: "U18 Takımı Antrenman",
      description: "U18 takımımızın yoğun antrenman çalışması",
      date: "2025-08-18",
      category: "training",
      type: "image",
      thumbnail: "/gallery/training-1-thumb.jpg",
      fullImage: "/gallery/training-1.jpg",
      team: "U18"
    },
    {
      id: 3,
      title: "Yeni Sezon Açılış Töreni",
      description: "2025 sezonunu açış törenimizden muhteşem anlar",
      date: "2025-08-15",
      category: "events",
      type: "video",
      thumbnail: "/gallery/opening-thumb.jpg",
      videoUrl: "/gallery/opening-ceremony.mp4",
      duration: "5:23"
    },
    {
      id: 4,
      title: "U17 Galibiyet Sevinci",
      description: "2-0'lık galibiyetin ardından sevinç anları",
      date: "2025-08-12",
      category: "matches",
      type: "image",
      thumbnail: "/gallery/u17-victory-thumb.jpg",
      fullImage: "/gallery/u17-victory.jpg",
      team: "U17"
    },
    {
      id: 5,
      title: "Yeni Antrenman Tesisleri",
      description: "Modern antrenman sahalarımızın açılışı",
      date: "2025-08-10",
      category: "facilities",
      type: "image",
      thumbnail: "/gallery/facilities-thumb.jpg",
      fullImage: "/gallery/facilities.jpg"
    },
    {
      id: 6,
      title: "U16 Takım Fotoğrafı",
      description: "U16 takımımızın yeni sezon takım fotoğrafı",
      date: "2025-08-08",
      category: "training",
      type: "image",
      thumbnail: "/gallery/u16-team-thumb.jpg",
      fullImage: "/gallery/u16-team.jpg",
      team: "U16"
    },
    {
      id: 7,
      title: "Dostluk Maçı Özetleri",
      description: "Hazırlık maçlarından en güzel anlar",
      date: "2025-08-05",
      category: "matches",
      type: "video",
      thumbnail: "/gallery/friendly-match-thumb.jpg",
      videoUrl: "/gallery/friendly-match.mp4",
      duration: "3:45"
    },
    {
      id: 8,
      title: "Kulüp Genel Kurulu",
      description: "Yıllık genel kurul toplantımızdan kareler",
      date: "2025-08-01",
      category: "events",
      type: "image",
      thumbnail: "/gallery/general-assembly-thumb.jpg",
      fullImage: "/gallery/general-assembly.jpg"
    },
    {
      id: 9,
      title: "A Takım Kondisyon Antrenmanı",
      description: "Sezon öncesi kondisyon çalışmalarından",
      date: "2025-07-28",
      category: "training",
      type: "image",
      thumbnail: "/gallery/conditioning-thumb.jpg",
      fullImage: "/gallery/conditioning.jpg",
      team: "A Takım"
    }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('tr-TR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const getTeamColor = (team?: string) => {
    switch(team) {
      case 'A Takım': return 'bg-yellow-100 text-yellow-800';
      case 'U18': return 'bg-blue-100 text-blue-800';
      case 'U17': return 'bg-green-100 text-green-800';
      case 'U16': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const openLightbox = (item: any) => {
    setSelectedImage(item);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Galeri</h1>
          <p className="text-xl text-red-100">Kulübümüzden fotoğraf ve videolar</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center mb-12">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 m-1 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-red-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <IconComponent size={16} />
                <span>{category.label}</span>
              </button>
            );
          })}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <Camera className="w-8 h-8 text-red-600 mx-auto mb-2" />
            <div className="text-sm text-gray-600">Fotoğraf</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <Play className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">
              {galleryItems.filter(item => item.type === 'video').length}
            </div>
            <div className="text-sm text-gray-600">Video</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <Trophy className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">
              {galleryItems.filter(item => item.category === 'matches').length}
            </div>
            <div className="text-sm text-gray-600">Maç Kaydı</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <Calendar className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">
              {galleryItems.filter(item => item.category === 'events').length}
            </div>
            <div className="text-sm text-gray-600">Etkinlik</div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group">
              <div 
                className="relative aspect-video bg-gray-200 overflow-hidden"
                onClick={() => openLightbox(item)}
              >
                {/* Placeholder for thumbnail */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                  {item.type === 'video' ? (
                    <div className="flex flex-col items-center text-white">
                      <Play size={32} className="mb-2" />
                      <span className="text-sm bg-black/50 px-2 py-1 rounded">
                        {item.duration}
                      </span>
                    </div>
                  ) : (
                    <Camera size={32} className="text-gray-500" />
                  )}
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {item.type === 'video' ? (
                      <Play size={40} className="text-white" />
                    ) : (
                      <Camera size={40} className="text-white" />
                    )}
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-500">
                    {formatDate(item.date)}
                  </span>
                  {item.team && (
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getTeamColor(item.team)}`}>
                      {item.team}
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-gray-900 mb-1 leading-tight">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium">
            Daha Fazla İçerik Yükle
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X size={32} />
            </button>
            
            {selectedImage.type === 'video' ? (
              <div className="bg-white rounded-lg p-6 max-w-2xl">
                <h3 className="text-xl font-bold mb-4">{selectedImage.title}</h3>
                <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                  <Play size={48} className="text-gray-500" />
                </div>
                <p className="text-gray-600">{selectedImage.description}</p>
                <div className="mt-4 text-sm text-gray-500">
                  {formatDate(selectedImage.date)} • {selectedImage.duration}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg p-6 max-w-2xl">
                <h3 className="text-xl font-bold mb-4">{selectedImage.title}</h3>
                <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                  <Camera size={48} className="text-gray-500" />
                </div>
                <p className="text-gray-600">{selectedImage.description}</p>
                <div className="mt-4 text-sm text-gray-500">
                  {formatDate(selectedImage.date)}
                  {selectedImage.team && (
                    <span className={`ml-3 px-2 py-1 rounded text-xs font-medium ${getTeamColor(selectedImage.team)}`}>
                      {selectedImage.team}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default GalleryPage;