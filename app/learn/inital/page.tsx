'use client';

import { authClient } from "@/lib/auth-client"
import { redirect } from "next/navigation";

export default function Inital() {

    const {
        data: session,
        isPending,
    } = authClient.useSession();

    return (
        <>
            {isPending && <div>Loading...</div>}
            {!isPending && <div>{JSON.stringify(session)}</div>}
        </>
    )
}