// Reusable Framer Motion presets so every screen animates the same way.
// Importing these keeps animation consistent and the code short.
import type { Variants } from "framer-motion";

export const pageMotion = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: 0.35, ease: "easeOut" as const },
};

export const cardMotion = {
  initial: { opacity: 0, y: 24, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { duration: 0.4, ease: "easeOut" as const },
};

export const tapMotion = {
  whileTap: { scale: 0.97 },
};

// Stagger container + child, used for lists of cards and chips.
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

// Soft repeating gold glow for primary CTAs and the jaap ring.
export const glowPulse = {
  animate: {
    boxShadow: [
      "0 0 20px rgba(255, 209, 102, 0.15)",
      "0 0 42px rgba(255, 209, 102, 0.35)",
      "0 0 20px rgba(255, 209, 102, 0.15)",
    ],
  },
  transition: { duration: 2.8, repeat: Infinity },
};
