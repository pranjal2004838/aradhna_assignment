"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { TempleDawnBackground } from "@/components/backgrounds/TempleDawnBackground";
import { JaapRing } from "@/components/JaapRing";
import { Button, buttonClasses, MandalaLoader } from "@/components/ui";
import { useAuth } from "@/lib/auth";
import { addJaapSession, getActiveSankalp, upsertTodayCompletion } from "@/lib/store";
import { readJSON, writeJSON, removeKey } from "@/lib/storage";

const DEFAULT_MANTRA = "ॐ नमः शिवाय (Om Namah Shivaya)";

export default function JaapPage() {
  const { user, profile, recordRitualToday } = useAuth();
  const [ready, setReady] = useState(false);
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(108);
  const [mantra, setMantra] = useState(DEFAULT_MANTRA);
  const [showCompletion, setShowCompletion] = useState(false);
  const startedAt = useRef<number>(0);
  const savedRef = useRef(false);

  const progressKey = user ? `aradhana_jaap_progress_${user.id}` : "";

  // On mount: choose mantra/target from the active Sankalp day (if any) and
  // restore any in-progress count so a refresh never loses chanting.
  useEffect(() => {
    if (!user) return;
    const active = getActiveSankalp(user.id);
    if (active) {
      const day = active.days[active.currentDay - 1];
      if (day) {
        setMantra(day.mantra);
        setTarget(day.jaapTarget);
      }
    }
    const saved = readJSON<{ count: number; startedAt: number } | null>(`aradhana_jaap_progress_${user.id}`, null);
    if (saved) {
      setCount(saved.count);
      startedAt.current = saved.startedAt;
    } else {
      startedAt.current = Date.now();
    }
    setReady(true);
  }, [user]);

  function persist(nextCount: number) {
    if (!progressKey) return;
    writeJSON(progressKey, { count: nextCount, startedAt: startedAt.current });
  }

  function finishSession(finalCount: number) {
    if (!user || savedRef.current) return;
    savedRef.current = true;
    const durationSeconds = Math.max(1, Math.round((Date.now() - startedAt.current) / 1000));
    addJaapSession(user.id, { mantra, count: finalCount, target, durationSeconds });
    upsertTodayCompletion(user.id, { jaapCompleted: true });
    recordRitualToday();
  }

  function handleTap() {
    const next = count + 1;
    setCount(next);
    persist(next);
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate?.(10);
    }
    if (next === target) {
      finishSession(next);
      setShowCompletion(true);
    }
  }

  function reset() {
    setCount(0);
    savedRef.current = false;
    startedAt.current = Date.now();
    setShowCompletion(false);
    if (progressKey) removeKey(progressKey);
  }

  if (!profile || !ready) return <MandalaLoader message="Preparing your jaap…" />;

  return (
    <div className="relative">
      <TempleDawnBackground />

      <div className="flex flex-col items-center text-center">
        <p className="text-sm text-soft-ash/70">Chant with devotion</p>
        <h1 className="mt-1 max-w-md font-deva text-2xl text-soft-ash">{mantra}</h1>

        {/* Tap area */}
        <motion.button
          type="button"
          whileTap={{ scale: 0.96 }}
          onClick={handleTap}
          aria-label="Tap to count one repetition"
          className="mt-8 rounded-full outline-none focus-visible:ring-4 focus-visible:ring-divine-gold/50"
        >
          <JaapRing count={count} target={target} />
        </motion.button>

        <p className="mt-6 text-sm text-soft-ash/60">Tap the circle for each repetition</p>

        <div className="mt-6 flex items-center gap-3">
          <Button variant="secondary" onClick={reset}>
            <RotateCcw size={16} /> Reset
          </Button>
          {count >= target && (
            <Button onClick={() => setShowCompletion(true)}>View completion</Button>
          )}
        </div>
      </div>

      {/* Completion overlay */}
      <AnimatePresence>
        {showCompletion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-cosmic-indigo/80 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="parchment-card w-full max-w-sm rounded-3xl p-8 text-center"
            >
              <div className="text-5xl">🪷</div>
              <h2 className="mt-4 font-[family-name:var(--font-heading)] text-2xl">{target} Jaap Completed</h2>
              <p className="mt-2 text-sm text-temple-maroon/80">
                Your streak is now <span className="font-semibold">{profile.streakCount}</span> day
                {profile.streakCount === 1 ? "" : "s"}. Carry this calm with you.
              </p>
              <div className="mt-6 flex flex-col gap-2">
                <Link href="/sankalp" className={buttonClasses("primary", "md")}>Continue your Sankalp</Link>
                <Link href="/library" className={buttonClasses("secondary", "md")}>Read an aarti</Link>
                <button
                  onClick={() => setShowCompletion(false)}
                  className="mt-1 text-sm text-temple-maroon/70 hover:underline"
                >
                  Keep chanting
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
