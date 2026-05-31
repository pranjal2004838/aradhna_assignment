"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { CosmicBackground } from "@/components/backgrounds/CosmicBackground";
import { Button } from "@/components/ui";
import { useAuth } from "@/lib/auth";
import { buildSankalpDays, createSankalpPath, DEITIES, INTENTIONS } from "@/lib/sankalp";
import { saveSankalpPath } from "@/lib/store";

export default function CreateSankalpPage() {
  const { user, profile } = useAuth();
  const router = useRouter();
  const [intention, setIntention] = useState(profile?.intention ?? "");
  const [deity, setDeity] = useState(profile?.preferredDeity ?? "");

  // Live preview of the 7 day titles once both choices are made.
  const previewDays = useMemo(() => {
    if (!intention || !deity) return [];
    return buildSankalpDays(intention, deity);
  }, [intention, deity]);

  function begin() {
    if (!user || !intention || !deity) return;
    const path = createSankalpPath(user.id, intention, deity, profile?.language ?? "hinglish");
    saveSankalpPath(user.id, path);
    router.replace(`/sankalp/${path.id}`);
  }

  return (
    <div className="relative">
      <CosmicBackground />

      <Link href="/sankalp" className="inline-flex items-center gap-1 text-sm text-soft-ash/70 hover:underline">
        <ArrowLeft size={16} /> Sankalp
      </Link>

      <h1 className="mt-3 font-[family-name:var(--font-heading)] text-3xl text-soft-ash">Create a Sankalp</h1>
      <p className="text-sm text-soft-ash/60">A 7-day journey, shaped by your intention and deity.</p>

      {/* Intention */}
      <h2 className="mt-6 mb-3 text-sm font-medium text-soft-ash/80">1. Choose your intention</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {INTENTIONS.map((opt) => {
          const selected = intention === opt.id;
          return (
            <motion.button
              key={opt.id}
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => setIntention(opt.id)}
              className={`rounded-2xl border p-4 text-left transition-all ${
                selected ? "border-divine-gold bg-divine-gold/15" : "border-white/12 bg-white/5 hover:border-divine-gold/40"
              }`}
            >
              <div className="text-2xl">{opt.icon}</div>
              <div className="mt-1 text-sm font-medium text-soft-ash">{opt.label}</div>
            </motion.button>
          );
        })}
      </div>

      {/* Deity */}
      <h2 className="mt-6 mb-3 text-sm font-medium text-soft-ash/80">2. Dedicate it to a deity</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {DEITIES.map((d) => {
          const selected = deity === d.id;
          return (
            <motion.button
              key={d.id}
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => setDeity(d.id)}
              className={`rounded-2xl border p-4 text-center transition-all ${
                selected ? "border-divine-gold bg-divine-gold/15" : "border-white/12 bg-white/5 hover:border-divine-gold/40"
              }`}
            >
              <div className="text-2xl">{d.icon}</div>
              <div className="mt-1 text-sm font-medium text-soft-ash">{d.label}</div>
            </motion.button>
          );
        })}
      </div>

      {/* Preview */}
      {previewDays.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
          <h2 className="mb-3 text-sm font-medium text-soft-ash/80">Your 7-day path</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {previewDays.map((d) => (
              <div key={d.day} className="rounded-xl border border-white/10 bg-white/5 p-3">
                <span className="text-xs text-divine-gold">Day {d.day}</span>
                <p className="text-sm text-soft-ash">{d.title}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      <div className="mt-8 flex justify-end">
        <Button size="lg" onClick={begin} disabled={!intention || !deity}>
          Begin Sankalp
        </Button>
      </div>
    </div>
  );
}
