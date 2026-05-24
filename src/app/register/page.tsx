"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { m3, BrandMark, GoogleSVG, OrDivider } from "@/lib/m3"
import { createClient } from "@/lib/supabase/client"

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

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
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: m3.color.surfaceContainer, padding: "24px 16px" }}>
        <div style={{ width: "100%", maxWidth: 400, textAlign: "center", display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", justifyContent: "center" }}><BrandMark size={52} /></div>
          <div style={{ ...m3.card, padding: 32 }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
              <div style={{ width: 64, height: 64, borderRadius: 16, background: "#eaddff", display: "grid", placeItems: "center" }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#6750a4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
            </div>
            <h2 style={{ margin: "0 0 8px", fontSize: 20, fontWeight: 700, color: m3.color.text }}>Check your email</h2>
            <p style={{ margin: "0 0 20px", fontSize: 14, color: m3.color.muted, lineHeight: 1.6 }}>
              We sent a confirmation link to <strong>{email}</strong>. Click it to activate your account.
            </p>
            <Link href="/login" style={{ ...m3.btnPrimary, display: "block", textAlign: "center", textDecoration: "none" }}>
              Back to sign in
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: m3.color.surfaceContainer, padding: "24px 16px" }}>
      <div style={{ width: "100%", maxWidth: 400, display: "flex", flexDirection: "column", gap: 24 }}>

        {/* Header */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, textAlign: "center" }}>
          <BrandMark size={52} />
          <div>
            <h1 style={{ margin: "0 0 6px", fontSize: m3.font.xl, fontWeight: m3.font.bold, color: m3.color.text, letterSpacing: "-0.3px" }}>
              Create your account
            </h1>
            <p style={{ margin: 0, fontSize: m3.font.sm, color: m3.color.muted }}>
              口语课堂 · English classes for Chinese learners
            </p>
          </div>
        </div>

        {/* Card */}
        <form onSubmit={handleRegister} style={{ ...m3.card, padding: 28, display: "flex", flexDirection: "column", gap: 18 }}>

          {error && (
            <div style={{ padding: "10px 14px", borderRadius: 8, background: "#fdecea", border: "1px solid #f5c6c6", fontSize: 13, color: "#c62828" }}>
              {error}
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label htmlFor="name" style={m3.label}>Full name</label>
            <input
              id="name" type="text" placeholder="Your name"
              value={name} onChange={e => setName(e.target.value)}
              required style={m3.input}
            />
          </div>

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
              id="password" type="password" placeholder="min. 6 characters"
              value={password} onChange={e => setPassword(e.target.value)}
              minLength={6} required style={m3.input}
            />
          </div>

          <button type="submit" disabled={loading} style={{ ...m3.btnPrimary, opacity: loading ? 0.7 : 1, cursor: loading ? "not-allowed" : "pointer" }}>
            {loading ? "Creating account..." : "Create Account"}
          </button>

          <OrDivider />

          <button type="button" style={m3.btnOutline}>
            <GoogleSVG /> Continue with Google
          </button>
        </form>

        <p style={{ textAlign: "center", fontSize: m3.font.base, color: m3.color.muted, margin: 0 }}>
          Already have an account?{" "}
          <Link href="/login" style={{ color: m3.color.primary, fontWeight: m3.font.bold, textDecoration: "none" }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
