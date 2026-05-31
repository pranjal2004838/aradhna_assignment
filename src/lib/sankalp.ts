import type { Language, SankalpDay, SankalpPath } from "./types";
import { makeId } from "./storage";

// The intentions a user can choose for a Sankalp journey.
export const INTENTIONS = [
  { id: "peace", label: "Peace of Mind", icon: "🕊️", blurb: "Calm a restless mind." },
  { id: "discipline", label: "Discipline", icon: "🪔", blurb: "Build a steady daily habit." },
  { id: "gratitude", label: "Gratitude", icon: "🙏", blurb: "Notice and thank life's gifts." },
  { id: "courage", label: "Courage", icon: "🔥", blurb: "Face challenges with strength." },
  { id: "exam-focus", label: "Exam Focus", icon: "📖", blurb: "Study with a steady, calm mind." },
  { id: "emotional-clarity", label: "Emotional Clarity", icon: "🌸", blurb: "Find balance and healing." },
] as const;

// The deities a user can dedicate their journey to.
export const DEITIES = [
  { id: "Hanuman", label: "Hanuman", icon: "🛕" },
  { id: "Shiva", label: "Shiva", icon: "🔱" },
  { id: "Krishna", label: "Krishna", icon: "🪈" },
  { id: "Durga", label: "Durga", icon: "🌺" },
  { id: "Ganesh", label: "Ganesh", icon: "🐘" },
  { id: "Sai", label: "Sai Baba", icon: "🪷" },
] as const;

// A simple mantra + suggested reading for each deity.
const DEITY_PACK: Record<string, { mantra: string; reading: string }> = {
  Hanuman: { mantra: "ॐ हनुमते नमः (Om Hanumate Namah)", reading: "Hanuman Chalisa" },
  Shiva: { mantra: "ॐ नमः शिवाय (Om Namah Shivaya)", reading: "Shiv Aarti — Om Jai Shiv Omkara" },
  Krishna: { mantra: "ॐ क्लीं कृष्णाय नमः (Om Kleem Krishnaya Namah)", reading: "Krishna Aarti — Aarti Kunj Bihari Ki" },
  Durga: { mantra: "ॐ दुं दुर्गायै नमः (Om Dum Durgayai Namah)", reading: "Durga Aarti — Jai Ambe Gauri" },
  Ganesh: { mantra: "ॐ गं गणपतये नमः (Om Gan Ganapataye Namah)", reading: "Ganesh Aarti — Jai Ganesh Deva" },
  Sai: { mantra: "ॐ साईं राम (Om Sai Ram)", reading: "Shiv Aarti — Om Jai Shiv Omkara" },
};

