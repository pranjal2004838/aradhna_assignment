"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Flame, Plus } from "lucide-react";
import { CosmicBackground } from "@/components/backgrounds/CosmicBackground";
import { buttonClasses, MandalaLoader } from "@/components/ui";
import { useAuth } from "@/lib/auth";
import { getSankalpPaths } from "@/lib/store";
import { INTENTIONS } from "@/lib/sankalp";
import type { SankalpPath } from "@/lib/types";

function intentionLabel(id: string): string {
  return INTENTIONS.find((i) => i.id === id)?.label ?? id;
}

export default function SankalpOverviewPage() {
  const { user } = useAuth();
  const [ready, setReady] = useState(false);
  const [paths, setPaths] = useState<SankalpPath[]>([]);

  useEffect(() => {
    if (!user) return;
    setPaths(getSankalpPaths(user.id));
    setReady(true);
  }, [user]);

  if (!ready) return <MandalaLoader message="Gathering your journeys…" />;

  const active = paths.find((p) => p.status === "active");
  const past = paths.filter((p) => p.status !== "active");

  return (
    <div className="relative">
      <CosmicBackground />

      <header className="flex items-center justify-between">
        <div>
          <h1 className="font-[family-name:var(--font-heading)] text-3xl text-soft-ash">Sankalp Path</h1>
          <p className="text-sm text-soft-ash/60">Your personalized 7-day devotional journeys.</p>
        </div>
        <Link href="/sankalp/create" className={buttonClasses("primary", "sm")}>
          <Plus size={16} /> New
        </Link>
      </header>

      {active ? (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
          <Link href={`/sankalp/${active.id}`}>
            <div className="glass-card rounded-3xl p-6">
              <div className="flex items-center gap-2 text-divine-gold">
                <Flame size={18} /> <span className="text-xs uppercase tracking-wide">Active journey</span>
              </div>
              <h2 className="mt-2 font-[family-name:var(--font-heading)] text-2xl text-soft-ash">{active.title}</h2>
              <p className="mt-1 text-sm text-soft-ash/60">Day {active.currentDay} of 7</p>
              <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-saffron-gold to-divine-gold"
                  style={{ width: `${(active.days.filter((d) => d.completed).length / 7) * 100}%` }}
                />
              </div>
              <span className="mt-4 inline-block text-sm text-divine-gold">Continue →</span>
            </div>
          </Link>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 glass-card rounded-3xl p-8 text-center"
        >
          <div className="text-5xl">🔥</div>
          <h2 className="mt-4 font-[family-name:var(--font-heading)] text-2xl text-soft-ash">Begin your first Sankalp</h2>
          <p className="mx-auto mt-2 max-w-sm text-sm text-soft-ash/70">
            Choose an intention and deity, and receive a guided 7-day path of mantra, reading and reflection.
          </p>
          <div className="mt-6 flex justify-center">
            <Link href="/sankalp/create" className={buttonClasses("primary", "lg")}>
              <Plus size={18} /> Create a Sankalp Path
            </Link>
          </div>
        </motion.div>
      )}

      {past.length > 0 && (
        <div className="mt-8">
          <h3 className="mb-3 font-[family-name:var(--font-heading)] text-lg text-soft-ash">Past journeys</h3>
          <div className="space-y-3">
            {past.map((p) => (
              <Link key={p.id} href={`/sankalp/${p.id}`}>
                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div>
                    <p className="text-soft-ash">{intentionLabel(p.intention)} · {p.deity}</p>
                    <p className="text-xs text-soft-ash/50">
                      {p.days.filter((d) => d.completed).length}/7 days · {p.status}
                    </p>
                  </div>
                  <span className="text-sm text-divine-gold">View →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
