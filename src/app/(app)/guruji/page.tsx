"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Send, ShieldCheck } from "lucide-react";
import { CosmicBackground } from "@/components/backgrounds/CosmicBackground";
import { Button, MandalaLoader } from "@/components/ui";
import { useAuth } from "@/lib/auth";
import { addGurujiQuestion, getGurujiQuestions, getTodayQuestionCount } from "@/lib/store";
import { askGuruji, DAILY_QUESTION_LIMIT, MAX_QUESTION_LENGTH } from "@/lib/guruji";
import type { GurujiQuestion } from "@/lib/types";

const SUGGESTIONS = [
  "How do I calm my anxious mind?",
  "Help me focus while studying",
  "How do I build a daily habit?",
];

export default function GurujiPage() {
  const { user, profile } = useAuth();
  const [ready, setReady] = useState(false);
  const [history, setHistory] = useState<GurujiQuestion[]>([]);
  const [todayCount, setTodayCount] = useState(0);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) return;
    setHistory(getGurujiQuestions(user.id));
    setTodayCount(getTodayQuestionCount(user.id));
    setReady(true);
  }, [user]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  if (!profile || !ready) return <MandalaLoader message="Calling on Guruji…" />;

  const remaining = Math.max(0, DAILY_QUESTION_LIMIT - todayCount);
  const limitReached = remaining === 0;

  function send(text: string) {
    if (!user) return;
    const question = text.trim();
    setError("");
    if (question.length === 0) return;
    if (question.length > MAX_QUESTION_LENGTH) {
      setError(`Please keep your question under ${MAX_QUESTION_LENGTH} characters.`);
      return;
    }
    if (limitReached) {
      setError("You have reached today's limit of reflections. Please return tomorrow.");
      return;
    }
    const { answer, flagged } = askGuruji(question, profile!.language);
    const saved = addGurujiQuestion(user.id, { question, answer, flagged });
    setHistory((h) => [...h, saved]);
    setTodayCount((c) => c + 1);
    setInput("");
  }

  return (
    <div className="relative flex min-h-[80vh] flex-col">
      <CosmicBackground />

      <header className="flex items-center justify-between">
        <div>
          <h1 className="font-[family-name:var(--font-heading)] text-3xl text-soft-ash">Ask Guruji</h1>
          <p className="text-sm text-soft-ash/60">Warm, safe spiritual reflection.</p>
        </div>
        <span className="rounded-full border border-divine-gold/30 bg-white/5 px-3 py-1 text-xs text-divine-gold">
          {remaining} left today
        </span>
      </header>

      {/* Safety disclaimer */}
      <div className="mt-4 flex items-start gap-2 rounded-2xl border border-peacock-teal/30 bg-peacock-teal/10 p-3 text-xs text-soft-ash/80">
        <ShieldCheck size={16} className="mt-0.5 shrink-0 text-peacock-teal" />
        <p>Guruji offers spiritual reflection only — never medical, legal, financial advice or predictions.</p>
      </div>

      {/* Conversation */}
      <div className="mt-4 flex-1 space-y-4">
        {history.length === 0 && (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
            <div className="text-4xl">🪔</div>
            <p className="mt-3 text-sm text-soft-ash/70">
              Share what is on your heart, and Guruji will reflect with you.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-soft-ash/80 hover:border-divine-gold/40"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {history.map((m) => (
          <div key={m.id} className="space-y-2">
            <div className="flex justify-end">
              <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-gradient-to-r from-saffron-gold to-sacred-orange px-4 py-2.5 text-sm text-cosmic-indigo">
                {m.question}
              </div>
            </div>
            <div className="flex justify-start">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-[85%] rounded-2xl rounded-bl-sm border border-white/10 bg-white/5 px-4 py-3 text-sm text-soft-ash/90"
              >
                <div className="mb-1 flex items-center gap-1.5 text-xs text-divine-gold">
                  <span>🪔 Guruji</span>
                  {m.flagged && <span className="text-peacock-teal">· guided safely</span>}
                </div>
                <p className="whitespace-pre-line leading-relaxed">{m.answer}</p>
              </motion.div>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="sticky bottom-20 mt-4 md:bottom-4"
      >
        {error && <p role="alert" className="mb-2 text-sm text-sacred-orange">{error}</p>}
        <div className="flex items-center gap-2 rounded-2xl border border-white/15 bg-cosmic-indigo/70 p-2 backdrop-blur">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            maxLength={MAX_QUESTION_LENGTH}
            disabled={limitReached}
            placeholder={limitReached ? "Come back tomorrow for more reflections" : "Ask Guruji…"}
            aria-label="Your question for Guruji"
            className="w-full bg-transparent px-3 py-2 text-soft-ash placeholder:text-soft-ash/40 focus:outline-none disabled:opacity-60"
          />
          <Button type="submit" size="sm" disabled={limitReached || input.trim().length === 0} aria-label="Send">
            <Send size={16} />
          </Button>
        </div>
      </form>
    </div>
  );
}
