import { m3, BrandMark, Avatar, GoogleSVG, OrDivider } from "@/lib/m3"
import { courses } from "@/lib/courses"

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section style={{ marginBottom: 48 }}>
    <h2 style={{ margin: "0 0 4px", fontSize: m3.font.lg, fontWeight: m3.font.bold, color: m3.color.text }}>{title}</h2>
    <div style={{ height: 2, background: m3.color.primarySoft, marginBottom: 24, borderRadius: 2 }} />
    {children}
  </section>
)

const Swatch = ({ color, name, hex }: { color: string; name: string; hex: string }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 6, minWidth: 80 }}>
    <div style={{ width: 80, height: 56, borderRadius: 10, background: color, border: "1px solid rgba(0,0,0,0.06)" }} />
    <span style={{ fontSize: 11, fontWeight: 700, color: m3.color.text }}>{name}</span>
    <span style={{ fontSize: 10, color: m3.color.muted, fontFamily: "monospace" }}>{hex}</span>
  </div>
)

export default function DesignPage() {
  return (
    <main style={{ width: "min(1100px, calc(100% - 48px))", margin: "0 auto", padding: "36px 0 80px", fontFamily: m3.font.family }}>
      <div style={{ marginBottom: 40 }}>
        <p style={m3.eyebrow}>SpeakSure Design System</p>
        <h1 style={{ margin: "0 0 8px", fontSize: m3.font["3xl"], fontWeight: m3.font.bold, letterSpacing: "-0.5px" }}>Style Guide</h1>
        <p style={{ margin: 0, ...m3.muted, fontSize: m3.font.md, lineHeight: 1.6 }}>
          Single source of truth for all UI decisions. Every page imports from <code style={{ background: m3.color.surfaceContainer, padding: "2px 6px", borderRadius: 4, fontSize: 13 }}>@/lib/m3</code>.
        </p>
      </div>

      {/* ── Colors ── */}
      <Section title="Color tokens">
        <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
          <Swatch color={m3.color.primary}          name="primary"          hex="#6750a4" />
          <Swatch color={m3.color.primarySoft}      name="primarySoft"      hex="#eaddff" />
          <Swatch color={m3.color.primaryDark}      name="primaryDark"      hex="#4f378b" />
          <Swatch color={m3.color.secondary}        name="secondary"        hex="#625b71" />
          <Swatch color={m3.color.secondaryDark}    name="secondaryDark"    hex="#4a4458" />
          <Swatch color={m3.color.tertiary}         name="tertiary"         hex="#7d5260" />
          <Swatch color={m3.color.tertiaryDark}     name="tertiaryDark"     hex="#633b48" />
          <Swatch color={m3.color.bg}               name="bg"               hex="#fffbfe" />
          <Swatch color={m3.color.surface}          name="surface"          hex="#ffffff" />
          <Swatch color={m3.color.surfaceContainer} name="surfaceContainer" hex="#f3edf7" />
          <Swatch color={m3.color.text}             name="text"             hex="#1d1b20" />
          <Swatch color={m3.color.muted}            name="muted"            hex="#625b71" />
          <Swatch color={m3.color.border}           name="border"           hex="#e8e0ef" />
        </div>
      </Section>

      {/* ── Typography ── */}
      <Section title="Typography">
        <div style={{ display: "flex", flexDirection: "column", gap: 16, ...m3.card, padding: 28 }}>
          {[
            { label: "Display / H1", size: m3.font["3xl"], weight: m3.font.bold, sample: "English classrooms" },
            { label: "Headline / H2", size: m3.font["2xl"], weight: m3.font.bold, sample: "Pick a course to preview" },
            { label: "Title / H3", size: m3.font.xl, weight: m3.font.bold, sample: "Business English · 商务英语" },
            { label: "Body Large", size: m3.font.md, weight: m3.font.regular, sample: "Live English courses for adult students worldwide." },
            { label: "Body Medium", size: m3.font.base, weight: m3.font.regular, sample: "Meetings, email, client updates, and workplace speaking practice." },
            { label: "Label / Caption", size: m3.font.xs, weight: m3.font.bold, sample: "CLASSES / 课程", upper: true },
          ].map(({ label, size, weight, sample, upper }) => (
            <div key={label} style={{ display: "flex", alignItems: "baseline", gap: 24, borderBottom: "1px solid #f3edf7", paddingBottom: 16 }}>
              <span style={{ minWidth: 160, fontSize: 11, color: m3.color.muted, fontFamily: "monospace" }}>{label}</span>
              <span style={{ fontSize: size, fontWeight: weight, textTransform: upper ? "uppercase" as const : undefined, letterSpacing: upper ? "0.8px" : undefined, color: upper ? m3.color.primary : m3.color.text }}>
                {sample}
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Elevation ── */}
      <Section title="Elevation / Shadows">
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          {([1, 2, 3] as const).map(level => (
            <div key={level} style={{ width: 160, height: 80, borderRadius: m3.radius.lg, background: "#fff", boxShadow: m3.shadow[level], display: "grid", placeItems: "center" }}>
              <span style={{ fontSize: 13, color: m3.color.muted }}>Level {level}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* ── Components ── */}
      <Section title="Buttons">
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
          <button style={{ ...m3.btnPrimary, width: "auto", padding: "0 28px" }}>Primary button</button>
          <button style={{ ...m3.btnOutline, width: "auto", padding: "0 28px" }}>Outline button</button>
          <button style={{ ...m3.btnOutline, width: "auto", padding: "0 28px" }}><GoogleSVG /> Continue with Google</button>
        </div>
      </Section>

      <Section title="Inputs">
        <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 400 }}>
          <div>
            <label style={m3.label}>Email address</label>
            <input type="email" placeholder="you@example.com" style={m3.input} readOnly />
          </div>
          <div>
            <label style={m3.label}>Password</label>
            <input type="password" placeholder="••••••••" style={m3.input} readOnly />
          </div>
          <OrDivider />
        </div>
      </Section>

      <Section title="Avatars">
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <BrandMark size={46} />
          <BrandMark size={36} />
          <Avatar initial="M" size={40} />
          <Avatar initial="D" size={40} bg={m3.color.secondaryDark} />
          <Avatar initial="S" size={40} bg={m3.color.tertiaryDark} />
          <Avatar initial="E" size={40} bg={m3.color.primaryDark} />
        </div>
      </Section>

      <Section title="Course card banners">
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {courses.map(c => (
            <div key={c.id} style={{ width: 180, height: 72, borderRadius: m3.radius.lg, background: c.bannerColor, padding: "12px 14px", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
              <strong style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{c.title}</strong>
              <small style={{ fontSize: 11, color: "rgba(255,255,255,0.8)" }}>{c.bannerColor}</small>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Badge / Chip">
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
          {["Intermediate", "Beginner+", "Band 5.5+", "Upper Intermediate", "Beginner"].map(label => (
            <span key={label} style={{ padding: "4px 12px", borderRadius: m3.radius.full, background: m3.color.primarySoft, color: m3.color.primary, fontSize: 12, fontWeight: 700 }}>
              {label}
            </span>
          ))}
          <span style={{ padding: "4px 12px", borderRadius: m3.radius.full, background: m3.color.surfaceContainer, color: m3.color.muted, fontSize: 12, fontWeight: 600 }}>
            Due Friday
          </span>
        </div>
      </Section>

      <Section title="Eyebrow / labels">
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <p style={m3.eyebrow}>CLASSES / 课程</p>
          <p style={m3.eyebrow}>SPEAKSURE / 口语课堂</p>
          <p style={{ ...m3.muted, fontSize: m3.font.base, margin: 0 }}>Muted text — secondary information</p>
        </div>
      </Section>

      <Section title="Spacing scale (8pt grid)">
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "flex-end" }}>
          {Object.entries(m3.space).map(([key, val]) => (
            <div key={key} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div style={{ width: val, height: val, background: m3.color.primarySoft, borderRadius: 3, border: `1px solid ${m3.color.primary}` }} />
              <span style={{ fontSize: 10, color: m3.color.muted, fontFamily: "monospace" }}>{val}px</span>
            </div>
          ))}
        </div>
      </Section>
    </main>
  )
}
