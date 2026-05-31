# Aradhana — Test Report

Manual end-to-end testing performed in Chrome against the running dev server
(`npm run dev`, http://localhost:3000). Quality gates `npm run lint` and
`npm run build` both pass with **0 errors** (15 routes compiled).

Legend: ✅ pass · ⚠️ note

---

## 1. Summary table

| # | Test | Category | Result |
| --- | --- | --- | --- |
| 1 | Landing page renders, no console errors | Happy path | ✅ |
| 2 | Signup blocks invalid email | Validation / empty input | ✅ |
| 3 | Signup blocks mismatched passwords | Validation | ✅ |
| 4 | Signup + 3-step onboarding → dashboard (<60s) | Happy path | ✅ |
| 5 | Dashboard shows correct name + suggested ritual | Personalization | ✅ |
| 6 | Jaap counter increments + ring animates | Happy path | ✅ |
| 7 | Jaap count persists across full page reload | State persistence | ✅ |
| 8 | Library search + filters + featured carousel | Happy path | ✅ |
| 9 | Reading mode: meaning toggle, font resize, mark-as-read | Happy path | ✅ |
| 10 | Hindi/Devanagari renders correctly (Unicode) | Special characters | ✅ |
| 11 | Ask Guruji refuses a medical question | Security / safety | ✅ |
| 12 | Ask Guruji answers a devotional question warmly | Happy path | ✅ |
| 13 | Ask Guruji daily limit decrements (10 → …) | Rate limiting | ✅ |
| 14 | Sankalp create prefills profile prefs + live preview | Happy path | ✅ |
| 15 | Sankalp Day 1 complete → progress 1/7, Day 2 unlocks | Happy path / state | ✅ |
| 16 | Completing a Sankalp day raises the streak | State | ✅ |
| 17 | Profile shows email, streak, editable prefs | Happy path | ✅ |
| 18 | After logout, `/home` redirects to `/login` | Auth / authorization | ✅ |
| 19 | `prefers-reduced-motion` disables animations | Accessibility | ✅ |
| 20 | No console errors during the full walkthrough | Stability | ✅ |

---

## 2. Evidence (screenshots)

### Landing page
![Landing page](https://app.devin.ai/attachments/7cbf90cb-3fe6-454f-8342-806253d0e84f/screenshot_036df92012764dce877f797abe20c985.png)

### Signup validation (invalid email blocked)
![Signup validation](https://app.devin.ai/attachments/ec948e06-767e-468a-9634-002347500e92/screenshot_a16b833b47f34778bee6b4b9b4425288.png)

### Personalized home dashboard after onboarding
![Home dashboard](https://app.devin.ai/attachments/736c2705-d1a9-4909-a714-293843984aef/screenshot_4bdfad7880ff4e029af59efc79e8a5cd.png)

### Jaap counter (count = 5, ring advancing; persisted after reload)
![Jaap counter](https://app.devin.ai/attachments/97026bae-51c6-4348-b6cb-241f5e70c674/screenshot_8c37b609194f4065bdd65ae63f24549b.png)

### Reading mode (Hanuman Chalisa, Devanagari)
![Reading mode](https://app.devin.ai/attachments/c9fc4c31-6938-429f-8c19-3da7221a47a8/screenshot_261c2f69842346998a28f8e5bc76ab21.png)

### Ask Guruji — medical question refused safely
![Guruji refusal](https://app.devin.ai/attachments/b1dbf126-c50f-45b2-ab3f-0405e62189d3/screenshot_1f847cf3004143b19d03903cdc5d37fa.png)

### Ask Guruji — devotional question answered (limit decrements)
![Guruji warm answer](https://app.devin.ai/attachments/26f0a991-b0fa-4cd3-9e92-039ed14220c7/screenshot_e1b2a619fe064d6aac9ca615d4d608eb.png)

### Sankalp Path — Day 1 detail
![Sankalp day 1](https://app.devin.ai/attachments/f7ea54c2-5049-4ae1-8918-b95d4a26e4b3/screenshot_aa1042edc582448ab8605b09b146e1a0.png)

### Sankalp Path — Day 1 complete, Day 2 unlocked
![Sankalp day 1 complete](https://app.devin.ai/attachments/341c4f42-3b0b-43f7-8cb2-eafd3f995273/screenshot_32ad50b6edb64e119316338d694d0bc7.png)

### Profile (streak earned, editable prefs)
![Profile](https://app.devin.ai/attachments/1b9ebc91-6084-4863-81c8-794cc1693c28/screenshot_b8f49cb0d4b548ff892194d6563040f1.png)

### Auth guard — after logout, `/home` redirects to `/login`
![Auth guard](https://app.devin.ai/attachments/688b00f7-1667-4488-9185-5d493803778e/screenshot_44a0919fc3834536910cc86fc9492fa2.png)

---

## 3. Edge cases & how the app handles them

| Scenario | Handling |
| --- | --- |
| Empty / invalid email at signup | Inline message "Please enter a valid email." blocks submit |
| Password < 6 chars / mismatch | Inline validation blocks account creation |
| Duplicate email | Signup detects existing user and shows an error |
| Refresh during a jaap | Count + start time restored from `localStorage` |
| Refresh in reading mode | "Marked as read" state restored for today |
| Unicode (Hindi/Sanskrit) | Dedicated Devanagari font, 1.9 line-height, adjustable size |
| Ask Guruji > 10/day | Input disabled and "0 left today" shown |
| Unsafe questions (medical/legal/financial/prediction/harm) | Always refused with a calm redirect to a professional |
| Logout then deep-link to a private route | `AppShell` redirects to `/login` |
| Incomplete profile | `AppShell` redirects to `/onboarding` |
| `prefers-reduced-motion` | All animations reduced to ~0ms (see `globals.css`) |
| Server-side render of client-only data | Data loaded after mount; a loader shows first, avoiding hydration mismatch |

---

## 4. Known limitations (by design)

- Passwords are stored in plain `localStorage` (MVP only — not production-safe).
- Data is per-browser; clearing site data resets everything.
- Guruji answers come from fixed templates, not a live language model.

These are deliberate MVP tradeoffs, documented in `README.md` and `CASE_STUDY.md`.
