import React, { useState, useEffect } from 'react';
import { Bot, Menu, X, ArrowRight, Sun, Moon } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Default to light theme
    const savedTheme = localStorage.getItem('arham-theme') || 'light';
    setTheme(savedTheme);
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    localStorage.setItem('arham-theme', nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Frontier Tech', href: '#technologies' },
    { name: 'AI Solution Estimator', href: '#ai-estimator' },
    { name: 'Leadership & Experience', href: '#founder' },
    { name: 'Why Us', href: '#why-us' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-sm py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-600 p-[1px] shadow-md shadow-cyan-600/15 group-hover:shadow-cyan-600/30 transition-all duration-300">
              <div className="w-full h-full bg-white rounded-[11px] flex items-center justify-center">
                <Bot className="w-5 h-5 text-cyan-600 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-slate-900 font-['Space_Grotesk']">
                  ARHAM
                </span>
                <span className="text-xl font-bold text-cyan-600 font-['Space_Grotesk']">
                  TECH
                </span>
              </div>
              <p className="text-[10px] uppercase tracking-wider text-slate-500 -mt-1 font-semibold">
                Enterprise AI Solutions
              </p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-semibold text-slate-600 hover:text-cyan-600 transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action CTA & Theme Indicator */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
              className="p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 hover:text-slate-900 transition-all flex items-center gap-1.5 text-xs font-semibold"
            >
              {theme === 'light' ? (
                <>
                  <Sun className="w-4 h-4 text-amber-500" />
                  <span className="text-[11px]">Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-cyan-400" />
                  <span className="text-[11px]">Dark</span>
                </>
              )}
            </button>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-md shadow-cyan-600/20 hover:shadow-cyan-600/30 transition-all duration-300 group"
            >
              <span>Schedule Call</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

          {/* Mobile Buttons */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 shadow-sm"
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5 text-cyan-600" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-slate-900 shadow-sm"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-6 mt-3 space-y-4 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-slate-700 hover:text-cyan-600 py-2 transition-colors border-b border-slate-100"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="pt-2">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-cyan-600 to-blue-600 shadow-md shadow-cyan-600/20"
            >
              <span>Schedule Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
