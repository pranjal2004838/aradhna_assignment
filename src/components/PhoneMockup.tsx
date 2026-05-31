"use client";

import { motion } from "framer-motion";

// A small, CSS-only phone mockup used on the landing page.
// It hints at the in-app experience without needing screenshots.
export function PhoneMockup({ float = true }: { float?: boolean }) {
  return (
    <motion.div
      animate={float ? { y: [0, -12, 0] } : undefined}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="relative mx-auto w-[260px]"
    >
      <div className="rounded-[2.5rem] border-[6px] border-night-purple bg-cosmic-indigo p-3 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]">
        <div
          className="overflow-hidden rounded-[1.9rem] p-5"
          style={{ background: "var(--gradient-temple-dawn)" }}
        >
          <p className="text-xs text-temple-maroon/80">Namaste, Pranjal</p>
          <p className="font-[family-name:var(--font-heading)] text-lg text-temple-maroon">Today&apos;s Ritual</p>

          <div className="mt-4 rounded-2xl bg-white/70 p-4 text-temple-maroon shadow">
            <p className="text-[11px] font-medium">Read · Chant · Reflect</p>
            <div className="mt-3 flex items-center justify-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-sacred-orange/40 border-t-sacred-orange">
                <span className="font-[family-name:var(--font-heading)] text-2xl">108</span>
              </div>
            </div>
            <p className="mt-3 text-center text-[10px] text-temple-maroon/70">Hanuman Jaap</p>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <span className="text-base">🔥</span>
            <span className="text-[11px] text-temple-maroon/80">7-day streak</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
