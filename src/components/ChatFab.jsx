import React, { useEffect, useRef, useState } from "react";
import useChat from "../hooks/useChat.js";

export default function ChatFab({ compact = true }) {
    const [open, setOpen] = useState(false);
    const { messages, input, setInput, sendMessage, resetChat, isLoading } = useChat();

    const panelRef = useRef(null);
    const listRef = useRef(null);
    const btnRef = useRef(null);

    useEffect(() => {
        if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
    }, [messages, open]);

    useEffect(() => {
        function onKeyDown(e) { if (e.key === "Escape" && open) { setOpen(false); btnRef.current?.focus(); } }
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [open]);

    useEffect(() => {
        function handleClickOutside(e) { if (open && panelRef.current && !panelRef.current.contains(e.target)) setOpen(false); }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [open]);

    function onSubmit(e) {
        e.preventDefault();
        if (!input.trim()) return;
        sendMessage(input.trim());
    }

    const quick = [
        "Summary Raihan's Profile",
        "Main skill and tools ",
    ];

    return (
        <>
            {/* FAB kecil */}
            <button
                ref={btnRef}
                className={`chat-fab more-button ${compact ? "is-compact" : ""}`}
                aria-label={open ? "Close Chat" : "Open AI CHAT"}
                aria-expanded={open}
                aria-controls="ai-chat-panel"
                onClick={() => setOpen(v => !v)}
            >
                <span className="text">{open ? "Close" : "Chat"}</span>
                <span className="icon" aria-hidden="true"><i className="fa-solid fa-message"></i></span>
            </button>

            {open && (
                <section
                    id="ai-chat-panel"
                    ref={panelRef}
                    className={`chat-panel template-div-1 ${compact ? "is-compact" : ""}`}
                    role="dialog"
                    aria-labelledby="chat-title"
                    aria-modal="false"
                >
                    <header className="chat-header">
                        <h2 id="chat-title" className="section-title">Ask about me</h2>
                        <div className="chat-actions">
                            <button className="icon-btn" type="button" onClick={resetChat} title="Clear Conversation" aria-label="Clear Conversation">
                                <i className="fa-solid fa-rotate"></i>
                            </button>
                            <button className="icon-btn" type="button" onClick={() => setOpen(false)} title="Close" aria-label="Close">
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>
                    </header>

                    <div className="quick-replies" aria-hidden="false">
                        {quick.map((q) => (
                            <button key={q} className="chip" type="button" onClick={() => sendMessage(q)}>{q}</button>
                        ))}
                    </div>

                    <div className="chat-messages" ref={listRef} role="log" aria-live="polite">
                        {messages.map((m, idx) => (
                            <div key={idx} className={`chat-bubble ${m.role === "user" ? "me" : "ai"}`}>
                                {m.content}
                            </div>
                        ))}
                        {isLoading && (
                            <div className="chat-bubble ai typing">
                                <span className="dot"></span><span className="dot"></span><span className="dot"></span>
                            </div>
                        )}
                    </div>

                    <form className="chat-input" onSubmit={onSubmit}>
                        <label htmlFor="chat-text" className="visually-hidden">Type your question...</label>
                        <input
                            id="chat-text"
                            type="text"
                            placeholder="Example: summary of experience, tech stack, or projects…"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            autoComplete="off"
                            inputMode="text"
                        />
                        <button className="more-button " type="submit" disabled={isLoading}>
                            <span className="text text-justify">Send</span>
                        </button>
                    </form>
                </section>
            )}
        </>
    );
}