// 7 day "spine" per intention: each entry is a title + reflection prompt.
// The mantra and reading come from the chosen deity.
const INTENTION_DAYS: Record<string, { title: string; reflection: string; jaapTarget: 54 | 108 }[]> = {
  peace: [
    { title: "Begin in Stillness", reflection: "Sit quietly for one minute before chanting. Notice your breath.", jaapTarget: 54 },
    { title: "Let Go of One Worry", reflection: "Name one worry and gently set it aside for today.", jaapTarget: 54 },
    { title: "Deepen the Calm", reflection: "Chant slowly. Let each repetition soften your shoulders.", jaapTarget: 108 },
    { title: "Peaceful Reading", reflection: "Read today's aarti without rushing. Read like a prayer.", jaapTarget: 54 },
    { title: "Gratitude for Calm", reflection: "Thank one person who brings peace into your life.", jaapTarget: 54 },
    { title: "Steady Heart", reflection: "Chant and picture a still lake inside you.", jaapTarget: 108 },
    { title: "Complete with Peace", reflection: "You carried calm for 7 days. Carry it forward gently.", jaapTarget: 108 },
  ],
  discipline: [
    { title: "Make the Promise", reflection: "Decide the exact time you will practise each day.", jaapTarget: 54 },
    { title: "Show Up Again", reflection: "Showing up matters more than doing it perfectly.", jaapTarget: 54 },
    { title: "Build the Streak", reflection: "Three days strong. Notice how it already feels easier.", jaapTarget: 108 },
    { title: "Read with Focus", reflection: "Read today's text fully, without checking your phone.", jaapTarget: 54 },
    { title: "Small but Daily", reflection: "Small daily effort beats rare big effort. Keep going.", jaapTarget: 108 },
    { title: "Resist the Skip", reflection: "On the day you least feel like it, you grow the most.", jaapTarget: 108 },
    { title: "Discipline Sealed", reflection: "Seven days done. You proved you can keep a promise.", jaapTarget: 108 },
  ],
  gratitude: [
    { title: "One Thank You", reflection: "Begin by thanking the divine for this new day.", jaapTarget: 54 },
    { title: "Thank a Person", reflection: "Recall one person you are grateful for today.", jaapTarget: 54 },
    { title: "Thank Your Body", reflection: "Thank your body for carrying you. Chant gently.", jaapTarget: 108 },
    { title: "Grateful Reading", reflection: "Read today's aarti as a song of thanks.", jaapTarget: 54 },
    { title: "Thank a Hardship", reflection: "Name one hard thing that taught you something.", jaapTarget: 108 },
    { title: "Overflowing Heart", reflection: "List three small joys from today.", jaapTarget: 108 },
    { title: "Gratitude Complete", reflection: "A grateful heart is a peaceful heart. Well done.", jaapTarget: 108 },
  ],
  courage: [
    { title: "Begin with Courage", reflection: "Name the one thing you have been avoiding.", jaapTarget: 54 },
    { title: "Borrow Strength", reflection: "Chant and imagine the deity's strength flowing to you.", jaapTarget: 54 },
    { title: "Remove Fear", reflection: "Fear shrinks when faced. Take one small brave step today.", jaapTarget: 108 },
    { title: "Strengthening Reading", reflection: "Read today's text and feel its power.", jaapTarget: 54 },
    { title: "Faith with Effort", reflection: "Pray for courage, then act. Both are needed.", jaapTarget: 108 },
    { title: "Confidence Rising", reflection: "Recall a past fear you already overcame.", jaapTarget: 108 },
    { title: "Courage Complete", reflection: "You faced what you avoided. Carry this bravery on.", jaapTarget: 108 },
  ],
  "exam-focus": [
    { title: "Begin with Courage", reflection: "Set a clear study goal for today before you chant.", jaapTarget: 54 },
    { title: "Build Discipline", reflection: "Read today's text, then study one focused block.", jaapTarget: 54 },
    { title: "Remove Distraction", reflection: "Put your phone away during today's jaap and study.", jaapTarget: 108 },
    { title: "Steady Mind", reflection: "A calm mind remembers more. Breathe before you begin.", jaapTarget: 54 },
    { title: "Faith with Effort", reflection: "Prayer plus study, not prayer instead of study.", jaapTarget: 108 },
    { title: "Confidence", reflection: "Trust your preparation. Chant to settle nerves.", jaapTarget: 108 },
    { title: "Complete Sankalp", reflection: "You built focus and calm for 7 days. Walk in steady.", jaapTarget: 108 },
  ],
  "emotional-clarity": [
    { title: "Sit with Feeling", reflection: "Name what you feel right now, without judging it.", jaapTarget: 54 },
    { title: "Breathe Through It", reflection: "Chant slowly when emotion rises. Let it move through.", jaapTarget: 54 },
    { title: "Soften the Heart", reflection: "Offer kindness to yourself today.", jaapTarget: 108 },
    { title: "Healing Reading", reflection: "Read today's aarti slowly as a comfort.", jaapTarget: 54 },
    { title: "Release", reflection: "Forgive one small thing — in others or yourself.", jaapTarget: 108 },
    { title: "Clarity Returns", reflection: "Notice the space between you and your emotions.", jaapTarget: 108 },
    { title: "Clarity Complete", reflection: "You met your feelings with grace. That is healing.", jaapTarget: 108 },
  ],
};

function intentionLabel(intentionId: string): string {
  return INTENTIONS.find((i) => i.id === intentionId)?.label ?? "Devotion";
}

// Build a complete 7-day Sankalp path from the chosen intention + deity.
// This is template-based so it always works without any AI / network call.
export function buildSankalpDays(intentionId: string, deity: string): SankalpDay[] {
  const spine = INTENTION_DAYS[intentionId] ?? INTENTION_DAYS.peace;
  const pack = DEITY_PACK[deity] ?? DEITY_PACK.Hanuman;

  return spine.map((entry, index) => ({
    day: index + 1,
    title: entry.title,
    mantra: pack.mantra,
    jaapTarget: entry.jaapTarget,
    readingTitle: pack.reading,
    reflection: entry.reflection,
    completed: false,
  }));
}

// Create a brand new Sankalp path object for a user.
export function createSankalpPath(
  userId: string,
  intentionId: string,
  deity: string,
  language: Language,
): SankalpPath {
  return {
    id: makeId(),
    userId,
    intention: intentionId,
    deity,
    language,
    title: `7-Day ${intentionLabel(intentionId)} Sankalp with ${deity}`,
    status: "active",
    days: buildSankalpDays(intentionId, deity),
    currentDay: 1,
    startedAt: new Date().toISOString(),
  };
}
