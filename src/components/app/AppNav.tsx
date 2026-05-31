"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { BookOpen, Disc3, Flame, Home, Sparkles } from "lucide-react";

// The five main destinations, shown in the desktop sidebar and mobile bottom nav.
const NAV_ITEMS = [
  { href: "/home", label: "Home", Icon: Home },
  { href: "/library", label: "Library", Icon: BookOpen },
  { href: "/jaap", label: "Jaap", Icon: Disc3 },
  { href: "/guruji", label: "Guruji", Icon: Sparkles },
  { href: "/sankalp", label: "Sankalp", Icon: Flame },
];

function isActive(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

// Desktop: fixed left sidebar.
export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="fixed left-0 top-0 z-30 hidden h-full w-64 flex-col border-r border-white/10 bg-cosmic-indigo/70 p-6 backdrop-blur-xl md:flex">
      <Link href="/home" className="mb-10 flex items-center gap-2">
        <span className="text-2xl">🪔</span>
        <span className="font-[family-name:var(--font-heading)] text-xl text-divine-gold">Aradhana</span>
      </Link>
      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map(({ href, label, Icon }) => {
          const active = isActive(pathname, href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-colors ${
                active ? "bg-divine-gold/15 text-divine-gold" : "text-soft-ash/70 hover:bg-white/5 hover:text-soft-ash"
              }`}
            >
              <Icon size={20} />
              {label}
            </Link>
          );
        })}
      </nav>
      <Link
        href="/profile"
        className="mt-auto flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-soft-ash/70 transition-colors hover:bg-white/5 hover:text-soft-ash"
      >
        <span className="text-lg">👤</span> Profile
      </Link>
    </aside>
  );
}

// Mobile: floating glass bottom nav.
export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 px-4 pb-4 md:hidden">
      <div className="glass-card mx-auto flex max-w-md items-center justify-around rounded-2xl px-2 py-2">
        {NAV_ITEMS.map(({ href, label, Icon }) => {
          const active = isActive(pathname, href);
          return (
            <Link
              key={href}
              href={href}
              aria-label={label}
              className="relative flex flex-1 flex-col items-center gap-1 py-1.5"
            >
              {active && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute -top-0.5 h-1 w-8 rounded-full bg-divine-gold"
                />
              )}
              <Icon size={22} className={active ? "text-divine-gold" : "text-soft-ash/60"} />
              <span className={`text-[10px] ${active ? "text-divine-gold" : "text-soft-ash/60"}`}>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
