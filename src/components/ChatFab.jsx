import React, { useEffect, useRef, useState } from "react";
import useChat from "../hooks/useChat.js";

function formatMarkdown(text) {
    if (!text) return "";
    return text
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.+?)\*/g, "<em>$1</em>")
        .replace(/`(.+?)`/g, "<code>$1</code>")
        .replace(/• (.+)/g, "<li>$1</li>")
        .replace(/\\n/g, "<br/>");
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
        messages, input, setInput, sendMessage, clearChat, exportChat,
        isLoading, backendOnline, backendChecked, suggestions, showTyping
    } = useChat();

    const panelRef = useRef(null);
    const listRef = useRef(null);
    const btnRef = useRef(null);
    const inputRef = useRef(null);
    const [toast, setToast] = useState(null);

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

    function onSubmit(e) {
        e.preventDefault();
        if (!input.trim() || isLoading) return;
        sendMessage(input.trim());
    }

    function handleExport() {
        exportChat();
        showToast("Chat saved to downloads 📥");
    }

    function handleReset() {
        clearChat();
        showToast("Conversation cleared 🧹");
    }

    function showToast(msg) {
        setToast(msg);
        setTimeout(() => setToast(null), 2500);
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
                {!backendChecked && <span className="chat-fab-badge" title="Checking...">•</span>}
                {backendChecked && backendOnline && <span className="chat-fab-badge online" title="AI Online">●</span>}
            </button>

            {/* Toast */}
            {toast && (
                <div className="chat-toast">{toast}</div>
            )}

            {open && (
                <section
                    id="ai-chat-panel"
                    ref={panelRef}
                    className={`chat-panel-modern ${compact ? "is-compact" : ""}`}
                    role="dialog"
                    aria-labelledby="chat-title"
                >
                    {/* Header */}
                    <header className="chat-header-modern">
                        <div className="chat-header-info">
                            <div className="chat-avatar">
                                <AvatarR />
                                {backendOnline && <span className="chat-avatar-status online"></span>}
                            </div>
                            <div>
                                <h2 id="chat-title">Raihan's AI</h2>
                                <span className="chat-meta">
                                    {backendOnline ? "Ready to chat" : "Offline mode"}
                                </span>
                            </div>
                        </div>
                        <div className="chat-header-actions">
                            <button type="button" onClick={handleExport} title="Download chat" aria-label="Download chat">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                                </svg>
                            </button>
                            <button type="button" onClick={handleReset} title="Clear chat" aria-label="Clear chat">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                    <polyline points="1 4 1 10 7 10" />
                                    <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                                </svg>
                            </button>
                            <button type="button" onClick={() => setOpen(false)} title="Close" aria-label="Close">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                    <path d="M18 6L6 18M6 6L18 18" />
                                </svg>
                            </button>
                        </div>
                    </header>

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
