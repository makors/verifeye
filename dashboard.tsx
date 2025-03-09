"use client"
import {
  Award,
  BookOpen,
  CheckCircle,
  ChevronRight,
  Clock,
  Crown,
  FileCheck,
  Home,
  Lock,
  Settings,
  Shield,
  Trophy,
} from "lucide-react"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Dashboard() {
  // Sample data
  const courses = [
    {
      id: 1,
      title: "Email Phishing Awareness",
      description: "Learn to identify and avoid email phishing attempts",
      progress: 75,
      status: "in-progress",
      lessons: 8,
      completedLessons: 6,
      image: "/placeholder.svg?height=100&width=200",
    },
    {
      id: 2,
      title: "Phone Scam Prevention",
      description: "Protect yourself from fraudulent phone calls",
      progress: 100,
      status: "completed",
      lessons: 6,
      completedLessons: 6,
      image: "/placeholder.svg?height=100&width=200",
    },
    {
      id: 3,
      title: "Online Shopping Safety",
      description: "Shop online securely and avoid common scams",
      progress: 33,
      status: "in-progress",
      lessons: 9,
      completedLessons: 3,
      image: "/placeholder.svg?height=100&width=200",
    },
    {
      id: 4,
      title: "Social Media Security",
      description: "Stay safe on social platforms and protect your information",
      progress: 0,
      status: "not-started",
      lessons: 7,
      completedLessons: 0,
      image: "/placeholder.svg?height=100&width=200",
    },
    {
      id: 5,
      title: "Password Management",
      description: "Create and manage secure passwords",
      progress: 0,
      status: "not-started",
      lessons: 5,
      completedLessons: 0,
      image: "/placeholder.svg?height=100&width=200",
    },
  ]

  const badges = [
    {
      id: 1,
      name: "Email Guardian",
      description: "Completed the Email Phishing course",
      icon: Shield,
      earned: true,
    },
    {
      id: 2,
      name: "Call Defender",
      description: "Completed the Phone Scam Prevention course",
      icon: Shield,
      earned: true,
    },
    {
      id: 3,
      name: "Digital Shopper",
      description: "Completed the Online Shopping Safety course",
      icon: Shield,
      earned: false,
    },
    {
      id: 4,
      name: "Perfect Score",
      description: "Scored 100% on a course quiz",
      icon: Award,
      earned: true,
    },
    {
      id: 5,
      name: "Quick Learner",
      description: "Completed a course in under 2 days",
      icon: Clock,
      earned: false,
    },
  ]

  const leaderboard = [
    { id: 1, name: "Sarah Johnson", points: 1250, avatar: "/placeholder.svg?height=40&width=40" },
    { id: 2, name: "Robert Chen", points: 1180, avatar: "/placeholder.svg?height=40&width=40" },
    { id: 3, name: "Maria Garcia", points: 1050, avatar: "/placeholder.svg?height=40&width=40" },
    { id: 4, name: "You", points: 980, avatar: "/placeholder.svg?height=40&width=40", isCurrentUser: true },
    { id: 5, name: "James Wilson", points: 920, avatar: "/placeholder.svg?height=40&width=40" },
    { id: 6, name: "Patricia Moore", points: 890, avatar: "/placeholder.svg?height=40&width=40" },
    { id: 7, name: "David Taylor", points: 850, avatar: "/placeholder.svg?height=40&width=40" },
    { id: 8, name: "Elizabeth Brown", points: 820, avatar: "/placeholder.svg?height=40&width=40" },
  ]

  // Calculate stats
  const totalCourses = courses.length
  const completedCourses = courses.filter((course) => course.status === "completed").length
  const inProgressCourses = courses.filter((course) => course.status === "in-progress").length
  const earnedBadges = badges.filter((badge) => badge.earned).length
  const totalPoints = 980 // This would come from user data

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b bg-background px-6">
        <Link href="#" className="flex items-center gap-2 font-semibold">
          <Shield className="h-6 w-6 text-primary" />
          <span className="text-lg">Verifeye</span>
        </Link>
        <nav className="hidden md:flex flex-1 items-center gap-6 text-sm">
          <Link href="#" className="flex items-center gap-2 font-medium text-primary">
            <Home className="h-4 w-4" />
            Dashboard
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <BookOpen className="h-4 w-4" />
            Courses
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <Trophy className="h-4 w-4" />
            Achievements
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <Crown className="h-4 w-4" />
            Leaderboard
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Settings className="h-5 w-5" />
            <span className="sr-only">Settings</span>
          </Button>
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </header>
      <main className="flex-1 space-y-6 p-4 md:p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Welcome back, Jane!</h1>
            <p className="text-muted-foreground">Continue your learning journey to stay safe online.</p>
          </div>
          <Button>
            Continue Learning
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Points</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalPoints}</div>
              <p className="text-xs text-muted-foreground">Keep learning to earn more points!</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Courses Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {completedCourses}/{totalCourses}
              </div>
              <p className="text-xs text-muted-foreground">{inProgressCourses} course(s) in progress</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Badges Earned</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {earnedBadges}/{badges.length}
              </div>
              <p className="text-xs text-muted-foreground">Complete more courses to earn badges!</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Leaderboard Rank</CardTitle>
              <Crown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">#4</div>
              <p className="text-xs text-muted-foreground">Top 10% of all learners</p>
            </CardContent>
          </Card>
        </div>

        {/* Learning Pathway */}
        <div className="relative mx-auto max-w-4xl pb-10">
          {/* Path background */}
          <div className="absolute left-1/2 top-8 bottom-0 w-2 -translate-x-1/2 bg-muted-foreground/20 z-0"></div>

          {/* Module 1: Email Security */}
          <div className="relative z-10 mb-16">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-primary text-primary-foreground rounded-full px-6 py-2 text-lg font-semibold shadow-md">
                Module 1: Email Security
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card className="bg-primary/5 border-primary/30 shadow-md overflow-hidden bg-background z-10">
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    <CheckCircle className="mr-1 h-3 w-3" /> Completed
                  </Badge>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground mr-2">
                      1
                    </div>
                    Email Basics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">Learn the fundamentals of email security</p>
                  <Progress value={100} className="h-2" />
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Review
                  </Button>
                </CardFooter>
              </Card>

              <Card className="bg-primary/5 border-primary/30 shadow-md overflow-hidden bg-background z-10">
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    <CheckCircle className="mr-1 h-3 w-3" /> Completed
                  </Badge>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground mr-2">
                      2
                    </div>
                    Spotting Phishing
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">Identify common phishing techniques</p>
                  <Progress value={100} className="h-2" />
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Review
                  </Button>
                </CardFooter>
              </Card>

              <Card className="border-primary shadow-md overflow-hidden bg-background z-10">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground mr-2">
                      3
                    </div>
                    Email Phishing Defense
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">Advanced techniques to protect yourself</p>
                  <div className="flex justify-between text-sm text-muted-foreground mb-2">
                    <span>Progress</span>
                    <span>75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                  <div className="mt-3 text-sm text-muted-foreground">6 of 8 lessons completed</div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Continue</Button>
                </CardFooter>
              </Card>
            </div>

            {/* Checkpoint */}
            <div className="flex justify-center mb-8">
              <div className="bg-primary/10 border border-primary/30 rounded-full p-4 bg-background z-10">
                <Trophy className="h-8 w-8 text-primary" />
              </div>
            </div>
          </div>

          {/* Module 2: Phone Security */}
          <div className="relative z-10 mb-16">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-primary text-primary-foreground rounded-full px-6 py-2 text-lg font-semibold shadow-md">
                Module 2: Phone Security
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card className="bg-primary/5 border-primary/30 shadow-md overflow-hidden bg-background z-10">
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    <CheckCircle className="mr-1 h-3 w-3" /> Completed
                  </Badge>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground mr-2">
                      1
                    </div>
                    Call Scam Basics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">Recognize common phone scams</p>
                  <Progress value={100} className="h-2" />
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Review
                  </Button>
                </CardFooter>
              </Card>

              <Card className="bg-primary/5 border-primary/30 shadow-md overflow-hidden bg-background z-10">
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    <CheckCircle className="mr-1 h-3 w-3" /> Completed
                  </Badge>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground mr-2">
                      2
                    </div>
                    Phone Safety
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">Protect yourself from fraudulent calls</p>
                  <Progress value={100} className="h-2" />
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Review
                  </Button>
                </CardFooter>
              </Card>

              <Card className="bg-muted/40 border-muted shadow-md overflow-hidden bg-background z-10">
                <div className="absolute top-2 right-2">
                  <Badge variant="outline" className="bg-background">
                    <Lock className="mr-1 h-3 w-3" /> Locked
                  </Badge>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-muted-foreground">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground mr-2">
                      3
                    </div>
                    Text Message Scams
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">Identify and avoid SMS phishing attempts</p>
                  <Progress value={0} className="h-2" />
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" disabled>
                    Complete Previous Lessons
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Checkpoint */}
            <div className="flex justify-center mb-8">
              <div className="bg-primary/10 border border-primary/30 rounded-full p-4 bg-background z-10">
                <Trophy className="h-8 w-8 text-primary" />
              </div>
            </div>
          </div>

          {/* Module 3: Online Shopping */}
          <div className="relative z-10 mb-16">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-primary text-primary-foreground rounded-full px-6 py-2 text-lg font-semibold shadow-md">
                Module 3: Online Shopping
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card className="border-primary shadow-md overflow-hidden bg-background z-10">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground mr-2">
                      1
                    </div>
                    Safe Shopping Basics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">Learn to shop online safely</p>
                  <div className="flex justify-between text-sm text-muted-foreground mb-2">
                    <span>Progress</span>
                    <span>33%</span>
                  </div>
                  <Progress value={33} className="h-2" />
                  <div className="mt-3 text-sm text-muted-foreground">3 of 9 lessons completed</div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Continue</Button>
                </CardFooter>
              </Card>

              <Card className="bg-muted/40 border-muted shadow-md overflow-hidden bg-background z-10">
                <div className="absolute top-2 right-2">
                  <Badge variant="outline" className="bg-background">
                    <Lock className="mr-1 h-3 w-3" /> Locked
                  </Badge>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-muted-foreground">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground mr-2">
                      2
                    </div>
                    Payment Security
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">Secure payment methods and practices</p>
                  <Progress value={0} className="h-2" />
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" disabled>
                    Complete Previous Lessons
                  </Button>
                </CardFooter>
              </Card>

              <Card className="bg-muted/40 border-muted shadow-md overflow-hidden bg-background z-10">
                <div className="absolute top-2 right-2">
                  <Badge variant="outline" className="bg-background">
                    <Lock className="mr-1 h-3 w-3" /> Locked
                  </Badge>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-muted-foreground">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground mr-2">
                      3
                    </div>
                    Fake Websites
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">Identify fraudulent shopping websites</p>
                  <Progress value={0} className="h-2" />
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" disabled>
                    Complete Previous Lessons
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Checkpoint */}
            <div className="flex justify-center mb-8">
              <div className="bg-muted/40 border border-muted rounded-full p-4 bg-background z-10">
                <Trophy className="h-8 w-8 text-muted-foreground" />
              </div>
            </div>
          </div>

          {/* Module 4: Social Media */}
          <div className="relative z-10 mb-16">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-muted text-muted-foreground rounded-full px-6 py-2 text-lg font-semibold shadow-md">
                Module 4: Social Media
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card className="bg-muted/40 border-muted shadow-md overflow-hidden bg-background z-10">
                <div className="absolute top-2 right-2">
                  <Badge variant="outline" className="bg-background">
                    <Lock className="mr-1 h-3 w-3" /> Locked
                  </Badge>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-muted-foreground">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground mr-2">
                      1
                    </div>
                    Social Media Basics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">Stay safe on social platforms</p>
                  <Progress value={0} className="h-2" />
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" disabled>
                    Complete Previous Modules
                  </Button>
                </CardFooter>
              </Card>

              <Card className="bg-muted/40 border-muted shadow-md overflow-hidden bg-background z-10">
                <div className="absolute top-2 right-2">
                  <Badge variant="outline" className="bg-background">
                    <Lock className="mr-1 h-3 w-3" /> Locked
                  </Badge>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-muted-foreground">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground mr-2">
                      2
                    </div>
                    Privacy Settings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">Configure your privacy settings properly</p>
                  <Progress value={0} className="h-2" />
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" disabled>
                    Complete Previous Lessons
                  </Button>
                </CardFooter>
              </Card>

              <Card className="bg-muted/40 border-muted shadow-md overflow-hidden bg-background z-10">
                <div className="absolute top-2 right-2">
                  <Badge variant="outline" className="bg-background">
                    <Lock className="mr-1 h-3 w-3" /> Locked
                  </Badge>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-muted-foreground">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground mr-2">
                      3
                    </div>
                    Social Engineering
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">Recognize social engineering tactics</p>
                  <Progress value={0} className="h-2" />
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" disabled>
                    Complete Previous Lessons
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Final checkpoint */}
            <div className="flex justify-center">
              <div className="bg-muted/40 border border-muted rounded-full p-4 bg-background z-10">
                <FileCheck className="h-8 w-8 text-muted-foreground" />
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="border-t py-6 md:px-8 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 Verifeye. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="#" className="underline underline-offset-4 hover:text-foreground">
              Terms
            </Link>
            <Link href="#" className="underline underline-offset-4 hover:text-foreground">
              Privacy
            </Link>
            <Link href="#" className="underline underline-offset-4 hover:text-foreground">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

