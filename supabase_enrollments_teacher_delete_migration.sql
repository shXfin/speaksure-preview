-- Run this in your Supabase SQL editor (Dashboard > SQL Editor > New query)
-- Lets teachers permanently delete an enrollment row (the "Delete" button
-- in the teacher dashboard). Without this, delete requests are silently
-- blocked by RLS and nothing happens.

drop policy if exists "Teachers can delete enrollments" on enrollments;

create policy "Teachers can delete enrollments"
  on enrollments for delete
  using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid() and profiles.role = 'teacher'
    )
  );
