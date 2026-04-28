import { useState, useEffect, useCallback } from "react";
import { staticAnswer } from "../chatData";

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

/* ========== OLLAMA / BACKEND API CALL ========== */
const API_BASE = import.meta.env.VITE_REACT_APP_CHAT_API_BASE || "/api";

function withTimeout(ms = 15000) {
    const c = new AbortController();
    const t = setTimeout(() => c.abort(), ms);
    return { controller: c, clear: () => clearTimeout(t) };
}

async function callAiBackend(messages, sessionId) {
    const { controller, clear } = withTimeout(15000);
    try {
        const res = await fetch(`${API_BASE}/chat`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                messages: messages.map(m => ({
                    role: m.role === "ai" ? "assistant" : m.role,
                    content: m.content
                })),
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
                const { controller, clear } = withTimeout(3500);
                const res = await fetch(`${API_BASE}/health`, { signal: controller.signal });
                clear();
                if (!alive) return;
                setBackendOnline(res.ok);
            } catch {
                if (!alive) return;
                setBackendOnline(false);
            } finally {
                if (!alive) return;
                setBackendChecked(true);
            }
        })();
        return () => { alive = false; };
    }, []);

    // Suggestions
    const suggestions = [
        "What projects has Raihan built?",
        "What tech stack does he use?",
        "How can I hire Raihan?",
    ];

    // Auto-scroll trigger
    useEffect(() => {
        setShowTyping(isLoading);
    }, [isLoading]);

    const sendMessage = useCallback(async (text) => {
        const msgText = text || input;
        if (!msgText.trim()) return;

        const userMsg = {
            role: "user",
            content: msgText.trim(),
            time: formatTime(),
            id: "usr_" + Date.now(),
        };

        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsLoading(true);

        try {
            // Try static answer first (0ms latency, deterministic)
            const staticResp = staticAnswer(msgText.trim());
            if (staticResp) {
                // Optional: tiny delay for natural feel
                await new Promise(r => setTimeout(r, 200));
                setMessages(prev => [...prev, {
                    role: "ai",
                    content: staticResp,
                    time: formatTime(),
                    id: "ai_static_" + Date.now(),
                }]);
                setIsLoading(false);
                return;
            }

            // Fallback to AI backend
            if (backendOnline) {
                const historyForApi = messages.slice(-8).map(m => ({
                    role: m.role === "ai" ? "assistant" : m.role,
                    content: m.content,
                }));
                historyForApi.push({ role: "user", content: msgText.trim() });
                const reply = await callAiBackend(historyForApi, sessionId);
                setMessages(prev => [...prev, {
                    role: "ai",
                    content: reply || "I don't have an answer for that right now. Please try again or reach out directly.",
                    time: formatTime(),
                    id: "ai_api_" + Date.now(),
                }]);
            } else {
                // AI offline fallback
                setMessages(prev => [...prev, {
                    role: "ai",
                    content: "Sorry, I'm having trouble connecting to my knowledge base right now. 🔧\n\nPlease reach out directly via the Contact form, or try asking about Raihan's **projects**, **skills**, or **experience**.",
                    time: formatTime(),
                    id: "ai_offline_" + Date.now(),
                }]);
            }
        } catch (err) {
            setMessages(prev => [...prev, {
                role: "ai",
                content: "Sorry, something went wrong on my end. 😅\n\nPlease try again or reach out via the Contact form.",
                time: formatTime(),
                id: "ai_err_" + Date.now(),
            }]);
        } finally {
            setIsLoading(false);
        }
    }, [input, messages, sessionId, backendOnline]);

    const clearChat = useCallback(() => {
        localStorage.removeItem(STORAGE_KEY);
        const fresh = [{
            role: "ai",
            content: "👋 Chat cleared! What would you like to know about Raihan?",
            time: formatTime(),
            id: "ai_new_" + Date.now(),
        }];
        setMessages(fresh);
    }, []);

    const exportChat = useCallback(() => {
        const text = messages.map(m => `[${m.time}] ${m.role.toUpperCase()}: ${m.content}`).join("\n\n");
        const blob = new Blob([text], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `raihan-chat-${new Date().toISOString().slice(0,10)}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    }, [messages]);

    return {
        messages,
        input,
        setInput,
        isLoading,
        showTyping,
        sendMessage,
        clearChat: resetChat,
        exportChat,
        backendOnline,
        backendChecked,
        suggestions,
    };
}