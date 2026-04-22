import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function Lightbox({ images = [], startIndex = 0, onClose }) {
    const [idx, setIdx] = useState(startIndex);

    useEffect(() => {
        // lock scroll
        const { body } = document;
        const prev = body.style.overflow;
        body.style.overflow = "hidden";
        return () => { body.style.overflow = prev; };
    }, []);

    useEffect(() => {
        function onKey(e) {
            if (e.key === "Escape") onClose?.();
            if (e.key === "ArrowRight") setIdx((i) => (i + 1) % images.length);
            if (e.key === "ArrowLeft") setIdx((i) => (i - 1 + images.length) % images.length);
        }
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [images.length, onClose]);

    if (!images.length) return null;

    return createPortal(
        <div
            className="lightbox-backdrop"
            role="dialog"
            aria-modal="true"
            aria-label="Image viewer"
            onClick={(e) => { if (e.target === e.currentTarget) onClose?.(); }}
        >
            <button className="lightbox-close" onClick={onClose} aria-label="Close">
                ×
            </button>

            <button
                className="lightbox-nav lightbox-prev"
                onClick={() => setIdx((i) => (i - 1 + images.length) % images.length)}
                aria-label="Previous image"
            >‹</button>

            <figure className="lightbox-dialog" aria-live="polite">
                <img className="lightbox-img" src={images[idx]} alt={`Screenshot ${idx + 1} of ${images.length}`} />
            </figure>

            <button
                className="lightbox-nav lightbox-next"
                onClick={() => setIdx((i) => (i + 1) % images.length)}
                aria-label="Next image"
            >›</button>
        </div>,
        document.body
    );
}
