import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { CaseStudyModal } from './CaseStudyModal';
import { Project } from '../data/content';

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

const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'asbi-23',
    num: '01',
    title: 'Annual Report',
    category: 'Reporting · Design',
    client: 'Asuransi Bintang',
    year: '2023',
    image: '/ASBI-23-a-768x576.png',
    aspectRatio: '768 / 576',
    rotation: '-0.75deg',
    summary: 'Comprehensive annual financial & governance disclosure balancing regulatory adherence with executive clarity.',
    frameworks: ['OJK POJK 51', 'GRI Standards', 'IDX Governance'],
    matchedProject: {
      id: 'asbi',
      code: 'ASBI',
      client: 'Asuransi Bintang',
      fullName: 'PT Asuransi Bintang Tbk',
      category: 'Annual Report',
      year: '2023',
      description: 'Comprehensive annual financial and corporate governance disclosure balancing strict regulatory compliance with executive editorial precision.',
      highlight: 'Integrated annual performance publication presenting financial resilience and sustainable governance.',
      frameworks: ['OJK POJK 51', 'GRI Standards 2021', 'IDX Corporate Governance'],
      keyOutcomes: [
        '100% compliant with OJK reporting deadlines and disclosure guidelines',
        'Transparent solvency and underwriting performance narratives',
        'Award-nominated editorial structure and typographical hierarchy',
      ],
      color: '#162b1e',
      aspect: 'landscape',
      featuredQuote: 'Articulating financial stability through transparent reporting.',
      deliverables: ['Annual Financial & Governance Report', 'Interactive Digital PDF', 'Executive Highlights'],
    },
  },
  {
    id: 'kideco-23-ar',
    num: '02',
    title: 'Annual Report',
    category: 'Reporting · Corporate',
    client: 'Kideco Jaya Agung',
    year: '2023',
    image: '/Kideco-23-AR-a-768x576.png',
    aspectRatio: '768 / 576',
    rotation: '0.6deg',
    summary: 'Corporate operational and financial report framing large-scale energy transition and industrial stewardship.',
    frameworks: ['GRI Standards', 'POJK 51', 'Corporate Governance'],
    matchedProject: {
      id: 'kideco-ar-23',
      code: 'KIDECO-AR',
      client: 'Kideco Jaya Agung',
      fullName: 'PT Kideco Jaya Agung',
      category: 'Annual Report',
      year: '2023',
      description: 'Annual corporate report framing large-scale energy transition, industrial efficiency, and strategic governance in energy production.',
      highlight: 'Robust annual operational overview demonstrating responsible resource management.',
      frameworks: ['GRI Standards', 'POJK 51', 'Indonesian Mining Standards'],
      keyOutcomes: [
        'Detailed breakdown of energy efficiency and operational resilience',
        'Rigorous governance and risk mitigation frameworks',
        'Executive design system highlighting core energy benchmarks',
      ],
      color: '#18382b',
      aspect: 'landscape',
      deliverables: ['Annual Report Dossier', 'Executive Presentation Deck', 'Digital Summary'],
    },
  },
  {
    id: 'kideco-23-sr',
    num: '03',
    title: 'Sustainability Report',
    category: 'Reporting · ESG',
    client: 'Kideco Jaya Agung',
    year: '2023',
    image: '/Kideco-23-SR-a-768x576.png',
    aspectRatio: '768 / 576',
    rotation: '-0.5deg',
    summary: 'Benchmark sustainability report charting post-mining ecosystem rehabilitation and PROPER Emas achievements.',
    frameworks: ['GRI 2021', 'PROPER Emas', 'TCFD', 'POJK 51'],
    matchedProject: {
      id: 'kideco',
      code: 'KIDECO-SR',
      client: 'Kideco Jaya Agung',
      fullName: 'PT Kideco Jaya Agung',
      category: 'Sustainability Report',
      year: '2023 / 2024',
      description: 'Benchmark sustainability reporting charting post-mining ecosystem rehabilitation, community empowerment, and PROPER Emas verification.',
      highlight: 'Beyond compliance reporting aligned with GRI Standards and PROPER Emas verification.',
      frameworks: ['GRI Standards 2021', 'POJK 51', 'PROPER Emas Alignment', 'TCFD Framework'],
      keyOutcomes: [
        'Comprehensive biodiversity restoration & carbon offset metrics',
        'Detailed social investment impact across regional communities',
        'Recognized with top regional sustainability disclosure accolades',
      ],
      color: '#162b1e',
      aspect: 'landscape',
      featuredQuote: 'Transforming industrial stewardship into an authentic, measurable sustainability dialogue.',
      deliverables: ['Full Sustainability Report (300+ pages)', 'Executive Summary Booklet', 'Digital Interactive PDF'],
    },
  },
  {
    id: 'kideco-24-ar',
    num: '04',
    title: 'Annual Report',
    category: 'Design · Communication',
    client: 'Kideco Jaya Agung',
    year: '2024',
    image: '/Kideco-24-AR-a-768x512.png',
    aspectRatio: '768 / 512',
    rotation: '0.75deg',
    summary: 'Forward-looking annual report spotlighting green business acceleration, operational innovation, and stakeholder value.',
    frameworks: ['GRI Sector Standards', 'POJK 51', 'ISSB Aligned'],
    matchedProject: {
      id: 'kideco-ar-24',
      code: 'KIDECO-AR24',
      client: 'Kideco Jaya Agung',
      fullName: 'PT Kideco Jaya Agung',
      category: 'Annual Report',
      year: '2024',
      description: 'Forward-looking corporate annual report spotlighting green business acceleration, operational efficiency, and stakeholder transparency.',
      highlight: 'Modern editorial publication presenting corporate transition milestones.',
      frameworks: ['GRI Sector Standards', 'POJK 51', 'ISSB Climate Disclosure'],
      keyOutcomes: [
        'Strategic alignment with Indonesia Net Zero Emission roadmaps',
        'Streamlined infographics communicating complex financial metrics',
        'Integrated bilingual editorial suite',
      ],
      color: '#1b2230',
      aspect: 'landscape',
      deliverables: ['Annual Report Suite', 'Interactive Web Annex', 'Investor Factsheet'],
    },
  },
  {
    id: 'kideco-24-sr',
    num: '05',
    title: 'Sustainability Campaign',
    category: 'Campaign · Education',
    client: 'Kideco Jaya Agung',
    year: '2024',
    image: '/Kideco-24-SR-a-768x614.png',
    aspectRatio: '768 / 614',
    rotation: '-0.6deg',
    summary: 'Multi-stakeholder sustainability publication detailing circular economy initiatives and biodiversity conservation.',
    frameworks: ['GRI 2021', 'SDGs 2030', 'OJK POJK 51'],
    matchedProject: {
      id: 'kideco-sr-24',
      code: 'KIDECO-SR24',
      client: 'Kideco Jaya Agung',
      fullName: 'PT Kideco Jaya Agung',
      category: 'Sustainability Report',
      year: '2024',
      description: 'Comprehensive sustainability narrative illustrating circular economy principles, clean water initiatives, and deep ecosystem regeneration.',
      highlight: 'Deep-dive sustainability publication blending rigorous field data with inspiring visual storytelling.',
      frameworks: ['GRI Standards 2021', 'UN SDGs', 'POJK 51', 'KLHK PROPER'],
      keyOutcomes: [
        'High-density environmental data transformed into intuitive infographics',
        'Verified community empowerment outcomes across 80+ partner villages',
        'Editorial design praised by external ESG auditor panels',
      ],
      color: '#153020',
      aspect: 'portrait',
      deliverables: ['Sustainability Report', 'Executive Summary Deck', 'Social Media Carousel Series'],
    },
  },
  {
    id: 'star-24',
    num: '06',
    title: 'ESG Communication',
    category: 'Campaign · Communication',
    client: 'STAR Energy / Star Resources',
    year: '2024',
    image: '/STAR-24-a-768x576.png',
    aspectRatio: '768 / 576',
    rotation: '0.8deg',
    summary: 'Clean energy communication and stakeholder publication framing geothermal excellence and community engagement.',
    frameworks: ['GRI Energy', 'Renewable ESG', 'Stakeholder Dialogue'],
    matchedProject: {
      id: 'star',
      code: 'STAR',
      client: 'Star Resources',
      fullName: 'STAR Energy & Resources Ecosystem',
      category: 'Communication',
      year: '2024',
      description: 'Clean energy communication suite framing geothermal leadership, clean power generation, and community co-existence.',
      highlight: 'Vibrant clean-energy communication inspiring stakeholder confidence.',
      frameworks: ['GRI Energy Sector', 'Renewable ESG Disclosure', 'Community Dialogue'],
      keyOutcomes: [
        'High-impact visual narratives depicting renewable geothermal potential',
        'Transparent biodiversity and carbon avoidance metrics',
        'Executive layout designed for investors and regulatory authorities',
      ],
      color: '#182433',
      aspect: 'landscape',
      deliverables: ['Clean Energy Communication Report', 'Executive Briefing Suite', 'Stakeholder Infographics'],
    },
  },
  {
    id: 'wtjj-24',
    num: '07',
    title: 'Company Profile',
    category: 'Design · Communication',
    client: 'Wika Tirta Jaya Jatiluhur',
    year: '2024',
    image: '/WTJJ-24-1-768x699.jpg',
    aspectRatio: '768 / 699',
    rotation: '-0.7deg',
    summary: 'Strategic infrastructure profile documenting landmark drinking water supply projects and clean water access.',
    frameworks: ['UN SDG 6', 'Infrastructure Disclosure', 'POJK 51'],
    matchedProject: {
      id: 'wtjj',
      code: 'WTJJ',
      client: 'Wika Tirta Jaya Jatiluhur',
      fullName: 'PT Wika Tirta Jaya Jatiluhur',
      category: 'Annual Report',
      year: '2023 / 2024',
      description: 'Drinking water infrastructure project reporting, tracking critical pipeline development and safe water supply access for Greater Jakarta.',
      highlight: 'Infrastructure development and SDG 6 (Clean Water and Sanitation) reporting.',
      frameworks: ['GRI Standards', 'POJK 51', 'SDG Impact Metrics'],
      keyOutcomes: [
        'Clear demonstration of socioeconomic impact for 2 million urban beneficiaries',
        'Construction environmental mitigation and watershed protection narratives',
        'Stringent infrastructure governance and audit reporting',
      ],
      color: '#172738',
      aspect: 'portrait',
      deliverables: ['Infrastructure Annual Review', 'Company Profile Suite', 'Impact Infographics'],
    },
  },
];

export const Portfolio: React.FC<PortfolioProps> = ({ onConsult, onNavigateToPortfolio }) => {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

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
              {item.frameworks.slice(0, 2).map((fw, fIdx) => (
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
        {/* Dual duplicated track running seamless CSS translate animation */}
        <div className="portfolio-marquee-track flex items-center gap-6 sm:gap-8 lg:gap-10 w-max">
          {/* First sequence of portfolio cards */}
          <div className="portfolio-track-set flex items-center gap-6 sm:gap-8 lg:gap-10 shrink-0">
            {PORTFOLIO_ITEMS.map((item) => renderCard(item, 'track-1'))}
          </div>

          {/* Identical cloned sequence for infinite seamless flow */}
          <div className="portfolio-track-set flex items-center gap-6 sm:gap-8 lg:gap-10 shrink-0" aria-hidden="true">
            {PORTFOLIO_ITEMS.map((item) => renderCard(item, 'track-2'))}
          </div>
        </div>
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
