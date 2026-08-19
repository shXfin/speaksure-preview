-- Run this in your Supabase SQL editor (Dashboard > SQL Editor > New query)

create table if not exists enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  plan_label text not null,
  plan_price text not null,
  status text not null default 'pending' check (status in ('pending', 'approved', 'blocked')),
  whatsapp_sent_at timestamptz,
  approved_at timestamptz,
  created_at timestamptz not null default now()
);

alter table enrollments enable row level security;

-- Students can see and create only their own enrollments
create policy "Students can view own enrollments"
  on enrollments for select
  using (auth.uid() = user_id);

create policy "Students can create own enrollments"
  on enrollments for insert
  with check (auth.uid() = user_id);

-- Teachers can view and update all enrollments
create policy "Teachers can view all enrollments"
  on enrollments for select
  using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid() and profiles.role = 'teacher'
    )
  );

create policy "Teachers can update all enrollments"
  on enrollments for update
  using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid() and profiles.role = 'teacher'
    )
  );

create index if not exists enrollments_user_id_idx on enrollments(user_id);
create index if not exists enrollments_status_idx on enrollments(status);
