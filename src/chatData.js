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

    // ---- AVAILABILITY ----
    {
        group: "availability",
        weight: 0.9,
        triggers: {
            en: [
                "available", "free", "open", "busy", "status",
                "can i hire", "hire raihan", "work with you", "collaborate",
                "looking for project", "taking project", "accept project",
            ],
            id: [
                "tersedia", "available", "sibuk", "status",
                "bisa dihire", "hire raihan", "kerja sama", "kolaborasi",
                "cari proyek", "terima project", "menerima proyek",
            ],
        },
        response: {
            en: `Yes - Raihan is **currently available** for new projects and collaborations! 🚀\n\nFeel free to reach out with your project brief.`,
            id: `Ya - Raihan **sedang tersedia** untuk proyek dan kolaborasi baru! 🚀\n\nSilakan kirimkan brief proyek Anda.`,
        },
    },

    // ---- CONTACT / HIRE ----
    {
        group: "contact",
        weight: 0.9,
        triggers: {
            en: [
                "contact", "email", "reach out", "get in touch",
                "hire", "rate", "price", "cost", "fee",
                "how much", "pricing", "budget",
            ],
            id: [
                "kontak", "email", "hubungi", "hubung",
                "hire", "rate", "harga", "biaya", "fee",
                "berapa harga", "pricing", "budget",
            ],
        },
        response: {
            en: `Interested in working with Raihan? The best way is through the **Contact** page or filling out the inquiry form.\n\nRaihan is **available for new projects** - freelance, contract, or full-time remote roles.`,
            id: `Tertarik bekerja dengan Raihan? Cara terbaik adalah melalui halaman **Contact** atau mengisi form inquiry.\n\nRaihan **tersedia untuk proyek baru** - freelance, kontrak, atau full-time remote.`,
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

    // === 1. EXACT MATCH (case-insensitive) ===
    for (const entry of CHAT_KNOWLEDGE) {
        const triggers = entry.triggers[lang] || entry.triggers.en;
        for (const pattern of triggers) {
            if (q === pattern || q.includes(pattern)) {
                return entry.response[lang] || entry.response.en;
            }
        }
    }

    // === 2. PROJECT-SPECIFIC MATCHING ===
    for (const proj of PROJECT_QA) {
        // Exact project name/id match
        for (const pattern of proj.exactPatterns) {
            if (!pattern) continue;
            const p = pattern.toLowerCase();
            if (q === p || q.includes(p) || p.includes(q)) {
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

    // === 4. FALLBACK: AI ===
    return null; // Signal to call AI
}
