import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { courses } from "@/lib/courses"

export default function DashboardPage() {
  return (
    <div className="flex gap-6 p-6 max-w-7xl mx-auto">
      {/* Side panel */}
      <aside className="hidden lg:flex flex-col gap-4 w-64 shrink-0">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            SpeakSure / 口语课堂
          </p>
          <h1 className="text-2xl font-bold">English classrooms</h1>
          <p className="text-sm text-muted-foreground">
            Live English courses for adult Chinese students. Pick a class, check the stream, and
            continue your practice.
          </p>
        </div>

        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4 flex gap-3">
            <div className="mt-0.5 text-primary">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M7 3v4M17 3v4M4 8h16M5 5h14v15H5z" />
              </svg>
            </div>
            <div>
              <strong className="text-sm">Today</strong>
              <p className="text-xs text-muted-foreground mt-0.5">
                IELTS speaking class starts at 19:00 China time.
              </p>
            </div>
          </CardContent>
        </Card>

        <Link
          href="/classroom"
          className="text-sm text-primary font-medium hover:underline"
        >
          Continue learning / 继续学习
        </Link>
      </aside>

      {/* Main content */}
      <section className="flex-1 flex flex-col gap-6">
        {/* Quick actions */}
        <div className="flex gap-3">
          {[
            { label: "Open stream", href: "/classroom" },
            { label: "View classwork", href: "/classroom?tab=classwork" },
            { label: "Today's class", href: "/classroom?tab=stream" },
          ].map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-muted/50 text-sm font-medium hover:bg-muted transition-colors text-center"
            >
              {action.label}
            </Link>
          ))}
        </div>

        {/* Welcome banner */}
        <Card>
          <CardContent className="p-4 flex gap-3 items-start">
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold shrink-0">
              S
            </div>
            <div>
              <strong className="text-sm">Welcome to SpeakSure</strong>
              <p className="text-sm text-muted-foreground mt-0.5">
                Choose the English class that matches your goal: work, IELTS speaking, interviews,
                travel, or presentations.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Section header */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Classes / 课程
            </p>
            <h2 className="text-lg font-semibold">Pick a course to preview</h2>
          </div>
          <span className="text-sm text-muted-foreground">6 live course previews</span>
        </div>

        {/* Course grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {courses.map((course) => (
            <Link key={course.id} href={`/classroom?course=${course.id}`}>
              <Card className="h-full hover:shadow-md transition-shadow overflow-hidden cursor-pointer">
                <div className={`${course.color} px-4 py-5 text-white`}>
                  <h3 className="font-semibold text-base">{course.title}</h3>
                  <p className="text-white/80 text-sm">{course.titleZh}</p>
                  <p className="text-white/70 text-xs mt-1">{course.teacher}</p>
                </div>
                <CardContent className="p-4 flex flex-col gap-2">
                  <p className="text-sm font-medium">Next: {course.nextTopic}</p>
                  <p className="text-sm text-muted-foreground">{course.description}</p>
                  <div className="flex items-center justify-between mt-1">
                    <Badge variant="secondary" className="text-xs">{course.level}</Badge>
                    <span className="text-xs text-muted-foreground">{course.schedule}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
