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
  course_ids: string[]
}

export type EnrollmentWithProfile = Enrollment & {
  profiles: { full_name: string | null; email: string | null } | null
}

export async function createEnrollment(planLabel: string, planPrice: string) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { data: null, error: "Not authenticated" }

  // Reuse an existing pending/approved enrollment instead of creating a
  // duplicate row every time the student revisits the enroll flow — the
  // teacher dashboard would otherwise list the same student more than once.
  const { data: existing } = await supabase
    .from("enrollments")
    .select("*")
    .eq("user_id", user.id)
    .in("status", ["pending", "approved"])
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle()

  if (existing) {
    if (existing.plan_label !== planLabel || existing.plan_price !== planPrice) {
      const { data, error } = await supabase
        .from("enrollments")
        .update({ plan_label: planLabel, plan_price: planPrice })
        .eq("id", existing.id)
        .select()
        .single()
      return { data, error: error?.message ?? null }
    }
    return { data: existing, error: null }
  }

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
  const { data: enrollments } = await supabase
    .from("enrollments")
    .select("*")
    .order("created_at", { ascending: false })

  if (!enrollments || enrollments.length === 0) return []

  const userIds = [...new Set(enrollments.map(e => e.user_id))]
  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, full_name, email")
    .in("id", userIds)

  const profileById = new Map((profiles ?? []).map(p => [p.id, p]))

  return enrollments.map(e => ({
    ...e,
    profiles: profileById.get(e.user_id) ?? null,
  }))
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

export async function deleteEnrollment(enrollmentId: string) {
  const supabase = createClient()
  const { error } = await supabase
    .from("enrollments")
    .delete()
    .eq("id", enrollmentId)

  return { error: error?.message ?? null }
}

export async function approveEnrollmentWithCourses(enrollmentId: string, courseIds: string[]) {
  const supabase = createClient()
  const { error } = await supabase
    .from("enrollments")
    .update({ status: "approved", approved_at: new Date().toISOString(), course_ids: courseIds })
    .eq("id", enrollmentId)

  return { error: error?.message ?? null }
}
