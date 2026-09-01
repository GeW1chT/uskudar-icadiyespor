-- Idempotent seed: source values are transcribed from the existing public pages.
-- Re-running this file updates natural keys instead of creating duplicates.

insert into public.teams (name, slug, age_group, league, description, active_season, sort_order)
values
  ('A Takım', 'a-takim', null, '2. Amatör Lig', 'Kulübümüzün deneyimli ve başarılı takımı', '2025-2026', 0),
  ('U18 Takımı', 'u18-takimi', 'U18', 'U18 Ligi', '18 yaş altı yetenekli gençlerimiz', '2025-2026', 1),
  ('U16 Takımı', 'u16-takimi', 'U16', 'U16 Ligi', '16 yaş altı gelecek yıldızlarımız', '2025-2026', 2)
on conflict (slug) do update set
  name = excluded.name, age_group = excluded.age_group, league = excluded.league,
  description = excluded.description, active_season = excluded.active_season,
  sort_order = excluded.sort_order, is_active = true;

insert into public.players (team_id, full_name, shirt_number, position, experience, sort_order)
select t.id, v.full_name, v.shirt_number, v.position, v.experience, v.sort_order
from (values
  ('a-takim','Ömer Faruk Uyar',1,'Kaleci',null,1), ('a-takim','Berke Bozali',4,'Defans',null,4),
  ('a-takim','Alper Bekir Özçelik',5,'Defans',null,5), ('a-takim','Metin Mert Öztürk',6,'Defans',null,6),
  ('a-takim','Ayaz Taşanyürek',7,'Defans',null,7), ('a-takim','Efe Albayrak',9,'Defans',null,9),
  ('a-takim','Muhammet Costel Karakafa',10,'Defans',null,10), ('a-takim','Emirhan Usta',11,'Defans',null,11),
  ('a-takim','Okan Batıkan Şahin',13,'Orta Saha',null,13), ('a-takim','Güney Aygün',20,'Orta Saha',null,20),
  ('a-takim','Emirhan Güneş',21,'Orta Saha',null,21), ('a-takim','Mert Uğur',22,'Orta Saha',null,22),
  ('a-takim','Emirhan Bulut',23,'Orta Saha',null,23), ('a-takim','Mustafa Efe Dağcı',25,'Orta Saha',null,25),
  ('a-takim','Abdulkadir Çetükkaya',28,'Orta Saha',null,28), ('a-takim','Furkan Barış Ava',34,'Orta Saha',null,34),
  ('a-takim','Furkan Öz',37,'Orta Saha',null,37), ('a-takim','Enis Dal',46,'Kanat',null,46),
  ('a-takim','Arda Yücel',52,'Kanat',null,52), ('a-takim','Zeki Berkay Köksal',53,'Kanat',null,53),
  ('a-takim','Ayberk Hüda Yaman',55,'Forvet',null,55), ('a-takim','Onur Çalıkuşu',60,'Forvet',null,60),
  ('a-takim','Kaan Kukul',61,'Forvet',null,61), ('a-takim','Salih Kocagöz',67,'Forvet',null,67),
  ('a-takim','Fehmi Burak Öz',88,'Forvet',null,88), ('a-takim','Eren Mert Özbey',94,'Forvet',null,94),
  ('a-takim','Ertan Sağlam',95,'Forvet',null,95),
  ('u18-takimi','Ahmet Yılmaz',1,'Kaleci','2 yıl',1), ('u18-takimi','Mehmet Özkan',2,'Defans','3 yıl',2),
  ('u18-takimi','Ali Kaya',3,'Defans','2 yıl',3), ('u18-takimi','Burak Demir',4,'Orta Saha','2 yıl',4),
  ('u18-takimi','Emre Aydın',5,'Orta Saha','1 yıl',5), ('u18-takimi','Can Şahin',6,'Forvet','3 yıl',6),
  ('u16-takimi','Osman Yılmaz',1,'Kaleci','1 yıl',1), ('u16-takimi','Numut Umut Bekoğlu',2,'Kaleci','1 yıl',2),
  ('u16-takimi','Recep Doruk Özdemir',3,'Sağ Bek','1 yıl',3), ('u16-takimi','Ahmet Said Karaca',4,'Sağ Bek','1 yıl',4),
  ('u16-takimi','Ali Berkay Bir',5,'Sol Bek','1 yıl',5), ('u16-takimi','Ege Yiğit Türk',6,'Stoper','1 yıl',6),
  ('u16-takimi','Ozan Taş',7,'Stoper','1 yıl',7), ('u16-takimi','Ömer Efe Köse',8,'Stoper','1 yıl',8),
  ('u16-takimi','Utku Özgül',9,'Sağ Bek','1 yıl',9), ('u16-takimi','Ahmet Yusuf Akın',10,'Orta Saha','1 yıl',10),
  ('u16-takimi','Emre Eken',11,'Orta Saha','1 yıl',11), ('u16-takimi','Mustafa Küçükağız',12,'Orta Saha','1 yıl',12),
  ('u16-takimi','Özgür Can Akan',13,'Sol Kanat','1 yıl',13), ('u16-takimi','Kerem Erdoğan',14,'Sağ Kanat','1 yıl',14),
  ('u16-takimi','Tamer Hritani',15,'Kanat Forvet','1 yıl',15), ('u16-takimi','Ensar Kartal',16,'Forvet','1 yıl',16),
  ('u16-takimi','Aziz Eren Berber',17,'Forvet','1 yıl',17), ('u16-takimi','Mustafa Ali Altıntaş',18,'Sağ Bek','1 yıl',18)
) as v(team_slug, full_name, shirt_number, position, experience, sort_order)
join public.teams t on t.slug = v.team_slug
on conflict (team_id, shirt_number) do update set
  full_name = excluded.full_name, position = excluded.position, experience = excluded.experience,
  sort_order = excluded.sort_order, is_active = true;

