import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/lib/db"; // your drizzle instance
import { nextCookies } from "better-auth/next-js";
import { user, session, account, verification, emailMessage, textMessage } from "./schema";
 
export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg", // or "mysql", "sqlite"
        schema: {
            user,
            session,
            account,
            verification,
            emailMessage,
            textMessage
        },
    }),
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },
    user: {
        additionalFields: {
            age: {
                type: "number",
                required: false,
                defaultValue: 0,
                input: false,
            },
            gender: {
                type: "string",
                required: false,
                defaultValue: "",
                input: false,
            },
            interests: {
                type: "string",
                required: false,
                defaultValue: "",
                input: false,
            },
            streak: {
                type: "number",
                required: false,
                defaultValue: 0,
                input: false,
            },
            emailMessageId: {
                type: "string",
                required: false,
                defaultValue: null,
                input: false,
            },
            textMessageId: {
                type: "string",
                required: false,
                defaultValue: null,
                input: false,
            }
        }
    },
    plugins: [nextCookies()]
});