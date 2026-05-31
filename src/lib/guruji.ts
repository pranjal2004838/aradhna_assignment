import type { Language } from "./types";

// Ask Guruji runs fully on-device with simple, readable rules.
// 1. We first check if a question is "unsafe" (medical/legal/financial/
//    predictions/harm). If so we gently refuse and suggest a safe alternative.
// 2. Otherwise we match the question to a devotional theme and return a warm,
//    short answer that ends with a blessing.
// This template approach is reliable and needs no API key.

export type GurujiResult = { answer: string; flagged: boolean };

export const MAX_QUESTION_LENGTH = 400;
export const DAILY_QUESTION_LIMIT = 10;

// Closing blessing per language.
const BLESSING: Record<Language, string> = {
  en: "May you walk in peace and light. 🙏",
  hi: "आप सदा शांति और प्रकाश में रहें। 🙏",
  hinglish: "Aap sada shanti aur prakash mein rahein. 🙏",
};

type UnsafeRule = {
  category: string;
  patterns: RegExp[];
  reply: Record<Language, string>;
};

// Each rule has gentle, warm refusals that still offer a spiritual alternative.
const UNSAFE_RULES: UnsafeRule[] = [
  {
    category: "medical",
    patterns: [/\b(medicine|medication|tablet|dose|disease|cancer|covid|symptom|doctor|surgery|stop taking|prescription)\b/i, /दवा|बीमारी|इलाज/i],
    reply: {
      en: "I cannot give medical guidance, and your health is too precious to risk. Please speak with a qualified doctor. Alongside their care, you may chant the Maha Mrityunjaya Mantra for inner strength and calm.",
      hi: "मैं चिकित्सा सलाह नहीं दे सकता, और आपका स्वास्थ्य बहुत मूल्यवान है। कृपया किसी योग्य चिकित्सक से मिलें। उनके उपचार के साथ-साथ आप मन की शांति के लिए महामृत्युंजय मंत्र का जाप कर सकते हैं।",
      hinglish: "Main medical salah nahi de sakta — aapki health bahut keemti hai. Kripya kisi qualified doctor se milein. Saath hi, mann ki shanti ke liye Maha Mrityunjaya Mantra ka jaap karein.",
    },
  },
  {
    category: "financial",
    patterns: [/\b(stock|share|invest|crypto|bitcoin|loan|lottery|gambl|which fund|buy gold|profit|money double)\b/i, /शेयर|निवेश|पैसा डबल/i],
    reply: {
      en: "I cannot advise on money or investments — that needs a licensed financial expert. What I can offer is calm: chant to steady your mind, then make decisions with a clear, unhurried heart.",
      hi: "मैं धन या निवेश पर सलाह नहीं दे सकता — इसके लिए किसी प्रमाणित वित्तीय विशेषज्ञ की आवश्यकता है। मैं आपको शांति दे सकता हूँ: जाप से मन स्थिर करें, फिर स्पष्ट मन से निर्णय लें।",
      hinglish: "Main paise ya investment par salah nahi de sakta — iske liye licensed financial expert chahiye. Main shanti de sakta hoon: jaap se mann shaant karein, phir clear mann se decision lein.",
    },
  },
  {
    category: "legal",
    patterns: [/\b(lawsuit|legal case|court|police|fir|divorce papers|property dispute|sue)\b/i, /मुकदमा|कानूनी|अदालत/i],
    reply: {
      en: "Legal matters need a qualified lawyer, so I cannot advise there. But I can pray with you for clarity and patience. Chant gently and let your next step come from a calm mind.",
      hi: "कानूनी मामलों के लिए योग्य वकील की आवश्यकता है, इसलिए मैं सलाह नहीं दे सकता। पर मैं आपके साथ स्पष्टता और धैर्य की प्रार्थना कर सकता हूँ। शांत मन से अगला कदम लें।",
      hinglish: "Legal matters ke liye qualified lawyer chahiye, isliye main salah nahi de sakta. Par main aapke saath clarity aur dhairya ki prarthna kar sakta hoon. Shaant mann se agla kadam lein.",
    },
  },
  {
    category: "prediction",
    patterns: [/\b(will i|will my|pass.*exam|get the job|get married|future|when will|predict|kundli|horoscope|lucky number)\b/i, /भविष्य|कब होगा|पास हो/i],
    reply: {
      en: "I do not predict the future — no honest guide can. What you can control is your effort and your peace. Do your work sincerely, chant to calm your nerves, and trust that sincere effort is never wasted.",
      hi: "मैं भविष्य नहीं बताता — कोई सच्चा मार्गदर्शक नहीं बता सकता। आपके हाथ में है आपका प्रयास और आपकी शांति। ईमानदारी से कर्म करें, जाप से मन शांत करें — सच्चा प्रयास कभी व्यर्थ नहीं जाता।",
      hinglish: "Main future predict nahi karta — koi sachcha guide nahi kar sakta. Aapke haath mein hai aapka effort aur shanti. Mehnat sincerely karein, jaap se nerves calm karein — sachcha effort kabhi waste nahi jaata.",
    },
  },
  {
    category: "harm",
    patterns: [/\b(black magic|curse|vashikaran|harm someone|revenge|hurt them|destroy my enemy|tantrik to)\b/i, /काला जादू|वशीकरण|नुकसान/i],
    reply: {
      en: "I will never help cause harm to anyone — that path only darkens your own heart. Instead, let us pray for peace between you and them. Chant for calm, and choose forgiveness; it frees you more than revenge ever could.",
      hi: "मैं किसी को नुकसान पहुँचाने में कभी सहायता नहीं करूँगा — यह मार्ग केवल आपके अपने हृदय को अंधकारमय करता है। आइए शांति की प्रार्थना करें। जाप करें और क्षमा चुनें; यह बदले से कहीं अधिक मुक्त करता है।",
      hinglish: "Main kisi ko nuksan pahunchane mein kabhi madad nahi karunga — yeh raasta sirf aapke apne dil ko dukhi karta hai. Aaiye shanti ki prarthna karein. Jaap karein aur kshama chunein; yeh badle se zyada mukti deta hai.",
    },
  },
];

