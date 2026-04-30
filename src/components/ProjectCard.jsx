import React from "react";
import { Link } from "react-router-dom";
import { useI18n } from "../i18n/LanguageContext.jsx";

const getFirstImage = (p) =>
    p?.assets?.images && p.assets.images.length
        ? (p.assets.images[0].startsWith("/") ? p.assets.images[0] : "/" + p.assets.images[0].replace(/^\.?\/*/, "src/assets/"))
        : "/assets/placeholder.png";

export default function ProjectCard({ p }) {
    const { l } = useI18n();
    return (
        <Link
            to={`/projects/${p.id}`}
            aria-label={`View project: ${l(p.title)}`}
            style={{ color: "inherit", textDecoration: "none" }}
        >
            <article className="projects-container">
                <div className="image-container">
                    <img src={getFirstImage(p)} alt={`${l(p.title)} preview`} />
                </div>

                <div className="bottom-section">
                    <h3 className="title-project">{l(p.title)}</h3>
                    <div className="tag-section" role="list">
                        <span className="tag" role="listitem">{l(p.role) || "—"}</span>
                        <span className="tag" role="listitem">{l(p.client) || "—"}</span>
                        <span className="tag arrow-button" role="img" aria-label="Open project">
                            <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                        </span>
                    </div>
                </div>
            </article>
        </Link>
    );
}
