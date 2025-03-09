import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { user } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
    try {
        // Get the current user
        const session = await auth.api.getSession({
            headers: request.headers
        });
        
        if (!session || !session.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Parse the request body
        const body = await request.json();
        const { age, gender, interests } = body;

        // Update the user profile
        await db.update(user)
            .set({
                age: age || null,
                gender: gender || null,
                interests: interests || null,
                updatedAt: new Date(),
            })
            .where(eq(user.id, session.user.id));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error updating user profile:", error);
        return NextResponse.json(
            { error: "Failed to update profile" },
            { status: 500 }
        );
    }
} 