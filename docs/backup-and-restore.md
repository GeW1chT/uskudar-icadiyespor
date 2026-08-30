# Harici Supabase Yedekleme ve Geri Yükleme

Yedekleme her gün 03:30 Türkiye saatiyle çalışır. GitHub Actions, PostgreSQL'i `pg_dump --format=custom` ile ve private `media` bucket'ını ayrı dosyalar olarak alır; hiçbir yedek GitHub'a yazılmaz.

## Gerekli GitHub Actions Secrets

`SUPABASE_DB_URL` (yalnız SSL'li, parolalı doğrudan PostgreSQL bağlantı URL'si), `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `BACKUP_S3_BUCKET`, `BACKUP_S3_ENDPOINT`, `BACKUP_S3_REGION`, `BACKUP_S3_ACCESS_KEY_ID`, `BACKUP_S3_SECRET_ACCESS_KEY` eklenmelidir. Depo, erişim anahtısının yalnız hedef bucket altında `supabase/` önekine listeleme/yükleme/silme hakkı olan ayrı bir IAM hesabı olmalıdır.

## Saklama ve başarısızlık

Private S3 bucket yaşam döngüsünü `supabase/` öneki için 35 gün sonra silme kuralıyla ayarlayın. Bucket public olmamalı, sürümleme ve varsayılan şifreleme açık olmalıdır. GitHub Actions başarısız durumu açık hata raporudur; repository bildirimlerinde başarısız workflow uyarısını etkinleştirin.

## Restore doğrulaması

1. Ayrı bir Supabase test projesi oluşturun; üretim projesine geri yükleme yapmayın.
2. Özel depodan tek bir yedek klasörünü indirin ve `sha256sum -c SHA256SUMS` çalıştırın.
3. Test projesinin doğrudan bağlantısına `pg_restore --clean --if-exists --no-owner --dbname "$TEST_DATABASE_URL" database.dump` uygulayın.
4. `storage` altındaki dosyaları yalnız test projesindeki private `media` bucket'ına service-role anahtarıyla yükleyin.
5. Sayım, RLS ve Storage erişim testlerini çalıştırın; sonuçları Actions çalıştırmasına ekleyin.

Üretimde yanlışlıkla silinme veya Free plan duraklamasında kurtarma, doğrulanmış son yedeği önce test projesine geri yükleyip ardından kontrollü üretim geri yüklemesiyle yapılır.
