"use client";

// Wraps every authenticated screen. It:
// 1. Protects the route (sends guests to /login, half-onboarded users to /onboarding).
// 2. Renders the sidebar (desktop) and bottom nav (mobile).
// Each page renders its own themed background, so this shell stays neutral.
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { MandalaLoader } from "@/components/ui";
import { BottomNav, Sidebar } from "./AppNav";

export function AppShell({
  children,
  requireOnboarding = true,
}: {
  children: React.ReactNode;
  requireOnboarding?: boolean;
}) {
  const { user, profile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace("/login");
      return;
    }
    if (requireOnboarding && !profile?.onboardingCompleted) {
      router.replace("/onboarding");
    }
  }, [loading, user, profile, requireOnboarding, router]);

  // While we check auth (or before redirect kicks in) show a calm loader.
  if (loading || !user || (requireOnboarding && !profile?.onboardingCompleted)) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <MandalaLoader message="Preparing your space…" />
      </div>
    );
  }

  return (
    <div className="min-h-screen md:pl-64">
      <Sidebar />
      <main className="mx-auto w-full max-w-2xl px-4 pb-28 pt-6 md:pb-12 md:pt-10">{children}</main>
      <BottomNav />
    </div>
  );
}
