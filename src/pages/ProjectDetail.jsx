import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { portfolioData } from "../data";
import { useI18n } from "../i18n/LanguageContext.jsx";

const getFirstImage = (p) =>
    p?.assets?.images && p.assets.images.length
        ? (p.assets.images[0].startsWith("/") ? p.assets.images[0] : "/" + p.assets.images[0].replace(/^\.?\/*/, "src/assets/"))
        : "/assets/placeholder.png";

const normalizeAsset = (p) =>
    p?.startsWith("/") ? p : "/" + p.replace(/^\.?\/*/, "src/assets/");

function renderFeature(text) {
    if (!text) return null;
    const clean = text.replace(/^\s*-\s*/, "").trim();
    const idx = clean.indexOf(":");

    if (idx === -1) return clean;

    const title = clean.slice(0, idx).trim();
    const rest = clean.slice(idx + 1).trimStart();

    return (
        <>
            <strong>{title}</strong>
            {rest ? `: ${rest}` : ""}
        </>
    );
}

export default function ProjectDetail() {
    const { t, l } = useI18n();
    const { id } = useParams();
    const project = portfolioData.projects.find(p => String(p.id) === String(id));

    const images = useMemo(
        () => (project?.assets?.images ?? []).map(normalizeAsset),
        [project]
    );

    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    const openAt = (i) => {
        setActiveIndex(i);
        setIsOpen(true);
    };

    const close = () => setIsOpen(false);

    const nextImage = () => {
        setActiveIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const similarProjects = useMemo(() => {
        if (!project) return [];

        const others = portfolioData.projects.filter(
            p => String(p.id) !== String(project.id)
        );

        others.sort((a, b) => (
            (a.categoryKey === project.categoryKey ? -1 : 0) -
            (b.categoryKey === project.categoryKey ? -1 : 0)
        ));

        return others.slice(0, 3);
    }, [project]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    useEffect(() => {
        if (!isOpen) return;

        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const onKey = (e) => {
            if (e.key === "Escape") close();
            if (e.key === "ArrowRight") nextImage();
            if (e.key === "ArrowLeft") prevImage();
        };

        window.addEventListener("keydown", onKey);

        return () => {
            document.body.style.overflow = prev;
            window.removeEventListener("keydown", onKey);
        };
    }, [isOpen, images.length]);

    if (!project) {
        return (
            <main className="project-detail project-detail--not-found">
                <div className="not-found-container">
                    <h1>{t("project.notFoundTitle")}</h1>
                    <p>{t("project.notFoundDesc")}</p>
                    <Link to="/" className="btn btn--primary">
                        {t("buttons.backToHome")}
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="project-detail" id="project-detail">
            {/* Hero Section */}
            <section className="project-hero">
                <div className="project-hero__container">
                    <Link to="/" className="back-button">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        <span>{t("buttons.backToHome")}</span>
                    </Link>

                    <div className="project-hero__content">
                        <h1 className="project-hero__title">{l(project.title)}</h1>
                        <p className="project-hero__summary">{l(project.summary)}</p>

                        <div className="project-hero__meta">
                            <div className="meta-item">
                                <span className="meta-label">{t("project.meta.role")}</span>
                                <span className="meta-value">{l(project.role)}</span>
                            </div>
                            <div className="meta-item">
                                <span className="meta-label">{t("project.meta.client")}</span>
                                <span className="meta-value">{l(project.client)}</span>
                            </div>
                            <div className="meta-item">
                                <span className="meta-label">{t("project.meta.date")}</span>
                                <span className="meta-value">{project.date}</span>
                            </div>
                        </div>
                    </div>

                    <figure
                        className="project-hero__image"
                        onClick={() => openAt(0)}
                    >
                        <img src={getFirstImage(project)} alt={t("portfolio.projectPreviewAlt", { title: l(project.title) })} />
                        <div className="image-overlay">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                            </svg>
                            <span>{t("project.clickToExpand")}</span>
                        </div>
                    </figure>
                </div>
            </section>

            {/* Main Content */}
            <section className="project-content">
                <div className="project-content__container">
                    {/* Sidebar */}
                    <aside className="project-sidebar">
                        <div className="sidebar-section">
                            <h3 className="sidebar-title">{t("project.sidebar.details")}</h3>

                            <div className="detail-group">
                                <span className="detail-label">{t("project.sidebar.techStack")}</span>
                                <div className="tech-tags">
                                    {(project?.tech ?? []).map((tech, i) => (
                                        <span key={`${tech}-${i}`} className="tech-tag">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            {(project?.liveUrl || project?.repoUrl) && (
                                <div className="detail-group">
                                    <span className="detail-label">{t("project.sidebar.links")}</span>
                                    <div className="project-links">
                                        {project?.liveUrl && (
                                            <a
                                                className="btn btn--primary project-link"
                                                href={project.liveUrl}
                                                target="_blank"
                                                rel="noreferrer noopener"
                                            >
                                                <span>{t("buttons.liveDemo")}</span>
                                                <span aria-hidden="true">↗</span>
                                            </a>
                                        )}

                                        {project?.repoUrl && (
                                            <a
                                                className="btn btn--secondary project-link"
                                                href={project.repoUrl}
                                                target="_blank"
                                                rel="noreferrer noopener"
                                            >
                                                <span>{t("buttons.sourceCode")}</span>
                                                <span aria-hidden="true">↗</span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            )}

                        </div>
                    </aside>

                    {/* Main Content */}
                    <article className="project-main">
                        {project.overview && (
                            <div className="content-section">
                                <h2 className="content-title">{t("project.sections.overview")}</h2>
                                <p className="content-text">{l(project.overview)}</p>
                            </div>
                        )}

                        {Array.isArray(l(project.keyfeatures)) && l(project.keyfeatures).length > 0 && (
                            <div className="content-section">
                                <h2 className="content-title">{t("project.sections.keyFeatures")}</h2>
                                <ul className="feature-list">
                                    {l(project.keyfeatures).map((feature, i) => (
                                        <li key={i} className="feature-item">
                                            {renderFeature(feature)}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {project.mission && (
                            <div className="content-section">
                                <h2 className="content-title">{t("project.sections.mission")}</h2>
                                <p className="content-text">{l(project.mission)}</p>
                            </div>
                        )}

                        {project.impact && (
                            <div className="content-section">
                                <h2 className="content-title">{t("project.sections.impact")}</h2>
                                <p className="content-text">{l(project.impact)}</p>
                            </div>
                        )}
                    </article>
                </div>
            </section>

            {/* Image Gallery */}
            {images.length > 1 && (
                <section className="project-gallery">
                    <div className="project-gallery__container">
                        <h2 className="gallery-title">{t("project.sections.gallery")}</h2>
                        <div className="gallery-grid">
                            {images.slice(1).map((src, i) => (
                                <figure
                                    key={i}
                                    className="gallery-item"
                                    onClick={() => openAt(i + 1)}
                                >
                                    <img src={src} alt={t("project.screenshotAlt", { title: l(project.title), n: i + 2 })} loading="lazy" />
                                    <div className="gallery-overlay">
                                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                                        </svg>
                                    </div>
                                </figure>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Similar Projects */}
            {similarProjects.length > 0 && (
                <section className="similar-projects-section">
                    <div className="similar-projects__container">
                        <div className="similar-projects__header">
                            <h2 className="section-title">{t("project.sections.similar")}</h2>
                            <Link className="more-button" to="/portfolio">
                                <span className="text">{t("buttons.viewAllProjects")}</span>
                                <span className="icon">→</span>
                            </Link>
                        </div>

                        <div className="similar-projects-grid">
                            {similarProjects.map(sp => (
                                <Link
                                    key={sp.id}
                                    to={`/projects/${sp.id}`}
                                    className="similar-project-card"
                                >
                                    <div className="card-image">
                                        <img src={getFirstImage(sp)} alt={t("portfolio.projectPreviewAlt", { title: l(sp.title) })} />
                                    </div>
                                    <div className="card-content">
                                        <h3 className="card-title">{l(sp.title)}</h3>
                                        <div className="card-tags">
                                            <span className="tag">{sp.role ? l(sp.role) : "—"}</span>
                                            <span className="tag">{sp.client ? l(sp.client) : "—"}</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Image Modal */}
            {isOpen && (
                <div
                    className="image-modal"
                    role="dialog"
                    aria-modal="true"
                    onClick={(e) => e.target === e.currentTarget && close()}
                >
                    <button className="modal-close" onClick={close} aria-label={t("aria.close")}>
                        ×
                    </button>

                    {images.length > 1 && (
                        <>
                            <button
                                className="modal-nav modal-nav--prev"
                                onClick={prevImage}
                                aria-label={t("aria.prevImage")}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M15 18l-6-6 6-6" />
                                </svg>
                            </button>

                            <button
                                className="modal-nav modal-nav--next"
                                onClick={nextImage}
                                aria-label={t("aria.nextImage")}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M9 18l6-6-6-6" />
                                </svg>
                            </button>
                        </>
                    )}

                    <div className="modal-content">
                        <img
                            src={images[activeIndex]}
                            alt={t("project.fullViewAlt", { title: l(project.title) })}
                        />
                        <div className="modal-counter">
                            {activeIndex + 1} / {images.length}
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}