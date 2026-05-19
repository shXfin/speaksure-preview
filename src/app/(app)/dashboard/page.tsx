import Link from "next/link"
import { courses } from "@/lib/courses"

const s: Record<string, React.CSSProperties> = {
  surface: { background: "#fff", border: "1px solid #e8e0ef", borderRadius: 12, boxShadow: "0 1px 3px rgba(0,0,0,0.07), 0 1px 2px rgba(0,0,0,0.05)" },
  eyebrow: { margin: "0 0 6px", color: "#6750a4", fontSize: 11, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.8px" },
  muted: { color: "#625b71" },
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

export default function DashboardPage() {
  return (
    <main style={{ width: "min(1280px, calc(100% - 48px))", margin: "0 auto", padding: "28px 0 64px" }}>

      {/* ── Banner card ── */}
      <div style={{ ...s.surface, display: "grid", gridTemplateColumns: "1fr auto auto", alignItems: "center", gap: 24, padding: "20px 24px", marginBottom: 20 }}>
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

      {/* ── Quick actions ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 20 }}>
        {[
          { label: "Open stream", href: "/classroom", icon: <StreamIcon /> },
          { label: "View classwork", href: "/classroom?tab=classwork", icon: <AssignmentIcon /> },
          { label: "Today's class", href: "/classroom", icon: <CalendarIcon /> },
        ].map(({ label, href, icon }) => (
          <Link key={label} href={href} style={{
            display: "flex", alignItems: "center", gap: 12,
            height: 52, padding: "0 16px",
            ...s.surface, textDecoration: "none",
            color: "#1d1b20", fontSize: 14, fontWeight: 500,
            transition: "box-shadow 150ms, background 150ms",
          }}>
            <span style={{ color: "#6750a4" }}>{icon}</span>
            {label}
          </Link>
        ))}
      </div>

      {/* ── Welcome post ── */}
      <div style={{ ...s.surface, display: "flex", gap: 14, padding: "16px 20px", marginBottom: 28 }}>
        <div style={{
          display: "grid", placeItems: "center", flexShrink: 0,
          width: 40, height: 40, borderRadius: "50%",
          background: "#6750a4", color: "#fff", fontWeight: 700, fontSize: 16,
        }}>S</div>
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
        <span style={{ ...s.muted, fontSize: 13 }}>6 live course previews</span>
      </div>

      {/* ── Course grid ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
        {courses.map((course) => (
          <Link key={course.id} href={`/classroom?course=${course.id}`} style={{ textDecoration: "none", color: "inherit", display: "block" }}>
            <div style={{
              borderRadius: 12, overflow: "hidden",
              border: "1px solid #e8e0ef",
              boxShadow: "0 1px 3px rgba(0,0,0,0.07)",
              transition: "transform 150ms ease, box-shadow 150ms ease",
              background: "#fff",
            }}>
              {/* Banner */}
              <div style={{
                position: "relative", height: 96,
                background: course.bannerColor, padding: "16px 16px 14px",
                display: "flex", flexDirection: "column", justifyContent: "flex-end",
              }}>
                <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "#fff", lineHeight: 1.25 }}>{course.title}</h3>
                <span style={{ display: "block", fontSize: 13, color: "rgba(255,255,255,0.85)", marginTop: 4 }}>{course.zh}</span>
                <small style={{ display: "block", fontSize: 12, color: "rgba(255,255,255,0.75)", marginTop: 2 }}>{course.teacher}</small>
              </div>

              {/* Body */}
              <div style={{ padding: "14px 16px 16px" }}>
                <p style={{ margin: "0 0 6px", fontSize: 13, fontWeight: 600, color: "#1d1b20" }}>
                  Next: {course.nextTopic}
                </p>
                <p style={{ margin: "0 0 14px", fontSize: 13, ...s.muted, lineHeight: 1.5, minHeight: 40 }}>
                  {course.description}
                </p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: "#6750a4", background: "#eaddff", padding: "3px 10px", borderRadius: 99 }}>
                    {course.level}
                  </span>
                  <span style={{ fontSize: 12, ...s.muted }}>{course.schedule.split(",")[0]}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
