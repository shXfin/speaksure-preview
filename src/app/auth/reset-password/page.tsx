"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { m3, BrandMark } from "@/lib/m3"
import { createClient } from "@/lib/supabase/client"

export default function ResetPasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
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
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: m3.color.surfaceContainer, padding: "24px 16px" }}>
      <div style={{ width: "100%", maxWidth: 400, display: "flex", flexDirection: "column", gap: 24 }}>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, textAlign: "center" }}>
          <BrandMark size={52} />
          <div>
            <h1 style={{ margin: "0 0 6px", fontSize: m3.font.xl, fontWeight: m3.font.bold, color: m3.color.text, letterSpacing: "-0.3px" }}>
              Set new password
            </h1>
            <p style={{ margin: 0, fontSize: m3.font.sm, color: m3.color.muted }}>
              Choose a strong password for your account
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ ...m3.card, padding: 28, display: "flex", flexDirection: "column", gap: 18 }}>
          {error && (
            <div style={{ padding: "10px 14px", borderRadius: 8, background: "#fdecea", border: "1px solid #f5c6c6", fontSize: 13, color: "#c62828" }}>
              {error}
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label htmlFor="password" style={m3.label}>New password</label>
            <input
              id="password" type="password" placeholder="min. 6 characters"
              value={password} onChange={e => setPassword(e.target.value)}
              minLength={6} required style={m3.input}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label htmlFor="confirm" style={m3.label}>Confirm password</label>
            <input
              id="confirm" type="password" placeholder="repeat your password"
              value={confirm} onChange={e => setConfirm(e.target.value)}
              minLength={6} required style={m3.input}
            />
          </div>

          <button type="submit" disabled={loading} style={{ ...m3.btnPrimary, opacity: loading ? 0.7 : 1, cursor: loading ? "not-allowed" : "pointer" }}>
            {loading ? "Updating..." : "Update password"}
          </button>
        </form>
      </div>
    </div>
  )
}
