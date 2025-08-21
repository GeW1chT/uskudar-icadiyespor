'use client'

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { MapPin, Phone, Mail, Clock, Send, User, MessageSquare, Instagram, Facebook, Twitter } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    category: 'general'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      alert('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        category: 'general'
      });
      setIsSubmitting(false);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Adres",
      details: [
        "İcadiye Mahallesi",
        "Üsküdar/İstanbul",
        "34684"
      ],
      color: "text-red-600"
    },
    {
      icon: Phone,
      title: "Telefon",
      details: [
        "+90 (216) 123 45 67",
        "+90 (216) 123 45 68"
      ],
      color: "text-green-600"
    },
    {
      icon: Mail,
      title: "E-posta",
      details: [
        "info@uskudaricadiyespor.com",
        "yonetim@uskudaricadiyespor.com"
      ],
      color: "text-blue-600"
    },
    {
      icon: Clock,
      title: "Çalışma Saatleri",
      details: [
        "Pazartesi - Cuma: 09:00 - 18:00",
        "Cumartesi: 09:00 - 15:00",
        "Pazar: Kapalı"
      ],
      color: "text-purple-600"
    }
  ];

  const departments = [
    { value: "general", label: "Genel Bilgi" },
    { value: "membership", label: "Üyelik İşlemleri" },
    { value: "youth", label: "Altyapı/Genç Takımlar" },
    { value: "sponsorship", label: "Sponsorluk" },
    { value: "facilities", label: "Tesis Kiralama" },
    { value: "media", label: "Basın/Medya" }
  ];

  const socialMedia = [
    { 
      icon: Instagram, 
      name: "Instagram", 
      url: "#", 
      handle: "@uskudaricadiyespor",
      color: "hover:bg-pink-600"
    },
    { 
      icon: Facebook, 
      name: "Facebook", 
      url: "#", 
      handle: "Üsküdar İcadiye Spor",
      color: "hover:bg-blue-600"
    },
    { 
      icon: Twitter, 
      name: "Twitter", 
      url: "#", 
      handle: "@uskudaricadiye",
      color: "hover:bg-blue-400"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">İletişim</h1>
          <p className="text-xl text-red-100">Bizimle iletişime geçin</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold mb-8 text-gray-900">İletişim Bilgileri</h2>
            
            <div className="space-y-6">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <div key={index} className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-lg bg-gray-100 ${info.color}`}>
                        <IconComponent size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-2">{info.title}</h3>
                        {info.details.map((detail, detailIndex) => (
                          <p key={detailIndex} className="text-gray-600 text-sm mb-1">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Social Media */}
            <div className="mt-8">
              <h3 className="text-lg font-bold mb-4 text-gray-900">Sosyal Medya</h3>
              <div className="space-y-3">
                {socialMedia.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.url}
                      className={`flex items-center space-x-3 p-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-all ${social.color} hover:text-white group`}
                    >
                      <IconComponent size={20} className="group-hover:text-white" />
                      <div>
                        <div className="font-medium">{social.name}</div>
                        <div className="text-sm text-gray-500 group-hover:text-white/80">
                          {social.handle}
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick Info */}
            <div className="mt-8 bg-red-50 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-3 text-red-800">Hızlı Bilgi</h3>
              <ul className="space-y-2 text-sm text-red-700">
                <li>• Üyelik başvuruları her yaş için açıktır</li>
                <li>• Antrenmanları izlemek için randevu alabilirsiniz</li>
                <li>• Tesis kiralamalar için önceden rezervasyon gereklidir</li>
                <li>• Sponsorluk teklifleri için yönetim ile iletişime geçin</li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Bize Mesaj Gönderin</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Ad Soyad *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="Adınızı ve soyadınızı girin"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      E-posta *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="E-posta adresinizi girin"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Telefon
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="Telefon numaranızı girin"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                      Konu Kategori *
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      {departments.map((dept) => (
                        <option key={dept.value} value={dept.value}>
                          {dept.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Konu Başlığı *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Mesajınızın konusunu girin"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Mesajınız *
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-4 text-gray-400" size={20} />
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                      placeholder="Mesajınızı detaylı olarak yazın..."
                    />
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">
                    <strong>Not:</strong> Mesajınız en geç 24 saat içinde yanıtlanacaktır. 
                    Acil durumlar için lütfen telefon numaralarımızı kullanın.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="spinner"></div>
                      <span>Gönderiliyor...</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      <span>Mesaj Gönder</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">Konumumuz</h2>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="aspect-video bg-gray-200 flex items-center justify-center">
              <div className="text-center">
                <MapPin size={48} className="text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">
                  İcadiye Mahallesi, Üsküdar/İstanbul
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Harita entegrasyonu yakında...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactPage;