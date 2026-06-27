"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

// ── Brand palette ──────────────────────────────────────────────
const C = {
  navy:      "#0d1e3d",
  navyMid:   "#142040",
  navyLight: "#1a2f5a",
  navyCard:  "#162448",
  gold:      "#f5c518",
  goldDark:  "#c9a200",
  white:     "#ffffff",
  muted:     "rgba(255,255,255,0.6)",
  border:    "rgba(255,255,255,0.08)",
  borderGold:"rgba(245,197,24,0.25)",
}

const courses = [
  {
    id: 1,
    title:    { en: "6-Month English Course",    zh: "6个月英语课程"  },
    desc:     { en: "Six months of English for adults",          zh: "成人英语6个月课程"   },
    duration: { en: "6 Months", zh: "6个月" },
    price:    "¥1,099",
    origPrice:"¥2,200",
    hours:    240, lessons: 120, views: "116,345",
    photo: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80",
  },
  {
    id: 2,
    title:    { en: "3-Month Intensive",         zh: "3个月强化课程"  },
    desc:     { en: "Three months of English language",          zh: "三个月英语语言课程"  },
    duration: { en: "3 Months", zh: "3个月" },
    price:    "¥699",
    origPrice:"¥1,400",
    hours:    120, lessons: 60, views: "52,438",
    photo: "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=600&q=80",
  },
  {
    id: 3,
    title:    { en: "2-Month English Course",    zh: "2个月英语课程"  },
    desc:     { en: "Two levels of English for adults",          zh: "成人两级英语课程"    },
    duration: { en: "2 Months", zh: "2个月" },
    price:    "¥499",
    origPrice:"¥1,000",
    hours:    80,  lessons: 40, views: "243,418",
    photo: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80",
  },
  {
    id: 4,
    title:    { en: "1-Month English Course",    zh: "1个月英语课程"  },
    desc:     { en: "One level of English language",             zh: "一个月英语基础课程"  },
    duration: { en: "1 Month", zh: "1个月" },
    price:    "¥299",
    origPrice:"¥600",
    hours:    40,  lessons: 20, views: "564,828",
    photo: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80",
  },
  {
    id: 5,
    title:    { en: "IELTS Speaking Prep",       zh: "雅思口语备考"   },
    desc:     { en: "Target 7.0+ in IELTS Speaking",             zh: "雅思口语目标7.0+"   },
    duration: { en: "2 Months", zh: "2个月" },
    price:    "¥599",
    origPrice:"¥1,200",
    hours:    80,  lessons: 40, views: "87,234",
    photo: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=600&q=80",
  },
  {
    id: 6,
    title:    { en: "Business English",          zh: "商务英语"       },
    desc:     { en: "Professional English for the workplace",    zh: "职场专业英语课程"   },
    duration: { en: "3 Months", zh: "3个月" },
    price:    "¥799",
    origPrice:"¥1,600",
    hours:    120, lessons: 60, views: "43,129",
    photo: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80",
  },
]

const reviews = [
  { name: "Li Wei",    date: "27/06/2026", stars: 5, comment: "Excellent teacher, very clear explanations!" },
  { name: "Zhang Min", date: "20/06/2026", stars: 5, comment: "My IELTS score jumped from 5.5 to 7.0. Highly recommend." },
  { name: "Wang Fang", date: "15/06/2026", stars: 5, comment: "The structured curriculum made a huge difference." },
  { name: "Chen Yu",   date: "10/06/2026", stars: 4, comment: "Great content. Very professional." },
  { name: "Liu Jing",  date: "05/06/2026", stars: 5, comment: "Very beautiful lessons, learned so much!" },
]

