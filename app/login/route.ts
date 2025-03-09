import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await auth.api.signInSocial({
      body: {
        provider: "google",
        callbackURL: "/home",
        errorCallbackURL: "/login/error",
        newUserCallbackURL: "/login/welcome",
        disableRedirect: false,
      },
    });

    if (!response.redirect) throw new Error("No redirect provided");
    
    return NextResponse.redirect(response.url as string);
  } catch (error) {
    console.error("Social login error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred during Google authentication" },
      { status: 500 }
    );
  }
} 