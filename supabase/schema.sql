-- Run this in Supabase SQL Editor.

create table if not exists public.portfolio_content (
  id text primary key,
  content jsonb not null,
  updated_at timestamptz not null default now()
);

insert into public.portfolio_content (id, content)
values ('default', '{}'::jsonb)
on conflict (id) do nothing;

alter table public.portfolio_content enable row level security;

-- Demo policy: allows anyone to read and write.
-- Replace these with authenticated-only policies before production.
drop policy if exists "portfolio_content_public_read" on public.portfolio_content;
create policy "portfolio_content_public_read"
on public.portfolio_content for select
using (true);

drop policy if exists "portfolio_content_public_write" on public.portfolio_content;
create policy "portfolio_content_public_write"
on public.portfolio_content for all
using (true)
with check (true);

insert into storage.buckets (id, name, public)
values ('portfolio-assets', 'portfolio-assets', true)
on conflict (id) do nothing;

drop policy if exists "portfolio_assets_public_read" on storage.objects;
create policy "portfolio_assets_public_read"
on storage.objects for select
using (bucket_id = 'portfolio-assets');

drop policy if exists "portfolio_assets_public_write" on storage.objects;
create policy "portfolio_assets_public_write"
on storage.objects for insert
with check (bucket_id = 'portfolio-assets');

drop policy if exists "portfolio_assets_public_update" on storage.objects;
create policy "portfolio_assets_public_update"
on storage.objects for update
using (bucket_id = 'portfolio-assets')
with check (bucket_id = 'portfolio-assets');
