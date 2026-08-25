"use client"

import { Suspense, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { BrandMark } from "@/lib/m3"
import { createEnrollment, markWhatsappSent } from "@/lib/supabase/enrollments"
import { getProfile } from "@/lib/supabase/profile"
import { createClient } from "@/lib/supabase/client"

const C = {
  navy:     "#0d1e3d",
  navyMid:  "#142040",
  navyCard: "#162448",
  navyLight:"#1a2f5a",
  red:      "#ff5c56",
  white:    "#ffffff",
  muted:    "rgba(255,255,255,0.6)",
  border:   "rgba(255,255,255,0.08)",
}

const WHATSAPP_NUMBER = "601161684359"

function EnrollmentContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const planLabel = searchParams.get("plan") || "Course"
  const planPrice = searchParams.get("price") || ""

  const [loading, setLoading] = useState(true)
  const [enrollmentId, setEnrollmentId] = useState<string | null>(null)
  const [studentName, setStudentName] = useState("")
  const [studentEmail, setStudentEmail] = useState("")
  const [sent, setSent] = useState(false)

  useEffect(() => {
    async function init() {
      const supabase = createClient()
      const [profile, { data: { user } }] = await Promise.all([
        getProfile(),
        supabase.auth.getUser(),
      ])
      setStudentName(profile?.full_name || "")
      setStudentEmail(user?.email || "")

      const { data } = await createEnrollment(planLabel, planPrice)
      if (data) setEnrollmentId(data.id)
      setLoading(false)
    }
    init()
  }, [planLabel, planPrice])

  const whatsappMessage = `Hi! I'd like to enroll in the ${planLabel} plan (${planPrice}).${studentName ? ` My name is ${studentName}.` : ""}${studentEmail ? ` My account email is ${studentEmail}.` : ""} Please let me know how to complete payment.`
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`

  async function handleWhatsappClick() {
    setSent(true)
    if (enrollmentId) await markWhatsappSent(enrollmentId)
  }

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: `linear-gradient(135deg, ${C.navyMid} 0%, ${C.navyLight} 60%, ${C.navyMid} 100%)`,
      }}>
        <BrandMark size={52} />
      </div>
    )
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: `linear-gradient(135deg, ${C.navyMid} 0%, ${C.navyLight} 60%, ${C.navyMid} 100%)`,
      padding: "24px 16px",
    }}>
      <div style={{ width: "100%", maxWidth: 500, display: "flex", flexDirection: "column", gap: 24 }}>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, textAlign: "center" }}>
          <BrandMark size={52} />
          <div>
            <h1 style={{ margin: "0 0 6px", fontSize: 26, fontWeight: 800, color: C.white, letterSpacing: "-0.4px" }}>
              Almost there
            </h1>
            <p style={{ margin: 0, fontSize: 14, color: C.muted, lineHeight: 1.6 }}>
              One quick step to finish your enrollment
            </p>
          </div>
        </div>

        <div style={{
          background: C.navyCard,
          border: `1px solid ${C.border}`,
          borderRadius: 12,
          padding: 28,
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: 16, borderBottom: `1px solid ${C.border}` }}>
            <div>
              <p style={{ margin: "0 0 4px", fontSize: 12, color: C.muted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                Selected plan
              </p>
              <p style={{ margin: 0, fontSize: 17, fontWeight: 700, color: C.white }}>{planLabel}</p>
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, color: C.red }}>{planPrice}</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <p style={{ margin: 0, fontSize: 13, color: C.muted, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.5px" }}>
              What happens next
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { n: "1", text: "Message us on WhatsApp — your plan details are already filled in" },
                { n: "2", text: "Our team confirms your payment" },
                { n: "3", text: "Your teacher gives you access to your classroom" },
                { n: "4", text: "You'll see your course waiting in your dashboard" },
              ].map(step => (
                <div key={step.n} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={{
                    width: 22, height: 22, borderRadius: "50%", background: "rgba(255,92,86,0.15)",
                    color: C.red, fontSize: 11, fontWeight: 800, display: "grid", placeItems: "center", flexShrink: 0, marginTop: 1,
                  }}>
                    {step.n}
                  </div>
                  <p style={{ margin: 0, fontSize: 14, color: C.white, lineHeight: 1.5 }}>{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleWhatsappClick}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            padding: "15px 24px",
            background: "#25d366",
            color: C.white,
            border: "none",
            borderRadius: 10,
            fontSize: 15,
            fontWeight: 700,
            cursor: "pointer",
            textDecoration: "none",
            transition: "all 0.2s",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 32 32" fill="currentColor">
            <path d="M16.001 0C7.164 0 0 7.163 0 16c0 3.2.94 6.174 2.556 8.673L.53 32l7.554-1.98A15.9 15.9 0 0016.001 32C24.837 32 32 24.837 32 16S24.837 0 16.001 0zm0 29.334a13.26 13.26 0 01-6.77-1.857l-.485-.288-4.478 1.174 1.194-4.365-.316-.502A13.29 13.29 0 012.667 16C2.667 8.636 8.637 2.667 16.001 2.667 23.363 2.667 29.334 8.636 29.334 16S23.363 29.334 16.001 29.334z"/>
            <path d="M23.472 19.382c-.397-.199-2.35-1.157-2.714-1.29-.363-.132-.628-.198-.892.2-.264.397-1.023 1.288-1.253 1.552-.23.264-.462.297-.858.099-.397-.198-1.675-.617-3.19-1.965-1.178-1.05-1.974-2.35-2.206-2.746-.23-.397-.024-.611.173-.809.178-.177.397-.463.595-.694.199-.232.264-.397.397-.662.132-.264.066-.495-.033-.694-.099-.198-.892-2.15-1.222-2.943-.323-.772-.65-.667-.893-.68-.23-.011-.495-.013-.76-.013-.264 0-.694.099-1.057.496-.363.397-1.387 1.355-1.387 3.305 0 1.95 1.42 3.834 1.618 4.099.198.264 2.795 4.268 6.773 5.983.945.408 1.682.652 2.258.834.95.303 1.815.26 2.497.157.762-.114 2.35-.96 2.68-1.886.33-.925.33-1.718.231-1.884-.099-.165-.363-.264-.76-.463z"/>
          </svg>
          {sent ? "Reopen WhatsApp message" : "Message us on WhatsApp"}
        </a>

        {sent && (
          <div style={{
            padding: "14px 18px",
            borderRadius: 10,
            background: "rgba(37,211,102,0.1)",
            border: "1px solid rgba(37,211,102,0.25)",
            fontSize: 13,
            color: C.white,
            textAlign: "center",
            lineHeight: 1.6,
          }}>
            Sent! Once we confirm your payment, your teacher will unlock your course — you'll see it in your dashboard.
          </div>
        )}

        <div style={{ textAlign: "center" }}>
          <button
            onClick={() => router.push("/classes")}
            style={{
              fontSize: 14,
              color: C.muted,
              fontWeight: 500,
              background: "transparent",
              border: "none",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Go to my dashboard
          </button>
        </div>

      </div>
    </div>
  )
}

export default function EnrollmentPage() {
  return (
    <Suspense fallback={null}>
      <EnrollmentContent />
    </Suspense>
  )
}
