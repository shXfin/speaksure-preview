"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"

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

type Lang = "en" | "zh" | "ar"

const courses = [
  {
    id: 1,
    title:    { en: "6-Month English Course",    zh: "6个月英语课程",     ar: "كورس إنجليزي 6 أشهر"   },
    desc:     { en: "Six months of English for adults",  zh: "成人英语6个月课程",   ar: "ستة أشهر من الإنجليزية للبالغين" },
    duration: { en: "6 Months", zh: "6个月", ar: "6 أشهر" },
    price:    "¥1,099", origPrice:"¥2,200",
    hours:    240, lessons: 120, views: "116,345",
    photo: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80",
  },
  {
    id: 2,
    title:    { en: "3-Month Intensive",         zh: "3个月强化课程",     ar: "مكثف 3 أشهر"           },
    desc:     { en: "Three months of English language",  zh: "三个月英语语言课程",  ar: "ثلاثة أشهر من اللغة الإنجليزية" },
    duration: { en: "3 Months", zh: "3个月", ar: "3 أشهر" },
    price:    "¥699",  origPrice:"¥1,400",
    hours:    120, lessons: 60,  views: "52,438",
    photo: "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=600&q=80",
  },
  {
    id: 3,
    title:    { en: "2-Month English Course",    zh: "2个月英语课程",     ar: "كورس إنجليزي شهرين"    },
    desc:     { en: "Two levels of English for adults",  zh: "成人两级英语课程",   ar: "مستويان من الإنجليزية للبالغين" },
    duration: { en: "2 Months", zh: "2个月", ar: "شهران" },
    price:    "¥499",  origPrice:"¥1,000",
    hours:    80,  lessons: 40,  views: "243,418",
    photo: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80",
  },
  {
    id: 4,
    title:    { en: "1-Month English Course",    zh: "1个月英语课程",     ar: "كورس إنجليزي شهر واحد" },
    desc:     { en: "One level of English language",     zh: "一个月英语基础课程",  ar: "مستوى واحد من الإنجليزية"       },
    duration: { en: "1 Month", zh: "1个月", ar: "شهر واحد" },
    price:    "¥299",  origPrice:"¥600",
    hours:    40,  lessons: 20,  views: "564,828",
    photo: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80",
  },
  {
    id: 5,
    title:    { en: "IELTS Speaking Prep",       zh: "雅思口语备考",       ar: "تحضير IELTS للكلام"    },
    desc:     { en: "Target 7.0+ in IELTS Speaking",    zh: "雅思口语目标7.0+",   ar: "استهدف 7.0+ في محادثة IELTS"  },
    duration: { en: "2 Months", zh: "2个月", ar: "شهران" },
    price:    "¥599",  origPrice:"¥1,200",
    hours:    80,  lessons: 40,  views: "87,234",
    photo: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=600&q=80",
  },
  {
    id: 6,
    title:    { en: "Business English",          zh: "商务英语",           ar: "الإنجليزية للأعمال"    },
    desc:     { en: "Professional English for the workplace", zh: "职场专业英语课程", ar: "إنجليزية احترافية لبيئة العمل" },
    duration: { en: "3 Months", zh: "3个月", ar: "3 أشهر" },
    price:    "¥799",  origPrice:"¥1,600",
    hours:    120, lessons: 60,  views: "43,129",
    photo: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80",
  },
]

const reviews = [
  { name: "Li Wei",    date: "27/06/2026", stars: 5, comment: { en: "Excellent teacher, very clear explanations!", zh: "老师非常好，讲解非常清晰！", ar: "معلم ممتاز، شرح واضح جداً!" } },
  { name: "Zhang Min", date: "20/06/2026", stars: 5, comment: { en: "My IELTS score jumped from 5.5 to 7.0. Highly recommend.", zh: "我的雅思成绩从5.5跳到了7.0，强烈推荐。", ar: "ارتفعت درجتي في IELTS من 5.5 إلى 7.0. أنصح به بشدة." } },
  { name: "Wang Fang", date: "15/06/2026", stars: 5, comment: { en: "The structured curriculum made a huge difference.", zh: "结构化的课程内容带来了巨大的变化。", ar: "المنهج المنظم أحدث فرقاً كبيراً." } },
  { name: "Chen Yu",   date: "10/06/2026", stars: 4, comment: { en: "Great content. Very professional.", zh: "内容很棒，非常专业。", ar: "محتوى رائع. احترافي جداً." } },
  { name: "Liu Jing",  date: "05/06/2026", stars: 5, comment: { en: "Very beautiful lessons, learned so much!", zh: "课程非常精彩，学到了很多！", ar: "دروس جميلة جداً، تعلمت الكثير!" } },
]

