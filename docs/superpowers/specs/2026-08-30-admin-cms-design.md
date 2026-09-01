# Üsküdar İcadiye Spor Yönetim Sistemi Tasarımı

## Amaç

Mevcut Next.js sitesinin görsel kimliğini ve herkese açık sayfalarını koruyarak kulüp yöneticisinin haberleri, maçları, kadroları, galeriyi ve temel site bilgilerini kod değişikliği yapmadan yönetebileceği güvenli bir içerik yönetim sistemi oluşturmak. Sistem Vercel üzerinde yayımlanacak, Supabase kimlik doğrulama, PostgreSQL veritabanı ve görsel depolama sağlayacak.

## Kapsam

İlk sürüm tek yönetici hesabıyla güvenli giriş ve çıkışı; panel ana ekranını; haber, maç, takım, oyuncu, teknik ekip, galeri ve site ayarlarının yönetimini; görsel yüklemeyi; sabit içeriğin başlangıç verisi olarak aktarılmasını; Vercel ve `.com` alan adına hazırlığı kapsar. Logo, renk sistemi, navigasyon yapısı ve sayfa bileşenleri panelden değiştirilmeyecektir.

## Teknik Mimari

Mevcut Next.js 14 App Router, TypeScript ve Tailwind CSS yapısı korunur. Herkese açık sayfalar mümkün olduğunca sunucu tarafında veri okur; yönetim ekranları `/admin` altında bulunur. Supabase Auth yalnızca önceden oluşturulmuş tek yöneticinin girişini, PostgreSQL kalıcı içeriği ve Storage görselleri sağlar. Tarayıcıya yalnızca yayımlanması güvenli istemci bilgileri verilir. Vercel, üretim dağıtımı, özel alan adı, HTTPS ve ortam değişkenlerini yönetir.

## Veri Modeli

`profiles`, `news`, `teams`, `players`, `staff`, `matches`, `standings`, `gallery_items` ve `site_settings` tabloları kullanılır. Takımlar, bağlı oyuncu veya maç bulunduğunda doğrudan silinemez; kullanıcı önce bağlı kayıtları ele alır. İçerik alanları, ilişki kısıtları, benzersizlik ve sıralama kuralları veritabanında korunur.

## Yönetim Paneli

`/admin/login` yalnızca e-posta ve şifreyle giriş sunar; kayıt, davet ve herkese açık şifre oluşturma akışı yoktur. Başarılı giriş `/admin`e yönlenir. Ana ekran haber, yaklaşan maç, takım ve oyuncu özetleriyle hızlı erişim sağlar. Formlar mobil uyumludur, alan-bazlı Türkçe hatalar verir ve silme işlemlerinde açık onay ister. Haberler taslak/yayın, diğer uygun içerikler aktif/pasif durumuna sahiptir.

## Görsel Yükleme

Yönetici cihazından görsel seçebilir. Sistem yalnızca izinli görsel türlerini kabul eder, boyutu sınırlar, içeriği ve yolu sunucuda doğrular, rastgele güvenli ad üretir. İşlem başarısızsa yarım kayıt veya yetim dosya bırakılmaz; değiştirme ve silmede eski varlık kontrollü temizlenir.

## Güvenlik Tasarımı

Yönetim rotaları sunucu tarafında korunur; her yazma işleminde oturum ve `admin` rolü tekrar doğrulanır. RLS tüm yönetilen tablolarda açıktır. Ziyaretçiler yalnızca yayımlanmış/aktif içerikleri okuyabilir; yazma yalnızca yöneticiye aittir. Storage politikaları aynı rolü zorunlu kılar. Girdiler şema doğrulamasından geçer, ham HTML yayınlanmaz, dosya doğrulaması sunucuda yapılır; güvenli çerezler, kontrollü yönlendirme, güvenlik başlıkları ve oran sınırlama uygulanır. Gizli değerler yalnızca ortam değişkenlerindedir.

## Veri Akışı ve Yayınlama

Panel formu sunucu tarafından doğrulanır ve yetkilendirilir; başarılı değişiklikten sonra ilgili herkese açık sayfalar yenilenir. Mevcut sabit içerik, idempotent migration/seed ile aktarılır; veri doğrulanmadan sabit veri kaldırılmaz. Üretime geçiş ayrı önizleme ortamında doğrulanır.

## Hata Yönetimi ve Test

Kullanıcı hataları Türkçe ve alan yanında gösterilir; servis ayrıntıları sızdırılmaz. Ağ hatasında girilen veri korunur ve yeniden deneme yapılabilir. Doğrulama/dönüşüm birim testleri; erişim, RLS ve Storage entegrasyon testleri; temel içerik akışları; TypeScript, lint ve üretim derlemesi çalıştırılır.

## Yayın Stratejisi

Mevcut Vercel sürümü, doğrulanmış yeni üretim sürümü hazır olana kadar çalışır. Şema, politikalar ve başlangıç verisi kurulduktan sonra yeni sürüm yayımlanır. Alan adı Vercel'e son doğrulamalardan sonra bağlanır. Her doğrulanmış dilim ayrı commit edilir ve GitHub'a gönderilir.

## İlk Sürüm Dışında Kalanlar

Birden çok yönetici rolü, ödeme/e-ticaret, taraftar hesapları/yorumlar, federasyon entegrasyonu, gelişmiş analitik ve panelden tema veya sayfa tasarımı değişikliği ilk sürüm kapsamı dışındadır.
