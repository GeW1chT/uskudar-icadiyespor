create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

alter table public.profiles enable row level security;
alter table public.news enable row level security;
alter table public.teams enable row level security;
alter table public.players enable row level security;
alter table public.staff enable row level security;
alter table public.matches enable row level security;
alter table public.standings enable row level security;
alter table public.gallery_items enable row level security;
alter table public.site_settings enable row level security;

create policy "admins manage profiles" on public.profiles for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admins manage news" on public.news for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "visitors read published news" on public.news for select to anon, authenticated using (status = 'published' and published_at <= timezone('utc', now()));
create policy "admins manage teams" on public.teams for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "visitors read active teams" on public.teams for select to anon, authenticated using (is_active);
create policy "admins manage players" on public.players for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "visitors read active players" on public.players for select to anon, authenticated using (is_active);
create policy "admins manage staff" on public.staff for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "visitors read active staff" on public.staff for select to anon, authenticated using (is_active);
create policy "admins manage matches" on public.matches for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "visitors read active matches" on public.matches for select to anon, authenticated using (is_active);
create policy "admins manage standings" on public.standings for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "visitors read active standings" on public.standings for select to anon, authenticated using (is_active);
create policy "admins manage gallery items" on public.gallery_items for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "visitors read active gallery items" on public.gallery_items for select to anon, authenticated using (is_active);
create policy "admins manage site settings" on public.site_settings for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "visitors read site settings" on public.site_settings for select to anon, authenticated using (true);