const content = {
  en: {
    nav:    { home: "Home", courses: "Courses", login: "Log in", signup: "Create account" },
    tabBar: { home: "Home", courses: "Courses", language: "Language", account: "Account" },
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
    offerBadge:   "🔥 Limited time — 50% OFF all courses",
    coursesTitle: "Most Requested Courses",
    coursesSub:   "Choose the course that fits your level and schedule",
    enroll:       "Enroll now",
    lessons:      "lessons",
    reviewsTitle: "What students say",
    courseRate:   "Course Rate",
    ratingBars:   [{ stars:5,pct:87},{stars:4,pct:10},{stars:3,pct:3},{stars:2,pct:0},{stars:1,pct:0}],
    footer: {
      tagline: "Building English confidence for Chinese students worldwide.",
      links:   "Quick links",
      legal:   "Legal",
      copy:    "© 2025 SpeakSure. All rights reserved.",
    },
  },
  zh: {
    nav:    { home: "首页", courses: "课程", login: "登录", signup: "创建账号" },
    tabBar: { home: "首页", courses: "课程", language: "语言", account: "账户" },
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
    offerBadge:   "🔥 限时优惠 — 全课程5折",
    coursesTitle: "最受欢迎的课程",
    coursesSub:   "选择适合您水平和时间表的课程",
    enroll:       "立即报名",
    lessons:      "课",
    reviewsTitle: "学生反馈",
    courseRate:   "课程评分",
    ratingBars:   [{ stars:5,pct:87},{stars:4,pct:10},{stars:3,pct:3},{stars:2,pct:0},{stars:1,pct:0}],
    footer: {
      tagline: "帮助中国学生在全球舞台上自信表达。",
      links:   "快速链接",
      legal:   "法律",
      copy:    "© 2025 SpeakSure 版权所有",
    },
  },
  ar: {
    nav:    { home: "الرئيسية", courses: "الدورات", login: "تسجيل الدخول", signup: "إنشاء حساب" },
    tabBar: { home: "الرئيسية", courses: "الدورات", language: "اللغة", account: "حسابي" },
    hero: {
      badge: "TESOL معتمد · 15+ سنة خبرة",
      h1a: "تحدث الإنجليزية",
      h1b: "بثقة",
      sub:  "دروس أونلاين مباشرة مصممة للطلاب. معلم خبير، منهج منظم، نتائج مضمونة.",
      cta1: "ابدأ مجاناً →",
      cta2: "تصفح الدورات",
      stats: [
        { n: "12,847", l: "طالب"    },
        { n: "4.9★",   l: "التقييم" },
        { n: "6",      l: "دورات"   },
        { n: "15+",    l: "سنة خبرة"},
      ],
    },
    offerBadge:   "🔥 عرض محدود — خصم 50% على جميع الدورات",
    coursesTitle: "الدورات الأكثر طلباً",
    coursesSub:   "اختر الدورة التي تناسب مستواك وجدولك",
    enroll:       "سجّل الآن",
    lessons:      "درس",
    reviewsTitle: "آراء الطلاب",
    courseRate:   "تقييم الدورة",
    ratingBars:   [{ stars:5,pct:87},{stars:4,pct:10},{stars:3,pct:3},{stars:2,pct:0},{stars:1,pct:0}],
    footer: {
      tagline: "نبني ثقة الطلاب في اللغة الإنجليزية حول العالم.",
      links:   "روابط سريعة",
      legal:   "قانوني",
      copy:    "© 2025 SpeakSure. جميع الحقوق محفوظة.",
    },
  },
}

const YT_ID = "JMU0CztY3gE"

