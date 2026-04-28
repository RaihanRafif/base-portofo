import { useState, useEffect, useCallback } from "react";
import { portfolioData } from "../data";

const STORAGE_KEY = "raihan_portfolio_chat_v2";
const SESSION_KEY = "raihan_chat_session_id";

function getOrCreateSessionId() {
    let sid = localStorage.getItem(SESSION_KEY);
    if (!sid) {
        sid = "sess_" + Math.random().toString(36).substring(2, 10) + "_" + Date.now();
        localStorage.setItem(SESSION_KEY, sid);
    }
    return sid;
}

function formatTime() {
    return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

/* ========== KNOWLEDGE BASE ========== */
function getPortfolioContext() {
    const projects = portfolioData.projects || [];
    const projectList = projects.map(p => `- **${p.title}** (${p.category || 'N/A'}): ${p.summary}`).join("\n");
    const projectDetails = projects.map(p => `
## ${p.title}
- **Category**: ${p.category}
- **Role**: ${p.role}
- **Overview**: ${p.overview}
- **Key features**: ${(p.keyfeatures || []).slice(0, 5).join("; ")}
- **Tech stack**: ${(p.tech || []).join(", ")}
- **Live URL**: ${p.liveUrl || "N/A"}
`).join("\n");

    return `
You are Raihan Rafif's AI Portfolio Assistant. You help visitors learn about Raihan's work, skills, and projects.

## About Raihan Rafif
- Fullstack Web Developer with 5+ years of experience
- Expert in React, Node.js, Next.js, Laravel, Go, PWA, React Native
- Based in Indonesia, available for remote/local projects
- Focus: clean UI, performance, accessibility, SEO
- Contact: raihan@example.com — but encourage through the contact form

## Projects Summary
${projectList}

## Project Details
${projectDetails}

## Response Guidelines
- Be concise but informative (2-4 sentences normally, longer for project details)
- Use markdown: **bold** for emphasis, bullet lists for features
- If asked about a specific project, give detailed info about that project
- If asked about skills, list relevant technologies with brief context
- If asked about availability: "Raihan is currently available for new projects."
- If asked about hiring/rate: "Please reach out via the contact form for project inquiries and rates."
- Always be professional, friendly, and helpful
- Do NOT make up information not in the knowledge base
`;
}

/* ========== OLLAMA / BACKEND API CALL ========== */
const API_BASE = import.meta.env.VITE_REACT_APP_CHAT_API_BASE || "/api";

async function callAiBackend(messages, sessionId) {
    const systemPrompt = getPortfolioContext();
    const { controller, clear } = withTimeout(15000);

    try {
        const res = await fetch(`${API_BASE}/chat`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                messages: [
                    { role: "system", content: systemPrompt },
                    ...messages.map(m => ({ role: m.role === "ai" ? "assistant" : m.role, content: m.content }))
                ],
                sessionId,
                model: "glm-5.1:cloud"
            }),
            signal: controller.signal,
        });
        clear();

        if (!res.ok) {
            const txt = await res.text().catch(() => "");
            throw new Error(`HTTP ${res.status}: ${txt}`);
        }
        const data = await res.json();
        return data.response || data.choices?.[0]?.message?.content || data.message?.content || "";
    } catch (err) {
        if (err.name === "AbortError") throw new Error("Request timeout");
        throw err;
    }
}

function withTimeout(ms = 15000) {
    const c = new AbortController();
    const t = setTimeout(() => c.abort(), ms);
    return { controller: c, clear: () => clearTimeout(t) };
}

/* ========== FALLBACK LOCAL ENGINE ========== */
function localAnswer(query) {
    const q = query.toLowerCase();
    const projects = portfolioData.projects || [];

    // Project-specific queries (fuzzy title match)
    for (const p of projects) {
        const pTitle = p.title?.toLowerCase() || "";
        const pId = p.id?.toLowerCase() || "";
        const titleWords = pTitle.split(/[\s—\-]+/).filter(w => w.length > 2);
        const idWords = pId.split(/[\s—\-]+/).filter(w => w.length > 2);
        const queryWords = q.split(/\s+/).filter(w => w.length > 2);
        
        // Direct substring match or keyword overlap
        const directMatch = q.includes(pId) || queryWords.some(w => titleWords.includes(w) || pTitle.includes(w));
        if (directMatch) {
            const features = (p.keyfeatures || []).slice(0, 5).map(f => `- ${f}`).join("\n");
            const tech = (p.tech || []).join(", ");
            return `**${p.title}** (${p.category || "Project"})\n\n${p.overview || ""}\n\n**Role:** ${p.role || "Developer"}\n\n**Key Features:**\n${features}\n\n**Tech Stack:** ${tech}\n\n**Live Demo:** ${p.liveUrl || "N/A"}`;
        }
    }

    // List all projects
    if (q.includes("list") || q.includes("all") || q.includes("show")) {
        if (q.includes("project") || q.includes("work") || q.includes("portfolio")) {
            const list = projects.map((p, i) => `${i + 1}. **${p.title}** — ${p.category || "Project"}`).join("\n");
            return `Raihan has **${projects.length} featured projects**:\n\n${list}\n\nAsk about any specific project for details!`;
        }
    }

    // Skills / tech stack
    if (q.includes("skill") || q.includes("tech") || q.includes("stack") || q.includes("technology") || q.includes("tool")) {
        const allTech = [...new Set(projects.flatMap(p => p.tech || []))];
        const list = allTech.map(t => `- ${t}`).join("\n");
        return `**Core Skills and Technologies**\n\n${list}\n\nPlus: PWA, Accessibility (WCAG), SEO, CI/CD, Cloudflare Tunnel, Docker basics.`;
    }

    // Experience / background
    if (q.includes("experience") || q.includes("year") || q.includes("background") || q.includes("who")) {
        return `**Raihan Rafif** is a fullstack web developer with **5+ years** of hands-on experience building production-grade web applications.\n\nExpertise spans frontend (React, Next.js), backend (Node.js, Laravel, Go), mobile (React Native), and DevOps (Docker, Cloudflare). Passionate about clean code, performance, and user-centric design.`;
    }

    if (q.includes("contact") || q.includes("email") || q.includes("hire") || q.includes("rate") || q.includes("price")) {
        return `Interested in working with Raihan? The best way is through the **Contact** page or filling out the inquiry form.\n\nRaihan is **available for new projects** - freelance, contract, or full-time remote roles.`;
    }

    if (q.includes("available") || q.includes("status") || q.includes("open")) {
        return `Yes - Raihan is **currently available** for new projects and collaborations!\n\nFeel free to reach out with your project brief.`;
    }

    // Default with suggestions
    return `I\'m Raihan\'s AI assistant. I can tell you about:\n- His **projects** and case studies\n- **Skills** and tech stack\n- **Experience** and background\n- **Availability** for new work\n\nWhat would you like to know?`;
}

