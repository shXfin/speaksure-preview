"use client"

import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { courses } from "@/lib/courses"

const card: React.CSSProperties = {
  background: "#fff", border: "1px solid #e8e0ef", borderRadius: 12,
  boxShadow: "0 1px 3px rgba(0,0,0,0.07)",
}
const muted: React.CSSProperties = { color: "#625b71" }
const primary = "#6750a4"
const primarySoft = "#eaddff"

function ClockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 15.5 14" />
    </svg>
  )
}
function DocIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
      <rect x="9" y="3" width="6" height="4" rx="1" />
      <line x1="9" y1="12" x2="15" y2="12" /><line x1="9" y1="16" x2="12" y2="16" />
    </svg>
  )
}

const TABS = ["Stream", "Classwork", "People", "Progress"]

export default function ClassroomView() {
  const searchParams = useSearchParams()
  const courseId = searchParams.get("course") ?? "business"
  const urlTab = searchParams.get("tab")
  const course = courses.find(c => c.id === courseId) ?? courses[0]
  const [tab, setTab] = useState(urlTab ? TABS.find(t => t.toLowerCase() === urlTab) ?? "Stream" : "Stream")

  return (
    <div style={{ width: "min(1280px, calc(100% - 48px))", margin: "0 auto", padding: "28px 0 64px" }}>

      {/* ── Banner ── */}
      <div style={{
        borderRadius: 16, background: course.bannerColor,
        padding: "36px 32px 32px", marginBottom: 8, color: "#fff",
        minHeight: 180, display: "flex", flexDirection: "column", justifyContent: "flex-end",
      }}>
        <p style={{ margin: "0 0 6px", fontSize: 13, color: "rgba(255,255,255,0.8)" }}>SpeakSure classroom</p>
        <h1 style={{ margin: "0 0 6px", fontSize: 36, fontWeight: 700, lineHeight: 1.15, color: "#fff", letterSpacing: "-0.5px" }}>{course.title}</h1>
        <span style={{ fontSize: 14, color: "rgba(255,255,255,0.85)" }}>{course.zh} · {course.teacher} · {course.level}</span>
      </div>

      {/* ── Tabs ── */}
      <div style={{ display: "flex", borderBottom: "1px solid #e0d9ea", marginBottom: 24, gap: 0 }}>
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: "14px 20px 12px",
            border: "none", borderBottom: `3px solid ${tab === t ? primary : "transparent"}`,
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

      {/* ── Stream ── */}
      {tab === "Stream" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 260px", gap: 20, alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Share card */}
            <div style={{ ...card, display: "flex", gap: 14, padding: "16px 20px", borderStyle: "dashed", background: "#fafafa" }}>
              <div style={{ display: "grid", placeItems: "center", flexShrink: 0, width: 40, height: 40, borderRadius: "50%", border: "1px solid #cac4d0", color: primary, fontSize: 20, fontWeight: 300, background: "#fff" }}>+</div>
              <div>
                <strong style={{ fontSize: 14, fontWeight: 600 }}>Share something with your class</strong>
                <p style={{ margin: "4px 0 0", fontSize: 13, ...muted, lineHeight: 1.5 }}>
                  Ask a speaking question or send your practice note before the live lesson.
                </p>
              </div>
            </div>

            {/* Teacher post */}
            <div style={{ ...card, display: "flex", gap: 14, padding: "16px 20px" }}>
              <div style={{ display: "grid", placeItems: "center", flexShrink: 0, width: 40, height: 40, borderRadius: "50%", background: primary, color: "#fff", fontWeight: 700, fontSize: 16 }}>{course.initial}</div>
              <div>
                <strong style={{ fontSize: 14, fontWeight: 600 }}>{course.streamTitle}</strong>
                <p style={{ margin: "4px 0 0", fontSize: 14, ...muted, lineHeight: 1.6 }}>{course.streamText}</p>
              </div>
            </div>

            {/* Assignment */}
            <div style={{ ...card, display: "flex", gap: 14, padding: "16px 20px" }}>
              <div style={{ display: "grid", placeItems: "center", flexShrink: 0, width: 40, height: 40, borderRadius: "50%", background: primarySoft, color: primary }}><DocIcon /></div>
              <div>
                <strong style={{ fontSize: 14, fontWeight: 600 }}>Speaking assignment</strong>
                <p style={{ margin: "4px 0 0", fontSize: 14, ...muted, lineHeight: 1.6 }}>{course.assignment}</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div style={{ ...card, padding: 20 }}>
            <h2 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 700 }}>Upcoming</h2>
            <p style={{ margin: "0 0 16px", fontSize: 13, ...muted, lineHeight: 1.5 }}>{course.schedule}</p>
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 12px", borderRadius: 8, background: primarySoft, color: primary, fontSize: 13, fontWeight: 500, marginBottom: 16 }}>
              <ClockIcon /> Voice task due this week
            </div>
            <div style={{ paddingTop: 14, borderTop: "1px solid #e8e0ef", display: "flex", justifyContent: "space-between", fontSize: 13 }}>
              <span style={muted}>Class code</span>
              <strong style={{ fontFamily: "monospace", fontWeight: 700, fontSize: 14 }}>{course.code}</strong>
            </div>
            <button onClick={() => setTab("Classwork")} style={{ display: "block", marginTop: 14, color: primary, fontWeight: 700, fontSize: 13, background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "inherit" }}>
              View classwork →
            </button>
          </div>
        </div>
      )}

      {/* ── Classwork ── */}
      {tab === "Classwork" && (
        <div style={{ ...card, padding: "24px 28px" }}>
          <h2 style={{ margin: "0 0 6px", fontSize: 20, fontWeight: 700 }}>Classwork / 课堂任务</h2>
          <p style={{ margin: "0 0 24px", fontSize: 14, ...muted }}>
            Organized like a real classroom: live lesson prep, practice work, resources, and feedback.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {course.tasks.map(([topic, title, description, status], i) => (
              <div key={i}>
                <div style={{ fontSize: 12, fontWeight: 700, color: primary, textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: 10 }}>{topic}</div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 16, padding: "16px 20px", borderRadius: 10, border: "1px solid #e8e0ef", background: "#fff" }}>
                  <div style={{ display: "grid", placeItems: "center", flexShrink: 0, width: 36, height: 36, borderRadius: "50%", background: primarySoft, color: primary, fontWeight: 700, fontSize: 14 }}>{i + 1}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{ margin: "0 0 4px", fontSize: 16, fontWeight: 600 }}>{title}</h3>
                    <p style={{ margin: 0, fontSize: 13, ...muted, lineHeight: 1.5 }}>{description}</p>
                  </div>
                  <span style={{ flexShrink: 0, padding: "4px 10px", borderRadius: 99, fontSize: 12, fontWeight: 600,
                    background: status.startsWith("Due") ? "#fff3e0" : status.startsWith("Returned") ? "#e8f5e9" : primarySoft,
                    color:      status.startsWith("Due") ? "#bf6200" : status.startsWith("Returned") ? "#2e7d32" : primary,
                  }}>{status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── People ── */}
      {tab === "People" && (
        <div style={{ ...card, padding: "24px 28px" }}>
          <h2 style={{ margin: "0 0 20px", fontSize: 20, fontWeight: 700 }}>People / 成员</h2>
          <div style={{ display: "flex", gap: 16, padding: "16px 0", borderTop: "1px solid #e8e0ef", borderBottom: "1px solid #e8e0ef" }}>
            <div style={{ display: "grid", placeItems: "center", flexShrink: 0, width: 44, height: 44, borderRadius: "50%", background: primary, color: "#fff", fontWeight: 700, fontSize: 18 }}>{course.initial}</div>
            <div>
              <strong style={{ fontSize: 15, fontWeight: 600 }}>{course.teacher}</strong>
              <span style={{ display: "inline-block", marginLeft: 8, padding: "2px 8px", borderRadius: 99, background: primarySoft, color: primary, fontSize: 11, fontWeight: 700 }}>Teacher</span>
              <p style={{ margin: "6px 0 0", fontSize: 13, ...muted, lineHeight: 1.6 }}>{course.bio}</p>
            </div>
          </div>
          <h3 style={{ margin: "20px 0 12px", fontSize: 15, fontWeight: 600 }}>Learning outcomes</h3>
          <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
            {course.outcomes.map(o => (
              <li key={o} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, ...muted }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: primary, flexShrink: 0, display: "inline-block" }} />
                {o}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ── Progress ── */}
      {tab === "Progress" && (
        <div style={{ ...card, padding: "24px 28px" }}>
          <p style={{ margin: "0 0 4px", fontSize: 11, fontWeight: 700, color: primary, textTransform: "uppercase", letterSpacing: "0.8px" }}>Progress / 学习进度</p>
          <h2 style={{ margin: "0 0 24px", fontSize: 20, fontWeight: 700 }}>{course.title} progress</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
            {[["3", "Tasks completed"], ["2", "Teacher feedback notes"], ["85%", "Attendance"]].map(([val, label]) => (
              <div key={label} style={{ padding: "20px 24px", borderRadius: 12, background: "#f3edf7", border: "1px solid #e8e0ef" }}>
                <strong style={{ display: "block", fontSize: 32, fontWeight: 700, color: primary, lineHeight: 1 }}>{val}</strong>
                <span style={{ display: "block", marginTop: 8, fontSize: 13, ...muted }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