insert into public.staff (team_id, full_name, job_title, sort_order)
select t.id, v.full_name, v.job_title, v.sort_order
from (values
  ('a-takim','Çetin Savaş','Teknik Direktör',1), ('a-takim','Murat Ergün','Yönetici',2),
  ('u18-takimi','Çetin Savaş','Teknik Direktör',1), ('u18-takimi','Murat Ergün','Yönetici',2),
  ('u16-takimi','Çetin Savaş','Teknik Direktör',1), ('u16-takimi','Murat Ergün','Yönetici',2)
) as v(team_slug, full_name, job_title, sort_order)
join public.teams t on t.slug = v.team_slug
where not exists (select 1 from public.staff s where s.team_id = t.id and s.full_name = v.full_name and s.job_title = v.job_title);

insert into public.matches (team_id, home_team, away_team, competition, week, match_date, kickoff_time, stadium, home_score, away_score, status, is_home)
select t.id, v.home_team, v.away_team, v.competition, v.week, v.match_date, v.kickoff_time, v.stadium, v.home_score, v.away_score, v.status::public.match_status, v.is_home
from (values
  ('Üsküdar İcadiye','Kartal Topselvi Yıldız Spor Kulübü','2. Amatör Lig - 8. Hafta',8,date '2026-05-03',time '15:00','Selimiye Stadı',null::smallint,null::smallint,'scheduled',true),
  ('Maltepe Fındıklı Spor','Üsküdar İcadiye','2. Amatör Lig - 9. Hafta',9,date '2026-05-15',null,'TBD',null::smallint,null::smallint,'scheduled',false),
  ('Kartal Topselvi Yıldız Spor Kulübü','Üsküdar İcadiye','2. Amatör Lig - 1. Hafta',1,date '2026-03-28',time '17:00','İBB Yakacık Stadı',1::smallint,0::smallint,'completed',false),
  ('Üsküdar İcadiye','Maltepe Fındıklı Spor','2. Amatör Lig - 2. Hafta',2,date '2026-04-01',time '12:00','Selimiye Stadı',0::smallint,1::smallint,'completed',true),
  ('Heybeliada','Üsküdar İcadiye','2. Amatör Lig - 3. Hafta',3,date '2026-04-04',time '16:00','Kartal 75. Yıl Sahası',4::smallint,1::smallint,'completed',false),
  ('Üsküdar İcadiye','Feneryolu','2. Amatör Lig - 4. Hafta',4,date '2026-04-12',time '16:00','Selimiye Stadı',2::smallint,1::smallint,'completed',true),
  ('Nişantepe Futbol Spor Kulübü','Üsküdar İcadiye','2. Amatör Lig - 5. Hafta',5,date '2026-04-15',time '16:00','Ömerli Stadı',null::smallint,null::smallint,'scheduled',false),
  ('Üsküdar İcadiye','Sarıgazispor','2. Amatör Lig - 6. Hafta',6,date '2026-04-18',time '19:00','Selimiye Stadı',0::smallint,9::smallint,'completed',true),
  ('Üsküdar Altınşehir Spor','Üsküdar İcadiye','2. Amatör Lig - 7. Hafta',7,date '2026-04-26',time '15:00','Selimiye Stadı',5::smallint,1::smallint,'completed',false)
) as v(home_team, away_team, competition, week, match_date, kickoff_time, stadium, home_score, away_score, status, is_home)
cross join (select id from public.teams where slug = 'a-takim') t
where not exists (select 1 from public.matches m where m.team_id = t.id and m.competition = v.competition and m.week = v.week);

