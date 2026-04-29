import { portfolioData } from "./data";

/* ============================================================
   STATIC KNOWLEDGE BASE — Hybrid Chat Engine
   Priority: Exact > Keyword Group > Jaccard Similarity > AI
 ============================================================ */

const projects = portfolioData.projects || [];

// ---- Helper: tokenize and clean ----
function tokenize(text) {
    return text.toLowerCase()
        .replace(/[^\w\s]/g, " ")
        .split(/\s+/)
        .filter(w => w.length >= 2);
}

function jaccard(a, b) {
    const sa = new Set(a);
    const sb = new Set(b);
    const intersection = new Set([...sa].filter(x => sb.has(x)));
    const union = new Set([...sa, ...sb]);
    return union.size === 0 ? 0 : intersection.size / union.size;
}

// ---- Build project search index ----
function buildProjectAnswers() {
    const out = [];
    for (const p of projects) {
        const titleTokens = tokenize(p.title || "");
        const idTokens = tokenize(p.id || "");
        const features = (p.keyfeatures || []).slice(0, 5).map(f => `• ${f}`).join("\n");
        const tech = (p.tech || []).join(", ");

        const enAnswer = `**${p.title}** (${p.category || "Project"})\n\n${p.overview || ""}\n\n**Role:** ${p.role || "Developer"}\n\n**Key Features:**\n${features}\n\n**Tech Stack:** ${tech}\n\n**Live Demo:** ${p.liveUrl || "N/A"}`;

        const idAnswer = `**${p.title}** (${p.category || "Proyek"})\n\n${p.overview || ""}\n\n**Peran:** ${p.role || "Developer"}\n\n**Fitur Utama:**\n${features}\n\n**Tech Stack:** ${tech}\n\n**Live Demo:** ${p.liveUrl || "N/A"}`;

        // Multiple trigger groups per project
        out.push({
            tokens: [...new Set([...idTokens, ...titleTokens])],
            exactPatterns: [
                p.id,
                p.title,
                p.title?.replace(/[^\w\s]/g, " ")?.replace(/\s+/g, " ")?.trim(),
                ...titleTokens.filter(t => t.length >= 3),
            ],
            answer: { en: enAnswer, id: idAnswer },
        });
    }
    return out;
}

const PROJECT_QA = buildProjectAnswers();

const allTech = [...new Set(projects.flatMap(p => p.tech || []))];
const techList = allTech.map(t => `• ${t}`).join("\n");
const projectList = projects.map((p, i) => `${i + 1}. **${p.title}** — ${p.category || "Project"}`).join("\n");
const projectListId = projects.map((p, i) => `${i + 1}. **${p.title}** — ${p.category || "Proyek"}`).join("\n");

