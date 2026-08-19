"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useState, useRef, useEffect } from "react"
import { courses, type Topic, type Assignment } from "@/lib/courses"
import { getProfile } from "@/lib/supabase/profile"
import { createClient } from "@/lib/supabase/client"
import {
  fetchTopics, seedTopics, createTopic, deleteTopic,
  createAssignment, updateAssignment, deleteAssignment, moveAssignmentToTopic, reorderAssignments
} from "@/lib/supabase/classwork"
import {
  DndContext,
  DragOverlay,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
  type DragStartEvent,
  type DragEndEvent,
} from "@dnd-kit/core"
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

// ── Design tokens ──────────────────────────────────────────
const primary = "#6750a4"
const primarySoft = "#eaddff"
const surface: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #e8e0ef",
  borderRadius: 12,
  boxShadow: "0 1px 3px rgba(0,0,0,0.07)",
}
const muted: React.CSSProperties = { color: "#625b71" }

// ── Icons ──────────────────────────────────────────────────
function AssignIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={primary} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
      <rect x="9" y="3" width="6" height="4" rx="1" />
      <line x1="9" y1="12" x2="15" y2="12" /><line x1="9" y1="16" x2="12" y2="16" />
    </svg>
  )
}
function LinkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  )
}
function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      style={{ transition: "transform 200ms", transform: open ? "rotate(0deg)" : "rotate(-90deg)" }}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}
function DragHandle() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#cac4d0" strokeWidth="2" strokeLinecap="round">
      <line x1="9" y1="6" x2="15" y2="6" /><line x1="9" y1="12" x2="15" y2="12" /><line x1="9" y1="18" x2="15" y2="18" />
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
function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 15.5 14" />
    </svg>
  )
}

const TABS = ["Classwork", "People"]

function LockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  )
}
function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  )
}

