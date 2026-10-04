import React, { useState } from 'react';
import { ArrowLeft, ArrowUpRight, Filter, BookOpen, Layers, CheckCircle2, X } from 'lucide-react';
import logoImg from '../assets/logo-white-text.png';
import { Project } from '../data/content';
import { CaseStudyModal } from './CaseStudyModal';

interface PortfolioPageProps {
  onBackToHome: () => void;
  onOpenConsultation: () => void;
}

interface PortfolioArchiveItem {
  id: string;
  slug: string;
  title: string;
  client: string;
  fullName: string;
  category: 'Sustainability Report' | 'Annual Report' | 'ESG & PROPER' | 'Communication';
  year: string;
  image: string;
  aspectRatio: string;
  cardSpan: 'standard' | 'tall' | 'wide';
  summary: string;
  frameworks: string[];
  deliverables: string[];
  keyOutcomes: string[];
  code: string;
}

const ARCHIVE_PROJECTS: PortfolioArchiveItem[] = [
  {
    id: 'kideco-23-sr',
    slug: 'kideco-sustainability-report-2023',
    title: 'Sustainability Report',
    client: 'Kideco Jaya Agung',
    fullName: 'PT Kideco Jaya Agung',
    category: 'Sustainability Report',
    year: '2023',
    image: '/Kideco-23-SR-a-768x576.png',
    aspectRatio: '768 / 576',
    cardSpan: 'wide',
    summary: 'Landmark sustainability reporting charting post-mining ecosystem rehabilitation, energy transition, and PROPER Emas alignment.',
    frameworks: ['GRI Standards 2021', 'POJK 51', 'PROPER Emas', 'TCFD'],
    deliverables: ['Full Sustainability Report (320 pages)', 'Executive Summary', 'Digital Interactive PDF'],
    keyOutcomes: ['Beyond compliance environmental ratings', 'Biodiversity regeneration indices', 'Regional stakeholder validation'],
    code: 'KDC-SR23',
  },
  {
    id: 'kideco-24-ar',
    slug: 'kideco-annual-report-2024',
    title: 'Annual Report',
    client: 'Kideco Jaya Agung',
    fullName: 'PT Kideco Jaya Agung',
    category: 'Annual Report',
    year: '2024',
    image: '/Kideco-24-AR-a-768x512.png',
    aspectRatio: '768 / 512',
    cardSpan: 'standard',
    summary: 'Forward-looking corporate annual report spotlighting green business acceleration, operational innovation, and stakeholder transparency.',
    frameworks: ['GRI Sector Standards', 'POJK 51', 'ISSB Aligned'],
    deliverables: ['Annual Financial & Governance Report', 'Interactive Annex', 'Investor Deck'],
    keyOutcomes: ['Net Zero 2060 roadmap alignment', 'Executive financial hierarchy', 'Audited governance metrics'],
    code: 'KDC-AR24',
  },
  {
    id: 'asbi-23',
    slug: 'asuransi-bintang-annual-report-2023',
    title: 'Annual Report',
    client: 'Asuransi Bintang',
    fullName: 'PT Asuransi Bintang Tbk',
    category: 'Annual Report',
    year: '2023',
    image: '/ASBI-23-a-768x576.png',
    aspectRatio: '768 / 576',
    cardSpan: 'standard',
    summary: 'Comprehensive annual financial and corporate governance disclosure balancing strict regulatory requirements with editorial precision.',
    frameworks: ['OJK POJK 51', 'GRI Standards', 'IDX Governance'],
    deliverables: ['Annual Financial & Governance Report', 'Interactive Digital PDF', 'Executive Highlights'],
    keyOutcomes: ['100% timely regulatory compliance', 'Transparent underwriting ratios', 'Typographic editorial clarity'],
    code: 'ASBI-23',
  },
  {
    id: 'kideco-24-sr',
    slug: 'kideco-sustainability-campaign-2024',
    title: 'Sustainability Campaign & Report',
    client: 'Kideco Jaya Agung',
    fullName: 'PT Kideco Jaya Agung',
    category: 'Sustainability Report',
    year: '2024',
    image: '/Kideco-24-SR-a-768x614.png',
    aspectRatio: '768 / 614',
    cardSpan: 'tall',
    summary: 'Multi-stakeholder sustainability publication highlighting circular economy models, clean energy adoption, and biodiversity preservation.',
    frameworks: ['GRI Standards 2021', 'UN SDGs', 'POJK 51'],
    deliverables: ['Full Sustainability Report', 'Digital Presentation Suite', 'Stakeholder Collaterals'],
    keyOutcomes: ['Data-dense infographics', 'Social return on investment proof', 'Verified stakeholder outreach'],
    code: 'KDC-SR24',
  },
  {
    id: 'star-24',
    slug: 'star-energy-esg-communication-2024',
    title: 'ESG Communication',
    client: 'STAR Energy Geothermal',
    fullName: 'Star Energy Geothermal Group',
    category: 'Communication',
    year: '2024',
    image: '/STAR-24-a-768x576.png',
    aspectRatio: '768 / 576',
    cardSpan: 'standard',
    summary: 'Clean energy communication and stakeholder publication framing geothermal excellence, clean power generation, and community co-existence.',
    frameworks: ['GRI Energy Sector', 'Renewable ESG Disclosure', 'Community Dialogue'],
    deliverables: ['Clean Energy Communication Report', 'Executive Briefing Suite', 'Stakeholder Infographics'],
    keyOutcomes: ['Geothermal milestone visualization', 'Carbon avoidance metrics', 'Public-private dialog tool'],
    code: 'STAR-24',
  },
  {
    id: 'wtjj-24',
    slug: 'wika-tirta-jaya-company-profile-2024',
    title: 'Company Profile & Annual Review',
    client: 'Wika Tirta Jaya Jatiluhur',
    fullName: 'PT Wika Tirta Jaya Jatiluhur',
    category: 'Annual Report',
    year: '2024',
    image: '/WTJJ-24-1-768x699.jpg',
    aspectRatio: '768 / 699',
    cardSpan: 'standard',
    summary: 'Drinking water infrastructure project reporting, tracking critical pipeline development and safe water supply access for Greater Jakarta.',
    frameworks: ['UN SDG 6', 'Infrastructure Disclosure', 'POJK 51'],
    deliverables: ['Infrastructure Annual Review', 'Company Profile Suite', 'Impact Infographics'],
    keyOutcomes: ['Safe water access for 2M+ citizens', 'Construction ESG mitigation', 'Stringent infrastructure governance'],
    code: 'WTJJ-24',
  },
  {
    id: 'kideco-23-ar',
    slug: 'kideco-annual-report-2023',
    title: 'Annual Report',
    client: 'Kideco Jaya Agung',
    fullName: 'PT Kideco Jaya Agung',
    category: 'Annual Report',
    year: '2023',
    image: '/Kideco-23-AR-a-768x576.png',
    aspectRatio: '768 / 576',
    cardSpan: 'tall',
    summary: 'Corporate operational and financial report framing large-scale energy transition, industrial efficiency, and strategic resource governance.',
    frameworks: ['GRI Standards', 'POJK 51', 'Corporate Governance'],
    deliverables: ['Annual Report Dossier', 'Executive Presentation Deck', 'Digital Summary'],
    keyOutcomes: ['Energy efficiency benchmarks', 'Risk mitigation frameworks', 'Executive financial typography'],
    code: 'KDC-AR23',
  },
];

