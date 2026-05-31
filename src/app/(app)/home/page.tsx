"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Check, Disc3, Flame, Sparkles } from "lucide-react";
import { TempleDawnBackground } from "@/components/backgrounds/TempleDawnBackground";
import { buttonClasses, MandalaLoader } from "@/components/ui";
import { useAuth } from "@/lib/auth";
import { SEED_CONTENT } from "@/lib/content";
import { getActiveSankalp, getTodayCompletion } from "@/lib/store";
import type { Content, RitualCompletion, SankalpPath } from "@/lib/types";

// Pick today's reading: prefer a featured item for the user's deity,
// then any item for that deity, then any featured item.
function pickDailyContent(deity: string): Content {
  return (
    SEED_CONTENT.find((c) => c.deity === deity && c.isFeatured) ??
    SEED_CONTENT.find((c) => c.deity === deity) ??
    SEED_CONTENT.find((c) => c.isFeatured) ??
    SEED_CONTENT[0]
  );
}

export default function HomePage() {
  const { user, profile } = useAuth();
  const [ready, setReady] = useState(false);
  const [completion, setCompletion] = useState<RitualCompletion | undefined>();
  const [sankalp, setSankalp] = useState<SankalpPath | undefined>();
  const [dateLabel, setDateLabel] = useState("");

  const daily = useMemo(() => pickDailyContent(profile?.preferredDeity ?? ""), [profile?.preferredDeity]);

  // Read local data after mount (localStorage is client-only).
  useEffect(() => {
    if (!user) return;
    setCompletion(getTodayCompletion(user.id));
    setSankalp(getActiveSankalp(user.id));
    setDateLabel(new Date().toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" }));
    setReady(true);
  }, [user]);

  if (!profile || !ready) return <MandalaLoader message="Preparing your ritual…" />;

  const steps = [
    { key: "read", label: "Read", done: completion?.aartiRead ?? false, Icon: BookOpen },
    { key: "chant", label: "Chant", done: completion?.jaapCompleted ?? false, Icon: Disc3 },
    { key: "reflect", label: "Reflect", done: (completion?.aartiRead && completion?.jaapCompleted) ?? false, Icon: Sparkles },
  ];
  const doneCount = steps.filter((s) => s.done).length;

  return (
    <div className="relative">
      <TempleDawnBackground />

      {/* Greeting */}
      <motion.header
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start justify-between"
      >
        <div>
          <p className="text-sm text-soft-ash/70">{dateLabel}</p>
          <h1 className="font-[family-name:var(--font-heading)] text-3xl text-soft-ash">
            Namaste, {profile.displayName}
          </h1>
        </div>
        <div className="flex items-center gap-1.5 rounded-full border border-divine-gold/40 bg-divine-gold/15 px-3 py-1.5 text-sm text-divine-gold">
          <Flame size={16} /> {profile.streakCount}
        </div>
      </motion.header>

      {/* Daily ritual card */}
      <motion.section
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="parchment-card mt-6 rounded-3xl p-6"
      >
        <div className="flex items-center justify-between">
          <h2 className="font-[family-name:var(--font-heading)] text-xl">Today&apos;s Ritual</h2>
          <span className="text-xs font-medium text-temple-maroon/70">{doneCount}/3 complete</span>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3">
          {steps.map(({ key, label, done, Icon }) => (
            <div
              key={key}
              className={`flex flex-col items-center gap-2 rounded-2xl border p-4 ${
                done ? "border-peacock-teal/50 bg-peacock-teal/10" : "border-temple-maroon/15 bg-white/40"
              }`}
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${
                  done ? "bg-peacock-teal text-white" : "bg-temple-maroon/10 text-temple-maroon"
                }`}
              >
                {done ? <Check size={18} /> : <Icon size={18} />}
              </div>
              <span className="text-xs font-medium text-temple-maroon">{label}</span>
            </div>
          ))}
        </div>

        <p className="mt-5 text-sm text-temple-maroon/80">
          Suggested for you: <span className="font-medium">{daily.title}</span>
        </p>
        <div className="mt-3 flex flex-wrap gap-3">
          <Link href={`/library/${daily.id}`} className={buttonClasses("secondary", "sm")}>
            <BookOpen size={16} /> Read aarti
          </Link>
          <Link href="/jaap" className={buttonClasses("primary", "sm")}>
            <Disc3 size={16} /> Start Jaap
          </Link>
        </div>
      </motion.section>

      {/* Start jaap big CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-5"
      >
        <Link href="/jaap" className="block">
          <div className="glass-card flex items-center justify-between rounded-3xl p-5">
            <div>
              <p className="font-[family-name:var(--font-heading)] text-lg text-soft-ash">Begin a Jaap session</p>
              <p className="text-sm text-soft-ash/60">108 repetitions · tap to count</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-saffron-gold to-sacred-orange text-cosmic-indigo">
              <Disc3 size={22} />
            </div>
          </div>
        </Link>
      </motion.div>

      {/* Sankalp progress preview */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="mt-5"
      >
        {sankalp ? (
          <Link href={`/sankalp/${sankalp.id}`} className="block">
            <div className="glass-card rounded-3xl p-5">
              <div className="flex items-center justify-between">
                <p className="font-[family-name:var(--font-heading)] text-lg text-soft-ash">{sankalp.title}</p>
                <Flame size={18} className="text-divine-gold" />
              </div>
              <p className="mt-1 text-sm text-soft-ash/60">Day {sankalp.currentDay} of 7</p>
              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-saffron-gold to-divine-gold"
                  style={{ width: `${(sankalp.days.filter((d) => d.completed).length / 7) * 100}%` }}
                />
              </div>
            </div>
          </Link>
        ) : (
          <div className="glass-card rounded-3xl p-5 text-center">
            <p className="text-sm text-soft-ash/70">Your first Sankalp is waiting.</p>
            <div className="mt-3 flex justify-center">
              <Link href="/sankalp" className={buttonClasses("primary", "sm")}>
                <Flame size={16} /> Create a Sankalp Path
              </Link>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
