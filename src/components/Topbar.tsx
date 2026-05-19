"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Topbar() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 flex items-center gap-3 border-b border-border bg-background px-4 h-14">
      <Link href="/dashboard" className="flex items-center gap-2 mr-4">
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm">
          S
        </span>
        <span className="hidden sm:flex flex-col leading-tight">
          <strong className="text-sm font-semibold">SpeakSure</strong>
          <small className="text-xs text-muted-foreground">English classes for Chinese learners</small>
        </span>
      </Link>

      <nav className="flex items-center gap-1 flex-1">
        <Link
          href="/dashboard"
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
            pathname === "/dashboard"
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
        >
          Classes
        </Link>
        <Link
          href="/classroom"
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
            pathname.startsWith("/classroom")
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
        >
          Stream
        </Link>
      </nav>

      <div className="flex items-center gap-2 ml-auto">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted text-sm">
          <span className="text-muted-foreground">Student</span>
          <strong className="font-medium">学员</strong>
        </div>
      </div>
    </header>
  )
}
