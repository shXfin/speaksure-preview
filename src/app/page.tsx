"use client"

import Link from "next/link"
import { useState } from "react"

const m3 = {
  primary: "#6750a4",
  primarySoft: "#eaddff",
  bg: "#fffbfe",
  surface: "#f8f2f9",
  text: "#1d1b20",
  muted: "#625b71",
  border: "#e8e0ef",
}

const content = {
  en: {
    tagline: "English classes for Chinese students",
    eyebrow: "🎓 Live English · Native Teachers",
    h1a: "Speak English",
    h1b: "with confidence",
    sub: "Live classes designed for Chinese students",
    enrolled: (n: string) => <><strong style={{ fontSize: 20 }}>{n}</strong> students already enrolled</>,
    cta1: "Start for free →",
    cta2: "See how it works",
    badges: ["⭐ 4.9/5 rating", "📚 6 live courses", "🎓 Native teachers", "✅ Free first lesson"],
    howLabel: "HOW IT WORKS",
    howTitle: "Three steps to fluency",
    steps: [
      { step: "01", icon: "🎥", title: "Join a live class", desc: "Connect with native teachers in real-time video sessions.", stat: "avg. 2x/week" },
      { step: "02", icon: "🎙️", title: "Practice speaking", desc: "Complete 60-second voice tasks designed for Chinese students.", stat: "60-sec voice tasks" },
      { step: "03", icon: "✏️", title: "Get teacher feedback", desc: "Receive personalised corrections on pronunciation and fluency.", stat: "returned within 24hrs" },
    ],
    coursesLabel: "UPCOMING CLASSES",
    coursesTitle: "Find your course",
    viewLessons: "View lessons",
    teachersLabel: "MEET THE TEACHERS",
    teachersTitle: "Learn from the experts",
    teacherPhoto: "Teacher Photo",
    testiLabel: "STUDENT SUCCESS",
    testiTitle: "Real results, real students",
    pricingLabel: "PRICING",
    pricingTitle: "Simple, transparent pricing",
    planName: "SpeakSure Pro",
    originalPrice: "¥1,200/mo",
    price: "¥899",
    pricePer: "/mo",
    perks: ["Unlimited live group sessions", "Personalised weekly feedback", "Business & IELTS specialised modules", "Community access & networking"],
    pricingCta: "Free first lesson →",
    guarantee: "7-day money-back guarantee. No questions asked.",
    footerTagline: "Building English confidence for Chinese students worldwide.",
    links: "Links",
    legal: "Legal",
    copyright: "© 2024 SpeakSure. All rights reserved.",
    login: "Log In",
    signup: "Sign Up",
  },
  zh: {
    tagline: "专为中国学生设计的英语口语课堂",
    eyebrow: "🎓 直播英语课 · 专业外籍教师",
    h1a: "用英语",
    h1b: "自信表达",
    sub: "专为中国学生量身打造的直播口语课",
    enrolled: (n: string) => <>已有 <strong style={{ fontSize: 20 }}>{n}</strong> 名学生加入</>,
    cta1: "免费开始 →",
    cta2: "了解更多",
    badges: ["⭐ 4.9分好评", "📚 6门直播课", "🎓 外籍教师", "✅ 第一课免费"],
    howLabel: "课程流程",
    howTitle: "三步提升英语流利度",
    steps: [
      { step: "01", icon: "🎥", title: "加入直播课", desc: "与外籍教师进行实时视频互动学习。", stat: "平均每周2次" },
      { step: "02", icon: "🎙️", title: "开口练习", desc: "完成专为中国学生设计的60秒语音任务。", stat: "60秒语音练习" },
      { step: "03", icon: "✏️", title: "获得老师反馈", desc: "收到发音和流利度的个性化纠正建议。", stat: "24小时内返回" },
    ],
    coursesLabel: "即将开课",
    coursesTitle: "选择你的课程",
    viewLessons: "查看课程",
    teachersLabel: "认识老师",
    teachersTitle: "向专家学习",
    teacherPhoto: "教师照片",
    testiLabel: "学生成果",
    testiTitle: "真实成果，真实学生",
    pricingLabel: "课程定价",
    pricingTitle: "简单透明，无隐藏费用",
    planName: "SpeakSure 专业版",
    originalPrice: "¥1,200/月",
    price: "¥899",
    pricePer: "/月",
    perks: ["无限次小班直播课", "每周个性化反馈", "商务英语 & 雅思专项模块", "学员社群 & 人脉资源"],
    pricingCta: "免费体验第一课 →",
    guarantee: "7天无理由退款，无需任何理由。",
    footerTagline: "帮助中国学生在全球舞台上自信表达。",
    links: "链接",
    legal: "法律",
    copyright: "© 2024 SpeakSure 版权所有",
    login: "登录",
    signup: "立即注册",
  },
}

