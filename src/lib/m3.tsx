/**
 * SpeakSure · Material 3 Design Tokens
 * Single source of truth for all visual values across every page.
 * Import { m3, css } from "@/lib/m3" in any component.
 */

export const m3 = {
  // ── Colors ──────────────────────────────────────────────
  color: {
    primary:          "#6750a4",   // M3 purple — buttons, links, active states
    primarySoft:      "#eaddff",   // M3 purple tint — pill backgrounds, badges
    primaryDark:      "#4f378b",   // darker purple — course banners
    secondary:        "#625b71",   // muted text, inactive nav
    secondaryDark:    "#4a4458",   // course banners
    tertiary:         "#7d5260",   // course banners
    tertiaryDark:     "#633b48",   // course banners
    bg:               "#fffbfe",   // page background
    surface:          "#ffffff",   // card / panel background
    surfaceContainer: "#f3edf7",   // progress stats, subtle fills
    text:             "#1d1b20",   // primary text
    muted:            "#625b71",   // secondary text
    border:           "#e8e0ef",   // card borders
    borderLight:      "#cac4d0",   // dividers
    error:            "#b3261e",
  },

  // ── Typography ───────────────────────────────────────────
  font: {
    family: "'Roboto', Arial, 'Helvetica Neue', Helvetica, sans-serif",
    // sizes
    xs:    11,
    sm:    12,
    base:  14,
    md:    16,
    lg:    18,
    xl:    22,
    "2xl": 28,
    "3xl": 36,
    // weights
    regular: 400,
    medium:  500,
    bold:    700,
    black:   900,
  },

  // ── Spacing (8-pt grid) ──────────────────────────────────
  space: {
    1:  4,
    2:  8,
    3:  12,
    4:  16,
    5:  20,
    6:  24,
    7:  28,
    8:  32,
    10: 40,
    12: 48,
    16: 64,
  },

  // ── Radius ───────────────────────────────────────────────
  radius: {
    sm:   6,
    md:   8,
    lg:   12,
    xl:   16,
    full: 9999,
    logo: 12,   // brand mark rounded square
  },

  // ── Elevation / Shadows ──────────────────────────────────
  shadow: {
    1: "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.05)",   // cards
    2: "0 3px 8px rgba(0,0,0,0.12), 0 1px 3px rgba(0,0,0,0.07)",   // hover cards
    3: "0 6px 16px rgba(0,0,0,0.15), 0 3px 6px rgba(0,0,0,0.08)",  // dialogs
    topbar: "0 1px 3px rgba(0,0,0,0.08)",
  },

  // ── Component tokens (pre-built CSSProperties) ───────────
  card: {
    background:   "#ffffff",
    border:       "1px solid #e8e0ef",
    borderRadius: 12,
    boxShadow:    "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.05)",
  } as React.CSSProperties,

  input: {
    height: 48,
    padding: "0 14px",
    border: "1px solid #cac4d0",
    borderRadius: 8,
    fontSize: 14,
    fontFamily: "'Roboto', Arial, sans-serif",
    background: "#fff",
    color: "#1d1b20",
    outline: "none",
    width: "100%",
    boxSizing: "border-box" as const,
    transition: "border-color 150ms",
  } as React.CSSProperties,

  btnPrimary: {
    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
    height: 48, padding: "0 24px", borderRadius: 8, border: "none",
    background: "#6750a4", color: "#fff",
    fontSize: 14, fontWeight: 700,
    fontFamily: "'Roboto', Arial, sans-serif",
    cursor: "pointer", width: "100%",
    transition: "background 150ms, box-shadow 150ms",
    letterSpacing: "0.1px",
  } as React.CSSProperties,

  btnOutline: {
    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
    height: 48, padding: "0 24px", borderRadius: 8,
    border: "1px solid #cac4d0", background: "#fff",
    color: "#1d1b20", fontSize: 14, fontWeight: 500,
    fontFamily: "'Roboto', Arial, sans-serif",
    cursor: "pointer", width: "100%",
    transition: "border-color 150ms, box-shadow 150ms",
  } as React.CSSProperties,

  label: {
    fontSize: 13, fontWeight: 500,
    color: "#1d1b20", marginBottom: 6, display: "block",
  } as React.CSSProperties,

  eyebrow: {
    margin: "0 0 6px", color: "#6750a4",
    fontSize: 11, fontWeight: 700,
    textTransform: "uppercase" as const, letterSpacing: "0.8px",
  } as React.CSSProperties,

  muted: { color: "#625b71" } as React.CSSProperties,
} as const

// ── Google SVG ───────────────────────────────────────────────────────────────
export const GoogleSVG = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
)

// ── Password visibility icons ─────────────────────────────────────────────────
export const EyeSVG = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
)

export const EyeOffSVG = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a18.5 18.5 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
)

// ── Brand mark ───────────────────────────────────────────────────────────────
export const BrandMark = ({ size = 46 }: { size?: number }) => (
  <img src="/logo.svg" alt="SpeakSure" width={size} height={size} style={{ borderRadius: Math.round(size * 0.22), flexShrink: 0, display: "block" }} />
)

// ── Avatar ────────────────────────────────────────────────────────────────────
export const Avatar = ({ initial, size = 40, bg = "#6750a4" }: { initial: string; size?: number; bg?: string }) => (
  <span style={{
    display: "grid", placeItems: "center", flexShrink: 0,
    width: size, height: size, borderRadius: "50%",
    background: bg, color: "#fff", fontWeight: 700,
    fontSize: Math.round(size * 0.4),
  }}>{initial}</span>
)

// ── Divider with label ────────────────────────────────────────────────────────
export const OrDivider = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "4px 0" }}>
    <div style={{ flex: 1, height: 1, background: "#e8e0ef" }} />
    <span style={{ fontSize: 12, color: "#625b71", fontWeight: 500 }}>or</span>
    <div style={{ flex: 1, height: 1, background: "#e8e0ef" }} />
  </div>
)
