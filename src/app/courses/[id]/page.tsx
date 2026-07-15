"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, use } from "react"

const C = {
  navy:     "#0d1e3d",
  navyMid:  "#142040",
  navyCard: "#162448",
  navyLight:"#1a2f5a",
  gold:     "#f5c518",
  white:    "#ffffff",
  muted:    "rgba(255,255,255,0.6)",
  border:   "rgba(255,255,255,0.08)",
}

const COURSES: Record<string, {
  title: string; desc: string; price: string; origPrice: string;
  duration: string; hours: number; lessons: number; views: string;
  photo: string; rating: number; reviews: number;
  schedule: { section: string; days: { day: string; time: string }[] }[];
  content: { section: string; count: number; items: string[] }[];
  contains: string[];
  studentReviews: { name: string; date: string; stars: number; comment: string }[];
}> = {
  "1": {
    title: "6-Month English Course",
    desc: "Six months of structured English for adults. Covers speaking, listening, reading and writing from intermediate to advanced level.",
    price: "¥1,099", origPrice: "¥2,200",
    duration: "6 Months", hours: 240, lessons: 120, views: "116,345",
    photo: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&q=80",
    rating: 4.9, reviews: 574,
    contains: [
      "Daily training, weekly and monthly tests",
      "Follow the course via mobile phone, tablet, or computer",
      "Live sessions Mon / Tue / Wed · 16:00–18:00",
      "Placement test included",
    ],
    schedule: [
      {
        section: "Live lesson dates (start date 06-07-2026)",
        days: [
          { day: "Monday",    time: "16:00–18:00" },
          { day: "Tuesday",   time: "16:00–18:00" },
          { day: "Wednesday", time: "16:00–18:00" },
        ],
      },
      {
        section: "Listening class (start date 06-07-2026)",
        days: [{ day: "Saturday", time: "16:00–18:00" }],
      },
      {
        section: "Writing Class (start date 06-07-2026)",
        days: [{ day: "Sunday", time: "16:00–18:00" }],
      },
    ],
    content: [
      {
        section: "Placement test",
        count: 0,
        items: ["1. Placement test"],
      },
      {
        section: "Content",
        count: 24,
        items: [
          "Lesson 1", "2. Lesson Two", "3. Lesson Three", "4. Lesson Four",
          "5. Lesson Five", "6. Lesson Six", "7. Lesson Seven", "8. Lesson Eight",
          "Lesson 9", "Lesson 10", "11. Lesson Eleven", "12. Lesson Twelve",
          "13. Lesson Thirteen", "14. Lesson Fourteen", "15. Lesson Fifteen",
          "16. Lesson Sixteen", "17. Lesson Seventeen", "18. Lesson Eighteen",
          "19. Lesson Nineteen", "20. Lesson Twenty", "21. Lesson Twenty-One",
          "22. Lesson Twenty-Two", "23. Lesson Twenty-Three", "24. Lesson Twenty-Four",
        ],
      },
    ],
    studentReviews: [
      { name: "Li Wei",    date: "27/06/2026", stars: 5, comment: "Excellent teacher, very clear explanations!" },
      { name: "Zhang Min", date: "20/06/2026", stars: 5, comment: "My IELTS score jumped from 5.5 to 7.0. Highly recommend." },
      { name: "Wang Fang", date: "15/06/2026", stars: 5, comment: "The structured curriculum made a huge difference." },
      { name: "Chen Yu",   date: "10/06/2026", stars: 4, comment: "Great content. Very professional." },
      { name: "Liu Jing",  date: "05/06/2026", stars: 5, comment: "Very beautiful lessons, learned so much!" },
      { name: "Sun Li",    date: "01/06/2026", stars: 5, comment: "Creative teaching style, highly effective." },
    ],
  },
  "2": {
    title: "3-Month Intensive",
    desc: "Three months of intensive English language training. Ideal for students who want fast progress.",
    price: "¥699", origPrice: "¥1,400",
    duration: "3 Months", hours: 120, lessons: 60, views: "52,438",
    photo: "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=1200&q=80",
    rating: 4.8, reviews: 228,
    contains: [
      "Daily training, weekly and monthly tests",
      "Follow the course via mobile phone, tablet, or computer",
      "Live sessions Tue / Thu · 16:00–18:00",
      "Placement test included",
    ],
    schedule: [
      {
        section: "Live lesson dates (start date 06-07-2026)",
        days: [
          { day: "Tuesday",  time: "16:00–18:00" },
          { day: "Thursday", time: "16:00–18:00" },
        ],
      },
      {
        section: "Listening class (start date 06-07-2026)",
        days: [{ day: "Saturday", time: "16:00–18:00" }],
      },
    ],
    content: [
      {
        section: "Placement test",
        count: 0,
        items: ["1. Placement test"],
      },
      {
        section: "Content",
        count: 12,
        items: [
          "Lesson 1", "2. Lesson Two", "3. Lesson Three", "4. Lesson Four",
          "5. Lesson Five", "6. Lesson Six", "7. Lesson Seven", "8. Lesson Eight",
          "Lesson 9", "Lesson 10", "11. Lesson Eleven", "12. Lesson Twelve",
        ],
      },
    ],
    studentReviews: [
      { name: "Zhao Lei",  date: "25/06/2026", stars: 5, comment: "Amazing pace, learned so much in 3 months!" },
      { name: "Wang Bo",   date: "18/06/2026", stars: 5, comment: "Best decision I made for my English." },
      { name: "Chen Xia",  date: "12/06/2026", stars: 4, comment: "Very good. The teacher is patient and clear." },
      { name: "Lin Yue",   date: "08/06/2026", stars: 5, comment: "Highly recommend this intensive course." },
    ],
  },
}

