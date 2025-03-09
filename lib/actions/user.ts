"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { user, activity } from "@/lib/schema";
import { eq, sum } from "drizzle-orm";
import { headers } from "next/headers";

export async function getUserStreak() {
  try {
    // Get the current user session using the proper method from examples
    const session = await auth.api.getSession({ headers: await headers() });
    
    if (!session || !session.user) {
      return { streak: 0 };
    }
    
    const userId = session.user.id;
    
    // Fetch user data from the database
    const userData = await db.select({ streak: user.streak })
      .from(user)
      .where(eq(user.id, userId))
      .execute()
      .then(rows => rows[0]);
    
    return {
      streak: userData?.streak || 0
    };
  } catch (error) {
    console.error("Error getting user streak:", error);
    return { streak: 0 };
  }
}

/**
 * Get total XP for a user
 */
export async function getUserXP() {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    
    if (!session || !session.user) {
      return { xp: 0 };
    }
    
    const userId = session.user.id;
    
    // Sum up all XP from activities
    const result = await db
      .select({ totalXP: sum(activity.xpAmount) })
      .from(activity)
      .where(eq(activity.userId, userId))
      .execute();
    
    return {
      xp: result[0]?.totalXP || 0
    };
  } catch (error) {
    console.error("Error getting user XP:", error);
    return { xp: 0 };
  }
} 