// ---- GLOBAL STATIC Q&A ----
export const CHAT_KNOWLEDGE = [
    // ---- GREETINGS ----
    {
        group: "greeting",
        weight: 1.0,
        triggers: {
            en: [
                "hi", "hello", "hey", "yo", "sup",
                "good morning", "good afternoon", "good evening",
                "greetings", "howdy", "hiya", "yo",
            ],
            id: [
                "halo", "hai", "hey", "selamat pagi",
                "selamat siang", "selamat sore", "selamat malam",
                "assalamualaikum",
            ],
        },
        response: {
            en: "👋 Hi there! I'm Raihan's AI assistant. Ask me about his **projects**, **skills**, **experience**, or **availability**!",
            id: "👋 Hai! Saya asisten AI milik Raihan. Tanyakan apa saja tentang **proyek**, **skill**, **pengalaman**, atau **ketersediaan**-nya!",
        },
    },

    // ---- PROJECTS: LIST ALL ----
    {
        group: "projects_list",
        weight: 0.9,
        triggers: {
            en: [
                "what project", "what kind of project", "what projects",
                "list projects", "show projects", "all projects",
                "portfolio", "showcase", "works", "work history",
                "built", "build", "created", "make", "made",
                "how many project", "tell me about your project",
                "case study", "case studies",
            ],
            id: [
                "proyek apa", "project apa", "apa saja proyek",
                "daftar proyek", "daftar project", "tampilkan proyek",
                "portofolio", "karya", "hasil kerja",
                "buat", "bikin", "membuat", "dibuat",
                "berapa proyek", "ceritakan proyek",
            ],
        },
        response: {
            en: `Raihan has **${projects.length} featured projects**:\n\n${projectList}\n\nAsk about any specific project for details!`,
            id: `Raihan memiliki **${projects.length} proyek unggulan**:\n\n${projectListId}\n\nTanyakan proyek mana pun untuk detail lebih lanjut!`,
        },
    },

    // ---- SKILLS & TECH ----
    {
        group: "skills",
        weight: 0.9,
        triggers: {
            en: [
                "skill", "tech stack", "technology", "tools",
                "what can you do", "what do you know", "capable", "expertise",
                "programming", "language", "framework",
                "react", "node", "nextjs", "laravel", "go",
            ],
            id: [
                "skill", "teknologi", "bahasa pemrograman", "tools",
                "apa yang kamu bisa", "capable", "keahlian",
                "bahasa pemrograman", "framework",
                "react", "node", "nextjs", "laravel", "go",
            ],
        },
        response: {
            en: `**Core Skills and Technologies**\n\n${techList}\n\nPlus: PWA, Accessibility (WCAG), SEO, CI/CD, Cloudflare Tunnel, Docker basics.`,
            id: `**Skill dan Teknologi Utama**\n\n${techList}\n\nPlus: PWA, Accessibility (WCAG), SEO, CI/CD, Cloudflare Tunnel, Docker basics.`,
        },
    },

    // ---- EXPERIENCE / BIO ----
    {
        group: "experience",
        weight: 0.9,
        triggers: {
            en: [
                "who are you", "who is raihan", "raihan rafif",
                "experience", "year", "background", "career", "journey",
                "about", "yourself", "introduce", "profile",
                "developer", "fullstack", "web developer",
            ],
            id: [
                "siapa raihan", "siapa kamu", "raihan rafif",
                "pengalaman", "tahun", "latar belakang", "karir", "perjalanan",
                "tentang", "perkenalkan", "profil",
                "developer", "fullstack", "web developer",
            ],
        },
        response: {
            en: `**Raihan Rafif** is a fullstack web developer with **5+ years** of hands-on experience building production-grade web applications.\n\nExpertise spans frontend (React, Next.js), backend (Node.js, Laravel, Go), mobile (React Native), and DevOps (Docker, Cloudflare). Passionate about clean code, performance, and user-centric design.`,
            id: `**Raihan Rafif** adalah fullstack web developer dengan **5+ tahun** pengalaman praktis membangun aplikasi web production-grade.\n\nKeahlian mencakup frontend (React, Next.js), backend (Node.js, Laravel, Go), mobile (React Native), dan DevOps (Docker, Cloudflare). Bersemangat tentang clean code, performa, dan desain user-centric.`,
        },
    },

    // ---- COLLABORATE / HIRE / CONTACT (merged, smart) ----
    {
        group: "collaborate",
        weight: 0.95,
        triggers: {
            en: [
                // Direct hire intent
                "how can i hire", "how do i hire", "i want to hire",
                "hire raihan", "can i hire", "want to hire you",
                // Collaboration intent
                "collaborate", "work together", "work with you",
                "let's work", "lets work", "want to work with",
                "i have a project", "have a project for",
                "can you help me build", "can you build",
                "i need a website", "i need a developer",
                "looking for a developer", "looking for developer",
                "need developer", "need a developer",
                "are you available for", "taking new project",
                "accepting new project", "taking on new",
                "want to partner", "partnership", "team up",
                // Contact intent
                "how to contact", "how can i contact", "how do i contact",
                "how to reach", "how can i reach", "get in touch",
                "contact you", "contact raihan", "reach you",
                "email address", "what's your email", "your email",
                // Rate/pricing intent
                "how much do you charge", "what is your rate",
                "what do you charge", "your rates", "hourly rate",
                "freelance rate", "how much for", "price for",
                "cost to build", "budget for project",
                // Availability intent
                "are you free", "you available", "currently available",
                "open for work", "accepting clients", "taking clients",
                "open to", "available for hire",
                // Natural inquiry variants
                "want to discuss a project", "discuss project",
                "interested in your services", "need help with",
                "can you take on", "can you work on",
                "join my project", "join our team",
                "let's build something", "lets build",
                "i'm looking for someone to",
                "are you the right person for",
            ],
            id: [
                // Hire intent (ID)
                "bagaimana cara hire", "cara hire", "mau hire",
                "ingin hire", "bisa hire", "bisa dihire",
                // Kolaborasi intent
                "kolaborasi", "kerja sama", "kerjasama",
                "bekerja sama", "kolaborasi dengan",
                "mau kolaborasi", "ingin kolaborasi",
                "mari bekerja sama", "ayo kerja sama",
                "saya punya proyek", "saya ada proyek",
                "ada proyek untuk", "punya project",
                "butuh developer", "butuh web developer",
                "cari developer", "mencari developer",
                "butuh bantuan buat", "bisa bantu buat",
                "menerima proyek", "terima project baru",
                // Kontak intent
                "cara menghubungi", "bagaimana menghubungi",
                "kontak raihan", "hubungi raihan",
                "email raihan", "alamat email",
                "nomor telepon", "nomor hp",
                "cara kontak", "hubung",
                // Harga/biaya intent
                "berapa harga", "berapa biaya",
                "berapa rate", "rate freelance",
                "harga pembuatan", "biaya buat website",
                "tarif", "ongkos",
                // Ketersediaan intent
                "apakah tersedia", "kamu tersedia",
                "masih tersedia", "sedang tersedia",
                "bisa terima proyek", "menerima klien",
                "open project", "buka jasa",
            ],
        },
        response: {
            en: `Great news — Raihan is **currently available** for new projects and collaborations! 🚀\n\n**Here's how to reach him:**\n\n1️⃣ **Contact Form** — The fastest way! Go to the **Contact** page and fill out the form with your project details. Raihan usually responds within 24 hours.\n\n2️⃣ **Email** — Reach out directly at **raihanrafif1202@gmail.com**\n\n3️⃣ **LinkedIn** — Connect at [linkedin.com/in/raihan-rafif](https://www.linkedin.com/in/raihan-rafif-756809202/)\n\nPro tip: When reaching out, share a brief about your project (goals, timeline, budget range) — that helps Raihan respond faster with relevant insights!\n\nIs there anything specific you'd like to know about his skills or past projects?`,
            id: `Kabar baik — Raihan **sedang tersedia** untuk proyek dan kolaborasi baru! 🚀\n\n**Ini cara menghubunginya:**\n\n1️⃣ **Form Kontak** — Cara tercepat! Buka halaman **Contact** dan isi form dengan detail proyek Anda. Raihan biasanya membalas dalam 24 jam.\n\n2️⃣ **Email** — Hubungi langsung di **raihanrafif1202@gmail.com**\n\n3️⃣ **LinkedIn** — Terhubung di [linkedin.com/in/raihan-rafif](https://www.linkedin.com/in/raihan-rafif-756809202/)\n\nTips: Saat menghubungi, ceritakan sekilas tentang proyek Anda (tujuan, timeline, budget) — itu membantu Raihan merespons lebih cepat dengan insight yang relevan!\n\nAda yang spesifik yang ingin kamu tanyakan tentang skill atau proyek-proyeknya?`,
        },
    },

    // ---- THANKS ----
    {
        group: "thanks",
        weight: 1.0,
        triggers: {
            en: [
                "thank", "thanks", "appreciate", "thx",
                "helpful", "useful", "great", "awesome",
                "good bot", "nice", "cool",
            ],
            id: [
                "terima kasih", "makasih", "thanks",
                "membantu", "berguna", "mantap", "keren",
                "bagus", "mantul",
            ],
        },
        response: {
            en: "You're welcome! 😊 Happy to help. Feel free to ask if you have more questions!",
            id: "Sama-sama! 😊 Senang bisa membantu. Silakan tanyakan lagi jika ada pertanyaan!",
        },
    },

    // ---- BYE ----
    {
        group: "bye",
        weight: 1.0,
        triggers: {
            en: [
                "bye", "goodbye", "see you", "cya", "later",
                "night", "sleep", "done", "thanks bye",
            ],
            id: [
                "dadah", "bye", "sampai jumpa", "selamat tinggal",
                "tidur", "selesai", "makasih dadah",
            ],
        },
        response: {
            en: "See you! 👋 Have a great day. Come back anytime!",
            id: "Sampai jumpa! 👋 Semoga harimu menyenangkan. Kembali kapan saja!",
        },
    },

    // ---- HELP / MENU ----
    {
        group: "help",
        weight: 0.9,
        triggers: {
            en: [
                "help", "menu", "what can you do", "what do you know",
                "capabilities", "features", "options", "question",
            ],
            id: [
                "bantuan", "menu", "bisa apa", "tahu apa",
                "fitur", "pilihan", "pertanyaan",
            ],
        },
        response: {
            en: `Here\'s what I can help you with:\n\n• **Projects** — Learn about Raihan\'s portfolio and case studies\n• **Skills** — Tech stack, tools, and expertise\n• **Experience** — Background and career journey\n• **Availability** — Current status for new work\n• **Contact** — How to reach out and hiring info\n\nJust ask naturally - I\'ll understand!`,
            id: `Ini yang bisa saya bantu:\n\n• **Proyek** — Portofolio dan case study Raihan\n• **Skill** — Tech stack, tools, dan keahlian\n• **Pengalaman** — Latar belakang dan karir\n• **Ketersediaan** — Status saat ini untuk kerja baru\n• **Kontak** — Cara menghubungi dan info hiring\n\nTanyakan saja secara natural - saya akan mengerti!`,
        },
    },
];

