import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/utils/cn";

const NAV_LINKS = [
  { nameKey: "home", path: "/" },
  { nameKey: "about", path: "/about" },
  { nameKey: "projects", path: "/projects" },
  { nameKey: "experience", path: "/experience" },
  { nameKey: "blog", path: "/blog" },
  { nameKey: "contact", path: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
    setLanguageMenuOpen(false);
  };

  const LANGUAGES = [
    { code: 'en', label: 'English' },
    { code: 'vi', label: 'Tiếng Việt' },
    { code: 'ko', label: '한국어' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when path changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled ? "py-3" : "py-5"
        )}
      >
        <div className="container mx-auto px-4 max-w-5xl">
          <nav
            className={cn(
              "flex items-center justify-between px-6 py-3 rounded-full transition-all duration-300",
              scrolled
                ? "bg-white/5 backdrop-blur-md border border-white/10 shadow-glass"
                : "bg-transparent border border-transparent"
            )}
          >
            {/* Logo */}
            <Link to="/" className="text-xl font-bold tracking-tighter text-white z-50 relative">
              Đức Duy<span className="text-primary">.</span>
            </Link>

            {/* Desktop Links */}
            <ul className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className={cn(
                        "relative px-4 py-2 text-sm font-medium transition-colors rounded-full",
                        isActive ? "text-white" : "text-secondary hover:text-white"
                      )}
                    >
                      {t(`nav.${link.nameKey}`)}
                      {isActive && (
                        <motion.div
                          layoutId="nav-indicator"
                          className="absolute inset-0 bg-black/5 dark:bg-white/10 rounded-full -z-10"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* CTA & Mobile Toggle */}
            <div className="flex items-center gap-4 z-50 relative">
              <button
                onClick={toggleTheme}
                className="p-2 text-secondary hover:text-foreground transition-colors rounded-full hover:bg-black/5 dark:hover:bg-white/10"
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              
              <div className="relative">
                <button
                  onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                  className="flex items-center gap-1 p-2 text-secondary hover:text-foreground transition-colors rounded-full hover:bg-black/5 dark:hover:bg-white/10 font-bold text-sm uppercase"
                  aria-label="Toggle Language"
                >
                  <Globe size={18} />
                  {i18n.language}
                </button>
                {languageMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 w-36 bg-white dark:bg-gray-800 border border-black/10 dark:border-white/10 rounded-xl shadow-glass overflow-hidden flex flex-col py-2 z-50">
                    {LANGUAGES.map(lang => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={cn(
                          "px-4 py-2 text-left text-sm hover:bg-black/5 dark:hover:bg-white/10 transition-colors",
                          i18n.language === lang.code ? "text-primary font-bold" : "text-gray-700 dark:text-gray-300"
                        )}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <a
                href="/resume.pdf"
                target="_blank"
                className="hidden md:inline-flex px-5 py-2 text-sm font-medium text-white dark:text-white bg-primary hover:bg-primary/90 border border-primary/20 rounded-full transition-all"
              >
                {t('nav.resume')}
              </a>
              <button
                className="md:hidden p-2 text-secondary hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center pt-20"
          >
            <nav className="flex flex-col items-center gap-6 text-center">
              {NAV_LINKS.map((link, i) => {
                const isActive = location.pathname === link.path;
                return (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                  >
                    <Link
                      to={link.path}
                      className={cn(
                        "text-3xl font-semibold tracking-tight transition-colors",
                        isActive ? "text-primary" : "text-secondary hover:text-white"
                      )}
                    >
                      {t(`nav.${link.nameKey}`)}
                    </Link>
                  </motion.div>
                );
              })}
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + NAV_LINKS.length * 0.1 }}
                href="/resume.pdf"
                target="_blank"
                className="mt-6 px-8 py-3 text-lg font-medium text-black bg-white rounded-full transition-transform active:scale-95"
              >
                {t('nav.resume')}
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
