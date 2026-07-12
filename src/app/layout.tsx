import type { Metadata } from "next"
import { Roboto } from "next/font/google"
import "./globals.css"

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-roboto",
  display: "swap",
})

export const metadata: Metadata = {
  title: "SpeakSure · English classes for Chinese learners",
  description: "Live English courses for adult Chinese students.",
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={roboto.variable}>
      <body style={{
        margin: 0,
        minWidth: 320,
        background: "#fffbfe",
        color: "#1d1b20",
        fontFamily: "'Roboto', Arial, 'Helvetica Neue', Helvetica, sans-serif",
        WebkitFontSmoothing: "antialiased",
      }}>
        {children}
      </body>
    </html>
  )
}
