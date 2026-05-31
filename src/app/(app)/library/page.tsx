"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { ParchmentBackground } from "@/components/backgrounds/ParchmentBackground";
import { Chip } from "@/components/ui";
import { SEED_CONTENT } from "@/lib/content";
import { staggerContainer, staggerItem } from "@/lib/motion";
import type { ContentType } from "@/lib/types";

const TYPES: { id: ContentType; label: string }[] = [
  { id: "aarti", label: "Aarti" },
  { id: "chalisa", label: "Chalisa" },
  { id: "mantra", label: "Mantra" },
];

// Unique deities present in the seed content (for the deity filter).
const DEITIES = Array.from(new Set(SEED_CONTENT.map((c) => c.deity)));

export default function LibraryPage() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<ContentType | null>(null);
  const [deity, setDeity] = useState<string | null>(null);

  const featured = useMemo(() => SEED_CONTENT.filter((c) => c.isFeatured), []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SEED_CONTENT.filter((c) => {
      const matchesQuery = q === "" || c.title.toLowerCase().includes(q) || c.deity.toLowerCase().includes(q);
      const matchesType = !type || c.type === type;
      const matchesDeity = !deity || c.deity === deity;
      return matchesQuery && matchesType && matchesDeity;
    });
  }, [query, type, deity]);

  return (
    <div className="relative text-temple-maroon">
      <ParchmentBackground />

      <h1 className="font-[family-name:var(--font-heading)] text-3xl">Content Library</h1>
      <p className="mt-1 text-sm text-temple-maroon/70">Aartis, chalisas and mantras for daily reading.</p>

      {/* Search */}
      <div className="mt-5 flex items-center gap-2 rounded-2xl border border-temple-maroon/15 bg-white/70 px-4 py-3">
        <Search size={18} className="text-temple-maroon/60" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title or deity…"
          aria-label="Search content"
          className="w-full bg-transparent text-temple-maroon placeholder:text-temple-maroon/40 focus:outline-none"
        />
      </div>

      {/* Filters */}
      <div className="mt-4 space-y-2">
        <div className="flex flex-wrap gap-2">
          {TYPES.map((t) => (
            <Chip key={t.id} selected={type === t.id} onClick={() => setType(type === t.id ? null : t.id)}>
              {t.label}
            </Chip>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {DEITIES.map((d) => (
            <Chip key={d} selected={deity === d} onClick={() => setDeity(deity === d ? null : d)}>
              {d}
            </Chip>
          ))}
        </div>
      </div>

      {/* Featured carousel (hidden when filtering) */}
      {query === "" && !type && !deity && (
        <div className="mt-6">
          <h2 className="mb-3 font-[family-name:var(--font-heading)] text-lg">Featured</h2>
          <div className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 pb-2">
            {featured.map((c) => (
              <Link key={c.id} href={`/library/${c.id}`} className="shrink-0">
                <div className="w-48 rounded-2xl border border-temple-maroon/15 bg-gradient-to-br from-saffron-gold/20 to-divine-gold/10 p-4">
                  <div className="text-xs uppercase tracking-wide text-temple-maroon/60">{c.type}</div>
                  <div className="mt-2 font-[family-name:var(--font-heading)] text-lg leading-tight">{c.title}</div>
                  <div className="mt-2 text-xs text-temple-maroon/60">{c.deity}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      <h2 className="mt-6 mb-3 font-[family-name:var(--font-heading)] text-lg">
        {results.length} {results.length === 1 ? "result" : "results"}
      </h2>

      {results.length === 0 ? (
        <div className="rounded-2xl border border-temple-maroon/15 bg-white/60 p-8 text-center text-sm text-temple-maroon/70">
          🌸 No texts match your search. Try clearing a filter.
        </div>
      ) : (
        <motion.div variants={staggerContainer} initial="hidden" animate="show" className="grid gap-3 sm:grid-cols-2">
          {results.map((c) => (
            <motion.div key={c.id} variants={staggerItem}>
              <Link href={`/library/${c.id}`}>
                <div className="h-full rounded-2xl border border-temple-maroon/15 bg-white/70 p-4 transition-shadow hover:shadow-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wide text-temple-maroon/60">{c.type}</span>
                    {c.durationMinutes && <span className="text-xs text-temple-maroon/50">{c.durationMinutes} min</span>}
                  </div>
                  <div className="mt-1 font-[family-name:var(--font-heading)] text-lg">{c.title}</div>
                  <div className="mt-1 text-sm text-temple-maroon/70">{c.deity}</div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
