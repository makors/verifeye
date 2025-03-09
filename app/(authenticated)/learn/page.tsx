"use client"

import Link from "next/link"
import { ChevronRight, Clock, Lock, Star, BookOpen, Shield, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { courses } from "@/lib/learning-data"
import { authClient } from "@/lib/auth-client"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

// Function to get course-specific styling
const getCourseStyle = (courseId: string) => {
  switch (courseId) {
    case "fundamentals":
      return {
        color: "blue",
        icon: Shield,
        accentClass: "bg-blue-500",
        bgClass: "bg-blue-50",
        textClass: "text-blue-700",
        borderClass: "border-blue-200",
      }
    case "advanced":
      return {
        color: "purple",
        icon: BookOpen,
        accentClass: "bg-purple-500",
        bgClass: "bg-purple-50",
        textClass: "text-purple-700", 
        borderClass: "border-purple-200",
      }
    case "expert":
      return {
        color: "amber",
        icon: Zap,
        accentClass: "bg-amber-500",
        bgClass: "bg-amber-50",
        textClass: "text-amber-700",
        borderClass: "border-amber-200",
      }
    default:
      return {
        color: "blue",
        icon: Shield,
        accentClass: "bg-blue-500",
        bgClass: "bg-blue-50",
        textClass: "text-blue-700",
        borderClass: "border-blue-200",
      }
  }
}

export default function LearnPage() {
  const {
    data: session,
    isPending,
  } = authClient.useSession();

  return (
    <div className="space-y-8 p-4 md:p-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          {isPending ? <Skeleton className="w-60 h-10" /> : `Courses`}
        </h1>
        <p className="text-muted-foreground">
          Select a course to begin your learning journey
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {courses.map((course) => {
          const { icon: CourseIcon, accentClass, bgClass, textClass, borderClass } = getCourseStyle(course.id);
          
          return (
            <Card 
              key={course.id}
              className={cn(
                "overflow-hidden transition-all duration-300 hover:shadow-md",
                course.status === "locked" ? "opacity-80" : "",
                borderClass
              )}
            >
              {/* Header with clean design */}
              <div className="rounded-t-xl overflow-hidden">
                <div className={cn("h-48 relative", bgClass)}>
                  {/* Accent design element */}
                  <div className={`absolute top-0 right-0 w-24 h-24 -mr-6 -mt-6 rounded-full ${accentClass} opacity-20`}></div>
                  <div className={`absolute bottom-0 left-0 w-32 h-32 -ml-10 -mb-10 rounded-full ${accentClass} opacity-10`}></div>
                  
                  {/* Course icon and title */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                    <div className={`w-16 h-16 rounded-full ${accentClass} flex items-center justify-center mb-4`}>
                      <CourseIcon className="h-8 w-8 text-white" />
                    </div>
                    <h2 className={`text-2xl font-bold text-center ${textClass}`}>
                      {course.title}
                    </h2>
                  </div>
                  
                  {/* Lock overlay for locked courses */}
                  {course.status === "locked" && (
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center rounded-t-xl">
                      <div className="bg-white p-3 rounded-full shadow-md">
                        <Lock className="h-8 w-8 text-gray-400" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardDescription className="mt-1">{course.description}</CardDescription>
                  </div>
                  {course.status === "locked" && (
                    <Badge variant="outline" className="ml-2 shrink-0">
                      Locked
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4" />
                      <span className="capitalize">{course.difficulty}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {course.estimatedTime}
                    </div>
                  </div>
                  
                  {/* Show progress for all courses */}
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress 
                      value={course.progress} 
                      className={cn("h-2", course.status === "locked" ? "bg-gray-100" : bgClass)}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                {course.status === "locked" ? (
                  <Button variant="outline" className="w-full" disabled>
                    Complete Previous Course
                  </Button>
                ) : (
                  <Link href={`/learn/${course.id}`} className="w-full">
                    <Button className={cn("w-full", accentClass, "hover:opacity-90")}>
                      {course.progress > 0 ? "Continue Course" : "Start Course"}
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  )
} 