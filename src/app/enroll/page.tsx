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
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-3.055 2.364-3.905 6.75-1.896 10.157 1.54 2.487 4.3 4.043 7.304 4.043.842 0 1.643-.105 2.406-.31l2.248 1.41c.324.203.603.216.889.118.286-.098.461-.274.516-.53l1.34-4.067c.194-.528.271-1.046.271-1.424C21 11.794 18.221 6.979 12.051 6.979z"/>
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
