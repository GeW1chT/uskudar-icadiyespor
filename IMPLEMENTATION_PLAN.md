# Üsküdar İcadiye Spor Güvenli CMS Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Mevcut Next.js sitesini koruyarak Supabase destekli, tek yöneticili, güvenli ve mobil uyumlu bir içerik yönetim sistemi eklemek.

**Architecture:** Supabase, veriyi ve görselleri barındırır; Next.js App Router sunucuda oturum/yetki doğrular ve yalnızca güvenli herkese açık sorguları ziyaretçilere açar. İçerik işlemleri, doğrulama şemaları ve yeniden doğrulanan admin yetkisi üzerinden server action/route handler sınırında çalışır. Mevcut sabit içerik, canlı sayfalar Supabase'e geçirilmeden önce idempotent seed ile aktarılır.

**Tech Stack:** Next.js 14.2.5, React 18, TypeScript, Tailwind CSS, Supabase SSR/Auth/PostgreSQL/Storage, Zod, Vitest, Testing Library, Playwright, ESLint.

**Spec:** `docs/superpowers/specs/2026-08-30-admin-cms-design.md`

## Global Constraints

- Mevcut sayfa, tasarım, logo ve navigasyon yapısı korunur.
- Gerçek URL, anahtar, service role anahtarı veya kullanıcı parolası repoya yazılmaz.
- Kayıt/davet ekranı oluşturulmaz; yalnızca önceden açılmış `admin` profili yazabilir.
- Her yazma isteği sunucuda Zod doğrulaması ve admin kontrolünden geçer.
- Tüm yönetilen tablolarda RLS ve Storage bucket'ında eşdeğer politika bulunur.
- Ziyaretçilere yalnızca yayındaki haberler ve aktif kayıtlar gösterilir.
- Geçiş doğrulanmadan sabit veri kaldırılmaz; seed tekrar çalıştığında kayıt çoğaltmaz.
- Her görev TDD döngüsüyle doğrulanır, sonra yalnız ilgili dosyalar commit edilip push edilir.

---

## File Structure

- `supabase/migrations/`: şema, kısıt, RLS, Storage bucket/politikaları ve seed SQL'i.
- `src/lib/supabase/`: tarayıcı, sunucu ve middleware istemcileri; yetki yardımcıları.
- `src/lib/validation/`: içerik ve yükleme Zod şemaları.
- `src/lib/content/`: herkese açık güvenli sorgular ve güvenli boş durum adaptörleri.
- `src/app/admin/`: korumalı panel layout'u, giriş ve içerik ekranları.
- `src/app/actions/`: server-only doğrulanan CRUD ve yükleme eylemleri.
- `src/components/admin/`: erişilebilir yönetim form/listeleri.
- `src/__tests__/`, `tests/`: birim, bileşen, erişim ve e2e testleri.
- `docs/`: yerel kurulum, Supabase/Vercel/alan adı/rollback kılavuzu.

### Task 1: Güvenli geliştirme temeli ve doğrulama araçları

**Files:** `package.json`, `eslint.config.mjs`, `next.config.js`, `src/app/layout.tsx`, `vitest.config.ts`, `src/test/setup.ts`, `src/lib/validation/__tests__/smoke.test.ts`.

- [ ] Failing Vitest testini yaz: proje test komutunun `smoke` dosyasını bulduğunu doğrula.
- [ ] Testin araç yapılandırması yokken beklenen hata verdiğini çalıştır.
- [ ] `vitest`, Testing Library, Zod ve Supabase paketlerini kilitli bağımlılık olarak ekle; `test`, `test:watch`, `test:e2e`, `typecheck`, otomasyona uygun `lint` betiklerini tanımla.
- [ ] Etkileşimli `next lint` yerine flat ESLint yapılandırmasını çalıştıracak betiği tanımla.
- [ ] `experimental.appDir` ayarını kaldır; mevcut güvenlik başlıklarını CSP, HSTS (yalnız production), `nosniff`, frame/referrer/permissions politikalarıyla güvenli biçimde güçlendir.
- [ ] Google Fonts ağ isteğini kaldırmak üzere `next/font/google` yerine sistem yazı tipi sınıfı uygula.
- [ ] Test, lint, `tsc --noEmit` ve build çalıştır; ardından commit/push: `chore: add CMS development tooling`.

### Task 2: Ortam değişkenleri ve Supabase istemcileri

**Files:** `.env.example`, `src/lib/env.ts`, `src/lib/supabase/browser.ts`, `src/lib/supabase/server.ts`, `src/lib/supabase/middleware.ts`, `src/lib/supabase/types.ts`, `src/lib/env.test.ts`.

