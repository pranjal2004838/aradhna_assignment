"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Check, Disc3, Lock } from "lucide-react";
import { CosmicBackground } from "@/components/backgrounds/CosmicBackground";
import { Button, buttonClasses, MandalaLoader } from "@/components/ui";
import { useAuth } from "@/lib/auth";
import { SEED_CONTENT } from "@/lib/content";
import { getSankalpById, saveSankalpPath } from "@/lib/store";
import type { SankalpPath } from "@/lib/types";

function readingHref(title: string): string | null {
  const match = SEED_CONTENT.find((c) => c.title === title);
  return match ? `/library/${match.id}` : null;
}

export default function SankalpDetailPage() {
  const params = useParams<{ id: string }>();
  const { user, recordRitualToday } = useAuth();
  const [ready, setReady] = useState(false);
  const [path, setPath] = useState<SankalpPath | undefined>();

  useEffect(() => {
    if (!user) return;
    setPath(getSankalpById(user.id, params.id));
    setReady(true);
  }, [user, params.id]);

  if (!ready) return <MandalaLoader message="Opening your Sankalp…" />;

  if (!path) {
    return (
      <div className="relative">
        <CosmicBackground />
        <p className="text-soft-ash">This Sankalp could not be found.</p>
        <Link href="/sankalp" className="text-divine-gold underline">Back to Sankalp</Link>
      </div>
    );
  }

  const completedCount = path.days.filter((d) => d.completed).length;
  const isComplete = path.status === "completed";

  function completeDay(dayNumber: number) {
    if (!user || !path) return;
    const updatedDays = path.days.map((d) => (d.day === dayNumber ? { ...d, completed: true } : d));
    const finished = dayNumber >= 7;
    const updated: SankalpPath = {
      ...path,
      days: updatedDays,
      currentDay: finished ? path.currentDay : path.currentDay + 1,
      status: finished ? "completed" : "active",
      completedAt: finished ? new Date().toISOString() : path.completedAt,
    };
    saveSankalpPath(user.id, updated);
    setPath(updated);
    recordRitualToday();
  }

  return (
    <div className="relative">
      <CosmicBackground />

      <Link href="/sankalp" className="inline-flex items-center gap-1 text-sm text-soft-ash/70 hover:underline">
        <ArrowLeft size={16} /> Sankalp
      </Link>

      <h1 className="mt-3 font-[family-name:var(--font-heading)] text-2xl text-soft-ash sm:text-3xl">{path.title}</h1>
      <p className="mt-1 text-sm text-soft-ash/60">{completedCount} of 7 days complete</p>
      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-saffron-gold to-divine-gold transition-[width]"
          style={{ width: `${(completedCount / 7) * 100}%` }}
        />
      </div>

      {isComplete && (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6 rounded-3xl border border-divine-gold/40 bg-divine-gold/10 p-6 text-center"
        >
          <div className="text-5xl">🌟</div>
          <h2 className="mt-3 font-[family-name:var(--font-heading)] text-2xl text-divine-gold">Sankalp Complete</h2>
          <p className="mx-auto mt-2 max-w-sm text-sm text-soft-ash/80">
            You honoured your intention for 7 days. May this steadiness stay with you.
          </p>
          <div className="mt-5 flex justify-center">
            <Link href="/sankalp/create" className={buttonClasses("primary", "md")}>Begin a new Sankalp</Link>
          </div>
        </motion.div>
      )}

      {/* Day list */}
      <div className="mt-6 space-y-3">
        {path.days.map((day) => {
          const isCurrent = day.day === path.currentDay && !isComplete;
          const isLocked = day.day > path.currentDay && !day.completed;
          const href = readingHref(day.readingTitle);

          return (
            <div
              key={day.day}
              className={`rounded-2xl border p-5 transition-all ${
                isCurrent
                  ? "border-divine-gold/50 bg-white/10"
                  : day.completed
                    ? "border-peacock-teal/30 bg-peacock-teal/5"
                    : "border-white/10 bg-white/5"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-divine-gold">Day {day.day}</span>
                  {day.completed && <Check size={14} className="text-peacock-teal" />}
                  {isLocked && <Lock size={14} className="text-soft-ash/40" />}
                </div>
                {isCurrent && <span className="text-xs text-divine-gold">Today&apos;s focus</span>}
              </div>

              <h3 className="mt-1 font-[family-name:var(--font-heading)] text-lg text-soft-ash">{day.title}</h3>

              {/* Details shown for the current day (and any completed day) */}
              {(isCurrent || day.completed) && (
                <div className="mt-3 space-y-3 text-sm text-soft-ash/80">
                  <p className="font-deva text-base text-soft-ash">{day.mantra}</p>
                  <p className="text-soft-ash/70">{day.reflection}</p>

                  <div className="flex flex-wrap gap-2">
                    <Link href="/jaap" className={buttonClasses("secondary", "sm")}>
                      <Disc3 size={14} /> Jaap ×{day.jaapTarget}
                    </Link>
                    {href && (
                      <Link href={href} className={buttonClasses("secondary", "sm")}>
                        <BookOpen size={14} /> {day.readingTitle}
                      </Link>
                    )}
                  </div>

                  {isCurrent && (
                    <Button onClick={() => completeDay(day.day)} className="mt-1">
                      <Check size={16} /> Mark Day {day.day} complete
                    </Button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
