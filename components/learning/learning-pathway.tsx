import { FileCheck } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Lock, Star, Clock, Trophy, ChevronRight, ChevronDown } from "lucide-react"

// Define the data structure
export interface Module {
  id: number
  title: string
  isCompleted: boolean
  lessons: {
    id: number
    title: string
    description: string
    progress: number
    status: "completed" | "in-progress" | "not-started" | "locked"
    lessons?: number
    completedLessons?: number
  }[]
}

export interface Lesson {
  id: number
  title: string
  description: string
  progress: number
  status: "completed" | "in-progress" | "not-started" | "locked"
  difficulty?: string
  estimatedTime?: string
  points?: number
  completedSteps?: number
  totalSteps?: number
}

interface LearningPathwayProps {
  lessons: Lesson[]
  title: string
  description?: string
  progress: number
}

export function LearningPathway({ lessons, title, description, progress }: LearningPathwayProps) {
  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case "beginner":
        return "text-blue-500"
      case "intermediate":
        return "text-blue-500"
      case "advanced":
        return "text-orange-500"
      case "expert":
        return "text-red-500"
      default:
        return "text-muted-foreground"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-blue-500 text-white"
      case "in-progress":
        return "bg-blue-500 text-white"
      case "not-started":
        return "bg-primary text-primary-foreground"
      case "locked":
        return "bg-muted text-muted-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getPathColor = (index: number, lessons: Lesson[]) => {
    // If current and next lesson are completed, show blue path
    if (index < lessons.length - 1 && 
        lessons[index].status === "completed" && 
        lessons[index + 1].status === "completed") {
      return "rgba(59, 130, 246, 0.8)"; // blue-500
    }
    
    // If current is completed and next is in-progress, show blue path
    if (index < lessons.length - 1 && 
        lessons[index].status === "completed" && 
        lessons[index + 1].status === "in-progress") {
      return "rgba(59, 130, 246, 0.8)"; // blue-500
    }
    
    // Default path color
    return "rgba(100, 100, 100, 0.2)";
  };

  return (
    <div className="relative mx-auto max-w-4xl pb-10">
      {/* Path header */}
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        {description && <p className="text-muted-foreground mb-2">{description}</p>}
        <div className="flex items-center justify-center gap-2">
          <div className="h-2 w-64 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary" 
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-sm text-muted-foreground">{progress}% complete</span>
        </div>
      </div>

      {/* Duolingo-style pathway */}
      <div className="relative">
        {/* Lessons */}
        <div className="relative z-10">
          <div className="flex flex-col items-center">
            {lessons.map((lesson, index) => (
              <div key={lesson.id} className="w-full">
                {/* Sequence indicator before lesson (except for the first lesson) */}
                {index > 0 && (
                  <div className="flex justify-center my-6">
                    <div className={`
                      h-8 w-8 rounded-full flex items-center justify-center shadow-sm
                      ${lessons[index-1].status === "completed" ? "bg-blue-100 text-blue-500" : "bg-muted text-muted-foreground"}
                    `}>
                      <ChevronDown className="h-5 w-5" />
                    </div>
                  </div>
                )}
                
                <div className={`
                  flex flex-col items-center
                  md:flex-row md:items-start
                  ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}
                  relative
                  mb-6
                `}>
                  {/* Lesson circle */}
                  <div className={`
                    ${getStatusColor(lesson.status)}
                    h-16 w-16 rounded-full flex items-center justify-center text-xl font-bold shadow-lg
                    mb-4 md:mb-0 relative z-10
                    ${index % 2 === 0 ? 'md:ml-[calc(25%-8rem)]' : 'md:mr-[calc(25%-8rem)]'}
                    border-4 border-white
                  `}>
                    {lesson.status === "completed" && (
                      <CheckCircle className="absolute -top-1 -right-1 h-6 w-6 bg-white rounded-full text-blue-500" />
                    )}
                    {index + 1}
                  </div>
                  
                  {/* Lesson card */}
                  <Card className={`
                    w-full max-w-md shadow-md gap-y-3
                    ${index % 2 === 0 ? 'md:ml-4' : 'md:mr-4 md:order-first'}
                    ${lesson.status === "completed" ? "border-blue-500" : 
                      lesson.status === "in-progress" ? "border-blue-500" : 
                      lesson.status === "not-started" ? "border-blue-300" :
                      "border-muted"}
                  `}>
                    <CardHeader className="pb-1">
                      <CardTitle className="text-lg flex justify-between items-center">
                        <span>{lesson.title}</span>
                        {lesson.points && (
                          <Badge className="bg-amber-100 text-amber-800">
                            <Trophy className="mr-1 h-3 w-3" /> {lesson.points} XP
                          </Badge>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">{lesson.description}</p>
                      
                      <div className="flex flex-wrap gap-3 mb-3 text-xs text-muted-foreground">
                        {lesson.difficulty && (
                          <div className="flex items-center">
                            <Star className={`h-3.5 w-3.5 mr-1 ${getDifficultyColor(lesson.difficulty)}`} />
                            <span className="capitalize">{lesson.difficulty}</span>
                          </div>
                        )}
                        {lesson.estimatedTime && (
                          <div className="flex items-center">
                            <Clock className="h-3.5 w-3.5 mr-1" />
                            {lesson.estimatedTime}
                          </div>
                        )}
                      </div>
                      
                      {lesson.status === "in-progress" && (
                        <>
                          <div className="flex justify-between text-sm text-muted-foreground mb-2">
                            <span>Progress</span>
                            <span>{lesson.progress}%</span>
                          </div>
                          <Progress value={lesson.progress} className="h-2" />
                          {lesson.completedSteps !== undefined && lesson.totalSteps !== undefined && (
                            <div className="mt-3 text-sm text-muted-foreground">
                              {lesson.completedSteps} of {lesson.totalSteps} steps completed
                            </div>
                          )}
                        </>
                      )}
                    </CardContent>
                    <CardFooter>
                      {lesson.status === "completed" && (
                        <Button variant="outline" className="w-full">
                          Review
                        </Button>
                      )}
                      {lesson.status === "in-progress" && (
                        <Button className="w-full">
                          Continue
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      )}
                      {lesson.status === "not-started" && (
                        <Link href={`/learn/intro`}>
                          <Button className="w-full" size="lg">
                            Start Lesson
                            <ChevronRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      )}
                      {lesson.status === "locked" && (
                        <Button variant="outline" className="w-full" disabled>
                          <Lock className="mr-2 h-4 w-4" />
                          Complete Previous Lessons
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final checkpoint */}
        <div className="flex justify-center mt-8">
          <div className="bg-amber-400 border-4 border-white rounded-full p-4 bg-background z-10 shadow-lg">
            <FileCheck className="h-8 w-8 text-black" />
          </div>
        </div>
        <div className="text-center mt-4">
          <h3 className="font-semibold">Learning Path Complete!</h3>
          <p className="text-sm text-muted-foreground">You've mastered all scam awareness lessons</p>
        </div>
      </div>
    </div>
  )
} 