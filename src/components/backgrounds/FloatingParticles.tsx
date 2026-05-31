"use client";

import { motion, useReducedMotion } from "framer-motion";

// Soft floating star-like particles for cosmic screens.
// Positions are fixed (not random) so the server and client render the same
// thing — this avoids React hydration warnings.
const PARTICLES = [
  { left: "8%", top: "18%", size: 3, delay: 0 },
  { left: "22%", top: "62%", size: 2, delay: 1.2 },
  { left: "35%", top: "30%", size: 4, delay: 0.6 },
  { left: "48%", top: "75%", size: 2, delay: 1.8 },
  { left: "60%", top: "22%", size: 3, delay: 0.3 },
  { left: "72%", top: "55%", size: 2, delay: 2.1 },
  { left: "85%", top: "35%", size: 4, delay: 0.9 },
  { left: "90%", top: "70%", size: 2, delay: 1.5 },
  { left: "15%", top: "85%", size: 3, delay: 0.4 },
  { left: "55%", top: "48%", size: 2, delay: 2.4 },
];

export function FloatingParticles() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {PARTICLES.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-divine-gold"
          style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
          initial={{ opacity: 0.2 }}
          animate={
            reduceMotion
              ? { opacity: 0.4 }
              : { opacity: [0.2, 0.9, 0.2], y: [0, -16, 0] }
          }
          transition={{ duration: 6, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
