import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { CaseStudyModal } from './CaseStudyModal';
import { Project } from '../data/content';
import defaultData from '../../data/portfolio.json';

interface PortfolioProps {
  onConsult?: (serviceName?: string) => void;
  onNavigateToPortfolio?: () => void;
}

interface PortfolioItem {
  id: string;
  num: string;
  title: string;
  category: string;
  client: string;
  year: string;
  image: string;
  aspectRatio: string;
  rotation: string;
  summary: string;
  frameworks: string[];
  matchedProject?: Project;
}
export const Portfolio: React.FC<PortfolioProps> = ({ onConsult, onNavigateToPortfolio }) => {
  const [items, setItems] = useState<PortfolioItem[]>(() => (defaultData as any).portfolio || []);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function loadPortfolioData() {
      try {
        setLoading(true);
        const response = await fetch('/api/portfolio');
        if (!response.ok) {
          throw new Error(`Failed to fetch portfolio data: ${response.statusText}`);
        }
        const data = await response.json();
        if (isMounted) {
          const list = Array.isArray(data) ? data : (data.portfolio || []);
          setItems(list);
        }
      } catch (err: any) {
        console.error('[Portfolio] Error loading portfolio data:', err);
        if (isMounted) {
          setError(err.message || 'Error loading portfolio');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadPortfolioData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Render an individual card
  const renderCard = (item: PortfolioItem, keyPrefix: string) => {
    return (
      <article
        key={`${keyPrefix}-${item.id}`}
        onClick={() => {
          if (item.matchedProject) {
            setActiveProject(item.matchedProject);
          }
        }}
        className="group relative shrink-0 cursor-pointer rounded-[18px] sm:rounded-[20px] overflow-hidden bg-neutral-100 transition-all duration-500 ease-out focus-within:ring-2 focus-within:ring-[#188F42] focus-within:ring-offset-4"
        style={{
          width: 'clamp(290px, 32vw, 460px)',
          boxShadow:
            '0 10px 30px -10px rgba(0,0,0,0.08), 0 20px 40px -15px rgba(0,0,0,0.06)',
          transform: `rotate(${item.rotation})`,
        }}
      >
        {/* Outer Frame */}
        <div className="relative w-full overflow-hidden rounded-[18px] sm:rounded-[20px] border border-black/[0.08] bg-[#EAE8E3]">
          {/* Image Container with Original Aspect Ratio */}
          <div
            className="relative w-full overflow-hidden"
            style={{ aspectRatio: item.aspectRatio }}
          >
            <img
              src={item.image}
              alt={`${item.client} — ${item.title} (${item.year})`}
              loading="lazy"
              draggable={false}
              className="w-full h-full object-contain sm:object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] pointer-events-none select-none"
            />

            {/* Subtle Top-Right Kicker Pill */}
            <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-white/60 shadow-sm pointer-events-none">
              <span className="w-1.5 h-1.5 rounded-full bg-[#188F42]" />
              <span className="text-[10px] font-mono font-medium tracking-wider text-neutral-800">
                {item.year}
              </span>
            </div>
          </div>

          {/* FLOATING LIQUID-GLASS INFORMATION PANEL */}
          <div
            className="absolute inset-x-3 bottom-3 sm:inset-x-4 sm:bottom-4 z-20 rounded-[14px] sm:rounded-[16px] p-4 sm:p-5 transition-all duration-500 ease-out opacity-95 sm:opacity-0 translate-y-0 sm:translate-y-4 sm:group-hover:opacity-100 sm:group-hover:translate-y-0"
            style={{
              background: 'rgba(255, 255, 255, 0.22)',
              backdropFilter: 'blur(18px) saturate(135%)',
              WebkitBackdropFilter: 'blur(18px) saturate(135%)',
              border: '1px solid rgba(255, 255, 255, 0.45)',
              boxShadow:
                'inset 0 1px 1px 0 rgba(255, 255, 255, 0.6), 0 16px 32px -8px rgba(0, 0, 0, 0.14)',
            }}
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              {/* Number & Category */}
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-mono font-bold tracking-tight text-[#188F42]">
                  {item.num}
                </span>
                <span className="text-neutral-400 text-xs" aria-hidden="true">
                  /
                </span>
                <span className="text-[11px] sm:text-xs font-mono font-semibold uppercase tracking-wider text-neutral-800">
                  {item.category}
                </span>
              </div>

              {/* View Arrow */}
              <div
                className="shrink-0 w-7 h-7 rounded-full bg-white/70 group-hover:bg-white text-neutral-900 flex items-center justify-center transition-all duration-200 shadow-sm"
                aria-hidden="true"
              >
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Main Title & Client */}
            <h3 className="text-base sm:text-lg font-medium text-neutral-900 tracking-tight leading-snug">
              {item.title}
            </h3>
            <p className="text-xs text-neutral-600 font-light mt-0.5 line-clamp-1">
              {item.client}
            </p>

            {/* Framework Badges */}
            <div className="mt-3 pt-2.5 border-t border-white/30 flex flex-wrap gap-1.5 items-center">
              {(item.frameworks || []).slice(0, 2).map((fw, fIdx) => (
                <span
                  key={fIdx}
                  className="text-[9px] sm:text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/60 text-neutral-800 border border-white/40 font-medium"
                >
                  {fw}
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>
    );
  };

  return (
    <section
      id="portfolio"
      aria-label="Selected Work Portfolio"
      className="relative w-full bg-[#F7F7F5] text-[#111111] py-24 sm:py-32 lg:py-40 overflow-hidden border-t border-neutral-200/80 font-sans"
    >
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* SECTION HEADER: Large Editorial Heading */}
        <header className="mb-14 sm:mb-20">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-[2px] bg-[#188F42]" aria-hidden="true" />
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-[#188F42]">
              SELECTED WORK
            </span>
          </div>

          <h2
            className="font-light tracking-[-0.035em] text-[#111111] leading-[1.04]"
            style={{ fontSize: 'clamp(2.5rem, 5.5vw + 1rem, 5.25rem)' }}
          >
            Selected Work
          </h2>

          <p
            className="text-neutral-600 font-light mt-6 max-w-2xl leading-[1.65]"
            style={{ fontSize: 'clamp(1rem, 1.1vw + 0.5rem, 1.35rem)' }}
          >
            A glimpse of our work across sustainability reporting, ESG, performance, and meaningful communication.
          </p>
        </header>
      </div>

      {/* CONTINUOUS AUTOMATIC HORIZONTAL GALLERY (LEFT -> RIGHT) */}
      <div
        className="portfolio-marquee-container relative w-full overflow-hidden py-6"
        role="region"
        aria-label="Continuous portfolio marquee"
      >
        {loading && items.length === 0 ? (
          <div className="flex items-center gap-6 sm:gap-8 lg:gap-10 px-6 sm:px-10 lg:px-16 overflow-hidden">
            {[1, 2, 3].map((idx) => (
              <div
                key={idx}
                className="shrink-0 rounded-[18px] sm:rounded-[20px] bg-neutral-200/60 border border-black/[0.05] animate-pulse"
                style={{
                  width: 'clamp(290px, 32vw, 460px)',
                  aspectRatio: '768 / 576',
                }}
              />
            ))}
          </div>
        ) : items.length > 0 ? (
          /* Dual duplicated track running seamless CSS translate animation */
          <div className="portfolio-marquee-track flex items-center gap-6 sm:gap-8 lg:gap-10 w-max">
            {/* First sequence of portfolio cards */}
            <div className="portfolio-track-set flex items-center gap-6 sm:gap-8 lg:gap-10 shrink-0">
              {items.map((item) => renderCard(item, 'track-1'))}
            </div>

            {/* Identical cloned sequence for infinite seamless flow */}
            <div className="portfolio-track-set flex items-center gap-6 sm:gap-8 lg:gap-10 shrink-0" aria-hidden="true">
              {items.map((item) => renderCard(item, 'track-2'))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-neutral-500 font-mono text-xs">
            {error ? `Failed to load portfolio: ${error}` : 'No portfolio items found.'}
          </div>
        )}
      </div>

      {/* UNDERSTATED EDITORIAL CTA (No pagination, no arrows) */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 mt-12 sm:mt-16">
        <div className="flex justify-end pt-8 border-t border-neutral-300/80">
          <a
            href="/portfolio"
            onClick={(e) => {
              if (onNavigateToPortfolio) {
                e.preventDefault();
                onNavigateToPortfolio();
              }
            }}
            className="group inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-[#111111] hover:text-[#188F42] transition-colors py-2 border-b border-neutral-400/80 hover:border-[#188F42] cursor-pointer"
          >
            <span>View All Portfolio</span>
            <span className="inline-block transform group-hover:translate-x-1.5 transition-transform duration-200">
              →
            </span>
          </a>
        </div>
      </div>

      {/* Case Study Modal for Detail View */}
      {activeProject && (
        <CaseStudyModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
          onConsult={(serviceName) => {
            setActiveProject(null);
            if (onConsult) onConsult(serviceName);
          }}
        />
      )}
    </section>
  );
};
