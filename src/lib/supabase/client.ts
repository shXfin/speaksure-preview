import { createBrowserClient } from "@supabase/ssr"

const SUPABASE_URL = "https://zteqshmsmbnsewytihhd.supabase.co"
const SUPABASE_KEY = "sb_publishable_njv9hDYx4VXfAEg-wlfrLQ_VCQN7ftg"

export function createClient() {
  return createBrowserClient(SUPABASE_URL, SUPABASE_KEY)
}