// ---- LANGUAGE DETECTION ----
export function detectLanguage(query) {
    const q = query.toLowerCase();
    // Indonesian marker words
    const idMarkers = [
        "apa", "siapa", "bagaimana", "kenapa", "mengapa", "kapan", "di mana",
        "berapa", "banyak", "sedikit", "ini", "itu", "mereka", "kita", "kamu",
        "yang", "untuk", "dari", "dengan", "dalam", "pada", "tentang",
        "bisa", "ada", "tidak", "ya", "proyek", "skill", "teknologi",
        "tanyakan", "bagus", "keren", "mantap",
    ];
    // English marker words
    const enMarkers = [
        "what", "who", "how", "why", "when", "where", "which", "does",
        "the", "and", "but", "you", "your", "this", "that", "they",
        "project", "portfolio", "skill", "experience", "available",
        "built", "built", "create", "made", "many", "show", "tell",
    ];

    const qWords = tokenize(q);
    const idScore = idMarkers.filter(w => qWords.includes(w)).length;
    const enScore = enMarkers.filter(w => qWords.includes(w)).length;

    // Default to en unless idScore clearly wins
    return idScore > enScore ? "id" : "en";
}

// ---- Helper: check if pattern matches as whole word(s) ----
function wordMatch(text, pattern) {
    if (text === pattern) return true;
    // Escape regex special chars and match as whole words
    const escaped = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(`\\b${escaped}\\b`, 'i');
    return re.test(text);
}

