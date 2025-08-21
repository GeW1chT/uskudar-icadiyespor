'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Home, Users, Calendar, Newspaper, Image as ImageIcon, Phone } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { icon: Home, label: 'Ana Sayfa', href: '/' },
    { icon: Users, label: 'Takımlar', href: '/takimlar' },
    { icon: Calendar, label: 'Maçlar', href: '/maclar' },
    { icon: Newspaper, label: 'Haberler', href: '/haberler' },
    { icon: ImageIcon, label: 'Galeri', href: '/galeri' },
    { icon: Phone, label: 'İletişim', href: '/iletisim' },
  ];

  return (
    <header className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white shadow-xl sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo ve Takım Adı */}
          <Link href="/" className="flex items-center space-x-3 hover:opacity-90 transition-opacity">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg p-1">
              <Image
                src="/logo.png"
                alt="Üsküdar İcadiye Spor"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold">Üsküdar İcadiye Spor</h1>
              <p className="text-red-100 text-sm hidden md:block">Resmi Web Sitesi</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center space-x-1 hover:bg-red-600 px-3 py-2 rounded-lg transition-colors duration-200"
                >
                  <IconComponent size={18} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-red-600 transition-colors"
            aria-label="Menüyü aç/kapat"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-red-700 border-t border-red-600 absolute left-0 right-0 shadow-lg">
            <nav className="py-4">
              {menuItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center space-x-3 px-4 py-3 hover:bg-red-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <IconComponent size={20} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;