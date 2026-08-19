-- URGENT: run this in Supabase SQL Editor right away.
-- The previous migration (supabase_profiles_teacher_read_migration.sql)
-- created a policy that queries `profiles` from inside its own policy
-- check, which Postgres re-evaluates recursively forever. This breaks
-- every read of the profiles table for every user (teachers included).
-- This removes that broken policy.

drop policy if exists "Teachers can view all profiles" on profiles;
