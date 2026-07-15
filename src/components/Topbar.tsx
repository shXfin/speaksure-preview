"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { getProfile } from "@/lib/supabase/profile"
import { BrandMark } from "@/lib/m3"

const AVATAR_COLORS = ["#6750a4", "#1a6b5a", "#8b3a3a", "#1565c0", "#5d4037", "#2e7d32", "#7d5260", "#4a4458"]
function avatarColor(seed: string) {
  let hash = 0
  for (let i = 0; i < seed.length; i++) hash = seed.charCodeAt(i) + ((hash << 5) - hash)
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length]
}

function MenuIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="18" x2="20" y2="18" />
    </svg>
  )
}
function GridIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
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

const pill: React.CSSProperties = {
  display: "inline-flex", alignItems: "center", gap: 8,
  height: 40, padding: "0 20px", borderRadius: 20,
  fontSize: 14, fontWeight: 500, textDecoration: "none",
  transition: "background 150ms, color 150ms", whiteSpace: "nowrap",
}

export default function Topbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [userName, setUserName] = useState("")
  const [isTeacher, setIsTeacher] = useState(false)
  const onClasses = pathname === "/classes"
  const onStream = pathname.startsWith("/classroom")

  useEffect(() => {
    getProfile().then(p => {
      if (p) { setUserName(p.full_name ?? ""); setIsTeacher(p.role === "teacher") }
    })
  }, [])

  return (
    <>
      <header style={{
        position: "sticky", top: 0, zIndex: 100,
        display: "flex", alignItems: "center", gap: 8,
        height: 64, padding: "0 8px 0 4px",
        background: "#fff",
        borderBottom: "1px solid #e0e0e0",
        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
      }}>
        {/* Hamburger */}
        <button onClick={() => setOpen(!open)} style={{
          display: "grid", placeItems: "center",
          width: 48, height: 48, border: "none",
          borderRadius: "50%", background: "transparent",
          color: "#5f6368", cursor: "pointer", flexShrink: 0,
        }}>
          <MenuIcon />
        </button>

        {/* Brand */}
        <Link href="/classes" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "inherit", marginRight: 8, minWidth: 0 }}>
          <BrandMark size={46} />
          <span style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
            <strong style={{ fontSize: 18, fontWeight: 700, color: "#1d1b20", letterSpacing: "-0.2px" }}>SpeakSure</strong>
            <small className="t-tagline" style={{ fontSize: 12, color: "#625b71", marginTop: 3, fontWeight: 400 }}>English classes for Chinese learners</small>
          </span>
        </Link>

        {/* Nav — centred, hidden on mobile */}
        <nav className="t-nav">
          <Link href="/classes" style={{
            ...pill,
            background: onClasses ? "#eaddff" : "transparent",
            color: onClasses ? "#6750a4" : "#625b71",
          }}>
            <GridIcon /> Classes
          </Link>
          <Link href="/classroom" style={{
            ...pill,
            background: onStream ? "#eaddff" : "transparent",
            color: onStream ? "#6750a4" : "#625b71",
          }}>
            <StreamIcon /> Classroom
          </Link>
        </nav>

        {/* Profile pill */}
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "6px 14px 6px 8px", borderRadius: 999,
          border: "1px solid #cac4d0", background: "#fff",
          fontSize: 12, lineHeight: 1.3, flexShrink: 0, cursor: "pointer",
          transition: "background 150ms",
        }}
          onClick={async () => { const s = createClient(); await s.auth.signOut(); window.location.href = "/login" }}
          title="Sign out"
          onMouseEnter={e => (e.currentTarget.style.background = "#fdecea")}
          onMouseLeave={e => (e.currentTarget.style.background = "#fff")}
        >
          {/* Avatar circle */}
          <div style={{ display: "grid", placeItems: "center", width: 28, height: 28, borderRadius: "50%", background: avatarColor(userName || "?"), color: "#fff", fontWeight: 700, fontSize: 13, flexShrink: 0 }}>
            {(userName || "?").charAt(0).toUpperCase()}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: "#1d1b20", fontWeight: 600, fontSize: 13 }}>{userName || "—"} · {isTeacher ? "Teacher" : "Student"}</span>
            <span style={{ color: "#c62828", fontWeight: 500, fontSize: 11 }}>Sign out</span>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div onClick={() => setOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 99 }}>
          <nav onClick={e => e.stopPropagation()} style={{
            position: "fixed", left: 16, top: 80, zIndex: 100,
            width: 220, padding: 8, borderRadius: 8,
            background: "#fff", border: "1px solid #e0e0e0",
            boxShadow: "0 3px 12px rgba(0,0,0,0.15)",
          }}>
            <Link href="/classes" onClick={() => setOpen(false)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderRadius: 6, color: "#1d1b20", fontWeight: 500, textDecoration: "none", fontSize: 14 }}>
              <GridIcon /> Classes
            </Link>
            <Link href="/classroom" onClick={() => setOpen(false)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderRadius: 6, color: "#1d1b20", fontWeight: 500, textDecoration: "none", fontSize: 14 }}>
              <StreamIcon /> Classroom
            </Link>
            <div style={{ margin: "4px 8px", borderTop: "1px solid #e0e0e0" }} />
            <button
              onClick={async () => { const s = createClient(); await s.auth.signOut(); window.location.href = "/login" }}
              style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", padding: "12px 16px", borderRadius: 6, color: "#c62828", fontWeight: 500, fontSize: 14, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Sign out {userName ? `(${userName})` : ""}
            </button>
          </nav>
        </div>
      )}
    </>
  )
}