const TABS = ["Overview", "Appointments", "Content", "Evaluation"] as const
type Tab = typeof TABS[number]

function Stars({ count, size = 14 }: { count: number; size?: number }) {
  return (
    <span>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ fontSize: size, color: i <= count ? C.gold : "rgba(255,255,255,0.2)" }}>★</span>
      ))}
    </span>
  )
}

export default function CourseDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const course = COURSES[id]
  const [tab, setTab] = useState<Tab>("Overview")

  if (!course) {
    return (
      <div style={{ background: C.navy, minHeight: "100vh", display: "grid", placeItems: "center", color: C.white }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: 18, marginBottom: 16 }}>Course not found.</p>
          <Link href="/" style={{ color: C.gold }}>← Back to home</Link>
        </div>
      </div>
    )
  }

  const ratingBars = [
    { stars: 5, pct: 86 }, { stars: 4, pct: 10 }, { stars: 3, pct: 3 },
    { stars: 2, pct: 1 },  { stars: 1, pct: 0 },
  ]

  return (
    <div className="l-page-root" style={{ background: C.navy, color: C.white, fontFamily: "'Segoe UI','PingFang SC',Arial,sans-serif", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        html, body { overflow-x: hidden; }
        .l-page-root { overflow-x: hidden; }
        .l-detail-grid { display: grid; grid-template-columns: 320px 1fr; gap: 32px; align-items: start; }
        .l-detail-grid > * { min-width: 0; }
        .l-sidebar { position: sticky; top: 80px; min-width: 0; }
        .l-tab-bar { display: flex; overflow-x: auto; -webkit-overflow-scrolling: touch; }
        .l-tab-bar button { flex-shrink: 0; }
        .l-eval-grid { display: grid; grid-template-columns: 1fr auto; gap: 32px; align-items: center; }
        @media (max-width: 768px) {
          .l-detail-grid { grid-template-columns: 1fr !important; padding: 16px !important; }
          .l-sidebar { position: static !important; order: 2; }
          .l-detail-grid > div:last-child { order: 1; }
          .l-eval-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
        }
      `}</style>

      {/* Nav */}
      <nav style={{ background: C.navyMid, borderBottom: `1px solid ${C.border}`, position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px", height: 60, display: "flex", alignItems: "center", gap: 16 }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
            <img src="/logo.svg" alt="SpeakSure" width={32} height={32} style={{ borderRadius: 8, flexShrink: 0, display: "block" }} />
            <strong style={{ fontSize: 15, color: C.white }}>SpeakSure</strong>
          </Link>
          <span style={{ color: C.muted, fontSize: 13 }}>·</span>
          <span style={{ fontSize: 13, color: C.muted }}>{course.title}</span>
        </div>
      </nav>

      {/* Main layout */}
      <div className="l-detail-grid" style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 20px" }}>

        {/* ── Left sidebar ─────────────────────────────────── */}
        <div className="l-sidebar">
          <div style={{ background: C.navyCard, borderRadius: 16, border: `1px solid ${C.border}`, overflow: "hidden" }}>
            {/* Price block */}
            <div style={{ padding: "24px", borderBottom: `1px solid ${C.border}` }}>
              <div style={{ fontSize: 11, color: C.muted, textDecoration: "line-through", marginBottom: 4 }}>{course.origPrice}</div>
              <div style={{ fontSize: 36, fontWeight: 900, color: C.gold, marginBottom: 4 }}>{course.price}</div>
              <div style={{ display: "inline-block", padding: "3px 10px", background: "rgba(245,197,24,0.15)", borderRadius: 20, fontSize: 11, color: C.gold, fontWeight: 700, marginBottom: 20 }}>
                50% OFF — Limited time
              </div>

              {/* SAR installment note */}
              <div style={{ fontSize: 12, color: C.muted, marginBottom: 20, lineHeight: 1.6 }}>
                Or split into 4 installments with no late fees.{" "}
                <span style={{ color: C.gold, cursor: "pointer" }}>Learn more</span>
              </div>

              <Link href="/register" style={{ display: "block", textAlign: "center", padding: "14px", borderRadius: 10, background: C.gold, color: C.navy, fontWeight: 800, fontSize: 14, textDecoration: "none", marginBottom: 12 }}>
                SUBSCRIBE NOW
              </Link>
            </div>

            {/* Course contains */}
            <div style={{ padding: "20px 24px" }}>
              <strong style={{ fontSize: 14, display: "block", marginBottom: 14 }}>The course contains</strong>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {course.contains.map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{ fontSize: 14, marginTop: 1 }}>📋</span>
                    <span style={{ fontSize: 13, color: C.muted, lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Share */}
            <div style={{ padding: "16px 24px", borderTop: `1px solid ${C.border}`, textAlign: "center" }}>
              <div style={{ fontSize: 13, color: C.muted, marginBottom: 12 }}>Share this course</div>
              <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
                {["📸", "💼", "𝕏", "📘"].map(icon => (
                  <a key={icon} href="#" style={{ width: 36, height: 36, borderRadius: "50%", border: `1px solid ${C.border}`, display: "grid", placeItems: "center", textDecoration: "none", fontSize: 16 }}>{icon}</a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Right main ───────────────────────────────────── */}
        <div>
          {/* Course photo */}
          <div style={{ position: "relative", height: 340, borderRadius: 16, overflow: "hidden", marginBottom: 0 }}>
            <Image src={course.photo} alt={course.title} fill style={{ objectFit: "cover" }} unoptimized />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 50%, rgba(13,30,61,0.7) 100%)" }} />
            <span style={{ position: "absolute", bottom: 16, left: 16, fontSize: 32 }}>🇬🇧</span>
            <div style={{ position: "absolute", bottom: 16, right: 16, display: "flex", gap: 12 }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)" }}>Hours</div>
                <div style={{ fontSize: 16, fontWeight: 700 }}>{course.hours}</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)" }}>Lessons</div>
                <div style={{ fontSize: 16, fontWeight: 700 }}>{course.lessons}</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)" }}>Views</div>
                <div style={{ fontSize: 16, fontWeight: 700 }}>{course.views}</div>
              </div>
            </div>
          </div>

          {/* Gold bottom bar */}
          <div style={{ height: 6, background: C.gold, borderRadius: "0 0 4px 4px", marginBottom: 0 }} />

          {/* Tabs */}
          <div className="l-tab-bar" style={{ display: "flex", borderBottom: `1px solid ${C.border}`, marginBottom: 28 }}>
            {TABS.map(t => (
              <button key={t} onClick={() => setTab(t)} style={{
                padding: "14px 20px", background: "transparent", border: "none", color: tab === t ? C.gold : C.muted,
                borderBottom: tab === t ? `2px solid ${C.gold}` : "2px solid transparent",
                fontWeight: tab === t ? 700 : 500, fontSize: 14, cursor: "pointer", marginBottom: -1,
              }}>{t}</button>
            ))}
          </div>

          {/* ── Tab: Overview ── */}
          {tab === "Overview" && (
            <div>
              <h1 style={{ fontSize: 26, fontWeight: 800, margin: "0 0 12px" }}>{course.title}</h1>
              <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.75, margin: "0 0 24px" }}>{course.desc}</p>
              <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                {[
                  { label: "Duration", value: course.duration },
                  { label: "Hours",    value: String(course.hours) },
                  { label: "Lessons",  value: String(course.lessons) },
                  { label: "Rating",   value: `${course.rating} ★` },
                  { label: "Reviews",  value: String(course.reviews) },
                ].map(s => (
                  <div key={s.label} style={{ background: C.navyCard, border: `1px solid ${C.border}`, borderRadius: 10, padding: "12px 20px", textAlign: "center", minWidth: 90 }}>
                    <div style={{ fontSize: 18, fontWeight: 900, color: C.gold }}>{s.value}</div>
                    <div style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Tab: Appointments ── */}
          {tab === "Appointments" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {course.schedule.map((block, bi) => (
                <div key={bi} style={{ background: C.navyCard, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
                  <div style={{ padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${C.border}` }}>
                    <span style={{ fontWeight: 700, fontSize: 14 }}>{block.section}</span>
                    <span style={{ color: C.gold, fontSize: 16 }}>∧</span>
                  </div>
                  {block.days.map((d, di) => (
                    <div key={di} style={{ padding: "14px 20px", display: "flex", justifyContent: "space-between", borderBottom: di < block.days.length - 1 ? `1px solid ${C.border}` : "none" }}>
                      <span style={{ fontSize: 14, color: C.muted }}>{d.time}</span>
                      <span style={{ fontSize: 14, fontWeight: 600 }}>{d.day}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {/* ── Tab: Content ── */}
          {tab === "Content" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {course.content.map((block, bi) => (
                <div key={bi} style={{ background: C.navyCard, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden" }}>
                  <div style={{ padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${C.border}` }}>
                    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                      <span style={{ fontSize: 13, color: C.muted }}>🕐 {block.count} &nbsp; 📋 {block.items.length} lessons</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontWeight: 700, fontSize: 14 }}>{block.section}</span>
                      <span style={{ color: C.gold, fontSize: 16 }}>∧</span>
                    </div>
                  </div>
                  {block.items.map((item, ii) => (
                    <div key={ii} style={{ padding: "13px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: ii < block.items.length - 1 ? `1px solid ${C.border}` : "none" }}>
                      <span style={{ fontSize: 16, color: C.muted }}>🔒</span>
                      <span style={{ fontSize: 14, color: C.muted }}>{item}</span>
                      <span style={{ fontSize: 18, color: C.muted }}>▶</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {/* ── Tab: Evaluation ── */}
          {tab === "Evaluation" && (
            <div>
              {/* Rating summary */}
              <div className="l-eval-grid" style={{ background: C.navyCard, border: `1px solid ${C.border}`, borderRadius: 12, padding: "24px", marginBottom: 24 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {ratingBars.map(r => (
                    <div key={r.stars} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ display: "flex", gap: 2, flexShrink: 0 }}>
                        {[1,2,3,4,5].map(i => <span key={i} style={{ fontSize: 12, color: i <= r.stars ? C.gold : "rgba(255,255,255,0.15)" }}>★</span>)}
                      </div>
                      <div style={{ flex: 1, height: 6, borderRadius: 4, background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${r.pct}%`, background: r.pct > 10 ? C.gold : "#c9a200", borderRadius: 4 }} />
                      </div>
                      <span style={{ fontSize: 11, color: C.muted, width: 32, textAlign: "right" }}>{r.pct}%</span>
                    </div>
                  ))}
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 52, fontWeight: 900, color: C.gold, lineHeight: 1 }}>{course.rating}</div>
                  <Stars count={5} size={16} />
                  <div style={{ fontSize: 12, color: C.muted, marginTop: 6 }}>Course Rate</div>
                </div>
              </div>

              {/* Comments */}
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Student comments ({course.reviews})</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {course.studentReviews.map((r, i) => (
                  <div key={i} style={{ background: C.navyCard, borderRadius: 12, padding: "16px 20px", border: `1px solid ${C.border}`, display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: C.navyLight, border: `2px solid rgba(245,197,24,0.3)`, display: "grid", placeItems: "center", fontSize: 15, fontWeight: 700, flexShrink: 0 }}>
                      {r.name[0]}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                        <span style={{ fontWeight: 700, fontSize: 14 }}>{r.name}</span>
                        <span style={{ fontSize: 11, color: C.muted }}>{r.date}</span>
                      </div>
                      <Stars count={r.stars} size={13} />
                      <p style={{ fontSize: 13, color: C.muted, margin: "6px 0 0", lineHeight: 1.6 }}>{r.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* WhatsApp float */}
      <a href="https://wa.me/60123456789" target="_blank" rel="noopener noreferrer"
        style={{ position: "fixed", bottom: 24, left: 24, zIndex: 999, width: 54, height: 54, borderRadius: "50%", background: "#25d366", display: "grid", placeItems: "center", boxShadow: "0 4px 18px rgba(37,211,102,0.5)", textDecoration: "none" }}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

    </div>
  )
}
