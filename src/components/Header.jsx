import React, { memo, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useI18n } from "../i18n/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

const defaultLinks = [
  { key: "nav.home", href: "/" },
  { key: "nav.about", href: "/about" },
  { key: "nav.portfolio", href: "/portfolio" },
  { key: "nav.contact", href: "/contact" },
];

function Header({ logoText = "RAIHAN", links = defaultLinks }) {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useI18n();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href) => {
    if (href?.startsWith("#")) {
      return location.hash === href && location.pathname === "/";
    }
    if (href === "/") {
      return location.pathname === "/" && !location.hash;
    }
    return location.pathname === href;
  };

  const handleNavClick = (e, href) => {
    if (href?.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        const headerHeight = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }
  };

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
      <div className="header__inner">
        <div className="logo">
          <Link to="/" aria-label={t("aria.goHome", { name: logoText })}>
            {logoText}
          </Link>
        </div>

        <div className="header__right">
          <nav className="sub-nav" aria-label="Primary">
            {links.map((l) => {
            const to = l.href?.startsWith("#")
              ? { pathname: "/", hash: l.href }
              : l.href || "/";

            const active = isActive(l.href);
            const label = l.label ?? (l.key ? t(l.key) : "");

            return (
              <Link
                key={l.href || label}
                className={`nav ${active ? "nav--active" : ""}`}
                to={to}
                onClick={(e) => handleNavClick(e, l.href)}
                aria-current={active ? "page" : undefined}
              >
                {label}
              </Link>
            );
            })}
          </nav>

          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}

export default memo(Header);