const content = {
  en: {
    nav: { home: "Home", courses: "Courses", about: "About", login: "Log in", signup: "Create account" },
    hero: {
      badge: "TESOL Certified · 15+ Years Experience",

      h1a: "Speak English",
      h1b: "with Confidence",
      sub:  "Live online classes designed for Chinese students. Expert teacher, structured curriculum, proven results.",
      cta1: "Start for free →",
      cta2: "Browse courses",
      stats: [
        { n: "12,847", l: "Students" },
        { n: "4.9★",   l: "Rating"   },
        { n: "6",      l: "Courses"  },
        { n: "15+",    l: "Yrs exp." },
      ],
    },
    offerBadge: "🔥 Limited time — 50% OFF all courses",
    coursesTitle: "Most Requested Courses",
    coursesSub:   "Choose the course that fits your level and schedule",
    enroll:  "Enroll now",
    reviewsTitle: "What students say",
    courseRate:   "Course Rate",
    ratingBars: [
      { stars: 5, pct: 87 },
      { stars: 4, pct: 10 },
      { stars: 3, pct: 3  },
      { stars: 2, pct: 0  },
      { stars: 1, pct: 0  },
    ],
    special: {
      title: "Not sure which course fits you?",
      sub:   "Fill out a quick form and we'll match you with the right level and schedule.",
      cta:   "Request a special course →",
    },
    footer: {
      tagline: "Building English confidence for Chinese students worldwide.",
      getApp:  "Get the app",
      contact: "Contact Us",
      links:   "Quick links",
      legal:   "Legal",
      copy:    "© 2025 SpeakSure. All rights reserved.",
    },
  },
  zh: {
    nav: { home: "首页", courses: "课程", about: "关于", login: "登录", signup: "创建账号" },
    hero: {
      badge: "TESOL认证 · 15年以上经验",
      h1a: "用英语",
      h1b: "自信表达",
      sub:  "专为中国学生设计的在线直播课。专业教师，结构化课程，真实成果。",
      cta1: "免费开始 →",
      cta2: "浏览课程",
      stats: [
        { n: "12,847", l: "学生"   },
        { n: "4.9★",   l: "评分"   },
        { n: "6",      l: "课程"   },
        { n: "15+",    l: "年经验" },
      ],
    },
    offerBadge: "🔥 限时优惠 — 全课程5折",
    coursesTitle: "最受欢迎的课程",
    coursesSub:   "选择适合您水平和时间表的课程",
    enroll:  "立即报名",
    reviewsTitle: "学生反馈",
    courseRate:   "课程评分",
    ratingBars: [
      { stars: 5, pct: 87 },
      { stars: 4, pct: 10 },
      { stars: 3, pct: 3  },
      { stars: 2, pct: 0  },
      { stars: 1, pct: 0  },
    ],
    special: {
      title: "不确定哪个课程适合您？",
      sub:   "填写快速表格，我们将为您匹配合适的水平和时间表。",
      cta:   "申请特别课程 →",
    },
    footer: {
      tagline: "帮助中国学生在全球舞台上自信表达。",
      getApp:  "下载应用",
      contact: "联系我们",
      links:   "快速链接",
      legal:   "法律",
      copy:    "© 2025 SpeakSure 版权所有",
    },
  },
}

function Stars({ count, size = 16 }: { count: number; size?: number }) {
  return (
    <span style={{ display: "inline-flex", gap: 2 }}>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ fontSize: size, color: i <= count ? C.gold : "rgba(255,255,255,0.2)" }}>★</span>
      ))}
    </span>
  )
}

