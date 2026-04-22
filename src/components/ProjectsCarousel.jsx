// components/ProjectsCarousel.jsx
import React, { useState, useEffect, useRef } from "react";
import ProjectCard from "./ProjectCard";

export default function ProjectsCarousel({ projects }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [currentTranslate, setCurrentTranslate] = useState(0);
    const carouselRef = useRef(null);

    const nextSlide = () => {
        setActiveIndex((prev) => (prev + 1) % projects.length);
    };

    const prevSlide = () => {
        setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
    };

    const goToSlide = (index) => {
        setActiveIndex(index);
    };

    // Touch/Mouse handlers for drag
    const handleDragStart = (e) => {
        setIsDragging(true);
        setStartX(e.type.includes('mouse') ? e.pageX : e.touches[0].clientX);
    };

    const handleDragMove = (e) => {
        if (!isDragging) return;
        const currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
        const diff = currentX - startX;
        setCurrentTranslate(diff);
    };

    const handleDragEnd = () => {
        setIsDragging(false);
        if (Math.abs(currentTranslate) > 100) {
            if (currentTranslate > 0) {
                prevSlide();
            } else {
                nextSlide();
            }
        }
        setCurrentTranslate(0);
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'ArrowRight') nextSlide();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Get position class for each card
    const getCardPosition = (index) => {
        const diff = index - activeIndex;
        const normalizedDiff = ((diff + projects.length) % projects.length);

        if (normalizedDiff === 0) return 'center';
        if (normalizedDiff === 1 || normalizedDiff === projects.length - 1) {
            return normalizedDiff === 1 ? 'right' : 'left';
        }
        return 'hidden';
    };

    return (
        <div className="projects-carousel">
            <div 
                className="projects-carousel__track"
                ref={carouselRef}
                onMouseDown={handleDragStart}
                onMouseMove={handleDragMove}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
                onTouchStart={handleDragStart}
                onTouchMove={handleDragMove}
                onTouchEnd={handleDragEnd}
                style={{
                    cursor: isDragging ? 'grabbing' : 'grab'
                }}
            >
                {projects.map((project, index) => {
                    const position = getCardPosition(index);
                    return (
                        <div
                            key={project.id}
                            className={`projects-carousel__item projects-carousel__item--${position}`}
                            onClick={() => position !== 'center' && goToSlide(index)}
                            style={{
                                transform: isDragging && position === 'center' 
                                    ? `translateX(${currentTranslate}px)` 
                                    : ''
                            }}
                        >
                            <ProjectCard p={project} />
                        </div>
                    );
                })}
            </div>

            {/* Navigation Controls */}
            <div className="projects-carousel__controls">
                <button
                    className="carousel-btn carousel-btn--prev"
                    onClick={prevSlide}
                    aria-label="Previous project"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                </button>

                <div className="carousel-dots">
                    {projects.map((_, index) => (
                        <button
                            key={index}
                            className={`carousel-dot ${index === activeIndex ? 'active' : ''}`}
                            onClick={() => goToSlide(index)}
                            aria-label={`Go to project ${index + 1}`}
                        />
                    ))}
                </div>

                <button
                    className="carousel-btn carousel-btn--next"
                    onClick={nextSlide}
                    aria-label="Next project"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 18l6-6-6-6" />
                    </svg>
                </button>
            </div>

            {/* Project Counter */}
            <div className="projects-carousel__counter">
                <span className="current">{String(activeIndex + 1).padStart(2, '0')}</span>
                <span className="separator">/</span>
                <span className="total">{String(projects.length).padStart(2, '0')}</span>
            </div>
        </div>
    );
}