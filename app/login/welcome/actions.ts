'use server';

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { user, emailMessage, textMessage } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { createSignupActivity } from "@/lib/actions/activity";
import { initializeUserLessons } from "@/lib/actions/lessons";
import { OpenAI } from "openai";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";
import crypto from "crypto";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const EmailMessage = z.object({
  type: z.literal('email'),
  sender: z.object({
    name: z.string(),
    email: z.string(),
  }),
  subjectLine: z.string(),
  body: z.string(),
  solution: z.enum([ "Yes", "No" ])
  });
  type EmailMessage = z.infer<typeof EmailMessage>;

// Define Zod schemas for structured outputs
const EmailSender = z.object({
  name: z.string().describe("Name of the email sender"),
  email: z.string().describe("Email address of the sender")
});

const EmailContent = z.object({
  sender: EmailSender,
  subjectLine: z.string().describe("Subject line of the email"),
  body: z.string().describe("Content of the email message"),
  isScam: z.boolean().describe("Whether this is a phishing/scam email (true) or legitimate (false)"),
  redFlags: z.array(z.string()).optional().describe("List of suspicious elements in the email that indicate it might be a scam")
});

const TextSender = z.object({
  name: z.string().describe("Name of the text message sender"),
  phoneNumber: z.string().describe("Phone number of the sender")
});

const TextContent = z.object({
  sender: TextSender,
  body: z.string().describe("Content of the text message"),
  isScam: z.boolean().describe("Whether this is a phishing/scam text (true) or legitimate (false)"),
  redFlags: z.array(z.string()).optional().describe("List of suspicious elements in the text that indicate it might be a scam")
});

export async function saveUserProfile(formData: {
  age: number;
  gender: string;
  interests: string;
}) {
  try {
    console.log("Starting saveUserProfile with formData:", formData);
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session || !session.user?.id) {
      console.error("Unauthorized session:", session);
      return { success: false, error: "Unauthorized" };
    }

    console.log("User authenticated:", session.user.id);

    await db.update(user)
      .set({
        age: formData.age,
        gender: formData.gender,
        interests: formData.interests,
      })
      .where(eq(user.id, session.user.id));

    console.log("User profile updated successfully");

    // Create signup activity
    await createSignupActivity(session.user.id);

    // Initialize user lessons
    await initializeUserLessons(session.user.id);

    // Initialize interactive lesson
    initalizeInteractiveLesson(session.user.id);

    return { success: true };
  } catch (error) {
    console.error("Error saving user profile:", error);
    return { success: false, error: "Failed to save user profile" };
  }
} 

export async function initalizeInteractiveLesson(userId: string) {
  // System prompts for OpenAI
  const EMAIL_SYSTEM_PROMPT = `
  # Scam Prevention Expert

  Create a personalized phishing email example based on user data.
  Keep all responses brief and to the point.
  IMPORTANT: Always include at least 3-5 specific red flags in your response that explain why this is a phishing email.
  These red flags should be clear, educational points that help the user learn to identify scams.
  `;

  const TEXT_SYSTEM_PROMPT = `
  # Scam Prevention Expert

  Create a personalized phishing text message example based on user data.
  Keep all responses brief and to the point.
  IMPORTANT: Always include at least 3-5 specific red flags in your response that explain why this is a phishing text.
  These red flags should be clear, educational points that help the user learn to identify scams.
  `;

  try {
    // Get user data with existing message references
    const userInfo = await db.select({
      age: user.age,
      gender: user.gender,
      interests: user.interests,
      emailMessageId: user.emailMessageId,
      textMessageId: user.textMessageId
    })
    .from(user)
    .where(eq(user.id, userId))
    .then(res => res[0]);

    if (!userInfo) {
      throw new Error("User not found");
    }

    // Run both API calls in parallel using Promise.all
    const [emailCompletion, textCompletion] = await Promise.all([
      // Email message generation
      openai.beta.chat.completions.parse({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: EMAIL_SYSTEM_PROMPT
          },
          {
            role: "user",
            content: `Generate a phishing email example based on this user data: Age: ${userInfo.age || 30}, Gender: ${userInfo.gender || "unspecified"}, Interests: ${userInfo.interests || "technology, online safety"}. Make sure to include at least 3-5 specific red flags that explain why this is a phishing email. Use line breaks.`
          }
        ],
        response_format: zodResponseFormat(EmailContent, "email_content")
      }),
      
      // Text message generation
      openai.beta.chat.completions.parse({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: TEXT_SYSTEM_PROMPT
          },
          {
            role: "user",
            content: `Generate a phishing text message example based on this user data: Age: ${userInfo.age || 30}, Gender: ${userInfo.gender || "unspecified"}, Interests: ${userInfo.interests || "technology, online safety"}. Make sure to include at least 3-5 specific red flags that explain why this is a phishing text.`
          }
        ],
        response_format: zodResponseFormat(TextContent, "text_content")
      })
    ]);

    // Get the parsed data
    const emailData = emailCompletion.choices[0].message.parsed;
    const textData = textCompletion.choices[0].message.parsed;
    
    if (!emailData || !textData) {
      throw new Error("Failed to generate content");
    }
    
    // Ensure we have red flags
    const emailRedFlags = emailData.redFlags || [
      "Suspicious sender email address",
      "Urgent or threatening language",
      "Requests for personal information",
      "Poor grammar or spelling",
      "Suspicious links"
    ];
    
    const textRedFlags = textData.redFlags || [
      "Unknown sender",
      "Urgent call to action",
      "Contains suspicious links",
      "Requests personal information",
      "Too good to be true offers"
    ];
    
    // Check if we need to create new records or update existing ones
    let emailId = userInfo.emailMessageId;
    let textId = userInfo.textMessageId;
    
    const dbOperations = [];
    
    // Handle email message
    if (emailId) {
      // Update existing email message
      dbOperations.push(
        db.update(emailMessage)
          .set({
            sender: emailData.sender.name,
            senderEmail: emailData.sender.email,
            subject: emailData.subjectLine,
            content: emailData.body,
            redFlags: JSON.stringify(emailRedFlags),
            updatedAt: new Date()
          })
          .where(eq(emailMessage.id, emailId))
      );
    } else {
      // Create new email message
      emailId = crypto.randomUUID();
      dbOperations.push(
        db.insert(emailMessage).values({
          id: emailId,
          sender: emailData.sender.name,
          senderEmail: emailData.sender.email,
          subject: emailData.subjectLine,
          content: emailData.body,
          redFlags: JSON.stringify(emailRedFlags),
          createdAt: new Date(),
          updatedAt: new Date()
        })
      );
    }
    
    // Handle text message
    if (textId) {
      // Update existing text message
      dbOperations.push(
        db.update(textMessage)
          .set({
            sender: textData.sender.name,
            content: textData.body,
            redFlags: JSON.stringify(textRedFlags),
            updatedAt: new Date()
          })
          .where(eq(textMessage.id, textId))
      );
    } else {
      // Create new text message
      textId = crypto.randomUUID();
      dbOperations.push(
        db.insert(textMessage).values({
          id: textId,
          sender: textData.sender.name,
          subject: "",
          content: textData.body,
          redFlags: JSON.stringify(textRedFlags),
          createdAt: new Date(),
          updatedAt: new Date()
        })
      );
    }
    
    // Always update user references to ensure they're set
    dbOperations.push(
      db.update(user)
        .set({
          emailMessageId: emailId,
          textMessageId: textId
        })
        .where(eq(user.id, userId))
    );
    
    // Execute all database operations in parallel
    await Promise.all(dbOperations);

    console.log("Interactive lesson initialization complete");

    return { success: true };
  } catch (error) {
    console.error("Error initializing interactive lesson:", error);
    return { success: false, error: "Failed to initialize interactive lesson" };
  }
}

