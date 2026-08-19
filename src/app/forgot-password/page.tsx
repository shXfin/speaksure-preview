"use client"

import Link from "next/link"
import { useState } from "react"
import { BrandMark } from "@/lib/m3"
import { A, authInput, authLabel, authBtnPrimary, authCard } from "@/lib/authTheme"
import { createClient } from "@/lib/supabase/client"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    })
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSent(true)
      setLoading(false)
    }
  }

  if (sent) {
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
              We sent a password reset link to <strong>{email}</strong>. Click it to set a new password.
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

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, textAlign: "center" }}>
          <BrandMark size={52} />
          <div>
            <h1 style={{ margin: "0 0 6px", fontSize: 22, fontWeight: 700, color: A.white, letterSpacing: "-0.3px" }}>
              Forgot password?
            </h1>
            <p style={{ margin: 0, fontSize: 12, color: A.muted }}>
              Enter your email and we&apos;ll send a reset link
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ ...authCard, padding: 28, display: "flex", flexDirection: "column", gap: 18 }}>
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

          <button type="submit" disabled={loading} style={{ ...authBtnPrimary, opacity: loading ? 0.7 : 1, cursor: loading ? "not-allowed" : "pointer" }}>
            {loading ? "Sending..." : "Send reset link"}
          </button>
        </form>

        <p style={{ textAlign: "center", fontSize: 14, color: A.muted, margin: 0 }}>
          Remember your password?{" "}
          <Link href="/login" style={{ color: A.red, fontWeight: 700, textDecoration: "none" }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