function VideoHero({ className, style }: { className?: string; style?: React.CSSProperties }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<any>(null)
  const [playing, setPlaying] = useState(false)
  const [muted,   setMuted]   = useState(false)
  const [ready,   setReady]   = useState(false)

  useEffect(() => {
    function init() {
      if (!containerRef.current || containerRef.current.querySelector("#yt-hero-player")) return
      // The YouTube API replaces its target element with an <iframe>, which
      // fights with React's reconciliation if the target is a React-rendered
      // node. So we create a plain DOM node here (outside React's tree) for
      // the API to take over safely.
      const target = document.createElement("div")
      target.id = "yt-hero-player"
      // Carried onto the <iframe> that the YouTube API replaces this node
      // with, so it fills the container the same way the old React-rendered
      // div did.
      target.style.cssText = "position:absolute; inset:0; width:100%; height:100%; pointer-events:none;"
      containerRef.current.appendChild(target)

      const p = new (window as any).YT.Player(target, {
        videoId: YT_ID,
        width: "100%",
        height: "100%",
        playerVars: {
          autoplay: 1, mute: 1, controls: 0,
          loop: 1, playlist: YT_ID,
          rel: 0, modestbranding: 1, playsinline: 1,
          iv_load_policy: 3, fs: 0, disablekb: 1,
        },
        events: {
          onReady: (e: any) => {
            // Browsers block unmuted autoplay without a user gesture, so we
            // start muted (always allowed) and only unmute on manual toggle.
            e.target.playVideo()
            setReady(true)
            setPlaying(true)
            setMuted(true)
          },
          onStateChange: (e: any) => {
            // 1=playing 2=paused — sync state
            if (e.data === 1) setPlaying(true)
            if (e.data === 2) setPlaying(false)
          },
        },
      })
      playerRef.current = p
    }

    const win = window as any
    if (win.YT?.Player) {
      init()
    } else {
      if (!document.getElementById("yt-api-script")) {
        const s = document.createElement("script")
        s.id  = "yt-api-script"
        s.src = "https://www.youtube.com/iframe_api"
        document.head.appendChild(s)
      }
      win.onYouTubeIframeAPIReady = init
    }
    return () => { playerRef.current?.destroy?.() }
  }, [])

  // Browsers only allow unmuted playback after a real user gesture, so we
  // unmute automatically on the visitor's first click/tap/keypress anywhere
  // on the page — not just on the video — so sound kicks in almost instantly
  // for most visitors without requiring them to interact with the video itself.
  useEffect(() => {
    function unlockSound() {
      if (playerRef.current) {
        playerRef.current.unMute()
        playerRef.current.setVolume(80)
        playerRef.current.playVideo()
        setMuted(false)
      }
    }
    const opts = { once: true, passive: true } as const
    window.addEventListener("pointerdown", unlockSound, opts)
    window.addEventListener("keydown", unlockSound, opts)
    return () => {
      window.removeEventListener("pointerdown", unlockSound)
      window.removeEventListener("keydown", unlockSound)
    }
  }, [])

  function togglePlay() {
    if (!playerRef.current) return
    if (playing) {
      playerRef.current.pauseVideo()
    } else {
      playerRef.current.unMute()
      playerRef.current.setVolume(80)
      playerRef.current.playVideo()
      setMuted(false)
    }
  }
  function toggleMute() {
    if (!playerRef.current) return
    if (muted) { playerRef.current.unMute(); playerRef.current.setVolume(80) }
    else playerRef.current.mute()
    setMuted(m => !m)
  }

  const btn: React.CSSProperties = {
    width: 40, height: 40, borderRadius: "50%",
    background: "rgba(0,0,0,0.5)",
    backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
    border: "1px solid rgba(255,255,255,0.18)",
    color: "#fff", display: "grid", placeItems: "center",
    cursor: "pointer",
  }

  return (
    <div className={className} style={{ position: "relative", overflow: "hidden", background: "#000", ...style }}>
      {/* 9:16 aspect-ratio box */}
      <div className="yt-ratio" style={{ paddingTop: "177.78%", position: "relative" }}>
        <div ref={containerRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />
      </div>

      {/* Side gradient masks — mobile only, hides YouTube ◀ ▶ nav arrows */}
      <div className="yt-side-mask" style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "14%", background: "linear-gradient(to right, rgba(13,30,61,0.95), transparent)", zIndex: 7, pointerEvents: "none" }} />
      <div className="yt-side-mask" style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "14%", background: "linear-gradient(to left, rgba(13,30,61,0.95), transparent)", zIndex: 7, pointerEvents: "none" }} />

      {/* Bottom gradient for controls legibility */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 100, background: "linear-gradient(transparent, rgba(0,0,0,0.7))", zIndex: 6, pointerEvents: "none" }} />

      {/* Tap anywhere to play/pause */}
      <div onClick={togglePlay} style={{ position: "absolute", inset: 0, zIndex: 5, cursor: "pointer" }} />

      {/* Opaque overlay when paused/loading — hides YouTube title card & UI */}
      {(!playing || !ready) && (
        <div onClick={togglePlay} style={{ position: "absolute", inset: 0, background: C.navy, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 20, cursor: "pointer" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, pointerEvents: "none" }}>
            <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(245,197,24,0.92)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 40px rgba(245,197,24,0.5)" }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="#0d1e3d"><polygon points="6 3 20 12 6 21 6 3"/></svg>
            </div>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", fontWeight: 500, letterSpacing: "0.04em" }}>Tap to play with sound</span>
          </div>
        </div>
      )}

      {/* Controls — bottom right, only play/pause + mute */}
      <div style={{ position: "absolute", bottom: 14, right: 14, display: "flex", gap: 8, zIndex: 10 }}>
        <button onClick={e => { e.stopPropagation(); togglePlay() }} style={btn}>
          {playing
            ? <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
            : <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><polygon points="6 3 20 12 6 21 6 3"/></svg>}
        </button>
        <button onClick={e => { e.stopPropagation(); toggleMute() }} style={{ ...btn, background: muted ? "rgba(245,197,24,0.4)" : "rgba(0,0,0,0.5)", border: muted ? "1px solid rgba(245,197,24,0.6)" : btn.border }}>
          {muted
            ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
            : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>}
        </button>
      </div>
    </div>
  )
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