/* ========== MAIN HOOK ========== */
export default function useChat() {
    const [sessionId] = useState(getOrCreateSessionId);
    const [backendOnline, setBackendOnline] = useState(false);
    const [backendChecked, setBackendChecked] = useState(false);

    const welcomeMsg = {
        role: "ai",
        content: "👋 Hi! I'm Raihan's AI assistant. Ask me anything about his **projects**, **skills**, **experience**, or **availability**!",
        time: formatTime(),
        id: "welcome_" + Date.now(),
    };

    const [messages, setMessages] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed) && parsed.length > 0) return parsed;
            }
        } catch { /* ignore */ }
        return [welcomeMsg];
    });

    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showTyping, setShowTyping] = useState(true);

    // Persist messages
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }, [messages]);

    // Health check
    useEffect(() => {
        let alive = true;
        (async () => {
            try {
                const { controller, clear } = withTimeout(3000);
                const res = await fetch(`${API_BASE}/health`, { signal: controller.signal });
                clear();
                if (!alive) return;
                setBackendOnline(res.ok);
            } catch {
                if (!alive) return;
                setBackendOnline(false);
            } finally {
                setBackendChecked(true);
            }
        })();
        return () => { alive = false; };
    }, []);

    const smartComplete = useCallback((text) => {
        const q = text.toLowerCase();
        if (q.includes("project") || q.includes("work")) return "What kind of projects has Raihan built?";
        if (q.includes("skill") || q.includes("tech")) return "What is Raihan's tech stack?";
        if (q.includes("contact") || q.includes("hire")) return "How can I contact Raihan?";
        if (q.includes("who")) return "Tell me about Raihan";
        return text;
    }, []);

    async function sendMessage(rawText) {
        const text = smartComplete(rawText).trim();
        if (!text) return;

        const userMsg = {
            role: "user",
            content: text,
            time: formatTime(),
            id: "u_" + Date.now(),
        };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsLoading(true);
        setShowTyping(true);

        try {
            let answer = "";
            
            if (backendOnline) {
                try {
                    const historyForApi = messages.slice(-8).map(m => ({ role: m.role, content: m.content }));
                    answer = await callAiBackend([...historyForApi, { role: "user", content: text }], sessionId);
                } catch (err) {
                    console.warn("Backend failed, using local:", err.message);
                    answer = localAnswer(text);
                }
            } else {
                // Local fallback with simulated delay
                await new Promise(r => setTimeout(r, 400));
                answer = localAnswer(text);
            }

            const aiMsg = {
                role: "ai",
                content: answer,
                time: formatTime(),
                id: "ai_" + Date.now(),
            };
            setMessages(prev => [...prev, aiMsg]);
        } catch {
            setMessages(prev => [...prev, {
                role: "ai",
                content: "Sorry, I'm having trouble connecting. Please try again or use the contact form.",
                time: formatTime(),
                id: "err_" + Date.now(),
            }]);
        } finally {
            setIsLoading(false);
            setShowTyping(false);
        }
    }

    function resetChat() {
        setMessages([{
            role: "ai",
            content: "👋 Hi! I'm Raihan's AI assistant. Ask me anything about his **projects**, **skills**, **experience**, or **availability**!",
            time: formatTime(),
            id: "reset_" + Date.now(),
        }]);
    }

    function exportChat() {
        const text = messages.map(m => `[${m.time}] ${m.role.toUpperCase()}: ${m.content}`).join("\n\n");
        const blob = new Blob([text], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `raihan-chat-${new Date().toISOString().slice(0, 10)}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    }

    const suggestions = [
        "📋 List all projects",
        "🛠️ What is Raihan's tech stack?",
        "📞 How do I contact Raihan?",
        "🧑‍💻 Tell me about Medically AI",
        "✅ Is Raihan available for work?",
    ];

    return {
        messages,
        input,
        setInput,
        sendMessage,
        resetChat,
        exportChat,
        isLoading,
        backendOnline,
        backendChecked,
        suggestions,
        showTyping,
    };
}
