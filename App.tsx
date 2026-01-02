import React, { useState, useEffect, useContext, createContext } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { ThemeContextType } from './types';
import HomePage from './pages/Home';
import TeamPage from './pages/Team';
import InsightsPage from './pages/Insights';
import ArticlePage from './pages/Article';
import ContactPage from './pages/Contact';
import { Moon, Sun, Menu, X, ArrowUpRight, Heart } from 'lucide-react';

const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  toggleTheme: () => { },
});

export const useTheme = () => useContext(ThemeContext);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const NavBar = () => {
  const { isDark, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/insights', label: 'Insights' },
    { path: '/team', label: 'Team' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 px-4 py-4 md:py-6">
      <div className="max-w-6xl mx-auto flex justify-between items-center bg-white/60 dark:bg-[#1A1C18]/60 backdrop-blur-xl rounded-full px-6 py-3 shadow-sm border border-white/40 dark:border-white/5 transition-all duration-300">

        {/* Logo */}
        <Link to="/" className="font-serif italic text-2xl font-bold tracking-wide text-[#2C3E2D] dark:text-[#E2E8D5] z-50">
          LAMAs
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#2C3E2D]/80 dark:text-[#E2E8D5]/80">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`hover:text-[#D4A373] transition-colors relative group ${location.pathname === link.path ? 'text-[#D4A373]' : ''}`}
            >
              {link.label}
              <span className={`absolute -bottom-1 left-0 w-full h-px bg-[#D4A373] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left ${location.pathname === link.path ? 'scale-x-100' : ''}`}></span>
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-[#2C3E2D] dark:text-[#E2E8D5]"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <a
            href="https://pulseboard.lamas-co.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 bg-[#2C3E2D] dark:bg-[#E2E8D5] text-white dark:text-[#1A1C18] rounded-full text-xs font-bold tracking-widest uppercase hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
          >
            PulseBoard <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex md:hidden items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-[#2C3E2D] dark:text-[#E2E8D5]"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="z-50 text-[#2C3E2D] dark:text-[#E2E8D5]">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-[#F3F4F1] dark:bg-[#1A1C18] z-40 flex flex-col items-center justify-center space-y-8 animate-fade-in">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className="text-3xl font-serif text-[#2C3E2D] dark:text-[#E2E8D5] hover:text-[#D4A373] transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://pulseboard.lamas-co.com"
            className="text-lg font-bold text-[#D4A373] flex items-center gap-2"
          >
            Visit PulseBoard <ArrowUpRight className="w-5 h-5" />
          </a>
        </div>
      )}
    </nav>
  );
};

const Footer = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js";
    script.dataset.name = "bmc-button";
    script.dataset.slug = "lama.s";
    script.dataset.color = "#d4a373";
    script.dataset.emoji = "☕";
    script.dataset.font = "Cookie";
    script.dataset.text = "Buy me a coffee";
    script.dataset.outlineColor = "#000000";
    script.dataset.fontColor = "#000000";
    script.dataset.coffeeColor = "#FFDD00";
    script.async = true;

    const container = document.getElementById('bmc-container');
    if (container && !container.querySelector('script')) {
      container.appendChild(script);
    }
  }, []);

  return (
    <footer className="relative z-10 py-12 border-t border-black/5 dark:border-white/5 mt-auto">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <span className="font-serif italic text-xl font-bold tracking-wide text-[#2C3E2D] dark:text-[#E2E8D5] block mb-2">LAMAs</span>
          <p className="text-xs text-[#2C3E2D]/60 dark:text-[#E2E8D5]/60">
            © {new Date().getFullYear()} Luis Almeida.
          </p>
        </div>
        <div className="flex gap-6 text-[#2C3E2D]/60 dark:text-[#E2E8D5]/60 items-center">
          <a href="https://github.com/lamalmeida" className="hover:text-[#D4A373] transition-colors"><span className="sr-only">GitHub</span>GitHub</a>
          <div id="bmc-container" className="h-10 flex items-center"></div>
        </div>
      </div>
    </footer>
  );
};

const App: React.FC = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <HashRouter>
        <ScrollToTop />
        <div className="min-h-screen bg-[#F3F4F1] dark:bg-[#1A1C18] text-[#2C3E2D] dark:text-[#E2E8D5] font-sans transition-colors duration-700 selection:bg-[#D4A373] selection:text-white flex flex-col">

          {/* Global Organic Background Shapes */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
            <div className="absolute -top-[10%] -right-[10%] w-[50vw] h-[50vw] bg-[#E5E7E1] dark:bg-[#232620] rounded-full blur-3xl opacity-60 animate-float"></div>
            <div className="absolute top-[40%] -left-[10%] w-[40vw] h-[40vw] bg-[#D8DCD3] dark:bg-[#2A2E26] rounded-full blur-3xl opacity-60 animate-float" style={{ animationDelay: '2s' }}></div>
          </div>

          <NavBar />

          <main className="flex-grow pt-32 px-6">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/team" element={<TeamPage />} />
              <Route path="/insights" element={<InsightsPage />} />
              <Route path="/insights/:slug" element={<ArticlePage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </HashRouter>
    </ThemeContext.Provider>
  );
};

export default App;