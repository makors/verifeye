import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Lock, Trophy } from "lucide-react"

interface Lesson {
  id: number
  title: string
  description: string
  progress: number
  status: "completed" | "in-progress" | "not-started" | "locked"
  lessons?: number
  completedLessons?: number
}

interface LearningModuleProps {
  title: string
  lessons: Lesson[]
  isCompleted: boolean
  moduleNumber: number
}

export function LearningModule({ title, lessons, isCompleted, moduleNumber }: LearningModuleProps) {
  return (
    <div className="relative z-10 mb-16">
      <div className="flex items-center justify-center mb-4">
        <div className={`${isCompleted ? "bg-primary" : "bg-muted"} ${isCompleted ? "text-primary-foreground" : "text-muted-foreground"} rounded-full px-6 py-2 text-lg font-semibold shadow-md`}>
          Module {moduleNumber}: {title}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {lessons.map((lesson, index) => (
          <Card 
            key={lesson.id}
            className={`
              ${lesson.status === "completed" ? "bg-primary/5 border-primary/30" : 
                lesson.status === "in-progress" ? "border-primary" : 
                "bg-muted/40 border-muted"} 
              shadow-md overflow-hidden bg-background z-10
            `}
          >
            {lesson.status === "completed" && (
              <div className="absolute top-2 right-2">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  <CheckCircle className="mr-1 h-3 w-3" /> Completed
                </Badge>
              </div>
            )}
            {lesson.status === "locked" && (
              <div className="absolute top-2 right-2">
                <Badge variant="outline" className="bg-background">
                  <Lock className="mr-1 h-3 w-3" /> Locked
                </Badge>
              </div>
            )}
            <CardHeader className="pb-2">
              <CardTitle className={`flex items-center ${lesson.status === "locked" ? "text-muted-foreground" : ""}`}>
                <div className={`flex h-8 w-8 items-center justify-center rounded-full ${lesson.status === "locked" ? "bg-muted text-muted-foreground" : "bg-primary text-primary-foreground"} mr-2`}>
                  {index + 1}
                </div>
                {lesson.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">{lesson.description}</p>
              {lesson.status === "in-progress" && (
                <>
                  <div className="flex justify-between text-sm text-muted-foreground mb-2">
                    <span>Progress</span>
                    <span>{lesson.progress}%</span>
                  </div>
                  <Progress value={lesson.progress} className="h-2" />
                  {lesson.completedLessons !== undefined && lesson.lessons !== undefined && (
                    <div className="mt-3 text-sm text-muted-foreground">
                      {lesson.completedLessons} of {lesson.lessons} lessons completed
                    </div>
                  )}
                </>
              )}
              {lesson.status === "completed" && <Progress value={100} className="h-2" />}
              {lesson.status === "not-started" && <Progress value={0} className="h-2" />}
              {lesson.status === "locked" && <Progress value={0} className="h-2" />}
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
                </Button>
              )}
              {lesson.status === "not-started" && (
                <Button className="w-full">
                  Start
                </Button>
              )}
              {lesson.status === "locked" && (
                <Button variant="outline" className="w-full" disabled>
                  {index === 0 ? "Complete Previous Modules" : "Complete Previous Lessons"}
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Checkpoint */}
      <div className="flex justify-center mb-8">
        <div className={`${isCompleted ? "bg-primary/10 border-primary/30" : "bg-muted/40 border-muted"} border rounded-full p-4 bg-background z-10`}>
          <Trophy className={`h-8 w-8 ${isCompleted ? "text-primary" : "text-muted-foreground"}`} />
        </div>
      </div>
    </div>
  )
} 