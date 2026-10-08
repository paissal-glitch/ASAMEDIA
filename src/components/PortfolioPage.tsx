import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Project } from '../data/content';
import { CaseStudyModal } from './CaseStudyModal';
import defaultData from '../../data/portfolio.json';

interface PortfolioPageProps {
  onBackToHome: () => void;
  onOpenConsultation: () => void;
}

export interface PortfolioPageItem {
  id: string;
  num?: string;
  title: string;
  category: string;
  client: string;
  year: string;
  image: string;
  aspectRatio?: string;
  rotation?: string;
  summary: string;
  frameworks?: string[];
  matchedProject?: Project;
  code?: string;
  slug?: string;
  deliverables?: string[];
  keyOutcomes?: string[];
  fullName?: string;
}

export const PortfolioPage: React.FC<PortfolioPageProps> = ({
  onBackToHome,
  onOpenConsultation,
}) => {
  // Use the exact same portfolio dataset as the homepage Portfolio section
  const [items, setItems] = useState<PortfolioPageItem[]>(
    () => (defaultData as any).portfolio || []
  );
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function loadPortfolioData() {
      try {
        const response = await fetch('/api/portfolio');
        if (response.ok) {
          const data = await response.json();
          if (isMounted && Array.isArray(data) && data.length > 0) {
            setItems(data);
          }
        }
      } catch (error) {
        console.warn('[PortfolioPage] Error loading /api/portfolio, using fallback data:', error);
      }
    }

    loadPortfolioData();
    return () => {
      isMounted = false;
    };
  }, []);

  const categories = [
    'All',
    'Annual Report',
    'Sustainability Report',
    'Communication',
    'ESG & PROPER',
  ];

  const filteredItems =
    selectedCategory === 'All'
      ? items
      : items.filter((item) => {
          const cat = (item.category || '').toLowerCase();
          const title = (item.title || '').toLowerCase();
          const target = selectedCategory.toLowerCase();

          if (selectedCategory === 'Annual Report') {
            return cat.includes('annual') || title.includes('annual') || cat.includes('corporate');
          }
          if (selectedCategory === 'Sustainability Report') {
            return cat.includes('sustainab') || title.includes('sustainab');
          }
          if (selectedCategory === 'Communication') {
            return cat.includes('communicat') || cat.includes('campaign') || cat.includes('design');
          }
          if (selectedCategory === 'ESG & PROPER') {
            return cat.includes('esg') || cat.includes('proper');
          }
          return cat.includes(target);
        });

  const handleOpenDetail = (item: PortfolioPageItem) => {
    // If matchedProject exists, use full case study details
    if (item.matchedProject) {
      setActiveProject(item.matchedProject);
      return;
    }

    // Fallback: construct case study Project object
    const proj: Project = {
      id: item.id,
      code: item.code || item.num || item.id.toUpperCase(),
      client: item.client,
      fullName: item.fullName || item.client,
      category: (item.category?.includes('Sustainability')
        ? 'Sustainability Report'
        : item.category?.includes('Annual')
        ? 'Annual Report'
        : item.category?.includes('ESG')
        ? 'ESG & PROPER'
        : 'Communication') as any,
      year: item.year,
      description: item.summary || '',
      highlight: `${item.title} aligned with ${(item.frameworks || []).join(', ')}.`,
      frameworks: item.frameworks || [],
      keyOutcomes: item.keyOutcomes || [
        'Full regulatory compliance and transparency',
        'Executive design system highlighting core benchmarks',
        'Transparent stakeholder accountability narratives',
      ],
      color: '#162b1e',
      aspect: 'landscape',
      deliverables: item.deliverables || ['Executive Report Suite', 'Digital Summary'],
    };
    setActiveProject(proj);
  };

  return (
    <div className="min-h-screen bg-[#F7F7F5] text-[#121212] flex flex-col font-sans selection:bg-[#188F42]/30 selection:text-neutral-900">
      {/* 1. SIMPLE EDITORIAL PORTFOLIO HEADER */}
      <header className="sticky top-0 z-30 w-full bg-[#F7F7F5]/90 backdrop-blur-md border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 h-20 sm:h-24 flex items-center justify-between">
          {/* Back to Home Button */}
          <button
            onClick={onBackToHome}
            className="group inline-flex items-center gap-2.5 text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] text-neutral-800 hover:text-[#188F42] transition-colors py-2 focus:outline-none focus:ring-2 focus:ring-[#188F42] rounded-md px-1 cursor-pointer"
            aria-label="Back to Home"
          >
            <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </button>

          {/* Minimal ASA Media Logo / Brand Link */}
          <button
            onClick={onBackToHome}
            className="focus:outline-none flex items-center gap-2 cursor-pointer"
            aria-label="ASA Media Home"
          >
            <div className="w-2 h-2 rounded-full bg-[#188F42]" />
            <span className="font-semibold tracking-[-0.03em] text-base sm:text-lg text-neutral-900 uppercase">
              ASA MEDIA
            </span>
            <span className="hidden sm:inline-block text-neutral-400 font-mono text-xs">
              / PORTFOLIO
            </span>
          </button>

          {/* Right Action: Inquire */}
          <button
            onClick={onOpenConsultation}
            className="text-xs font-semibold uppercase tracking-[0.16em] text-white bg-neutral-900 hover:bg-[#188F42] px-4 sm:px-5 py-2.5 rounded-full transition-colors shadow-sm cursor-pointer"
          >
            Initiate Project
          </button>
        </div>
      </header>

      {/* 2. PORTFOLIO INTRO */}
      <section className="w-full pt-16 sm:pt-24 pb-12 sm:pb-16 border-b border-neutral-200/80">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 sm:gap-12">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-[2px] bg-[#188F42]" aria-hidden="true" />
                <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-[#188F42]">
                  SELECTED WORK
                </span>
              </div>

              <h1
                className="font-light tracking-[-0.035em] text-[#111111] leading-[1.04]"
                style={{ fontSize: 'clamp(2.75rem, 6vw + 1rem, 5.5rem)' }}
              >
                Selected Work
              </h1>

              <p
                className="text-neutral-600 font-light mt-6 leading-[1.65] max-w-2xl"
                style={{ fontSize: 'clamp(1.05rem, 1.2vw + 0.5rem, 1.35rem)' }}
              >
                Explore our work across sustainability reporting, ESG, performance, and strategic communication.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-white border border-neutral-200/90 shadow-sm shrink-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-medium tracking-wide transition-all duration-200 whitespace-nowrap cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-neutral-900 text-white shadow-sm'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. UNIFORM EDITORIAL GRID — ALL CARDS IDENTICAL EQUAL SIZE */}
      <main className="w-full py-16 sm:py-24 flex-1">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 items-stretch">
            {filteredItems.length === 0 ? (
              [1, 2, 3, 4, 5, 6].map((idx) => (
                <div
                  key={idx}
                  className="rounded-[20px] bg-neutral-200/60 aspect-[4/3] animate-pulse border border-neutral-200/40"
                />
              ))
            ) : (
              filteredItems.map((item, index) => {
                const codeBadge = item.matchedProject?.code || item.num || String(index + 1).padStart(2, '0');
                return (
                  <article
                    key={item.id}
                    onClick={() => handleOpenDetail(item)}
                    className="group relative cursor-pointer rounded-[20px] overflow-hidden bg-white border border-neutral-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-all duration-500 ease-out flex flex-col justify-between h-full"
                  >
                    {/* Top Container: Unified Equal Image Container (aspect-[4/3]) */}
                    <div>
                      <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#ECEAE5] border-b border-neutral-100">
                        <img
                          src={item.image}
                          alt={`${item.client} — ${item.title}`}
                          loading={index < 3 ? 'eager' : 'lazy'}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                          onError={(e) => {
                            // Fallback container background if image error
                            (e.target as HTMLElement).style.opacity = '0.5';
                          }}
                        />

                        {/* Top Right Year Pill */}
                        <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-white/60 shadow-sm pointer-events-none">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#188F42]" />
                          <span className="text-[10px] font-mono font-medium tracking-wider text-neutral-800">
                            {item.year}
                          </span>
                        </div>

                        {/* Top Left Number Pill */}
                        <div className="absolute top-4 left-4 z-10 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-white/60 shadow-sm pointer-events-none">
                          <span className="text-[10px] font-mono font-bold tracking-tight text-[#188F42]">
                            #{codeBadge}
                          </span>
                        </div>

                        {/* Floating Liquid-Glass Preview on Hover */}
                        <div
                          className="hidden sm:block absolute inset-x-3 bottom-3 z-20 rounded-[14px] p-4 transition-all duration-400 ease-out opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0"
                          style={{
                            background: 'rgba(255, 255, 255, 0.35)',
                            backdropFilter: 'blur(20px) saturate(140%)',
                            WebkitBackdropFilter: 'blur(20px) saturate(140%)',
                            border: '1px solid rgba(255, 255, 255, 0.65)',
                            boxShadow:
                              'inset 0 1px 1px 0 rgba(255, 255, 255, 0.6), 0 14px 28px -6px rgba(0, 0, 0, 0.16)',
                          }}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-900 font-bold">
                              View Case Study
                            </span>
                            <div className="w-6 h-6 rounded-full bg-white text-neutral-900 flex items-center justify-center shadow-sm">
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </div>
                          </div>
                          <p className="text-[11px] text-neutral-800 line-clamp-2 leading-relaxed font-light">
                            {item.summary}
                          </p>
                        </div>
                      </div>

                      {/* Card Metadata (Standardized Height and Line Clamps) */}
                      <div className="p-6">
                        <div className="flex items-center justify-between gap-3 mb-2">
                          <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-[#188F42] font-semibold truncate">
                            {item.category}
                          </span>
                        </div>

                        <h2 className="text-lg font-semibold tracking-tight text-neutral-900 mb-1 group-hover:text-[#188F42] transition-colors duration-200 line-clamp-1">
                          {item.title}
                        </h2>

                        <p className="text-xs text-neutral-500 font-medium line-clamp-1">
                          {item.client}
                        </p>

                        <p className="text-xs text-neutral-600 font-light leading-relaxed mt-3 line-clamp-2 min-h-[2.5rem]">
                          {item.summary}
                        </p>
                      </div>
                    </div>

                    {/* Bottom Action & Framework Badges (Uniform across every card) */}
                    <div className="px-6 pb-6 pt-3 border-t border-neutral-100 flex items-center justify-between mt-auto">
                      <div className="flex flex-wrap gap-1.5 items-center">
                        {(item.frameworks || []).slice(0, 2).map((fw, fIdx) => (
                          <span
                            key={fIdx}
                            className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-700 border border-neutral-200 font-medium"
                          >
                            {fw}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-neutral-900 group-hover:text-[#188F42] transition-colors shrink-0">
                        <span>Details</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>
                  </article>
                );
              })
            )}
          </div>
        </div>
      </main>

      {/* 4. UNDERSTATED FOOTER FOR PORTFOLIO ARCHIVE */}
      <footer className="w-full bg-[#111111] text-white py-16 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-8">
          <div>
            <span className="font-semibold tracking-[-0.03em] text-base text-white uppercase">
              ASA MEDIA
            </span>
            <p className="text-xs text-neutral-400 font-mono mt-1">
              Sustainability & Corporate Reporting Consultancy
            </p>
          </div>

          <p className="text-xs text-neutral-500 font-mono">
            © 2026 ASA Media. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Case Study Modal */}
      {activeProject && (
        <CaseStudyModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
          onConsult={() => {
            setActiveProject(null);
            onOpenConsultation();
          }}
        />
      )}
    </div>
  );
};
