-- =====================================================================
-- Reviews backend for the portfolio  (Supabase / PostgreSQL)
-- Run once: Supabase Dashboard -> SQL Editor -> New query -> paste -> Run
-- =====================================================================

create table if not exists public.reviews (
  id          uuid primary key default gen_random_uuid(),
  full_name   text        not null check (char_length(full_name)   between 2 and 80),
  email       text        not null check (char_length(email)       between 5 and 120),
  company     text                 check (char_length(company)     <= 120),
  project_name text       not null check (char_length(project_name) between 2 and 120),
  rating      smallint    not null check (rating between 1 and 5),
  review_text text        not null check (char_length(review_text) between 20 and 1000),
  status      text        not null default 'pending'
                          check (status in ('pending','approved','rejected')),
  created_at  timestamptz not null default now()
);

-- Lock the table down: the public (anon) key can NOT read it.
alter table public.reviews enable row level security;
revoke all on public.reviews from anon, authenticated;

-- Visitors may only INSERT, only the form columns (so they can never set
-- status), and only as 'pending'.
grant insert (full_name, email, company, project_name, rating, review_text)
  on public.reviews to anon;

drop policy if exists "visitors can submit pending reviews" on public.reviews;
create policy "visitors can submit pending reviews"
  on public.reviews for insert to anon
  with check (status = 'pending');

-- Public read access goes through this view: APPROVED rows only and
-- WITHOUT the email column, so visitors' emails are never exposed.
create or replace view public.public_reviews as
  select id, full_name, company, project_name, rating, review_text, created_at
  from public.reviews
  where status = 'approved';

grant select on public.public_reviews to anon;

-- ---------------------------------------------------------------------
-- HOW YOU APPROVE REVIEWS (manual moderation):
--   Dashboard -> Table Editor -> reviews -> change the row's `status`
--   from 'pending' to 'approved'  (or 'rejected' to hide it forever).
-- Or in SQL:  update public.reviews set status='approved' where id='...';
-- ---------------------------------------------------------------------
