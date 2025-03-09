import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

export interface UserWithCustomFields {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string;
  age?: number;
  gender?: string;
  interests?: string;
  createdAt: Date;
  updatedAt: Date;
}

export function useCurrentUser() {
  const [user, setUser] = useState<UserWithCustomFields | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        setIsLoading(true);
        
        // Get the basic session
        const sessionData = await authClient.getSession();
        
        if (!sessionData || !sessionData.data || !sessionData.data.user?.id) {
          setUser(null);
          return;
        }
        
        // Fetch the complete user data from the database
        const response = await fetch('/api/user/me');
        
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        
        const userData = await response.json();
        setUser(userData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
        console.error('Error fetching user:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUser();
  }, []);

  return { user, isLoading, error };
} 