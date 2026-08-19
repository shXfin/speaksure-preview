-- Run this in your Supabase SQL editor (Dashboard > SQL Editor > New query)
-- Lets teachers read every student's profile row (name + email), which the
-- enrollments dashboard needs. Without this, a teacher can only read their
-- own profile row and the enrollments list would silently show no names.

drop policy if exists "Teachers can view all profiles" on profiles;

create policy "Teachers can view all profiles"
  on profiles for select
  using (
    exists (
      select 1 from profiles as me
      where me.id = auth.uid() and me.role = 'teacher'
    )
  );