export const PortfolioPage: React.FC<PortfolioPageProps> = ({
  onBackToHome,
  onOpenConsultation,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const categories = [
    'All',
    'Sustainability Report',
    'Annual Report',
    'Communication',
  ];

  const filteredItems =
    selectedCategory === 'All'
      ? ARCHIVE_PROJECTS
      : ARCHIVE_PROJECTS.filter((item) => item.category === selectedCategory);

  const handleOpenDetail = (item: PortfolioArchiveItem) => {
    // Structure as Project object for CaseStudyModal
    const proj: Project = {
      id: item.id,
      code: item.code,
      client: item.client,
      fullName: item.fullName,
      category: item.category,
      year: item.year,
      description: item.summary,
      highlight: `${item.title} aligned with ${item.frameworks.join(', ')}.`,
      frameworks: item.frameworks,
      keyOutcomes: item.keyOutcomes,
      color: '#162b1e',
      aspect: 'landscape',
      deliverables: item.deliverables,
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
            className="group inline-flex items-center gap-2.5 text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] text-neutral-800 hover:text-[#188F42] transition-colors py-2 focus:outline-none focus:ring-2 focus:ring-[#188F42] rounded-md px-1"
            aria-label="Back to Home"
          >
            <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </button>

          {/* Minimal ASA Media Logo / Brand Link */}
          <button
            onClick={onBackToHome}
            className="focus:outline-none flex items-center gap-2"
            aria-label="ASA Media Home"
          >
            <div className="w-2 h-2 rounded-full bg-[#188F42]" />
            <span className="font-semibold tracking-[-0.03em] text-base sm:text-lg text-neutral-900 uppercase">
              ASA MEDIA
            </span>
            <span className="hidden sm:inline-block text-neutral-400 font-mono text-xs">
              / ARCHIVE
            </span>
          </button>

          {/* Right Action: Inquire */}
          <button
            onClick={onOpenConsultation}
            className="text-xs font-semibold uppercase tracking-[0.16em] text-white bg-neutral-900 hover:bg-[#188F42] px-4 sm:px-5 py-2.5 rounded-full transition-colors shadow-sm"
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
                  EXHIBITION & ARCHIVE
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
                  className={`px-4 py-2 rounded-xl text-xs font-medium tracking-wide transition-all duration-200 whitespace-nowrap ${
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

      {/* 3. FULL PORTFOLIO COLLECTION — ASYMMETRIC EDITORIAL GRID */}
      <main className="w-full py-16 sm:py-24 flex-1">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 items-start">
            {filteredItems.map((item, index) => {
              const isWide = item.cardSpan === 'wide';
              return (
                <article
                  key={item.id}
                  onClick={() => handleOpenDetail(item)}
                  className={`group relative cursor-pointer rounded-[20px] overflow-hidden bg-white border border-neutral-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_24px_48px_rgba(0,0,0,0.1)] transition-all duration-500 ease-out flex flex-col justify-between ${
                    isWide ? 'md:col-span-2 lg:col-span-2' : 'col-span-1'
                  }`}
                  data-slug={`/portfolio/${item.slug}`}
                >
                  {/* Image Presentation */}
                  <div className="relative w-full overflow-hidden bg-[#ECEAE5] border-b border-neutral-100">
                    <div
                      className="relative w-full overflow-hidden"
                      style={{ aspectRatio: item.aspectRatio }}
                    >
                      <img
                        src={item.image}
                        alt={`${item.client} — ${item.title}`}
                        loading={index < 3 ? 'eager' : 'lazy'}
                        className="w-full h-full object-contain sm:object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />

                      {/* Top Right Year Pill */}
                      <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/85 backdrop-blur-md border border-white/60 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#188F42]" />
                        <span className="text-[10px] font-mono font-medium tracking-wider text-neutral-800">
                          {item.year}
                        </span>
                      </div>
                    </div>

                    {/* Desktop Floating Liquid-Glass Preview Panel */}
                    <div
                      className="hidden sm:block absolute inset-x-4 bottom-4 z-20 rounded-[16px] p-5 transition-all duration-400 ease-out opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0"
                      style={{
                        background: 'rgba(255, 255, 255, 0.28)',
                        backdropFilter: 'blur(20px) saturate(140%)',
                        WebkitBackdropFilter: 'blur(20px) saturate(140%)',
                        border: '1px solid rgba(255, 255, 255, 0.55)',
                        boxShadow:
                          'inset 0 1px 1px 0 rgba(255, 255, 255, 0.6), 0 16px 32px -8px rgba(0, 0, 0, 0.16)',
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-800 font-semibold">
                          View Project Details
                        </span>
                        <div className="w-6 h-6 rounded-full bg-white text-neutral-900 flex items-center justify-center shadow-sm">
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                      <p className="text-xs text-neutral-800 line-clamp-2 leading-relaxed font-light">
                        {item.summary}
                      </p>
                    </div>
                  </div>

                  {/* Editorial Card Metadata (Always visible on mobile & desktop) */}
                  <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex items-center justify-between gap-4 mb-2">
                        <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#188F42] font-semibold">
                          {item.category}
                        </span>
                        <span className="text-[11px] font-mono text-neutral-400">
                          {item.code}
                        </span>
                      </div>

                      <h2 className="text-xl sm:text-2xl font-medium tracking-tight text-neutral-900 mb-1 group-hover:text-[#188F42] transition-colors duration-200">
                        {item.client} — {item.title}
                      </h2>

                      <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed mt-2 line-clamp-2">
                        {item.summary}
                      </p>
                    </div>

                    {/* Framework Badges & Deep Link Action */}
                    <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between">
                      <div className="flex flex-wrap gap-1.5">
                        {item.frameworks.slice(0, isWide ? 3 : 2).map((fw, fIdx) => (
                          <span
                            key={fIdx}
                            className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-700 border border-neutral-200 font-medium"
                          >
                            {fw}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-neutral-900 group-hover:text-[#188F42] transition-colors">
                        <span>Details</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </main>

      {/* 4. UNDERSTATED FOOTER FOR PORTFOLIO ARCHIVE */}
      <footer className="w-full bg-[#111111] text-white py-16 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#188F42] font-semibold block mb-2">
              ASA MEDIA ARCHIVE
            </span>
            <p className="text-sm text-neutral-400 font-light max-w-md">
              Selected works across corporate disclosure, ESG assurance, and sustainability communication.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={onBackToHome}
              className="text-xs uppercase tracking-wider font-semibold text-neutral-400 hover:text-white transition-colors"
            >
              ← Back to Home
            </button>
            <button
              onClick={onOpenConsultation}
              className="text-xs uppercase tracking-wider font-semibold text-white bg-[#188F42] hover:bg-[#167d3a] px-6 py-3 rounded-full transition-colors shadow-sm"
            >
              Initiate Consultation
            </button>
          </div>
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
