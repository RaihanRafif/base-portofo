// src/components/ScrollToHash.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToHash() {
    const { hash } = useLocation();
    useEffect(() => {
        if (!hash) return;
        // slight delay ensures the section is in the DOM
        requestAnimationFrame(() => {
            const el = document.querySelector(hash);
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    }, [hash]);
    return null;
}
