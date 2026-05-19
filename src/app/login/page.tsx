import Link from "next/link"
import { m3, BrandMark, GoogleSVG, OrDivider } from "@/lib/m3"

export default function LoginPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: m3.color.surfaceContainer, padding: "24px 16px" }}>
      <div style={{ width: "100%", maxWidth: 400, display: "flex", flexDirection: "column", gap: 24 }}>

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
        <div style={{ ...m3.card, padding: 28, display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label htmlFor="email" style={m3.label}>Email</label>
            <input id="email" type="email" placeholder="you@example.com" style={m3.input} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label htmlFor="password" style={m3.label}>Password</label>
            <input id="password" type="password" placeholder="••••••••" style={m3.input} />
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Link href="#" style={{ fontSize: 13, color: m3.color.primary, fontWeight: 500, textDecoration: "none" }}>
              Forgot password?
            </Link>
          </div>

          <button style={m3.btnPrimary}>Sign In</button>

          <OrDivider />

          <button style={m3.btnOutline}>
            <GoogleSVG /> Continue with Google
          </button>
        </div>

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
