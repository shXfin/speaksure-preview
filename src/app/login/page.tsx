"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { m3, BrandMark, GoogleSVG, OrDivider } from "@/lib/m3"
import { createClient } from "@/lib/supabase/client"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleGoogle() {
    const supabase = createClient()
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push("/classes")
      router.refresh()
    }
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: m3.color.surfaceContainer, padding: "24px 16px" }}>
      <div style={{ width: "100%", maxWidth: 400, display: "flex", flexDirection: "column", gap: 24 }}>

        {/* Back link */}
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: m3.color.muted, textDecoration: "none", fontWeight: 500, alignSelf: "flex-start" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Back to home
        </Link>

        {/* Header */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, textAlign: "center" }}>
          <BrandMark size={52} />
          <div>
            <h1 style={{ margin: "0 0 6px", fontSize: m3.font.xl, fontWeight: m3.font.bold, color: m3.color.text, letterSpacing: "-0.3px" }}>
              Sign in to SpeakSure
            </h1>
            <p style={{ margin: 0, fontSize: m3.font.sm, color: m3.color.muted }}>
              口语课堂 · English classes for Chinese learners
            </p>
          </div>
        </div>

        {/* Card */}
        <form onSubmit={handleLogin} style={{ ...m3.card, padding: 28, display: "flex", flexDirection: "column", gap: 18 }}>

          {error && (
            <div style={{ padding: "10px 14px", borderRadius: 8, background: "#fdecea", border: "1px solid #f5c6c6", fontSize: 13, color: "#c62828" }}>
              {error}
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label htmlFor="email" style={m3.label}>Email</label>
            <input
              id="email" type="email" placeholder="you@example.com"
              value={email} onChange={e => setEmail(e.target.value)}
              required style={m3.input}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label htmlFor="password" style={m3.label}>Password</label>
            <input
              id="password" type="password" placeholder="••••••••"
              value={password} onChange={e => setPassword(e.target.value)}
              required style={m3.input}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Link href="/forgot-password" style={{ fontSize: 13, color: m3.color.primary, fontWeight: 500, textDecoration: "none" }}>
              Forgot password?
            </Link>
          </div>

          <button type="submit" disabled={loading} style={{ ...m3.btnPrimary, opacity: loading ? 0.7 : 1, cursor: loading ? "not-allowed" : "pointer" }}>
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <OrDivider />

          <button type="button" onClick={handleGoogle} style={m3.btnOutline}>
            <GoogleSVG /> Continue with Google
          </button>
        </form>

        <p style={{ textAlign: "center", fontSize: m3.font.base, color: m3.color.muted, margin: 0 }}>
          Don&apos;t have an account?{" "}
          <Link href="/register" style={{ color: m3.color.primary, fontWeight: m3.font.bold, textDecoration: "none" }}>
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}
