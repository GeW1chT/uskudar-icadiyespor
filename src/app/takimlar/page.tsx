'use client'

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Users, Trophy, Star, Calendar, Award } from 'lucide-react';

const TeamsPage = () => {
  const [activeTab, setActiveTab] = useState('a-team');

  const teams = {
    'a-team': {
      title: "A Takım",
      description: "Kulübümüzün deneyimli ve başarılı takımı",
      league: "Süper Amatör Ligi",
      players: [
        { name: "Mehmet Yılmaz", position: "Kaleci", number: 1, age: 28, experience: "5 yıl" },
        { name: "Ali Demir", position: "Sağ Bek", number: 2, age: 26, experience: "4 yıl" },
        { name: "Hasan Kaya", position: "Stoper", number: 3, age: 24, experience: "3 yıl" },
        { name: "Murat Şen", position: "Sol Bek", number: 4, age: 25, experience: "4 yıl" },
        { name: "Okan Şahin", position: "Def. Orta Saha", number: 6, age: 25, experience: "6 yıl" },
        { name: "Emre Özkan", position: "Orta Saha", number: 8, age: 27, experience: "7 yıl" },
        { name: "Burak Arslan", position: "Kanat", number: 7, age: 23, experience: "2 yıl" },
        { name: "Kemal Yıldız", position: "Kanat", number: 11, age: 24, experience: "3 yıl" },
        { name: "Ahmet Kara", position: "Forvet", number: 9, age: 26, experience: "5 yıl" },
        { name: "Serkan Polat", position: "Forvet", number: 10, age: 29, experience: "8 yıl" }
      ],
      staff: [
        { name: "Ahmet Koç", role: "Baş Antrenör", experience: "12 yıl" },
        { name: "Selim Aydın", role: "Yardımcı Antrenör", experience: "8 yıl" },
        { name: "Dr. Fatma Gürel", role: "Fizyoterapist", experience: "6 yıl" },
        { name: "Cengiz Özdemir", role: "Kondisyoner", experience: "4 yıl" }
      ]
    },
    'u18': {
      title: "U18 B Ligi",
      description: "18 yaş altı yetenekli gençlerimiz",
      league: "U18 B Ligi",
      players: [
        { name: "Cem Aktaş", position: "Kaleci", number: 1, age: 18, experience: "2 yıl" },
        { name: "Onur Bilgin", position: "Defans", number: 4, age: 17, experience: "1 yıl" },
        { name: "Kaan Öztürk", position: "Orta Saha", number: 6, age: 18, experience: "3 yıl" },
        { name: "Emir Çelik", position: "Forvet", number: 11, age: 17, experience: "2 yıl" },
        { name: "Yusuf Kaya", position: "Defans", number: 3, age: 18, experience: "2 yıl" },
        { name: "Eren Demir", position: "Orta Saha", number: 8, age: 17, experience: "1 yıl" }
      ],
      staff: [
        { name: "İsmail Erdoğan", role: "Antrenör", experience: "6 yıl" },
        { name: "Murat Yıldız", role: "Kondisyoner", experience: "3 yıl" }
      ]
    },
    'u17': {
      title: "U17 B Ligi",
      description: "17 yaş altı umut vadeden gençler",
      league: "U17 B Ligi",
      players: [
        { name: "Batuhan Kır", position: "Kaleci", number: 1, age: 16, experience: "1 yıl" },
        { name: "Arda Şen", position: "Defans", number: 5, age: 16, experience: "2 yıl" },
        { name: "Ege Tan", position: "Orta Saha", number: 7, age: 15, experience: "1 yıl" },
        { name: "Kerem Uz", position: "Forvet", number: 9, age: 16, experience: "1 yıl" },
        { name: "Berat Aydın", position: "Defans", number: 2, age: 16, experience: "1 yıl" },
        { name: "Can Özgür", position: "Orta Saha", number: 10, age: 17, experience: "2 yıl" }
      ],
      staff: [
        { name: "Cengiz Polat", role: "Antrenör", experience: "4 yıl" },
        { name: "Hakan Yılmaz", role: "Yardımcı Antrenör", experience: "2 yıl" }
      ]
    },
    'u16': {
      title: "U16 B Ligi",
      description: "16 yaş altı gelecek yıldızlarımız",
      league: "U16 B Ligi",
      players: [
        { name: "Ömer Kaya", position: "Kaleci", number: 1, age: 15, experience: "6 ay" },
        { name: "Deniz Aktaş", position: "Defans", number: 3, age: 16, experience: "1 yıl" },
        { name: "Rıza Güven", position: "Orta Saha", number: 6, age: 15, experience: "8 ay" },
        { name: "Alp Kırmızı", position: "Forvet", number: 9, age: 16, experience: "1 yıl" },
        { name: "Mert Beyaz", position: "Defans", number: 4, age: 15, experience: "6 ay" },
        { name: "Efe Sarı", position: "Kanat", number: 11, age: 16, experience: "1 yıl" }
      ],
      staff: [
        { name: "Orhan Demirel", role: "Antrenör", experience: "5 yıl" }
      ]
    }
  };

  const tabs = [
    { id: 'a-team', label: 'A Takım', icon: Trophy, color: 'text-yellow-600' },
    { id: 'u18', label: 'U18 B Ligi', icon: Star, color: 'text-blue-600' },
    { id: 'u17', label: 'U17 B Ligi', icon: Award, color: 'text-green-600' },
    { id: 'u16', label: 'U16 B Ligi', icon: Users, color: 'text-purple-600' }
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
                    <p className="text-gray-600 text-sm">Deneyim: {staff.experience}</p>
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

          {/* Additional Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center">
                <Calendar className="mr-2 text-red-600" size={24} />
                Antrenman Programı
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Pazartesi - Çarşamba - Cuma</span>
                  <span className="font-bold text-red-600">
                    {activeTab === 'a-team' ? '19:00 - 21:00' : 
                     activeTab === 'u18' ? '17:00 - 19:00' : 
                     activeTab === 'u17' ? '15:30 - 17:30' : '14:00 - 16:00'}
                  </span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Cumartesi</span>
                  <span className="font-bold text-red-600">
                    {activeTab === 'a-team' ? '16:00 - 18:00' : '10:00 - 12:00'}
                  </span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-gray-600 font-medium">Pazar</span>
                  <span className="font-bold text-green-600">Maç Günü</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Takım Bilgileri</h3>
              <div className="space-y-3 text-gray-600">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="font-medium">Kuruluş:</span>
                  <span>1987</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="font-medium">Renkler:</span>
                  <span>Kırmızı-Beyaz</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="font-medium">Stadyum:</span>
                  <span>İcadiye Sahası</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="font-medium">Kapasite:</span>
                  <span>500 kişi</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-medium">Lig:</span>
                  <span>{currentTeam.league}</span>
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