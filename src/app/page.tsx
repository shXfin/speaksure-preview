"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"

const C = {
  navy:      "#0d1e3d",
  navyMid:   "#142040",
  navyLight: "#1a2f5a",
  navyCard:  "#162448",
  gold:      "#ff5c56",
  goldDark:  "#c9302c",
  white:     "#ffffff",
  onAccent:  "#0d1e3d",
  muted:     "rgba(255,255,255,0.6)",
  border:    "rgba(255,255,255,0.08)",
  borderGold:"rgba(255,92,86,0.25)",
}

type Lang = "en" | "zh" | "ar"
type Currency = "USD" | "MYR" | "SAR" | "CNY"

const PRICING_TIERS: Record<Currency, Array<{ label: string; price: string; best?: boolean }>> = {
  USD: [
    { label: "1 Month",  price: "$50" },
    { label: "3 Months", price: "$145" },
    { label: "6 Months", price: "$280" },
    { label: "9 Months", price: "$400" },
    { label: "1 Year",   price: "$499", best: true },
  ],
  MYR: [
    { label: "1 Month",  price: "RM 540.78" },
    { label: "3 Months", price: "RM 1,566.73" },
    { label: "6 Months", price: "RM 3,012.80" },
    { label: "9 Months", price: "RM 4,338.62" },
    { label: "1 Year",   price: "RM 5,423.93", best: true },
  ],
  SAR: [
    { label: "1 Month",  price: "SAR 499" },
    { label: "3 Months", price: "SAR 1,449" },
    { label: "6 Months", price: "SAR 2,799" },
    { label: "9 Months", price: "SAR 3,999" },
    { label: "1 Year",   price: "SAR 4,999", best: true },
  ],
  CNY: [
    { label: "1 Month",  price: "¥899" },
    { label: "3 Months", price: "¥2,599" },
    { label: "6 Months", price: "¥4,999" },
    { label: "9 Months", price: "¥7,199" },
    { label: "1 Year",   price: "¥8,999", best: true },
  ],
}

