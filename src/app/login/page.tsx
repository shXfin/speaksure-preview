"use client"

import Link from "next/link"
import { useState } from "react"
import { BrandMark, GoogleSVG, EyeSVG, EyeOffSVG } from "@/lib/m3"
import { A, authInput, authLabel, authBtnPrimary, authBtnOutline, authCard } from "@/lib/authTheme"
import { createClient } from "@/lib/supabase/client"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleGoogle() {
    setError("")
    setLoading(true)
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}/auth/callback` },
      })
      if (error) {
        setError(error.message)
        setLoading(false)
      }
    } catch {
      setError("Could not start Google sign in. Please try again.")
      setLoading(false)
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        setError(error.message)
        setLoading(false)
      } else {
        window.location.assign("/classes")
      }
    } catch {
      setError("Could not reach the sign in service. Please check the Supabase environment variables and try again.")
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: `linear-gradient(135deg, ${A.navyMid} 0%, ${A.navyLight} 60%, ${A.navyMid} 100%)`, padding: "24px 16px" }}>
      <div style={{ width: "100%", maxWidth: 400, display: "flex", flexDirection: "column", gap: 24 }}>

        {/* Back link */}
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: A.muted, textDecoration: "none", fontWeight: 500, alignSelf: "flex-start" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Back to home
        </Link>

        {/* Header */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, textAlign: "center" }}>
          <BrandMark size={52} />
          <div>
            <h1 style={{ margin: "0 0 6px", fontSize: 22, fontWeight: 700, color: A.white, letterSpacing: "-0.3px" }}>
              Sign in to SpeakSure
            </h1>
            <p style={{ margin: 0, fontSize: 12, color: A.muted }}>
              口语课堂 · English classes for global students
            </p>
          </div>
        </div>

        {/* Card */}
        <form onSubmit={handleLogin} style={{ ...authCard, padding: 28, display: "flex", flexDirection: "column", gap: 18 }}>

          {error && (
            <div style={{ padding: "10px 14px", borderRadius: 8, background: "rgba(255,92,86,0.12)", border: `1px solid rgba(255,92,86,0.3)`, fontSize: 13, color: A.red }}>
              {error}
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label htmlFor="email" style={authLabel}>Email</label>
            <input
              id="email" type="email" placeholder="you@example.com"
              value={email} onChange={e => setEmail(e.target.value)}
              required style={authInput}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label htmlFor="password" style={authLabel}>Password</label>
            <div style={{ position: "relative" }}>
              <input
                id="password" type={showPassword ? "text" : "password"} placeholder="••••••••"
                value={password} onChange={e => setPassword(e.target.value)}
                required style={{ ...authInput, paddingRight: 44 }}
              />
              <button
                type="button" onClick={() => setShowPassword(v => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                style={{ position: "absolute", right: 4, top: "50%", transform: "translateY(-50%)", width: 36, height: 36, border: "none", background: "transparent", color: A.muted, display: "grid", placeItems: "center", cursor: "pointer" }}
              >
                {showPassword ? <EyeOffSVG /> : <EyeSVG />}
              </button>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Link href="/forgot-password" style={{ fontSize: 13, color: A.red, fontWeight: 500, textDecoration: "none" }}>
              Forgot password?
            </Link>
          </div>

          <button type="submit" disabled={loading} style={{ ...authBtnPrimary, opacity: loading ? 0.7 : 1, cursor: loading ? "not-allowed" : "pointer" }}>
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "4px 0" }}>
            <div style={{ flex: 1, height: 1, background: A.border }} />
            <span style={{ fontSize: 12, color: A.muted, fontWeight: 500 }}>or</span>
            <div style={{ flex: 1, height: 1, background: A.border }} />
          </div>

          <button type="button" onClick={handleGoogle} style={authBtnOutline}>
            <GoogleSVG /> Continue with Google
          </button>
        </form>

        <p style={{ textAlign: "center", fontSize: 14, color: A.muted, margin: 0 }}>
          Don&apos;t have an account?{" "}
          <Link href="/register" style={{ color: A.red, fontWeight: 700, textDecoration: "none" }}>
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}
