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
function ExitIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 17l5-5-5-5"/><path d="M15 12H3"/><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
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
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20,
        height: 64, padding: "0 20px",
        background: "#fff",
        borderBottom: "1px solid #e0e0e0",
        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
      }}>
        {/* Brand */}
        <Link href="/classes" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "inherit", minWidth: 0 }}>
          <BrandMark size={46} />
          <span style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
            <strong style={{ fontSize: 18, fontWeight: 700, color: "#1d1b20", letterSpacing: "-0.2px" }}>SpeakSure</strong>
            <small className="t-tagline" style={{ fontSize: 12, color: "#625b71", marginTop: 3, fontWeight: 400 }}>English classes for global students</small>
          </span>
        </Link>

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

    </>
  )
}