const COUNTRY_CURRENCY: Record<string, Currency> = {
  MY: "MYR", SG: "USD", TH: "USD", ID: "USD", PH: "USD",
  SA: "SAR", AE: "SAR", QA: "SAR", KW: "SAR", BH: "SAR", OM: "SAR",
  CN: "CNY", TW: "CNY", HK: "CNY",
  JP: "USD", US: "USD", GB: "USD", CA: "USD", AU: "USD", NZ: "USD",
  IN: "USD", BR: "USD", MX: "USD",
}

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
      sub:  "Live online classes designed for global students. Expert teacher, structured curriculum, proven results.",
      cta1: "Start for free →",
      cta2: "Browse courses",
      stats: [
        { n: "12,847", l: "Students" },
        { n: "4.9★",   l: "Rating"   },
        { n: "3x",     l: "Classes/wk" },
        { n: "15+",    l: "Yrs exp." },
      ],
    },
    how: {
      eyebrow: "How SpeakSure works",
      title:   "One journey, from anywhere to fluent",
      sub:     "Every student starts in a different country, speaking a different language. SpeakSure gets you to the same place: speaking English with confidence.",
      steps: [
        { icon: "🌍", label: "Join from anywhere",     desc: "Wherever you're starting from, you're in the right place." },
        { icon: "👩‍🏫", label: "Meet your teacher",      desc: "Matched with a real, expert teacher — not a recording." },
        { icon: "💬", label: "Practice live",           desc: "Real conversations and real feedback, every class." },
        { icon: "🏆", label: "Speak with confidence",   desc: "Walk away actually using English, not just knowing it." },
      ],
    },
    offerBadge:   "🔥 Limited time — 50% OFF all courses",
    coursesTitle: "Most Requested Courses",
    coursesSub:   "Choose the course that fits your level and schedule",
    course: {
      eyebrow: "Our flagship program",
      title: "English Foundation for Beginners",
      tagline: "Speak & learn fast!",
      sub: "Start from zero and learn English the easy way. Combine live online classes with fun, smart exercises so you can listen, speak, and build real confidence right away.",
      features: [
        { label: "Live online classes", desc: "3 times a week (75 mins each) with real teachers." },
        { label: "Interactive listening & speaking", desc: "Practice speaking and listening with custom digital exercises, powered by Formative." },
        { label: "All-in-one platform", desc: "Join live lessons, then practice on our website anytime to lock in what you learned." },
      ],
    },
    enroll:       "Enroll now",
    lessons:      "lessons",
    reviewsTitle: "What students say",
    courseRate:   "Course Rate",
    ratingBars:   [{ stars:5,pct:87},{stars:4,pct:10},{stars:3,pct:3},{stars:2,pct:0},{stars:1,pct:0}],
    plans: {
      title: "Premium Subscription Plans",
      enroll: "Enroll now",
      best: "Best Value",
      tiers: [
        { label: "1 Month",  price: "¥899"   },
        { label: "3 Months", price: "¥2,599" },
        { label: "6 Months", price: "¥4,999" },
        { label: "9 Months", price: "¥7,199" },
        { label: "1 Year",   price: "¥8,999", best: true },
      ],
    },
    footer: {
      tagline: "Building English confidence for students around the world.",
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
      sub:  "专为全球学生设计的在线直播课。专业教师，结构化课程，真实成果。",
      cta1: "免费开始 →",
      cta2: "浏览课程",
      stats: [
        { n: "12,847", l: "学生"   },
        { n: "4.9★",   l: "评分"   },
        { n: "3次",    l: "每周课程" },
        { n: "15+",    l: "年经验" },
      ],
    },
    how: {
      eyebrow: "SpeakSure 的学习之旅",
      title:   "无论从哪里开始，都能自信说英语",
      sub:     "每位学生来自不同国家，讲着不同的语言。SpeakSure 帮你到达同一个目标：自信地说英语。",
      steps: [
        { icon: "🌍", label: "随时随地加入",   desc: "无论你从哪里开始，这里都是合适的起点。" },
        { icon: "👩‍🏫", label: "遇见你的老师",   desc: "系统为你匹配真正的专业教师，而不是录播课程。" },
        { icon: "💬", label: "实时练习对话",   desc: "每一节课都是真实对话与即时反馈。" },
        { icon: "🏆", label: "自信开口说英语", desc: "不只是懂英语，而是真正能用英语交流。" },
      ],
    },
    offerBadge:   "🔥 限时优惠 — 全课程5折",
    coursesTitle: "最受欢迎的课程",
    coursesSub:   "选择适合您水平和时间表的课程",
    course: {
      eyebrow: "旗舰课程",
      title: "零基础英语",
      tagline: "快速开口，快速进步！",
      sub: "从零开始，用最轻松的方式学英语。结合直播课程与趣味智能练习，边听边说，快速建立真正的自信。",
      features: [
        { label: "直播在线课程", desc: "每周3次，每次75分钟，由真人教师授课。" },
        { label: "互动听说练习", desc: "通过定制数字练习（由 Formative 提供支持）练习听力与口语。" },
        { label: "一站式学习平台", desc: "上完直播课后，随时在网站上练习，巩固所学内容。" },
      ],
    },
    enroll:       "立即报名",
    lessons:      "课",
    reviewsTitle: "学生反馈",
    courseRate:   "课程评分",
    ratingBars:   [{ stars:5,pct:87},{stars:4,pct:10},{stars:3,pct:3},{stars:2,pct:0},{stars:1,pct:0}],
    plans: {
      title: "高级订阅套餐",
      enroll: "立即报名",
      best: "最超值",
      tiers: [
        { label: "1个月", price: "¥899"   },
        { label: "3个月", price: "¥2,599" },
        { label: "6个月", price: "¥4,999" },
        { label: "9个月", price: "¥7,199" },
        { label: "1年",   price: "¥8,999", best: true },
      ],
    },
    footer: {
      tagline: "帮助全球学生自信地说英语。",
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
        { n: "3x",     l: "حصص/أسبوع" },
        { n: "15+",    l: "سنة خبرة"},
      ],
    },
    how: {
      eyebrow: "كيف تعمل SpeakSure",
      title:   "رحلة واحدة، من أي مكان إلى الطلاقة",
      sub:     "كل طالب يبدأ من بلد مختلف بلغة مختلفة. تقودك SpeakSure إلى نفس الهدف: التحدث بالإنجليزية بثقة.",
      steps: [
        { icon: "🌍", label: "انضم من أي مكان",  desc: "أينما كنت تبدأ، فأنت في المكان الصحيح." },
        { icon: "👩‍🏫", label: "قابل معلمك",       desc: "يتم ربطك بمعلم حقيقي وخبير، وليس درساً مسجلاً." },
        { icon: "💬", label: "تدرّب مباشرة",     desc: "محادثات حقيقية وملاحظات فورية في كل حصة." },
        { icon: "🏆", label: "تحدث بثقة",        desc: "لا تكتفِ بمعرفة الإنجليزية، بل استخدمها فعلاً." },
      ],
    },
    offerBadge:   "🔥 عرض محدود — خصم 50% على جميع الدورات",
    coursesTitle: "الدورات الأكثر طلباً",
    coursesSub:   "اختر الدورة التي تناسب مستواك وجدولك",
    course: {
      eyebrow: "برنامجنا الرئيسي",
      title: "أساسيات الإنجليزية للمبتدئين",
      tagline: "تحدث وتعلم بسرعة!",
      sub: "ابدأ من الصفر وتعلم الإنجليزية بطريقة سهلة. ادمج بين الحصص المباشرة أونلاين وتمارين ذكية وممتعة لتستمع وتتحدث وتبني ثقة حقيقية من البداية.",
      features: [
        { label: "حصص مباشرة أونلاين", desc: "3 مرات أسبوعياً (75 دقيقة لكل حصة) مع معلمين حقيقيين." },
        { label: "تمارين استماع ومحادثة تفاعلية", desc: "تدرّب على التحدث والاستماع من خلال تمارين رقمية مخصصة، مدعومة من Formative." },
        { label: "منصة شاملة", desc: "احضر الحصص المباشرة، ثم تدرّب على موقعنا في أي وقت لترسيخ ما تعلمته." },
      ],
    },
    enroll:       "سجّل الآن",
    lessons:      "درس",
    reviewsTitle: "آراء الطلاب",
    courseRate:   "تقييم الدورة",
    ratingBars:   [{ stars:5,pct:87},{stars:4,pct:10},{stars:3,pct:3},{stars:2,pct:0},{stars:1,pct:0}],
    plans: {
      title: "خطط الاشتراك المميزة",
      enroll: "سجّل الآن",
      best: "الأفضل قيمة",
      tiers: [
        { label: "شهر واحد", price: "¥899"   },
        { label: "3 أشهر",   price: "¥2,599" },
        { label: "6 أشهر",   price: "¥4,999" },
        { label: "9 أشهر",   price: "¥7,199" },
        { label: "سنة واحدة", price: "¥8,999", best: true },
      ],
    },
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
            // 1=playing, 2=paused, 0=ended
            if (e.data === 1) setPlaying(true)
            if (e.data === 2) setPlaying(false)
            // Restart instantly on end rather than waiting on YouTube's own
            // loop timing, which briefly exposes its replay/branding UI.
            // Deliberately does NOT flip `playing` off, so the tap-to-play
            // overlay doesn't flash on every loop.
            if (e.data === 0) { e.target.seekTo(0); e.target.playVideo() }
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
      const prevReady = win.onYouTubeIframeAPIReady
      win.onYouTubeIframeAPIReady = () => { prevReady?.(); init() }
    }
    return () => { playerRef.current?.destroy?.() }
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
        <div ref={containerRef} className="yt-clip" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />
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
            <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(255,92,86,0.92)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 40px rgba(255,92,86,0.5)" }}>
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
        <button onClick={e => { e.stopPropagation(); toggleMute() }} style={{ ...btn, background: muted ? "rgba(255,92,86,0.4)" : "rgba(0,0,0,0.5)", border: muted ? "1px solid rgba(255,92,86,0.6)" : btn.border }}>
          {muted
            ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
            : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>}
        </button>
      </div>
    </div>
  )
}

