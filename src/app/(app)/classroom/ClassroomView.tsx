"use client"

import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { courses } from "@/lib/courses"

export default function ClassroomView() {
  const searchParams = useSearchParams()
  const courseId = searchParams.get("course") ?? "business"
  const defaultTab = searchParams.get("tab") ?? "stream"

  const course = courses.find((c) => c.id === courseId) ?? courses[0]
  const [tab, setTab] = useState(defaultTab)

  return (
    <div className="flex flex-col">
      {/* Banner */}
      <div className={`${course.color} text-white px-6 py-8`}>
        <p className="text-white/70 text-sm mb-1">SpeakSure classroom</p>
        <h1 className="text-2xl font-bold">{course.title}</h1>
        <p className="text-white/80 text-sm mt-1">
          {course.titleZh} · {course.teacher} · {course.level}
        </p>
      </div>

      {/* Tabs */}
      <Tabs value={tab} onValueChange={setTab} className="flex-1">
        <TabsList className="w-full justify-start rounded-none border-b border-border bg-background h-auto px-6 gap-1">
          {["stream", "classwork", "people", "progress"].map((t) => (
            <TabsTrigger
              key={t}
              value={t}
              className="capitalize rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent pb-3 pt-3"
            >
              {t}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Stream */}
        <TabsContent value="stream" className="m-0">
          <div className="flex gap-6 p-6 max-w-7xl mx-auto">
            <aside className="hidden lg:flex flex-col gap-4 w-56 shrink-0">
              <Card>
                <CardContent className="p-4 flex flex-col gap-3">
                  <h2 className="font-semibold text-sm">Upcoming</h2>
                  <p className="text-xs text-muted-foreground">{course.schedule} China time</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="8" /><path d="M12 7v5l4 2" />
                    </svg>
                    Voice task due this week
                  </div>
                  <div className="border-t border-border pt-3">
                    <p className="text-xs text-muted-foreground">Class code</p>
                    <strong className="text-sm font-mono">{course.classCode}</strong>
                  </div>
                </CardContent>
              </Card>
            </aside>

            <div className="flex-1 flex flex-col gap-4">
              <Card className="border-dashed">
                <CardContent className="p-4 flex gap-3 items-center">
                  <Avatar className="w-9 h-9 bg-muted">
                    <AvatarFallback>+</AvatarFallback>
                  </Avatar>
                  <div>
                    <strong className="text-sm">Share something with your class</strong>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Ask a speaking question or send your practice note before the live lesson.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 flex gap-3 items-start">
                  <Avatar className="w-9 h-9 bg-primary">
                    <AvatarFallback className="text-primary-foreground bg-primary">
                      {course.teacher[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <strong className="text-sm">{course.streamTitle}</strong>
                    <p className="text-sm text-muted-foreground mt-0.5">{course.streamText}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-muted/40">
                <CardContent className="p-4 flex gap-3 items-start">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path d="M8 5h8M8 11h8M8 15h5M6 3h12v18H6z" />
                    </svg>
                  </div>
                  <div>
                    <strong className="text-sm">Speaking assignment</strong>
                    <p className="text-sm text-muted-foreground mt-0.5">{course.assignmentText}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Classwork */}
        <TabsContent value="classwork" className="m-0">
          <div className="p-6 max-w-3xl mx-auto">
            <Card>
              <CardContent className="p-6 flex flex-col gap-4">
                <div>
                  <h2 className="text-lg font-semibold">Classwork / 课堂任务</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Organized like a real classroom: live lesson prep, practice work, resources, and feedback.
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  {["Live lesson prep", "Speaking practice", "Vocabulary resources", "Teacher feedback"].map((task, i) => (
                    <div key={task} className="flex items-center gap-3 p-3 rounded-lg border border-border">
                      <div className={`w-2 h-2 rounded-full ${i === 0 ? "bg-green-500" : i === 1 ? "bg-amber-500" : "bg-muted-foreground/30"}`} />
                      <span className="text-sm font-medium">{task}</span>
                      <Badge variant="outline" className="ml-auto text-xs">
                        {i === 0 ? "Due soon" : i === 1 ? "In progress" : "Upcoming"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* People */}
        <TabsContent value="people" className="m-0">
          <div className="p-6 max-w-3xl mx-auto">
            <Card>
              <CardContent className="p-6 flex flex-col gap-5">
                <h2 className="text-lg font-semibold">People / 成员</h2>
                <div className="flex gap-4 items-start">
                  <Avatar className="w-12 h-12 bg-primary shrink-0">
                    <AvatarFallback className="text-primary-foreground bg-primary font-semibold">
                      {course.teacher[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <strong className="text-sm">{course.teacher}</strong>
                    <Badge className="ml-2 text-xs" variant="secondary">Teacher</Badge>
                    <p className="text-sm text-muted-foreground mt-1">{course.teacherBio}</p>
                  </div>
                </div>
                <div className="border-t border-border pt-4">
                  <h3 className="text-sm font-medium mb-3">Learning outcomes</h3>
                  <ul className="flex flex-col gap-2">
                    {course.outcomes.map((outcome) => (
                      <li key={outcome} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <svg className="w-4 h-4 text-green-500 shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                          <path d="M5 12.5l4.5 4.5L19 7" />
                        </svg>
                        {outcome}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Progress */}
        <TabsContent value="progress" className="m-0">
          <div className="p-6 max-w-3xl mx-auto">
            <Card>
              <CardContent className="p-6 flex flex-col gap-4">
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Progress / 学习进度
                  </p>
                  <h2 className="text-lg font-semibold mt-1">{course.title} progress</h2>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { value: "3", label: "Tasks completed" },
                    { value: "2", label: "Teacher feedback notes" },
                    { value: "85%", label: "Attendance" },
                  ].map((stat) => (
                    <Card key={stat.label} className="bg-muted/40">
                      <CardContent className="p-4 flex flex-col gap-1">
                        <strong className="text-2xl font-bold">{stat.value}</strong>
                        <span className="text-xs text-muted-foreground">{stat.label}</span>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
