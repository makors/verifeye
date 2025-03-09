"use client"

import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { notFound, useParams } from "next/navigation"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { LearningPathway } from "@/components/learning/learning-pathway"
import { Course, courses } from "@/lib/learning-data"
import { authClient } from "@/lib/auth-client"
import { Skeleton } from "@/components/ui/skeleton"

export default function CoursePage() {
  const params = useParams()
  const courseId = params?.courseId as string
  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    // Find the course by ID
    const foundCourse = courses.find(c => c.id === courseId)
    setCourse(foundCourse || null)
    setLoading(false)
  }, [courseId])
  
  const {
    data: session,
    isPending,
  } = authClient.useSession();
  
  // Show loading state
  if (loading) {
    return (
      <div className="p-4 md:p-8">
        <Skeleton className="h-8 w-64 mb-4" />
        <Skeleton className="h-4 w-full max-w-md mb-8" />
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-16 w-16 rounded-full mx-auto" />
              <Skeleton className="h-32 w-full max-w-md mx-auto" />
            </div>
          ))}
        </div>
      </div>
    )
  }
  
  // If course not found, show 404
  if (!course) {
    notFound()
  }
  
  // If course is locked, redirect to courses page
  if (course.status === "locked") {
    // In a real app, you might want to show a message instead
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] space-y-4">
        <h1 className="text-2xl font-bold">This course is locked</h1>
        <p className="text-muted-foreground">Complete the previous course to unlock this one.</p>
        <Link href="/learn">
          <Button>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Courses
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-4 md:p-8">
      <div className="flex items-center mb-4">
        <Link href="/learn">
          <Button variant="ghost" size="sm" className="h-8 px-2">
            <ChevronLeft className="h-4 w-4" />
            Back to Courses
          </Button>
        </Link>
      </div>

      <LearningPathway 
        lessons={course.lessons} 
        title={course.title}
        description={course.description}
        progress={course.progress}
      />
    </div>
  )
} 