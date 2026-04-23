import React, { useState, useMemo } from "react";
import { portfolioData } from "../data";
import { Link } from "react-router-dom";
import { useI18n } from "../i18n/LanguageContext.jsx";

const getFirstImage = (p) =>
    p?.assets?.images && p.assets.images.length
        ? (p.assets.images[0].startsWith("/") ? p.assets.images[0] : "/" + p.assets.images[0].replace(/^\.?\/*/, "src/assets/"))
        : "/assets/placeholder.png";

export default function Portfolio() {
    const { t, l } = useI18n();
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    // Get unique categories
    const categories = useMemo(() => {
        const keys = portfolioData.projects
            .map(p => p.category)
            .filter(Boolean);
        return ['all', ...new Set(keys)];
    }, []);

    const categoryLabel = (key) => {
        if (key === 'all') return t("portfolio.filterAll");
        const found = portfolioData.projects.find(p => p.categoryKey === key);
        return found?.category ? l(found.category) : String(key);
    };

    // Filter and search projects
    const filteredProjects = useMemo(() => {
        let filtered = portfolioData.projects;

        // Filter by category
        if (activeFilter !== 'all') {
            filtered = filtered.filter(p => p.category === activeFilter);
        }

        // Filter by search query
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(p => 
                String(l(p.title) ?? "").toLowerCase().includes(query) ||
                String(l(p.summary) ?? "").toLowerCase().includes(query) ||
                String(l(p.role) ?? "").toLowerCase().includes(query) ||
                String(l(p.client) ?? "").toLowerCase().includes(query) ||
                String(l(p.category) ?? "").toLowerCase().includes(query) ||
                p.tech?.some(t => t.toLowerCase().includes(query))
            );
        }

        return filtered;
    }, [activeFilter, searchQuery, l]);

    return (
        <main className="portfolio-page" id="portfolio">
            {/* Hero Section */}
            <section className="portfolio-hero">
                <div className="portfolio-hero__container">
                    <h1 className="portfolio-hero__title">{t("portfolio.hero.title")}</h1>
                    <p className="portfolio-hero__subtitle">
                        {t("portfolio.hero.subtitle")}
                    </p>

                    {/* Search Bar */}
                    <div className="search-bar">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.35-4.35" />
                        </svg>
                        <input
                            type="text"
                            placeholder={t("portfolio.searchPlaceholder")}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-input"
                        />
                        {searchQuery && (
                            <button 
                                className="search-clear"
                                onClick={() => setSearchQuery('')}
                                aria-label={t("aria.clearSearch")}
                            >
                                ×
                            </button>
                        )}
                    </div>

                    {/* Stats */}
                    <div className="portfolio-stats">
                        <div className="stat-item">
                            <span className="stat-number">{portfolioData.projects.length}</span>
                            <span className="stat-label">{t("portfolio.stats.totalProjects")}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">{categories.length - 1}</span>
                            <span className="stat-label">{t("portfolio.stats.categories")}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">{filteredProjects.length}</span>
                            <span className="stat-label">{t("portfolio.stats.showing")}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Filter Section */}
            <section className="portfolio-filters">
                <div className="portfolio-filters__container">
                    <div className="filter-tabs">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                className={`filter-tab ${activeFilter === cat ? 'active' : ''}`}
                                onClick={() => setActiveFilter(cat)}
                            >
                                {categoryLabel(cat)}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="portfolio-grid-section">
                <div className="portfolio-grid__container">
                    {filteredProjects.length > 0 ? (
                        <div className="portfolio-grid">
                            {filteredProjects.map((project, index) => (
                                <Link
                                    key={project.id}
                                    to={`/projects/${project.id}`}
                                    className="portfolio-card"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div className="portfolio-card__image">
                                        <img 
                                            src={getFirstImage(project)} 
                                            alt={t("portfolio.projectPreviewAlt", { title: l(project.title) })}
                                            loading="lazy"
                                        />
                                        <div className="portfolio-card__overlay">
                                            <span className="view-project">
                                                {t("portfolio.overlayViewProject")}
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>

                                    <div className="portfolio-card__content">
                                        <div className="portfolio-card__header">
                                            <h3 className="portfolio-card__title">{l(project.title)}</h3>
                                            {project.category && (
                                                <span className="portfolio-card__category">
                                                    {l(project.category)}
                                                </span>
                                            )}
                                        </div>

                                        {project.summary && (
                                            <p className="portfolio-card__summary">
                                                {(() => {
                                                    const s = String(l(project.summary) ?? "");
                                                    return s.length > 100 ? `${s.substring(0, 100)}...` : s;
                                                })()}
                                            </p>
                                        )}

                                        <div className="portfolio-card__footer">
                                            <div className="portfolio-card__tags">
                                                {project.role && (
                                                    <span className="tag">{l(project.role)}</span>
                                                )}
                                                {project.client && (
                                                    <span className="tag">{l(project.client)}</span>
                                                )}
                                            </div>

                                            {project.tech && project.tech.length > 0 && (
                                                <div className="portfolio-card__tech">
                                                    {project.tech.slice(0, 3).map((tech, i) => (
                                                        <span key={i} className="tech-badge">
                                                            {tech}
                                                        </span>
                                                    ))}
                                                    {project.tech.length > 3 && (
                                                        <span className="tech-badge more">
                                                            +{project.tech.length - 3}
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="no-results">
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="8" />
                                <path d="m21 21-4.35-4.35" />
                            </svg>
                            <h3>{t("portfolio.noResultsTitle")}</h3>
                            <p>{t("portfolio.noResultsDesc")}</p>
                            <button 
                                className="btn btn--secondary"
                                onClick={() => {
                                    setSearchQuery('');
                                    setActiveFilter('all');
                                }}
                            >
                                {t("buttons.clearFilters")}
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="portfolio-cta">
                <div className="portfolio-cta__container">
                    <h2 className="portfolio-cta__title">{t("portfolio.cta.title")}</h2>
                    <p className="portfolio-cta__description">
                        {t("portfolio.cta.description")}
                    </p>
                    <Link to="/contact" className="btn btn--primary">
                        {t("buttons.getInTouch")}
                    </Link>
                </div>
            </section>
        </main>
    );
}