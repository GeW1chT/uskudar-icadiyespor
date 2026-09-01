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
    <header className="sticky top-0 z-50 border-b border-red-900/40 bg-gradient-to-r from-red-800 via-red-700 to-red-900 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex h-14 items-center justify-between sm:h-16">
          {/* Logo ve Takım Adı */}
          <Link href="/" className="flex min-w-0 items-center space-x-2.5 transition-opacity hover:opacity-90 sm:space-x-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white p-1 shadow-lg sm:h-11 sm:w-11">
              <Image
                src="/logo.png"
                alt="Üsküdar İcadiye Spor"
                width={36}
                height={36}
                className="object-contain"
              />
            </div>
            <div className="min-w-0">
              <h1 className="truncate text-sm font-bold sm:text-lg">Üsküdar İcadiye Spor</h1>
              <p className="hidden text-sm text-red-100 md:block">Resmi Web Sitesi</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 lg:flex">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-1 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors hover:bg-white/10 xl:px-3"
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
            className="rounded-lg p-2 transition-colors hover:bg-white/10 lg:hidden"
            aria-label="Menüyü aç/kapat"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="absolute left-0 right-0 border-t border-red-600/70 bg-red-800/98 shadow-xl backdrop-blur lg:hidden">
            <nav className="container mx-auto grid gap-1 px-4 py-3">
              {menuItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-white/10"
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
