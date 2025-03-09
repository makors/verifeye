"use client"
import Link from "next/link"
import {
  Award,
  CheckCircle,
  ChevronRight,
  Crown,
  Trophy,
  BookOpen,
  Flame,
  Target,
  Zap,
  Clock,
  History
} from "lucide-react"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { authClient } from "@/lib/auth-client"
import { Skeleton } from "@/components/ui/skeleton"
import { BadgeCard } from "@/components/dashboard/badge-card"
import { ActivityCard } from "@/components/dashboard/activity-card"
import { badges, learningPath } from "@/lib/learning-data"
import { Progress } from "@/components/ui/progress"
import { getUserActivities } from "@/lib/actions/activity"
import { getUserXP } from "@/lib/actions/user"

export default function Dashboard() {
  const {
    data: session,
    isPending,
  } = authClient.useSession();
  
  const [userActivities, setUserActivities] = useState<any[]>([]);
  const [activitiesLoading, setActivitiesLoading] = useState(true);
  const [totalXP, setTotalXP] = useState(0);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setActivitiesLoading(true);
        const { activities } = await getUserActivities(5);
        const { xp } = await getUserXP();
        
        setUserActivities(activities || []);
        setTotalXP(typeof xp === 'number' ? xp : 0);
      } catch (error) {
        console.error("Error fetching activities:", error);
      } finally {
        setActivitiesLoading(false);
      }
    };

    fetchActivities();
  }, []);

  // Calculate stats
  const totalLessons = learningPath.lessons.length;
  const completedLessons = learningPath.lessons.filter((lesson) => (lesson.status as any) === "completed").length;
  const inProgressLessons = learningPath.lessons.filter((lesson) => (lesson.status as any) === "in-progress").length;
  const earnedBadges = badges.filter((badge) => badge.earned).length;
  const streak = 0; // Days streak

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {isPending ? <Skeleton className="w-60 h-8" /> : `Welcome, ${session?.user?.name}!`}
          </h1>
          <p className="text-muted-foreground">Begin your journey to learn about online scams and stay safe.</p>
        </div>
        <Link href="/learn">
          <Button className="bg-green-500 hover:bg-green-600">
            Start Learning
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      {/* Duolingo-style stats cards */}

      <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
        {/* Badges Section - Takes up 2 columns */}
        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Your Badges</CardTitle>
                <span className="text-xs text-muted-foreground">{earnedBadges} of {badges.length} earned</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-[calc(100vh-16rem)] overflow-y-auto pr-1">
                {badges.map((badge) => (
                  <BadgeCard
                    key={badge.id}
                    name={badge.name}
                    description={badge.description}
                    emoji={badge.emoji}
                    progress={badge.progress}
                    earned={badge.earned}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content - Takes up 4 columns */}
        <div className="md:col-span-4 space-y-3">
          {/* Next lesson card */}
          <Card className="border-green-200 shadow-md">
            <CardHeader className=" border-green-100">
              <CardTitle className="text-lg flex items-center">
                <Zap className="mr-2 h-5 w-5 text-green-500" />
                Start Your Learning Journey
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary text-primary-foreground h-10 w-10 rounded-full flex items-center justify-center font-bold text-lg">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{learningPath.lessons[0].title}</h3>
                    <p className="text-sm text-muted-foreground">{learningPath.lessons[0].description}</p>
                  </div>
                </div>
                
                <div className="flex items-center text-sm text-muted-foreground gap-4">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {learningPath.lessons[0].estimatedTime}
                  </div>
                  <div className="flex items-center">
                    <Trophy className="h-4 w-4 mr-1" />
                    {learningPath.lessons[0].points} XP
                  </div>
                </div>
                
                <div className="pt-2">
                  <Link href="/learn">
                    <Button className="w-full bg-green-500 hover:bg-green-600">
                      Start First Lesson
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card className="gap-y-4">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center">
                  <History className="mr-2 h-5 w-5 text-primary" />
                  Recent Activities
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              {activitiesLoading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-center gap-3 py-3">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-3 w-20" />
                      </div>
                      <Skeleton className="h-6 w-16 rounded-full" />
                    </div>
                  ))}
                </div>
              ) : userActivities.length > 0 ? (
                <div className="divide-y">
                  {userActivities.map((activity) => (
                    <ActivityCard
                      key={activity.id}
                      emoji={activity.emoji}
                      description={activity.description}
                      xpAmount={activity.xpAmount}
                      createdAt={new Date(activity.createdAt)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No activities yet. Start learning to earn XP!</p>
                  <Link href="/learn" className="mt-4 inline-block">
                    <Button variant="outline" size="sm">
                      Start Learning
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              )}
              
              {userActivities.length > 0 && (
                <div className="mt-4 text-center">
                  <Button variant="ghost" size="sm">
                    View All Activities
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

