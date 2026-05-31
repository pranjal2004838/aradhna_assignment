# Aradhana — Your Daily Spiritual Companion

Aradhana is a mobile-first devotional web app. It helps a person turn scattered
prayers into a calm, steady daily practice: a personalized daily ritual, a jaap
(mantra repetition) counter, a library of aartis/chalisas/mantras, a safe
"Ask Guruji" reflection chat, and 7-day "Sankalp" journeys.

It is built to be **simple and easy to read** — every screen and helper is
plain TypeScript/React with clear names, so the whole codebase can be explained
line by line in a code review.

---

## 1. The problem

Many people *want* a daily spiritual habit but:

- forget to do it, or do it inconsistently (no streak, no reminders),
- don't know *what* to read or chant today,
- search random websites for aartis and get cluttered, ad-filled pages,
- ask the internet sensitive questions (health, money, legal, "what will happen
  to me?") and get unsafe or fake answers.

## 2. The solution

Aradhana gives one calm place to practise every day:

| Feature | What it does |
| --- | --- |
| **Onboarding** | Asks name, language, deity and intention in 3 short steps. |
| **Daily Ritual** | A personalized "Read · Chant · Reflect" card on the home page. |
| **Jaap Counter** | A big tap counter with a mala progress ring, target 108, that survives a page refresh. |
| **Content Library** | 10 traditional public-domain texts with search, filters and a clean reading mode (large, readable Hindi). |
| **Ask Guruji** | A warm, **rule-based** reflection chat that *refuses* medical/legal/financial/prediction questions and offers spiritual reflection instead. Limited to 10 questions/day. |
| **Sankalp Path** | A guided 7-day journey built from your intention + deity (mantra, reading and reflection each day). |
| **Profile & History** | Edit preferences, see your streak and past activity. |

---

## 3. Architecture (kept deliberately simple)

This is a **self-contained app**. There is **no backend, no database and no API
keys**. Everything a logged-in user creates is stored in the browser using
`localStorage`. This was a deliberate choice (see *Tradeoffs* below) to keep the
code beginner-friendly and the demo instant.

```
src/
  app/                      Next.js App Router pages
    page.tsx                Public landing page
    login/  signup/         Auth screens
    onboarding/             3-step profile setup
    (app)/                  Logged-in area (protected by AppShell)
      layout.tsx            Wraps every private page in <AppShell>
      home/                 Daily ritual dashboard
      jaap/                 Jaap counter
      library/              Library list + [id] reading page
      guruji/               Ask Guruji chat
      sankalp/              Overview + create + [id] detail
      profile/  history/    Settings and stats
  components/
    ui.tsx                  Button, GlassCard, Chip, loader (shared UI)
    JaapRing, Reveal, ...   Small reusable pieces
    app/AppShell, AppNav    Layout + navigation for the private area
    backgrounds/            Decorative cosmic / temple backgrounds
  lib/
    types.ts                All the TypeScript shapes (User, Profile, ...)
    storage.ts              Safe read/write helpers around localStorage
    auth.tsx                Login / signup / profile (React context)
    store.ts                Read/write jaap, rituals, guruji, sankalp data
    content.ts              The 10 seed devotional texts
    sankalp.ts              Intentions, deities and the 7-day templates
    guruji.ts               Safety rules + warm template answers
    motion.ts               Framer Motion animation presets
```

### How data flows (the whole mental model)

1. `AuthProvider` (in `lib/auth.tsx`) loads the current user + profile from
   `localStorage` once, on mount, and shares them through React context.
2. Every private page is wrapped by `AppShell`, which redirects to `/login` if
   there is no user, or to `/onboarding` if the profile is incomplete.
3. Pages read/write data through the small helper functions in `lib/store.ts`
   (e.g. `addJaapSession`, `saveSankalpPath`). Each helper namespaces its key by
   user id so two accounts never mix.

### Why these technologies

- **Next.js 16 (App Router) + React 19** — modern, file-based routing.
- **TypeScript** — every value has a clear type, which catches mistakes early.
- **Tailwind CSS v4** — styling lives in the markup; the theme tokens are in
  `globals.css`.
- **Framer Motion** — gentle, accessible animations.
- **lucide-react** — clean icons.

---

## 4. Setup & run

Requirements: **Node.js 18.18+** (Node 20+ recommended) and npm.

```bash
# 1. install dependencies
npm install

# 2. run the dev server
npm run dev
# open http://localhost:3000

# 3. check code quality
npm run lint        # ESLint — should report 0 problems

# 4. production build
npm run build       # type-checks + builds; should finish with 0 errors
npm run start       # serve the production build
```

There is **nothing else to configure** — no `.env`, no database, no keys.

### Trying it out

1. Open `/signup`, create an account (any email + a 6+ char password).
2. Complete the 3 onboarding steps.
3. From the home dashboard, try the jaap counter, library, Ask Guruji and
   create a Sankalp Path.

> Your data lives in this browser only. Clearing site data / `localStorage`
> resets everything, which is also the easiest way to test onboarding again.

---

## 5. Tradeoffs (honest notes for the review)

- **localStorage instead of a database (Supabase/Postgres).**
  - *Pro:* zero setup, instant demo, very easy to read and explain, no secrets.
  - *Con:* data is per-browser (not synced across devices), and passwords are
    **not** securely hashed — this is fine for a portfolio MVP but **not** for
    real users. A real version would use a backend with hashed passwords.
- **Rule-based "Ask Guruji" instead of a live AI (OpenAI).**
  - *Pro:* safe and predictable — it can never give dangerous medical/financial
    advice, costs nothing, and works offline. The safety classifier is a small,
    readable list of patterns in `lib/guruji.ts`.
  - *Con:* answers come from a fixed set of warm templates, so it is less
    flexible than a real language model.
- **Predefined Sankalp templates instead of AI-generated plans.**
  - *Pro:* every journey is reviewed, calm and on-message.
  - *Con:* less personalized than a generated plan.

These tradeoffs were chosen on purpose to keep the code simple, safe and
explainable, while still delivering the full set of features end-to-end.

---

## 6. Roadmap (what a v2 could add)

1. Real backend (e.g. Supabase) with hashed passwords and cross-device sync.
2. Optional live AI for Ask Guruji, *behind the same safety filter*.
3. Audio playback for aartis and mantras.
4. Daily reminder notifications (PWA / push).
5. More content and more Sankalp intentions.
6. Sharing a finished Sankalp as a small "completion card" image.

---

## 7. Accessibility & quality notes

- Respects `prefers-reduced-motion` (animations are disabled for users who ask
  for it) — see `globals.css`.
- Tap targets are large; Hindi text uses a dedicated readable font and a
  comfortable line-height.
- Buttons and icon-only controls have `aria-label`s.
- `npm run lint` and `npm run build` both pass with **0 errors**.
