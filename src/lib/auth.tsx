"use client";

// Simple local auth + profile context.
// NOTE: This is a front-end-only demo. Passwords are stored in localStorage in
// plain text, which is fine for a portfolio MVP but must never be used for real
// accounts. Swapping this file for Supabase/Auth later keeps the rest of the
// app unchanged because every screen only talks to this context.
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Profile, User } from "./types";
import { makeId, readJSON, removeKey, writeJSON } from "./storage";
import { applyStreakForToday } from "./store";

const USERS_KEY = "aradhana_users";
const CURRENT_KEY = "aradhana_current_user";
const profileKey = (userId: string) => `aradhana_profile_${userId}`;

type AuthResult = { ok: true } | { ok: false; error: string };

type AuthContextValue = {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signup: (email: string, password: string) => AuthResult;
  login: (email: string, password: string) => AuthResult;
  logout: () => void;
  saveProfile: (data: Partial<Profile>) => void;
  recordRitualToday: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  // On first load, restore the logged-in user and their profile.
  useEffect(() => {
    const currentId = readJSON<string | null>(CURRENT_KEY, null);
    if (currentId) {
      const users = readJSON<User[]>(USERS_KEY, []);
      const found = users.find((u) => u.id === currentId) ?? null;
      setUser(found);
      if (found) {
        setProfile(readJSON<Profile | null>(profileKey(found.id), null));
      }
    }
    setLoading(false);
  }, []);

  const signup = useCallback((emailRaw: string, password: string): AuthResult => {
    const email = normalizeEmail(emailRaw);
    if (!email || !email.includes("@")) return { ok: false, error: "Please enter a valid email." };
    if (password.length < 6) return { ok: false, error: "Password must be at least 6 characters." };

    const users = readJSON<User[]>(USERS_KEY, []);
    if (users.some((u) => u.email === email)) {
      return { ok: false, error: "An account with this email already exists. Try logging in." };
    }

    const newUser: User = { id: makeId(), email, password, createdAt: new Date().toISOString() };
    writeJSON(USERS_KEY, [...users, newUser]);
    writeJSON(CURRENT_KEY, newUser.id);
    setUser(newUser);
    setProfile(null);
    return { ok: true };
  }, []);

  const login = useCallback((emailRaw: string, password: string): AuthResult => {
    const email = normalizeEmail(emailRaw);
    const users = readJSON<User[]>(USERS_KEY, []);
    const found = users.find((u) => u.email === email);
    if (!found || found.password !== password) {
      return { ok: false, error: "Email or password is incorrect." };
    }
    writeJSON(CURRENT_KEY, found.id);
    setUser(found);
    setProfile(readJSON<Profile | null>(profileKey(found.id), null));
    return { ok: true };
  }, []);

  const logout = useCallback(() => {
    removeKey(CURRENT_KEY);
    setUser(null);
    setProfile(null);
  }, []);

  // Merge changes into the profile (creating it on first save) and persist.
  const saveProfile = useCallback(
    (data: Partial<Profile>) => {
      if (!user) return;
      const base: Profile =
        profile ?? {
          userId: user.id,
          displayName: "",
          language: "hinglish",
          preferredDeity: "",
          intention: "",
          streakCount: 0,
          lastRitualDate: null,
          onboardingCompleted: false,
          createdAt: new Date().toISOString(),
        };
      const updated: Profile = { ...base, ...data };
      writeJSON(profileKey(user.id), updated);
      setProfile(updated);
    },
    [user, profile],
  );

  // Mark that the user did a ritual today and update their streak.
  const recordRitualToday = useCallback(() => {
    if (!user || !profile) return;
    const updated = applyStreakForToday(profile);
    if (updated !== profile) {
      writeJSON(profileKey(user.id), updated);
      setProfile(updated);
    }
  }, [user, profile]);

  const value = useMemo<AuthContextValue>(
    () => ({ user, profile, loading, signup, login, logout, saveProfile, recordRitualToday }),
    [user, profile, loading, signup, login, logout, saveProfile, recordRitualToday],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Small hook so screens can read auth state with one line.
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