const EXPLAINER_YT_ID = "PmWfCrM3uZ0"

function ExplainerVideo({ style }: { style?: React.CSSProperties }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<any>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    function init() {
      if (!containerRef.current || containerRef.current.querySelector("#yt-explainer-player")) return
      // Same pattern as the hero video: create the target node imperatively so
      // YouTube's DOM replacement doesn't fight React's reconciliation.
      const target = document.createElement("div")
      target.id = "yt-explainer-player"
      target.style.cssText = "position:absolute; inset:0; width:100%; height:100%;"
      containerRef.current.appendChild(target)

      const p = new (window as any).YT.Player(target, {
        videoId: EXPLAINER_YT_ID,
        width: "100%",
        height: "100%",
        playerVars: {
          autoplay: 1, mute: 1, controls: 0,
          rel: 0, modestbranding: 1, playsinline: 1,
          iv_load_policy: 3, fs: 0, disablekb: 1,
        },
        events: {
          onReady: (e: any) => { e.target.playVideo() },
          onStateChange: (e: any) => {
            // Restart instantly ourselves on end instead of relying on
            // YouTube's own loop/playlist timing, which leaves a visible gap
            // showing its native UI. Our cover stays up until state 1 fires.
            if (e.data === 1) setPlaying(true)
            else {
              setPlaying(false)
              if (e.data === 0) { e.target.seekTo(0); e.target.playVideo() }
            }
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
      const prevReady = win.onYouTubeIframeAPIReady
      win.onYouTubeIframeAPIReady = () => { prevReady?.(); init() }
    }
    return () => { playerRef.current?.destroy?.() }
  }, [])

  return (
    <div style={{ position: "relative", overflow: "hidden", background: `linear-gradient(135deg, ${C.navyMid}, ${C.navy})`, borderRadius: 16, ...style }}>
      <div style={{ paddingTop: "57.2%" }} />
      <div ref={containerRef} style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
      {/* Always blocks pointer events — this is a decorative loop, not an
          interactive player, so the cursor should never reach the iframe
          and trigger YouTube's own hover/click UI. */}
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${C.navyMid}, ${C.navy})`, opacity: playing ? 0 : 1, transition: "opacity 200ms" }} />
    </div>
  )
}

const COURSE_ICONS = [
  <svg key="video" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="6" width="14" height="12" rx="2"/><path d="M16 10.5l6-3.5v10l-6-3.5"/>
  </svg>,
  <svg key="headset" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 13v-1a8 8 0 0 1 16 0v1"/><rect x="2" y="13" width="5" height="7" rx="1.5"/><rect x="17" y="13" width="5" height="7" rx="1.5"/>
  </svg>,
  <svg key="laptop" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M1 20h22"/>
  </svg>,
]

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
  const [currency, setCurrency] = useState<Currency>("USD")
  const [activeTab, setActiveTab] = useState<"home" | "courses" | "account">("home")
  const [showLangMenu, setShowLangMenu] = useState(false)
  const [showCurrencyMenu, setShowCurrencyMenu] = useState(false)
  const t = content[lang]
  const isRTL = lang === "ar"

  // Detect location on mount
  useEffect(() => {
    if (typeof window === "undefined") return
    fetch("https://ipapi.co/json/", { signal: AbortSignal.timeout(2000) })
      .then(r => r.json())
      .then(data => {
        const cc = data.country_code
        setCurrency(COUNTRY_CURRENCY[cc] || "USD")
      })
      .catch(() => setCurrency("USD"))
  }, [])

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      style={{ background: C.navy, color: C.white, fontFamily: isRTL ? "'Segoe UI','Tahoma',Arial,sans-serif" : "'Segoe UI','PingFang SC',Arial,sans-serif", overflowX: "hidden" }}
    >
      <style>{`
        html, body { overflow-x: hidden; margin: 0; padding: 0; }

        /* Desktop layout helpers */
        .l-nav-links { display: flex; }
        /* Text gets the room it needs; the video column is sized to the phone-
           shaped clip so the composition doesn't leave dead space around it. */
        .l-hero-grid { display: grid; grid-template-columns: 1fr 400px; gap: 72px; align-items: center; }
        .l-hero-grid > * { min-width: 0; }
        .l-hero-video { display: flex; justify-content: center; align-items: center; }

        /* Hide side gradient masks on desktop */
        .yt-side-mask { display: none; }

        /* Clip YouTube Shorts channel bar (top) and watermark (bottom).
           NOTE: the YouTube API *replaces* its target node with the iframe, so
           #yt-hero-player is the iframe itself — not a parent of one. The clip
           has to live on the wrapper, and the offsets on the iframe by id. */
        .yt-clip { overflow: hidden !important; }
        iframe#yt-hero-player {
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
            border: none !important;
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
        .l-reviews-grid { display: grid; grid-template-columns: 300px 1fr; gap: 48px; align-items: start; }
        .l-reviews-grid > * { min-width: 0; }

        /* Language button always visible */
        .l-nav-lang { display: flex; }

        /* Hover affordances — static, hover-less UI is a big part of what
           reads as unfinished. */
        .l-nav-links a:hover { color: #fff !important; background: rgba(255,255,255,0.07); }
        .l-nav-login a:first-child:hover { background: rgba(255,255,255,0.07); }
        .l-nav-lang button:hover { border-color: rgba(255,255,255,0.22) !important; }
        .l-hero-ctas a { transition: filter 160ms, background 160ms, border-color 160ms; }
        .l-hero-ctas a:first-child:hover { filter: brightness(1.08); }
        .l-hero-ctas a:last-child:hover { background: rgba(255,255,255,0.08) !important; border-color: rgba(255,255,255,0.3) !important; }
        .l-plans-grid { display: flex; flex-direction: column; }
        .l-plan-row { transition: padding-left 160ms; }
        .l-plan-row:hover { padding-left: 10px; }
        .l-plan-row .l-plan-cta { opacity: 0; transition: opacity 160ms; }
        .l-plan-row:hover .l-plan-cta { opacity: 1; }

        /* Mobile bottom tab bar — hidden on desktop */
        .m-bottom-nav { display: none; }
        .m-wa-float { bottom: 24px; }

        @media (max-width: 768px) {
          .l-nav-links { display: none !important; }
          .l-nav-login { display: none !important; }
          .l-nav-lang { display: flex !important; }
          .yt-side-mask { display: block !important; }
          .l-reviews-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
          .l-how-layout { grid-template-columns: 1fr !important; gap: 40px !important; }
          .l-how-sticky { position: static !important; }
          .l-inside-row { grid-template-columns: 1fr !important; gap: 20px !important; margin-bottom: 40px !important; }
          .l-inside-row > div { order: unset !important; }
          .l-course-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
          .l-course-grid > div:last-child { order: -1; aspect-ratio: 16/9 !important; }
          .l-plan-row { flex-wrap: wrap !important; }
          .l-plan-row .l-plan-cta { opacity: 1 !important; }

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
            box-shadow: 0 -8px 40px rgba(0,0,0,0.45), 0 -1px 0 rgba(255,92,86,0.07);
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
          background: #ff5c56;
        }
        .m-tab-label {
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.02em;
        }
      `}</style>

      {/* ── Nav ─────────────────────────────────────────────── */}
      <nav style={{ background: "rgba(20,32,64,0.82)", backdropFilter: "blur(20px) saturate(1.6)", WebkitBackdropFilter: "blur(20px) saturate(1.6)", borderBottom: `1px solid ${C.border}`, position: "sticky", top: 0, zIndex: 100 }}>
        {/* 1fr auto 1fr keeps the centre column optically centred regardless of
            how wide the brand or the action cluster happen to be. */}
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: 68, display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", gap: 16 }}>
          <div className="l-nav-links" style={{ gridColumn: "1", gap: 4, alignItems: "center", justifyContent: "start" }}>
            <a href="#courses" style={{ fontSize: 13.5, color: "rgba(255,255,255,0.72)", textDecoration: "none", fontWeight: 500, whiteSpace: "nowrap", padding: "8px 14px", borderRadius: 8, transition: "color 150ms, background 150ms" }}>{t.nav.courses}</a>
          </div>

          <Link href="/" style={{ gridColumn: "2", display: "flex", alignItems: "center", gap: 11, textDecoration: "none", justifySelf: "center" }}>
            <img src="/logo.svg" alt="SpeakSure" width={38} height={38} style={{ borderRadius: 9, flexShrink: 0, display: "block" }} />
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ fontSize: 16.5, fontWeight: 800, color: C.white, lineHeight: 1.25, letterSpacing: "-0.01em" }}>SpeakSure</div>
              <div style={{ fontSize: 10.5, color: "rgba(255,255,255,0.45)", lineHeight: 1.25, letterSpacing: "0.02em" }}>English · 英语</div>
            </div>
          </Link>

          {/* Right cluster — language + auth actions grouped together */}
          <div style={{ gridColumn: "3", display: "flex", alignItems: "center", gap: 10, justifySelf: "end" }}>

          {/* Language toggle — always visible on mobile + desktop */}
          <div className="l-nav-lang" style={{ position: "relative", flexShrink: 0 }}>
            <button onClick={() => setShowLangMenu(v => !v)}
              style={{ background: showLangMenu ? "rgba(255,92,86,0.12)" : "rgba(255,255,255,0.05)", border: `1px solid ${showLangMenu ? C.borderGold : C.border}`, color: C.white, borderRadius: 10, padding: "8px 12px", fontSize: 13, cursor: "pointer", fontWeight: 600, display: "flex", alignItems: "center", gap: 7, lineHeight: 1 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" style={{ opacity: 0.8 }}>
                <circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3.5 9h17M3.5 15h17"/>
              </svg>
              {LANG_LABEL[lang]}
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5, transform: showLangMenu ? "rotate(180deg)" : "none", transition: "transform 180ms" }}>
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>
            {showLangMenu && (
              <>
                {/* backdrop to close on outside click */}
                <div onClick={() => setShowLangMenu(false)} style={{ position: "fixed", inset: 0, zIndex: 198 }} />
                <div style={{ position: "absolute", top: "calc(100% + 8px)", [isRTL ? "left" : "right"]: 0, zIndex: 199, background: "#1a2f5a", border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.4)", minWidth: 160 }}>
                  {LANG_CYCLE.map(l => (
                    <button key={l} onClick={() => { setLang(l); setShowLangMenu(false) }}
                      style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "12px 16px", background: lang === l ? "rgba(255,92,86,0.1)" : "transparent", border: "none", color: lang === l ? C.gold : C.white, fontSize: 13, fontWeight: lang === l ? 700 : 500, cursor: "pointer", textAlign: "left" }}>
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
            <Link href="/login" style={{ padding: "9px 18px", borderRadius: 10, color: "rgba(255,255,255,0.85)", fontWeight: 600, fontSize: 13.5, textDecoration: "none" }}>{t.nav.login}</Link>
            <Link href="/register" style={{ padding: "9px 18px", borderRadius: 10, background: C.gold, color: C.navy, fontWeight: 700, fontSize: 13.5, textDecoration: "none" }}>{t.nav.signup}</Link>
          </div>

          </div>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="l-hero-section" style={{ background: `linear-gradient(135deg, ${C.navyMid} 0%, ${C.navyLight} 60%, ${C.navyMid} 100%)`, padding: "92px 24px 84px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -160, right: -160, width: 520, height: 520, borderRadius: "50%", background: "rgba(255,92,86,0.05)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -80, left: -80, width: 360, height: 360, borderRadius: "50%", background: "rgba(255,92,86,0.04)", pointerEvents: "none" }} />

        <div className="l-hero-grid" style={{ maxWidth: 1200, margin: "0 auto" }}>
          {/* Text column */}
          <div className="l-hero-text-col">
            <p className="l-hero-badge" style={{ color: C.muted, fontSize: 14, fontWeight: 600, margin: "0 0 22px" }}>{t.hero.badge}</p>
            <h1 className="l-hero-h1" style={{ fontSize: "clamp(38px,4.6vw,62px)", fontWeight: 800, margin: "0 0 18px", lineHeight: 1.06, letterSpacing: "-0.035em" }}>
              {t.hero.h1a}<br />
              <span style={{ color: C.gold }}>{t.hero.h1b}</span>
            </h1>
            <p className="l-hero-sub" style={{ fontSize: 16.5, color: "rgba(255,255,255,0.62)", margin: "0 0 34px", lineHeight: 1.7, maxWidth: 430 }}>{t.hero.sub}</p>
            <div className="l-hero-ctas" style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 48 }}>
              <Link href="/register?redirect=%2Fclassroom%3Fcourse%3D6d1a4ea1-8fc3-4fdc-86a9-9228e52b977b" style={{ padding: "14px 26px", borderRadius: 11, background: C.gold, color: C.navy, fontWeight: 700, fontSize: 15, textDecoration: "none", letterSpacing: "-0.01em" }}>{t.hero.cta1}</Link>
              <a href="#courses" style={{ padding: "14px 26px", borderRadius: 11, border: `1px solid rgba(255,255,255,0.16)`, background: "rgba(255,255,255,0.03)", color: C.white, fontWeight: 600, fontSize: 15, textDecoration: "none", letterSpacing: "-0.01em" }}>{t.hero.cta2}</a>
            </div>
          </div>

          {/* Video column */}
          <div className="l-hero-video">
            <VideoHero style={{ width: "100%", maxWidth: 380, borderRadius: 22, border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 32px 80px -12px rgba(0,0,0,0.7)" }} />
          </div>
        </div>
      </section>

      {/* ── How it works ────────────────────────────────────── */}
      <section style={{ padding: "88px 20px", background: "#0a1830" }}>
        <div className="l-how-layout" style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "0.8fr 1.2fr", gap: 56, alignItems: "start" }}>
          <div className="l-how-sticky" style={{ position: "sticky", top: 100 }}>
            <p style={{ fontSize: 13, color: C.muted, margin: "0 0 10px", letterSpacing: "0.02em" }}>{t.how.eyebrow}</p>
            <h2 style={{ fontSize: "clamp(30px,3.6vw,44px)", fontWeight: 800, margin: "0 0 18px", lineHeight: 1.1, letterSpacing: "-0.025em" }}>{t.how.title}</h2>
            <p style={{ fontSize: 15.5, color: C.muted, margin: "0 0 32px", lineHeight: 1.7 }}>{t.how.sub}</p>
            <ExplainerVideo style={{ width: "100%", border: `1px solid ${C.border}` }} />
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {t.how.steps.map((s, i) => (
              <div key={i} style={{
                padding: i === 0 ? "0 0 28px" : "28px 0",
                borderTop: i === 0 ? "none" : `1px solid ${C.border}`,
              }}>
                <div style={{ fontSize: i === 0 ? 28 : 23, fontWeight: 700, color: C.white, marginBottom: 10, letterSpacing: "-0.02em" }}>{s.label}</div>
                <div style={{ fontSize: 16.5, color: C.muted, lineHeight: 1.7, maxWidth: 440 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Inside the classroom ─────────────────────────────── */}
      <section style={{ padding: "88px 20px", background: C.navy }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ maxWidth: 620, marginBottom: 64 }}>
            <h2 style={{ fontSize: "clamp(30px,3.6vw,44px)", fontWeight: 800, margin: "0 0 18px", lineHeight: 1.1, letterSpacing: "-0.025em" }}>A classroom that feels familiar</h2>
            <p style={{ fontSize: 16, color: C.muted, margin: 0, lineHeight: 1.7 }}>
              Simple and easy to navigate, like Google Classroom, built for learning English. Sign up, pick a class, meet your teacher and classmates, then follow along with assignments posted right where your live class links are.
            </p>
          </div>

          {[
            { src: "/explainer/dashboard.png", title: "Pick your class", desc: "After signing in, choose the course that matches your goal and see when your next live class starts." },
            { src: "/explainer/roster.png", title: "Meet your teacher & classmates", desc: "Every class has a real teacher and a roster of fellow students learning alongside you." },
            { src: "/explainer/classwork.png", title: "Join class & practice", desc: "Find your Zoom link and exercises organized by topic, so you always know what's next." },
          ].map((item, i) => (
            <div key={i} className="l-inside-row" style={{
              display: "grid",
              gridTemplateColumns: i % 2 === 0 ? "0.85fr 1.15fr" : "1.15fr 0.85fr",
              gap: 48, alignItems: "center",
              marginBottom: i < 2 ? 72 : 0,
            }}>
              <div className="l-inside-shot" style={{ order: i % 2 === 0 ? 2 : 1 }}>
                <div style={{ borderRadius: 10, overflow: "hidden", border: `1px solid ${C.border}` }}>
                  <div style={{ display: "flex", gap: 6, padding: "10px 14px", background: "#0a1830", borderBottom: `1px solid ${C.border}` }}>
                    <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#ff5f57" }} />
                    <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#febc2e" }} />
                    <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#28c840" }} />
                  </div>
                  <div style={{ position: "relative", width: "100%", aspectRatio: "1399/927", background: "#fffbfe" }}>
                    <Image src={item.src} alt={item.title} fill style={{ objectFit: "contain" }} />
                  </div>
                </div>
              </div>
              <div style={{ order: i % 2 === 0 ? 1 : 2 }}>
                <h3 style={{ fontSize: "clamp(26px,2.6vw,34px)", fontWeight: 800, margin: "0 0 14px", lineHeight: 1.15, letterSpacing: "-0.02em" }}>{item.title}</h3>
                <p style={{ fontSize: 17, color: C.muted, lineHeight: 1.7, margin: 0, maxWidth: 420 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── The Course ──────────────────────────────────────── */}
      <section id="courses" style={{ padding: "72px 20px", background: C.navy }}>
        <div className="l-course-grid" style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
          <div>
            <p style={{ fontSize: 13, color: C.muted, margin: "0 0 10px" }}>{t.course.eyebrow}</p>
            <h2 style={{ fontSize: 32, fontWeight: 800, margin: "0 0 8px", lineHeight: 1.15, letterSpacing: "-0.02em" }}>{t.course.title}</h2>
            <p style={{ fontSize: 17, fontWeight: 700, color: C.gold, margin: "0 0 16px" }}>{t.course.tagline}</p>
            <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.75, margin: "0 0 32px" }}>{t.course.sub}</p>

            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {t.course.features.map((f, i) => (
                <div key={i} style={{ display: "flex", gap: 14 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: C.navyCard, border: `1px solid ${C.border}`, color: C.gold, display: "grid", placeItems: "center", flexShrink: 0 }}>
                    {COURSE_ICONS[i]}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: C.white, marginBottom: 4 }}>{f.label}</div>
                    <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.6 }}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ position: "relative", borderRadius: 16, overflow: "hidden", aspectRatio: "4/3" }}>
            <Image src={courses[0].photo} alt={t.course.title} fill style={{ objectFit: "cover" }} unoptimized />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(13,30,61,0.6), transparent 40%)" }} />
          </div>
        </div>
      </section>

      {/* ── Pricing plans ────────────────────────────────────── */}
      <section id="pricing" style={{ padding: "88px 20px", background: C.navy }}>
        <div style={{ maxWidth: 980, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 48 }}>
            <h2 style={{ fontSize: "clamp(28px,3.2vw,38px)", fontWeight: 800, letterSpacing: "-0.02em", margin: 0 }}>{t.plans.title}</h2>
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setShowCurrencyMenu(!showCurrencyMenu)}
                style={{
                  padding: "8px 16px", borderRadius: 8, border: `1px solid ${C.border}`, background: "transparent",
                  color: C.muted, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
                }}
              >
                {currency} ▼
              </button>
              {showCurrencyMenu && (
                <div style={{
                  position: "absolute", top: "100%", right: 0, marginTop: 8, minWidth: 120,
                  background: C.navyCard, borderRadius: 8, border: `1px solid ${C.border}`, zIndex: 50,
                  overflow: "hidden",
                }}>
                  {(["USD", "MYR", "SAR", "CNY"] as Currency[]).map(curr => (
                    <button
                      key={curr}
                      onClick={() => { setCurrency(curr); setShowCurrencyMenu(false) }}
                      style={{
                        display: "block", width: "100%", padding: "10px 16px", textAlign: "left",
                        background: currency === curr ? C.navyLight : "transparent",
                        color: currency === curr ? C.gold : C.white, border: "none",
                        fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
                      }}
                    >
                      {curr}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="l-plans-grid">
            {PRICING_TIERS[currency].map((tier, i) => (
              <Link
                key={i}
                href={`/enroll?plan=${encodeURIComponent(tier.label)}&price=${encodeURIComponent(tier.price)}`}
                className="l-plan-row"
                style={{
                  display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 20,
                  padding: "26px 4px", borderTop: i === 0 ? `1px solid ${C.border}` : "none",
                  borderBottom: `1px solid ${C.border}`, textDecoration: "none", color: "inherit",
                }}
              >
                <div style={{ display: "flex", alignItems: "baseline", gap: 14, minWidth: 0 }}>
                  <span style={{ fontSize: tier.best ? 22 : 18, fontWeight: tier.best ? 800 : 600, color: C.white }}>{tier.label}</span>
                  {tier.best && <span style={{ fontSize: 12, fontWeight: 700, color: C.gold, letterSpacing: "0.04em" }}>{t.plans.best.toUpperCase()}</span>}
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 20, flexShrink: 0 }}>
                  <span style={{ fontSize: tier.best ? 30 : 22, fontWeight: 800, color: tier.best ? C.gold : C.white }}>{tier.price}</span>
                  <span className="l-plan-cta" style={{ fontSize: 14, fontWeight: 700, color: C.gold }}>{t.plans.enroll} →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reviews ─────────────────────────────────────────── */}
      <section style={{ padding: "88px 20px", background: "#0a1830" }}>
        <div className="l-reviews-grid" style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "0.65fr 1.35fr", gap: 64, alignItems: "start" }}>
          <div>
            <h2 style={{ fontSize: "clamp(28px,3.2vw,38px)", fontWeight: 800, margin: "0 0 28px", lineHeight: 1.15, letterSpacing: "-0.02em" }}>{t.reviewsTitle}</h2>
            <div style={{ fontSize: 56, fontWeight: 900, color: C.gold, lineHeight: 1 }}>4.9</div>
            <Stars count={5} size={16} />
            <p style={{ fontSize: 13.5, color: C.muted, margin: "8px 0 28px" }}>{t.courseRate} · 574 reviews</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 9, maxWidth: 220 }}>
              {t.ratingBars.map(r => (
                <div key={r.stars} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 12, color: C.muted, width: 12 }}>{r.stars}</span>
                  <div style={{ flex: 1, height: 4, borderRadius: 4, background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${r.pct}%`, background: C.gold, borderRadius: 4 }} />
                  </div>
                  <span style={{ fontSize: 11, color: C.muted, width: 30, textAlign: "right" }}>{r.pct}%</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            {reviews.map((r, i) => (
              <div key={i} style={{ padding: i === 0 ? "0 0 28px" : "28px 0", borderTop: i === 0 ? "none" : `1px solid ${C.border}` }}>
                <Stars count={r.stars} size={14} />
                <p style={{ fontSize: 17, color: C.white, margin: "12px 0 14px", lineHeight: 1.6, fontWeight: 500, maxWidth: 560 }}>
                  “{r.comment[lang]}”
                </p>
                <div style={{ fontSize: 13, color: C.muted }}>
                  <span style={{ fontWeight: 700, color: C.white }}>{r.name}</span> · {r.date}
                </div>
              </div>
            ))}
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
        style={{ position: "fixed", left: 24, zIndex: 499, width: 68, height: 68, borderRadius: "50%", background: "#25d366", display: "grid", placeItems: "center", boxShadow: "0 4px 18px rgba(37,211,102,0.5)", textDecoration: "none" }}>
        <svg width="34" height="34" viewBox="0 0 24 24" fill="white">
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
