import Image from "next/image"
import Link from "next/link"
import { CheckCircle, Clock } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface CourseCardProps {
  id: number
  title: string
  description: string
  progress: number
  status: "in-progress" | "completed" | "not-started"
  lessons: number
  completedLessons: number
  image: string
}

export function CourseCard({
  id,
  title,
  description,
  progress,
  status,
  lessons,
  completedLessons,
  image,
}: CourseCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-40 w-full">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
        {status === "completed" && (
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <CheckCircle className="mr-1 h-3 w-3" /> Completed
            </Badge>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground mb-3">{description}</p>
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
          <span>{completedLessons} of {lessons} lessons</span>
          <span>{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
        {status === "in-progress" && (
          <div className="flex items-center mt-3 text-xs text-muted-foreground">
            <Clock className="h-3 w-3 mr-1" />
            <span>Last activity: 2 days ago</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link href={`/learn/${id}`} className="w-full">
          <Button 
            variant={status === "completed" ? "outline" : "default"} 
            className="w-full"
          >
            {status === "completed" ? "Review" : status === "in-progress" ? "Continue" : "Start"}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
} 