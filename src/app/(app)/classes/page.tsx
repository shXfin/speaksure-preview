"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { courses as staticCourses } from "@/lib/courses"
import { getProfile } from "@/lib/supabase/profile"
import { createClient } from "@/lib/supabase/client"
import { BrandMark } from "@/lib/m3"
import {
  getMyEnrollments, getAllEnrollments, updateEnrollmentStatus, approveEnrollmentWithCourses, deleteEnrollment,
  type Enrollment, type EnrollmentWithProfile,
} from "@/lib/supabase/enrollments"

const FREE_COURSE_ID = "6d1a4ea1-8fc3-4fdc-86a9-9228e52b977b" // Foundation English — free for every signed-up student

type Currency = "USD" | "MYR" | "SAR" | "CNY"

const PRICING_TIERS: Record<Currency, Array<{ label: string; price: string; best?: boolean }>> = {
  USD: [
    { label: "1 Month",  price: "$134.99" },
    { label: "3 Months", price: "$389.99" },
    { label: "6 Months", price: "$749.99" },
    { label: "9 Months", price: "$1,078.99" },
    { label: "1 Year",   price: "$1,349.99", best: true },
  ],
  MYR: [
    { label: "1 Month",  price: "RM 540.78" },
    { label: "3 Months", price: "RM 1,566.73" },
    { label: "6 Months", price: "RM 3,012.80" },
    { label: "9 Months", price: "RM 4,338.62" },
    { label: "1 Year",   price: "RM 5,423.93", best: true },
  ],
  SAR: [
    { label: "1 Month",  price: "SAR 499" },
    { label: "3 Months", price: "SAR 1,449" },
    { label: "6 Months", price: "SAR 2,799" },
    { label: "9 Months", price: "SAR 3,999" },
    { label: "1 Year",   price: "SAR 4,999", best: true },
  ],
  CNY: [
    { label: "1 Month",  price: "¥899" },
    { label: "3 Months", price: "¥2,599" },
    { label: "6 Months", price: "¥4,999" },
    { label: "9 Months", price: "¥7,199" },
    { label: "1 Year",   price: "¥8,999", best: true },
  ],
}

const COUNTRY_CURRENCY: Record<string, Currency> = {
  MY: "MYR", SG: "USD", TH: "USD", ID: "USD", PH: "USD",
  SA: "SAR", AE: "SAR", QA: "SAR", KW: "SAR", BH: "SAR", OM: "SAR",
  CN: "CNY", TW: "CNY", HK: "CNY",
  JP: "USD", US: "USD", GB: "USD", CA: "USD", AU: "USD", NZ: "USD",
  IN: "USD", BR: "USD", MX: "USD",
}

