"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { activity, user } from "@/lib/schema";
import { eq, sum, and } from "drizzle-orm";
import { headers } from "next/headers";
import { v4 as uuidv4 } from "uuid";

// Types for activities
export type ActivityType = "signup" | "complete_lesson" | "streak_milestone" | "daily_login" | "practice_completed";

interface CreateActivityProps {
  userId: string;
  type: ActivityType;
  description: string;
  xpAmount: number;
  emoji: string;
  metadata?: Record<string, any>;
}

/**
 * Create a new activity for a user
 */
export async function createActivity({
  userId,
  type,
  description,
  xpAmount,
  emoji,
  metadata = {}
}: CreateActivityProps) {
  try {
    console.log("Creating activity:", { userId, type, description, xpAmount, emoji });
    
    const newActivity = {
      id: uuidv4(),
      userId,
      type,
      description,
      xpAmount,
      emoji,
      metadata: metadata ? JSON.stringify(metadata) : null,
      createdAt: new Date()
    };

    console.log("Activity object prepared:", newActivity);
    
    // Check if the activity already exists to prevent duplicates
    const existingActivity = await db
      .select({ id: activity.id })
      .from(activity)
      .where(
        and(
          eq(activity.userId, userId),
          eq(activity.type, type),
          eq(activity.description, description)
        )
      )
      .limit(1)
      .execute();
    
    if (existingActivity.length > 0) {
      console.log("Activity already exists, skipping creation");
      return { success: true, activityId: existingActivity[0].id, alreadyExists: true };
    }
    
    try {
      console.log("Inserting activity into database");
      await db.insert(activity).values(newActivity);
      console.log("Activity inserted successfully");
      return { success: true, activityId: newActivity.id };
    } catch (dbError) {
      console.error("Database error while creating activity:", dbError);
      // If there's a specific database error, you might want to handle it differently
      throw dbError;
    }
  } catch (error) {
    console.error("Error creating activity:", error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Failed to create activity" };
  }
}

/**
 * Create sign-up activity for a new user
 */
export async function createSignupActivity(userId: string) {

  console.log("Creating signup activity for user:", userId);
  return createActivity({
    userId,
    type: "signup",
    description: "Joined Verifeye",
    xpAmount: 100,
    emoji: "🎉"
  });
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
    
    console.log("Getting XP for user:", userId);
    
    // Sum up all XP from activities
    const result = await db
      .select({ totalXP: sum(activity.xpAmount) })
      .from(activity)
      .where(eq(activity.userId, userId))
      .execute();
    
    console.log("XP query result:", result);
    
    // Handle NULL result from sum() when no rows match
    const totalXP = result[0]?.totalXP === null ? 0 : Number(result[0]?.totalXP || 0);
    
    console.log("Calculated total XP:", totalXP);
    
    return { xp: totalXP };
  } catch (error) {
    console.error("Error getting user XP:", error);
    return { xp: 0 };
  }
}

/**
 * Get recent activities for a user
 */
export async function getUserActivities(limit = 10) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    
    if (!session || !session.user) {
      return { activities: [] };
    }
    
    const userId = session.user.id;
    
    console.log("Getting activities for user:", userId);
    
    const activities = await db
      .select()
      .from(activity)
      .where(eq(activity.userId, userId))
      .orderBy(activity.createdAt)
      .limit(limit)
      .execute();
    
    console.log("Found activities:", activities.length);
    
    return {
      activities: activities.map(act => ({
        ...act,
        metadata: act.metadata ? JSON.parse(act.metadata) : null
      }))
    };
  } catch (error) {
    console.error("Error getting user activities:", error);
    return { activities: [] };
  }
} 