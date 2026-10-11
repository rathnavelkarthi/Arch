-- Catalog foundation. Apply only to the selected Illamora project.
-- Publication is reserved for a trusted moderator, never the mobile client.
begin;

create table public.properties (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  title text not null check (char_length(btrim(title)) between 5 and 120),
  description text not null check (char_length(btrim(description)) between 20 and 5000),
  city text not null check (char_length(btrim(city)) between 2 and 100),
  state text not null check (state in ('Tamil Nadu','Kerala','Andhra Pradesh','Telangana','Karnataka','Puducherry')),
  kind text not null check (kind in ('house','apartment','plot','farmhouse')),
  purpose text not null check (purpose in ('sale','rent')),
  price_inr bigint not null check (price_inr between 1 and 100000000000),
  area_sqft numeric(12,2) not null check (area_sqft > 0 and area_sqft <= 100000000),
  facing text check (facing in ('north','north-east','east','south-east','south','south-west','west','north-west')),
  land_classification text not null check (land_classification in ('residential','commercial','agricultural','plantation','farmhouse','unknown')),
  status text not null default 'draft' check (status in ('draft','pending','published','rejected')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index properties_owner_idx on public.properties(owner_id);
create index properties_catalog_idx on public.properties(created_at desc) where status = 'published';
alter table public.properties enable row level security;
revoke all on public.properties from anon, authenticated;
grant select on public.properties to anon, authenticated;
grant insert(title,description,city,state,kind,purpose,price_inr,area_sqft,facing,land_classification)
  on public.properties to authenticated;
grant update(title,description,city,state,kind,purpose,price_inr,area_sqft,facing,land_classification)
  on public.properties to authenticated;
grant delete on public.properties to authenticated;
grant all on public.properties to service_role;
create policy properties_public_read on public.properties for select to anon, authenticated using (status = 'published');
create policy properties_owner_read on public.properties for select to authenticated using (owner_id = (select auth.uid()));
create policy properties_owner_insert on public.properties for insert to authenticated with check (owner_id = (select auth.uid()) and status = 'draft');
create policy properties_owner_edit on public.properties for update to authenticated
  using (owner_id = (select auth.uid()) and status = 'draft') with check (owner_id = (select auth.uid()) and status = 'draft');
create policy properties_owner_delete on public.properties for delete to authenticated using (owner_id = (select auth.uid()));

create table public.architect_profiles (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null unique default auth.uid() references auth.users(id) on delete cascade,
  display_name text not null check (char_length(btrim(display_name)) between 2 and 120),
  bio text not null check (char_length(btrim(bio)) between 20 and 3000),
  city text not null check (char_length(btrim(city)) between 2 and 100),
  state text not null check (state in ('Tamil Nadu','Kerala','Andhra Pradesh','Telangana','Karnataka','Puducherry')),
  specialties text[] not null default '{}' check (cardinality(specialties) <= 12),
  languages text[] not null default '{}' check (cardinality(languages) <= 12),
  status text not null default 'draft' check (status in ('draft','pending','published','rejected')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index architect_profiles_catalog_idx on public.architect_profiles(display_name) where status = 'published';
alter table public.architect_profiles enable row level security;
revoke all on public.architect_profiles from anon, authenticated;
grant select on public.architect_profiles to anon, authenticated;
grant insert(display_name,bio,city,state,specialties,languages) on public.architect_profiles to authenticated;
grant update(display_name,bio,city,state,specialties,languages) on public.architect_profiles to authenticated;
grant delete on public.architect_profiles to authenticated;
grant all on public.architect_profiles to service_role;
create policy architects_public_read on public.architect_profiles for select to anon, authenticated using (status = 'published');
create policy architects_owner_read on public.architect_profiles for select to authenticated using (owner_id = (select auth.uid()));
create policy architects_owner_insert on public.architect_profiles for insert to authenticated with check (owner_id = (select auth.uid()) and status = 'draft');
create policy architects_owner_edit on public.architect_profiles for update to authenticated
  using (owner_id = (select auth.uid()) and status = 'draft') with check (owner_id = (select auth.uid()) and status = 'draft');
create policy architects_owner_delete on public.architect_profiles for delete to authenticated using (owner_id = (select auth.uid()));

create function public.catalog_updated_at() returns trigger language plpgsql set search_path = '' as $$
begin new.updated_at := now(); return new; end;
$$;
revoke all on function public.catalog_updated_at() from public, anon, authenticated;
create trigger properties_updated_at before update on public.properties for each row execute function public.catalog_updated_at();
create trigger architects_updated_at before update on public.architect_profiles for each row execute function public.catalog_updated_at();

commit;
