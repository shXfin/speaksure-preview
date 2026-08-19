import { createClient } from "./client"

export type Enrollment = {
  id: string
  user_id: string
  plan_label: string
  plan_price: string
  status: "pending" | "approved" | "blocked"
  whatsapp_sent_at: string | null
  approved_at: string | null
  created_at: string
}

export type EnrollmentWithProfile = Enrollment & {
  profiles: { full_name: string | null; email: string | null } | null
}

export async function createEnrollment(planLabel: string, planPrice: string) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { data: null, error: "Not authenticated" }

  const { data, error } = await supabase
    .from("enrollments")
    .insert({ user_id: user.id, plan_label: planLabel, plan_price: planPrice })
    .select()
    .single()

  return { data, error: error?.message ?? null }
}

export async function markWhatsappSent(enrollmentId: string) {
  const supabase = createClient()
  await supabase
    .from("enrollments")
    .update({ whatsapp_sent_at: new Date().toISOString() })
    .eq("id", enrollmentId)
}

export async function getMyEnrollments(): Promise<Enrollment[]> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data } = await supabase
    .from("enrollments")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  return data ?? []
}

export async function getAllEnrollments(): Promise<EnrollmentWithProfile[]> {
  const supabase = createClient()
  const { data } = await supabase
    .from("enrollments")
    .select("*, profiles(full_name, email)")
    .order("created_at", { ascending: false })

  return (data as EnrollmentWithProfile[]) ?? []
}

export async function updateEnrollmentStatus(enrollmentId: string, status: "approved" | "blocked" | "pending") {
  const supabase = createClient()
  const patch: { status: string; approved_at?: string | null } = { status }
  if (status === "approved") patch.approved_at = new Date().toISOString()
  if (status !== "approved") patch.approved_at = null

  const { error } = await supabase
    .from("enrollments")
    .update(patch)
    .eq("id", enrollmentId)

  return { error: error?.message ?? null }
}
