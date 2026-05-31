"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen,
  Disc3,
  Flame,
  ShieldCheck,
  Sparkles,
  Sun,
} from "lucide-react";
import { CosmicBackground } from "@/components/backgrounds/CosmicBackground";
import { PhoneMockup } from "@/components/PhoneMockup";
import { Reveal } from "@/components/Reveal";
import { buttonClasses } from "@/components/ui";

const FEATURES = [
  { Icon: Sun, title: "Daily Ritual", text: "A personalized read–chant–reflect routine, ready every morning." },
  { Icon: Disc3, title: "Jaap Counter", text: "A tactile mala counter with a 108 target and streaks." },
  { Icon: BookOpen, title: "Content Library", text: "Aartis, chalisas and mantras in clean, readable reading mode." },
  { Icon: Sparkles, title: "Guruji Guidance", text: "Warm, safe spiritual reflection — never predictions or risky advice." },
  { Icon: Flame, title: "Sankalp Path", text: "A personalized 7-day devotional journey built around your intention." },
];

const SANKALP_DAYS = [
  "Begin with Courage",
  "Build Discipline",
  "Remove Distraction",
  "Steady Mind",
  "Faith with Effort",
  "Confidence",
  "Complete Sankalp",
];

export default function LandingPage() {
  return (
    <div className="relative">
      <CosmicBackground />

      {/* Top nav */}
      <header className="sticky top-0 z-40 border-b border-white/5 bg-cosmic-indigo/50 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🪔</span>
            <span className="font-[family-name:var(--font-heading)] text-xl text-divine-gold">Aradhana</span>
          </Link>
          <nav className="hidden items-center gap-8 text-sm text-soft-ash/70 md:flex">
            <a href="#features" className="hover:text-soft-ash">Features</a>
            <a href="#sankalp" className="hover:text-soft-ash">Sankalp</a>
            <a href="#safety" className="hover:text-soft-ash">Safety</a>
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/login" className={buttonClasses("ghost", "sm")}>Log in</Link>
            <Link href="/signup" className={buttonClasses("primary", "sm")}>Get started</Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 md:grid-cols-2 md:py-24">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-divine-gold/30 bg-white/5 px-4 py-1.5 text-xs text-divine-gold"
          >
            <Sparkles size={14} /> Cosmic Bhakti · Daily Devotion
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mt-5 font-[family-name:var(--font-heading)] text-4xl leading-[1.1] text-soft-ash md:text-6xl"
          >
            Your daily spiritual companion for ritual, reflection, and inner clarity.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-5 max-w-lg text-base text-soft-ash/70 md:text-lg"
          >
            Start a personalized devotional habit with aarti, jaap, Sankalp paths, and safe Guruji guidance — in under 60 seconds.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Link href="/signup" className={buttonClasses("primary", "lg")}>Begin your first Sankalp</Link>
            <a href="#features" className={buttonClasses("secondary", "lg")}>See features</a>
          </motion.div>
        </div>
        <div className="relative">
          <PhoneMockup />
        </div>
      </section>

      {/* Product story */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <Reveal>
          <h2 className="text-center font-[family-name:var(--font-heading)] text-3xl text-soft-ash md:text-4xl">
            From scattered prayers to a steady practice
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            { title: "Fragmented routines", text: "Devotion today is scattered across videos, PDFs and reminders that never stick." },
            { title: "A personalized ritual", text: "Aradhana gives you one calm daily ritual shaped around your deity and intention." },
            { title: "Habit through Sankalp", text: "A 7-day journey turns intention into a real, repeatable daily practice." },
          ].map((c, i) => (
            <Reveal key={c.title} delay={i * 0.1}>
              <div className="glass-card h-full rounded-3xl p-6">
                <div className="mb-3 text-sm text-divine-gold">0{i + 1}</div>
                <h3 className="font-[family-name:var(--font-heading)] text-xl text-soft-ash">{c.title}</h3>
                <p className="mt-2 text-sm text-soft-ash/70">{c.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Feature showcase */}
      <section id="features" className="mx-auto max-w-6xl px-4 py-16">
        <Reveal>
          <h2 className="text-center font-[family-name:var(--font-heading)] text-3xl text-soft-ash md:text-4xl">
            Everything you need for daily devotion
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {FEATURES.map(({ Icon, title, text }, i) => (
            <Reveal key={title} delay={(i % 3) * 0.08}>
              <motion.div whileHover={{ y: -6 }} className="glass-card h-full rounded-3xl p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-divine-gold/15 text-divine-gold">
                  <Icon size={24} />
                </div>
                <h3 className="font-[family-name:var(--font-heading)] text-xl text-soft-ash">{title}</h3>
                <p className="mt-2 text-sm text-soft-ash/70">{text}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Sankalp showcase */}
      <section id="sankalp" className="mx-auto max-w-6xl px-4 py-16">
        <Reveal>
          <div className="text-center">
            <span className="text-xs uppercase tracking-[0.3em] text-divine-gold">Signature feature</span>
            <h2 className="mt-3 font-[family-name:var(--font-heading)] text-3xl text-soft-ash md:text-4xl">The Sankalp Path</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-soft-ash/70">
              Choose an intention like exam focus or peace, pick your deity, and receive a personalized 7-day journey of mantra, reading and reflection.
            </p>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SANKALP_DAYS.map((title, i) => (
            <Reveal key={title} delay={i * 0.06}>
              <div className="glass-card rounded-2xl p-5">
                <div className="text-xs text-divine-gold">Day {i + 1}</div>
                <div className="mt-1 font-[family-name:var(--font-heading)] text-soft-ash">{title}</div>
              </div>
            </Reveal>
          ))}
          <Reveal delay={SANKALP_DAYS.length * 0.06}>
            <div className="flex h-full items-center justify-center rounded-2xl border border-divine-gold/40 bg-divine-gold/10 p-5 text-center">
              <span className="font-[family-name:var(--font-heading)] text-divine-gold">Sankalp Complete ✨</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Safety */}
      <section id="safety" className="mx-auto max-w-6xl px-4 py-16">
        <Reveal>
          <div className="mb-8 text-center">
            <div className="mb-3 inline-flex items-center gap-2 text-divine-gold">
              <ShieldCheck size={20} /> Responsible AI
            </div>
            <h2 className="font-[family-name:var(--font-heading)] text-3xl text-soft-ash md:text-4xl">Guruji guides — safely</h2>
          </div>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="parchment-card rounded-3xl p-6">
              <h3 className="font-[family-name:var(--font-heading)] text-xl">Guruji can</h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li>• Offer spiritual reflection and calm</li>
                <li>• Suggest a prayer, mantra or practice</li>
                <li>• Help with discipline and focus</li>
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="parchment-card rounded-3xl p-6">
              <h3 className="font-[family-name:var(--font-heading)] text-xl">Guruji will not</h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li>• Predict your future or exam results</li>
                <li>• Give medical, legal or financial advice</li>
                <li>• Use fear, guilt or superstition</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-4xl px-4 py-20 text-center">
        <Reveal>
          <h2 className="font-[family-name:var(--font-heading)] text-4xl text-soft-ash md:text-5xl">Begin your first Sankalp</h2>
          <p className="mx-auto mt-4 max-w-md text-soft-ash/70">
            A calmer, more devoted day is one ritual away. Create your free account in seconds.
          </p>
          <div className="mt-8 flex justify-center">
            <Link href="/signup" className={buttonClasses("primary", "lg")}>Start now — it&apos;s free</Link>
          </div>
        </Reveal>
      </section>

      <footer className="border-t border-white/5 py-8 text-center text-xs text-soft-ash/50">
        Aradhana · A devotional ritual companion · Built as a portfolio MVP
      </footer>
    </div>
  );
}
