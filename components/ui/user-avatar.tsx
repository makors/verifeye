'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"
import { Settings } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

interface UserAvatarProps {
  src?: string
  fallback?: string
  showSettings?: boolean
}

export function UserAvatar({ src = "/placeholder.svg?height=40&width=40", fallback = "BC", showSettings = true }: UserAvatarProps) {

  const {
    data: session,
    isPending,
  } = authClient.useSession();

  return (
    isPending ? (
      <Skeleton className="w-10 h-10 rounded-full" />
    ) : (
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src={session?.user?.image ?? src} alt="User" />
          <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
      </div>
    )
  );
} 