// ---- MAIN MATCHING ENGINE ----
export function staticAnswer(query) {
    const q = query.toLowerCase().trim();
    if (!q) return null;

    const qTokens = tokenize(q);
    const lang = detectLanguage(q);
    const qSet = new Set(qTokens);

    let best = null;
    let bestScore = 0;
    const JACCARD_THRESHOLD = 0.25;

    // === 1. PROJECT-SPECIFIC MATCHING (priority over general knowledge) ===
    for (const proj of PROJECT_QA) {
        // Exact project name/id match (word-boundary or id contains query)
        for (const pattern of proj.exactPatterns) {
            if (!pattern) continue;
            const p = pattern.toLowerCase();
            if (wordMatch(q, p) || p.includes(q)) {
                return proj.answer[lang] || proj.answer.en;
            }
        }
        // Jaccard similarity on tokens
        const sim = jaccard(qTokens, proj.tokens);
        if (sim >= JACCARD_THRESHOLD && sim > bestScore) {
            bestScore = sim;
            best = proj.answer[lang] || proj.answer.en;
        }
    }

    if (best && bestScore >= 0.4) {
        return best;
    }
    best = null;
    bestScore = 0;

    // === 2. EXACT MATCH (case-insensitive, word-boundary) ===
    for (const entry of CHAT_KNOWLEDGE) {
        const triggers = entry.triggers[lang] || entry.triggers.en;
        for (const pattern of triggers) {
            if (wordMatch(q, pattern)) {
                return entry.response[lang] || entry.response.en;
            }
        }
    }

    // === 3. KEYWORD GROUP MATCHING (weighted) ===
    for (const entry of CHAT_KNOWLEDGE) {
        const triggers = entry.triggers[lang] || entry.triggers.en;
        let entryScore = 0;

        for (const pattern of triggers) {
            const pTokens = tokenize(pattern);
            const sim = jaccard(qTokens, pTokens);
            if (sim > entryScore) entryScore = sim;
        }

        const weightedScore = entryScore * entry.weight;
        if (weightedScore > bestScore) {
            bestScore = weightedScore;
            best = entry.response[lang] || entry.response.en;
        }
    }

    if (best && bestScore >= 0.18) {
        return best;
    }

    // === 3.5. KEYWORD SPOTTING (single-token intent match) ===
    // Catches queries where Jaccard fails due to token dilution
    // e.g. "can we partner up?" → "partner" matches collaborate group
    const INTENT_KEYWORDS = {
        collaborate: {
            en: ["hire", "collaborate", "partner", "contact", "email", "rate", "price", "budget", "available", "freelance", "client", "work", "team", "join", "build", "let", "discuss", "need", "service", "help", "looking"],
            id: ["hire", "kolaborasi", "kontak", "email", "harga", "biaya", "rate", "tersedia", "klien", "freelance", "kerja", "tim", "proyek", "butuh", "bantuan", "cari", "hubung"],
        },
        projects_list: {
            en: ["project", "portfolio", "work", "case", "study", "built", "showcase"],
            id: ["proyek", "portofolio", "karya", "studi", "kasus"],
        },
        skills: {
            en: ["skill", "tech", "stack", "technology", "tool", "framework", "language", "programming"],
            id: ["skill", "teknologi", "tools", "framework", "bahasa"],
        },
        experience: {
            en: ["experience", "background", "career", "journey", "about", "raihan", "who", "introduce", "profile"],
            id: ["pengalaman", "latar", "karir", "perjalanan", "tentang", "raihan", "siapa", "profil"],
        },
    };

    best = null;
    bestScore = 0;
    for (const entry of CHAT_KNOWLEDGE) {
        const keywords = INTENT_KEYWORDS[entry.group];
        if (!keywords) continue;
        const kw = keywords[lang] || keywords.en;
        const matchCount = qTokens.filter(t => kw.includes(t)).length;
        if (matchCount > 0) {
            // Score based on how many intent keywords matched
            const score = matchCount * 0.22 * entry.weight;
            if (score > bestScore) {
                bestScore = score;
                best = entry.response[lang] || entry.response.en;
            }
        }
    }

    if (best && bestScore >= 0.22) {
        return best;
    }

    // === 4. FALLBACK: AI ===
    return null; // Signal to call AI
}
