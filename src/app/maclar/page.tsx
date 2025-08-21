'use client'

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Calendar, Clock, MapPin, Trophy, Target, Users, TrendingUp } from 'lucide-react';

const MatchesPage = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const matches = {
    upcoming: [
      {
        id: 1,
        date: '2025-08-26',
        time: '15:00',
        homeTeam: 'Üsküdar İcadiye Spor',
        awayTeam: 'Beylerbeyi SK',
        venue: 'İcadiye Sahası',
        competition: 'Süper Amatör',
        team: 'A Takım',
        isHome: true
      },
      {
        id: 2,
        date: '2025-08-28',
        time: '14:00',
        homeTeam: 'Kısıklı SK',
        awayTeam: 'Üsküdar İcadiye Spor',
        venue: 'Kısıklı Sahası',
        competition: 'U18 B Ligi',
        team: 'U18',
        isHome: false
      },
      {
        id: 3,
        date: '2025-08-30',
        time: '16:30',
        homeTeam: 'Üsküdar İcadiye Spor',
        awayTeam: 'Çengelköy SK',
        venue: 'İcadiye Sahası',
        competition: 'U17 B Ligi',
        team: 'U17',
        isHome: true
      },
      {
        id: 4,
        date: '2025-09-01',
        time: '15:30',
        homeTeam: 'Beykoz SK',
        awayTeam: 'Üsküdar İcadiye Spor',
        venue: 'Beykoz Sahası',
        competition: 'Süper Amatör',
        team: 'A Takım',
        isHome: false
      },
      {
        id: 5,
        date: '2025-09-03',
        time: '13:00',
        homeTeam: 'Üsküdar İcadiye Spor',
        awayTeam: 'Acıbadem SK',
        venue: 'İcadiye Sahası',
        competition: 'U16 B Ligi',
        team: 'U16',
        isHome: true
      }
    ],
    results: [
      {
        id: 1,
        date: '2025-08-20',
        time: '15:00',
        homeTeam: 'Üsküdar İcadiye Spor',
        awayTeam: 'Kadıköy SK',
        homeScore: 3,
        awayScore: 1,
        venue: 'İcadiye Sahası',
        competition: 'Süper Amatör',
        team: 'A Takım',
        isHome: true,
        goalScorers: ['Emre Özkan 15\'', 'Burak Arslan 34\'', 'Ahmet Kara 78\'']
      },
      {
        id: 2,
        date: '2025-08-18',
        time: '14:00',
        homeTeam: 'Fenerbahçe SK',
        awayTeam: 'Üsküdar İcadiye Spor',
        homeScore: 1,
        awayScore: 3,
        venue: 'Fenerbahçe Sahası',
        competition: 'U18 B Ligi',
        team: 'U18',
        isHome: false,
        goalScorers: ['Cem Aktaş 23\'', 'Emir Çelik 45\'', 'Kaan Öztürk 67\'']
      },
      {
        id: 3,
        date: '2025-08-15',
        time: '16:00',
        homeTeam: 'Üsküdar İcadiye Spor',
        awayTeam: 'Üsküdar SK',
        homeScore: 2,
        awayScore: 0,
        venue: 'İcadiye Sahası',
        competition: 'U17 B Ligi',
        team: 'U17',
        isHome: true,
        goalScorers: ['Ege Tan 30\'', 'Kerem Uz 65\'']
      },
      {
        id: 4,
        date: '2025-08-12',
        time: '13:30',
        homeTeam: 'Bostancı SK',
        awayTeam: 'Üsküdar İcadiye Spor',
        homeScore: 0,
        awayScore: 1,
        venue: 'Bostancı Sahası',
        competition: 'U16 B Ligi',
        team: 'U16',
        isHome: false,
        goalScorers: ['Alp Kırmızı 55\'']
      }
    ]
  };

  const standings = [
    { position: 1, team: 'Beykoz SK', played: 5, won: 4, drawn: 1, lost: 0, gf: 12, ga: 3, gd: 9, points: 13 },
    { position: 2, team: 'Üsküdar İcadiye Spor', played: 5, won: 3, drawn: 1, lost: 1, gf: 9, ga: 5, gd: 4, points: 10 },
    { position: 3, team: 'Beylerbeyi SK', played: 4, won: 3, drawn: 0, lost: 1, gf: 8, ga: 4, gd: 4, points: 9 },
    { position: 4, team: 'Çengelköy SK', played: 4, won: 2, drawn: 2, lost: 0, gf: 6, ga: 3, gd: 3, points: 8 },
    { position: 5, team: 'Kısıklı SK', played: 5, won: 2, drawn: 1, lost: 2, gf: 7, ga: 8, gd: -1, points: 7 },
    { position: 6, team: 'Kadıköy SK', played: 4, won: 1, drawn: 1, lost: 2, gf: 5, ga: 7, gd: -2, points: 4 }
  ];

  const tabs = [
    { id: 'upcoming', label: 'Yaklaşan Maçlar', icon: Calendar },
    { id: 'results', label: 'Sonuçlar', icon: Target },
    { id: 'standings', label: 'Puan Durumu', icon: Trophy }
  ];

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('tr-TR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const getTeamColor = (team: string) => {
    switch(team) {
      case 'A Takım': return 'bg-yellow-100 text-yellow-800';
      case 'U18': return 'bg-blue-100 text-blue-800';
      case 'U17': return 'bg-green-100 text-green-800';
      case 'U16': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const MatchCard = ({ match, showScore = false }: { match: any, showScore?: boolean }) => (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex space-x-2">
          <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-medium">
            {match.competition}
          </span>
          <span className={`px-2 py-1 rounded text-xs font-medium ${getTeamColor(match.team)}`}>
            {match.team}
          </span>
        </div>
        <div className="text-sm text-gray-500">
          {formatDate(match.date)} • {match.time}
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex-1 text-center">
          <div className={`font-bold text-lg ${match.isHome ? 'text-red-600' : 'text-gray-900'}`}>
            {match.homeTeam}
          </div>
          {match.isHome && <div className="text-xs text-red-600 mt-1">EV SAHİBİ</div>}
        </div>

        <div className="px-6 text-center">
          {showScore ? (
            <div className="text-2xl font-bold text-gray-900">
              {match.homeScore} - {match.awayScore}
            </div>
          ) : (
            <div className="text-lg font-bold text-gray-400">VS</div>
          )}
        </div>

        <div className="flex-1 text-center">
          <div className={`font-bold text-lg ${!match.isHome ? 'text-red-600' : 'text-gray-900'}`}>
            {match.awayTeam}
          </div>
          {!match.isHome && <div className="text-xs text-red-600 mt-1">DEPLASMAN</div>}
        </div>
      </div>

      <div className="flex items-center justify-center text-sm text-gray-600 mb-2">
        <MapPin size={16} className="mr-1" />
        {match.venue}
      </div>

      {showScore && match.goalScorers && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="text-sm text-gray-600">
            <strong>Goller:</strong> {match.goalScorers.join(', ')}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Maçlar & Fikstür</h1>
          <p className="text-xl text-red-100">Tüm takımlarımızın maç bilgileri</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Trophy className="w-8 h-8 text-red-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900">2</div>
            <div className="text-sm text-gray-600">A Takım Pozisyonu</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Target className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900">7-1-1</div>
            <div className="text-sm text-gray-600">Toplam G-B-M</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900">15:7</div>
            <div className="text-sm text-gray-600">Toplam Gol Averajı</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Users className="w-8 h-8 text-purple-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900">4</div>
            <div className="text-sm text-gray-600">Aktif Takım</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center mb-8">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 m-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-red-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <IconComponent size={20} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        {activeTab === 'upcoming' && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Yaklaşan Maçlar</h2>
            <div className="space-y-6">
              {matches.upcoming.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'results' && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Son Sonuçlar</h2>
            <div className="space-y-6">
              {matches.results.map((match) => (
                <MatchCard key={match.id} match={match} showScore={true} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'standings' && (
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">A Takım Puan Durumu</h2>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Sıra</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">Takım</th>
                      <th className="text-center py-3 px-4 font-medium text-gray-600">O</th>
                      <th className="text-center py-3 px-4 font-medium text-gray-600">G</th>
                      <th className="text-center py-3 px-4 font-medium text-gray-600">B</th>
                      <th className="text-center py-3 px-4 font-medium text-gray-600">M</th>
                      <th className="text-center py-3 px-4 font-medium text-gray-600">A</th>
                      <th className="text-center py-3 px-4 font-medium text-gray-600">Y</th>
                      <th className="text-center py-3 px-4 font-medium text-gray-600">AV</th>
                      <th className="text-center py-3 px-4 font-medium text-gray-600">P</th>
                    </tr>
                  </thead>
                  <tbody>
                    {standings.map((team) => (
                      <tr
                        key={team.position}
                        className={`border-b border-gray-100 ${
                          team.team === 'Üsküdar İcadiye Spor' 
                            ? 'bg-red-50 font-medium' 
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <td className="py-4 px-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            team.position <= 3 ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {team.position}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className={team.team === 'Üsküdar İcadiye Spor' ? 'text-red-600 font-bold' : ''}>
                            {team.team}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center">{team.played}</td>
                        <td className="py-4 px-4 text-center">{team.won}</td>
                        <td className="py-4 px-4 text-center">{team.drawn}</td>
                        <td className="py-4 px-4 text-center">{team.lost}</td>
                        <td className="py-4 px-4 text-center">{team.gf}</td>
                        <td className="py-4 px-4 text-center">{team.ga}</td>
                        <td className="py-4 px-4 text-center">
                          <span className={team.gd >= 0 ? 'text-green-600' : 'text-red-600'}>
                            {team.gd > 0 ? '+' : ''}{team.gd}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center font-bold">{team.points}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-6 text-sm text-gray-600">
              <p><strong>Açıklama:</strong> O: Oynanan, G: Galibiyet, B: Beraberlik, M: Mağlubiyet, A: Attığı Gol, Y: Yediği Gol, AV: Averaj, P: Puan</p>
            </div>

            {/* Other Teams Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold mb-4 text-blue-600">U18 B Ligi</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Pozisyon:</span>
                    <span className="font-bold">1.</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Puan:</span>
                    <span className="font-bold">15</span>
                  </div>
                  <div className="flex justify-between">
                    <span>G-B-M:</span>
                    <span>5-0-0</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold mb-4 text-green-600">U17 B Ligi</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Pozisyon:</span>
                    <span className="font-bold">2.</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Puan:</span>
                    <span className="font-bold">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span>G-B-M:</span>
                    <span>4-0-1</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold mb-4 text-purple-600">U16 B Ligi</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Pozisyon:</span>
                    <span className="font-bold">3.</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Puan:</span>
                    <span className="font-bold">9</span>
                  </div>
                  <div className="flex justify-between">
                    <span>G-B-M:</span>
                    <span>3-0-2</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default MatchesPage;