const courses = [
  { title: { en: "Business English", zh: "商务英语" }, teacher: "Maya Chen", credential: { en: "CELTA Certified · 8 yrs", zh: "CELTA认证 · 8年经验" }, banner: "#4f378b", students: "3,241" },
  { title: { en: "IELTS Speaking Prep", zh: "雅思口语备考" }, teacher: "Sophia Miller", credential: { en: "IELTS Examiner · 12 yrs", zh: "雅思考官 · 12年经验" }, banner: "#633b48", students: "5,108" },
  { title: { en: "Spoken English Fluency", zh: "英语口语流利度" }, teacher: "Daniel Brooks", credential: { en: "MA TESOL · 5 yrs", zh: "TESOL硕士 · 5年经验" }, banner: "#4a4458", students: "4,492" },
]

// Adnan's credentials from resume
const adnan = {
  tags: {
    en: ["TESOL Certified", "15+ years teaching", "Native English", "Canadian"],
    zh: ["TESOL认证", "15年以上教学经验", "英语母语者", "加拿大籍"],
  },
  bio: {
    en: "Adnan grew up across four continents — Canada, Uganda, Malaysia, and Vietnam — which gives him a rare ability to understand exactly where Chinese students get stuck in English. He's not just a teacher; he ran Mindset Academy in Kuala Lumpur, trained IELTS students for immigration to Canada and the UK, and lectured at Perdana University on academic writing. His students don't just pass exams — they actually start speaking.",
    zh: "Adnan在四大洲长大——加拿大、乌干达、马来西亚和越南——这让他具备了罕见的能力，能够准确理解中国学生在英语学习中的困难所在。他不仅是一位老师，还在吉隆坡经营Mindset Academy，为移民加拿大和英国的学生提供雅思培训，并在博大大学担任学术写作讲师。他的学生不只是通过考试——他们真正开口说话了。",
  },
  facts: {
    en: [
      { icon: "🌍", text: "Lived in Canada, Uganda, Malaysia & Vietnam" },
      { icon: "🎓", text: "TESOL · ELS Language Center, Kuala Lumpur" },
      { icon: "🏫", text: "Managing Director, Mindset Academy KL" },
      { icon: "📖", text: "Guest Lecturer, Perdana University" },
      { icon: "🗣️", text: "English · French · Hindi · Urdu · Bengali" },
    ],
    zh: [
      { icon: "🌍", text: "曾居住于加拿大、乌干达、马来西亚和越南" },
      { icon: "🎓", text: "TESOL认证 · 吉隆坡ELS语言中心" },
      { icon: "🏫", text: "Mindset Academy吉隆坡总监" },
      { icon: "📖", text: "博大大学客座讲师" },
      { icon: "🗣️", text: "英语·法语·印地语·乌尔都语·孟加拉语" },
    ],
  },
}

const testimonials = [
  { quote: { en: "My confidence at work doubled in 3 months. The teachers really understand the challenges Chinese students face.", zh: "3个月后，我在工作中的英语自信翻倍了。老师们真正理解中国学生的挑战。" }, result: "从零基础到职场流利 · 3个月", name: "Wei", city: { en: "Shanghai", zh: "上海" } },
  { quote: { en: "Structured feedback helped me fix errors I had been making for years. Highly professional.", zh: "系统性的反馈帮我改正了多年的错误习惯，非常专业。" }, result: "雅思口语从5.5提升到7.0", name: "Jing", city: { en: "Beijing", zh: "北京" } },
  { quote: { en: "I passed IELTS with 7.5. The preparation strategy for Chinese students is unmatched.", zh: "我雅思考了7.5分。针对中国学生的备考策略无可比拟。" }, result: "雅思7.5 · 备考8周", name: "Hao", city: { en: "Chengdu", zh: "成都" } },
]

