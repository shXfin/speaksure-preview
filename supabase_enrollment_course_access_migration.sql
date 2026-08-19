-- Run this in your Supabase SQL editor (Dashboard > SQL Editor > New query)
-- Lets a teacher pick which specific courses a student can see once
-- their enrollment is approved, instead of unlocking every course.

alter table enrollments add column if not exists course_ids text[] not null default '{}';
