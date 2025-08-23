'use client'

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Camera, Calendar, Users, Trophy, Play, X, Image } from 'lucide-react';

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
      title: "A Takım Antrenman Çalışması",
      description: "A takımımızın antrenman çalışmasından kareler",
      date: "2025-08-20",
      category: "training",
      type: "image",
      thumbnail: "/gallery/a-team-training.jpg",
      fullImage: "/gallery/a-team-training.jpg",
      team: "A Takım"
    },
    {
      id: 2,
      title: "U17 Takım Fotoğrafı",
      description: "U17 takımımızın resmi takım fotoğrafı",
      date: "2025-08-18",
      category: "training",
      type: "image",
      thumbnail: "/gallery/u18-team-photo.jpg",
      fullImage: "/gallery/u18-team-photo.jpg",
      team: "U18"
    },
    {
      id: 3,
      title: "U17 Takımımız",
      description: "Altyapı takımımızdan kareler",
      date: "2025-08-15",
      category: "training",
      type: "image",
      thumbnail: "/gallery/youth-team.jpg",
      fullImage: "/gallery/youth-team.jpg",
      team: "Altyapı"
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
      case 'U16': return 'bg-green-100 text-green-800';
      case 'Altyapı': return 'bg-purple-100 text-purple-800';
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
            <div className="text-2xl font-bold text-gray-900">
              {galleryItems.filter(item => item.type === 'image').length}
            </div>
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
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group">
                <div 
                  className="relative aspect-video bg-gray-200 overflow-hidden"
                  onClick={() => openLightbox(item)}
                >
                  {/* Real Image */}
                  <img 
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  
                  {/* Fallback placeholder */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center hidden">
                    {item.type === 'video' ? (
                      <div className="flex flex-col items-center text-white">
                        <Play size={32} className="mb-2" />
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
        ) : (
          /* Empty Gallery Message */
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-gray-400 mb-6">
              <Image size={80} className="mx-auto mb-4 opacity-50" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-600 mb-4">
              {selectedCategory === 'all' ? 'Henüz Galeri İçeriği Bulunmuyor' : `${categories.find(c => c.id === selectedCategory)?.label} kategorisinde içerik bulunmuyor`}
            </h3>
            <p className="text-gray-500 text-lg mb-6 max-w-md mx-auto">
              Kulübümüzden fotoğraf ve videolar yakında paylaşılacak. 
              Maçlarımız, antrenmanlarımız ve özel anlarımızı kaçırmayın.
            </p>
            <div className="bg-red-50 rounded-lg p-6 max-w-lg mx-auto">
              <h4 className="text-red-800 font-semibold mb-3">Yakında Eklenecekler</h4>
              <div className="grid grid-cols-2 gap-4 text-sm text-red-700">
                <div className="flex items-center space-x-2">
                  <Trophy size={16} />
                  <span>Maç Fotoğrafları</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users size={16} />
                  <span>Antrenman Videoları</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar size={16} />
                  <span>Etkinlik Görselleri</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Camera size={16} />
                  <span>Tesis Turları</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Load More Button - only show if there are items */}
        {filteredItems.length > 0 && (
          <div className="text-center mt-12">
            <button className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium">
              Daha Fazla İçerik Yükle
            </button>
          </div>
        )}


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
                <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden mb-4">
                  <img 
                    src={selectedImage.fullImage}
                    alt={selectedImage.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  <div className="w-full h-full flex items-center justify-center hidden">
                    <Camera size={48} className="text-gray-500" />
                  </div>
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