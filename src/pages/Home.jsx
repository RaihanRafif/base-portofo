import React, { useEffect, useRef, useState } from "react";
import profpic from "/assets/new-profpic.png";
import profpicCharacter from "/assets/new-profpic-character.png";
import { Link } from "react-router-dom";
import { portfolioData } from "../data.js";
import ProjectsCarousel from "../components/ProjectsCarousel.jsx";
import { useI18n } from "../i18n/LanguageContext.jsx";

export default function Home() {
    const { t } = useI18n();
    const holesGroupRef = useRef(null);
    const shapesRef = useRef([]);
    const [windowSize, setWindowSize] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 1920,
        height: typeof window !== 'undefined' ? window.innerHeight : 1080
    });

    // Track window size
    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Get responsive circle config based on screen size
    const getCircleConfig = () => {
        const width = windowSize.width;

        if (width < 480) {
            // Mobile
            return {
                NUM: 3,
                R_MIN: 80,
                R_MAX: 120,
                SPEED_MIN: 0.4,
                SPEED_MAX: 1.0
            };
        } else if (width < 768) {
            // Tablet
            return {
                NUM: 4,
                R_MIN: 100,
                R_MAX: 140,
                SPEED_MIN: 0.5,
                SPEED_MAX: 1.2
            };
        } else if (width < 1024) {
            // Small Desktop
            return {
                NUM: 4,
                R_MIN: 120,
                R_MAX: 160,
                SPEED_MIN: 0.5,
                SPEED_MAX: 1.5
            };
        } else if (width < 1440) {
            // Medium Desktop
            return {
                NUM: 5,
                R_MIN: 140,
                R_MAX: 170,
                SPEED_MIN: 0.6,
                SPEED_MAX: 1.6
            };
        } else {
            // Large Desktop
            return {
                NUM: 5,
                R_MIN: 150,
                R_MAX: 180,
                SPEED_MIN: 0.6,
                SPEED_MAX: 1.8
            };
        }
    };

    useEffect(() => {
        if (!holesGroupRef.current) return;

        const holesGroup = holesGroupRef.current;
        const W = 1000, H = 1000;
        const config = getCircleConfig();
        const { NUM, R_MIN, R_MAX, SPEED_MIN, SPEED_MAX } = config;

        const rand = (a, b) => a + Math.random() * (b - a);

        // Clear existing shapes
        while (holesGroup.firstChild) {
            holesGroup.removeChild(holesGroup.firstChild);
        }
        shapesRef.current = [];

        // Create shapes with responsive config
        const shapes = Array.from({ length: NUM }, () => {
            const r = rand(R_MIN, R_MAX);
            const x = rand(r, W - r);
            const y = rand(r, H - r);
            const vx = rand(SPEED_MIN, SPEED_MAX) * (Math.random() < 0.5 ? -1 : 1);
            const vy = rand(SPEED_MIN, SPEED_MAX) * (Math.random() < 0.5 ? -1 : 1);

            const el = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            el.setAttribute("r", r);
            el.setAttribute("cx", x);
            el.setAttribute("cy", y);
            holesGroup.appendChild(el);

            return { el, r, x, y, vx, vy };
        });

        shapesRef.current = shapes;

        // Animation loop
        let animationId;
        function tick() {
            for (const s of shapesRef.current) {
                s.x += s.vx;
                s.y += s.vy;

                if (s.x < s.r || s.x > W - s.r) s.vx *= -1;
                if (s.y < s.r || s.y > H - s.r) s.vy *= -1;

                s.el.setAttribute("cx", s.x);
                s.el.setAttribute("cy", s.y);
            }
            animationId = requestAnimationFrame(tick);
        }

        tick();

        // Cleanup
        return () => {
            if (animationId) cancelAnimationFrame(animationId);
            while (holesGroup.firstChild) {
                holesGroup.removeChild(holesGroup.firstChild);
            }
        };
    }, [windowSize.width]); // Re-run when window width changes


    // Counter animation hook
    const useCounterAnimation = (end, duration = 2000, start = 0) => {
        const [count, setCount] = useState(start);
        const [isVisible, setIsVisible] = useState(false);
        const elementRef = useRef(null);

        useEffect(() => {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting && !isVisible) {
                        setIsVisible(true);
                    }
                },
                { threshold: 0.3 }
            );

            if (elementRef.current) {
                observer.observe(elementRef.current);
            }

            return () => {
                if (elementRef.current) {
                    observer.unobserve(elementRef.current);
                }
            };
        }, []);

        useEffect(() => {
            if (!isVisible) return;

            let startTime;
            const step = (timestamp) => {
                if (!startTime) startTime = timestamp;
                const progress = Math.min((timestamp - startTime) / duration, 1);

                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                setCount(Math.floor(easeOutQuart * (end - start) + start));

                if (progress < 1) {
                    requestAnimationFrame(step);
                }
            };

            requestAnimationFrame(step);
        }, [isVisible, end, duration, start]);

        return [count, elementRef];
    };

    // Counter values
    const [count1, ref1] = useCounterAnimation(5, 2000);
    const [count2, ref2] = useCounterAnimation(4, 2000);
    const [count3, ref3] = useCounterAnimation(10, 2500);


    return (
        <main className="home home--snap-scroll" id="home">
            <div className="home__hero-container">

                {/* HOME SECTION */}
                <section className="home__profile-section" aria-labelledby="hero-name">
                    <figure className="home__photo">
                        <div className="home__photo-wrap">
                            <img
                                className="home__photo-base"
                                src={profpic}
                                alt={t("home.profileAlt", { name: "Raihan Rafif" })}
                                loading="lazy"
                            />

                            <svg
                                className="home__photo-top"
                                viewBox="0 0 1000 1000"
                                preserveAspectRatio="xMidYMid slice"
                            >
                                <defs>
                                    <mask id="revealMask">
                                        <rect width="100%" height="100%" fill="white" />
                                        <g id="holes" fill="black" ref={holesGroupRef}></g>
                                    </mask>
                                </defs>

                                <image
                                    href={profpicCharacter}
                                    x="0"
                                    y="0"
                                    width="1000"
                                    height="1000"
                                    preserveAspectRatio="xMidYMid slice"
                                    mask="url(#revealMask)"
                                />
                            </svg>
                        </div>
                    </figure>

                    <div className="home__about">
                        <div className="home__name-profile">
                            <p>RAIHAN</p>
                            <p className="home__name-profile--sub">RAFIF</p>
                        </div>
                        <div className="home__text">
                            <p className="home__text-line">
                                <span className="home__text-gradient">{t("home.heroLine2a")}</span>
                            </p>
                            <p className="home__text-line home__text-line--second">
                                {t("home.heroLine2b")}
                            </p>
                            <span className="home__text-accent" aria-hidden="true"></span>
                        </div>

                        <div className="home__currently-status" role="status" aria-live="polite">
                            <span className="icon-status" aria-hidden="true"></span>
                            <span className="status">{t("home.status")}</span>
                        </div>
                    </div>

                </section>


                {/* ========================================
                STATS SECTION
            ======================================== */}
   

                {/* ========================================
    PROJECTS SECTION - CAROUSEL
======================================== */}
                <section id="projects" className="projects-section">
                    <div className="projects-section__container">
                        <div className="projects-section__header">
                            <div className="projects-section__header-left">
                                <span className="section-label">{t("home.projects.label")}</span>
                                <h2 className="section-title">{t("home.projects.title")}</h2>
                                <p className="section-description">
                                    {t("home.projects.description")}
                                </p>
                            </div>
                            <Link className="more-button" to="/portfolio">
                                <span className="text">{t("buttons.viewAllProjects")}</span>
                                <span className="icon" aria-hidden="true">→</span>
                            </Link>
                        </div>

                        <ProjectsCarousel projects={portfolioData.projects.slice(0, 6)} />
                    </div>
                </section>

                {/* ========================================
                CONTACT/CTA SECTION
            ======================================== */}
                <section id="contact" className="cta-section">
                    <h2 className="cta-section__title">
                        <span className="cta-section__title-word">{t("home.cta.title")}</span>
                    </h2>

                    <div className="cta-section__buttons">
                        <Link to="/contact" className="btn btn--primary">
                            {t("buttons.getInTouch")}
                        </Link>
                        <a
                            href="/(CV)Curriculum Vitae_Raihan Rafif.pdf"
                            download="Raihan-Rafif-CV.pdf"
                            className="btn btn--secondary"
                        >
                            {t("buttons.downloadResume")}
                        </a>
                    </div>

                    <div className="cta-section__socials">
                        <a href="https://github.com/RaihanRafif" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                            <i className="fab fa-github"></i>
                        </a>
                        <a href="https://linkedin.com/in/raihan-rafif" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <i className="fab fa-linkedin"></i>
                        </a>
                        <a href="mailto:raihanrafif1202@gmail.com" aria-label="Email">
                            <i className="fas fa-envelope"></i>
                        </a>
                    </div>
                </section>

            </div>
        </main>
    );
}