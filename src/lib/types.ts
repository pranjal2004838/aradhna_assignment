// Shared TypeScript types for the whole app.
// Keeping every shape in one file makes it easy to see the data model.

export type Language = "hi" | "en" | "hinglish";

export type ContentType = "aarti" | "chalisa" | "mantra";

// A registered user (stored locally, password is plain for this demo only).
export type User = {
  id: string;
  email: string;
  password: string;
  createdAt: string;
};

// A user's devotional profile and preferences.
export type Profile = {
  userId: string;
  displayName: string;
  language: Language;
  preferredDeity: string;
  intention: string;
  streakCount: number;
  lastRitualDate: string | null; // YYYY-MM-DD
  onboardingCompleted: boolean;
  createdAt: string;
};

// A piece of devotional reading content.
export type Content = {
  id: string;
  type: ContentType;
  title: string;
  deity: string;
  language: Language;
  body: string; // Devanagari / main text
  translation?: string; // short meaning in English
  durationMinutes?: number;
  tags: string[];
  isFeatured: boolean;
};

// One completed (or partial) jaap chanting session.
export type JaapSession = {
  id: string;
  userId: string;
  mantra: string;
  count: number;
  target: number;
  completed: boolean;
  durationSeconds: number;
  createdAt: string;
};

// One day's ritual completion record (one per user per date).
export type RitualCompletion = {
  id: string;
  userId: string;
  date: string; // YYYY-MM-DD
  aartiRead: boolean;
  jaapCompleted: boolean;
  contentId?: string;
  createdAt: string;
};

// A saved question + Guruji answer.
export type GurujiQuestion = {
  id: string;
  userId: string;
  question: string;
  answer: string;
  flagged: boolean;
  createdAt: string;
};

// One day inside a 7-day Sankalp path.
export type SankalpDay = {
  day: number;
  title: string;
  mantra: string;
  jaapTarget: 54 | 108;
  readingTitle: string;
  reflection: string;
  completed: boolean;
};

export type SankalpStatus = "active" | "completed" | "archived";

// A user's personalized 7-day journey.
export type SankalpPath = {
  id: string;
  userId: string;
  intention: string;
  deity: string;
  language: Language;
  title: string;
  status: SankalpStatus;
  days: SankalpDay[];
  currentDay: number;
  startedAt: string;
  completedAt?: string;
};
