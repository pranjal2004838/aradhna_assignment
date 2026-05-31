"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { History, LogOut } from "lucide-react";
import { CosmicBackground } from "@/components/backgrounds/CosmicBackground";
import { Button, buttonClasses, Chip, GlassCard, MandalaLoader } from "@/components/ui";
import { useAuth } from "@/lib/auth";
import { DEITIES, INTENTIONS } from "@/lib/sankalp";
import type { Language } from "@/lib/types";

const LANGUAGES: { id: Language; label: string }[] = [
  { id: "hi", label: "हिंदी" },
  { id: "en", label: "English" },
  { id: "hinglish", label: "Hinglish" },
];

export default function ProfilePage() {
  const { user, profile, saveProfile, logout } = useAuth();
  const router = useRouter();

  const [name, setName] = useState(profile?.displayName ?? "");
  const [language, setLanguage] = useState<Language>(profile?.language ?? "hinglish");
  const [deity, setDeity] = useState(profile?.preferredDeity ?? "");
  const [intention, setIntention] = useState(profile?.intention ?? "");
  const [saved, setSaved] = useState(false);

  if (!user || !profile) return <MandalaLoader message="Loading your profile…" />;

  function save() {
    if (name.trim().length < 2) return;
    saveProfile({ displayName: name.trim(), language, preferredDeity: deity, intention });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function handleLogout() {
    logout();
    router.replace("/");
  }

  return (
    <div className="relative">
      <CosmicBackground />

      <header className="flex items-center justify-between">
        <h1 className="font-[family-name:var(--font-heading)] text-3xl text-soft-ash">Profile</h1>
        <div className="flex items-center gap-1.5 rounded-full border border-divine-gold/40 bg-divine-gold/15 px-3 py-1.5 text-sm text-divine-gold">
          🔥 {profile.streakCount} day{profile.streakCount === 1 ? "" : "s"}
        </div>
      </header>

      <p className="mt-1 text-sm text-soft-ash/60">{user.email}</p>

      <GlassCard className="mt-6 p-6">
        <label htmlFor="pname" className="mb-1 block text-sm text-soft-ash/80">Display name</label>
        <input
          id="pname"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-soft-ash focus:border-divine-gold/60 focus:outline-none"
        />

        <p className="mt-5 mb-2 text-sm text-soft-ash/80">Language</p>
        <div className="flex flex-wrap gap-2">
          {LANGUAGES.map((l) => (
            <Chip key={l.id} selected={language === l.id} onClick={() => setLanguage(l.id)}>
              <span className="font-deva">{l.label}</span>
            </Chip>
          ))}
        </div>

        <p className="mt-5 mb-2 text-sm text-soft-ash/80">Preferred deity</p>
        <div className="flex flex-wrap gap-2">
          {DEITIES.map((d) => (
            <Chip key={d.id} selected={deity === d.id} onClick={() => setDeity(d.id)}>
              {d.icon} {d.label}
            </Chip>
          ))}
        </div>

        <p className="mt-5 mb-2 text-sm text-soft-ash/80">Current intention</p>
        <div className="flex flex-wrap gap-2">
          {INTENTIONS.map((opt) => (
            <Chip key={opt.id} selected={intention === opt.id} onClick={() => setIntention(opt.id)}>
              {opt.icon} {opt.label}
            </Chip>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-3">
          <Button onClick={save}>Save changes</Button>
          {saved && <span className="text-sm text-peacock-teal">Saved ✓</span>}
        </div>
      </GlassCard>

      <div className="mt-5 flex flex-col gap-3">
        <Link href="/history" className={buttonClasses("secondary", "md")}>
          <History size={16} /> View your history
        </Link>
        <button
          onClick={handleLogout}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-sacred-orange/40 px-5 py-2.5 text-sm text-sacred-orange transition-colors hover:bg-sacred-orange/10"
        >
          <LogOut size={16} /> Log out
        </button>
      </div>
    </div>
  );
}
