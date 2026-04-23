import React from "react";
import { Routes, Route, Link } from "react-router-dom";
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
  return (
    <>
      <ScrollToHash />
      <ScrollToTop />
      <div className="container">
        <Header logoText="RAIHAN" logoHref="/" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/portfolio" element={<Portfolio />} />
        </Routes>
      </div>

      <ChatFab />

      {/* <footer id="contact" className="bottom-container" role="contentinfo">
        <div className="main-bottom-section">
          <div className="currently-status" aria-live="polite">
            <span className="icon-status" aria-hidden="true"></span>
            <span className="status">Available For Work</span>
          </div>

          <div className="email">
            <a href="mailto:raihanrafif1202@gmail.com">RAIHANRAFIF1202@GMAIL.COM</a>
          </div>
        </div>

        <div className="bottom-nav">
          <div className="icon bottom-icon">
            <Link to="/" aria-label="Raihan home">RAIHAN</Link>
            </div>

          <nav className="navs" aria-label="Footer">
            <Link className="template-div-1 nav" to="/">Home</Link>
            <Link className="template-div-1 nav" to="/about">About</Link>
            <Link className="template-div-1 nav" to="/portfolio">Portfolio</Link>
            <Link className="template-div-1 nav" to="/contact">Contact</Link>
          </nav>

          <div className="sosmed-icons">
            <Link className="icon" href="https://github.com/" target="_blank" rel="noopener" aria-label="GitHub">
              <i className="fa-brands fa-github" aria-hidden="true"></i>
            </Link>
            <Link className="icon" href="https://www.linkedin.com/" target="_blank" rel="noopener" aria-label="LinkedIn">
              <i className="fa-brands fa-linkedin" aria-hidden="true"></i>
            </Link>
          </div>
        </div>
      </footer> */}
    </>
  );
}
