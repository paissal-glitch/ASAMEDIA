import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BrandStatement } from './components/BrandStatement';
import { Approach } from './components/Approach';
import { Services } from './components/Services';
import { ServicesVisualBreak } from './components/ServicesVisualBreak';
import { Portfolio } from './components/Portfolio';
import { PortfolioPage } from './components/PortfolioPage';
import { WhyAsaMedia } from './components/WhyAsaMedia';
import { Team } from './components/Team';
import { FinalCTA } from './components/FinalCTA';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ConsultationModal } from './components/ConsultationModal';
import { AdminPortfolio } from './components/AdminPortfolio';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string | undefined>(undefined);
  const [activeSection, setActiveSection] = useState<string>('');

  // Synchronize browser history and current path
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenConsultation = (serviceName?: string) => {
    setPreselectedService(serviceName);
    setIsConsultationOpen(true);
  };

  const handleExploreServices = () => {
    const servicesElement = document.getElementById('services');
    if (servicesElement) {
      servicesElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (currentPath === '/portfolio') return;

    const sectionIds = ['about', 'services', 'portfolio', 'teams', 'contact'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPath]);

  // If path is /admin, render dedicated CMS Admin to manage portfolio.json
  if (currentPath === '/admin' || currentPath === '/admin/' || currentPath.startsWith('/admin')) {
    return (
      <AdminPortfolio
        onBackToHome={() => navigateTo('/')}
        onNavigateToPortfolio={() => navigateTo('/portfolio')}
      />
    );
  }

  // If path is /portfolio, render dedicated Portfolio Archive experience
  if (currentPath === '/portfolio') {
    return (
      <>
        <PortfolioPage
          onBackToHome={() => navigateTo('/')}
          onOpenConsultation={() => handleOpenConsultation()}
        />
        <ConsultationModal
          isOpen={isConsultationOpen}
          onClose={() => setIsConsultationOpen(false)}
          preselectedService={preselectedService}
        />
      </>
    );
  }

  // Otherwise render Homepage
  return (
    <div className="min-h-screen bg-[#050505] text-[#F7F7F5] flex flex-col font-sans selection:bg-[#188F42]/30 selection:text-white">
      {/* Liquid Glass Navigation Bar (z-index: 20) */}
      <Navbar
        onOpenConsultation={() => handleOpenConsultation()}
        activeSection={activeSection}
      />

      {/* Full-Screen Cinematic Hero */}
      <Hero
        onOpenConsultation={() => handleOpenConsultation()}
        onExploreServices={handleExploreServices}
      />

      {/* Main Content Sections */}
      <main className="w-full flex flex-col">
        {/* Introduction */}
        <BrandStatement />

        {/* Approach */}
        <Approach />

        {/* Services */}
        <Services onSelectService={handleOpenConsultation} />

        {/* Cinematic Visual with Parallax */}
        <ServicesVisualBreak />

        {/* Selected Work (Continuous Marquee with link to /portfolio) */}
        <Portfolio
          onConsult={handleOpenConsultation}
          onNavigateToPortfolio={() => navigateTo('/portfolio')}
        />

        {/* Why ASA Media */}
        <WhyAsaMedia />

        {/* Team (People Behind the Work) */}
        <Team />

        {/* Book Consultation (Final CTA) */}
        <FinalCTA
          onOpenConsultation={() => handleOpenConsultation()}
          onExploreServices={handleExploreServices}
        />

        {/* Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenConsultation={() => handleOpenConsultation()}
        onNavigateToAdmin={() => navigateTo('/admin')}
      />

      {/* Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        preselectedService={preselectedService}
      />
    </div>
  );
}
