import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Takım Bilgileri */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">ÜİS</span>
              </div>
              <div>
                <h3 className="text-lg font-bold">Üsküdar İcadiye Spor</h3>
                <p className="text-gray-400 text-sm">Est. 1987</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              1987 yılından beri Üsküdar'ın gururu olan kulübümüz, gençlerin 
              spora yönlendirilmesi ve spor kültürünün geliştirilmesi amacıyla 
              faaliyet göstermektedir.
            </p>
          </div>

          {/* Takımlarımız */}
          <div>
            <h3 className="text-lg font-bold mb-6">Takımlarımız</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/takimlar" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  • A Takım
                </Link>
              </li>
              <li>
                <Link href="/takimlar" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  • U18 B Ligi
                </Link>
              </li>
              <li>
                <Link href="/takimlar" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  • U17 B Ligi
                </Link>
              </li>
              <li>
                <Link href="/takimlar" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  • U16 B Ligi
                </Link>
              </li>
            </ul>
          </div>

          {/* Hızlı Linkler */}
          <div>
            <h3 className="text-lg font-bold mb-6">Hızlı Linkler</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/maclar" className="text-gray-400 hover:text-white transition-colors">
                  Maç Fikstürü
                </Link>
              </li>
              <li>
                <Link href="/haberler" className="text-gray-400 hover:text-white transition-colors">
                  Son Haberler
                </Link>
              </li>
              <li>
                <Link href="/galeri" className="text-gray-400 hover:text-white transition-colors">
                  Fotoğraf Galerisi
                </Link>
              </li>
              <li>
                <Link href="/iletisim" className="text-gray-400 hover:text-white transition-colors">
                  Bize Ulaşın
                </Link>
              </li>
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h3 className="text-lg font-bold mb-6">İletişim</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div className="text-gray-400 text-sm">
                  <p>İcadiye Mahallesi</p>
                  <p>Üsküdar/İstanbul</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-red-400 flex-shrink-0" />
                <a href="tel:+902161234567" className="text-gray-400 text-sm hover:text-white transition-colors">
                  +90 (216) 123 45 67
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-red-400 flex-shrink-0" />
                <a href="mailto:info@uskudaricadiyespor.com" className="text-gray-400 text-sm hover:text-white transition-colors">
                  info@uskudaricadiyespor.com
                </a>
              </div>
            </div>

            {/* Sosyal Medya */}
            <div className="mt-6">
              <h4 className="font-medium mb-4">Bizi Takip Edin</h4>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
                  <Instagram size={18} />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <Facebook size={18} />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors">
                  <Twitter size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Alt Bilgi */}
        <div className="border-t border-gray-800 pt-8 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              <p>&copy; 2025 Üsküdar İcadiye Spor Kulübü. Tüm hakları saklıdır.</p>
            </div>
            <div className="flex space-x-6 text-gray-400 text-sm">
              <Link href="/gizlilik" className="hover:text-white transition-colors">
                Gizlilik Politikası
              </Link>
              <Link href="/kullanim" className="hover:text-white transition-colors">
                Kullanım Şartları
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;