"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CosmicBackground } from "@/components/backgrounds/CosmicBackground";
import { MandalaLoader } from "@/components/ui";
import { useAuth } from "@/lib/auth";
import { getGurujiQuestions, getJaapSessions, getRitualCompletions } from "@/lib/store";
import type { JaapSession } from "@/lib/types";

export default function HistoryPage() {
  const { user, profile } = useAuth();
  const [ready, setReady] = useState(false);
  const [sessions, setSessions] = useState<JaapSession[]>([]);
  const [activeDays, setActiveDays] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);

  useEffect(() => {
    if (!user) return;
    setSessions(getJaapSessions(user.id));
    setActiveDays(getRitualCompletions(user.id).length);
    setQuestionCount(getGurujiQuestions(user.id).length);
    setReady(true);
  }, [user]);

  if (!profile || !ready) return <MandalaLoader message="Gathering your history…" />;

  const totalReps = sessions.reduce((sum, s) => sum + s.count, 0);

  const stats = [
    { label: "Current streak", value: `${profile.streakCount}` },
    { label: "Days active", value: `${activeDays}` },
    { label: "Jaap sessions", value: `${sessions.length}` },
    { label: "Total repetitions", value: `${totalReps}` },
    { label: "Questions asked", value: `${questionCount}` },
  ];

  return (
    <div className="relative">
      <CosmicBackground />

      <Link href="/profile" className="inline-flex items-center gap-1 text-sm text-soft-ash/70 hover:underline">
        <ArrowLeft size={16} /> Profile
      </Link>

      <h1 className="mt-3 font-[family-name:var(--font-heading)] text-3xl text-soft-ash">Your journey so far</h1>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="glass-card rounded-2xl p-4 text-center">
            <div className="font-[family-name:var(--font-heading)] text-3xl text-divine-gold">{s.value}</div>
            <div className="mt-1 text-xs text-soft-ash/60">{s.label}</div>
          </div>
        ))}
      </div>

      <h2 className="mt-8 mb-3 font-[family-name:var(--font-heading)] text-lg text-soft-ash">Recent jaap sessions</h2>
      {sessions.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center text-sm text-soft-ash/60">
          No sessions yet. <Link href="/jaap" className="text-divine-gold underline">Start your first jaap →</Link>
        </div>
      ) : (
        <div className="space-y-2">
          {sessions.slice(0, 10).map((s) => (
            <div key={s.id} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <div>
                <p className="font-deva text-sm text-soft-ash">{s.mantra}</p>
                <p className="text-xs text-soft-ash/50">{new Date(s.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-divine-gold">{s.count}/{s.target}</p>
                {s.completed && <p className="text-xs text-peacock-teal">completed</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
