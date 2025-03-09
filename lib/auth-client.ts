import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
    baseURL: process.env.BETTER_AUTH_URL, // the base url of your auth server
})

const signIn = async () => {
    const data = await authClient.signIn.social({
        provider: "google"
    })
}