import type { Content } from "./types";

// Seed devotional library. All text is traditional / public domain.
// Bodies are in Devanagari; translations are short English meanings.
export const SEED_CONTENT: Content[] = [
  {
    id: "hanuman-chalisa",
    type: "chalisa",
    title: "Hanuman Chalisa",
    deity: "Hanuman",
    language: "hi",
    isFeatured: true,
    durationMinutes: 10,
    tags: ["courage", "devotion", "strength", "focus"],
    translation:
      "A 40-verse hymn to Lord Hanuman praising his strength, devotion and protection.",
    body: `दोहा
श्रीगुरु चरन सरोज रज निज मनु मुकुरु सुधारि।
बरनउँ रघुबर बिमल जसु जो दायकु फल चारि॥
बुद्धिहीन तनु जानिके सुमिरौं पवन कुमार।
बल बुधि बिद्या देहु मोहिं हरहु कलेस बिकार॥

चौपाई
जय हनुमान ज्ञान गुन सागर। जय कपीस तिहुँ लोक उजागर॥
राम दूत अतुलित बल धामा। अंजनि पुत्र पवनसुत नामा॥
महाबीर बिक्रम बजरंगी। कुमति निवार सुमति के संगी॥
कंचन बरन बिराज सुबेसा। कानन कुंडल कुंचित केसा॥
हाथ बज्र औ ध्वजा बिराजै। काँधे मूँज जनेऊ साजै॥
शंकर सुवन केसरी नंदन। तेज प्रताप महा जग बंदन॥
विद्यावान गुनी अति चातुर। राम काज करिबे को आतुर॥
प्रभु चरित्र सुनिबे को रसिया। राम लखन सीता मन बसिया॥
सूक्ष्म रूप धरि सियहिं दिखावा। बिकट रूप धरि लंक जरावा॥
भीम रूप धरि असुर सँहारे। रामचंद्र के काज सँवारे॥
लाय सजीवन लखन जियाये। श्रीरघुबीर हरषि उर लाये॥
रघुपति कीन्ही बहुत बड़ाई। तुम मम प्रिय भरतहि सम भाई॥
सहस बदन तुम्हरो जस गावैं। अस कहि श्रीपति कंठ लगावैं॥
सनकादिक ब्रह्मादि मुनीसा। नारद सारद सहित अहीसा॥
जम कुबेर दिगपाल जहाँ ते। कबि कोबिद कहि सके कहाँ ते॥
तुम उपकार सुग्रीवहिं कीन्हा। राम मिलाय राज पद दीन्हा॥
तुम्हरो मंत्र बिभीषन माना। लंकेस्वर भए सब जग जाना॥
जुग सहस्र जोजन पर भानू। लील्यो ताहि मधुर फल जानू॥
प्रभु मुद्रिका मेलि मुख माहीं। जलधि लाँघि गये अचरज नाहीं॥
दुर्गम काज जगत के जेते। सुगम अनुग्रह तुम्हरे तेते॥
राम दुआरे तुम रखवारे। होत न आज्ञा बिनु पैसारे॥
सब सुख लहै तुम्हारी सरना। तुम रच्छक काहू को डर ना॥
आपन तेज सम्हारो आपै। तीनों लोक हाँक तें काँपै॥
भूत पिसाच निकट नहिं आवै। महाबीर जब नाम सुनावै॥
नासै रोग हरै सब पीरा। जपत निरंतर हनुमत बीरा॥
संकट तें हनुमान छुड़ावै। मन क्रम बचन ध्यान जो लावै॥
सब पर राम तपस्वी राजा। तिन के काज सकल तुम साजा॥
और मनोरथ जो कोई लावै। सोइ अमित जीवन फल पावै॥
चारों जुग परताप तुम्हारा। है परसिद्ध जगत उजियारा॥
साधु संत के तुम रखवारे। असुर निकंदन राम दुलारे॥
अष्ट सिद्धि नौ निधि के दाता। अस बर दीन जानकी माता॥
राम रसायन तुम्हरे पासा। सदा रहो रघुपति के दासा॥
तुम्हरे भजन राम को पावै। जनम जनम के दुख बिसरावै॥
अंत काल रघुबर पुर जाई। जहाँ जन्म हरिभक्त कहाई॥
और देवता चित्त न धरई। हनुमत सेइ सर्ब सुख करई॥
संकट कटै मिटै सब पीरा। जो सुमिरै हनुमत बलबीरा॥
जय जय जय हनुमान गोसाईं। कृपा करहु गुरुदेव की नाईं॥
जो सत बार पाठ कर कोई। छूटहि बंदि महा सुख होई॥
जो यह पढ़ै हनुमान चालीसा। होय सिद्धि साखी गौरीसा॥
तुलसीदास सदा हरि चेरा। कीजै नाथ हृदय महँ डेरा॥

दोहा
पवनतनय संकट हरन मंगल मूरति रूप।
राम लखन सीता सहित हृदय बसहु सुर भूप॥`,
  },
  {
    id: "hanuman-aarti",
    type: "aarti",
    title: "Hanuman Aarti",
    deity: "Hanuman",
    language: "hi",
    isFeatured: false,
    durationMinutes: 4,
    tags: ["courage", "evening", "devotion"],
    translation: "The traditional aarti sung in praise of Lord Hanuman.",
    body: `आरती कीजै हनुमान लला की। दुष्ट दलन रघुनाथ कला की॥

जाके बल से गिरिवर काँपे। रोग दोष जाके निकट न झाँके॥
अंजनि पुत्र महा बलदाई। संतन के प्रभु सदा सहाई॥

दे बीरा रघुनाथ पठाए। लंका जारि सिया सुधि लाए॥
लंका सो कोट समुद्र सी खाई। जात पवनसुत बार न लाई॥

लंका जारि असुर संहारे। सियारामजी के काज सँवारे॥
लक्ष्मण मूर्छित पड़े सकारे। आनि सजीवन प्राण उबारे॥

पैठि पताल तोरि जम कारे। अहिरावण की भुजा उखारे॥
बायें भुजा असुर दल मारे। दहिने भुजा संतजन तारे॥

आरती कीजै हनुमान लला की। दुष्ट दलन रघुनाथ कला की॥`,
  },
  {
    id: "shiv-aarti",
    type: "aarti",
    title: "Shiv Aarti — Om Jai Shiv Omkara",
    deity: "Shiva",
    language: "hi",
    isFeatured: true,
    durationMinutes: 5,
    tags: ["peace", "evening", "devotion"],
    translation: "The beloved aarti of Lord Shiva, sung in temples across India.",
    body: `ॐ जय शिव ओंकारा, स्वामी जय शिव ओंकारा।
ब्रह्मा विष्णु सदाशिव, अर्द्धांगी धारा॥
ॐ जय शिव ओंकारा॥

एकानन चतुरानन पञ्चानन राजे।
हंसासन गरुड़ासन वृषवाहन साजे॥
ॐ जय शिव ओंकारा॥

दो भुज चार चतुर्भुज दसभुज अति सोहे।
त्रिगुण रूप निरखता त्रिभुवन जन मोहे॥
ॐ जय शिव ओंकारा॥

अक्षमाला वनमाला मुण्डमाला धारी।
त्रिपुरारी कंसारी कर माला धारी॥
ॐ जय शिव ओंकारा॥

श्वेताम्बर पीताम्बर बाघम्बर अंगे।
सनकादिक गरुड़ादिक भूतादिक संगे॥
ॐ जय शिव ओंकारा॥

कर के मध्य कमंडल चक्र त्रिशूलधारी।
सुखकारी दुखहारी जगपालन कारी॥
ॐ जय शिव ओंकारा॥`,
  },
  {
    id: "om-namah-shivaya",
    type: "mantra",
    title: "Om Namah Shivaya",
    deity: "Shiva",
    language: "hi",
    isFeatured: false,
    durationMinutes: 2,
    tags: ["peace", "japa", "focus"],
    translation: "I bow to Shiva — the auspicious one, the inner Self.",
    body: `ॐ नमः शिवाय

ॐ नमः शिवाय`,
  },
  {
    id: "maha-mrityunjaya",
    type: "mantra",
    title: "Maha Mrityunjaya Mantra",
    deity: "Shiva",
    language: "hi",
    isFeatured: true,
    durationMinutes: 3,
    tags: ["healing", "protection", "peace"],
    translation:
      "A prayer to Lord Shiva for health, healing and release from fear.",
    body: `ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्।
उर्वारुकमिव बन्धनान् मृत्योर्मुक्षीय माऽमृतात्॥`,
  },
  {
    id: "ganesh-aarti",
    type: "aarti",
    title: "Ganesh Aarti — Jai Ganesh Deva",
    deity: "Ganesh",
    language: "hi",
    isFeatured: false,
    durationMinutes: 4,
    tags: ["beginnings", "wisdom", "devotion"],
    translation: "The aarti of Lord Ganesha, remover of obstacles.",
    body: `जय गणेश जय गणेश जय गणेश देवा।
माता जाकी पार्वती पिता महादेवा॥

एक दंत दयावंत चार भुजा धारी।
माथे सिंदूर सोहे मूसे की सवारी॥
जय गणेश जय गणेश जय गणेश देवा॥

पान चढ़े फूल चढ़े और चढ़े मेवा।
लड्डुअन का भोग लगे संत करें सेवा॥
जय गणेश जय गणेश जय गणेश देवा॥

अंधन को आँख देत कोढ़िन को काया।
बांझन को पुत्र देत निर्धन को माया॥
जय गणेश जय गणेश जय गणेश देवा॥`,
  },
  {
    id: "om-gan-ganapataye",
    type: "mantra",
    title: "Om Gan Ganapataye Namah",
    deity: "Ganesh",
    language: "hi",
    isFeatured: false,
    durationMinutes: 2,
    tags: ["beginnings", "japa", "focus"],
    translation: "I bow to Ganapati, remover of obstacles and lord of beginnings.",
    body: `ॐ गं गणपतये नमः

ॐ गं गणपतये नमः`,
  },
  {
    id: "durga-aarti",
    type: "aarti",
    title: "Durga Aarti — Jai Ambe Gauri",
    deity: "Durga",
    language: "hi",
    isFeatured: false,
    durationMinutes: 5,
    tags: ["courage", "strength", "devotion"],
    translation: "The aarti of Maa Durga, the divine mother and protector.",
    body: `जय अम्बे गौरी मैया जय श्यामा गौरी।
तुमको निशदिन ध्यावत हरि ब्रह्मा शिवरी॥
जय अम्बे गौरी॥

मांग सिंदूर विराजत टीको मृगमद को।
उज्ज्वल से दोउ नैना चंद्रवदन नीको॥
जय अम्बे गौरी॥

कनक समान कलेवर रक्ताम्बर राजै।
रक्तपुष्प गल माला कंठहार साजै॥
जय अम्बे गौरी॥

केहरि वाहन राजत खड्ग खप्पर धारी।
सुर नर मुनिजन सेवत तिनके दुखहारी॥
जय अम्बे गौरी॥`,
  },
  {
    id: "gayatri-mantra",
    type: "mantra",
    title: "Gayatri Mantra",
    deity: "Gayatri",
    language: "hi",
    isFeatured: true,
    durationMinutes: 3,
    tags: ["wisdom", "clarity", "morning"],
    translation:
      "A prayer for the divine light to illumine and guide our intellect.",
    body: `ॐ भूर्भुवः स्वः।
तत्सवितुर्वरेण्यं।
भर्गो देवस्य धीमहि।
धियो यो नः प्रचोदयात्॥`,
  },
  {
    id: "krishna-aarti",
    type: "aarti",
    title: "Krishna Aarti — Aarti Kunj Bihari Ki",
    deity: "Krishna",
    language: "hi",
    isFeatured: false,
    durationMinutes: 5,
    tags: ["love", "devotion", "joy"],
    translation: "The joyful aarti of Lord Krishna, the flute-playing cowherd.",
    body: `आरती कुंजबिहारी की, श्री गिरिधर कृष्ण मुरारी की॥

गले में बैजंती माला, बजावै मुरली मधुर बाला।
श्रवण में कुण्डल झलकाला, नंद के आनंद नंदलाला॥
गगन सम अंग कांति काली, राधिका चमक रही आली।
आरती कुंजबिहारी की॥

कनकमय मोर मुकुट बिलसै, देवता दरसन को तरसैं।
गगन सों सुमन रासि बरसै, बजे मुरचंग मधुर मृदंग।
ग्वालिन संग अतुल रति गोप कुमारी की।
आरती कुंजबिहारी की॥`,
  },
];
