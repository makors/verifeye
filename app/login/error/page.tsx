"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LoginError() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-red-600 mb-2">Login Failed</h1>
        <p className="text-gray-700 mb-6">An error occurred during login</p>
        
        <Link href="/login" passHref>
          <Button className="w-full">
            Try Again
          </Button>
        </Link>
        
        <p className="mt-4 text-sm text-gray-500 text-center">
          If this problem persists, please contact support.
        </p>
      </div>
    </div>
  );
}
