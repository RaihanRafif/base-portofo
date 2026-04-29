import React, { useEffect, useRef, useState } from "react";
import useChat from "../hooks/useChat.js";

function formatMarkdown(text) {
    if (!text) return "";
    let html = text
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.+?)\*/g, "<em>$1</em>")
        .replace(/`(.+?)`/g, "<code>$1</code>")
        .replace(/• (.+)/g, "<li>$1</li>")
        .replace(/\\n/g, "<br/>");

    // Auto-link email addresses
    html = html.replace(
        /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g,
        '<a href="mailto:$1" class="chat-link chat-link--email">$1</a>'
    );

    // Auto-link URLs (http/https)
    html = html.replace(
        /(https?:\/\/[^\s<>"']+)/g,
        '<a href="$1" target="_blank" rel="noopener noreferrer" class="chat-link chat-link--url">$1</a>'
    );

    // Make "Contact" page references clickable (internal route hint)
    html = html.replace(
        /\b(Contact page|Contact form|halaman Contact|form kontak|halaman Kontak)\b/gi,
        '<a href="/contact" class="chat-link chat-link--internal">$1</a>'
    );

    return html;
}

// Monogram "R" avatar SVG
function AvatarR() {
    return (
        <svg viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="url(#avatarGrad)" />
            <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="16" fontFamily="Inter, sans-serif" fontWeight="700" letterSpacing="-0.5">R</text>
            <defs>
                <linearGradient id="avatarGrad" x1="0" y1="0" x2="32" y2="32">
                    <stop stopColor="#eb4141" />
                    <stop offset="1" stopColor="#c73636" />
                </linearGradient>
            </defs>
        </svg>
    );
}

export default function ChatFab({ compact = true }) {
    const [open, setOpen] = useState(false);
    const {
        messages, input, setInput, sendMessage,
        isLoading, suggestions, showTyping
    } = useChat();

    const panelRef = useRef(null);
    const listRef = useRef(null);
    const btnRef = useRef(null);
    const inputRef = useRef(null);

    // Auto-scroll
    useEffect(() => {
        if (listRef.current) {
            listRef.current.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
        }
    }, [messages, open, isLoading]);

    // Focus input on open
    useEffect(() => {
        if (open && inputRef.current) {
            setTimeout(() => inputRef.current.focus(), 300);
        }
    }, [open]);

    // Escape to close
    useEffect(() => {
        function onKeyDown(e) {
            if (e.key === "Escape" && open) {
                setOpen(false);
                btnRef.current?.focus();
            }
        }
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [open]);

    // Click outside to close
    useEffect(() => {
        function handleClickOutside(e) {
            if (open && panelRef.current && !panelRef.current.contains(e.target) && !btnRef.current.contains(e.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [open]);

    // Toggle body class when panel opens — pushes header down
    useEffect(() => {
        if (open) {
            document.body.classList.add("chat-panel-open");
        } else {
            document.body.classList.remove("chat-panel-open");
        }
        return () => document.body.classList.remove("chat-panel-open");
    }, [open]);

    function onSubmit(e) {
        e.preventDefault();
        if (!input.trim() || isLoading) return;
        sendMessage(input.trim());
    }

    function handleSuggestion(text) {
        sendMessage(text.replace(/^[📋🛠️📞🧑‍💻✅]\s*/, "").trim());
    }

    return (
        <>
            {/* FAB */}
            <button
                ref={btnRef}
                className={`chat-fab-modern ${compact ? "is-compact" : ""} ${open ? "is-open" : ""}`}
                aria-label={open ? "Close Chat" : "Open AI Assistant"}
                aria-expanded={open}
                aria-controls="ai-chat-panel"
                onClick={() => setOpen(v => !v)}
            >
                {open ? (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M18 6L6 18M6 6L18 18" />
                    </svg>
                ) : (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                )}
                <span className="chat-fab-pulse"></span>
            </button>

            {open && (
                <section
                    id="ai-chat-panel"
                    ref={panelRef}
                    className={`chat-panel-modern ${compact ? "is-compact" : ""}`}
                    role="dialog"
                    aria-label="Chat with Raihan's AI"
                >
                    {/* Close button — floating top-right */}
                    <button
                        type="button"
                        className="chat-panel-close"
                        onClick={() => setOpen(false)}
                        title="Close"
                        aria-label="Close"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                            <path d="M18 6L6 18M6 6L18 18" />
                        </svg>
                    </button>

                    {/* Suggestions */}
                    <div className="chat-suggestions">
                        {suggestions.map((s) => (
                            <button
                                key={s}
                                className="chat-suggestion-chip"
                                type="button"
                                onClick={() => handleSuggestion(s)}
                                disabled={isLoading}
                            >
                                {s}
                            </button>
                        ))}
                    </div>

                    {/* Messages */}
                    <div className="chat-messages-modern" ref={listRef} role="log" aria-live="polite">
                        {messages.map((m) => (
                            <div key={m.id || m.time} className={`chat-msg ${m.role === "user" ? "user" : "ai"}`}>
                                {m.role === "ai" && (
                                    <div className="chat-msg-avatar">
                                        <AvatarR />
                                    </div>
                                )}
                                <div className="chat-msg-bubble">
                                    <div
                                        className="chat-msg-text"
                                        dangerouslySetInnerHTML={{ __html: formatMarkdown(m.content) }}
                                    />
                                    <span className="chat-msg-time">{m.time}</span>
                                </div>
                            </div>
                        ))}

                        {isLoading && showTyping && (
                            <div className="chat-msg ai">
                                <div className="chat-msg-avatar">
                                    <svg viewBox="0 0 24 24" fill="none">
                                        <rect width="24" height="24" rx="6" fill="#6366f1" />
                                        <circle cx="9" cy="10" r="1.5" fill="white" />
                                        <circle cx="15" cy="10" r="1.5" fill="white" />
                                    </svg>
                                </div>
                                <div className="chat-msg-bubble typing">
                                    <span className="chat-dot"></span>
                                    <span className="chat-dot"></span>
                                    <span className="chat-dot"></span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input */}
                    <form className="chat-input-modern" onSubmit={onSubmit}>
                        <input
                            ref={inputRef}
                            id="chat-text"
                            type="text"
                            placeholder="Ask about projects, skills, or availability..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            autoComplete="off"
                            disabled={isLoading}
                        />
                        <button type="submit" disabled={isLoading || !input.trim()} aria-label="Send">
                            <span className="send-arrow"></span>
                        </button>
                    </form>
                </section>
            )}
        </>
    );
}
