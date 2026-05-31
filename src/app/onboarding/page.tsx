"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { CosmicBackground } from "@/components/backgrounds/CosmicBackground";
import { Button, Chip, GlassCard, MandalaLoader } from "@/components/ui";
import { useAuth } from "@/lib/auth";
import { DEITIES, INTENTIONS } from "@/lib/sankalp";
import type { Language } from "@/lib/types";

const LANGUAGES: { id: Language; label: string }[] = [
  { id: "hi", label: "हिंदी" },
  { id: "en", label: "English" },
  { id: "hinglish", label: "Hinglish" },
];

export default function OnboardingPage() {
  const { user, profile, loading, saveProfile } = useAuth();
  const router = useRouter();

  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [language, setLanguage] = useState<Language>("hinglish");
  const [deity, setDeity] = useState("");
  const [intention, setIntention] = useState("");
  const [error, setError] = useState("");

  // Guests cannot onboard; already-onboarded users skip ahead.
  useEffect(() => {
    if (loading) return;
    if (!user) router.replace("/login");
    else if (profile?.onboardingCompleted) router.replace("/home");
  }, [loading, user, profile, router]);

  if (loading || !user || profile?.onboardingCompleted) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <MandalaLoader message="Preparing your space…" />
      </div>
    );
  }

  function next() {
    setError("");
    if (step === 1) {
      if (name.trim().length < 2) return setError("Please enter your name.");
      if (!deity) return setError("Please choose a deity to begin with.");
    }
    setStep((s) => s + 1);
  }

  function finish() {
    if (!intention) return setError("Please choose an intention.");
    saveProfile({
      displayName: name.trim(),
      language,
      preferredDeity: deity,
      intention,
      onboardingCompleted: true,
    });
    router.replace("/home");
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center px-4 py-12">
      <CosmicBackground />
      <div className="w-full max-w-lg">
        {/* progress dots */}
        <div className="mb-6 flex justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all ${i <= step ? "w-8 bg-divine-gold" : "w-3 bg-white/20"}`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className="text-center"
            >
              <div className="mb-6 text-6xl animate-float-soft">🪔</div>
              <h1 className="font-[family-name:var(--font-heading)] text-4xl text-soft-ash">Welcome to Aradhana</h1>
              <p className="mx-auto mt-4 max-w-sm text-soft-ash/70">
                In a few calm steps, we will shape a daily ritual around you. Let us begin your journey.
              </p>
              <div className="mt-8 flex justify-center">
                <Button size="lg" onClick={() => setStep(1)}>Begin your journey</Button>
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="prefs"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
            >
              <GlassCard className="p-6">
                <h2 className="font-[family-name:var(--font-heading)] text-2xl text-soft-ash">Your preferences</h2>

                <label htmlFor="name" className="mt-5 mb-1 block text-sm text-soft-ash/80">Your name</label>
                <input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Pranjal"
                  className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-soft-ash placeholder:text-soft-ash/30 focus:border-divine-gold/60 focus:outline-none"
                />

                <p className="mt-5 mb-2 text-sm text-soft-ash/80">Preferred language</p>
                <div className="flex flex-wrap gap-2">
                  {LANGUAGES.map((l) => (
                    <Chip key={l.id} selected={language === l.id} onClick={() => setLanguage(l.id)}>
                      <span className="font-deva">{l.label}</span>
                    </Chip>
                  ))}
                </div>

                <p className="mt-5 mb-2 text-sm text-soft-ash/80">Preferred deity</p>
                <div className="flex flex-wrap gap-2">
                  {DEITIES.map((d) => (
                    <Chip key={d.id} selected={deity === d.id} onClick={() => setDeity(d.id)}>
                      {d.icon} {d.label}
                    </Chip>
                  ))}
                </div>

                {error && <p role="alert" className="mt-4 text-sm text-sacred-orange">{error}</p>}

                <div className="mt-6 flex justify-between">
                  <Button variant="ghost" onClick={() => setStep(0)}>Back</Button>
                  <Button onClick={next}>Continue</Button>
                </div>
              </GlassCard>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="intention"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
            >
              <GlassCard className="p-6">
                <h2 className="font-[family-name:var(--font-heading)] text-2xl text-soft-ash">Choose your intention</h2>
                <p className="mt-1 text-sm text-soft-ash/60">What would you like to nurture right now?</p>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  {INTENTIONS.map((opt) => {
                    const selected = intention === opt.id;
                    return (
                      <motion.button
                        key={opt.id}
                        type="button"
                        whileHover={{ y: -4 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                          setIntention(opt.id);
                          setError("");
                        }}
                        className={`rounded-2xl border p-4 text-left transition-all ${
                          selected
                            ? "border-divine-gold bg-divine-gold/15 shadow-[0_0_24px_-8px_rgba(255,209,102,0.7)]"
                            : "border-white/12 bg-white/5 hover:border-divine-gold/40"
                        }`}
                      >
                        <div className="text-2xl">{opt.icon}</div>
                        <div className="mt-2 font-medium text-soft-ash">{opt.label}</div>
                        <div className="text-xs text-soft-ash/60">{opt.blurb}</div>
                      </motion.button>
                    );
                  })}
                </div>

                {error && <p role="alert" className="mt-4 text-sm text-sacred-orange">{error}</p>}

                <div className="mt-6 flex justify-between">
                  <Button variant="ghost" onClick={() => setStep(1)}>Back</Button>
                  <Button onClick={finish}>Enter Aradhana</Button>
                </div>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
