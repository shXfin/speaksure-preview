"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { courses as staticCourses } from "@/lib/courses"
import { getProfile } from "@/lib/supabase/profile"
import { createClient } from "@/lib/supabase/client"
import { BrandMark } from "@/lib/m3"

const s: Record<string, React.CSSProperties> = {
  surface: { background: "#fff", border: "1px solid #e8e0ef", borderRadius: 12, boxShadow: "0 1px 3px rgba(0,0,0,0.07), 0 1px 2px rgba(0,0,0,0.05)" },
  eyebrow: { margin: "0 0 6px", color: "#6750a4", fontSize: 11, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.8px" },
  muted: { color: "#625b71" },
}

const BANNER_COLORS = ["#6750a4", "#1a6b5a", "#8b3a3a", "#1565c0", "#5d4037", "#2e7d32"]

type CustomCourse = {
  id: string
  title: string
  zh: string
  teacher: string
  level: string
  schedule: string
  description: string
  banner_color: string
  next_topic: string
  code: string
}

function CalendarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6750a4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  )
}
function StreamIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="14" y2="12" /><line x1="4" y1="18" x2="20" y2="18" />
    </svg>
  )
}
function AssignmentIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
      <rect x="9" y="3" width="6" height="4" rx="1" /><line x1="9" y1="12" x2="15" y2="12" /><line x1="9" y1="16" x2="12" y2="16" />
    </svg>
  )
}
function TrashIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4h6v2" />
    </svg>
  )
}
function RestoreIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 .49-4.95L1 10" />
    </svg>
  )
}
function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}

async function fetchHiddenCourses(): Promise<string[]> {
  try {
    const supabase = createClient()
    const { data } = await supabase.from("hidden_courses").select("course_id")
    return (data ?? []).map((r: any) => r.course_id)
  } catch { return [] }
}

async function fetchCustomCourses(): Promise<CustomCourse[]> {
  try {
    const supabase = createClient()
    const { data } = await supabase.from("custom_courses").select("*").order("created_at", { ascending: true })
    return data ?? []
  } catch { return [] }
}

