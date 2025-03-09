'use client';

import Logo from "@/components/ui/logo";
import { authClient } from "@/lib/auth-client" // import the auth client
import MainForm from "./_form/main-form";

export default function Welcome() {
    const { 
        data: session, 
        isPending, //loading state
        error, //error object
        refetch //refetch the session
    } = authClient.useSession() 

    if (error) {
        console.error(error)
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="absolute top-0 left-0 p-6">
                <Logo />
            </div>
            <MainForm />
        </div>
    )
}