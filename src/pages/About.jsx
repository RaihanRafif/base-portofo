import React from "react";
import { Link } from "react-router-dom";
import { useI18n } from "../i18n/LanguageContext.jsx";
import profpic from "/assets/new-profpic.png";

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
        frontend: [
            { name: "HTML5", level: 95 },
            { name: "CSS3", level: 90 },
            { name: "JavaScript", level: 88 },
            { name: "TypeScript", level: 75 },
            { name: "React", level: 90 },
            { name: "Vue.js", level: 70 },
            { name: "Tailwind CSS", level: 85 },
            { name: "SCSS", level: 80 }
        ],
        backend: [
            { name: "Node.js", level: 85 },
            { name: "Express", level: 85 },
            { name: "Laravel", level: 70 },
            { name: "PHP", level: 65 },
            { name: "Golang", level: 55 },
            { name: "REST API", level: 90 },
            { name: "GraphQL", level: 60 }
        ],
        database: [
            { name: "PostgreSQL", level: 80 },
            { name: "MySQL", level: 85 },
            { name: "MongoDB", level: 70 },
            { name: "Redis", level: 55 }
        ],
        tools: [
            { name: "Git", level: 90 },
            { name: "Docker", level: 65 },
            { name: "Linux", level: 75 },
            { name: "CI/CD", level: 70 },
            { name: "Figma", level: 75 }
        ]
    };

    const stats = [
        { number: "5+", label: t("about.stats.yearsProgramming") },
        { number: "4+", label: t("about.stats.yearsFullstack") },
        { number: "4+", label: t("about.stats.projectsCompleted") },
        { number: "3", label: t("about.stats.happyClients") }
    ];

    const skillCategories = [
        { key: "frontend", label: t("about.skills.frontend"), color: "red", items: skills.frontend },
        { key: "backend", label: t("about.skills.backend"), color: "blue", items: skills.backend },
        { key: "database", label: t("about.skills.dbTools"), color: "green", items: [...skills.database, ...skills.tools] }
    ];

    return (
        <main className="about-page" id="about">
            {/* Hero — Split layout with profile photo */}
            <section className="about-hero">
                <div className="about-hero__container">
                    <div className="about-hero__photo-col">
                        <div className="about-hero__photo-wrap">
                            <img
                                src={profpic}
                                alt={t("home.profileAlt", { name: "Raihan Rafif" })}
                                className="about-hero__photo"
                                loading="eager"
                            />
                            <div className="about-hero__photo-accent"></div>
                        </div>
                    </div>
                    <div className="about-hero__text-col">
                        <span className="about-hero__label">{t("about.hero.label") || "Who I Am"}</span>
                        <h1 className="about-hero__title">
                            <span className="about-hero__title-name">Raihan</span>{" "}
                            <span className="about-hero__title-highlight">Rafif</span>
                        </h1>
                        <p className="about-hero__subtitle">
                            {t("about.hero.subtitle")}
                        </p>
                        <div className="about-hero__badges">
                            <span className="about-hero__badge about-hero__badge--red">
                                <span className="about-hero__badge-dot"></span>
                                {t("home.status")}
                            </span>
                            <span className="about-hero__badge">
                                Takeo, Saga, Japan
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats — Horizontal strip */}
            <section className="about-stats">
                <div className="about-stats__container">
                    {stats.map((stat, index) => (
                        <div key={index} className="about-stat-item">
                            <div className="about-stat-item__number">{stat.number}</div>
                            <div className="about-stat-item__label">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Story — Left-aligned with accent sidebar */}
            <section className="about-story">
                <div className="about-story__container">
                    <h2 className="about-section-title about-section-title--left">
                        <span className="about-section-title__accent"></span>
                        {t("about.journey.title")}
                    </h2>
                    <div className="about-story__content">
                        <div className="about-story__accent-bar"></div>
                        <div className="about-story__text">
                            <p>{t("about.journey.p1")}</p>
                            <p>{t("about.journey.p2")}</p>
                            <p>{t("about.journey.p3")}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Skills — Visual skill bars */}
            <section className="about-skills">
                <div className="about-skills__container">
                    <h2 className="about-section-title about-section-title--left">
                        <span className="about-section-title__accent"></span>
                        {t("about.skills.title")}
                    </h2>

                    <div className="skills-grid">
                        {skillCategories.map((cat) => (
                            <div key={cat.key} className="skill-category">
                                <h3 className={`skill-category__title skill-category__title--${cat.color}`}>
                                    {cat.label}
                                </h3>
                                <div className="skill-bars">
                                    {cat.items.map((skill) => (
                                        <div key={skill.name} className="skill-bar">
                                            <div className="skill-bar__header">
                                                <span className="skill-bar__name">{skill.name}</span>
                                                <span className="skill-bar__percent">{skill.level}%</span>
                                            </div>
                                            <div className="skill-bar__track">
                                                <div
                                                    className={`skill-bar__fill skill-bar__fill--${cat.color}`}
                                                    style={{ "--target-width": `${skill.level}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Experience — Timeline with colored borders */}
            <section className="about-experience">
                <div className="about-experience__container">
                    <h2 className="about-section-title about-section-title--left">
                        <span className="about-section-title__accent"></span>
                        {t("about.experience.title")}
                    </h2>

                    <div className="timeline">
                        {experiences.map((exp, index) => (
                            <div key={index} className={`timeline-item timeline-item--${exp.type}`}>
                                <div className="timeline-marker">
                                    <div className={`timeline-dot timeline-dot--${exp.type}`}></div>
                                    {index < experiences.length - 1 && (
                                        <div className="timeline-line"></div>
                                    )}
                                </div>

                                <div className="timeline-content">
                                    <div className={`experience-card experience-card--${exp.type}`}>
                                        <div className="experience-header">
                                            <div className="experience-title-group">
                                                <h3 className="experience-title">{exp.title}</h3>
                                                <p className="experience-company">{exp.company}</p>
                                            </div>
                                            <div className="experience-meta">
                                                <span className={`experience-type experience-type--${exp.type}`}>
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

            {/* CTA — Rotating gradient background (matches Home) */}
            <section className="about-cta">
                <div className="about-cta__container">
                    <div className="about-cta__content">
                        <h2 className="about-cta__title">
                            <span className="about-cta__title-highlight">{t("about.cta.title")}</span>
                        </h2>
                        <p className="about-cta__description">
                            {t("about.cta.description1")} {t("about.cta.description2")}
                        </p>
                        <div className="about-cta__buttons">
                            <Link to="/contact" className="btn btn--primary">
                                {t("buttons.getInTouch")}
                            </Link>
                            <Link to="/portfolio" className="btn btn--secondary">
                                {t("buttons.viewMyWork")}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}