insert into public.standings (season, league_group, team_name, played, won, drawn, lost, goals_for, goals_against, goal_difference, points, position)
values
  ('2025-2026','2. Amatör Lig 18. Grup','Maltepe Fındıklı Spor',7,6,1,0,0,0,0,19,1),
  ('2025-2026','2. Amatör Lig 18. Grup','Sarıgazispor',7,5,0,2,0,0,0,15,2),
  ('2025-2026','2. Amatör Lig 18. Grup','Kartal Topselvi Yıldız Spor Kulübü',6,3,1,2,0,0,0,10,3),
  ('2025-2026','2. Amatör Lig 18. Grup','Üsküdar Altınşehir Spor',6,3,0,3,0,0,0,9,4),
  ('2025-2026','2. Amatör Lig 18. Grup','Heybeliada',6,3,0,3,0,0,0,9,5),
  ('2025-2026','2. Amatör Lig 18. Grup','Nişantepe Futbol Spor Kulübü',3,2,0,1,0,0,0,6,6),
  ('2025-2026','2. Amatör Lig 18. Grup','Üsküdar İcadiye',6,1,0,5,0,0,0,3,7),
  ('2025-2026','2. Amatör Lig 18. Grup','Feneryolu',7,0,0,7,0,0,0,0,8)
on conflict (season, league_group, team_name) do update set
  played = excluded.played, won = excluded.won, drawn = excluded.drawn, lost = excluded.lost,
  goals_for = excluded.goals_for, goals_against = excluded.goals_against,
  goal_difference = excluded.goal_difference, points = excluded.points, position = excluded.position, is_active = true;

insert into public.news (title, slug, summary, content, category, cover_image_path, status, is_featured, published_at)
values
  ('Bugün Maç Günü! Takımımıza Destek Olmaya Gel!', 'bugun-mac-gunu-takimimiza-destek-olmaya-gel', 'Bugün oynanacak önemli maç öncesi, tüm taraftarlarımızı tribünlerde yerini almaya ve takımımızı desteklemeye davet ediyoruz.', 'Takımımız, bugün Beylerbeyi Stadyumu''nda önemli bir maça çıkıyor. Üsküdar Kulüpler Birliği Kupası kapsamında oynanacak olan bu karşılaşmada, A takımımız Vadi Spor ile kozlarını paylaşacak. Saat 18:00''da başlayacak mücadele için tüm taraftarlarımızı tribünlerdeki yerini almaya davet ediyoruz. Birlikte daha güçlüyüz!', 'matches', 'news/a-team-training.jpg', 'published', true, timestamptz '2025-08-23 12:00:00+03'),
  ('Üsküdar İcadiye, Vadispor ile 1-1 Berabere Kaldı', 'uskudar-icadiye-vadispor-ile-bir-bir-berabere-kaldi', '18. Üsküdar Kulüpler Birliği Turnuvası’nın ilk maçında takımımız Vadispor ile 1-1 berabere kaldı. Mücadelede oyuncularımız üstün bir performans sergiledi.', '18. Üsküdar Kulüpler Birliği Turnuvası''nın ilk maçında takımımız Vadispor ile 1-1 berabere kaldı. Mücadelede oyuncularımız üstün bir performans sergiledi.', 'matches', 'news/match-uskudar-vadispor.jpg', 'published', false, timestamptz '2025-08-23 13:00:00+03')
on conflict (slug) do update set
  title = excluded.title, summary = excluded.summary, content = excluded.content, category = excluded.category,
  cover_image_path = excluded.cover_image_path, status = excluded.status, is_featured = excluded.is_featured, published_at = excluded.published_at;

insert into public.gallery_items (title, description, image_path, taken_at, category, sort_order)
values
  ('A Takım Antrenmanı', 'A takımımızın antrenman çalışmasından kareler', 'gallery/a-team-training.jpg', date '2025-08-20', 'training', 1),
  ('U18 Takım Fotoğrafı', 'U17 takımımızın resmi takım fotoğrafı', 'gallery/u18-team-photo.jpg', date '2025-08-18', 'teams', 2),
  ('Altyapı Takımı', 'Altyapı takımımızdan kareler', 'gallery/youth-team.jpg', date '2025-08-15', 'teams', 3)
on conflict (image_path) do update set
  title = excluded.title, description = excluded.description, taken_at = excluded.taken_at,
  category = excluded.category, sort_order = excluded.sort_order, is_active = true;

insert into public.site_settings (id, home_hero_title, home_hero_text, club_description, address, phone, email, instagram_url, statistics)
values (
  true, 'Üsküdar İcadiye Spor', 'Gelenekten Geleceğe, Spor Ruhuyla',
  '1951 yılından beri Üsküdar''ın gururu olan kulübümüz, gençlerin spora yönlendirilmesi ve spor kültürünün geliştirilmesi amacıyla faaliyet göstermektedir.',
  'İcadiye, Cemil Meriç Sk. No:2, 34674 Üsküdar/İstanbul', '+90 (216) 342 89 27', 'info@uskudaricadiyespor.com',
  'https://instagram.com/uskudaricadiyespor',
  '[{"label":"Yıllık Deneyim","value":"74"},{"label":"Farklı Takım","value":"3"},{"label":"Aktif Sporcu","value":"47+"},{"label":"Kuruluş Yılı","value":"1951"}]'::jsonb
)
on conflict (id) do update set
  home_hero_title = excluded.home_hero_title, home_hero_text = excluded.home_hero_text,
  club_description = excluded.club_description, address = excluded.address, phone = excluded.phone,
  email = excluded.email, instagram_url = excluded.instagram_url, statistics = excluded.statistics;
