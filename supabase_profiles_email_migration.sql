-- Run this in your Supabase SQL editor (Dashboard > SQL Editor > New query)
-- Adds an email column to profiles so the teacher dashboard can tell
-- students apart even when full names collide.

alter table profiles add column if not exists email text;

-- Backfill existing rows from auth.users
update profiles
set email = auth.users.email
from auth.users
where profiles.id = auth.users.id
  and profiles.email is null;
