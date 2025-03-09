import { Module } from "@/components/learning/learning-pathway"

// Define the course structure
export interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  progress: number;
  status: "available" | "locked" | "completed";
  difficulty: "beginner" | "intermediate" | "advanced";
  estimatedTime: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: number;
  title: string;
  description: string;
  progress: number;
  status: "completed" | "in-progress" | "not-started" | "locked";
  difficulty?: string;
  estimatedTime?: string;
  points?: number;
  completedSteps?: number;
  totalSteps?: number;
}

// Current learning path becomes the fundamentals course
export const fundamentalsCourse: Course = {
  id: "fundamentals",
  title: "Scam Awareness Fundamentals",
  description: "Learn to identify and protect yourself from common online scams",
  image: "/images/courses/fundamentals.jpg", // Placeholder image path
  progress: 0,
  status: "available",
  difficulty: "beginner",
  estimatedTime: "2-3 hours",
  lessons: [
    {
      id: 1,
      title: "What Are Scams?",
      description: "Understanding what scams are and why they exist",
      progress: 0,
      status: "not-started" as const,
      difficulty: "beginner",
      estimatedTime: "10 min",
      points: 100,
    },
    {
      id: 2,
      title: "Common Scam Red Flags",
      description: "Learn to spot warning signs that apply to most scams",
      progress: 0,
      status: "locked" as const,
      difficulty: "beginner",
      estimatedTime: "15 min",
      points: 150,
    },
    {
      id: 3,
      title: "Email Phishing Basics",
      description: "Identify basic phishing attempts in your inbox",
      progress: 0,
      status: "locked" as const,
      difficulty: "beginner",
      estimatedTime: "15 min",
      points: 150,
    },
    {
      id: 4,
      title: "Fake Website Detection",
      description: "Learn how to spot fraudulent websites and URLs",
      progress: 0,
      status: "locked" as const,
      difficulty: "beginner",
      estimatedTime: "15 min",
      points: 150,
    },
    {
      id: 5,
      title: "Phone Scam Basics",
      description: "Recognize common phone and voice phishing tactics",
      progress: 0,
      status: "locked" as const,
      difficulty: "beginner",
      estimatedTime: "15 min",
      points: 150,
    },
    {
      id: 6,
      title: "Text Message Scams",
      description: "Identify SMS phishing (smishing) attempts",
      progress: 0,
      status: "locked" as const,
      difficulty: "beginner",
      estimatedTime: "15 min",
      points: 150,
    },
    {
      id: 7,
      title: "Social Media Scams",
      description: "Recognize fake profiles and social engineering tactics",
      progress: 0,
      status: "locked" as const,
      difficulty: "intermediate",
      estimatedTime: "20 min",
      points: 200,
    },
    {
      id: 8,
      title: "Online Shopping Scams",
      description: "Avoid fake stores and too-good-to-be-true deals",
      progress: 0,
      status: "locked" as const,
      difficulty: "intermediate",
      estimatedTime: "20 min",
      points: 200,
    },
    {
      id: 9,
      title: "Gift Card and Payment Scams",
      description: "Understand why scammers ask for specific payment methods",
      progress: 0,
      status: "locked" as const,
      difficulty: "intermediate",
      estimatedTime: "15 min",
      points: 200,
    },
    {
      id: 10,
      title: "What To Do If You've Been Scammed",
      description: "Steps to take if you've fallen victim to a scam",
      progress: 0,
      status: "locked" as const,
      difficulty: "intermediate",
      estimatedTime: "15 min",
      points: 200,
    },
  ]
};

// Additional locked courses
export const advancedCourse: Course = {
  id: "advanced",
  title: "Advanced Scam Protection",
  description: "Master sophisticated techniques to protect against complex scams",
  image: "/images/courses/advanced.jpg", // Placeholder image path
  progress: 0,
  status: "locked",
  difficulty: "intermediate",
  estimatedTime: "3-4 hours",
  lessons: [] // Empty for now
};

export const expertCourse: Course = {
  id: "expert",
  title: "Expert Security Practices",
  description: "Professional-level security techniques for comprehensive protection",
  image: "/images/courses/expert.jpg", // Placeholder image path
  progress: 0,
  status: "locked",
  difficulty: "advanced",
  estimatedTime: "4-5 hours",
  lessons: [] // Empty for now
};

// All courses
export const courses: Course[] = [
  fundamentalsCourse,
  advancedCourse,
  expertCourse
];

// For backward compatibility
export const learningPath = fundamentalsCourse;

// For backward compatibility with existing code
export const learningModules: Module[] = [
  {
    id: 1,
    title: "Scam Awareness Fundamentals",
    isCompleted: false,
    lessons: fundamentalsCourse.lessons as any, // Type assertion to maintain compatibility
  }
];

export const badges = [
  {
    id: 1,
    name: "Scam Spotter",
    description: "Completed the 'What Are Scams?' lesson",
    emoji: "🔍",
    progress: 0,
    earned: false,
  },
  {
    id: 2,
    name: "Red Flag Detector",
    description: "Completed the Common Scam Red Flags lesson",
    emoji: "🚩",
    progress: 0,
    earned: false,
  },
  {
    id: 3,
    name: "Email Guardian",
    description: "Completed the Email Phishing Basics lesson",
    emoji: "📧",
    progress: 0,
    earned: false,
  },
  {
    id: 4,
    name: "Web Detective",
    description: "Completed the Fake Website Detection lesson",
    emoji: "🔎",
    progress: 0,
    earned: false,
  },
  {
    id: 5,
    name: "Call Defender",
    description: "Completed the Phone Scam Basics lesson",
    emoji: "📱",
    progress: 0,
    earned: false,
  },
  {
    id: 6,
    name: "Message Shield",
    description: "Completed the Text Message Scams lesson",
    emoji: "💬",
    progress: 0,
    earned: false,
  },
  {
    id: 7,
    name: "Social Savvy",
    description: "Completed the Social Media Scams lesson",
    emoji: "👥",
    progress: 0,
    earned: false,
  },
  {
    id: 8,
    name: "Smart Shopper",
    description: "Completed the Online Shopping Scams lesson",
    emoji: "🛒",
    progress: 0,
    earned: false,
  },
  {
    id: 11,
    name: "Scam Master",
    description: "Completed all scam awareness lessons",
    emoji: "🏅",
    progress: 0,
    earned: false,
  },
];

export const leaderboard = [
  { id: 1, name: "Sarah Johnson", points: 1250, avatar: "/placeholder.svg?height=40&width=40" },
  { id: 2, name: "Robert Chen", points: 1180, avatar: "/placeholder.svg?height=40&width=40" },
  { id: 3, name: "Maria Garcia", points: 1050, avatar: "/placeholder.svg?height=40&width=40" },
  { id: 4, name: "You", points: 0, avatar: "/placeholder.svg?height=40&width=40", isCurrentUser: true },
  { id: 5, name: "James Wilson", points: 920, avatar: "/placeholder.svg?height=40&width=40" },
  { id: 6, name: "Patricia Moore", points: 890, avatar: "/placeholder.svg?height=40&width=40" },
  { id: 7, name: "David Taylor", points: 850, avatar: "/placeholder.svg?height=40&width=40" },
  { id: 8, name: "Elizabeth Brown", points: 820, avatar: "/placeholder.svg?height=40&width=40" },
]; 