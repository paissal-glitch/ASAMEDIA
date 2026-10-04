import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import logoImg from '../assets/logo-white-text.png';

interface NavbarProps {
  onOpenConsultation: () => void;
  activeSection?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenConsultation, activeSection = '' }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'About', id: 'about' },
    { label: 'Services', id: 'services' },
    { label: 'Portfolio', id: 'portfolio' },
    { label: 'Teams', id: 'teams' },
    { label: 'Contact', id: 'contact' },
  ];

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-20 px-6 md:px-12 lg:px-16 pt-6 pointer-events-none">
        <nav
          className="pointer-events-auto w-full liquid-glass rounded-xl px-4 py-2 flex items-center justify-between transition-all duration-300"
          aria-label="Main Navigation"
        >
          {/* Left: Brand Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center focus:outline-none group py-0.5"
            aria-label="ASA Media Home"
          >
            <img
              src={logoImg}
              alt="ASA Media - Begin with Hope, Lead with Sustainability"
              className="h-9 sm:h-10 md:h-11 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
            />
          </button>

          {/* Desktop Navigation (md+) */}
          <div className="hidden md:flex items-center gap-8 text-sm font-normal">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`transition-colors duration-200 ${
                    isActive ? 'text-[#188F42] font-medium' : 'text-white hover:text-gray-300'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Nav CTA & Mobile Hamburger */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenConsultation}
              className="bg-white text-black px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors duration-200 active:scale-[0.98]"
            >
              Book a Consultation
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-white hover:text-gray-300 focus:outline-none"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-10 bg-[#050505]/95 backdrop-blur-md md:hidden pt-28 px-6 pb-12 flex flex-col justify-between transition-opacity duration-300">
          <div className="flex flex-col gap-6 text-left">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#188F42]">
              Menu
            </span>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-2xl font-light text-white hover:text-[#188F42] text-left py-2 border-b border-white/10 transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full bg-white text-black py-3 rounded-lg text-sm font-medium text-center hover:bg-gray-100 transition-colors"
            >
              Book a Consultation
            </button>
            <p className="text-xs text-neutral-400 text-center font-mono">
              PT Azarya Sanjaya Arunika
            </p>
          </div>
        </div>
      )}
    </>
  );
};