// ── Sortable Assignment Card ────────────────────────────────
function SortableAssignmentCard({
  assignment, isTeacher, topics, onMove, onDelete, onOpen, locked, completed,
}: {
  assignment: Assignment
  isTeacher: boolean
  topics: Topic[]
  onMove: (assignmentId: string, toTopicId: string) => void
  onDelete: (assignmentId: string) => void
  onOpen: (a: Assignment) => void
  locked: boolean
  completed: boolean
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: assignment.id })
  const style: React.CSSProperties = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.4 : 1 }
  const [menuOpen, setMenuOpen] = useState(false)
  const [showLockHint, setShowLockHint] = useState(false)

  const bg = completed ? "#f0faf4" : locked ? "#fafafa" : "#fff"
  const borderColor = completed ? "#a8d5b5" : locked ? "#e0e0e0" : "#e8e0ef"

  return (
    <div ref={setNodeRef} style={style}>
      <div style={{
        display: "flex", alignItems: "center", gap: 12,
        padding: "12px 16px", borderRadius: 8,
        border: `1px solid ${borderColor}`, background: bg,
        cursor: locked ? "default" : "pointer", transition: "background 150ms",
        opacity: locked ? 0.7 : 1, position: "relative",
      }}>
        {/* Drag handle — teacher only */}
        {isTeacher && (
          <span {...attributes} {...listeners} style={{ cursor: "grab", flexShrink: 0, display: "flex", alignItems: "center" }}>
            <DragHandle />
          </span>
        )}

        {/* Status icon */}
        <span style={{ flexShrink: 0, color: completed ? "#2e7d32" : locked ? "#9e9e9e" : primary }}>
          {completed ? <CheckIcon /> : locked ? <LockIcon /> : <AssignIcon />}
        </span>

        {/* Title */}
        <span
          onClick={() => { if (locked) { setShowLockHint(true); setTimeout(() => setShowLockHint(false), 2500) } else onOpen(assignment) }}
          style={{ flex: 1, fontSize: 14, fontWeight: 500, color: locked ? "#9e9e9e" : completed ? "#2e7d32" : "#1d1b20", minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", textDecoration: completed ? "line-through" : "none" }}
        >
          {assignment.title}
        </span>

        {/* Completed badge */}
        {completed && !isTeacher && (
          <span style={{ fontSize: 11, fontWeight: 600, color: "#2e7d32", background: "#e8f5e9", padding: "2px 8px", borderRadius: 99, flexShrink: 0 }}>Done</span>
        )}

        {/* Posted date */}
        {!completed && <span style={{ fontSize: 12, ...muted, flexShrink: 0 }}>Posted {assignment.postedDate}</span>}

        {/* Turn-in count — teacher only */}
        {isTeacher && (
          <span style={{ fontSize: 12, ...muted, flexShrink: 0, marginLeft: 4 }}>
            {assignment.turnedIn} / {assignment.assigned} turned in
          </span>
        )}

        {/* Teacher 3-dot menu */}
        {isTeacher && (
          <div style={{ position: "relative", flexShrink: 0 }}>
            <button onClick={e => { e.stopPropagation(); setMenuOpen(m => !m) }} style={{ background: "none", border: "none", cursor: "pointer", padding: "4px 6px", borderRadius: 4, color: "#625b71", fontSize: 18, lineHeight: 1 }}>⋮</button>
            {menuOpen && (
              <div onClick={e => e.stopPropagation()} style={{ position: "absolute", right: 0, top: 28, zIndex: 50, background: "#fff", border: "1px solid #e8e0ef", borderRadius: 8, boxShadow: "0 4px 16px rgba(0,0,0,0.12)", minWidth: 180, padding: 4 }}>
                <p style={{ margin: "8px 12px 4px", fontSize: 11, fontWeight: 700, color: "#625b71", textTransform: "uppercase", letterSpacing: "0.5px" }}>Move to topic</p>
                {topics.map(t => (
                  <button key={t.id} onClick={() => { onMove(assignment.id, t.id); setMenuOpen(false) }}
                    style={{ display: "block", width: "100%", textAlign: "left", padding: "8px 12px", background: "none", border: "none", cursor: "pointer", fontSize: 13, color: "#1d1b20", borderRadius: 4 }}
                    onMouseEnter={e => (e.currentTarget.style.background = "#f3edf7")}
                    onMouseLeave={e => (e.currentTarget.style.background = "none")}
                  >{t.name}</button>
                ))}
                <div style={{ margin: "4px 8px", borderTop: "1px solid #e8e0ef" }} />
                <button onClick={() => { onDelete(assignment.id); setMenuOpen(false) }}
                  style={{ display: "block", width: "100%", textAlign: "left", padding: "8px 12px", background: "none", border: "none", cursor: "pointer", fontSize: 13, color: "#d32f2f", borderRadius: 4 }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#fdecea")}
                  onMouseLeave={e => (e.currentTarget.style.background = "none")}
                >Delete assignment</button>
              </div>
            )}
          </div>
        )}

        {/* Lock hint tooltip */}
        {showLockHint && (
          <div style={{ position: "absolute", bottom: "calc(100% + 6px)", left: "50%", transform: "translateX(-50%)", background: "#1d1b20", color: "#fff", fontSize: 12, padding: "6px 12px", borderRadius: 6, whiteSpace: "nowrap", zIndex: 99, pointerEvents: "none" }}>
            Complete the previous task first
          </div>
        )}
      </div>
    </div>
  )
}

// ── Droppable topic container (accepts drops even when empty) ──
function DroppableTopicContainer({ id, isOver: parentIsOver, children }: { id: string; isOver?: boolean; children: React.ReactNode }) {
  const { setNodeRef, isOver } = useDroppable({ id })
  return (
    <div ref={setNodeRef} style={{
      minHeight: 16, borderRadius: 8,
      outline: isOver ? `2px dashed ${primary}` : "2px solid transparent",
      transition: "outline 150ms",
    }}>
      {children}
    </div>
  )
}

// ── Main Component ─────────────────────────────────────────
export default function ClassroomView() {
  const searchParams = useSearchParams()
  const courseId = searchParams.get("course") ?? "general-english"
  const urlTab = searchParams.get("tab")
  const course = courses.find(c => c.id === courseId) ?? courses[0]

  const [tab, setTab] = useState(urlTab ? TABS.find(t => t.toLowerCase() === urlTab) ?? "Classwork" : "Classwork")
  const [topics, setTopics] = useState<Topic[]>([])
  const [loading, setLoading] = useState(true)
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})
  const [isTeacher, setIsTeacher] = useState(false)
  const [userName, setUserName] = useState("")
  const [userId, setUserId] = useState<string | null>(null)
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set())
  const [sequentialMode, setSequentialMode] = useState(false) // off by default, teacher can toggle
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null)
  const [editingAssignment, setEditingAssignment] = useState(false)
  const [editData, setEditData] = useState({ title: "", instructions: "", link: "", dueDate: "", scheduleDate: "", scheduleTime: "" })
  const [editShowSchedule, setEditShowSchedule] = useState(false)
  const [editSaving, setEditSaving] = useState(false)

  // Students (loaded when People tab opens)
  const [students, setStudents] = useState<{ id: string; full_name: string | null }[]>([])
  const [studentsLoading, setStudentsLoading] = useState(false)

  useEffect(() => {
    if (tab !== "People") return
    setStudentsLoading(true)
    const supabase = createClient()
    supabase.from("profiles").select("id, full_name, created_at").eq("role", "student").order("full_name").then(({ data }) => {
      setStudents(data ?? [])
      setStudentsLoading(false)
    })
  }, [tab])

  // Class code
  const [classCode, setClassCode] = useState(course.code)
  const [editingCode, setEditingCode] = useState(false)
  const [codeInput, setCodeInput] = useState("")
  const [codeSaving, setCodeSaving] = useState(false)

  function makeRandomCode() {
    const chars = "abcdefghijkmnpqrstuvwxyz23456789"
    return Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join("")
  }

  async function saveClassCode(code: string) {
    if (!code.trim()) return
    setCodeSaving(true)
    const supabase = createClient()
    await supabase.from("course_codes").upsert({ course_id: course.id, code: code.trim() })
    setClassCode(code.trim())
    setEditingCode(false)
    setCodeSaving(false)
  }

  async function toggleSequential() {
    const next = !sequentialMode
    setSequentialMode(next)
    const supabase = createClient()
    await supabase.from("course_codes").upsert({ course_id: course.id, sequential_mode: next })
  }

  async function saveAssignmentEdit() {
    if (!selectedAssignment || !editData.title.trim()) return
    setEditSaving(true)
    try {
      await updateAssignment(selectedAssignment.id, {
        title: editData.title.trim(),
        instructions: editData.instructions.trim(),
        link: editData.link.trim(),
        dueDate: editData.dueDate,
      })
      // Update local state
      const updated = { ...selectedAssignment, title: editData.title.trim(), instructions: editData.instructions.trim() || undefined, link: editData.link.trim() || undefined, dueDate: editData.dueDate || undefined }
      setTopics(p => p.map(t => ({ ...t, assignments: t.assignments.map(a => a.id === selectedAssignment.id ? updated : a) })))
      setSelectedAssignment(updated)
      setEditingAssignment(false)
    } catch (e: any) { alert("Save failed: " + e.message) }
    setEditSaving(false)
  }

  // Load profile + completions
  useEffect(() => {
    async function loadProfile() {
      const supabase = createClient()
      const [profile, { data: { user } }] = await Promise.all([getProfile(), supabase.auth.getUser()])
      if (profile) {
        setIsTeacher(profile.role === "teacher")
        setUserName(profile.full_name ?? "")
      }
      if (user) {
        setUserId(user.id)
        if (profile?.role !== "teacher") {
          const { data } = await supabase.from("assignment_completions").select("assignment_id").eq("student_id", user.id)
          setCompletedIds(new Set((data ?? []).map((r: any) => r.assignment_id)))
        }
      }
    }
    loadProfile()
  }, [])

  async function markDone(assignmentId: string) {
    if (!userId || isTeacher) return
    const supabase = createClient()
    await supabase.from("assignment_completions").upsert({ student_id: userId, assignment_id: assignmentId })
    setCompletedIds(prev => new Set([...prev, assignmentId]))
  }

  useEffect(() => {
    async function load() {
      // Load class code + sequential mode from Supabase
      const supabase = createClient()
      const { data: codeRow } = await supabase.from("course_codes").select("code, sequential_mode").eq("course_id", course.id).single()
      if (codeRow?.code) setClassCode(codeRow.code)
      if (codeRow?.sequential_mode !== undefined && codeRow.sequential_mode !== null) setSequentialMode(codeRow.sequential_mode)

      setLoading(true)
      let data = await fetchTopics(course.id)
      if (data.length === 0) {
        // First time — seed from courses.ts
        await seedTopics(course.id, course.topics)
        data = await fetchTopics(course.id)
      }
      setTopics(data)
      setLoading(false)
    }
    load()
  }, [course.id])

  // Create dropdown
  const [createOpen, setCreateOpen] = useState(false)
  const createRef = useRef<HTMLDivElement>(null)

  // Modals
  const [showTopicModal, setShowTopicModal] = useState(false)
  const [showAssignModal, setShowAssignModal] = useState(false)
  const [newTopicName, setNewTopicName] = useState("")
  const [newAssign, setNewAssign] = useState({ title: "", link: "", instructions: "", topicId: "", dueDate: "", scheduleDate: "", scheduleTime: "" })
  const [showSchedule, setShowSchedule] = useState(false)

  // Active drag
  const [activeAssignment, setActiveAssignment] = useState<Assignment | null>(null)

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }))

  // Close create dropdown on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (createRef.current && !createRef.current.contains(e.target as Node)) setCreateOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  function toggleCollapse(id: string) {
    setCollapsed(p => ({ ...p, [id]: !p[id] }))
  }
  function collapseAll() {
    const all: Record<string, boolean> = {}
    topics.forEach(t => { all[t.id] = true })
    setCollapsed(all)
  }
  function expandAll() { setCollapsed({}) }
  const allCollapsed = topics.every(t => collapsed[t.id])

  // Add topic
  async function addTopic() {
    if (!newTopicName.trim()) return
    const row = await createTopic(course.id, newTopicName.trim(), topics.length)
    setTopics(p => [...p, { id: row.id, name: row.name, assignments: [] }])
    setNewTopicName("")
    setShowTopicModal(false)
  }

  // Add assignment
  async function addAssignment() {
    if (!newAssign.title.trim() || !newAssign.topicId) return
    const topic = topics.find(t => t.id === newAssign.topicId)
    const row = await createAssignment(
      newAssign.topicId,
      { title: newAssign.title.trim(), link: newAssign.link.trim(), instructions: newAssign.instructions.trim(), dueDate: newAssign.dueDate },
      topic?.assignments.length ?? 0
    )
    const a: Assignment = {
      id: row.id,
      title: row.title,
      link: row.link ?? undefined,
      instructions: row.instructions ?? undefined,
      postedDate: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      dueDate: row.due_date ?? undefined,
      turnedIn: 0,
      assigned: 0,
    }
    setTopics(p => p.map(t => t.id === newAssign.topicId ? { ...t, assignments: [...t.assignments, a] } : t))
    setNewAssign({ title: "", link: "", instructions: "", topicId: "", dueDate: "", scheduleDate: "", scheduleTime: "" })
    setShowSchedule(false)
    setShowAssignModal(false)
  }

  // Delete assignment
  async function deleteAssignmentById(assignmentId: string) {
    const supabase = createClient()
    const { error } = await supabase.from("assignments").delete().eq("id", assignmentId)
    if (error) { alert("Could not delete assignment: " + error.message); return }
    setTopics(p => p.map(t => ({ ...t, assignments: t.assignments.filter(a => a.id !== assignmentId) })))
  }

  // Delete topic
  async function deleteTopicById(topicId: string) {
    const supabase = createClient()
    const { error } = await supabase.from("topics").delete().eq("id", topicId)
    if (error) { alert("Could not delete topic: " + error.message); return }
    setTopics(p => p.filter(t => t.id !== topicId))
  }

  // Move assignment between topics
  async function moveAssignment(assignmentId: string, toTopicId: string) {
    await moveAssignmentToTopic(assignmentId, toTopicId)
    let moved: Assignment | null = null
    const updated = topics.map(t => {
      const found = t.assignments.find(a => a.id === assignmentId)
      if (found) { moved = found; return { ...t, assignments: t.assignments.filter(a => a.id !== assignmentId) } }
      return t
    })
    if (!moved) return
    setTopics(updated.map(t => t.id === toTopicId ? { ...t, assignments: [...t.assignments, moved!] } : t))
  }

  // Drag handlers
  function findTopicByAssignment(id: string): string | null {
    return topics.find(t => t.assignments.some(a => a.id === id))?.id ?? null
  }

  function handleDragStart(e: DragStartEvent) {
    const all = topics.flatMap(t => t.assignments)
    setActiveAssignment(all.find(a => a.id === e.active.id) ?? null)
  }

  function handleDragEnd(e: DragEndEvent) {
    setActiveAssignment(null)
    const { active, over } = e
    if (!over || active.id === over.id) return

    const fromTopicId = findTopicByAssignment(String(active.id))
    if (!fromTopicId) return

    // Dropped on a topic container (cross-topic move)
    const droppedOnTopic = topics.find(t => t.id === String(over.id))
    if (droppedOnTopic && droppedOnTopic.id !== fromTopicId) {
      moveAssignment(String(active.id), droppedOnTopic.id)
      return
    }

    // Dropped on another assignment
    const toTopicId = findTopicByAssignment(String(over.id))
    if (!toTopicId) return

    if (fromTopicId !== toTopicId) {
      // Cross-topic via assignment
      moveAssignment(String(active.id), toTopicId)
      return
    }

    // Same topic reorder
    const topic = topics.find(t => t.id === fromTopicId)
    if (!topic) return
    const oldIdx = topic.assignments.findIndex(a => a.id === active.id)
    const newIdx = topic.assignments.findIndex(a => a.id === over.id)
    if (oldIdx === -1 || newIdx === -1 || oldIdx === newIdx) return
    const updated = [...topic.assignments]
    const [item] = updated.splice(oldIdx, 1)
    updated.splice(newIdx, 0, item)
    setTopics(p => p.map(t => t.id === fromTopicId ? { ...t, assignments: updated } : t))
    reorderAssignments(updated)
  }

  return (
    <div className="app-main" style={{ margin: "0 auto", padding: "28px 0 64px" }}>

      <Link href="/classes" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "#6750a4", textDecoration: "none", fontWeight: 600, marginBottom: 14 }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
        Back to classes
      </Link>

      {/* ── Banner ── */}
      <div style={{
        borderRadius: 16, background: course.bannerColor,
        padding: "36px 32px 32px", marginBottom: 8, color: "#fff",
        minHeight: 160, display: "flex", flexDirection: "column", justifyContent: "flex-end",
        position: "relative",
      }}>
        <p style={{ margin: "0 0 6px", fontSize: 13, color: "rgba(255,255,255,0.8)" }}>SpeakSure classroom</p>
        <h1 style={{ margin: "0 0 6px", fontSize: 32, fontWeight: 700, lineHeight: 1.15, color: "#fff", letterSpacing: "-0.5px" }}>{course.title}</h1>
        <span style={{ fontSize: 14, color: "rgba(255,255,255,0.85)" }}>{course.zh} · {course.teacher} · {course.level}</span>

        {/* Role badge + sign out */}
        <div style={{ position: "absolute", top: 16, right: 16, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ padding: "4px 12px", borderRadius: 99, background: "rgba(255,255,255,0.2)", color: "#fff", fontSize: 12, fontWeight: 600 }}>
            {isTeacher ? "Teacher" : "Student"}{userName ? ` · ${userName}` : ""}
          </span>
          <button
            onClick={async () => { const s = createClient(); await s.auth.signOut(); window.location.href = "/login" }}
            style={{ padding: "4px 12px", borderRadius: 99, background: "rgba(255,255,255,0.15)", color: "#fff", border: "1px solid rgba(255,255,255,0.3)", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
          >
            Sign out
          </button>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div style={{ display: "flex", borderBottom: "1px solid #e0d9ea", marginBottom: 24, gap: 0 }}>
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: "14px 20px 12px", border: "none",
            borderBottom: `3px solid ${tab === t ? primary : "transparent"}`,
            background: "transparent",
            color: tab === t ? primary : "#625b71",
            fontWeight: tab === t ? 700 : 500,
            fontSize: 14, cursor: "pointer",
            transition: "color 150ms, border-color 150ms",
            fontFamily: "inherit",
          }}>
            {t}
          </button>
        ))}
      </div>


      {/* ══════════════ CLASSWORK ══════════════ */}
      {tab === "Classwork" && (
        <div>
          {loading && (
            <div style={{ textAlign: "center", padding: "40px 0", color: "#625b71", fontSize: 14 }}>Loading classwork...</div>
          )}
        {!loading && <div>
          {/* Toolbar */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            {isTeacher && (
              <div ref={createRef} style={{ position: "relative" }}>
                <button
                  onClick={() => setCreateOpen(p => !p)}
                  style={{
                    display: "flex", alignItems: "center", gap: 8,
                    padding: "8px 18px", borderRadius: 99,
                    background: primary, color: "#fff",
                    border: "none", cursor: "pointer",
                    fontSize: 14, fontWeight: 600, fontFamily: "inherit",
                  }}
                >
                  <PlusIcon /> Create
                </button>
                {createOpen && (
                  <div style={{
                    position: "absolute", left: 0, top: 44, zIndex: 50,
                    background: "#fff", border: "1px solid #e8e0ef", borderRadius: 10,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.13)", minWidth: 180, padding: 6,
                  }}>
                    {[
                      { label: "Assignment", icon: "📋", action: () => { setShowAssignModal(true); setCreateOpen(false) } },
                      { label: "Topic", icon: "📁", action: () => { setShowTopicModal(true); setCreateOpen(false) } },
                    ].map(({ label, icon, action }) => (
                      <button key={label} onClick={action} style={{
                        display: "flex", alignItems: "center", gap: 12, width: "100%",
                        padding: "10px 14px", background: "none", border: "none",
                        cursor: "pointer", fontSize: 14, color: "#1d1b20",
                        borderRadius: 6, fontFamily: "inherit", textAlign: "left",
                      }}
                        onMouseEnter={e => (e.currentTarget.style.background = "#f3edf7")}
                        onMouseLeave={e => (e.currentTarget.style.background = "none")}
                      >
                        <span>{icon}</span> {label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Topic filter */}
            <select style={{
              padding: "8px 12px", borderRadius: 8, border: "1px solid #cac4d0",
              fontSize: 13, color: "#1d1b20", background: "#fff", cursor: "pointer",
              fontFamily: "inherit",
            }}>
              <option>All topics</option>
              {topics.map(t => <option key={t.id}>{t.name}</option>)}
            </select>

            <button
              onClick={allCollapsed ? expandAll : collapseAll}
              style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", fontSize: 13, color: primary, fontWeight: 600, fontFamily: "inherit" }}
            >
              {allCollapsed ? "Expand all" : "Collapse all"}
            </button>
          </div>

          {/* Sequential mode banner */}
          {isTeacher ? (
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 16px", borderRadius: 8, background: sequentialMode ? "#fffbeb" : "#f3f4f6", border: `1px solid ${sequentialMode ? "#fde68a" : "#e5e7eb"}`, marginBottom: 4 }}>
              <span style={{ fontSize: 15 }}>{sequentialMode ? "🔒" : "🔓"}</span>
              <span style={{ fontSize: 13, color: sequentialMode ? "#92400e" : "#6b7280", flex: 1 }}>
                {sequentialMode ? <><strong>Sequential mode on</strong> — students must complete each task in order before the next unlocks.</> : <><strong>Sequential mode off</strong> — students can open any assignment freely.</>}
              </span>
              <button
                onClick={toggleSequential}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  padding: "5px 14px", borderRadius: 99, border: "none",
                  background: sequentialMode ? "#6750a4" : "#e5e7eb",
                  color: sequentialMode ? "#fff" : "#374151",
                  fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
                  transition: "all 150ms",
                }}
              >
                {sequentialMode ? "Turn off" : "Turn on"}
              </button>
            </div>
          ) : sequentialMode ? (
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 8, background: "#f0f7ff", border: "1px solid #bfdbfe", fontSize: 13, color: "#1e40af", marginBottom: 4 }}>
              <span>📋</span>
              <span>Complete each task in order to unlock the next one. Open a task, then click <strong>Mark as done</strong> when finished.</span>
            </div>
          ) : null}

          {/* Topics + Assignments with DnD */}
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {topics.map(topic => (
                <div key={topic.id} id={topic.id}>
                  {/* Topic header */}
                  <div
                    onClick={() => toggleCollapse(topic.id)}
                    style={{
                      display: "flex", alignItems: "center", gap: 8,
                      paddingBottom: 10, borderBottom: "2px solid #1d1b20",
                      cursor: "pointer", marginBottom: collapsed[topic.id] ? 0 : 8,
                    }}
                  >
                    <ChevronIcon open={!collapsed[topic.id]} />
                    <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#1d1b20", flex: 1 }}>{topic.name}</h3>
                    {isTeacher && (
                      <>
                        <span style={{ fontSize: 12, ...muted }}>{topic.assignments.length} {topic.assignments.length === 1 ? "assignment" : "assignments"}</span>
                        <button
                          onClick={e => { e.stopPropagation(); deleteTopicById(topic.id) }}
                          style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, color: "#d32f2f", fontWeight: 600, fontFamily: "inherit", padding: "2px 8px", borderRadius: 4 }}
                        >
                          Delete topic
                        </button>
                      </>
                    )}
                  </div>

                  {/* Assignments */}
                  {!collapsed[topic.id] && (
                    <SortableContext items={topic.assignments.map(a => a.id)} strategy={verticalListSortingStrategy}>
                      <DroppableTopicContainer id={topic.id}>
                      <div style={{ display: "flex", flexDirection: "column", gap: 6, minHeight: 8 }}>
                        {topic.assignments.length === 0 && isTeacher && (
                          <div style={{ padding: "20px 16px", textAlign: "center", fontSize: 13, ...muted, borderRadius: 8, border: "1px dashed #cac4d0" }}>
                            No assignments yet. Drag here or use Create.
                          </div>
                        )}
                        {topic.assignments.map((a, idx) => {
                          const prevId = idx > 0 ? topic.assignments[idx - 1].id : null
                          const locked = !isTeacher && sequentialMode && prevId !== null && !completedIds.has(prevId)
                          const completed = completedIds.has(a.id)
                          return (
                            <SortableAssignmentCard
                              key={a.id}
                              assignment={a}
                              isTeacher={isTeacher}
                              topics={topics}
                              onMove={moveAssignment}
                              onDelete={deleteAssignmentById}
                              onOpen={setSelectedAssignment}
                              locked={locked}
                              completed={completed}
                            />
                          )
                        })}
                      </div>
                      </DroppableTopicContainer>
                    </SortableContext>
                  )}
                </div>
              ))}
            </div>

            {/* Drag overlay */}
          <DragOverlay>
              {activeAssignment && (
                <div style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "12px 16px", borderRadius: 8,
                  border: "1px solid #6750a4", background: "#fff",
                  boxShadow: "0 8px 24px rgba(103,80,164,0.18)",
                  opacity: 0.95,
                }}>
                  <AssignIcon />
                  <span style={{ fontSize: 14, fontWeight: 500 }}>{activeAssignment.title}</span>
                </div>
              )}
            </DragOverlay>
          </DndContext>
        </div>}
        </div>
      )}

      {/* ══════════════ PEOPLE ══════════════ */}
      {tab === "People" && (
        <div style={{ maxWidth: 800 }}>

          {/* ── Teachers section ── */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 0 }}>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, flex: 1 }}>Teachers</h2>
          </div>
          <div style={{ borderBottom: `2px solid ${primary}`, margin: "10px 0 0" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 0", borderBottom: "1px solid #e8e0ef" }}>
            <div style={{ display: "grid", placeItems: "center", flexShrink: 0, width: 40, height: 40, borderRadius: "50%", background: primary, color: "#fff", fontWeight: 700, fontSize: 17 }}>
              {course.teacher.charAt(0)}
            </div>
            <span style={{ fontSize: 14, fontWeight: 500, color: "#1d1b20" }}>{course.teacher}</span>
          </div>

          {/* ── Students section ── */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 32 }}>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, flex: 1 }}>
              Students {!studentsLoading && students.length > 0 && (
                <span style={{ fontSize: 14, fontWeight: 400, color: "#625b71", marginLeft: 6 }}>{students.length} student{students.length !== 1 ? "s" : ""}</span>
              )}
            </h2>
          </div>
          <div style={{ borderBottom: `2px solid ${primary}`, margin: "10px 0 0" }} />

          {studentsLoading ? (
            <div style={{ padding: "24px 0", color: "#625b71", fontSize: 14 }}>Loading students…</div>
          ) : students.length === 0 ? (
            <div style={{ padding: "24px 0", color: "#625b71", fontSize: 14 }}>No students have joined yet.</div>
          ) : (
            <div>
              {students.map((s, i) => {
                const initial = (s.full_name ?? "?").charAt(0).toUpperCase()
                const colors = ["#6750a4", "#1a6b5a", "#8b3a3a", "#1565c0", "#5d4037", "#2e7d32"]
                const color = colors[(s.full_name?.charCodeAt(0) ?? 0) % colors.length]
                return (
                  <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 0", borderBottom: i < students.length - 1 ? "1px solid #f0eaf8" : "none" }}>
                    <div style={{ display: "grid", placeItems: "center", flexShrink: 0, width: 36, height: 36, borderRadius: "50%", background: color, color: "#fff", fontWeight: 700, fontSize: 15 }}>
                      {initial}
                    </div>
                    <span style={{ fontSize: 14, fontWeight: 500, color: "#1d1b20" }}>{s.full_name ?? "—"}</span>
                  </div>
                )
              })}
            </div>
          )}

          {/* ── Class code (teacher only) ── */}
          {isTeacher && (
            <div style={{ marginTop: 36, padding: "20px 24px", borderRadius: 12, border: "1px solid #e8e0ef", background: "#faf7ff" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700 }}>Class code</h3>
                <span style={{ fontSize: 12, color: "#625b71" }}>— share with students to join</span>
              </div>
              {editingCode ? (
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                  <input
                    autoFocus
                    value={codeInput}
                    onChange={e => setCodeInput(e.target.value.toLowerCase().replace(/\s/g, ""))}
                    maxLength={16}
                    style={{ fontFamily: "monospace", fontSize: 18, fontWeight: 700, color: primary, letterSpacing: "1px", padding: "6px 12px", borderRadius: 8, border: "2px solid #6750a4", outline: "none", width: 160 }}
                  />
                  <button onClick={() => setCodeInput(makeRandomCode())} style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "7px 14px", borderRadius: 8, border: "1px solid #cac4d0", background: "#fff", color: "#6750a4", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                    🔀 Random
                  </button>
                  <button onClick={() => saveClassCode(codeInput)} disabled={codeSaving || !codeInput.trim()} style={{ padding: "7px 16px", borderRadius: 8, border: "none", background: codeInput.trim() ? "#6750a4" : "#cac4d0", color: "#fff", fontSize: 13, fontWeight: 600, cursor: codeInput.trim() ? "pointer" : "not-allowed", fontFamily: "inherit" }}>
                    {codeSaving ? "Saving…" : "Save"}
                  </button>
                  <button onClick={() => setEditingCode(false)} style={{ padding: "7px 14px", borderRadius: 8, border: "1px solid #cac4d0", background: "#fff", color: "#625b71", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>Cancel</button>
                </div>
              ) : (
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <strong style={{ fontFamily: "monospace", fontSize: 24, fontWeight: 900, color: primary, letterSpacing: "2px" }}>{classCode}</strong>
                  <button onClick={() => { setCodeInput(classCode); setEditingCode(true) }} style={{ fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 99, border: "1px solid #cac4d0", background: "#fff", color: "#625b71", cursor: "pointer", fontFamily: "inherit" }}>
                    Edit
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}


      {/* ══════════════ ASSIGNMENT DETAIL MODAL ══════════════ */}
      {selectedAssignment && (
        <div
          onClick={() => setSelectedAssignment(null)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
        >
          <div onClick={e => e.stopPropagation()} style={{ background: "#fff", borderRadius: 16, width: "min(600px, 100%)", maxHeight: "80vh", overflow: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
            <div style={{ padding: "24px 28px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 20 }}>
                <div style={{ display: "grid", placeItems: "center", flexShrink: 0, width: 40, height: 40, borderRadius: "50%", background: primarySoft, color: primary }}><AssignIcon /></div>
                <div style={{ flex: 1 }}>
                  {editingAssignment ? (
                    <input
                      autoFocus
                      value={editData.title}
                      onChange={e => setEditData(p => ({ ...p, title: e.target.value }))}
                      style={{ width: "100%", fontSize: 20, fontWeight: 700, border: "none", borderBottom: "2px solid #6750a4", outline: "none", padding: "2px 0", fontFamily: "inherit", marginBottom: 4 }}
                    />
                  ) : (
                    <h2 style={{ margin: "0 0 4px", fontSize: 20, fontWeight: 700 }}>{selectedAssignment.title}</h2>
                  )}
                  <p style={{ margin: 0, fontSize: 13, ...muted }}>{course.teacher} · Posted {selectedAssignment.postedDate}</p>
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  {isTeacher && !editingAssignment && (
                    <button
                      onClick={() => { setEditingAssignment(true); setEditShowSchedule(false); setEditData({ title: selectedAssignment.title, instructions: selectedAssignment.instructions ?? "", link: selectedAssignment.link ?? "", dueDate: selectedAssignment.dueDate ?? "", scheduleDate: "", scheduleTime: "" }) }}
                      style={{ padding: "5px 14px", borderRadius: 8, border: "1px solid #cac4d0", background: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", color: "#625b71", fontFamily: "inherit" }}
                    >
                      Edit
                    </button>
                  )}
                  <button onClick={() => { setSelectedAssignment(null); setEditingAssignment(false) }} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 22, color: "#625b71", lineHeight: 1, padding: 4 }}>×</button>
                </div>
              </div>

              {/* Edit form */}
              {editingAssignment ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#625b71", marginBottom: 4 }}>Instructions</label>
                    <textarea value={editData.instructions} onChange={e => setEditData(p => ({ ...p, instructions: e.target.value }))} rows={3} placeholder="What should students do?" style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #cac4d0", fontSize: 14, fontFamily: "inherit", outline: "none", resize: "vertical", boxSizing: "border-box" }} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#625b71", marginBottom: 4 }}>Link (Formative / any URL)</label>
                    <input value={editData.link} onChange={e => setEditData(p => ({ ...p, link: e.target.value }))} placeholder="https://..." style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #cac4d0", fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <div>
                      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#625b71", marginBottom: 4 }}>Due date</label>
                      <input type="date" value={editData.dueDate} onChange={e => setEditData(p => ({ ...p, dueDate: e.target.value }))} style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #cac4d0", fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} />
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={() => setEditShowSchedule(p => !p)}
                      style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer", fontSize: 13, color: primary, fontWeight: 600, fontFamily: "inherit", padding: 0 }}
                    >
                      <ClockIcon /> {editShowSchedule ? "Remove schedule" : "Schedule for later"}
                    </button>
                    {editShowSchedule && (
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 10 }}>
                        <div>
                          <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#625b71", marginBottom: 4 }}>Publish date</label>
                          <input type="date" value={editData.scheduleDate} onChange={e => setEditData(p => ({ ...p, scheduleDate: e.target.value }))} style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #cac4d0", fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} />
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#625b71", marginBottom: 4 }}>Time</label>
                          <input type="time" value={editData.scheduleTime} onChange={e => setEditData(p => ({ ...p, scheduleTime: e.target.value }))} style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #cac4d0", fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} />
                        </div>
                      </div>
                    )}
                  </div>
                  <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", paddingTop: 4 }}>
                    <button onClick={() => setEditingAssignment(false)} style={{ padding: "8px 18px", borderRadius: 8, border: "1px solid #cac4d0", background: "#fff", cursor: "pointer", fontSize: 14, fontFamily: "inherit" }}>Cancel</button>
                    <button onClick={saveAssignmentEdit} disabled={editSaving || !editData.title.trim()} style={{ padding: "8px 18px", borderRadius: 8, border: "none", background: "#6750a4", color: "#fff", cursor: "pointer", fontSize: 14, fontWeight: 600, fontFamily: "inherit" }}>
                      {editSaving ? "Saving…" : editShowSchedule && editData.scheduleDate ? "Schedule" : "Save changes"}
                    </button>
                  </div>
                </div>
              ) : (
                <>
              {selectedAssignment.instructions && (
                <p style={{ fontSize: 14, lineHeight: 1.7, ...muted, marginBottom: 20 }}>{selectedAssignment.instructions}</p>
              )}

              {selectedAssignment.link && (
                <a href={selectedAssignment.link} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 18px", borderRadius: 8, background: primarySoft, color: primary, fontSize: 14, fontWeight: 600, textDecoration: "none", border: "1px solid #d0bcff" }}>
                  <LinkIcon /> Open assignment
                </a>
              )}

              {selectedAssignment.dueDate && (
                <p style={{ margin: "16px 0 0", fontSize: 13, ...muted }}>Due: {selectedAssignment.dueDate}</p>
              )}

              {/* Mark as done — students only */}
              {!isTeacher && (
                <div style={{ marginTop: 20, padding: "14px 16px", borderRadius: 10, background: completedIds.has(selectedAssignment.id) ? "#f0faf4" : "#f3edf7", border: `1px solid ${completedIds.has(selectedAssignment.id) ? "#a8d5b5" : "#d0bcff"}` }}>
                  {completedIds.has(selectedAssignment.id) ? (
                    <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#2e7d32", fontWeight: 600, fontSize: 14 }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      You've completed this task — next task is now unlocked!
                    </div>
                  ) : (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 13, color: "#625b71" }}>
                        {selectedAssignment.link ? "Complete the activity above, then mark as done to unlock the next task." : "When you're finished, mark this task as done to unlock the next one."}
                      </span>
                      <button onClick={() => markDone(selectedAssignment.id)} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 18px", borderRadius: 99, border: "none", background: "#6750a4", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap" }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        Mark as done
                      </button>
                    </div>
                  )}
                </div>
              )}
              </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ══════════════ ADD TOPIC MODAL ══════════════ */}
      {showTopicModal && (
        <div onClick={() => setShowTopicModal(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div onClick={e => e.stopPropagation()} style={{ background: "#fff", borderRadius: 16, width: "min(420px, 100%)", padding: "28px 32px", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
            <h2 style={{ margin: "0 0 6px", fontSize: 20, fontWeight: 700 }}>Add topic</h2>
            <p style={{ margin: "0 0 20px", fontSize: 13, ...muted }}>Topics help organise classwork into modules or units.</p>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Topic name <span style={{ color: "#d32f2f" }}>*</span></label>
            <input
              autoFocus
              value={newTopicName}
              onChange={e => setNewTopicName(e.target.value)}
              onKeyDown={e => e.key === "Enter" && addTopic()}
              placeholder="e.g. Vocabulary"
              style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid #cac4d0", fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }}
            />
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 24 }}>
              <button onClick={() => setShowTopicModal(false)} style={{ padding: "8px 18px", borderRadius: 8, border: "1px solid #cac4d0", background: "#fff", cursor: "pointer", fontSize: 14, fontFamily: "inherit" }}>Cancel</button>
              <button onClick={addTopic} style={{ padding: "8px 18px", borderRadius: 8, border: "none", background: primary, color: "#fff", cursor: "pointer", fontSize: 14, fontWeight: 600, fontFamily: "inherit" }}>Add topic</button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════ CREATE ASSIGNMENT MODAL ══════════════ */}
      {showAssignModal && (
        <div onClick={() => setShowAssignModal(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div onClick={e => e.stopPropagation()} style={{ background: "#fff", borderRadius: 16, width: "min(680px, 100%)", maxHeight: "90vh", overflow: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "20px 28px", borderBottom: "1px solid #e8e0ef" }}>
              <AssignIcon />
              <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>Create assignment</h2>
              <button onClick={() => setShowAssignModal(false)} style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", fontSize: 22, color: "#625b71", lineHeight: 1 }}>×</button>
            </div>

            <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column", gap: 18 }}>
              {/* Title */}
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Title <span style={{ color: "#d32f2f" }}>*</span></label>
                <input
                  autoFocus
                  value={newAssign.title}
                  onChange={e => setNewAssign(p => ({ ...p, title: e.target.value }))}
                  placeholder="Assignment title"
                  style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid #cac4d0", fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }}
                />
              </div>

              {/* Instructions */}
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Instructions <span style={{ ...muted, fontWeight: 400 }}>(optional)</span></label>
                <textarea
                  value={newAssign.instructions}
                  onChange={e => setNewAssign(p => ({ ...p, instructions: e.target.value }))}
                  placeholder="What should students do?"
                  rows={3}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid #cac4d0", fontSize: 14, fontFamily: "inherit", outline: "none", resize: "vertical", boxSizing: "border-box" }}
                />
              </div>

              {/* Link */}
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><LinkIcon /> Link <span style={{ ...muted, fontWeight: 400 }}>(Formative or any URL)</span></span>
                </label>
                <input
                  value={newAssign.link}
                  onChange={e => setNewAssign(p => ({ ...p, link: e.target.value }))}
                  placeholder="https://app.formative.com/..."
                  style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid #cac4d0", fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }}
                />
              </div>

              {/* Topic + Due date row */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Topic <span style={{ color: "#d32f2f" }}>*</span></label>
                  <select
                    value={newAssign.topicId}
                    onChange={e => setNewAssign(p => ({ ...p, topicId: e.target.value }))}
                    style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid #cac4d0", fontSize: 14, fontFamily: "inherit", outline: "none", background: "#fff" }}
                  >
                    <option value="">Select topic</option>
                    {topics.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Due date <span style={{ ...muted, fontWeight: 400 }}>(optional)</span></label>
                  <input
                    type="date"
                    value={newAssign.dueDate}
                    onChange={e => setNewAssign(p => ({ ...p, dueDate: e.target.value }))}
                    style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid #cac4d0", fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }}
                  />
                </div>
              </div>

              {/* Schedule toggle */}
              <div>
                <button
                  onClick={() => setShowSchedule(p => !p)}
                  style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer", fontSize: 13, color: primary, fontWeight: 600, fontFamily: "inherit", padding: 0 }}
                >
                  <ClockIcon /> {showSchedule ? "Remove schedule" : "Schedule for later"}
                </button>
                {showSchedule && (
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 12 }}>
                    <input
                      type="date"
                      value={newAssign.scheduleDate}
                      onChange={e => setNewAssign(p => ({ ...p, scheduleDate: e.target.value }))}
                      style={{ padding: "10px 14px", borderRadius: 8, border: "1px solid #cac4d0", fontSize: 14, fontFamily: "inherit", outline: "none" }}
                    />
                    <input
                      type="time"
                      value={newAssign.scheduleTime}
                      onChange={e => setNewAssign(p => ({ ...p, scheduleTime: e.target.value }))}
                      style={{ padding: "10px 14px", borderRadius: 8, border: "1px solid #cac4d0", fontSize: 14, fontFamily: "inherit", outline: "none" }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, padding: "16px 28px", borderTop: "1px solid #e8e0ef" }}>
              <button onClick={() => setShowAssignModal(false)} style={{ padding: "9px 20px", borderRadius: 8, border: "1px solid #cac4d0", background: "#fff", cursor: "pointer", fontSize: 14, fontFamily: "inherit" }}>Cancel</button>
              <button
                onClick={addAssignment}
                disabled={!newAssign.title.trim() || !newAssign.topicId}
                style={{ padding: "9px 20px", borderRadius: 8, border: "none", background: newAssign.title.trim() && newAssign.topicId ? primary : "#cac4d0", color: "#fff", cursor: newAssign.title.trim() && newAssign.topicId ? "pointer" : "not-allowed", fontSize: 14, fontWeight: 600, fontFamily: "inherit" }}
              >
                {showSchedule && newAssign.scheduleDate ? "Schedule" : "Assign"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