type TopicRule = {
  patterns: RegExp[];
  reply: Record<Language, string>;
};

// Friendly devotional answers for common, safe themes.
const TOPIC_RULES: TopicRule[] = [
  {
    patterns: [/\b(focus|distract|study|concentrate|exam|attention)\b/i, /ध्यान|पढ़ाई|एकाग्र/i],
    reply: {
      en: "When the mind wanders, do not fight it — gently return. Before studying, chant 11 times: 'Om Gan Ganapataye Namah'. Then study in calm 25-minute blocks with short breaks. Discipline plus a settled mind is your real strength.",
      hi: "जब मन भटके तो लड़ें नहीं — धीरे से वापस लाएँ। पढ़ने से पहले 11 बार जपें: 'ॐ गं गणपतये नमः'। फिर शांति से 25 मिनट के अंतराल में पढ़ें। अनुशासन और स्थिर मन ही आपकी असली शक्ति है।",
      hinglish: "Jab mann bhatke to ladein nahi — dheere se wapas laayein. Padhne se pehle 11 baar japein: 'Om Gan Ganapataye Namah'. Phir 25 minute ke calm blocks mein padhein. Discipline aur settled mann hi aapki asli shakti hai.",
    },
  },
  {
    patterns: [/\b(calm|anxious|anxiety|stress|tense|worry|nervous|overwhelm|panic)\b/i, /शांत|चिंता|तनाव/i],
    reply: {
      en: "Breathe slowly: in for four counts, out for six. As you breathe out, silently chant 'Om Namah Shivaya'. Anxiety is a wave; it rises and it passes. You are the steady shore, not the wave. Be gentle with yourself today.",
      hi: "धीरे साँस लें: चार गिनती तक अंदर, छह तक बाहर। साँस छोड़ते समय मन में जपें 'ॐ नमः शिवाय'। चिंता एक लहर है; वह उठती है और चली जाती है। आप स्थिर तट हैं, लहर नहीं। आज स्वयं पर कोमल रहें।",
      hinglish: "Dheere saans lein: 4 count andar, 6 count bahar. Saans chhodte waqt mann mein japein 'Om Namah Shivaya'. Anxiety ek lehar hai; aati hai aur chali jaati hai. Aap sthir kinara hain, lehar nahi. Aaj khud par komal rahein.",
    },
  },
  {
    patterns: [/\b(discipline|habit|routine|lazy|procrastinat|motivat|consistent)\b/i, /अनुशासन|आदत|आलस/i],
    reply: {
      en: "Discipline grows from small promises kept. Choose one fixed time each day for your practice — even five minutes. Light a diya, chant, and begin. Do not wait to feel ready; readiness comes after starting, not before.",
      hi: "अनुशासन छोटे वादों को निभाने से बढ़ता है। हर दिन अभ्यास के लिए एक निश्चित समय चुनें — पाँच मिनट भी। दीया जलाएँ, जाप करें, और शुरू करें। तैयार महसूस होने की प्रतीक्षा न करें; तैयारी शुरू करने के बाद आती है।",
      hinglish: "Discipline chhote vaade nibhane se badhta hai. Har din ek fixed time chunein — 5 minute bhi. Diya jalaayein, jaap karein, shuru karein. Ready feel hone ka wait mat karein; readiness shuru karne ke baad aati hai.",
    },
  },
  {
    patterns: [/\b(angry|anger|frustrat|irritat|rage|temper)\b/i, /गुस्सा|क्रोध/i],
    reply: {
      en: "Anger is energy that needs a gentler channel. Pause before you speak; take three slow breaths. Chant 'Om Shanti, Shanti, Shanti'. Ask yourself: will this matter in a year? Often peace is wiser than being right.",
      hi: "क्रोध एक ऊर्जा है जिसे कोमल दिशा चाहिए। बोलने से पहले रुकें; तीन गहरी साँसें लें। जपें 'ॐ शांति, शांति, शांति'। स्वयं से पूछें: क्या यह एक वर्ष बाद मायने रखेगा? अक्सर शांति, सही होने से अधिक बुद्धिमानी है।",
      hinglish: "Gussa ek energy hai jise komal raasta chahiye. Bolne se pehle rukein; teen gehri saansein lein. Japein 'Om Shanti, Shanti, Shanti'. Khud se poochhein: kya yeh ek saal baad matter karega? Aksar shanti, sahi hone se zyada samajhdari hai.",
    },
  },
  {
    patterns: [/\b(grateful|gratitude|thank|blessing|content)\b/i, /आभार|धन्यवाद|कृतज्ञ/i],
    reply: {
      en: "Gratitude is the quickest path to joy. Each morning, name three small gifts — a warm meal, a kind word, your breath itself. Offer a quiet 'thank you' to the divine. A grateful heart always feels rich.",
      hi: "कृतज्ञता आनंद का सबसे तेज़ मार्ग है। हर सुबह तीन छोटे उपहार गिनें — गर्म भोजन, एक मीठा शब्द, आपकी साँस। ईश्वर को मौन 'धन्यवाद' दें। कृतज्ञ हृदय सदा समृद्ध अनुभव करता है।",
      hinglish: "Gratitude khushi ka sabse tez raasta hai. Har subah teen chhote gifts ginein — garam khaana, ek meetha shabd, aapki saans. Ishwar ko shaant 'thank you' dein. Grateful dil hamesha rich feel karta hai.",
    },
  },
  {
    patterns: [/\b(sleep|insomnia|cant sleep|tired|rest)\b/i, /नींद|थकान/i],
    reply: {
      en: "Let the day go before you rest. Lie down, breathe slowly, and chant 'Om Namah Shivaya' silently until the words fade. Release tomorrow's worries — they will wait. Sleep is also a form of trust in the divine.",
      hi: "विश्राम से पहले दिन को जाने दें। लेट जाएँ, धीरे साँस लें, और मन में 'ॐ नमः शिवाय' जपें जब तक शब्द शांत न हो जाएँ। कल की चिंताएँ छोड़ दें — वे प्रतीक्षा करेंगी। नींद भी ईश्वर पर भरोसे का एक रूप है।",
      hinglish: "Aaram se pehle din ko jaane dein. Let jaayein, dheere saans lein, aur mann mein 'Om Namah Shivaya' japein jab tak shabd shaant na ho jaayein. Kal ki chinta chhod dein — woh wait karengi. Neend bhi ishwar par bharose ka roop hai.",
    },
  },
];

