"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { BrandMark, EyeSVG, EyeOffSVG } from "@/lib/m3"
import { A, authInput, authLabel, authBtnPrimary, authCard } from "@/lib/authTheme"
import { createClient } from "@/lib/supabase/client"

export default function ResetPasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    if (password !== confirm) {
      setError("Passwords do not match")
      return
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }
    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({ password })
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push("/classes")
    }
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: `linear-gradient(135deg, ${A.navyMid} 0%, ${A.navyLight} 60%, ${A.navyMid} 100%)`, padding: "24px 16px" }}>
      <div style={{ width: "100%", maxWidth: 400, display: "flex", flexDirection: "column", gap: 24 }}>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, textAlign: "center" }}>
          <BrandMark size={52} />
          <div>
            <h1 style={{ margin: "0 0 6px", fontSize: 22, fontWeight: 700, color: A.white, letterSpacing: "-0.3px" }}>
              Set new password
            </h1>
            <p style={{ margin: 0, fontSize: 12, color: A.muted }}>
              Choose a strong password for your account
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
            <label htmlFor="password" style={authLabel}>New password</label>
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

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label htmlFor="confirm" style={authLabel}>Confirm password</label>
            <input
              id="confirm" type={showPassword ? "text" : "password"} placeholder="repeat your password"
              value={confirm} onChange={e => setConfirm(e.target.value)}
              minLength={6} required style={authInput}
            />
          </div>

          <button type="submit" disabled={loading} style={{ ...authBtnPrimary, opacity: loading ? 0.7 : 1, cursor: loading ? "not-allowed" : "pointer" }}>
            {loading ? "Updating..." : "Update password"}
          </button>
        </form>
      </div>
    </div>
  )
}
