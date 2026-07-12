import { createBrowserClient } from "@supabase/ssr"

const SUPABASE_URL = "https://zteqshmsmbnsewytihhd.supabase.co"
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  || "sb_publishable_njv9hDYx4VXfAEg-wlfrLQ_VCQN7ftg"

export function createClient() {
  return createBrowserClient(SUPABASE_URL, SUPABASE_KEY)
}
