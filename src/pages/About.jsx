import React from "react";
import { useI18n } from "../i18n/LanguageContext.jsx";

export default function About() {
    const { t } = useI18n();
    const experiences = [
        {
            title: t("about.experiences.exp1.title"),
            company: t("about.experiences.exp1.company"),
            duration: t("about.experiences.exp1.duration"),
            description: t("about.experiences.exp1.description"),
            type: "freelance"
        },
        {
            title: t("about.experiences.exp2.title"),
            company: t("about.experiences.exp2.company"),
            duration: t("about.experiences.exp2.duration"),
            description: t("about.experiences.exp2.description"),
            type: "full-time"
        },
        {
            title: t("about.experiences.exp3.title"),
            company: t("about.experiences.exp3.company"),
            duration: t("about.experiences.exp3.duration"),
            description: t("about.experiences.exp3.description"),
            type: "freelance"
        }
    ];

    const skills = {
        frontend: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Vue.js", "Tailwind CSS", "SCSS"],
        backend: ["Node.js", "Express", "Laravel", "PHP", "Golang", "REST API", "GraphQL"],
        database: ["PostgreSQL", "MySQL", "MongoDB", "Redis"],
        tools: ["Git", "Docker", "Linux", "CI/CD", "Figma"]
    };

    const stats = [
        { number: "5+", label: t("about.stats.yearsProgramming") },
        { number: "4+", label: t("about.stats.yearsFullstack") },
        { number: "4+", label: t("about.stats.projectsCompleted") },
        { number: "3", label: t("about.stats.happyClients") }
    ];

    return (
        <main className="about-page" id="about">
            {/* Hero Section */}
            <section className="about-hero">
                <div className="about-hero__container">
                    <h1 className="about-hero__title">{t("about.hero.title")}</h1>
                    <p className="about-hero__subtitle">
                        {t("about.hero.subtitle")}
                    </p>
                </div>
            </section>

            {/* Stats Section */}
            <section className="about-stats">
                <div className="about-stats__container">
                    {stats.map((stat, index) => (
                        <div key={index} className="about-stat-card">
                            <div className="stat-number">{stat.number}</div>
                            <div className="stat-label">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Story Section */}
            <section className="about-story">
                <div className="about-story__container">
                    <div className="about-story__content">
                        <h2 className="section-title">{t("about.journey.title")}</h2>
                        <div className="story-text">
                            <p>
                                {t("about.journey.p1")}
                            </p>
                            <p>
                                {t("about.journey.p2")}
                            </p>
                            <p>
                                {t("about.journey.p3")}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section className="about-skills">
                <div className="about-skills__container">
                    <h2 className="section-title">{t("about.skills.title")}</h2>
                    
                    <div className="skills-grid">
                        <div className="skill-category">
                            <h3 className="skill-category__title">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="16 18 22 12 16 6" />
                                    <polyline points="8 6 2 12 8 18" />
                                </svg>
                                {t("about.skills.frontend")}
                            </h3>
                            <div className="skill-tags">
                                {skills.frontend.map((skill, index) => (
                                    <span key={index} className="skill-tag">{skill}</span>
                                ))}
                            </div>
                        </div>

                        <div className="skill-category">
                            <h3 className="skill-category__title">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
                                    <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                                    <line x1="6" y1="6" x2="6.01" y2="6" />
                                    <line x1="6" y1="18" x2="6.01" y2="18" />
                                </svg>
                                {t("about.skills.backend")}
                            </h3>
                            <div className="skill-tags">
                                {skills.backend.map((skill, index) => (
                                    <span key={index} className="skill-tag">{skill}</span>
                                ))}
                            </div>
                        </div>

                        <div className="skill-category">
                            <h3 className="skill-category__title">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <ellipse cx="12" cy="5" rx="9" ry="3" />
                                    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                                    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                                </svg>
                                {t("about.skills.dbTools")}
                            </h3>
                            <div className="skill-tags">
                                {[...skills.database, ...skills.tools].map((skill, index) => (
                                    <span key={index} className="skill-tag">{skill}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Experience Section */}
            <section className="about-experience">
                <div className="about-experience__container">
                    <h2 className="section-title">{t("about.experience.title")}</h2>
                    
                    <div className="timeline">
                        {experiences.map((exp, index) => (
                            <div key={index} className="timeline-item">
                                <div className="timeline-marker">
                                    <div className="timeline-dot"></div>
                                    {index < experiences.length - 1 && (
                                        <div className="timeline-line"></div>
                                    )}
                                </div>
                                
                                <div className="timeline-content">
                                    <div className="experience-card">
                                        <div className="experience-header">
                                            <div className="experience-title-group">
                                                <h3 className="experience-title">{exp.title}</h3>
                                                <p className="experience-company">{exp.company}</p>
                                            </div>
                                            <div className="experience-meta">
                                                <span className={`experience-type ${exp.type}`}>
                                                    {exp.type === 'freelance' ? t("about.experience.typeFreelance") : t("about.experience.typeFulltime")}
                                                </span>
                                                <span className="experience-duration">{exp.duration}</span>
                                            </div>
                                        </div>
                                        {exp.description && (
                                            <p className="experience-description">{exp.description}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="about-cta">
                <div className="about-cta__container">
                    <h2 className="about-cta__title">{t("about.cta.title")}</h2>
                    <p className="about-cta__description">
                        {t("about.cta.description1")} {t("about.cta.description2")}
                    </p>
                    <div className="about-cta__buttons">
                        <a href="/contact" className="btn btn--primary">
                            {t("buttons.getInTouch")}
                        </a>
                        <a href="/portfolio" className="btn btn--secondary">
                            {t("buttons.viewMyWork")}
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}