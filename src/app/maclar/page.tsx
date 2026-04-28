'use client'

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Calendar, MapPin, Trophy, Target, Users, TrendingUp } from 'lucide-react';

const MatchesPage = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const matches = {
    upcoming: [
      {
        id: 8,
        date: '2026-05-03',
        time: '15:00',
        homeTeam: 'Üsküdar İcadiye',
        awayTeam: 'Kartal Topselvi Yıldız Spor Kulübü',
        venue: 'Selimiye Stadı',
        competition: '2. Amatör Lig - 8. Hafta',
        team: 'A Takım',
        isHome: true
      },
      {
        id: 9,
        date: '2026-05-15',
        time: 'TBD',
        homeTeam: 'Maltepe Fındıklı Spor',
        awayTeam: 'Üsküdar İcadiye',
        venue: 'TBD',
        competition: '2. Amatör Lig - 9. Hafta',
        team: 'A Takım',
        isHome: false
      }
    ],
    results: [
      {
        id: 1,
        date: '2026-03-28',
        time: '17:00',
        homeTeam: 'Kartal Topselvi Yıldız Spor Kulübü',
        awayTeam: 'Üsküdar İcadiye',
        venue: 'İBB Yakacık Stadı',
        competition: '2. Amatör Lig - 1. Hafta',
        team: 'A Takım',
        isHome: false,
        homeScore: 1,
        awayScore: 0
      },
      {
        id: 2,
        date: '2026-04-01',
        time: '12:00',
        homeTeam: 'Üsküdar İcadiye',
        awayTeam: 'Maltepe Fındıklı Spor',
        venue: 'Selimiye Stadı',
        competition: '2. Amatör Lig - 2. Hafta',
        team: 'A Takım',
        isHome: true,
        homeScore: 0,
        awayScore: 1
      },
      {
        id: 3,
        date: '2026-04-04',
        time: '16:00',
        homeTeam: 'Heybeliada',
        awayTeam: 'Üsküdar İcadiye',
        venue: 'Kartal 75. Yıl Sahası',
        competition: '2. Amatör Lig - 3. Hafta',
        team: 'A Takım',
        isHome: false,
        homeScore: 4,
        awayScore: 1
      },
      {
        id: 4,
        date: '2026-04-12',
        time: '16:00',
        homeTeam: 'Üsküdar İcadiye',
        awayTeam: 'Feneryolu',
        venue: 'Selimiye Stadı',
        competition: '2. Amatör Lig - 4. Hafta',
        team: 'A Takım',
        isHome: true,
        homeScore: 2,
        awayScore: 1
      },
      {
        id: 5,
        date: '2026-04-15',
        time: '16:00',
        homeTeam: 'Nişantepe Futbol Spor Kulübü',
        awayTeam: 'Üsküdar İcadiye',
        venue: 'Ömerli Stadı',
        competition: '2. Amatör Lig - 5. Hafta',
        team: 'A Takım',
        isHome: false,
        homeScore: null,
        awayScore: null
      },
      {
        id: 6,
        date: '2026-04-18',
        time: '19:00',
        homeTeam: 'Üsküdar İcadiye',
        awayTeam: 'Sarıgazispor',
        venue: 'Selimiye Stadı',
        competition: '2. Amatör Lig - 6. Hafta',
        team: 'A Takım',
        isHome: true,
        homeScore: 0,
        awayScore: 9
      },
      {
        id: 7,
        date: '2026-04-26',
        time: '15:00',
        homeTeam: 'Üsküdar Altınşehir Spor',
        awayTeam: 'Üsküdar İcadiye',
        venue: 'Selimiye Stadı',
        competition: '2. Amatör Lig - 7. Hafta',
        team: 'A Takım',
        isHome: false,
        homeScore: 5,
        awayScore: 1
      }
    ]
  };

  // 2. Amatör Lig 18. Grup - 7. Hafta Puan Durumu
  const standings = [
    { position: 1, team: 'Maltepe Fındıklı Spor',            played: 7, won: 6, drawn: 1, lost: 0, gf: 0, ga: 0, gd: 0, points: 19 },
    { position: 2, team: 'Sarıgazispor',                     played: 7, won: 5, drawn: 0, lost: 2, gf: 0, ga: 0, gd: 0, points: 15 },
    { position: 3, team: 'Kartal Topselvi Yıldız Spor Kulübü', played: 6, won: 3, drawn: 1, lost: 2, gf: 0, ga: 0, gd: 0, points: 10 },
    { position: 4, team: 'Üsküdar Altınşehir Spor',          played: 6, won: 3, drawn: 0, lost: 3, gf: 0, ga: 0, gd: 0, points: 9 },
    { position: 5, team: 'Heybeliada',                       played: 6, won: 3, drawn: 0, lost: 3, gf: 0, ga: 0, gd: 0, points: 9 },
    { position: 6, team: 'Nişantepe Futbol Spor Kulübü',     played: 3, won: 2, drawn: 0, lost: 1, gf: 0, ga: 0, gd: 0, points: 6 },
    { position: 7, team: 'Üsküdar İcadiye',                  played: 6, won: 1, drawn: 0, lost: 5, gf: 0, ga: 0, gd: 0, points: 3 },
    { position: 8, team: 'Feneryolu',                        played: 7, won: 0, drawn: 0, lost: 7, gf: 0, ga: 0, gd: 0, points: 0 }
  ];


  const tabs = [
    { id: 'upcoming', label: 'Yaklaşan Maçlar', icon: Calendar },
    { id: 'results', label: 'Sonuçlar', icon: Target },
    { id: 'standings', label: 'Turnuva Durumu', icon: Trophy }
  ];

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const getTeamColor = (team: string) => {
    switch(team) {
      case 'A Takım': return 'bg-yellow-100 text-yellow-800';
      case 'U18':     return 'bg-blue-100 text-blue-800';
      case 'U16':     return 'bg-purple-100 text-purple-800';
      default:        return 'bg-gray-100 text-gray-800';
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
          {match.date !== 'TBD' ? formatDate(match.date) : 'Tarih Belirlenmedi'}
          {match.time !== 'TBD' ? ` • ${match.time}` : ''}
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
              {match.homeScore !== null && match.awayScore !== null
                ? `${match.homeScore} - ${match.awayScore}`
                : '-'}
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

      {match.venue !== 'TBD' && (
        <div className="flex items-center justify-center text-sm text-gray-600">
          <MapPin size={16} className="mr-1" />
          {match.venue}
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Maç Fikstürü</h1>
          <p className="text-xl text-red-100">2. Amatör Lig - 18. Grup maç programı</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Trophy className="w-8 h-8 text-red-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900">7.</div>
            <div className="text-sm text-gray-600">Sıralama (18. Grup)</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Target className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900">1-0-5</div>
            <div className="text-sm text-gray-600">G-B-M</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900">3 Puan</div>
            <div className="text-sm text-gray-600">7. Haftadan Sonra</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Users className="w-8 h-8 text-purple-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900">2</div>
            <div className="text-sm text-gray-600">Kalan Maç</div>
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
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Maç Sonuçları</h2>
            <div className="space-y-6">
              {matches.results.map((match) => (
                <MatchCard key={match.id} match={match} showScore />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'standings' && (
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Turnuva Durumu</h2>
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
                          team.team === 'Üsküdar İcadiye' 
                            ? 'bg-red-50 font-medium' 
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <td className="py-4 px-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            team.points > 0 ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {team.position}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className={team.team === 'Üsküdar İcadiye' ? 'text-red-600 font-bold' : ''}>
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
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default MatchesPage;