// Server action to fetch email and text message data
export async function fetchUserMessages() {
  try {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session || !session.user?.id) {
      return { success: false, error: "Unauthorized" };
    }

    // Get user with message references
    const userData = await db.select({
      emailMessageId: user.emailMessageId,
      textMessageId: user.textMessageId
    })
    .from(user)
    .where(eq(user.id, session.user.id))
    .then(res => res[0]);

    if (!userData) {
      return { success: false, error: "User not found" };
    }

    // Fetch email message if available
    let emailData = null;
    if (userData.emailMessageId) {
      emailData = await db.select({
        sender: emailMessage.sender,
        senderEmail: emailMessage.senderEmail,
        subject: emailMessage.subject,
        content: emailMessage.content,
        redFlags: emailMessage.redFlags
      })
      .from(emailMessage)
      .where(eq(emailMessage.id, userData.emailMessageId))
      .then(res => res[0]);
    }

    // Fetch text message if available
    let textData = null;
    if (userData.textMessageId) {
      textData = await db.select({
        sender: textMessage.sender,
        content: textMessage.content,
        redFlags: textMessage.redFlags
      })
      .from(textMessage)
      .where(eq(textMessage.id, userData.textMessageId))
      .then(res => res[0]);
    }

    // Parse redFlags and prepare response
    let parsedEmailRedFlags: string[] = [];
    if (emailData?.redFlags) {
      try {
        parsedEmailRedFlags = JSON.parse(emailData.redFlags);
      } catch (e) {
        console.error("Error parsing email redFlags:", e);
        // Fallback red flags if parsing fails
        parsedEmailRedFlags = [
          "Suspicious sender email address",
          "Urgent or threatening language",
          "Requests for personal information",
          "Poor grammar or spelling",
          "Suspicious links"
        ];
      }
    }

    let parsedTextRedFlags: string[] = [];
    if (textData?.redFlags) {
      try {
        parsedTextRedFlags = JSON.parse(textData.redFlags);
      } catch (e) {
        console.error("Error parsing text redFlags:", e);
        // Fallback red flags if parsing fails
        parsedTextRedFlags = [
          "Unknown sender",
          "Urgent call to action",
          "Contains suspicious links",
          "Requests personal information",
          "Too good to be true offers"
        ];
      }
    }

    return {
      success: true,
      email: emailData ? {
        sender: {
          name: emailData.sender,
          email: emailData.senderEmail
        },
        subjectLine: emailData.subject,
        body: emailData.content,
        isPhishing: true, // Always phishing in this implementation
        redFlags: parsedEmailRedFlags
      } : null,
      text: textData ? {
        sender: {
          name: textData.sender,
          phoneNumber: "Unknown" // Phone number isn't stored in the schema
        },
        body: textData.content,
        isPhishing: true, // Always phishing in this implementation
        redFlags: parsedTextRedFlags
      } : null
    };
  } catch (error) {
    console.error("Error fetching user messages:", error);
    return { success: false, error: "Failed to fetch messages" };
  }
}