export default function LandingPage() {
  const [lang, setLang] = useState<"en" | "zh">("en")
  const t = content[lang]

  return (
    <div style={{ background: m3.bg, color: m3.text, fontFamily: "'Roboto', 'PingFang SC', Arial, sans-serif", minWidth: 320 }}>

      {/* Topbar */}
      <nav className="l-nav" style={{
        position: "sticky", top: 0, zIndex: 100,
        height: 64, display: "flex", alignItems: "center",
        background: "#fff",
        borderBottom: `1px solid ${m3.border}`,
        boxShadow: "0 1px 3px rgba(0,0,0,0.07)",
        justifyContent: "space-between", gap: 16,
      }}>
        {/* Brand */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "inherit", flexShrink: 0 }}>
          <span style={{
            display: "grid", placeItems: "center",
            width: 46, height: 46, borderRadius: 12,
            background: m3.primary, color: "#fff",
            fontSize: 20, fontWeight: 900, flexShrink: 0,
          }}>S</span>
          <span className="l-nav-tagline">
            <strong style={{ fontSize: 18, fontWeight: 700, color: m3.text }}>SpeakSure</strong>
            <small style={{ fontSize: 11, color: m3.muted, marginTop: 3 }}>{t.tagline}</small>
          </span>
        </Link>

        {/* Right actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {/* Language toggle */}
          <button
            onClick={() => setLang(lang === "en" ? "zh" : "en")}
            style={{
              display: "flex", alignItems: "center", gap: 4,
              padding: "7px 12px", borderRadius: 20,
              border: `1.5px solid ${m3.border}`,
              background: "transparent", cursor: "pointer",
              fontSize: 13, fontWeight: 600, color: m3.muted,
              whiteSpace: "nowrap",
            }}
          >
            🌐 <span className="l-lang-label">{lang === "en" ? "中文" : "English"}</span>
            <span style={{ fontSize: 12 }}>{lang === "en" ? "中文" : "EN"}</span>
          </button>
          <Link className="l-nav-login" href="/login" style={{
            padding: "8px 18px", borderRadius: 20,
            border: `2px solid ${m3.primary}`, color: m3.primary,
            fontWeight: 600, fontSize: 14, textDecoration: "none",
            whiteSpace: "nowrap",
          }}>{t.login}</Link>
          <Link href="/register" style={{
            padding: "8px 18px", borderRadius: 20,
            background: m3.primary, color: "#fff",
            fontWeight: 600, fontSize: 14, textDecoration: "none",
            whiteSpace: "nowrap",
          }}>{t.signup}</Link>
        </div>
      </nav>

      {/* Hero — 2 column */}
      <section className="l-pad hero-glow" style={{ background: "#fff" }}>
        <div className="l-hero">

          {/* Left */}
          <div>
            <span style={{
              display: "inline-block", padding: "5px 16px", borderRadius: 20,
              background: m3.primarySoft, color: m3.primary,
              fontSize: 13, fontWeight: 600, marginBottom: 24,
            }}>{t.eyebrow}</span>

            <h1 style={{
              fontSize: "clamp(38px, 4vw, 58px)", fontWeight: 900,
              color: m3.text, margin: "0 0 16px",
              lineHeight: 1.1, letterSpacing: "-0.03em",
            }}>
              {t.h1a}<br />
              <span style={{ color: m3.primary }}>{t.h1b}</span>
            </h1>

            <p style={{ fontSize: 17, color: m3.muted, margin: "0 0 8px", lineHeight: 1.6 }}>
              {t.sub}
            </p>
            <p style={{ fontSize: 15, fontWeight: 700, color: m3.primary, margin: "0 0 32px" }}>
              {t.enrolled("12,847")}
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 36 }}>
              <Link href="/register" style={{
                padding: "14px 28px", borderRadius: 20,
                background: m3.primary, color: "#fff",
                fontWeight: 700, fontSize: 15, textDecoration: "none",
                boxShadow: "0 4px 16px rgba(103,80,164,0.3)",
              }}>{t.cta1}</Link>
              <a href="#how-it-works" style={{
                padding: "14px 28px", borderRadius: 20,
                border: `2px solid ${m3.border}`, color: m3.muted,
                fontWeight: 600, fontSize: 15, textDecoration: "none",
              }}>{t.cta2}</a>
            </div>

            <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
              {t.badges.map(b => (
                <span key={b} style={{ fontSize: 13, color: m3.muted, fontWeight: 500 }}>{b}</span>
              ))}
            </div>
          </div>

          {/* Right — product preview card */}
          <div style={{ position: "relative" }}>
            {/* Main course card preview */}
            <div style={{
              borderRadius: 20, overflow: "hidden",
              border: `1px solid ${m3.border}`,
              background: "#fff",
              boxShadow: "0 16px 48px rgba(103,80,164,0.12)",
            }}>
              {/* Banner */}
              <div style={{
                height: 110, background: "#4f378b",
                display: "flex", flexDirection: "column",
                justifyContent: "flex-end", padding: "0 20px 14px",
              }}>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", fontWeight: 500, marginBottom: 4 }}>BUSINESS ENGLISH · BIZ-204</span>
                <span style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>Client update meeting</span>
              </div>
              {/* Card body */}
              <div style={{ padding: "20px 20px 8px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                  <span style={{
                    width: 36, height: 36, borderRadius: "50%",
                    background: m3.primary, color: "#fff",
                    display: "grid", placeItems: "center",
                    fontSize: 15, fontWeight: 700, flexShrink: 0,
                  }}>M</span>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 700, margin: 0, color: m3.text }}>Maya Chen</p>
                    <p style={{ fontSize: 11, color: m3.muted, margin: 0 }}>CELTA Certified · 8 years</p>
                  </div>
                  <span style={{
                    marginLeft: "auto", fontSize: 11, fontWeight: 600,
                    padding: "4px 10px", borderRadius: 99,
                    background: "#e8f5e9", color: "#2e7d32",
                  }}>● Live now</span>
                </div>
                {/* Tasks */}
                {[
                  { label: "Meeting phrases", tag: "Material" },
                  { label: "Voice task — project update", tag: "Due Friday" },
                  { label: "Email correction lab", tag: "Returned ✓" },
                ].map(task => (
                  <div key={task.label} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "10px 0", borderTop: `1px solid ${m3.border}`,
                  }}>
                    <span style={{ fontSize: 13, color: m3.text, fontWeight: 500 }}>{task.label}</span>
                    <span style={{
                      fontSize: 12, fontWeight: 600, padding: "4px 10px", borderRadius: 99,
                      whiteSpace: "nowrap",
                      background: task.tag.startsWith("Due") ? "#fff3e0" : task.tag.startsWith("Returned") ? "#e8f5e9" : m3.primarySoft,
                      color:      task.tag.startsWith("Due") ? "#bf6200" : task.tag.startsWith("Returned") ? "#2e7d32" : m3.primary,
                    }}>{task.tag}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating stat strip below card */}
            <div style={{
              marginTop: 16, borderRadius: 16,
              background: "#fff", border: `1px solid ${m3.border}`,
              padding: "14px 20px",
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              {[
                { num: "12,847", label: lang === "en" ? "students" : "名学生" },
                { num: "4.9★", label: lang === "en" ? "rating" : "评分" },
                { num: "6", label: lang === "en" ? "courses" : "门课程" },
              ].map((s, i) => (
                <div key={i} style={{ textAlign: "center", flex: 1, borderRight: i < 2 ? `1px solid ${m3.border}` : "none" }}>
                  <p style={{ fontSize: 18, fontWeight: 800, margin: 0, color: m3.primary }}>{s.num}</p>
                  <p style={{ fontSize: 11, margin: 0, color: m3.muted }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="l-pad" style={{ background: m3.surface }}>
        <div className="l-section">
          <p style={{ textAlign: "center", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: m3.muted, textTransform: "uppercase", marginBottom: 10 }}>{t.howLabel}</p>
          <h2 style={{ textAlign: "center", fontSize: 34, fontWeight: 800, margin: "0 0 52px", color: m3.text }}>{t.howTitle}</h2>
          <div className="l-3col">
            {t.steps.map(s => (
              <div key={s.step} style={{ background: "#fff", borderRadius: 20, padding: 32, border: `1px solid ${m3.border}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                  <span style={{
                    width: 36, height: 36, borderRadius: "50%",
                    background: m3.primary, color: "#fff",
                    display: "grid", placeItems: "center",
                    fontSize: 14, fontWeight: 800, flexShrink: 0,
                  }}>{s.step}</span>
                  <div style={{ fontSize: 28 }}>{s.icon}</div>
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 10px", color: m3.text }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: m3.muted, margin: "0 0 20px", lineHeight: 1.7 }}>{s.desc}</p>
                <span style={{
                  display: "inline-block", padding: "5px 14px", borderRadius: 12,
                  background: m3.primarySoft, color: m3.primary,
                  fontSize: 12, fontWeight: 600,
                }}>{s.stat}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats — editorial layout */}
      <section className="l-pad" style={{ background: "#fff" }}>
        <div className="l-section">
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: m3.muted, textTransform: "uppercase", marginBottom: 10 }}>
            {lang === "en" ? "BY THE NUMBERS" : "数据说话"}
          </p>
          <h2 style={{ fontSize: 34, fontWeight: 800, margin: "0 0 8px", color: m3.text, maxWidth: 560 }}>
            {lang === "en" ? "Speaking practice is what actually moves the needle" : "口语练习才是真正改变的关键"}
          </h2>
          <p style={{ fontSize: 15, color: m3.muted, margin: "0 0 48px", maxWidth: 520, lineHeight: 1.7 }}>
            {lang === "en"
              ? "Most students have studied English for years. The gap isn't grammar — it's never having enough real conversation practice."
              : "大多数学生已经学了多年英语。差距不在语法，而在于缺乏足够的真实对话练习。"}
          </p>

          {/* Editorial stat strip */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1px 1fr 1px 1fr",
            gap: 0, marginBottom: 48,
            background: m3.surface, borderRadius: 20,
            border: `1px solid ${m3.border}`, overflow: "hidden",
          }}>
            {[
              { num: "500M+", label: lang === "en" ? "Chinese students learning English right now" : "中国英语学习者", source: lang === "en" ? "Ministry of Education, 2023" : "中国教育部, 2023" },
              null,
              { num: "3×", label: lang === "en" ? "faster progress with live speaking vs. self-study apps" : "相比自学应用快3倍", source: lang === "en" ? "Cambridge English Research, 2022" : "剑桥英语研究, 2022" },
              null,
              { num: "78%", label: lang === "en" ? "of our students speak with confidence within 90 days" : "学员在90天内开口自信表达", source: lang === "en" ? "SpeakSure student survey, 2024" : "SpeakSure学员调查, 2024" },
            ].map((s, i) =>
              s === null
                ? <div key={i} style={{ background: m3.border }} />
                : <div key={i} style={{ padding: "36px 32px" }}>
                    <p style={{ fontSize: 48, fontWeight: 900, color: m3.primary, margin: "0 0 8px", letterSpacing: "-0.03em", lineHeight: 1 }}>{s.num}</p>
                    <p style={{ fontSize: 14, color: m3.text, margin: "0 0 10px", lineHeight: 1.5, fontWeight: 500 }}>{s.label}</p>
                    <p style={{ fontSize: 11, color: m3.muted, margin: 0 }}>{s.source}</p>
                  </div>
            )}
          </div>

          {/* Progress — cleaner, two-column layout */}
          <div className="l-impact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <div>
              <p style={{ fontSize: 16, fontWeight: 700, color: m3.text, margin: "0 0 6px" }}>
                {lang === "en" ? "Where students improve most" : "学员提升最明显的方面"}
              </p>
              <p style={{ fontSize: 13, color: m3.muted, margin: "0 0 28px", lineHeight: 1.6 }}>
                {lang === "en" ? "Self-reported after 3 months of weekly classes." : "每周上课3个月后的自我评估。"}
              </p>
              {[
                { label: lang === "en" ? "Speaking confidence" : "口语自信", before: 28, after: 84 },
                { label: lang === "en" ? "Pronunciation" : "发音准确度", before: 41, after: 79 },
                { label: lang === "en" ? "Vocabulary in use" : "实际词汇量", before: 35, after: 72 },
                { label: lang === "en" ? "Presentation readiness" : "演讲准备度", before: 22, after: 76 },
              ].map(bar => (
                <div key={bar.label} style={{ marginBottom: 18 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: 13, color: m3.text }}>{bar.label}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: m3.primary }}>{bar.after}%</span>
                  </div>
                  <div style={{ height: 8, borderRadius: 8, background: m3.border, position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${bar.before}%`, background: "#ddd8e8", borderRadius: 8 }} />
                    <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${bar.after}%`, background: m3.primary, borderRadius: 8, opacity: 0.9 }} />
                  </div>
                </div>
              ))}
              <div style={{ display: "flex", gap: 20, marginTop: 12 }}>
                <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: m3.muted }}>
                  <span style={{ width: 10, height: 10, borderRadius: 2, background: "#ddd8e8", display: "inline-block" }} />
                  {lang === "en" ? "Before" : "加入前"}
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: m3.muted }}>
                  <span style={{ width: 10, height: 10, borderRadius: 2, background: m3.primary, display: "inline-block" }} />
                  {lang === "en" ? "After 3 months" : "3个月后"}
                </span>
              </div>
            </div>
            {/* Right — pull quote */}
            <div style={{
              background: m3.primary, borderRadius: 20, padding: "36px 32px",
              display: "flex", flexDirection: "column", justifyContent: "space-between",
            }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.6)", margin: "0 0 20px", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                {lang === "en" ? "Head Teacher" : "首席教师"}
              </p>
              <p style={{ fontSize: 18, color: "#fff", lineHeight: 1.7, margin: "0 0 32px", fontStyle: "italic" }}>
                {lang === "en"
                  ? '"Most Chinese students already know a lot of English. What holds them back is the fear of speaking. Once you remove that — everything else follows."'
                  : '"大多数中国学生已经掌握了很多英语知识。阻碍他们的是开口说话的恐惧。一旦克服了这一点，其他一切都会随之而来。"'}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{
                  width: 44, height: 44, borderRadius: "50%",
                  background: "rgba(255,255,255,0.2)", color: "#fff",
                  display: "grid", placeItems: "center",
                  fontSize: 18, fontWeight: 700,
                }}>A</span>
                <div>
                  <p style={{ fontWeight: 700, fontSize: 14, margin: 0, color: "#fff" }}>Adnan Kalam</p>
                  <p style={{ fontSize: 12, margin: 0, color: "rgba(255,255,255,0.7)" }}>
                    {lang === "en" ? "TESOL Certified · 15+ years · Mindset Academy KL" : "TESOL认证 · 15年以上 · 吉隆坡Mindset Academy"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Cards */}
      <section className="l-pad" style={{ background: m3.surface }}>
        <div className="l-section">
          <p style={{ textAlign: "center", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: m3.muted, textTransform: "uppercase", marginBottom: 10 }}>{t.coursesLabel}</p>
          <h2 style={{ textAlign: "center", fontSize: 34, fontWeight: 800, margin: "0 0 52px", color: m3.text }}>{t.coursesTitle}</h2>
          <div className="l-3col">
            {courses.map(c => (
              <div key={c.title.en} style={{ borderRadius: 20, overflow: "hidden", border: `1px solid ${m3.border}`, background: "#fff", transition: "box-shadow 0.2s" }}>
                <div style={{
                  height: 100, background: c.banner,
                  display: "flex", alignItems: "flex-end", padding: "0 20px 14px",
                  position: "relative",
                }}>
                  <span style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>{c.title[lang]}</span>
                  <span style={{
                    position: "absolute", top: 14, right: 14,
                    background: "rgba(255,255,255,0.18)", color: "#fff",
                    fontSize: 11, padding: "3px 10px", borderRadius: 10, fontWeight: 600,
                    backdropFilter: "blur(4px)",
                  }}>🔴 Live</span>
                </div>
                <div style={{ padding: "18px 20px" }}>
                  <p style={{ fontSize: 15, fontWeight: 700, color: m3.text, margin: "0 0 4px" }}>{c.teacher}</p>
                  <p style={{ fontSize: 12, color: m3.muted, margin: "0 0 16px" }}>{c.credential[lang]}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 12, color: m3.muted }}>👥 {c.students}</span>
                    <Link href="/register" style={{
                      padding: "7px 18px", borderRadius: 14,
                      background: m3.primarySoft, color: m3.primary,
                      fontSize: 13, fontWeight: 600, textDecoration: "none",
                    }}>{t.viewLessons}</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teacher — Adnan Kalam full profile */}
      <section className="l-pad" style={{ background: m3.surface }}>
        <div className="l-section">
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: m3.muted, textTransform: "uppercase", marginBottom: 10 }}>
            {lang === "en" ? "YOUR TEACHER" : "你的老师"}
          </p>
          <h2 style={{ fontSize: 34, fontWeight: 800, margin: "0 0 40px", color: m3.text }}>
            {lang === "en" ? "One teacher. Fully committed." : "专注一位老师，全力投入。"}
          </h2>

          <div className="l-impact-grid" style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: 40, alignItems: "start" }}>

            {/* Left — photo + tags */}
            <div>
              <div style={{
                borderRadius: 20, overflow: "hidden",
                border: `2px solid ${m3.primary}`,
                marginBottom: 20,
                boxShadow: "0 8px 32px rgba(103,80,164,0.15)",
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/adnan.jpg"
                  alt="Adnan Kalam"
                  style={{ width: "100%", display: "block", aspectRatio: "4/5", objectFit: "cover" }}
                />
                <div style={{ background: m3.primary, padding: "16px 20px" }}>
                  <p style={{ fontSize: 18, fontWeight: 800, color: "#fff", margin: "0 0 2px" }}>Adnan Rushdi Kalam</p>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", margin: 0 }}>
                    {lang === "en" ? "Head Teacher · SpeakSure" : "首席教师 · SpeakSure"}
                  </p>
                </div>
              </div>

              {/* Credential tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {adnan.tags[lang].map(tag => (
                  <span key={tag} style={{
                    padding: "6px 14px", borderRadius: 99,
                    background: m3.primarySoft, color: m3.primary,
                    fontSize: 12, fontWeight: 600,
                  }}>{tag}</span>
                ))}
              </div>
            </div>

            {/* Right — bio + facts */}
            <div>
              <p style={{ fontSize: 16, color: m3.text, lineHeight: 1.8, margin: "0 0 36px" }}>
                {adnan.bio[lang]}
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {adnan.facts[lang].map(f => (
                  <div key={f.text} style={{
                    display: "flex", alignItems: "center", gap: 14,
                    padding: "14px 18px", borderRadius: 14,
                    background: "#fff", border: `1px solid ${m3.border}`,
                  }}>
                    <span style={{ fontSize: 20, flexShrink: 0 }}>{f.icon}</span>
                    <span style={{ fontSize: 14, color: m3.text, fontWeight: 500 }}>{f.text}</span>
                  </div>
                ))}
              </div>

              <Link href="/register" style={{
                display: "inline-block", marginTop: 32,
                padding: "14px 28px", borderRadius: 20,
                background: m3.primary, color: "#fff",
                fontWeight: 700, fontSize: 15, textDecoration: "none",
                boxShadow: "0 4px 16px rgba(103,80,164,0.3)",
              }}>
                {lang === "en" ? "Book a free first lesson →" : "预约免费第一课 →"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="l-pad" style={{ background: "#fff" }}>
        <div className="l-section">
          <p style={{ textAlign: "center", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: m3.muted, textTransform: "uppercase", marginBottom: 10 }}>{t.testiLabel}</p>
          <h2 style={{ textAlign: "center", fontSize: 34, fontWeight: 800, margin: "0 0 52px", color: m3.text }}>{t.testiTitle}</h2>
          <div className="l-3col">
            {testimonials.map(tst => (
              <div key={tst.name} style={{ background: m3.primarySoft, borderRadius: 20, padding: 32 }}>
                <span style={{
                  display: "inline-block", padding: "5px 14px", borderRadius: 12,
                  background: m3.primary, color: "#fff",
                  fontSize: 12, fontWeight: 600, marginBottom: 20,
                }}>{tst.result}</span>
                <p style={{ fontSize: 15, color: m3.text, lineHeight: 1.7, margin: "0 0 24px", fontStyle: "italic" }}>
                  &ldquo;{tst.quote[lang]}&rdquo;
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{
                    width: 38, height: 38, borderRadius: "50%",
                    background: m3.primary, color: "#fff",
                    display: "grid", placeItems: "center",
                    fontSize: 15, fontWeight: 700, flexShrink: 0,
                  }}>{tst.name[0]}</span>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 14, margin: 0, color: m3.text }}>{tst.name}</p>
                    <p style={{ fontSize: 12, color: m3.muted, margin: 0 }}>{tst.city[lang]}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="l-pad" style={{ background: m3.surface }}>
        <div style={{ maxWidth: 520, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: m3.muted, textTransform: "uppercase", marginBottom: 10 }}>{t.pricingLabel}</p>
          <h2 style={{ fontSize: 34, fontWeight: 800, margin: "0 0 36px", color: m3.text }}>{t.pricingTitle}</h2>
          <div style={{
            background: "#fff", borderRadius: 24, padding: "44px 40px",
            border: `2px solid ${m3.primary}`,
            boxShadow: "0 12px 40px rgba(103,80,164,0.12)",
          }}>
            <span style={{
              display: "inline-block", padding: "5px 18px", borderRadius: 20,
              background: m3.primary, color: "#fff",
              fontSize: 12, fontWeight: 700, marginBottom: 24,
            }}>今日特价</span>
            <h3 style={{ fontSize: 22, fontWeight: 800, margin: "0 0 10px", color: m3.text }}>{t.planName}</h3>
            <p style={{ fontSize: 14, color: m3.muted, textDecoration: "line-through", margin: "0 0 6px" }}>{t.originalPrice}</p>
            <p style={{ fontSize: 52, fontWeight: 900, color: m3.primary, margin: "0 0 36px", letterSpacing: "-0.03em" }}>
              {t.price}<span style={{ fontSize: 16, fontWeight: 500, color: m3.muted }}>{t.pricePer}</span>
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 36px", textAlign: "left", display: "flex", flexDirection: "column", gap: 14 }}>
              {t.perks.map(item => (
                <li key={item} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 15, color: m3.text }}>
                  <span style={{
                    width: 22, height: 22, borderRadius: "50%",
                    background: m3.primarySoft, color: m3.primary,
                    display: "grid", placeItems: "center",
                    fontSize: 13, fontWeight: 700, flexShrink: 0,
                  }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/register" style={{
              display: "block", padding: 18, borderRadius: 20,
              background: m3.primary, color: "#fff",
              fontWeight: 700, fontSize: 16, textDecoration: "none",
              marginBottom: 14, boxShadow: "0 4px 16px rgba(103,80,164,0.3)",
            }}>{t.pricingCta}</Link>
            <p style={{ fontSize: 12, color: m3.muted, margin: 0 }}>{t.guarantee}</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: "48px 40px 32px", borderTop: `1px solid ${m3.border}`, background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 32 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <span style={{
                display: "grid", placeItems: "center",
                width: 36, height: 36, borderRadius: 10,
                background: m3.primary, color: "#fff",
                fontSize: 16, fontWeight: 900,
              }}>S</span>
              <strong style={{ fontSize: 16, color: m3.text }}>SpeakSure</strong>
            </div>
            <p style={{ fontSize: 13, color: m3.muted, margin: 0, maxWidth: 260, lineHeight: 1.6 }}>
              {t.footerTagline}
            </p>
          </div>
          <div style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <strong style={{ fontSize: 13, color: m3.text }}>{t.links}</strong>
              {["Classes", "Contact"].map(l => <a key={l} href="#" style={{ fontSize: 13, color: m3.muted, textDecoration: "none" }}>{l}</a>)}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <strong style={{ fontSize: 13, color: m3.text }}>{t.legal}</strong>
              {["Privacy Policy", "Terms"].map(l => <a key={l} href="#" style={{ fontSize: 13, color: m3.muted, textDecoration: "none" }}>{l}</a>)}
            </div>
          </div>
        </div>
        <div style={{ maxWidth: 1100, margin: "28px auto 0", paddingTop: 24, borderTop: `1px solid ${m3.border}` }}>
          <p style={{ fontSize: 12, color: m3.muted, margin: 0 }}>{t.copyright}</p>
        </div>
      </footer>

    </div>
  )
}
