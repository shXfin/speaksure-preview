"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { BrandMark, GoogleSVG, EyeSVG, EyeOffSVG } from "@/lib/m3"
import { A, authInput, authLabel, authBtnPrimary, authBtnOutline, authCard } from "@/lib/authTheme"
import { createClient } from "@/lib/supabase/client"

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  async function handleGoogle() {
    const supabase = createClient()
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name, role: "student" },
      },
    })
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSuccess(true)
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: `linear-gradient(135deg, ${A.navyMid} 0%, ${A.navyLight} 60%, ${A.navyMid} 100%)`, padding: "24px 16px" }}>
        <div style={{ width: "100%", maxWidth: 400, textAlign: "center", display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", justifyContent: "center" }}><BrandMark size={52} /></div>
          <div style={{ ...authCard, padding: 32 }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
              <div style={{ width: 64, height: 64, borderRadius: 16, background: "rgba(255,92,86,0.12)", display: "grid", placeItems: "center" }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={A.red} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
            </div>
            <h2 style={{ margin: "0 0 8px", fontSize: 20, fontWeight: 700, color: A.white }}>Check your email</h2>
            <p style={{ margin: "0 0 20px", fontSize: 14, color: A.muted, lineHeight: 1.6 }}>
              We sent a confirmation link to <strong>{email}</strong>. Click it to activate your account.
            </p>
            <Link href="/login" style={{ ...authBtnPrimary, display: "block", textAlign: "center", textDecoration: "none" }}>
              Back to sign in
            </Link>
          </div>
        </div>
      </div>
    )
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
              Create your account
            </h1>
            <p style={{ margin: 0, fontSize: 12, color: A.muted }}>
              口语课堂 · English classes for global students
            </p>
          </div>
        </div>

        {/* Card */}
        <form onSubmit={handleRegister} style={{ ...authCard, padding: 28, display: "flex", flexDirection: "column", gap: 18 }}>

          {error && (
            <div style={{ padding: "10px 14px", borderRadius: 8, background: "rgba(255,92,86,0.12)", border: `1px solid rgba(255,92,86,0.3)`, fontSize: 13, color: A.red }}>
              {error}
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label htmlFor="name" style={authLabel}>Full name</label>
            <input
              id="name" type="text" placeholder="Your name"
              value={name} onChange={e => setName(e.target.value)}
              required style={authInput}
            />
          </div>

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
                id="password" type={showPassword ? "text" : "password"} placeholder="min. 6 characters"
                value={password} onChange={e => setPassword(e.target.value)}
                minLength={6} required style={{ ...authInput, paddingRight: 44 }}
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

          <button type="submit" disabled={loading} style={{ ...authBtnPrimary, opacity: loading ? 0.7 : 1, cursor: loading ? "not-allowed" : "pointer" }}>
            {loading ? "Creating account..." : "Create Account"}
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
          Already have an account?{" "}
          <Link href="/login" style={{ color: A.red, fontWeight: 700, textDecoration: "none" }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
