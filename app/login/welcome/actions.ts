'use server';

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { user } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

export async function saveUserProfile(formData: {
  age: number;
  gender: string;
  interests: string;
}) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session || !session.user?.id) {
      return { success: false, error: "Unauthorized" };
    }

    // Update the user profile
    await db.update(user)
      .set({
        age: formData.age || null,
        gender: formData.gender || null,
        interests: formData.interests || null,
        updatedAt: new Date(),
      })
      .where(eq(user.id, session.user.id));

    return { success: true };
  } catch (error) {
    console.error("Error updating user profile:", error);
    return { success: false, error: "Failed to update profile" };
  }
} 