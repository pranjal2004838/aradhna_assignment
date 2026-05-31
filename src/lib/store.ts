// Data access layer. Each function reads or writes one slice of the user's
// data in localStorage. Keeping these as plain functions (not hooks) makes
// them easy to read and test in your head.
import type {
  GurujiQuestion,
  JaapSession,
  Profile,
  RitualCompletion,
  SankalpPath,
} from "./types";
import { makeId, readJSON, todayKey, writeJSON } from "./storage";

// ---- localStorage key helpers (one namespace per user) ----
const key = {
  jaap: (userId: string) => `aradhana_jaap_${userId}`,
  ritual: (userId: string) => `aradhana_ritual_${userId}`,
  guruji: (userId: string) => `aradhana_guruji_${userId}`,
  sankalp: (userId: string) => `aradhana_sankalp_${userId}`,
};

// ---- Jaap sessions ----
export function getJaapSessions(userId: string): JaapSession[] {
  return readJSON<JaapSession[]>(key.jaap(userId), []);
}

export function addJaapSession(
  userId: string,
  data: { mantra: string; count: number; target: number; durationSeconds: number },
): JaapSession {
  const session: JaapSession = {
    id: makeId(),
    userId,
    mantra: data.mantra,
    count: data.count,
    target: data.target,
    completed: data.count >= data.target,
    durationSeconds: data.durationSeconds,
    createdAt: new Date().toISOString(),
  };
  const all = getJaapSessions(userId);
  writeJSON(key.jaap(userId), [session, ...all]);
  return session;
}

// ---- Ritual completions (one per day) ----
export function getRitualCompletions(userId: string): RitualCompletion[] {
  return readJSON<RitualCompletion[]>(key.ritual(userId), []);
}

export function getTodayCompletion(userId: string): RitualCompletion | undefined {
  return getRitualCompletions(userId).find((c) => c.date === todayKey());
}

// Create or update today's completion record with the given changes.
export function upsertTodayCompletion(
  userId: string,
  changes: Partial<Pick<RitualCompletion, "aartiRead" | "jaapCompleted" | "contentId">>,
): RitualCompletion {
  const all = getRitualCompletions(userId);
  const today = todayKey();
  const existing = all.find((c) => c.date === today);

  if (existing) {
    const updated = { ...existing, ...changes };
    writeJSON(
      key.ritual(userId),
      all.map((c) => (c.date === today ? updated : c)),
    );
    return updated;
  }

  const created: RitualCompletion = {
    id: makeId(),
    userId,
    date: today,
    aartiRead: changes.aartiRead ?? false,
    jaapCompleted: changes.jaapCompleted ?? false,
    contentId: changes.contentId,
    createdAt: new Date().toISOString(),
  };
  writeJSON(key.ritual(userId), [created, ...all]);
  return created;
}

// ---- Guruji questions ----
export function getGurujiQuestions(userId: string): GurujiQuestion[] {
  return readJSON<GurujiQuestion[]>(key.guruji(userId), []);
}

export function addGurujiQuestion(
  userId: string,
  data: { question: string; answer: string; flagged: boolean },
): GurujiQuestion {
  const entry: GurujiQuestion = {
    id: makeId(),
    userId,
    question: data.question,
    answer: data.answer,
    flagged: data.flagged,
    createdAt: new Date().toISOString(),
  };
  writeJSON(key.guruji(userId), [...getGurujiQuestions(userId), entry]);
  return entry;
}

// How many questions the user has asked today (for the daily limit).
export function getTodayQuestionCount(userId: string): number {
  const today = todayKey();
  return getGurujiQuestions(userId).filter((q) => q.createdAt.slice(0, 10) === today).length;
}

// ---- Sankalp paths ----
export function getSankalpPaths(userId: string): SankalpPath[] {
  return readJSON<SankalpPath[]>(key.sankalp(userId), []);
}

export function getActiveSankalp(userId: string): SankalpPath | undefined {
  return getSankalpPaths(userId).find((p) => p.status === "active");
}

export function getSankalpById(userId: string, id: string): SankalpPath | undefined {
  return getSankalpPaths(userId).find((p) => p.id === id);
}

// Save a path (insert or replace). Starting a new active path archives any
// existing active one, so a user only ever has one journey in progress.
export function saveSankalpPath(userId: string, path: SankalpPath): void {
  const all = getSankalpPaths(userId);
  const exists = all.some((p) => p.id === path.id);

  let next: SankalpPath[];
  if (exists) {
    next = all.map((p) => (p.id === path.id ? path : p));
  } else {
    const archived =
      path.status === "active"
        ? all.map((p) => (p.status === "active" ? { ...p, status: "archived" as const } : p))
        : all;
    next = [path, ...archived];
  }
  writeJSON(key.sankalp(userId), next);
}

// ---- Streak helper ----
// Returns an updated profile after recording that a ritual happened today.
export function applyStreakForToday(profile: Profile): Profile {
  const today = todayKey();
  if (profile.lastRitualDate === today) {
    return profile; // already counted today
  }

  const yesterday = (() => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return d.toISOString().slice(0, 10);
  })();

  const nextStreak = profile.lastRitualDate === yesterday ? profile.streakCount + 1 : 1;
  return { ...profile, streakCount: nextStreak, lastRitualDate: today };
}