- [ ] `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `NEXT_PUBLIC_SITE_URL` için örnek değersiz değişken dosyasını yaz.
- [ ] Eksik genel değişkeni açık ama sır içermeyen hata ile reddeden failing ortam şeması testi yaz ve çalıştır.
- [ ] Sunucu/client/middleware için ayrı SSR istemcileri, yalnız sunucuda okunabilen service-role erişimi ve tip güvenli ortam doğrulaması uygula.
- [ ] Gerçek anahtar içermediğini ve `.env*` ignore kuralını doğrula; test/lint/typecheck çalıştır, commit/push: `feat: add secure Supabase clients`.

### Task 3: İlişkisel şema, RLS ve Storage politikaları

**Files:** `supabase/migrations/202608300001_initial_schema.sql`, `supabase/migrations/202608300002_rls_policies.sql`, `supabase/migrations/202608300003_storage.sql`, `supabase/tests/rls.sql`.

- [ ] Profil rolü, haber yayın görünürlüğü, aktif kayıt görünürlüğü ve takım silme kısıtları için SQL doğrulama senaryolarını yaz.
- [ ] Testlerin migration'lar yokken başarısız olduğunu Supabase CLI ile doğrula.
- [ ] UUID anahtarları, audit tarihleri, gerekli foreign key/unique/check/index kısıtlarıyla `profiles`, `news`, `teams`, `players`, `staff`, `matches`, `standings`, `gallery_items`, `site_settings` tablolarını oluştur.
- [ ] `auth.uid()` üzerinden `admin` rolü denetleyen yardımcı SQL fonksiyonu ve her tabloda RLS politikalarını ekle; public select'i yalnız yayımlanmış/aktif satırlarla sınırla.
- [ ] `media` private bucket'ını, yalnız admin yazma/silme ve güvenli public okuma ihtiyacını karşılayan object politikalarını ekle; dosya yollarını `news/`, `players/`, `gallery/` ile sınırla.
- [ ] SQL testlerini yerel Supabase örneğinde çalıştır; migration diff'ini gözden geçir, commit/push: `feat: add Supabase schema and policies`.

### Task 4: İdempotent sabit içerik taşıma

**Files:** `src/lib/seed/legacy-content.ts`, `supabase/seed.sql`, `scripts/seed-content.ts`, `src/lib/seed/legacy-content.test.ts`, `docs/content-migration.md`.

- [ ] Mevcut `page.tsx`, `haberler`, `maclar`, `takimlar`, `galeri`, `iletisim` dosyalarındaki verileri alan alan envanterleştir.
- [ ] Aynı benzersiz anahtarla iki kez seed edildiğinde kaydın çoğalmadığını gösteren failing test yaz ve çalıştır.
- [ ] Gerçek adları ve mevcut görsel yollarını değiştirmeden sabit içerikleri SQL upsert/seed girdilerine dönüştür; slug, doğal benzersiz anahtar ve sıralama kullan.
- [ ] Seed komutunu dry-run ve doğrulama sayımı üretecek şekilde uygula; eski public kaynakları bu aşamada koru.
- [ ] Seed testini iki kez çalıştır; commit/push: `feat: add idempotent legacy content seed`.

### Task 5: Yetkilendirme, oturum ve saldırı yüzeyi korumaları

**Files:** `middleware.ts`, `src/lib/auth/require-admin.ts`, `src/lib/auth/safe-redirect.ts`, `src/lib/security/rate-limit.ts`, `src/lib/security/csrf.ts`, `src/lib/auth/require-admin.test.ts`, `src/app/admin/login/page.tsx`, `src/app/admin/login/actions.ts`.

- [ ] Oturumsuz `/admin` isteğinin login'e döndüğünü, normal kullanıcının reddedildiğini ve güvenli `next` hedefinin korunduğunu gösteren failing testleri yaz.
- [ ] Testlerin yetki katmanı yokken beklenen nedenlerle başarısız olduğunu çalıştır.
- [ ] Middleware cookie yenilemesini; server-side `requireAdmin` kontrolünü; allow-list tabanlı yönlendirmeyi; giriş için sabit pencereli oran sınırlamayı uygula.
- [ ] Kayıt olma bağlantısı içermeyen Türkçe giriş formunu ve çıkış işlemini ekle; Supabase Auth MFA'nın yönetici tarafından etkinleştirilmesine yönelik hazırlık/dokümantasyon ekle.
- [ ] Yetkisiz/yetkili testleri çalıştır; commit/push: `feat: protect admin access on the server`.

### Task 6: Doğrulama şemaları ve güvenli medya işlemleri

**Files:** `src/lib/validation/content.ts`, `src/lib/validation/media.ts`, `src/lib/media/storage.ts`, `src/lib/validation/content.test.ts`, `src/lib/validation/media.test.ts`.

- [ ] Geçersiz slug, boş başlık, geçersiz skor/durum, eksik takım ilişkisi, izin dışı MIME ve büyük dosya için failing testleri yaz.
- [ ] Testlerin yeni şemalar yokken başarısız olduğunu çalıştır.
- [ ] Zod şemalarıyla tüm CRUD girdilerini sınırla; yalnız JPEG/PNG/WebP/AVIF ve yapılandırılmış boyut limitini kabul et; MIME, imza ve dosya boyutunu sunucuda doğrula.
- [ ] Rastgele UUID adları ve sabit klasör allow-list'i kullan; başarısız veri işlemlerinde yüklenen nesneyi temizleyen telafi akışı ekle.
- [ ] Birim testleri çalıştır; commit/push: `feat: validate CMS input and uploads`.

### Task 7: Admin kabuğu, gösterge paneli ve ortak CRUD altyapısı

**Files:** `src/app/admin/layout.tsx`, `src/app/admin/page.tsx`, `src/components/admin/AdminNav.tsx`, `src/components/admin/StatusNotice.tsx`, `src/components/admin/ConfirmDeleteDialog.tsx`, `src/app/actions/admin.ts`, `src/app/admin/page.test.tsx`.

- [ ] Sayacın yalnız admin için sunulduğunu ve silme iletişim kutusunun açık onay istediğini gösteren failing bileşen testlerini yaz.
- [ ] Testleri çalıştırıp beklenen başarısızlığı gözle.
- [ ] Sunucu tarafı korumalı admin layout, mobil menü, Türkçe durum bildirimi, hızlı bağlantılar ve son güncellenen içerikleri ekle.
- [ ] Ortak action sarmalayıcısında `requireAdmin`, şema doğrulaması, kontrollü hata dönüşü ve `revalidatePath` uygula.
- [ ] Bileşen/birim testleri, lint/typecheck/build çalıştır; commit/push: `feat: add protected admin dashboard`.

### Task 8: Haber yönetimi ve SEO detay sayfaları

**Files:** `src/app/admin/haberler/page.tsx`, `src/app/admin/haberler/yeni/page.tsx`, `src/app/admin/haberler/[id]/page.tsx`, `src/components/admin/NewsForm.tsx`, `src/app/actions/news.ts`, `src/app/haberler/[slug]/page.tsx`, `src/app/haberler/[slug]/not-found.tsx`, ilgili testler.

- [ ] Taslak haberin ziyaretçiye görünmediğini, yayımlanmış haberin slug detayında göründüğünü ve admin formunun alan hatalarını koruduğunu gösteren failing testleri yaz.
- [ ] Testleri kırmızı durumda doğrula.
- [ ] Haber listele/oluştur/düzenle/yayınla/yayından kaldır/sil akışını action ve form ile uygula; içerik düz metin olarak saklanır, HTML render edilmez.
- [ ] `generateMetadata` ile başlık, açıklama, canonical ve güvenli görsel metadata üret.
- [ ] Test/lint/typecheck/build çalıştır; commit/push: `feat: add news CMS and detail pages`.

### Task 9: Takım, oyuncu ve teknik ekip yönetimi

**Files:** `src/app/admin/takimlar/**`, `src/components/admin/TeamForm.tsx`, `PlayerForm.tsx`, `StaffForm.tsx`, `src/app/actions/teams.ts`, `players.ts`, `staff.ts`, ilgili testler.

- [ ] Oyuncunun takım gerektirdiğini ve bağlı kayıt varken takım silmenin Türkçe açıklamayla engellendiğini gösteren failing testleri yaz.
- [ ] Testleri başarısızken çalıştır.
- [ ] Takım, oyuncu ve teknik ekip için erişilebilir liste/form/action akışlarını, sıralama ve aktiflik durumlarını uygula.
- [ ] Görsel değiştirme/silme halinde güvenli Storage temizliğini çağır.
- [ ] Test/lint/typecheck/build çalıştır; commit/push: `feat: manage teams players and staff`.

### Task 10: Maç, sonuç ve puan durumu yönetimi

**Files:** `src/app/admin/maclar/**`, `src/app/admin/puan-durumu/**`, `src/components/admin/MatchForm.tsx`, `StandingForm.tsx`, `src/app/actions/matches.ts`, `standings.ts`, ilgili testler.

- [ ] Sonuçsuz maçta skorun boş kaldığını, tamamlanan maçta iki skor gerektiğini ve puan satırının sezon/lig/takım eşsizliğini gösteren failing testleri yaz.
- [ ] Kırmızı testleri çalıştır.
- [ ] Fikstür, sonuç, durum ve iç saha bilgisini; sezon/lig bazlı puan durumunu yönetilebilir listelerle uygula.
- [ ] Değişiklikte `/`, `/maclar` ve ilgili takım rotalarını yeniden doğrula.
- [ ] Test/lint/typecheck/build çalıştır; commit/push: `feat: manage fixtures results and standings`.

### Task 11: Galeri ve site ayarları yönetimi

**Files:** `src/app/admin/galeri/**`, `src/app/admin/site-ayarlari/page.tsx`, `src/components/admin/GalleryForm.tsx`, `SiteSettingsForm.tsx`, `src/app/actions/gallery.ts`, `settings.ts`, ilgili testler.

- [ ] Pasif galeri kaydının public sorgudan dışlandığını, sosyal URL'nin doğrulandığını ve silme işleminde onay gerektiğini gösteren failing testleri yaz.
- [ ] Testleri uygulama öncesi çalıştır.
- [ ] Galeri CRUD/yükleme ve tek kayıt anahtarlı izinli site ayarları formunu uygula; adres, telefon, e-posta, sosyal bağlantı ve ana sayfa istatistiklerini sınırla.
- [ ] Test/lint/typecheck/build çalıştır; commit/push: `feat: manage gallery and site settings`.

### Task 12: Herkese açık sayfaları kademeli dinamik veriye bağlama

**Files:** `src/lib/content/public.ts`, `src/app/page.tsx`, `haberler/page.tsx`, `maclar/page.tsx`, `takimlar/page.tsx`, `galeri/page.tsx`, `iletisim/page.tsx`, `components/Footer.tsx`, ilgili testler.

- [ ] Yayımlanmış/aktif satırların göründüğünü, hizmet hatasında güvenli boş durum oluştuğunu ve seed öncesinde mevcut sabit içeriğin görüntülendiğini gösteren failing testleri yaz.
- [ ] Testleri kırmızı doğrula.
- [ ] Sunucu veri erişim adaptörlerini ve sabit veri fallback'ini uygula; geçiş doğrulanıp feature flag kaldırılana kadar sayfalar boş kalmaz.
- [ ] Next Image remote pattern/caching/revalidation ayarlarını ekle; mevcut tasarım ve mobil davranışı koru.
- [ ] Test/lint/typecheck/build çalıştır; commit/push: `feat: serve public content from CMS`.

### Task 13: SEO, erişilebilirlik, dokümantasyon ve dağıtım hazırlığı

**Files:** `src/app/robots.ts`, `src/app/sitemap.ts`, `src/lib/site-url.ts`, `docs/supabase-setup.md`, `docs/vercel-deployment.md`, `docs/admin-operations.md`, `README.md`, `.env.example`.

- [ ] Ortam değişkeni yokken sahte `.com` canonical üretmeyen URL helper için failing test yaz.
- [ ] Testi kırmızı doğrula ve site URL helper, robots, sitemap, canonical/metadata akışını uygula.
- [ ] Supabase proje oluşturma, migration/seed yürütme, tek admin oluşturma/MFA, Vercel değişkenleri, preview/production/rollback, kök-www yönlendirme ve HTTPS doğrulama talimatlarını Türkçe yaz.
- [ ] Klavye odağı, form etiketleri, hata duyuruları ve boş durumları denetle.
- [ ] Tam test paketi, SQL policy testleri, lint, typecheck ve production build çalıştır; commit/push: `docs: add CMS deployment and operations guide`.

### Task 14: Gerçek Supabase bağlantısı sonrası doğrulama kontrol listesi

**Files:** `docs/production-verification.md`.

- [ ] Bağlantı bilgisi verildiğinde izlenecek geri alınabilir adımları: proje yedeği, migration, seed dry-run, seed doğrulaması, admin profili, Storage, preview testleri ve production promote olarak belgeleyin.
- [ ] RLS ve Storage testlerinin gerçek proje üzerinde anon/admin oturumlarıyla nasıl çalıştırılacağını belirtin.
- [ ] Giriş, içerik yayınlama, görsel yükleme, mobil form, `.com` canonical/HTTPS ve rollback doğrulama maddelerini ekleyin.
- [ ] Dokümantasyon doğruluğunu gözden geçirip commit/push: `docs: add production verification checklist`.

## Plan Review

- Kapsamın tüm maddeleri Tasks 1–14'te eşlendi: altyapı, RLS/Storage, seed, admin güvenliği, tüm içerik türleri, public geçiş, test, SEO ve yayın.
- Gerçek sır, URL veya anahtar planın hiçbir yerinde bulunmaz.
- Public geçiş seed doğrulamasından sonra ve fallback ile yapılır.
- Her iş dilimi kendi test/kalite kapısı ve commit/push adımıyla biter.
