import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "ai_chat_raihan_history_v1";

// untuk Vite: import.meta.env.VITE_CHAT_API_BASE
const API_BASE = import.meta.env.VITE_REACT_APP_CHAT_API_BASE;

console.log("fff",API_BASE);


function withTimeout(ms = 2500) {
    const controller = new AbortController();
    const t = setTimeout(() => controller.abort(), ms);
    return { controller, clear: () => clearTimeout(t) };
}

export default function useChat() {
    const welcome = {
        role: "ai",
        content:
            "Hi! I'm Raihan's AI portfolio assistant. Ask about my profile, skills, projects, or job availability.",
    };

    const [messages, setMessages] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? JSON.parse(saved) : [welcome];
        } catch {
            return [welcome];
        }
    });

    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // status backend (biar tidak selalu “nembak” kalau memang mati)
    const [backendOnline, setBackendOnline] = useState(false);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }, [messages]);

    // cek health sekali saat mount
    useEffect(() => {
        let alive = true;

        (async () => {
            try {
                const { controller, clear } = withTimeout(2000);
                const r = await fetch(`${API_BASE}/health`, { signal: controller.signal });
                clear();
                if (!alive) return;
                setBackendOnline(r.ok);
            } catch {
                if (!alive) return;
                setBackendOnline(false);
            }
        })();

        return () => {
            alive = false;
        };
    }, []);

    function resetChat() {
        setMessages([welcome]);
    }

    const callBackend = useCallback(async (text) => {
        const { controller, clear } = withTimeout(12000);

        const r = await fetch(`${API_BASE}/api/chat`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: text }),
            signal: controller.signal,
        }).finally(clear);

        

        if (!r.ok) {
            const detail = await r.text().catch(() => "");
            console.log("detail : ",detail);
            
            throw new Error(`API error ${r.status}: ${detail}`);
        }

        const data = await r.json();
        console.log(data);
        
        if (!data?.response) throw new Error("Invalid API response shape");
        return data.response;
    }, []);

    async function sendMessage(text) {
        const trimmed = (text || "").trim();
        if (!trimmed) return;

        const userMsg = { role: "user", content: trimmed };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setIsLoading(true);

        try {
            // backend-first kalau online
            let answer;
            if (backendOnline) {
                try {
                    answer = await callBackend(trimmed);
                    setBackendOnline(true);
                } catch {
                    // kalau gagal di tengah jalan, fallback
                    setBackendOnline(false);
                    answer = await fakeAnswer(trimmed);
                }
            } else {
                // backend dianggap offline → langsung fallback
                answer = await fakeAnswer(trimmed);

                // optional: coba “reconnect” singkat setelah fallback (biar kalau backend nyala lagi, kepakai)
                try {
                    const { controller, clear } = withTimeout(1200);
                    const r = await fetch(`${API_BASE}/health`, { signal: controller.signal });
                    clear();
                    if (r.ok) setBackendOnline(true);
                } catch {
                    return [welcome];
                }
            }

            setMessages((prev) => [...prev, { role: "ai", content: answer }]);
        } catch {
            setMessages((prev) => [
                ...prev,
                { role: "ai", content: "Maaf, ada kendala memproses pesan." },
            ]);
        } finally {
            setIsLoading(false);
        }
    }

    return {
        messages,
        input,
        setInput,
        sendMessage,
        resetChat,
        isLoading,
        backendOnline, // (opsional) kalau mau ditampilkan di UI
    };
}

/* ===== fallback lokal (punya kamu) ===== */
function fakeAnswer(q) {
    return new Promise((resolve) => {
        const lower = q.toLowerCase();
        let ans =
            "Raihan: web developer 5+ tahun. Frontend (React), backend (Node/Laravel/Go), PWA, dan mobile (React Native/Vue+Capacitor).";

        if (lower.includes("skill") || lower.includes("tools") || lower.includes("stack")) {
            ans =
                "Skill inti: HTML, CSS, JS, React, Node.js, Laravel, Go, PWA, React Native, Vue+Capacitor. Praktik: aksesibilitas, performa, SEO.";
        } else if (lower.includes("pengalaman") || lower.includes("experience")) {
            ans = "Pengalaman: 5+ tahun, >10 proyek. Fokus UI responsif, API efisien, dan PWA siap produksi.";
        } else if (lower.includes("tersedia") || lower.includes("available")) {
            ans = "Status: Available for Work. Kirim detail kebutuhanmu, aku bantu kalkulasi scope & timeline.";
        } else if (lower.includes("proyek") || lower.includes("project")) {
            ans = "Cek 'Selected Projects'. Sebutkan proyek yang ingin diringkas, nanti kujelaskan peran, stack, dan hasilnya.";
        }
        setTimeout(() => resolve(ans), 300);
    });
}
// export default useChat;