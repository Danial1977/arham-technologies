import React, { useState, useEffect } from 'react';
import { Bot, Menu, X, ArrowRight, Lock, Sparkles } from 'lucide-react';
import AdminLoginModal from './AdminLoginModal';

export default function Navbar({ onOpenDatabase }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAdminClick = () => {
    const isAuthed = localStorage.getItem('arham_admin_authenticated') === 'true';
    if (isAuthed && onOpenDatabase) {
      onOpenDatabase();
    } else {
      setShowLoginModal(true);
    }
  };

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    if (onOpenDatabase) {
      onOpenDatabase();
    }
  };

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Frontier Tech', href: '#technologies' },
    { name: 'AI Solution Estimator', href: '#ai-estimator' },
    { name: 'Leadership & Pedigree', href: '#founder' },
    { name: 'Why Us', href: '#why-us' },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled 
            ? 'bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DFD5] shadow-xs py-3.5' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Left Group: Logo with generous margin before nav */}
            <div className="flex items-center">
              {/* Logo */}
              <a href="#" title="Arham Technologies - Autonomous AI Solutions & Enterprise Automation" aria-label="Arham Technologies - Autonomous AI Solutions & Enterprise Automation" className="flex items-center gap-3 group shrink-0">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#8C5E2D] via-[#B89F70] to-[#523C1B] p-[1.5px] shadow-md shadow-[#8C5E2D]/20 group-hover:shadow-[#8C5E2D]/35 transition-all duration-300">
                  <div className="w-full h-full bg-[#FAF7F2] rounded-[10px] flex items-center justify-center">
                    <Bot className="w-5 h-5 text-[#8C5E2D] group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xl font-bold tracking-wider text-[#26160C] font-['Cinzel']">
                      ARHAM
                    </span>
                    <span className="text-xl font-bold text-[#8C5E2D] font-['Cinzel']">
                      TECH
                    </span>
                  </div>
                  <p className="text-[10px] uppercase tracking-wider text-[#664E40] -mt-1 font-semibold">
                    Enterprise AI Solutions
                  </p>
                </div>
              </a>

              {/* Generous margin between Logo and Services Menu */}
              <nav className="hidden lg:flex items-center gap-8 ml-14 xl:ml-20">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-sm font-semibold text-[#664E40] hover:text-[#8C5E2D] transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
            </div>

            {/* Action Buttons: Admin Login & CTA */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Secure Admin Login Button */}
              <button
                onClick={handleAdminClick}
                title="Admin Login (arhamtechnologiesltd@gmail.com / admin)"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-[#26160C] bg-[#F5EFE6] border border-[#E8DFD5] hover:bg-[#E8DEC8] hover:border-[#8C5E2D]/40 transition-all shadow-2xs group"
              >
                <Lock className="w-3.5 h-3.5 text-[#8C5E2D] group-hover:scale-110 transition-transform" />
                <span>Admin Login</span>
                <span className="inline-block w-2 h-2 rounded-full bg-[#8C5E2D] animate-pulse"></span>
              </button>

              {/* Heritage Walnut Swatch Pill */}
              <div
                title="Heritage Walnut Theme (Default)"
                className="px-3 py-1.5 rounded-full bg-[#F5EFE6] border border-[#E8DFD5] text-[#26160C] flex items-center gap-1.5 text-xs font-semibold shadow-2xs"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#8C5E2D] ring-1 ring-[#523C1B]" />
                <span className="text-[11px] text-[#664E40] font-medium">Heritage Walnut</span>
              </div>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#8C5E2D] via-[#A87944] to-[#734A1F] hover:from-[#734A1F] hover:to-[#523C1B] shadow-md shadow-[#8C5E2D]/20 hover:shadow-[#8C5E2D]/35 transition-all duration-300 group"
              >
                <span>Schedule Call</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>

            {/* Mobile Buttons */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={handleAdminClick}
                title="Admin Login"
                className="p-2 rounded-lg bg-[#F5EFE6] border border-[#E8DFD5] text-[#8C5E2D] shadow-xs flex items-center gap-1 text-xs font-bold"
              >
                <Lock className="w-4 h-4" />
                <span className="text-[11px]">Admin</span>
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg bg-white border border-[#E8DFD5] text-[#26160C] hover:text-[#8C5E2D] shadow-xs"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FAF7F2] border-b border-[#E8DFD5] px-6 py-6 mt-3 space-y-4 shadow-xl animate-in slide-in-from-top duration-200">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-semibold text-[#332015] hover:text-[#8C5E2D] py-2 transition-colors border-b border-[#E8DFD5]/60"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <div className="pt-2 space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleAdminClick();
                }}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold text-[#26160C] bg-[#F5EFE6] border border-[#E8DFD5] hover:bg-[#E8DEC8] transition-colors shadow-xs"
              >
                <Lock className="w-4 h-4 text-[#8C5E2D]" />
                <span>Admin Login (Secure Console)</span>
                <span className="w-2 h-2 rounded-full bg-[#8C5E2D] animate-pulse"></span>
              </button>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#8C5E2D] via-[#A87944] to-[#734A1F] shadow-md shadow-[#8C5E2D]/20"
              >
                <span>Schedule Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Admin Authentication Modal */}
      <AdminLoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSuccess={handleLoginSuccess}
      />
    </>
  );
}
