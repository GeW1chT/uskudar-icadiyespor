insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'media',
  'media',
  false,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif']::text[]
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy "admins manage media" on storage.objects
for all to authenticated
using (
  bucket_id = 'media'
  and (storage.foldername(name))[1] in ('news', 'players', 'gallery', 'staff')
  and public.is_admin()
)
with check (
  bucket_id = 'media'
  and (storage.foldername(name))[1] in ('news', 'players', 'gallery', 'staff')
  and public.is_admin()
);
