import { pgTable, text, integer, timestamp, boolean, pgEnum, jsonb } from "drizzle-orm/pg-core";
			
// Email message schema
export const emailMessage = pgTable("email_message", {
  id: text("id").primaryKey(),
  sender: text("sender").notNull(),
  senderEmail: text("sender_email").notNull(),
  subject: text("subject").notNull(),
  content: text("content").notNull(),
  redFlags: text("red_flags"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Text message schema
export const textMessage = pgTable("text_message", {
  id: text("id").primaryKey(),
  subject: text("subject").notNull(),
  sender: text("sender").notNull(),
  content: text("content").notNull(),
  redFlags: text("red_flags"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const user = pgTable("user", {
					id: text("id").primaryKey(),
					name: text('name').notNull(),
 email: text('email').notNull().unique(),
 emailVerified: boolean('email_verified').notNull(),
 image: text('image'),
 // User profile data from formData
 age: integer('age'),
 gender: text('gender'),
 interests: text('interests'),
 streak: integer('streak').default(0),
 // References to email and text messages instead of storing content directly
 emailMessageId: text('email_message_id').references(() => emailMessage.id),
 textMessageId: text('text_message_id').references(() => textMessage.id),
 createdAt: timestamp('created_at').notNull(),
 updatedAt: timestamp('updated_at').notNull()
				});

export const session = pgTable("session", {
					id: text("id").primaryKey(),
					expiresAt: timestamp('expires_at').notNull(),
 token: text('token').notNull().unique(),
 createdAt: timestamp('created_at').notNull(),
 updatedAt: timestamp('updated_at').notNull(),
 ipAddress: text('ip_address'),
 userAgent: text('user_agent'),
 userId: text('user_id').notNull().references(()=> user.id, { onDelete: 'cascade' })
				});

export const account = pgTable("account", {
					id: text("id").primaryKey(),
					accountId: text('account_id').notNull(),
 providerId: text('provider_id').notNull(),
 userId: text('user_id').notNull().references(()=> user.id, { onDelete: 'cascade' }),
 accessToken: text('access_token'),
 refreshToken: text('refresh_token'),
 idToken: text('id_token'),
 accessTokenExpiresAt: timestamp('access_token_expires_at'),
 refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
 scope: text('scope'),
 createdAt: timestamp('created_at').notNull(),
 updatedAt: timestamp('updated_at').notNull()
				});

export const verification = pgTable("verification", {
					id: text("id").primaryKey(),
					identifier: text('identifier').notNull(),
 value: text('value').notNull(),
 expiresAt: timestamp('expires_at').notNull(),
 createdAt: timestamp('created_at'),
 updatedAt: timestamp('updated_at')
				});

export const activity = pgTable("activity", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => user.id),
  type: text("type").notNull(), // e.g., "signup", "complete_lesson", "streak_milestone"
  description: text("description").notNull(),
  xpAmount: integer("xp_amount").notNull().default(0),
  emoji: text("emoji").notNull(), // e.g., "🎉", "🏆", "🔥"
  metadata: text("metadata"), // Optional JSON stringified metadata
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Enum for lesson item types
export const lessonItemTypeEnum = pgEnum("lesson_item_type", ["text", "interactive_email", "interactive_text"]);

// Lessons table
export const lesson = pgTable("lesson", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  order: integer("order").notNull(), // Sequence number within the course
  xpReward: integer("xp_reward").notNull().default(0),
  isPublished: boolean("is_published").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Lesson items table
export const lessonItem = pgTable("lesson_item", {
  id: text("id").primaryKey(),
  lessonId: text("lesson_id").notNull().references(() => lesson.id, { onDelete: 'cascade' }),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: 'cascade' }),
  type: lessonItemTypeEnum("type").notNull(), // text, interactive_email, interactive_text
  content: text("content"), // Can be null as mentioned (will be generated one course in advance)
  order: integer("order").notNull(), // Sequence within the lesson
  isAiGenerated: boolean("is_ai_generated").notNull().default(true),
  metadata: jsonb("metadata"), // For storing additional data related to interactive items
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// User progress tracking
export const userLesson = pgTable("user_lesson", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: 'cascade' }),
  lessonId: text("lesson_id").notNull().references(() => lesson.id, { onDelete: 'cascade' }),
  isCompleted: boolean("is_completed").notNull().default(false),
  progress: integer("progress").notNull().default(0), // Percentage or number of completed items
  lastAccessedAt: timestamp("last_accessed_at").notNull().defaultNow(),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// User responses to interactive items
export const userResponse = pgTable("user_response", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: 'cascade' }),
  lessonItemId: text("lesson_item_id").notNull().references(() => lessonItem.id, { onDelete: 'cascade' }),
  response: text("response").notNull(),
  isCorrect: boolean("is_correct"),
  feedback: text("feedback"), // AI-generated feedback on the response
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

