"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CosmicBackground } from "@/components/backgrounds/CosmicBackground";
import { Button, GlassCard } from "@/components/ui";
import { useAuth } from "@/lib/auth";

export default function SignupPage() {
  const { signup } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    const result = signup(email, password);
    if (result.ok) {
      router.replace("/onboarding");
    } else {
      setError(result.error);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center px-4 py-12">
      <CosmicBackground />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-md"
      >
        <div className="mb-6 text-center">
          <Link href="/" className="text-3xl">🪔</Link>
          <h1 className="mt-3 font-[family-name:var(--font-heading)] text-3xl text-soft-ash">Create your account</h1>
          <p className="mt-1 text-sm text-soft-ash/60">Begin a calmer, more devoted day.</p>
        </div>

        <GlassCard className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label htmlFor="email" className="mb-1 block text-sm text-soft-ash/80">Email</label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-soft-ash placeholder:text-soft-ash/30 focus:border-divine-gold/60 focus:outline-none"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-1 block text-sm text-soft-ash/80">Password</label>
              <input
                id="password"
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-soft-ash placeholder:text-soft-ash/30 focus:border-divine-gold/60 focus:outline-none"
                placeholder="At least 6 characters"
              />
            </div>
            <div>
              <label htmlFor="confirm" className="mb-1 block text-sm text-soft-ash/80">Confirm password</label>
              <input
                id="confirm"
                type="password"
                autoComplete="new-password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-soft-ash placeholder:text-soft-ash/30 focus:border-divine-gold/60 focus:outline-none"
                placeholder="Re-enter your password"
              />
            </div>

            {error && (
              <p role="alert" className="rounded-lg bg-sacred-orange/15 px-3 py-2 text-sm text-sacred-orange">
                {error}
              </p>
            )}

            <Button type="submit" size="lg" className="w-full">Create account</Button>
          </form>
        </GlassCard>

        <p className="mt-5 text-center text-sm text-soft-ash/60">
          Already have an account?{" "}
          <Link href="/login" className="text-divine-gold hover:underline">Log in</Link>
        </p>
      </motion.div>
    </main>
  );
}