// Generic warm answer if nothing specific matches.
const DEFAULT_REPLY: Record<Language, string> = {
  en: "Sit quietly for a moment and let your breath slow. Chant a mantra you love, even a few times, and let your heart settle. Whatever you face, meet it with a calm mind and a sincere effort — the rest will unfold in its own time.",
  hi: "एक क्षण शांति से बैठें और साँस को धीमा होने दें। अपना प्रिय मंत्र कुछ बार जपें और हृदय को स्थिर होने दें। जो भी सामने हो, उसे शांत मन और सच्चे प्रयास से मिलें — बाकी अपने समय पर खुल जाएगा।",
  hinglish: "Ek pal shaant baithein aur saans ko dheema hone dein. Apna pasandeeda mantra kuch baar japein aur dil ko sthir hone dein. Jo bhi saamne ho, use shaant mann aur sachche effort se milein — baaki apne time par khul jaayega.",
};

function withBlessing(text: string, language: Language): string {
  return `${text}\n\n${BLESSING[language]}`;
}

// Main entry point used by the API route.
export function askGuruji(rawQuestion: string, language: Language): GurujiResult {
  const question = rawQuestion.trim();

  // Validation: empty or too long.
  if (question.length === 0) {
    return { answer: withBlessing("Please share what is on your mind, and I will reflect with you.", language), flagged: false };
  }

  // Check unsafe categories first.
  for (const rule of UNSAFE_RULES) {
    if (rule.patterns.some((p) => p.test(question))) {
      return { answer: withBlessing(rule.reply[language], language), flagged: true };
    }
  }

  // Match a friendly topic.
  for (const rule of TOPIC_RULES) {
    if (rule.patterns.some((p) => p.test(question))) {
      return { answer: withBlessing(rule.reply[language], language), flagged: false };
    }
  }

  // Fallback warm answer.
  return { answer: withBlessing(DEFAULT_REPLY[language], language), flagged: false };
}
