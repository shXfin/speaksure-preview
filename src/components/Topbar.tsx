"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

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
  const onClasses = pathname === "/dashboard"
  const onStream = pathname.startsWith("/classroom")

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
        <Link href="/dashboard" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "inherit", marginRight: 8, minWidth: 0 }}>
          <span style={{
            display: "grid", placeItems: "center",
            width: 46, height: 46, borderRadius: 12,
            background: "#6750a4", color: "#fff",
            fontSize: 20, fontWeight: 900, flexShrink: 0,
            letterSpacing: "-0.5px",
          }}>S</span>
          <span style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
            <strong style={{ fontSize: 18, fontWeight: 700, color: "#1d1b20", letterSpacing: "-0.2px" }}>SpeakSure</strong>
            <small className="t-tagline" style={{ fontSize: 12, color: "#625b71", marginTop: 3, fontWeight: 400 }}>English classes for Chinese learners</small>
          </span>
        </Link>

        {/* Nav — centred, hidden on mobile */}
        <nav className="t-nav">
          <Link href="/dashboard" style={{
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
            <StreamIcon /> Stream
          </Link>
        </nav>

        {/* Profile pill */}
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          padding: "6px 16px", borderRadius: 999,
          border: "1px solid #cac4d0", background: "#fff",
          fontSize: 12, lineHeight: 1.3, flexShrink: 0, minWidth: 68,
        }}>
          <span style={{ color: "#625b71", fontWeight: 400 }}>Student</span>
          <strong style={{ color: "#1d1b20", fontWeight: 700 }}>学员</strong>
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
            <Link href="/dashboard" onClick={() => setOpen(false)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderRadius: 6, color: "#1d1b20", fontWeight: 500, textDecoration: "none", fontSize: 14 }}>
              <GridIcon /> Classes
            </Link>
            <Link href="/classroom" onClick={() => setOpen(false)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderRadius: 6, color: "#1d1b20", fontWeight: 500, textDecoration: "none", fontSize: 14 }}>
              <StreamIcon /> Stream
            </Link>
          </nav>
        </div>
      )}
    </>
  )
}
