import { createClient } from "./client"
import type { Topic, Assignment } from "@/lib/courses"

// ── Fetch topics + assignments for a course ──────────────────
export async function fetchTopics(courseId: string): Promise<Topic[]> {
  const supabase = createClient()

  const { data: topicsData, error } = await supabase
    .from("topics")
    .select("*, assignments(*)")
    .eq("course_id", courseId)
    .order("position", { ascending: true })

  if (error || !topicsData) return []

  return topicsData.map((t: any) => ({
    id: t.id,
    name: t.name,
    assignments: (t.assignments ?? [])
      .sort((a: any, b: any) => a.position - b.position)
      .map((a: any) => ({
        id: a.id,
        title: a.title,
        link: a.link ?? undefined,
        instructions: a.instructions ?? undefined,
        dueDate: a.due_date ?? undefined,
        postedDate: new Date(a.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        turnedIn: 0,
        assigned: 0,
      })),
  }))
}

// ── Seed initial topics from courses.ts (first-time setup) ───
export async function seedTopics(courseId: string, topics: Topic[]) {
  const supabase = createClient()

  for (let i = 0; i < topics.length; i++) {
    const t = topics[i]
    const { data: topicRow } = await supabase
      .from("topics")
      .insert({ course_id: courseId, name: t.name, position: i })
      .select()
      .single()

    if (!topicRow) continue

    for (let j = 0; j < t.assignments.length; j++) {
      const a = t.assignments[j]
      await supabase.from("assignments").insert({
        topic_id: topicRow.id,
        title: a.title,
        link: a.link ?? null,
        instructions: a.instructions ?? null,
        due_date: a.dueDate ?? null,
        position: j,
      })
    }
  }
}

// ── Create topic ─────────────────────────────────────────────
export async function createTopic(courseId: string, name: string, position: number) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("topics")
    .insert({ course_id: courseId, name, position })
    .select()
    .single()
  if (error) throw error
  return data
}

// ── Delete topic ─────────────────────────────────────────────
export async function deleteTopic(topicId: string) {
  const supabase = createClient()
  await supabase.from("topics").delete().eq("id", topicId)
}

// ── Create assignment ────────────────────────────────────────
export async function createAssignment(
  topicId: string,
  data: { title: string; link?: string; instructions?: string; dueDate?: string },
  position: number
) {
  const supabase = createClient()
  const { data: row, error } = await supabase
    .from("assignments")
    .insert({
      topic_id: topicId,
      title: data.title,
      link: data.link || null,
      instructions: data.instructions || null,
      due_date: data.dueDate || null,
      position,
    })
    .select()
    .single()
  if (error) throw error
  return row
}

// ── Update assignment ────────────────────────────────────────
export async function updateAssignment(
  assignmentId: string,
  data: { title: string; link?: string; instructions?: string; dueDate?: string }
) {
  const supabase = createClient()
  const { data: row, error } = await supabase
    .from("assignments")
    .update({
      title: data.title,
      link: data.link || null,
      instructions: data.instructions || null,
      due_date: data.dueDate || null,
    })
    .eq("id", assignmentId)
    .select()
    .single()
  if (error) throw error
  return row
}

// ── Delete assignment ────────────────────────────────────────
export async function deleteAssignment(assignmentId: string) {
  const supabase = createClient()
  await supabase.from("assignments").delete().eq("id", assignmentId)
}

// ── Move assignment to different topic ───────────────────────
export async function moveAssignmentToTopic(assignmentId: string, toTopicId: string) {
  const supabase = createClient()
  await supabase.from("assignments").update({ topic_id: toTopicId }).eq("id", assignmentId)
}

// ── Reorder assignments within a topic ──────────────────────
export async function reorderAssignments(assignments: Assignment[]) {
  const supabase = createClient()
  for (let i = 0; i < assignments.length; i++) {
    await supabase.from("assignments").update({ position: i }).eq("id", assignments[i].id)
  }
}