const s: Record<string, React.CSSProperties> = {
  surface: { background: "#fff", border: "1px solid #e8e0ef", borderRadius: 12, boxShadow: "0 1px 3px rgba(0,0,0,0.07), 0 1px 2px rgba(0,0,0,0.05)" },
  eyebrow: { margin: "0 0 6px", color: "#6750a4", fontSize: 11, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.8px" },
  muted: { color: "#625b71" },
}

const BANNER_COLORS = ["#6750a4", "#1a6b5a", "#8b3a3a", "#1565c0", "#5d4037", "#2e7d32"]

const WHATSAPP_NUMBER = "601161684359"

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
  const [currency, setCurrency] = useState<Currency>("USD")
  const [showCurrencyMenu, setShowCurrencyMenu] = useState(false)
  const [studentName, setStudentName] = useState("")
  const [studentEmail, setStudentEmail] = useState("")

  // Add course modal state
  const [showAddModal, setShowAddModal] = useState(false)
  const [newCourse, setNewCourse] = useState({ title: "", zh: "", level: "Intermediate", schedule: "", description: "", banner_color: "#6750a4", next_topic: "", code: "" })
  const [saving, setSaving] = useState(false)

  // Enrollment state
  const [myEnrollments, setMyEnrollments] = useState<Enrollment[]>([])
  const [allEnrollments, setAllEnrollments] = useState<EnrollmentWithProfile[]>([])
  const [enrollmentBusy, setEnrollmentBusy] = useState<string | null>(null)

  // Course-access modal (opened from Approve / Edit access)
  const [accessModalFor, setAccessModalFor] = useState<EnrollmentWithProfile | null>(null)
  const [selectedCourseIds, setSelectedCourseIds] = useState<string[]>([])
  const [savingAccess, setSavingAccess] = useState(false)

  // Delete-enrollment confirmation
  const [confirmDeleteEnrollment, setConfirmDeleteEnrollment] = useState<EnrollmentWithProfile | null>(null)
  const [deletingEnrollment, setDeletingEnrollment] = useState(false)

  useEffect(() => {
    async function init() {
      try {
        const profile = await getProfile()
        if (!profile) {
          // Account no longer exists (e.g. removed by a teacher) — sign out cleanly
          // instead of leaving the page stuck on a loading skeleton forever.
          const supabase = createClient()
          await supabase.auth.signOut()
          window.location.href = "/login"
          return
        }

        const teacher = profile.role === "teacher"
        setIsTeacher(teacher)
        setStudentName(profile.full_name ?? "")
        setStudentEmail(profile.email ?? "")

        const [hidden, custom, enrollments] = await Promise.all([
          fetchHiddenCourses(),   // load for ALL users so filtering works
          fetchCustomCourses(),
          teacher ? getAllEnrollments() : getMyEnrollments(),
        ])
        setHiddenIds(hidden)
        setCustomCourses(custom)
        if (teacher) {
          setAllEnrollments(enrollments as EnrollmentWithProfile[])
        } else {
          setMyEnrollments(enrollments as Enrollment[])
        }
      } finally {
        setPageLoading(false)
      }
    }
    init()
  }, [])

  // Detect location and set currency
  useEffect(() => {
    async function detectCurrency() {
      try {
        const res = await fetch("https://ipapi.co/json/")
        const data = await res.json()
        const countryCode = data.country_code
        setCurrency(COUNTRY_CURRENCY[countryCode] ?? "USD")
      } catch {
        setCurrency("USD")
      }
    }
    detectCurrency()
  }, [])

  const approvedEnrollments = myEnrollments.filter(e => e.status === "approved")
  const hasApprovedAccess = approvedEnrollments.length > 0
  const myUnlockedCourseIds = new Set(approvedEnrollments.flatMap(e => e.course_ids ?? []))
  const hasPaidUnlockedCourses = myUnlockedCourseIds.size > 0
  const pendingEnrollment = myEnrollments.find(e => e.status === "pending")

  async function handleEnrollmentStatus(id: string, status: "approved" | "blocked" | "pending") {
    setEnrollmentBusy(id)
    await updateEnrollmentStatus(id, status)
    setAllEnrollments(prev => prev.map(e => e.id === id ? { ...e, status, approved_at: status === "approved" ? new Date().toISOString() : null } : e))
    setEnrollmentBusy(null)
  }

  function openAccessModal(enrollment: EnrollmentWithProfile) {
    setAccessModalFor(enrollment)
    setSelectedCourseIds(enrollment.course_ids ?? [])
  }

  function toggleCourseSelection(courseId: string) {
    setSelectedCourseIds(prev => prev.includes(courseId) ? prev.filter(id => id !== courseId) : [...prev, courseId])
  }

  async function confirmAccess() {
    if (!accessModalFor) return
    setSavingAccess(true)
    await approveEnrollmentWithCourses(accessModalFor.id, selectedCourseIds)
    setAllEnrollments(prev => prev.map(e => e.id === accessModalFor.id
      ? { ...e, status: "approved", approved_at: new Date().toISOString(), course_ids: selectedCourseIds }
      : e))
    setSavingAccess(false)
    setAccessModalFor(null)
  }

  async function confirmDeleteEnrollmentRow() {
    if (!confirmDeleteEnrollment) return
    setDeletingEnrollment(true)
    await deleteEnrollment(confirmDeleteEnrollment.id)
    setAllEnrollments(prev => prev.filter(e => e.id !== confirmDeleteEnrollment.id))
    setDeletingEnrollment(false)
    setConfirmDeleteEnrollment(null)
  }

  // Combine static + custom courses, all keyed by id
  const allCourses = [
    ...staticCourses.map(c => ({ id: c.id, title: c.title, zh: c.zh, teacher: c.teacher, level: c.level, schedule: c.schedule, description: c.description, banner_color: c.bannerColor, next_topic: c.nextTopic, code: c.code, isCustom: false })),
    ...customCourses.map(c => ({ ...c, isCustom: true })),
  ]
  const visibleCourses = allCourses.filter(c => !hiddenIds.includes(c.id))
  const hiddenCourses = allCourses.filter(c => hiddenIds.includes(c.id))
  const studentVisibleCourses = isTeacher ? visibleCourses : visibleCourses.filter(c => myUnlockedCourseIds.has(c.id) || c.id === FREE_COURSE_ID)

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

      {/* ── Confirm delete enrollment modal ── */}
      {confirmDeleteEnrollment && (
        <div onClick={() => setConfirmDeleteEnrollment(null)} style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.35)", display: "grid", placeItems: "center", padding: 16 }}>
          <div onClick={e => e.stopPropagation()} style={{ background: "#fff", borderRadius: 16, padding: "28px 28px 24px", width: "100%", maxWidth: 360, boxShadow: "0 8px 32px rgba(0,0,0,0.18)" }}>
            <h3 style={{ margin: "0 0 10px", fontSize: 18, fontWeight: 700 }}>Delete enrollment?</h3>
            <p style={{ margin: "0 0 24px", fontSize: 14, color: "#625b71", lineHeight: 1.5 }}>
              This permanently removes <strong>{confirmDeleteEnrollment.profiles?.full_name || "this student"}</strong>'s enrollment record ({confirmDeleteEnrollment.plan_label}). This can't be undone — if they're already approved, they'll lose access to their assigned courses.
            </p>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button onClick={() => setConfirmDeleteEnrollment(null)} style={{ padding: "9px 18px", borderRadius: 99, border: "1px solid #cac4d0", background: "#fff", fontSize: 14, fontWeight: 500, cursor: "pointer", color: "#625b71" }}>Cancel</button>
              <button onClick={confirmDeleteEnrollmentRow} disabled={deletingEnrollment} style={{ padding: "9px 18px", borderRadius: 99, border: "none", background: "#b3261e", color: "#fff", fontSize: 14, fontWeight: 600, cursor: deletingEnrollment ? "not-allowed" : "pointer", opacity: deletingEnrollment ? 0.7 : 1 }}>
                {deletingEnrollment ? "Deleting…" : "Delete"}
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

      {/* ── Course access modal (Approve / Edit access) ── */}
      {accessModalFor && (
        <div onClick={() => setAccessModalFor(null)} style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.4)", display: "grid", placeItems: "center", padding: 16 }}>
          <div onClick={e => e.stopPropagation()} style={{ background: "#fff", borderRadius: 16, width: "min(440px, 100%)", maxHeight: "85vh", overflow: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
            <div style={{ padding: "20px 24px", borderBottom: "1px solid #e8e0ef" }}>
              <h2 style={{ margin: "0 0 4px", fontSize: 17, fontWeight: 700 }}>
                {accessModalFor.status === "approved" ? "Edit course access" : "Approve & choose courses"}
              </h2>
              <p style={{ margin: 0, fontSize: 13, color: "#625b71" }}>
                {accessModalFor.profiles?.full_name || "This student"} will only see the courses you tick below.
              </p>
            </div>

            <div style={{ padding: "18px 24px", display: "flex", flexDirection: "column", gap: 10 }}>
              {visibleCourses.length === 0 ? (
                <div style={{ padding: "16px", borderRadius: 10, background: "#fff4d6", border: "1px solid #f0d98c", display: "flex", flexDirection: "column", gap: 10 }}>
                  <p style={{ margin: 0, fontSize: 13, color: "#8a6d00", lineHeight: 1.5 }}>
                    You haven't created any courses yet, so there's nothing to give this student access to.
                    Add a course first, then come back and approve them.
                  </p>
                  <button
                    onClick={() => { setAccessModalFor(null); setShowAddModal(true) }}
                    style={{ alignSelf: "flex-start", padding: "7px 14px", borderRadius: 8, border: "none", background: "#6750a4", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
                  >
                    Add a course
                  </button>
                </div>
              ) : (
                visibleCourses.map(course => (
                  <label key={course.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 10, border: "1px solid #e8e0ef", cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      checked={selectedCourseIds.includes(course.id)}
                      onChange={() => toggleCourseSelection(course.id)}
                      style={{ width: 18, height: 18, flexShrink: 0 }}
                    />
                    <div style={{ minWidth: 0 }}>
                      <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: "#1d1b20" }}>{course.title}</p>
                    </div>
                  </label>
                ))
              )}
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, padding: "16px 24px", borderTop: "1px solid #e8e0ef" }}>
              <button onClick={() => setAccessModalFor(null)} style={{ padding: "9px 20px", borderRadius: 8, border: "1px solid #cac4d0", background: "#fff", cursor: "pointer", fontSize: 14, fontFamily: "inherit" }}>
                Cancel
              </button>
              {visibleCourses.length > 0 && (
                <button
                  onClick={confirmAccess}
                  disabled={savingAccess || selectedCourseIds.length === 0}
                  style={{ padding: "9px 20px", borderRadius: 8, border: "none", background: selectedCourseIds.length ? "#1a6b3f" : "#cac4d0", color: "#fff", cursor: selectedCourseIds.length ? "pointer" : "not-allowed", fontSize: 14, fontWeight: 600, fontFamily: "inherit" }}
                >
                  {savingAccess ? "Saving…" : accessModalFor.status === "approved" ? "Save access" : "Approve"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Banner card ── */}
      <div style={{ ...s.surface, padding: "20px 24px", marginBottom: 28 }}>
        <p style={s.eyebrow}>SpeakSure</p>
        <h1 style={{ margin: "0 0 8px", fontSize: 28, fontWeight: 700, letterSpacing: "-0.3px", lineHeight: 1.2 }}>English classrooms</h1>
        <p style={{ margin: 0, ...s.muted, fontSize: 14, lineHeight: 1.6, maxWidth: 520 }}>
          Live English courses for adult students worldwide. Pick a class, check the stream, and continue your practice.
        </p>
      </div>

      {/* ── Teacher: enrollments panel ── */}
      {isTeacher && !pageLoading && (
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 16 }}>
            <div>
              <p style={s.eyebrow}>Enrollments</p>
              <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>Student enrollments</h2>
            </div>
            <span style={{ ...s.muted, fontSize: 13 }}>
              {allEnrollments.filter(e => e.status === "pending").length} pending
            </span>
          </div>

          {allEnrollments.length === 0 ? (
            <div style={{ ...s.surface, padding: "24px", textAlign: "center" }}>
              <p style={{ margin: 0, ...s.muted, fontSize: 14 }}>No enrollments yet.</p>
            </div>
          ) : (
            <div style={{ ...s.surface, overflow: "hidden" }}>
              {allEnrollments.map((e, i) => (
                <div key={e.id} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16,
                  padding: "16px 20px", borderBottom: i < allEnrollments.length - 1 ? "1px solid #e8e0ef" : "none",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14, minWidth: 0 }}>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#eaddff", color: "#6750a4", display: "grid", placeItems: "center", fontWeight: 700, fontSize: 15, flexShrink: 0 }}>
                      {(e.profiles?.full_name || "S")[0].toUpperCase()}
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: "#1d1b20" }}>
                        {e.profiles?.full_name || "Student"}
                        {e.profiles?.email && (
                          <span style={{ fontWeight: 400, color: "#625b71" }}> · {e.profiles.email}</span>
                        )}
                      </p>
                      <p style={{ margin: "2px 0 0", fontSize: 13, ...s.muted }}>
                        {e.plan_label} · {e.plan_price}
                        {e.whatsapp_sent_at ? " · messaged us" : " · hasn't messaged yet"}
                        {e.status === "approved" && (
                          e.course_ids?.length
                            ? ` · ${e.course_ids.length} course${e.course_ids.length !== 1 ? "s" : ""} unlocked`
                            : " · no courses assigned yet"
                        )}
                      </p>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
                    <span style={{
                      fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 99,
                      background: e.status === "approved" ? "#dcf5e6" : e.status === "blocked" ? "#fbe4e2" : "#fff4d6",
                      color: e.status === "approved" ? "#1a6b3f" : e.status === "blocked" ? "#b3261e" : "#8a6d00",
                    }}>
                      {e.status === "approved" ? "Approved" : e.status === "blocked" ? "Blocked" : "Pending"}
                    </span>

                    {e.status !== "approved" && (
                      <button
                        onClick={() => openAccessModal(e)}
                        disabled={enrollmentBusy === e.id}
                        style={{ padding: "7px 14px", borderRadius: 8, border: "none", background: "#1a6b3f", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
                      >
                        Approve
                      </button>
                    )}
                    {e.status === "approved" && (
                      <button
                        onClick={() => openAccessModal(e)}
                        style={{ padding: "7px 14px", borderRadius: 8, border: "1px solid #6750a4", background: "#fff", color: "#6750a4", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
                      >
                        Edit access
                      </button>
                    )}
                    {e.status !== "blocked" && (
                      <button
                        onClick={() => handleEnrollmentStatus(e.id, "blocked")}
                        disabled={enrollmentBusy === e.id}
                        style={{ padding: "7px 14px", borderRadius: 8, border: "1px solid #cac4d0", background: "#fff", color: "#b3261e", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
                      >
                        Block
                      </button>
                    )}
                    <button
                      onClick={() => setConfirmDeleteEnrollment(e)}
                      title="Delete enrollment"
                      style={{ display: "grid", placeItems: "center", width: 32, height: 32, borderRadius: 8, border: "1px solid #cac4d0", background: "#fff", color: "#625b71", cursor: "pointer", flexShrink: 0 }}
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Student without a paid plan yet: free-access note + upsell plans ── */}
      {!isTeacher && !pageLoading && !hasApprovedAccess && (
        <div style={{ marginBottom: 32 }}>
          {pendingEnrollment ? (
            <div className="db-pending-banner" style={{ ...s.surface, padding: "18px 22px", marginBottom: 24, display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", background: "#fff9e6", border: "1px solid #f5deb3" }}>
              <span style={{ fontSize: 22 }}>⏳</span>
              <div style={{ flex: "1 1 260px", minWidth: 0 }}>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#1d1b20" }}>
                  Enrollment pending — {pendingEnrollment.plan_label} ({pendingEnrollment.plan_price})
                </p>
                <p style={{ margin: "2px 0 0", fontSize: 13, ...s.muted }}>
                  We're confirming your payment. Your teacher will unlock the rest of your courses shortly — Foundation English is already free to try below.
                </p>
              </div>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  `Hi! I'd like to enroll in the ${pendingEnrollment.plan_label} plan (${pendingEnrollment.plan_price}).${studentName ? ` My name is ${studentName}.` : ""}${studentEmail ? ` My account email is ${studentEmail}.` : ""} Please let me know how to complete payment.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex", alignItems: "center", gap: 8, flexShrink: 0,
                  padding: "10px 16px", borderRadius: 8, background: "#25d366",
                  color: "#fff", fontWeight: 700, fontSize: 13, textDecoration: "none",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 32 32" fill="currentColor">
                  <path d="M16.001 0C7.164 0 0 7.163 0 16c0 3.2.94 6.174 2.556 8.673L.53 32l7.554-1.98A15.9 15.9 0 0016.001 32C24.837 32 32 24.837 32 16S24.837 0 16.001 0zm0 29.334a13.26 13.26 0 01-6.77-1.857l-.485-.288-4.478 1.174 1.194-4.365-.316-.502A13.29 13.29 0 012.667 16C2.667 8.636 8.637 2.667 16.001 2.667 23.363 2.667 29.334 8.636 29.334 16S23.363 29.334 16.001 29.334z"/>
                  <path d="M23.472 19.382c-.397-.199-2.35-1.157-2.714-1.29-.363-.132-.628-.198-.892.2-.264.397-1.023 1.288-1.253 1.552-.23.264-.462.297-.858.099-.397-.198-1.675-.617-3.19-1.965-1.178-1.05-1.974-2.35-2.206-2.746-.23-.397-.024-.611.173-.809.178-.177.397-.463.595-.694.199-.232.264-.397.397-.662.132-.264.066-.495-.033-.694-.099-.198-.892-2.15-1.222-2.943-.323-.772-.65-.667-.893-.68-.23-.011-.495-.013-.76-.013-.264 0-.694.099-1.057.496-.363.397-1.387 1.355-1.387 3.305 0 1.95 1.42 3.834 1.618 4.099.198.264 2.795 4.268 6.773 5.983.945.408 1.682.652 2.258.834.95.303 1.815.26 2.497.157.762-.114 2.35-.96 2.68-1.886.33-.925.33-1.718.231-1.884-.099-.165-.363-.264-.76-.463z"/>
                </svg>
                WhatsApp us
              </a>
            </div>
          ) : (
            <div style={{ ...s.surface, padding: "18px 22px", marginBottom: 24, display: "flex", alignItems: "center", gap: 14, background: "#eef4ff", border: "1px solid #cddcfb" }}>
              <span style={{ fontSize: 22 }}>🎁</span>
              <div>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#1d1b20" }}>
                  Foundation English is free — no card, no waiting
                </p>
                <p style={{ margin: "2px 0 0", fontSize: 13, ...s.muted }}>
                  Try it below, then pick a plan whenever you're ready for live classes and more courses.
                </p>
              </div>
            </div>
          )}

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 16, gap: 16, flexWrap: "wrap" }}>
            <div>
              <p style={s.eyebrow}>Premium Subscription Plans</p>
              <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>Choose a plan to enroll</h2>
            </div>
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setShowCurrencyMenu(!showCurrencyMenu)}
                style={{
                  padding: "8px 16px", borderRadius: 8, border: "1px solid #cac4d0", background: "#fff",
                  color: "#49454f", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
                }}
              >
                {currency} ▼
              </button>
              {showCurrencyMenu && (
                <div style={{
                  position: "absolute", top: "100%", right: 0, marginTop: 8, minWidth: 120,
                  background: "#fff", borderRadius: 8, border: "1px solid #cac4d0", zIndex: 50,
                  overflow: "hidden", boxShadow: "0 3px 12px rgba(0,0,0,0.15)",
                }}>
                  {(["USD", "MYR", "SAR", "CNY"] as Currency[]).map(curr => (
                    <button
                      key={curr}
                      onClick={() => { setCurrency(curr); setShowCurrencyMenu(false) }}
                      style={{
                        display: "block", width: "100%", padding: "10px 16px", textAlign: "left",
                        background: currency === curr ? "#f3edf9" : "transparent",
                        color: currency === curr ? "#6750a4" : "#1d1b20", border: "none",
                        fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
                      }}
                    >
                      {curr}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="db-plans">
            {PRICING_TIERS[currency].map((tier, i) => (
              <div key={i} style={{
                ...s.surface, padding: "20px 16px", textAlign: "center",
                border: tier.best ? "2px solid #6750a4" : "1px solid #e8e0ef",
              }}>
                <div style={{ fontSize: 13, color: tier.best ? "#6750a4" : "#625b71", marginBottom: 8, fontWeight: tier.best ? 700 : 400 }}>
                  {tier.label}{tier.best ? " · Best Value" : ""}
                </div>
                <div style={{ fontSize: 22, fontWeight: 800, color: "#1d1b20", marginBottom: 16 }}>{tier.price}</div>
                <Link
                  href={`/enroll?plan=${encodeURIComponent(tier.label)}&price=${encodeURIComponent(tier.price)}`}
                  style={{ display: "inline-block", padding: "9px 18px", borderRadius: 8, background: "#6750a4", color: "#fff", fontWeight: 700, fontSize: 13, textDecoration: "none" }}
                >
                  Enroll now
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Approved but courses not assigned yet ── */}
      {!isTeacher && !pageLoading && hasApprovedAccess && !hasPaidUnlockedCourses && (
        <div style={{ ...s.surface, padding: "18px 22px", marginBottom: 32, display: "flex", alignItems: "center", gap: 14, background: "#e8f5ee", border: "1px solid #b8e0c8" }}>
          <span style={{ fontSize: 22 }}>✅</span>
          <div>
            <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#1d1b20" }}>
              You're enrolled!
            </p>
            <p style={{ margin: "2px 0 0", fontSize: 13, ...s.muted }}>
              Your teacher is finishing setting up your course access — check back shortly.
            </p>
          </div>
        </div>
      )}

      {/* ── Course grid (teacher sees all, student sees only unlocked courses) ── */}
      {(isTeacher || studentVisibleCourses.length > 0) && (
        <>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 16 }}>
            <div>
              <p style={s.eyebrow}>Classes</p>
              <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>Pick a course to preview</h2>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ ...s.muted, fontSize: 13 }}>{studentVisibleCourses.length} live course{studentVisibleCourses.length !== 1 ? "s" : ""}</span>
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

          <div className="db-courses">
            {pageLoading ? [1, 2, 3].map(i => (
              <div key={i} style={{ height: 220, borderRadius: 12, background: "#f3edf7", opacity: 0.7 }} />
            )) : studentVisibleCourses.map((course) => (
              <div key={course.id} style={{ position: "relative" }}>
                <Link href={`/classroom?course=${course.id}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
                  <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid #e8e0ef", boxShadow: "0 1px 3px rgba(0,0,0,0.07)", background: "#fff" }}>
                    <div style={{ position: "relative", height: 96, background: course.banner_color, padding: "16px 16px 14px", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                      <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "#fff", lineHeight: 1.25 }}>{course.title}</h3>
                      <small style={{ display: "block", fontSize: 12, color: "rgba(255,255,255,0.75)", marginTop: 4 }}>{course.teacher}</small>
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
        </>
      )}

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
