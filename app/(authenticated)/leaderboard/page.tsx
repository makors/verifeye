"use client"

import { useEffect, useState } from "react"
import { Crown, Medal, Trophy, User } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { authClient } from "@/lib/auth-client"

// Type for leaderboard user
type LeaderboardUser = {
  id: string
  name: string
  image: string | null
  xp: number
  rank: number
  isCurrentUser: boolean
}

// Type for current user data
type CurrentUserData = LeaderboardUser & {
  rank: number
}

// Sample leaderboard data
const sampleLeaderboard: LeaderboardUser[] = [
  {
    id: "1",
    name: "Alex Johnson",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    xp: 8750,
    rank: 1,
    isCurrentUser: false
  },
  {
    id: "2",
    name: "Maria Garcia",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
    xp: 7200,
    rank: 2,
    isCurrentUser: false
  },
  {
    id: "3",
    name: "David Kim",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    xp: 6800,
    rank: 3,
    isCurrentUser: false
  },
  {
    id: "4",
    name: "Sarah Williams",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    xp: 5900,
    rank: 4,
    isCurrentUser: true
  },
  {
    id: "5",
    name: "James Smith",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    xp: 5600,
    rank: 5,
    isCurrentUser: false
  },
  {
    id: "6",
    name: "Emily Davis",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    xp: 4800,
    rank: 6,
    isCurrentUser: false
  },
  {
    id: "7",
    name: "Michael Brown",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    xp: 4200,
    rank: 7,
    isCurrentUser: false
  },
  {
    id: "8",
    name: "Jessica Wilson",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica",
    xp: 3900,
    rank: 8,
    isCurrentUser: false
  },
  {
    id: "9",
    name: "Daniel Martinez",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Daniel",
    xp: 3500,
    rank: 9,
    isCurrentUser: false
  },
  {
    id: "10",
    name: "Olivia Taylor",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia",
    xp: 3200,
    rank: 10,
    isCurrentUser: false
  }
];

// Sample current user data (for when user is not in top 10)
const sampleCurrentUser: CurrentUserData = {
  id: "15",
  name: "Your Name",
  image: null,
  xp: 2100,
  rank: 15,
  isCurrentUser: true
};

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([])
  const [currentUser, setCurrentUser] = useState<CurrentUserData | null>(null)
  const [loading, setLoading] = useState(true)
  const { data: session } = authClient.useSession();

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      // Check if there's a current user in the sample data
      const hasCurrentUser = sampleLeaderboard.some(user => user.isCurrentUser);
      
      // If using the current user in top 10 example
      if (hasCurrentUser) {
        setLeaderboard(sampleLeaderboard);
        setCurrentUser(null);
      } 
      // If using the example where current user is not in top 10
      else {
        // Uncomment the next line to test the case where user is not in top 10
        // setCurrentUser(sampleCurrentUser);
        setLeaderboard(sampleLeaderboard);
      }
      
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Function to get rank icon based on position
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 3:
        return <Medal className="h-5 w-5 text-amber-700" />
      default:
        return <span className="text-sm font-medium text-muted-foreground">{rank}</span>
    }
  }

  // Function to get initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  // Calculate max XP for progress bar
  const maxXP = leaderboard.length > 0 ? leaderboard[0].xp : 0

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Leaderboard</h1>
        <p className="text-muted-foreground">See how you rank against other learners.</p>
      </div>

      {/* Top 3 users */}
      {!loading && leaderboard.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {leaderboard.slice(0, 3).map((user, index) => (
            <Card 
              key={user.id} 
              className={`${
                index === 0 
                  ? "border-yellow-200 bg-yellow-50" 
                  : index === 1 
                    ? "border-gray-200 bg-gray-50" 
                    : "border-amber-200 bg-amber-50"
              }`}
            >
              <CardContent className="pt-6 text-center">
                <div className="mb-2">
                  {index === 0 ? (
                    <Trophy className="h-10 w-10 text-yellow-500 mx-auto" />
                  ) : index === 1 ? (
                    <Trophy className="h-8 w-8 text-gray-400 mx-auto" />
                  ) : (
                    <Trophy className="h-7 w-7 text-amber-700 mx-auto" />
                  )}
                </div>
                <Avatar className={`h-16 w-16 mx-auto mb-2 ${user.isCurrentUser ? "ring-2 ring-primary ring-offset-2" : ""}`}>
                  <AvatarImage src={user.image || ""} alt={user.name} />
                  <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                </Avatar>
                <h3 className={`font-bold text-lg ${user.isCurrentUser ? "text-primary" : ""}`}>{user.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">Rank #{user.rank}</p>
                <div className="flex items-center justify-center gap-1 text-lg font-bold">
                  {user.xp} XP
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Leaderboard table */}
      <Card>
        <CardHeader>
          <CardTitle>Top Learners</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            // Loading skeletons
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-3 w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {leaderboard.map((user) => (
                <div 
                  key={user.id} 
                  className={`flex items-center gap-4 p-3 rounded-lg ${
                    user.isCurrentUser ? "bg-primary/5 border border-primary/20" : ""
                  }`}
                >
                  <div className="flex items-center justify-center h-10 w-10">
                    {getRankIcon(user.rank)}
                  </div>
                  <Avatar className={`h-10 w-10 ${user.isCurrentUser ? "ring-2 ring-primary ring-offset-1" : ""}`}>
                    <AvatarImage src={user.image || ""} alt={user.name} />
                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className={`font-medium ${user.isCurrentUser ? "text-primary font-bold" : ""}`}>
                        {user.name}
                        {user.isCurrentUser && <span className="ml-2 text-xs">(You)</span>}
                      </h3>
                      <span className="font-bold">{user.xp} XP</span>
                    </div>
                    <Progress 
                      value={(user.xp / maxXP) * 100} 
                      className="h-2 mt-2" 
                    />
                  </div>
                </div>
              ))}

              {/* Show current user if not in top 10 */}
              {currentUser && !leaderboard.some(user => user.isCurrentUser) && (
                <>
                  <div className="relative py-2">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-dashed border-gray-300" />
                    </div>
                    <div className="relative flex justify-center">
                      <span className="bg-background px-2 text-xs text-muted-foreground">
                        {currentUser.rank - leaderboard[leaderboard.length - 1].rank - 1} more users
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-3 rounded-lg bg-primary/5 border border-primary/20">
                    <div className="flex items-center justify-center h-10 w-10">
                      <span className="text-sm font-medium text-muted-foreground">{currentUser.rank}</span>
                    </div>
                    <Avatar className="h-10 w-10 ring-2 ring-primary ring-offset-1">
                      <AvatarImage src={currentUser.image || ""} alt={currentUser.name} />
                      <AvatarFallback>{getInitials(currentUser.name)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-primary font-bold">
                          {currentUser.name}
                          <span className="ml-2 text-xs">(You)</span>
                        </h3>
                        <span className="font-bold">{currentUser.xp} XP</span>
                      </div>
                      <Progress 
                        value={(currentUser.xp / maxXP) * 100} 
                        className="h-2 mt-2" 
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 