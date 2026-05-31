"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Disc3, Minus, Plus } from "lucide-react";
import { ParchmentBackground } from "@/components/backgrounds/ParchmentBackground";
import { Button, buttonClasses } from "@/components/ui";
import { useAuth } from "@/lib/auth";
import { SEED_CONTENT } from "@/lib/content";
import { getTodayCompletion, upsertTodayCompletion } from "@/lib/store";

const MIN_FONT = 16;
const MAX_FONT = 30;

export default function ReadingPage() {
  const params = useParams<{ id: string }>();
  const { user, recordRitualToday } = useAuth();
  const content = SEED_CONTENT.find((c) => c.id === params.id);

  const [fontSize, setFontSize] = useState(20);
  const [showTranslation, setShowTranslation] = useState(false);
  const [read, setRead] = useState(false);
  const [progress, setProgress] = useState(0);

  // Reading progress bar based on scroll position.
  useEffect(() => {
    function onScroll() {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 1);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Reflect whether this aarti was already marked read today.
  useEffect(() => {
    if (!user || !content) return;
    const today = getTodayCompletion(user.id);
    if (today?.aartiRead && today.contentId === content.id) setRead(true);
  }, [user, content]);

  if (!content) {
    return (
      <div className="relative">
        <ParchmentBackground />
        <p className="text-temple-maroon">This text could not be found.</p>
        <Link href="/library" className="text-temple-maroon underline">Back to library</Link>
      </div>
    );
  }

  function markRead() {
    if (!user || !content) return;
    upsertTodayCompletion(user.id, { aartiRead: true, contentId: content.id });
    recordRitualToday();
    setRead(true);
  }

  return (
    <div className="relative text-temple-maroon">
      <ParchmentBackground />

      {/* Reading progress bar */}
      <div className="fixed inset-x-0 top-0 z-40 h-1 bg-transparent">
        <div className="h-full bg-sacred-orange transition-[width]" style={{ width: `${progress * 100}%` }} />
      </div>

      <Link href="/library" className="inline-flex items-center gap-1 text-sm text-temple-maroon/70 hover:underline">
        <ArrowLeft size={16} /> Library
      </Link>

      {/* Header + controls */}
      <div className="mt-3 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-[family-name:var(--font-heading)] text-3xl">{content.title}</h1>
          <p className="mt-1 text-sm text-temple-maroon/70">
            {content.deity} · <span className="uppercase">{content.type}</span>
            {content.durationMinutes ? ` · ${content.durationMinutes} min` : ""}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFontSize((f) => Math.max(MIN_FONT, f - 2))}
            aria-label="Decrease text size"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-temple-maroon/20 bg-white/60"
          >
            <Minus size={16} />
          </button>
          <button
            onClick={() => setFontSize((f) => Math.min(MAX_FONT, f + 2))}
            aria-label="Increase text size"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-temple-maroon/20 bg-white/60"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      {content.translation && (
        <button
          onClick={() => setShowTranslation((s) => !s)}
          className="mt-3 rounded-full border border-temple-maroon/20 bg-white/60 px-4 py-1.5 text-sm"
        >
          {showTranslation ? "Hide meaning" : "Show meaning"}
        </button>
      )}

      {/* Body */}
      <motion.article
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="parchment-card mt-5 rounded-3xl p-6 sm:p-8"
      >
        {showTranslation && content.translation && (
          <p className="mb-5 rounded-xl bg-saffron-gold/15 p-4 text-sm italic text-temple-maroon/80">
            {content.translation}
          </p>
        )}
        <div className="font-deva whitespace-pre-line" style={{ fontSize, lineHeight: 1.9 }}>
          {content.body}
        </div>
      </motion.article>

      {/* Actions */}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        {read ? (
          <span className="inline-flex items-center gap-2 rounded-full bg-peacock-teal/15 px-4 py-2 text-sm text-peacock-teal">
            <Check size={16} /> Marked as read today
          </span>
        ) : (
          <Button onClick={markRead}>
            <Check size={16} /> Mark as read
          </Button>
        )}
        <Link href="/jaap" className={buttonClasses("secondary", "md")}>
          <Disc3 size={16} /> Chant the mantra
        </Link>
      </div>
    </div>
  );
}