export default function LandingPage() {
  const [lang, setLang] = useState<"en" | "zh">("en")
  const t = content[lang]

  return (
    <div style={{ background: C.navy, color: C.white, fontFamily: "'Segoe UI','PingFang SC',Arial,sans-serif", overflowX: "hidden" }}>
      <style>{`
        html, body { overflow-x: hidden; }
        .l-nav-links { display: flex; }
        .l-nav-login { display: flex; }
        .l-hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
        .l-hero-grid > * { min-width: 0; }
        .l-hero-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .l-courses-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(400px, 1fr)); gap: 20px; }
        .l-courses-grid > * { min-width: 0; }
        .l-reviews-grid { display: grid; grid-template-columns: 300px 1fr; gap: 48px; align-items: start; }
        .l-reviews-grid > * { min-width: 0; }
        @media (max-width: 768px) {
          .l-nav-links { display: none !important; }
          .l-nav-login a:first-child { display: none; }
          .l-hero-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .l-hero-cards { display: none !important; }
          .l-courses-grid { grid-template-columns: 1fr !important; }
          .l-reviews-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
        }
      `}</style>

      {/* ── Offer strip ─────────────────────────────────────── */}
      <div style={{ background: C.gold, color: C.navy, textAlign: "center", padding: "8px 16px", fontSize: 13, fontWeight: 700 }}>
        {t.offerBadge}
      </div>

      {/* ── Nav ─────────────────────────────────────────────── */}
      <nav style={{ background: C.navyMid, borderBottom: `1px solid ${C.border}`, position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <span style={{ width: 36, height: 36, borderRadius: 8, background: C.gold, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 900, color: C.navy, flexShrink: 0, lineHeight: 1 }}>S</span>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: C.white, lineHeight: 1.2 }}>SpeakSure</div>
              <div style={{ fontSize: 10, color: C.muted, lineHeight: 1.2 }}>English · 英语</div>
            </div>
          </Link>

          <div className="l-nav-links" style={{ gap: 24, alignItems: "center" }}>
            {[{ l: t.nav.home, h: "#" }, { l: t.nav.courses, h: "#courses" }].map(x => (
              <a key={x.l} href={x.h} style={{ fontSize: 13, color: C.muted, textDecoration: "none", fontWeight: 500, whiteSpace: "nowrap" }}>{x.l}</a>
            ))}
          </div>

          <div className="l-nav-login" style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            <button onClick={() => setLang(lang === "en" ? "zh" : "en")} style={{ background: "transparent", border: `1px solid ${C.border}`, color: C.white, borderRadius: 20, padding: "5px 12px", fontSize: 12, cursor: "pointer", fontWeight: 600 }}>
              🌐 {lang === "en" ? "中文" : "EN"}
            </button>
            <Link href="/login" style={{ padding: "7px 16px", borderRadius: 20, border: `1.5px solid ${C.border}`, color: C.white, fontWeight: 600, fontSize: 13, textDecoration: "none" }}>{t.nav.login}</Link>
            <Link href="/register" style={{ padding: "7px 16px", borderRadius: 20, background: C.gold, color: C.navy, fontWeight: 700, fontSize: 13, textDecoration: "none" }}>{t.nav.signup}</Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────────────────── */}
      <section style={{ background: `linear-gradient(135deg, ${C.navyMid} 0%, ${C.navyLight} 60%, ${C.navyMid} 100%)`, padding: "72px 20px 64px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -160, right: -160, width: 520, height: 520, borderRadius: "50%", background: "rgba(245,197,24,0.05)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -80, left: -80, width: 360, height: 360, borderRadius: "50%", background: "rgba(245,197,24,0.04)", pointerEvents: "none" }} />

        <div className="l-hero-grid" style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div>
            <span style={{ display: "inline-block", padding: "5px 14px", borderRadius: 20, background: "rgba(245,197,24,0.12)", color: C.gold, fontSize: 12, fontWeight: 700, marginBottom: 20, border: `1px solid ${C.borderGold}` }}>
              🎓 {t.hero.badge}
            </span>
            <h1 style={{ fontSize: "clamp(36px,4.5vw,60px)", fontWeight: 900, margin: "0 0 14px", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              {t.hero.h1a}<br />
              <span style={{ color: C.gold }}>{t.hero.h1b}</span>
            </h1>
            <p style={{ fontSize: 16, color: C.muted, margin: "0 0 36px", lineHeight: 1.75, maxWidth: 460 }}>{t.hero.sub}</p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 44 }}>
              <Link href="/register" style={{ padding: "13px 26px", borderRadius: 10, background: C.gold, color: C.navy, fontWeight: 700, fontSize: 15, textDecoration: "none", boxShadow: "0 4px 18px rgba(245,197,24,0.35)" }}>{t.hero.cta1}</Link>
              <a href="#courses" style={{ padding: "13px 26px", borderRadius: 10, border: `1.5px solid ${C.border}`, color: C.white, fontWeight: 600, fontSize: 15, textDecoration: "none" }}>{t.hero.cta2}</a>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", background: "rgba(255,255,255,0.04)", borderRadius: 14, border: `1px solid ${C.border}`, overflow: "hidden" }}>
              {t.hero.stats.map((s, i) => (
                <div key={i} style={{ padding: "16px 8px", textAlign: "center", borderRight: i < 3 ? `1px solid ${C.border}` : "none" }}>
                  <div style={{ fontSize: 20, fontWeight: 900, color: C.gold }}>{s.n}</div>
                  <div style={{ fontSize: 10, color: C.muted, marginTop: 4 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 2x2 preview cards */}
          <div className="l-hero-cards">
            {courses.slice(0, 2).map((c, i) => (
              <div key={i} style={{ background: C.navyCard, border: `1px solid ${C.border}`, borderRadius: 14, overflow: "hidden" }}>
                <div style={{ position: "relative", height: 110 }}>
                  <Image src={c.photo} alt={c.title.en} fill style={{ objectFit: "cover", opacity: 0.75 }} unoptimized />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(13,30,61,0.2) 0%, rgba(13,30,61,0.8) 100%)" }} />
                  <span style={{ position: "absolute", top: 8, right: 8, background: C.gold, color: C.navy, fontSize: 9, fontWeight: 800, padding: "3px 8px", borderRadius: 20 }}>{c.duration[lang]}</span>
                </div>
                <div style={{ padding: "10px 12px" }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: C.white, marginBottom: 4, lineHeight: 1.3 }}>{c.title[lang]}</div>
                  <div style={{ fontSize: 10, color: C.muted, textDecoration: "line-through" }}>{c.origPrice}</div>
                  <div style={{ fontSize: 18, fontWeight: 900, color: C.gold }}>{c.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Courses ─────────────────────────────────────────── */}
      <section id="courses" style={{ padding: "72px 20px", background: C.navy }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, margin: "0 0 8px", textAlign: "center" }}>{t.coursesTitle}</h2>
          <p style={{ fontSize: 15, color: C.muted, textAlign: "center", margin: "0 0 44px" }}>{t.coursesSub}</p>

          <div className="l-courses-grid">
            {courses.slice(0, 2).map(c => (
              <Link key={c.id} href={`/courses/${c.id}`} style={{ textDecoration: "none", display: "flex", flexDirection: "column", background: C.navyCard, borderRadius: 16, overflow: "hidden", border: `1px solid ${C.border}` }}>
                {/* Photo */}
                <div style={{ position: "relative", height: 200 }}>
                  <Image src={c.photo} alt={c.title.en} fill style={{ objectFit: "cover" }} unoptimized />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 55%, rgba(0,0,0,0.5) 100%)" }} />
                  <span style={{ position: "absolute", top: 12, right: 12, background: C.gold, color: C.navy, fontSize: 11, fontWeight: 800, padding: "4px 12px", borderRadius: 20 }}>
                    {c.duration[lang]}
                  </span>
                  <span style={{ position: "absolute", bottom: 10, left: 12, fontSize: 22 }}>🇬🇧</span>
                </div>

                <div style={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: C.white, margin: 0, lineHeight: 1.3 }}>{c.title[lang]}</h3>
                  <p style={{ fontSize: 12, color: C.muted, margin: 0, lineHeight: 1.6 }}>{c.desc[lang]}</p>

                  <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginTop: "auto" }}>
                    <div>
                      <div style={{ fontSize: 11, color: C.muted, textDecoration: "line-through" }}>{c.origPrice}</div>
                      <div style={{ fontSize: 26, fontWeight: 900, color: C.gold, lineHeight: 1.1 }}>{c.price}</div>
                    </div>
                    <span style={{ padding: "9px 18px", borderRadius: 10, background: C.gold, color: C.navy, fontWeight: 700, fontSize: 12 }}>
                      {t.enroll}
                    </span>
                  </div>

                  {/* Hours / Lessons / Views — exactly like Tfaseel */}
                  <div style={{ display: "flex", gap: 14, paddingTop: 12, borderTop: `1px solid ${C.border}` }}>
                    <span style={{ fontSize: 11, color: C.muted, display: "flex", alignItems: "center", gap: 4 }}>
                      🕐 {c.hours}
                    </span>
                    <span style={{ fontSize: 11, color: C.muted, display: "flex", alignItems: "center", gap: 4 }}>
                      📖 {c.lessons} {lang === "en" ? "lessons" : "课"}
                    </span>
                    <span style={{ fontSize: 11, color: C.muted, display: "flex", alignItems: "center", gap: 4 }}>
                      👁 {c.views}
                    </span>
                  </div>
                </div>
            </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reviews ─────────────────────────────────────────── */}
      <section style={{ padding: "72px 20px", background: "#0a1830" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, margin: "0 0 40px", textAlign: "center" }}>{t.reviewsTitle}</h2>

          <div className="l-reviews-grid">
            {/* Rating summary panel */}
            <div style={{ background: C.navyCard, borderRadius: 16, padding: "28px", border: `1px solid ${C.border}` }}>
              <div style={{ textAlign: "center", marginBottom: 24 }}>
                <div style={{ fontSize: 52, fontWeight: 900, color: C.gold, lineHeight: 1 }}>4.9</div>
                <Stars count={5} size={18} />
                <div style={{ fontSize: 12, color: C.muted, marginTop: 6 }}>{t.courseRate}</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {t.ratingBars.map(r => (
                  <div key={r.stars} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ display: "flex", gap: 2, flexShrink: 0 }}>
                      {[1,2,3,4,5].map(i => <span key={i} style={{ fontSize: 11, color: i <= r.stars ? C.gold : "rgba(255,255,255,0.15)" }}>★</span>)}
                    </div>
                    <div style={{ flex: 1, height: 6, borderRadius: 4, background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${r.pct}%`, background: C.gold, borderRadius: 4 }} />
                    </div>
                    <span style={{ fontSize: 11, color: C.muted, width: 36, textAlign: "right" }}>{r.pct}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Comment cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {reviews.map((r, i) => (
                <div key={i} style={{ background: C.navyCard, borderRadius: 14, padding: "18px 20px", border: `1px solid ${C.border}`, display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <div style={{ width: 42, height: 42, borderRadius: "50%", background: C.navyLight, border: `2px solid ${C.borderGold}`, display: "grid", placeItems: "center", fontSize: 16, flexShrink: 0, fontWeight: 700 }}>
                    {r.name[0]}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
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
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────── */}
      <footer style={{ background: "#07112a", borderTop: `1px solid ${C.border}`, padding: "48px 20px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 40, marginBottom: 44 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                <span style={{ width: 32, height: 32, borderRadius: 8, background: C.gold, display: "grid", placeItems: "center", fontSize: 15, fontWeight: 900, color: C.navy }}>S</span>
                <strong style={{ fontSize: 15, color: C.white }}>SpeakSure</strong>
              </div>
              <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.7, margin: 0 }}>{t.footer.tagline}</p>
            </div>


            <div>
              <strong style={{ fontSize: 13, color: C.white, display: "block", marginBottom: 16 }}>{t.footer.contact}</strong>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <a href="https://wa.me/60123456789" style={{ fontSize: 13, color: C.muted, textDecoration: "none" }}>📱 WhatsApp</a>
                <a href="mailto:hello@speaksure.app" style={{ fontSize: 13, color: C.muted, textDecoration: "none" }}>✉️ hello@speaksure.app</a>
              </div>
            </div>

            <div>
              <strong style={{ fontSize: 13, color: C.white, display: "block", marginBottom: 16 }}>{t.footer.links}</strong>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[t.nav.home, t.nav.courses].map(l => (
                  <a key={l} href="#" style={{ fontSize: 13, color: C.muted, textDecoration: "none" }}>{l}</a>
                ))}
              </div>
            </div>

            <div>
              <strong style={{ fontSize: 13, color: C.white, display: "block", marginBottom: 16 }}>{t.footer.legal}</strong>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {["Privacy Policy", "Terms & Conditions", "Refund Policy"].map(l => (
                  <a key={l} href="#" style={{ fontSize: 13, color: C.muted, textDecoration: "none" }}>{l}</a>
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 24, borderTop: `1px solid ${C.border}`, flexWrap: "wrap", gap: 16 }}>
            <p style={{ fontSize: 12, color: C.muted, margin: 0 }}>{t.footer.copy}</p>
            <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
              {["📱 Touch 'n Go"].map(p => (
                <span key={p} style={{ fontSize: 11, color: C.muted, padding: "4px 10px", border: `1px solid ${C.border}`, borderRadius: 6 }}>{p}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ── WhatsApp float (bottom left like Tfaseel) ────────── */}
      <a href="https://wa.me/60123456789" target="_blank" rel="noopener noreferrer"
        style={{ position: "fixed", bottom: 24, left: 24, zIndex: 999, width: 54, height: 54, borderRadius: "50%", background: "#25d366", display: "grid", placeItems: "center", boxShadow: "0 4px 18px rgba(37,211,102,0.5)", textDecoration: "none" }}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

    </div>
  )
}
