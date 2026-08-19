import type { CSSProperties } from "react"

// Shared visual theme for the auth pages (login/register/forgot/reset),
// matching the main marketing site's navy/red palette instead of the
// generic M3 purple tokens used by the logged-in dashboard.
export const A = {
  navy:      "#0d1e3d",
  navyMid:   "#142040",
  navyLight: "#1a2f5a",
  navyCard:  "#162448",
  red:       "#ff5c56",
  white:     "#ffffff",
  muted:     "rgba(255,255,255,0.6)",
  border:    "rgba(255,255,255,0.1)",
}

export const authInput: CSSProperties = {
  height: 48,
  padding: "0 14px",
  border: `1px solid ${A.border}`,
  borderRadius: 8,
  fontSize: 14,
  fontFamily: "'Roboto', Arial, sans-serif",
  background: "rgba(255,255,255,0.05)",
  color: A.white,
  outline: "none",
  width: "100%",
  boxSizing: "border-box",
  transition: "border-color 150ms",
}

export const authLabel: CSSProperties = {
  fontSize: 13, fontWeight: 500,
  color: A.white, marginBottom: 6, display: "block",
}

export const authBtnPrimary: CSSProperties = {
  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
  height: 48, padding: "0 24px", borderRadius: 8, border: "none",
  background: A.red, color: A.navy,
  fontSize: 14, fontWeight: 700,
  fontFamily: "'Roboto', Arial, sans-serif",
  cursor: "pointer", width: "100%",
  transition: "background 150ms, box-shadow 150ms",
  letterSpacing: "0.1px",
}

export const authBtnOutline: CSSProperties = {
  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
  height: 48, padding: "0 24px", borderRadius: 8,
  border: `1px solid ${A.border}`, background: "rgba(255,255,255,0.04)",
  color: A.white, fontSize: 14, fontWeight: 500,
  fontFamily: "'Roboto', Arial, sans-serif",
  cursor: "pointer", width: "100%",
  transition: "border-color 150ms, background 150ms",
}

export const authCard: CSSProperties = {
  background: A.navyCard,
  border: `1px solid ${A.border}`,
  borderRadius: 16,
  boxShadow: "0 24px 64px rgba(0,0,0,0.35)",
}
