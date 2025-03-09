"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen, Crown, Home, Trophy, Flame } from "lucide-react"
import { useEffect, useState } from "react"

import Logo from "@/components/ui/logo"
import { UserAvatar } from "@/components/ui/user-avatar"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { getUserStreak } from "@/lib/actions/user"

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [streak, setStreak] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStreak = async () => {
      try {
        setLoading(true)
        const data = await getUserStreak()
        setStreak(data.streak)
      } catch (error) {
        console.error("Error fetching streak:", error)
        setStreak(0)
      } finally {
        setLoading(false)
      }
    }

    fetchStreak()
  }, [])

  const navItems = [
    {
      href: "/home",
      label: "Dashboard",
      icon: Home,
    },
    {
      href: "/learn",
      label: "Learn",
      icon: BookOpen,
    },
    {
      href: "/achievements",
      label: "Achievements",
      icon: Trophy,
    },
    {
      href: "/leaderboard",
      label: "Leaderboard",
      icon: Crown,
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b bg-background px-6">
        <Link href="/home" className="flex items-center">
          <Logo />
        </Link>
        <nav className="hidden md:flex flex-1 items-center justify-center gap-6 text-sm">
          {navItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== "/home" && pathname.startsWith(item.href))
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 font-medium transition-colors",
                  isActive 
                    ? "text-primary" 
                    : "text-muted-foreground hover:text-primary"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>
        <div className="ml-auto flex items-center gap-4">
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-orange-50 text-orange-500 px-3 py-1.5 rounded-full">
              <Flame className="h-4 w-4" />
              {loading ? (
                <Skeleton className="w-5 h-5 rounded-full" />
              ) : (
                <span className="font-bold text-sm">{streak}</span>
              )}
            </div>
            <div className="flex items-center gap-1.5 bg-amber-50 text-amber-500 px-3 py-1.5 rounded-full">
              <Trophy className="h-4 w-4" />
              <span className="font-bold text-sm">0 XP</span>
            </div>
          </div>
          <UserAvatar />
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
      <footer className="border-t py-6 md:px-8 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 Verifeye. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}