create extension if not exists pgcrypto;

create type public.news_status as enum ('draft', 'published');
create type public.match_status as enum ('scheduled', 'postponed', 'completed', 'cancelled');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'admin' check (role = 'admin'),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.teams (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) between 2 and 120),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  age_group text,
  league text,
  description text,
  active_season text,
  sort_order integer not null default 0 check (sort_order >= 0),
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.news (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(trim(title)) between 3 and 180),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  summary text not null check (char_length(trim(summary)) between 10 and 500),
  content text not null check (char_length(trim(content)) between 10 and 20000),
  category text not null check (char_length(trim(category)) between 2 and 60),
  cover_image_path text,
  status public.news_status not null default 'draft',
  is_featured boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint published_news_has_timestamp check (status = 'draft' or published_at is not null)
);

create table public.players (
  id uuid primary key default gen_random_uuid(),
  team_id uuid not null references public.teams(id) on delete restrict,
  full_name text not null check (char_length(trim(full_name)) between 2 and 120),
  shirt_number smallint check (shirt_number between 0 and 99),
  position text not null check (char_length(trim(position)) between 2 and 60),
  birth_date date,
  experience text,
  image_path text,
  sort_order integer not null default 0 check (sort_order >= 0),
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (team_id, shirt_number)
);

create table public.staff (
  id uuid primary key default gen_random_uuid(),
  team_id uuid not null references public.teams(id) on delete restrict,
  full_name text not null check (char_length(trim(full_name)) between 2 and 120),
  job_title text not null check (char_length(trim(job_title)) between 2 and 100),
  image_path text,
  sort_order integer not null default 0 check (sort_order >= 0),
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.matches (
  id uuid primary key default gen_random_uuid(),
  team_id uuid not null references public.teams(id) on delete restrict,
  home_team text not null check (char_length(trim(home_team)) between 2 and 120),
  away_team text not null check (char_length(trim(away_team)) between 2 and 120),
  competition text not null check (char_length(trim(competition)) between 2 and 120),
  week smallint check (week between 1 and 99),
  match_date date,
  kickoff_time time,
  stadium text,
  home_score smallint check (home_score >= 0),
  away_score smallint check (away_score >= 0),
  status public.match_status not null default 'scheduled',
  is_home boolean not null,
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint completed_match_has_scores check (
    status <> 'completed' or (home_score is not null and away_score is not null)
  ),
  constraint incomplete_match_has_no_partial_score check (
    (home_score is null) = (away_score is null)
  ),
  constraint different_match_teams check (home_team <> away_team)
);

create table public.standings (
  id uuid primary key default gen_random_uuid(),
  season text not null check (char_length(trim(season)) between 4 and 30),
  league_group text not null check (char_length(trim(league_group)) between 2 and 120),
  team_name text not null check (char_length(trim(team_name)) between 2 and 120),
  played smallint not null default 0 check (played >= 0),
  won smallint not null default 0 check (won >= 0),
  drawn smallint not null default 0 check (drawn >= 0),
  lost smallint not null default 0 check (lost >= 0),
  goals_for smallint not null default 0 check (goals_for >= 0),
  goals_against smallint not null default 0 check (goals_against >= 0),
  goal_difference smallint not null default 0,
  points smallint not null default 0 check (points >= 0),
  position smallint not null check (position > 0),
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (season, league_group, team_name),
  unique (season, league_group, position),
  constraint record_totals_match check (played = won + drawn + lost),
  constraint goal_difference_matches check (goal_difference = goals_for - goals_against)
);

create table public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(trim(title)) between 2 and 160),
  description text,
  image_path text not null,
  taken_at date,
  category text not null check (char_length(trim(category)) between 2 and 60),
  sort_order integer not null default 0 check (sort_order >= 0),
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.site_settings (
  id boolean primary key default true check (id),
  home_hero_title text not null default 'Üsküdar İcadiye Spor',
  home_hero_text text not null default '',
  club_description text not null default '',
  address text not null default '',
  phone text not null default '',
  email text not null default '',
  instagram_url text,
  facebook_url text,
  youtube_url text,
  statistics jsonb not null default '[]'::jsonb check (jsonb_typeof(statistics) = 'array'),
  updated_at timestamptz not null default timezone('utc', now())
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create trigger set_profiles_updated_at before update on public.profiles for each row execute procedure public.set_updated_at();
create trigger set_teams_updated_at before update on public.teams for each row execute procedure public.set_updated_at();
create trigger set_news_updated_at before update on public.news for each row execute procedure public.set_updated_at();
create trigger set_players_updated_at before update on public.players for each row execute procedure public.set_updated_at();
create trigger set_staff_updated_at before update on public.staff for each row execute procedure public.set_updated_at();
create trigger set_matches_updated_at before update on public.matches for each row execute procedure public.set_updated_at();
create trigger set_standings_updated_at before update on public.standings for each row execute procedure public.set_updated_at();
create trigger set_gallery_items_updated_at before update on public.gallery_items for each row execute procedure public.set_updated_at();
create trigger set_site_settings_updated_at before update on public.site_settings for each row execute procedure public.set_updated_at();

create index news_public_index on public.news (published_at desc) where status = 'published';
create index teams_public_index on public.teams (sort_order, name) where is_active;
create index players_team_public_index on public.players (team_id, sort_order, full_name) where is_active;
create index staff_team_public_index on public.staff (team_id, sort_order, full_name) where is_active;
create index matches_public_index on public.matches (match_date, kickoff_time) where is_active;
create index standings_public_index on public.standings (season, league_group, position) where is_active;
create index gallery_public_index on public.gallery_items (sort_order, taken_at desc) where is_active;