export default function DashboardPage() {
  const [isTeacher, setIsTeacher] = useState(false)
  const [hiddenIds, setHiddenIds] = useState<string[]>([])
  const [customCourses, setCustomCourses] = useState<CustomCourse[]>([])
  const [pageLoading, setPageLoading] = useState(true)
  const [showHidden, setShowHidden] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  // Add course modal state
  const [showAddModal, setShowAddModal] = useState(false)
  const [newCourse, setNewCourse] = useState({ title: "", zh: "", level: "Intermediate", schedule: "", description: "", banner_color: "#6750a4", next_topic: "", code: "" })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    async function init() {
      const [profile, hidden, custom] = await Promise.all([
        getProfile(),
        fetchHiddenCourses(),   // load for ALL users so filtering works
        fetchCustomCourses(),
      ])
      if (profile?.role === "teacher") setIsTeacher(true)
      setHiddenIds(hidden)
      setCustomCourses(custom)
      setPageLoading(false)
    }
    init()
  }, [])

  // Combine static + custom courses, all keyed by id
  const allCourses = [
    ...staticCourses.map(c => ({ id: c.id, title: c.title, zh: c.zh, teacher: c.teacher, level: c.level, schedule: c.schedule, description: c.description, banner_color: c.bannerColor, next_topic: c.nextTopic, code: c.code, isCustom: false })),
    ...customCourses.map(c => ({ ...c, isCustom: true })),
  ]
  const visibleCourses = allCourses.filter(c => !hiddenIds.includes(c.id))
  const hiddenCourses = allCourses.filter(c => hiddenIds.includes(c.id))

  async function handleHide(courseId: string) {
    setBusy(true)
    const supabase = createClient()
    await supabase.from("hidden_courses").insert({ course_id: courseId })
    setHiddenIds(prev => [...prev, courseId])
    setConfirmDelete(null)
    setBusy(false)
  }

  async function handleRestore(courseId: string) {
    setBusy(true)
    const supabase = createClient()
    await supabase.from("hidden_courses").delete().eq("course_id", courseId)
    setHiddenIds(prev => prev.filter(id => id !== courseId))
    setBusy(false)
  }

  async function handleAddCourse() {
    if (!newCourse.title.trim()) return
    setSaving(true)
    const supabase = createClient()
    const { data, error } = await supabase.from("custom_courses").insert({
      title: newCourse.title.trim(),
      zh: newCourse.zh.trim(),
      teacher: "Adnan K.",
      level: newCourse.level,
      schedule: newCourse.schedule.trim(),
      description: newCourse.description.trim(),
      banner_color: newCourse.banner_color,
      next_topic: newCourse.next_topic.trim(),
      code: newCourse.code.trim() || newCourse.title.toLowerCase().replace(/\s+/g, "-").slice(0, 8),
    }).select().single()
    if (!error && data) {
      setCustomCourses(prev => [...prev, data])
      setNewCourse({ title: "", zh: "", level: "Intermediate", schedule: "", description: "", banner_color: "#6750a4", next_topic: "", code: "" })
      setShowAddModal(false)
    } else if (error) {
      alert("Error creating course: " + error.message)
    }
    setSaving(false)
  }


  const confirmCourse = allCourses.find(c => c.id === confirmDelete)

  return (
    <main className="app-main" style={{ margin: "0 auto", padding: "28px 0 64px" }}>

      {/* ── Confirm remove modal ── */}
      {confirmDelete && confirmCourse && (
        <div onClick={() => setConfirmDelete(null)} style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.35)", display: "grid", placeItems: "center", padding: 16 }}>
          <div onClick={e => e.stopPropagation()} style={{ background: "#fff", borderRadius: 16, padding: "28px 28px 24px", width: "100%", maxWidth: 360, boxShadow: "0 8px 32px rgba(0,0,0,0.18)" }}>
            <h3 style={{ margin: "0 0 10px", fontSize: 18, fontWeight: 700 }}>Remove course?</h3>
            <p style={{ margin: "0 0 24px", fontSize: 14, color: "#625b71", lineHeight: 1.5 }}>
              <strong>{confirmCourse.title}</strong> will be hidden from students. You can restore it anytime.
            </p>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button onClick={() => setConfirmDelete(null)} style={{ padding: "9px 18px", borderRadius: 99, border: "1px solid #cac4d0", background: "#fff", fontSize: 14, fontWeight: 500, cursor: "pointer", color: "#625b71" }}>Cancel</button>
              <button onClick={() => handleHide(confirmDelete)} disabled={busy} style={{ padding: "9px 18px", borderRadius: 99, border: "none", background: "#b3261e", color: "#fff", fontSize: 14, fontWeight: 600, cursor: busy ? "not-allowed" : "pointer", opacity: busy ? 0.7 : 1 }}>
                {busy ? "Removing…" : "Remove"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Add course modal ── */}
      {showAddModal && (
        <div onClick={() => setShowAddModal(false)} style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.4)", display: "grid", placeItems: "center", padding: 16 }}>
          <div onClick={e => e.stopPropagation()} style={{ background: "#fff", borderRadius: 16, width: "min(520px, 100%)", maxHeight: "90vh", overflow: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 28px", borderBottom: "1px solid #e8e0ef" }}>
              <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>Add new course</h2>
              <button onClick={() => setShowAddModal(false)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 22, color: "#625b71", lineHeight: 1 }}>×</button>
            </div>
            <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column", gap: 16 }}>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Course title <span style={{ color: "#d32f2f" }}>*</span></label>
                  <input value={newCourse.title} onChange={e => setNewCourse(p => ({ ...p, title: e.target.value }))} placeholder="e.g. Business English" style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid #cac4d0", fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Chinese name</label>
                  <input value={newCourse.zh} onChange={e => setNewCourse(p => ({ ...p, zh: e.target.value }))} placeholder="e.g. 商务英语" style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid #cac4d0", fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Level</label>
                  <select value={newCourse.level} onChange={e => setNewCourse(p => ({ ...p, level: e.target.value }))} style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid #cac4d0", fontSize: 14, fontFamily: "inherit", outline: "none", background: "#fff" }}>
                    {["Beginner", "Elementary", "Intermediate", "Upper Intermediate", "Advanced"].map(l => <option key={l}>{l}</option>)}
                  </select>
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Description</label>
                  <textarea value={newCourse.description} onChange={e => setNewCourse(p => ({ ...p, description: e.target.value }))} placeholder="What will students learn?" rows={2} style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid #cac4d0", fontSize: 14, fontFamily: "inherit", outline: "none", resize: "vertical", boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Schedule</label>
                  <input value={newCourse.schedule} onChange={e => setNewCourse(p => ({ ...p, schedule: e.target.value }))} placeholder="e.g. Tue / Thu, 20:00" style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid #cac4d0", fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>First topic</label>
                  <input value={newCourse.next_topic} onChange={e => setNewCourse(p => ({ ...p, next_topic: e.target.value }))} placeholder="e.g. Introductions" style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid #cac4d0", fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} />
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Banner colour</label>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {BANNER_COLORS.map(color => (
                      <button key={color} onClick={() => setNewCourse(p => ({ ...p, banner_color: color }))} style={{ width: 32, height: 32, borderRadius: "50%", background: color, border: newCourse.banner_color === color ? "3px solid #1d1b20" : "3px solid transparent", cursor: "pointer", outline: "none" }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, padding: "16px 28px", borderTop: "1px solid #e8e0ef" }}>
              <button onClick={() => setShowAddModal(false)} style={{ padding: "9px 20px", borderRadius: 8, border: "1px solid #cac4d0", background: "#fff", cursor: "pointer", fontSize: 14, fontFamily: "inherit" }}>Cancel</button>
              <button onClick={handleAddCourse} disabled={saving || !newCourse.title.trim()} style={{ padding: "9px 20px", borderRadius: 8, border: "none", background: newCourse.title.trim() ? "#6750a4" : "#cac4d0", color: "#fff", cursor: newCourse.title.trim() ? "pointer" : "not-allowed", fontSize: 14, fontWeight: 600, fontFamily: "inherit" }}>
                {saving ? "Creating…" : "Create course"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Banner card ── */}
      <div className="db-banner" style={{ ...s.surface, padding: "20px 24px", marginBottom: 20 }}>
        <div>
          <p style={s.eyebrow}>SpeakSure / 口语课堂</p>
          <h1 style={{ margin: "0 0 8px", fontSize: 28, fontWeight: 700, letterSpacing: "-0.3px", lineHeight: 1.2 }}>English classrooms</h1>
          <p style={{ margin: 0, ...s.muted, fontSize: 14, lineHeight: 1.6, maxWidth: 520 }}>
            Live English courses for adult Chinese students. Pick a class, check the stream, and continue your practice.
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "14px 16px", borderRadius: 10, border: "1px solid #e8e0ef", background: "#faf7ff", minWidth: 240 }}>
          <span style={{ marginTop: 1 }}><CalendarIcon /></span>
          <div>
            <strong style={{ display: "block", fontSize: 14, fontWeight: 600 }}>Today</strong>
            <p style={{ margin: "3px 0 0", fontSize: 13, ...s.muted, lineHeight: 1.4 }}>IELTS speaking class starts at 19:00 China time.</p>
          </div>
        </div>
        <Link href="/classroom" style={{ color: "#6750a4", fontWeight: 700, fontSize: 14, textDecoration: "none", whiteSpace: "nowrap" }}>
          Continue learning / 继续学习
        </Link>
      </div>

      {/* ── Welcome post ── */}
      <div style={{ ...s.surface, display: "flex", gap: 14, padding: "16px 20px", marginBottom: 28 }}>
        <BrandMark size={40} />
        <div>
          <strong style={{ fontSize: 14, fontWeight: 600 }}>Welcome to SpeakSure</strong>
          <p style={{ margin: "4px 0 0", fontSize: 14, ...s.muted, lineHeight: 1.6 }}>
            Choose the English class that matches your goal: work, IELTS speaking, interviews, travel, or presentations.
          </p>
        </div>
      </div>

      {/* ── Section head ── */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 16 }}>
        <div>
          <p style={s.eyebrow}>Classes / 课程</p>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>Pick a course to preview</h2>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ ...s.muted, fontSize: 13 }}>{visibleCourses.length} live course{visibleCourses.length !== 1 ? "s" : ""}</span>
          {isTeacher && hiddenCourses.length > 0 && (
            <button onClick={() => setShowHidden(v => !v)} style={{ fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 99, border: "1px solid #cac4d0", background: showHidden ? "#eaddff" : "#fff", color: showHidden ? "#6750a4" : "#625b71", cursor: "pointer" }}>
              {showHidden ? "Hide archived" : `Archived (${hiddenCourses.length})`}
            </button>
          )}
          {isTeacher && (
            <button onClick={() => setShowAddModal(true)} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, padding: "6px 14px", borderRadius: 99, border: "none", background: "#6750a4", color: "#fff", cursor: "pointer" }}>
              <PlusIcon /> Add course
            </button>
          )}
        </div>
      </div>

      {/* ── Course grid ── */}
      <div className="db-courses">
        {pageLoading ? [1, 2, 3].map(i => (
          <div key={i} style={{ height: 220, borderRadius: 12, background: "#f3edf7", opacity: 0.7 }} />
        )) : visibleCourses.map((course) => (
          <div key={course.id} style={{ position: "relative" }}>
            <Link href={`/classroom?course=${course.id}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
              <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid #e8e0ef", boxShadow: "0 1px 3px rgba(0,0,0,0.07)", background: "#fff" }}>
                <div style={{ position: "relative", height: 96, background: course.banner_color, padding: "16px 16px 14px", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                  <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "#fff", lineHeight: 1.25 }}>{course.title}</h3>
                  <span style={{ display: "block", fontSize: 13, color: "rgba(255,255,255,0.85)", marginTop: 4 }}>{course.zh}</span>
                  <small style={{ display: "block", fontSize: 12, color: "rgba(255,255,255,0.75)", marginTop: 2 }}>{course.teacher}</small>
                </div>
                <div style={{ padding: "14px 16px 16px" }}>
                  <p style={{ margin: "0 0 6px", fontSize: 13, fontWeight: 600, color: "#1d1b20" }}>Next: {course.next_topic}</p>
                  <p style={{ margin: "0 0 14px", fontSize: 13, ...s.muted, lineHeight: 1.5, minHeight: 40 }}>{course.description}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 11, fontWeight: 600, color: "#6750a4", background: "#eaddff", padding: "3px 10px", borderRadius: 99 }}>{course.level}</span>
                    <span style={{ fontSize: 12, ...s.muted }}>{course.schedule.split(",")[0]}</span>
                  </div>
                </div>
              </div>
            </Link>

            {isTeacher && (
              <button onClick={e => { e.preventDefault(); setConfirmDelete(course.id) }} title="Remove course" style={{ position: "absolute", top: 8, right: 8, display: "grid", placeItems: "center", width: 30, height: 30, borderRadius: "50%", border: "none", background: "rgba(0,0,0,0.45)", color: "#fff", cursor: "pointer", zIndex: 2 }}>
                <TrashIcon />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* ── Archived courses (teacher only) ── */}
      {isTeacher && showHidden && hiddenCourses.length > 0 && (
        <div style={{ marginTop: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <p style={{ ...s.eyebrow, margin: 0 }}>Archived courses</p>
            <span style={{ fontSize: 12, color: "#625b71" }}>— hidden from students</span>
          </div>
          <div className="db-courses">
            {hiddenCourses.map(course => (
              <div key={course.id} style={{ borderRadius: 12, overflow: "hidden", border: "1px dashed #cac4d0", background: "#fafafa", opacity: 0.85 }}>
                <div style={{ height: 96, background: course.banner_color, padding: "16px 16px 14px", display: "flex", flexDirection: "column", justifyContent: "flex-end", filter: "grayscale(60%)" }}>
                  <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "#fff" }}>{course.title}</h3>
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,0.8)" }}>{course.zh}</span>
                </div>
                <div style={{ padding: "12px 16px 14px" }}>
                  <p style={{ margin: "0 0 10px", fontSize: 13, color: "#625b71" }}>{course.description}</p>
                  <button onClick={() => handleRestore(course.id)} disabled={busy} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 99, border: "1px solid #6750a4", background: "#fff", color: "#6750a4", fontSize: 13, fontWeight: 600, cursor: busy ? "not-allowed" : "pointer" }}>
                    <RestoreIcon /> Restore
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  )
}
