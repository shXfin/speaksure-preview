"use client"

import { Suspense } from "react"
import ClassroomView from "./ClassroomView"

export default function ClassroomPage() {
  return (
    <Suspense>
      <ClassroomView />
    </Suspense>
  )
}
