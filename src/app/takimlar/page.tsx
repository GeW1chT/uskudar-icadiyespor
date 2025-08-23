'use client'

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Users, Trophy, Star } from 'lucide-react';

interface Team {
  title: string;
  description: string;
  league: string;
  players: Array<{
    name: string;
    position: string;
    number: number;
    age: number;
    experience: string;
  }>;
  staff: Array<{
    name: string;
    role: string;
  }>;
}

interface Teams {
  [key: string]: Team;
}

const TeamsPage = () => {
  const [activeTab, setActiveTab] = useState('a-team');

  const teams: Teams = {
    'a-team': {
      title: "A Takım",
      description: "Kulübümüzün deneyimli ve başarılı takımı",
      league: "2. Amatör Lig",
      players: [
        { name: "Ömer Faruk Uyar", position: "Kaleci", number: 1, age: 18, experience: "2 yıl" },
        { name: "Rafet Gültekin", position: "Kaleci", number: 12, age: 17, experience: "4 yıl" },
        { name: "Salih Kocagöz", position: "Sağ Bek", number: 3, age: 20, experience: "4 yıl" },
        { name: "Emirhan Bulut", position: "Sağ Bek", number: 4, age: 19, experience: "3 yıl" },
        { name: "Fatih Talha Kapucu", position: "Sağ Bek", number: 5, age: 16, experience: "2 yıl" },
        { name: "Yasin Göz", position: "Sol Bek", number: 6, age: 18, experience: "2 yıl" },
        { name: "Kuzey Aktaş", position: "Sol Bek", number: 7, age: 17, experience: "4 yıl" },
        { name: "Arda Hamit Atmaca", position: "Stoper", number: 8, age: 18, experience: "2 yıl" },
        { name: "Emirhan Güneş", position: "Stoper", number: 9, age: 19, experience: "3 yıl" },
        { name: "Berke Bozali", position: "Stoper", number: 10, age: 16, experience: "2 yıl" },
        { name: "Yağız Aras Özdemir", position: "Stoper", number: 11, age: 18, experience: "3 yıl" },
        { name: "Metin Mert Öztürk", position: "Stoper", number: 12, age: 24, experience: "2 yıl" },
        { name: "Arda Yücel", position: "Orta Saha", number: 13, age: 19, experience: "4 yıl" },
        { name: "Mehmet İz Hritani", position: "Orta Saha", number: 14, age: 16, experience: "2 yıl" },
        { name: "Tevfik Efe Aktaş", position: "Orta Saha", number: 15, age: 20, experience: "4 yıl" },
        { name: "Beytullah Efe Tanrıkulu", position: "Orta Saha", number: 16, age: 16, experience: "2 yıl" },
        { name: "Muhammet Costel Karakafa", position: "Kanat/Forvet", number: 17, age: 20, experience: "8 yıl" },
        { name: "Onur Çalıkuşu", position: "Kanat", number: 18, age: 18, experience: "1 yıl" },
        { name: "Ahmet Muhammet Ayhan", position: "Forvet", number: 19, age: 18, experience: "2 yıl" },
        { name: "Kerem Yağız Ayin", position: "Sağ Kanat", number: 20, age: 17, experience: "2 yıl" },
        { name: "Sarp Sezer", position: "Sağ Kanat", number: 21, age: 17, experience: "2 yıl" },
        { name: "Mustafa Efe Dağcı", position: "Forvet", number: 22, age: 18, experience: "1 yıl" },
        { name: "Abdulkadir Çetükkaya", position: "Forvet", number: 23, age: 18, experience: "1 yıl" }
      ],
      staff: [
        { name: "Ersin Keskin", role: "Teknik Direktör" },
        { name: "Ümit Bekoğlu", role: "Antrenör" },
        { name: "Murat Ergün", role: "Futbol Direktörü" }
      ]
    },
    'u18': {
      title: "U18 Takımı",
      description: "18 yaş altı yetenekli gençlerimiz",
      league: "U18 Ligi",
      players: [
        { name: "Ahmet Yılmaz", position: "Kaleci", number: 1, age: 17, experience: "2 yıl" },
        { name: "Mehmet Özkan", position: "Defans", number: 2, age: 18, experience: "3 yıl" },
        { name: "Ali Kaya", position: "Defans", number: 3, age: 17, experience: "2 yıl" },
        { name: "Burak Demir", position: "Orta Saha", number: 4, age: 18, experience: "2 yıl" },
        { name: "Emre Aydın", position: "Orta Saha", number: 5, age: 17, experience: "1 yıl" },
        { name: "Can Şahin", position: "Forvet", number: 6, age: 18, experience: "3 yıl" }
      ],
      staff: [
        { name: "Ümit Bekoğlu", role: "Teknik Direktör" },
        { name: "Murat Ergün", role: "Futbol Direktörü" }
      ]
    },
    'u16': {
      title: "U16 Takımı",
      description: "16 yaş altı gelecek yıldızlarımız",
      league: "U16 Ligi",
      players: [
        { name: "Ömer Kaya", position: "Kaleci", number: 1, age: 15, experience: "1 yıl" },
        { name: "Deniz Aktaş", position: "Defans", number: 2, age: 16, experience: "2 yıl" },
        { name: "Rıza Güven", position: "Orta Saha", number: 3, age: 15, experience: "1 yıl" },
        { name: "Alp Kırmızı", position: "Forvet", number: 4, age: 16, experience: "2 yıl" },
        { name: "Mert Beyaz", position: "Defans", number: 5, age: 15, experience: "1 yıl" },
        { name: "Efe Sarı", position: "Kanat", number: 6, age: 16, experience: "1 yıl" }
      ],
      staff: [
        { name: "Ümit Bekoğlu", role: "Teknik Direktör" },
        { name: "Murat Ergün", role: "Futbol Direktörü" }
      ]
    }
  };

  const tabs = [
    { id: 'a-team', label: 'A Takım', icon: Trophy, color: 'text-yellow-600' },
    { id: 'u18', label: 'U18 Takımı', icon: Star, color: 'text-blue-600' },
    { id: 'u16', label: 'U16 Takımı', icon: Users, color: 'text-purple-600' }
  ];

  const currentTeam = teams[activeTab as keyof typeof teams];

  const getPositionColor = (position: string) => {
    if (position.includes('Kaleci')) return 'bg-yellow-100 text-yellow-800';
    if (position.includes('Defans') || position.includes('Bek') || position.includes('Stoper')) return 'bg-blue-100 text-blue-800';
    if (position.includes('Orta Saha')) return 'bg-green-100 text-green-800';
    if (position.includes('Forvet') || position.includes('Kanat')) return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Takımlarımız</h1>
          <p className="text-xl text-red-100">Her yaştan sporcumuzla gururluyuz</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Tabs */}
        <div className="flex flex-wrap justify-center mb-12">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 m-2 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-red-600 text-white shadow-lg transform scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md hover:shadow-lg'
                }`}
              >
                <IconComponent size={20} className={activeTab === tab.id ? 'text-white' : tab.color} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Team Info */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-2">{currentTeam.title}</h2>
                  <p className="text-red-100 mb-2">{currentTeam.description}</p>
                  <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {currentTeam.league}
                  </span>
                </div>
                <div className="mt-4 md:mt-0 text-center">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-white font-bold text-2xl">
                      {currentTeam.title.includes('A') ? 'A' : currentTeam.title.substring(1,3)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Stats */}
            <div className="p-6 bg-gray-50 border-b">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="text-2xl font-bold text-red-600">{currentTeam.players.length}</div>
                  <div className="text-sm text-gray-600">Toplam Oyuncu</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="text-2xl font-bold text-red-600">{currentTeam.staff.length}</div>
                  <div className="text-sm text-gray-600">Teknik Kadro</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="text-2xl font-bold text-red-600">
                    {Math.round(currentTeam.players.reduce((sum, p) => sum + p.age, 0) / currentTeam.players.length)}
                  </div>
                  <div className="text-sm text-gray-600">Ortalama Yaş</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="text-2xl font-bold text-red-600">2025</div>
                  <div className="text-sm text-gray-600">Aktif Sezon</div>
                </div>
              </div>
            </div>

            {/* Technical Staff */}
            <div className="p-6 border-b">
              <h3 className="text-xl font-bold mb-6 text-gray-900 flex items-center">
                <Users className="mr-2 text-red-600" size={24} />
                Teknik Kadro
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentTeam.staff.map((staff, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
                    <h4 className="font-bold text-gray-900">{staff.name}</h4>
                    <p className="text-red-600 font-medium">{staff.role}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Players */}
            <div className="p-6">
              <h3 className="text-xl font-bold mb-6 text-gray-900 flex items-center">
                <Trophy className="mr-2 text-red-600" size={24} />
                Oyuncular
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-4 px-4 font-medium text-gray-600">No</th>
                      <th className="text-left py-4 px-4 font-medium text-gray-600">Ad Soyad</th>
                      <th className="text-left py-4 px-4 font-medium text-gray-600">Pozisyon</th>
                      <th className="text-left py-4 px-4 font-medium text-gray-600">Yaş</th>
                      <th className="text-left py-4 px-4 font-medium text-gray-600">Deneyim</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentTeam.players.map((player, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-4">
                          <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">
                            {player.number}
                          </div>
                        </td>
                        <td className="py-4 px-4 font-medium text-gray-900">{player.name}</td>
                        <td className="py-4 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPositionColor(player.position)}`}>
                            {player.position}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-gray-600">{player.age}</td>
                        <td className="py-4 px-4 text-gray-600">{player.experience}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Kulüp Bilgileri */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-6 text-gray-900">Kulüp Bilgileri</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-600">Kuruluş:</span>
                    <span className="text-gray-900">1951</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-600">Renkler:</span>
                    <span className="text-gray-900">Kırmızı-Beyaz</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="font-medium text-gray-600">Lig:</span>
                    <span className="text-gray-900">{currentTeam.league}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-600">Telefon:</span>
                    <span className="text-gray-900">0216 342 89 27</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-600">Instagram:</span>
                    <span className="text-gray-900">@uskudaricadiyespor</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="font-medium text-gray-600">E-posta:</span>
                    <span className="text-gray-900">info@uskudaricadiyespor.com</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-600 block mb-1">Adres:</span>
                    <span className="text-gray-900 text-sm">
                      İcadiye, Cemil Meriç Sk. No:2<br/>
                      34674 Üsküdar/İstanbul
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TeamsPage;