const LANG_CYCLE: Lang[] = ["en", "zh", "ar"]
const LANG_LABEL: Record<Lang, string> = { en: "EN", zh: "中文", ar: "العربية" }
const LANG_NEXT_LABEL: Record<Lang, string>  = { en: "中文", zh: "العربية", ar: "EN" }

// SVG icons for bottom tab bar
function IconHome({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? C.gold : "rgba(255,255,255,0.5)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  )
}
function IconCourses({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? C.gold : "rgba(255,255,255,0.5)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    </svg>
  )
}
function IconGlobe({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? C.gold : "rgba(255,255,255,0.5)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  )
}
function IconAccount({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? C.gold : "rgba(255,255,255,0.5)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  )
}

export default function LandingPage() {
  const [lang, setLang] = useState<Lang>("en")
  const [activeTab, setActiveTab] = useState<"home" | "courses" | "account">("home")
  const [showLangMenu, setShowLangMenu] = useState(false)
  const t = content[lang]
  const isRTL = lang === "ar"

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      style={{ background: C.navy, color: C.white, fontFamily: isRTL ? "'Segoe UI','Tahoma',Arial,sans-serif" : "'Segoe UI','PingFang SC',Arial,sans-serif", overflowX: "hidden" }}
    >
      <style>{`
        html, body { overflow-x: hidden; margin: 0; padding: 0; }

        /* Desktop layout helpers */
        .l-nav-links { display: flex; }
        .l-hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
        .l-hero-grid > * { min-width: 0; }
        .l-hero-video { display: flex; justify-content: center; align-items: center; }

        /* Hide side gradient masks on desktop */
        .yt-side-mask { display: none; }

        /* Clip YouTube Shorts channel bar (top) and watermark (bottom) */
        #yt-hero-player { overflow: hidden !important; }
        #yt-hero-player iframe {
          position: absolute !important;
          top: -68px !important;
          left: -8px !important;
          width: calc(100% + 16px) !important;
          height: calc(100% + 110px) !important;
          pointer-events: none !important;
        }

        /* Mobile: video fills hero section, text overlaid at bottom */
        @media (max-width: 768px) {
          .l-hero-section { padding: 0 !important; overflow: hidden; position: relative; }
          .l-hero-grid {
            grid-template-columns: 1fr !important;
            gap: 0 !important;
            position: relative;
            min-height: 88svh;
            display: grid !important;
          }
          /* Video behind — absolute fill of hero grid */
          .l-hero-video {
            grid-row: 1 !important; grid-column: 1 !important;
            z-index: 0 !important;
            position: absolute !important;
            inset: 0 !important;
            display: block !important;
          }
          .l-hero-video > div {
            max-width: none !important;
            width: 100% !important; height: 100% !important;
            border-radius: 0 !important; box-shadow: none !important;
            position: absolute !important; inset: 0 !important;
          }
          /* Override aspect-ratio wrapper so video fills height */
          .l-hero-video .yt-ratio {
            padding-top: 0 !important;
            position: absolute !important; inset: 0 !important;
          }
          /* Text on top, pinned to bottom with tight gradient */
          .l-hero-text-col {
            grid-row: 1 !important; grid-column: 1 !important;
            z-index: 2 !important;
            align-self: end !important;
            padding: 20px 24px 28px !important;
            background: linear-gradient(transparent, rgba(13,30,61,0.97) 30%) !important;
          }
          /* Simplify text on mobile — hide badge, subtitle, stats */
          .l-hero-badge  { display: none !important; }
          .l-hero-sub    { display: none !important; }
          .l-hero-stats  { display: none !important; }
          /* Smaller h1 */
          .l-hero-h1 { font-size: 30px !important; margin-bottom: 14px !important; }
          /* Stack CTA buttons */
          .l-hero-ctas { flex-direction: column !important; gap: 10px !important; margin-bottom: 0 !important; }
          .l-hero-ctas a { text-align: center !important; }
        }
        .l-courses-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(400px, 1fr)); gap: 20px; }
        .l-courses-grid > * { min-width: 0; }
        .l-reviews-grid { display: grid; grid-template-columns: 300px 1fr; gap: 48px; align-items: start; }
        .l-reviews-grid > * { min-width: 0; }

        /* Language button always visible */
        .l-nav-lang { display: flex; }

        /* Mobile bottom tab bar — hidden on desktop */
        .m-bottom-nav { display: none; }
        .m-wa-float { bottom: 24px; }

        @media (max-width: 768px) {
          .l-nav-links { display: none !important; }
          .l-nav-login { display: none !important; }
          .l-nav-lang { display: flex !important; }
          .yt-side-mask { display: block !important; }
          .l-courses-grid { grid-template-columns: 1fr !important; }
          .l-reviews-grid { grid-template-columns: 1fr !important; gap: 20px !important; }

          /* Show bottom nav on mobile */
          .m-bottom-nav {
            display: flex;
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 500;
            height: 68px;
            align-items: stretch;
            background: rgba(10, 20, 50, 0.82);
            backdrop-filter: blur(24px) saturate(1.8);
            -webkit-backdrop-filter: blur(24px) saturate(1.8);
            border-top: 1px solid rgba(255,255,255,0.10);
            box-shadow: 0 -8px 40px rgba(0,0,0,0.45), 0 -1px 0 rgba(245,197,24,0.07);
          }

          /* Add bottom padding so content doesn't hide behind tab bar */
          .m-page-pad { padding-bottom: 80px !important; }

          /* WhatsApp button rises above tab bar */
          .m-wa-float { bottom: 80px !important; }
        }

        .m-tab-item {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 3px;
          cursor: pointer;
          background: transparent;
          border: none;
          padding: 0;
          -webkit-tap-highlight-color: transparent;
          position: relative;
        }
        .m-tab-item.active::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 32px;
          height: 2.5px;
          border-radius: 0 0 4px 4px;
          background: #f5c518;
        }
        .m-tab-label {
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.02em;
        }
      `}</style>

      {/* ── Nav ─────────────────────────────────────────────── */}
      <nav style={{ background: C.navyMid, borderBottom: `1px solid ${C.border}`, position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <img src="/logo.svg" alt="SpeakSure" width={36} height={36} style={{ borderRadius: 8, flexShrink: 0, display: "block" }} />
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: C.white, lineHeight: 1.2 }}>SpeakSure</div>
              <div style={{ fontSize: 10, color: C.muted, lineHeight: 1.2 }}>English · 英语</div>
            </div>
          </Link>

          <div className="l-nav-links" style={{ gap: 24, alignItems: "center" }}>
            {[{ l: t.nav.home, h: "/" }, { l: t.nav.courses, h: "#courses" }].map(x => (
              <a key={x.l} href={x.h} style={{ fontSize: 13, color: C.muted, textDecoration: "none", fontWeight: 500, whiteSpace: "nowrap" }}>{x.l}</a>
            ))}
          </div>

          {/* Language toggle — always visible on mobile + desktop */}
          <div className="l-nav-lang" style={{ position: "relative", flexShrink: 0 }}>
            <button onClick={() => setShowLangMenu(v => !v)}
              style={{ background: showLangMenu ? "rgba(245,197,24,0.12)" : "rgba(255,255,255,0.07)", border: `1px solid ${showLangMenu ? C.borderGold : C.border}`, color: C.white, borderRadius: 20, padding: "6px 14px", fontSize: 13, cursor: "pointer", fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}>
              🌐 {LANG_LABEL[lang]} <span style={{ fontSize: 10, opacity: 0.6 }}>▾</span>
            </button>
            {showLangMenu && (
              <>
                {/* backdrop to close on outside click */}
                <div onClick={() => setShowLangMenu(false)} style={{ position: "fixed", inset: 0, zIndex: 198 }} />
                <div style={{ position: "absolute", top: "calc(100% + 8px)", [isRTL ? "left" : "right"]: 0, zIndex: 199, background: "#1a2f5a", border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.4)", minWidth: 160 }}>
                  {LANG_CYCLE.map(l => (
                    <button key={l} onClick={() => { setLang(l); setShowLangMenu(false) }}
                      style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "12px 16px", background: lang === l ? "rgba(245,197,24,0.1)" : "transparent", border: "none", color: lang === l ? C.gold : C.white, fontSize: 13, fontWeight: lang === l ? 700 : 500, cursor: "pointer", textAlign: "left" }}>
                      <span style={{ fontSize: 16 }}>{l === "en" ? "🇬🇧" : l === "zh" ? "🇨🇳" : "🇸🇦"}</span>
                      <span>{l === "en" ? "English" : l === "zh" ? "中文" : "العربية"}</span>
                      {lang === l && <span style={{ marginLeft: "auto", color: C.gold }}>✓</span>}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="l-nav-login" style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            <Link href="/login" style={{ padding: "7px 16px", borderRadius: 20, border: `1.5px solid ${C.border}`, color: C.white, fontWeight: 600, fontSize: 13, textDecoration: "none" }}>{t.nav.login}</Link>
            <Link href="/register" style={{ padding: "7px 16px", borderRadius: 20, background: C.gold, color: C.navy, fontWeight: 700, fontSize: 13, textDecoration: "none" }}>{t.nav.signup}</Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="l-hero-section" style={{ background: `linear-gradient(135deg, ${C.navyMid} 0%, ${C.navyLight} 60%, ${C.navyMid} 100%)`, padding: "72px 20px 64px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -160, right: -160, width: 520, height: 520, borderRadius: "50%", background: "rgba(245,197,24,0.05)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -80, left: -80, width: 360, height: 360, borderRadius: "50%", background: "rgba(245,197,24,0.04)", pointerEvents: "none" }} />

        <div className="l-hero-grid" style={{ maxWidth: 1200, margin: "0 auto" }}>
          {/* Text column */}
          <div className="l-hero-text-col">
            <span className="l-hero-badge" style={{ display: "inline-block", padding: "5px 14px", borderRadius: 20, background: "rgba(245,197,24,0.12)", color: C.gold, fontSize: 12, fontWeight: 700, marginBottom: 20, border: `1px solid ${C.borderGold}` }}>
              🎓 {t.hero.badge}
            </span>
            <h1 className="l-hero-h1" style={{ fontSize: "clamp(36px,4.5vw,60px)", fontWeight: 900, margin: "0 0 14px", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              {t.hero.h1a}<br />
              <span style={{ color: C.gold }}>{t.hero.h1b}</span>
            </h1>
            <p className="l-hero-sub" style={{ fontSize: 16, color: C.muted, margin: "0 0 36px", lineHeight: 1.75, maxWidth: 460 }}>{t.hero.sub}</p>
            <div className="l-hero-ctas" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 44 }}>
              <Link href="/register" style={{ padding: "13px 26px", borderRadius: 10, background: C.gold, color: C.navy, fontWeight: 700, fontSize: 15, textDecoration: "none", boxShadow: "0 4px 18px rgba(245,197,24,0.35)" }}>{t.hero.cta1}</Link>
              <a href="#courses" style={{ padding: "13px 26px", borderRadius: 10, border: `1.5px solid ${C.border}`, color: C.white, fontWeight: 600, fontSize: 15, textDecoration: "none" }}>{t.hero.cta2}</a>
            </div>
            <div className="l-hero-stats" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", background: "rgba(255,255,255,0.04)", borderRadius: 14, border: `1px solid ${C.border}`, overflow: "hidden" }}>
              {t.hero.stats.map((s, i) => (
                <div key={i} style={{ padding: "16px 8px", textAlign: "center", borderRight: i < 3 ? `1px solid ${C.border}` : "none" }}>
                  <div style={{ fontSize: 20, fontWeight: 900, color: C.gold }}>{s.n}</div>
                  <div style={{ fontSize: 10, color: C.muted, marginTop: 4 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Video column */}
          <div className="l-hero-video">
            <VideoHero style={{ width: "100%", maxWidth: 300, borderRadius: 20, boxShadow: "0 24px 64px rgba(0,0,0,0.5)" }} />
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

                  <div style={{ display: "flex", gap: 14, paddingTop: 12, borderTop: `1px solid ${C.border}` }}>
                    <span style={{ fontSize: 11, color: C.muted, display: "flex", alignItems: "center", gap: 4 }}>🕐 {c.hours}</span>
                    <span style={{ fontSize: 11, color: C.muted, display: "flex", alignItems: "center", gap: 4 }}>📖 {c.lessons} {t.lessons}</span>
                    <span style={{ fontSize: 11, color: C.muted, display: "flex", alignItems: "center", gap: 4 }}>👁 {c.views}</span>
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
                    <p style={{ fontSize: 13, color: C.muted, margin: "6px 0 0", lineHeight: 1.6 }}>{r.comment[lang]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────── */}
      <footer className="m-page-pad" style={{ background: "#07112a", borderTop: `1px solid ${C.border}`, padding: "48px 20px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 40, marginBottom: 44 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                <img src="/logo.svg" alt="SpeakSure" width={32} height={32} style={{ borderRadius: 8, flexShrink: 0, display: "block" }} />
                <strong style={{ fontSize: 15, color: C.white }}>SpeakSure</strong>
              </div>
              <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.7, margin: 0 }}>{t.footer.tagline}</p>
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
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <span style={{ fontSize: 11, color: C.muted, padding: "4px 10px", border: `1px solid ${C.border}`, borderRadius: 6 }}>📱 Touch &apos;n Go</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ── WhatsApp float ───────────────────────────────────── */}
      <a href="https://wa.me/601161684359" target="_blank" rel="noopener noreferrer"
        className="m-wa-float"
        style={{ position: "fixed", left: 24, zIndex: 499, width: 54, height: 54, borderRadius: "50%", background: "#25d366", display: "grid", placeItems: "center", boxShadow: "0 4px 18px rgba(37,211,102,0.5)", textDecoration: "none" }}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      {/* ── Mobile Bottom Tab Bar ────────────────────────────── */}
      <nav className="m-bottom-nav">
        <button className={`m-tab-item${activeTab === "home" ? " active" : ""}`} onClick={() => { setActiveTab("home"); window.scrollTo({ top: 0, behavior: "smooth" }) }}>
          <IconHome active={activeTab === "home"} />
          <span className="m-tab-label" style={{ color: activeTab === "home" ? C.gold : "rgba(255,255,255,0.5)" }}>{t.tabBar.home}</span>
        </button>

        <button className={`m-tab-item${activeTab === "courses" ? " active" : ""}`} onClick={() => { setActiveTab("courses"); document.getElementById("courses")?.scrollIntoView({ behavior: "smooth" }) }}>
          <IconCourses active={activeTab === "courses"} />
          <span className="m-tab-label" style={{ color: activeTab === "courses" ? C.gold : "rgba(255,255,255,0.5)" }}>{t.tabBar.courses}</span>
        </button>

        <button className={`m-tab-item${activeTab === "account" ? " active" : ""}`} onClick={() => { setActiveTab("account"); window.location.href = "/login" }}>
          <IconAccount active={activeTab === "account"} />
          <span className="m-tab-label" style={{ color: activeTab === "account" ? C.gold : "rgba(255,255,255,0.5)" }}>{t.tabBar.account}</span>
        </button>
      </nav>

    </div>
  )
}
