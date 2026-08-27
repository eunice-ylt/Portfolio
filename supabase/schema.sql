-- Yi-Ning Lo Portfolio CMS schema
-- Run in Supabase SQL Editor, then run seed.sql.

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists(select 1 from public.admin_users where user_id = auth.uid());
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

create table if not exists public.hero (
  id text primary key,
  eyebrow_zh text not null default '', eyebrow_en text not null default '',
  title_zh text not null default '', title_en text not null default '',
  description_zh text not null default '', description_en text not null default '',
  image_url text, image_alt_zh text not null default '', image_alt_en text not null default '',
  primary_cta_label_zh text not null default '', primary_cta_label_en text not null default '',
  primary_cta_url text not null default '/projects',
  secondary_cta_label_zh text not null default '', secondary_cta_label_en text not null default '',
  secondary_cta_url text not null default '#contact',
  updated_at timestamptz not null default now()
);

create table if not exists public.about (
  id text primary key,
  title_zh text not null default '', title_en text not null default '',
  content_zh text not null default '', content_en text not null default '',
  note_zh text not null default '', note_en text not null default '',
  updated_at timestamptz not null default now()
);

create table if not exists public.traits (
  id text primary key,
  title_zh text not null default '', title_en text not null default '',
  description_zh text not null default '', description_en text not null default '',
  icon text not null default 'Puzzle', sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table if not exists public.skill_categories (
  id text primary key,
  number text not null default '00', title_zh text not null default '', title_en text not null default '',
  icon text not null default 'FileSearch', sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table if not exists public.skill_items (
  id text primary key,
  category_id text not null references public.skill_categories(id) on delete cascade,
  name_zh text not null default '', name_en text not null default '', sort_order integer not null default 0,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table if not exists public.projects (
  id text primary key,
  title_zh text not null default '', title_en text not null default '',
  slug text not null unique,
  short_description_zh text not null default '', short_description_en text not null default '',
  content_zh text not null default '', content_en text not null default '',
  cover_image text, cover_alt_zh text not null default '', cover_alt_en text not null default '',
  gallery_images text[] not null default '{}',
  category text not null default 'System', tags text[] not null default '{}',
  role_zh text not null default '', role_en text not null default '', project_period text not null default '',
  featured boolean not null default false, published boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);

create table if not exists public.contact (
  id text primary key,
  title_zh text not null default '', title_en text not null default '',
  description_zh text not null default '', description_en text not null default '',
  email text not null, phone text not null,
  linkedin text not null default '', github text not null default '',
  location_zh text not null default '', location_en text not null default '',
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$ begin new.updated_at = now(); return new; end; $$;

drop trigger if exists hero_updated_at on public.hero;
create trigger hero_updated_at before update on public.hero for each row execute function public.set_updated_at();
drop trigger if exists about_updated_at on public.about;
create trigger about_updated_at before update on public.about for each row execute function public.set_updated_at();
drop trigger if exists traits_updated_at on public.traits;
create trigger traits_updated_at before update on public.traits for each row execute function public.set_updated_at();
drop trigger if exists skill_categories_updated_at on public.skill_categories;
create trigger skill_categories_updated_at before update on public.skill_categories for each row execute function public.set_updated_at();
drop trigger if exists skill_items_updated_at on public.skill_items;
create trigger skill_items_updated_at before update on public.skill_items for each row execute function public.set_updated_at();
drop trigger if exists projects_updated_at on public.projects;
create trigger projects_updated_at before update on public.projects for each row execute function public.set_updated_at();
drop trigger if exists contact_updated_at on public.contact;
create trigger contact_updated_at before update on public.contact for each row execute function public.set_updated_at();

alter table public.admin_users enable row level security;
alter table public.hero enable row level security;
alter table public.about enable row level security;
alter table public.traits enable row level security;
alter table public.skill_categories enable row level security;
alter table public.skill_items enable row level security;
alter table public.projects enable row level security;
alter table public.contact enable row level security;

drop policy if exists "admin can read own role" on public.admin_users;
create policy "admin can read own role" on public.admin_users for select to authenticated using (user_id = auth.uid());

drop policy if exists "public reads hero" on public.hero;
create policy "public reads hero" on public.hero for select to anon, authenticated using (true);
drop policy if exists "public reads about" on public.about;
create policy "public reads about" on public.about for select to anon, authenticated using (true);
drop policy if exists "public reads contact" on public.contact;
create policy "public reads contact" on public.contact for select to anon, authenticated using (true);
drop policy if exists "public reads active traits" on public.traits;
create policy "public reads active traits" on public.traits for select to anon, authenticated using (is_active or public.is_admin());
drop policy if exists "public reads active skill categories" on public.skill_categories;
create policy "public reads active skill categories" on public.skill_categories for select to anon, authenticated using (is_active or public.is_admin());
drop policy if exists "public reads skill items" on public.skill_items;
create policy "public reads skill items" on public.skill_items for select to anon, authenticated using (public.is_admin() or exists(select 1 from public.skill_categories c where c.id = category_id and c.is_active));
drop policy if exists "public reads published projects" on public.projects;
create policy "public reads published projects" on public.projects for select to anon, authenticated using (published or public.is_admin());

do $$
declare table_name text;
begin
  foreach table_name in array array['hero','about','traits','skill_categories','skill_items','projects','contact'] loop
    execute format('drop policy if exists "admins insert %s" on public.%I', table_name, table_name);
    execute format('create policy "admins insert %s" on public.%I for insert to authenticated with check (public.is_admin())', table_name, table_name);
    execute format('drop policy if exists "admins update %s" on public.%I', table_name, table_name);
    execute format('create policy "admins update %s" on public.%I for update to authenticated using (public.is_admin()) with check (public.is_admin())', table_name, table_name);
    execute format('drop policy if exists "admins delete %s" on public.%I', table_name, table_name);
    execute format('create policy "admins delete %s" on public.%I for delete to authenticated using (public.is_admin())', table_name, table_name);
  end loop;
end $$;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('portfolio-images', 'portfolio-images', true, 8388608, array['image/jpeg','image/png','image/webp','image/gif'])
on conflict (id) do update set public = excluded.public, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "public reads portfolio images" on storage.objects;
create policy "public reads portfolio images" on storage.objects for select to public using (bucket_id = 'portfolio-images');
drop policy if exists "admins upload portfolio images" on storage.objects;
create policy "admins upload portfolio images" on storage.objects for insert to authenticated with check (bucket_id = 'portfolio-images' and public.is_admin());
drop policy if exists "admins update portfolio images" on storage.objects;
create policy "admins update portfolio images" on storage.objects for update to authenticated using (bucket_id = 'portfolio-images' and public.is_admin()) with check (bucket_id = 'portfolio-images' and public.is_admin());
drop policy if exists "admins delete portfolio images" on storage.objects;
create policy "admins delete portfolio images" on storage.objects for delete to authenticated using (bucket_id = 'portfolio-images' and public.is_admin());

-- After creating your Auth user, grant access with:
-- insert into public.admin_users (user_id)
-- select id from auth.users where email = 'you@example.com'
-- on conflict do nothing;
