import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import ScrollToHash from "./components/ScrollToHash";
import Home from "./pages/Home.jsx";
import ProjectDetail from "./pages/ProjectDetail.jsx";
import Contact from "./pages/Contact.jsx";
import About from "./pages/About.jsx";
import Portfolio from "./pages/Portofolio.jsx";
import ChatFab from "./components/ChatFab.jsx";

export default function App() {
  const location = useLocation();
  return (
    <>
      <ScrollToHash />
      <ScrollToTop />
      <div className="container">
        <Header logoText="RAIHAN" logoHref="/" />
        <div className="page-transition" key={location.pathname}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/portfolio" element={<Portfolio />} />
          </Routes>
        </div>
      </div>

      <ChatFab />

      <footer id="contact" className="bottom-container" role="contentinfo">
        <div className="main-bottom-section">
          <div className="currently-status" aria-live="polite">
            <span className="icon-status" aria-hidden="true"></span>
            <span className="status">Available For Work</span>
            <span className="status-smiley" aria-hidden="true">
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                <circle cx="10" cy="10" r="9" opacity={0.7} />
                <ellipse className="smiley-eye-l" cx="7" cy="8" rx="1.5" ry="2" fill="currentColor" stroke="none" />
                <ellipse className="smiley-eye-r" cx="13" cy="8" rx="1.5" ry="2" fill="currentColor" stroke="none" />
                <path d="M5 13 Q10 17 15 13" />
              </svg>
            </span>
          </div>

          <div className="email">
            <a href="mailto:raihanrafif1202@gmail.com">RAIHANRAFIF1202@GMAIL.COM</a>
          </div>
        </div>

        <div className="bottom-nav">
          <div className="icon bottom-icon">
            <a href="/" aria-label="Raihan home">RAIHAN</a>
          </div>

          <nav className="navs" aria-label="Footer">
            <a className="template-div-1 nav" href="/">Home</a>
            <a className="template-div-1 nav" href="/about">About</a>
            <a className="template-div-1 nav" href="/portfolio">Portfolio</a>
            <a className="template-div-1 nav" href="/contact">Contact</a>
          </nav>

          <div className="sosmed-icons">
            <a className="icon" href="https://github.com/RaihanRafif" target="_blank" rel="noopener" aria-label="GitHub">
              <i className="fa-brands fa-github" aria-hidden="true"></i>
            </a>
            <a className="icon" href="https://www.linkedin.com/in/raihan-rafif-756809202/" target="_blank" rel="noopener" aria-label="LinkedIn">
              <i className="fa-brands fa-linkedin" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
