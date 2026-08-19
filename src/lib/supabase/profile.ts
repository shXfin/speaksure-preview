import { createClient } from "./client"

export type Profile = {
  id: string
  full_name: string | null
  email: string | null
  role: "student" | "teacher"
  created_at: string
}

export async function getProfile(): Promise<Profile | null> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  return data
}
