import { LucideIcon } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface BadgeCardProps {
  name: string
  description: string
  emoji: string
  progress: number
  earned: boolean
}

export function BadgeCard({ name, description, emoji, progress, earned }: BadgeCardProps) {
  return (
    <div className={cn(
      "flex items-center gap-3 p-2 rounded-md transition-all",
      earned 
        ? "bg-primary/5 border-primary/30" 
        : "bg-muted/5"
    )}>
      <div className={cn(
        "w-8 h-8 rounded-full flex items-center justify-center text-lg shrink-0",
        earned 
          ? "bg-primary/10 text-primary" 
          : "bg-muted/10 text-muted-foreground"
      )}>
        {emoji}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-sm truncate">{name}</h3>
          <span className="text-xs font-medium rounded-full px-1.5 py-0.5 bg-muted ml-1 shrink-0">
            {earned ? "Earned" : `${progress}%`}
          </span>
        </div>
        {!earned && (
          <Progress value={progress} className="h-1 mt-1.5" />
        )}
      </div>
    </div>
  )
} 