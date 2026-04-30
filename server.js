import express from "express";
import cors from "cors";
import { portfolioData } from "./src/data.js";

const PORT = process.env.PORT || 3001;
const OLLAMA_BASE = process.env.OLLAMA_BASE || "http://localhost:11434";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "glm-5.1:cloud";
const IS_PROD = process.env.NODE_ENV === "production";

const app = express();
app.use(cors());
app.use(express.json());

/* ========== BUILD SYSTEM PROMPT ========== */
function buildSystemPrompt() {
    const projects = portfolioData.projects.map((p, i) => {
        return `### Project ${i + 1}: ${p.title}
- **Category**: ${p.category}
- **Date**: ${p.date}
- **Summary**: ${p.summary}
- **Client**: ${p.client}
- **Overview**: ${p.overview}
- **Role**: ${p.role}
- **Mission**: ${p.mission}
- **Impact**: ${p.impact}
- **Tech Stack**: ${p.tech?.join(", ") || "N/A"}
- **Key Features**: ${(p.keyfeatures || []).map((f, j) => `  ${j + 1}. ${f}`).join("\n")}
- **Live URL**: ${p.liveUrl || "N/A"}
- **Repo URL**: ${p.repoUrl || "N/A"}`;
    }).join("\n\n");

    const skills = portfolioData.skills.map(s => {
        return `- **${s.title}**: ${s.items.join(", ")}`;
    }).join("\n");

    return `You are Raihan AI Assistant, a helpful and professional chatbot on Raihan Rafif's portfolio website. Raihan is a fullstack web developer based in Takeo, Saga, Japan.

Your job: Answer questions about Raihan's projects, skills, experience, and how to contact or hire him. Be concise, friendly, and professional. Use the project data below to give detailed, accurate answers.

## Raihan's Projects
${projects}

## Raihan's Skills
${skills}

## Contact & Hiring Info
- Email: raihanrafif1202@gmail.com
- LinkedIn: https://linkedin.com/in/raihan-rafif
- Contact form: available at /contact on the website
- Raihan is currently available for new projects and collaborations
- GitHub: https://github.com/RaihanRafif

## Guidelines
- When asked about a specific project, give a detailed answer covering what it does, the tech stack, and key features.
- When asked about skills, list the relevant technologies and tools.
- When asked about hiring/collaboration, provide the contact info and encourage reaching out.
- If you don't know something, suggest the user visit the Contact page or email Raihan directly.
- Keep responses concise — 2-4 paragraphs max unless the user asks for more detail.
- Use markdown formatting for readability.`;
}

/* ========== OLLAMA HELPERS ========== */
async function checkOllamaHealth() {
    try {
        const res = await fetch(`${OLLAMA_BASE}/api/tags`, { signal: AbortSignal.timeout(3000) });
        return res.ok;
    } catch {
        return false;
    }
}

async function ollamaChat(messages, systemPrompt) {
    const payload = {
        model: OLLAMA_MODEL,
        messages: [
            { role: "system", content: systemPrompt },
            ...messages
        ],
        stream: false,
        options: {
            temperature: 0.7,
            top_p: 0.9,
        }
    };

    const res = await fetch(`${OLLAMA_BASE}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(25000),
    });

    if (!res.ok) {
        const txt = await res.text().catch(() => "");
        throw new Error(`Ollama HTTP ${res.status}: ${txt}`);
    }

    const data = await res.json();
    return data.message?.content || "";
}

/* ========== ROUTES ========== */
// Health check
app.get("/api/health", async (_req, res) => {
    const online = await checkOllamaHealth();
    res.json({ ok: online, model: OLLAMA_MODEL });
});

// Chat endpoint
app.post("/api/chat", async (req, res) => {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "messages array required" });
    }

    try {
        const systemPrompt = buildSystemPrompt();
        const reply = await ollamaChat(messages, systemPrompt);
        res.json({ response: reply });
    } catch (err) {
        console.error("Ollama error:", err.message);
        res.status(502).json({
            error: "AI backend unavailable",
            detail: err.message
        });
    }
});

/* ========== PRODUCTION STATIC ========== */
if (IS_PROD) {
    app.use(express.static("dist"));
    app.get("{*splat}", (_req, res) => {
        res.sendFile("dist/index.html", { root: process.cwd() });
    });
}

app.listen(PORT, () => {
    console.log(`[server] Raihan AI backend on http://localhost:${PORT}`);
    console.log(`[server] Ollama: ${OLLAMA_BASE} (model: ${OLLAMA_MODEL})`);
    console.log(`[server] Mode: ${IS_PROD ? "production" : "development"}`);
});
