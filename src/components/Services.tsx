import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface ServicesProps {
  onSelectService: (serviceName: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const servicesData = [
    {
      num: '01',
      title: 'REPORTING',
      subservices: ['Annual Reports', 'Sustainability Reports', 'Company Profiles'],
      description:
        "Reports that do more than meet compliance. We tell the story of your company's performance, values, and commitment to sustainable practices.",
      deliverables: [
        'GRI Standards 2021 & Sector Standards alignment',
        'OJK POJK 51/POJK.03/2017 regulatory compliance',
        'IFRS S1 & S2 (ISSB) climate disclosure preparation',
        'Editorial copywriting, translation & executive layouts',
      ],
    },
    {
      num: '02',
      title: 'ESG RATING ASSISTANCE & PROPER',
      subservices: [
        'PROPER documentation',
        'ESG evaluation preparation',
        'Narrative development',
        'Supporting documentation',
      ],
      description:
        'Strategic support for ESG assessments and PROPER requirements, helping companies communicate sustainability performance with stronger documentation and narratives.',
      deliverables: [
        'KLHK PROPER Beyond Compliance (Hijau & Emas) documentation',
        'ESG Rating preparation (MSCI, S&P CSA, Sustainalytics)',
        'Evidence verification & technical narrative synthesis',
        'Gap assessment and roadmap recommendations',
      ],
    },
    {
      num: '03',
      title: 'SUSTAINABILITY COMMUNICATION',
      subservices: [
        'Company Calendars',
        'Internal Magazines & Marketing Collaterals',
        'Infographics & Posters',
      ],
      description:
        'Creative communication that makes sustainability initiatives easier to understand, remember, and engage with.',
      deliverables: [
        'Annual corporate executive desk calendars',
        'Internal sustainability magazines & employee culture guides',
        'Executive ESG summary brochures & investor decks',
        'Data-driven infographics & digital communication assets',
      ],
    },
  ];

  return (
    <section id="services" className="w-full bg-[#0A0A0A] text-[#F7F7F5] py-28 sm:py-36 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 sm:mb-20">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-[2px] bg-[#188F42]" />
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#188F42]">
                PRACTICE & EXPERTISE
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight leading-[1.05] text-white">
              Accompany Your <br />
              <span className="font-normal text-white">Sustainability Journey.</span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-neutral-400 max-w-md font-light leading-relaxed">
            Delivering strategic advisory, regulatory compliance dossiers, and world-class editorial
            narratives across three core practices.
          </p>
        </div>

        {/* Three Large Editorial Service Blocks */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {servicesData.map((service, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <div
                key={service.num}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`relative flex flex-col justify-between p-8 sm:p-10 rounded-2xl transition-all duration-300 border ${
                  isHovered
                    ? 'bg-[#121212] border-[#188F42]/60 shadow-2xl -translate-y-1'
                    : 'bg-[#0E0E0E] border-white/10 hover:border-white/20'
                }`}
              >
                <div>
                  {/* Number & Marker */}
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                    <span className="font-mono text-3xl sm:text-4xl font-light text-neutral-400 group-hover:text-[#188F42]">
                      {service.num}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#188F42]" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-6">
                    {service.title}
                  </h3>

                  {/* Subservices List */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {service.subservices.map((item, i) => (
                      <span
                        key={i}
                        className="text-xs text-neutral-300 font-medium py-1 px-2.5 rounded-md bg-white/[0.06] border border-white/[0.08]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed mb-8">
                    &ldquo;{service.description}&rdquo;
                  </p>

                  {/* Deliverables List */}
                  <div className="space-y-2.5 pt-6 border-t border-white/10">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-[#188F42] block mb-3 font-semibold">
                      Scope of Deliverables
                    </span>
                    {service.deliverables.map((d, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2.5 text-xs text-neutral-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#188F42] shrink-0 mt-0.5" />
                        <span className="leading-snug">{d}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action */}
                <div className="pt-8 mt-8 border-t border-white/10">
                  <button
                    onClick={() => onSelectService(service.title)}
                    className="w-full py-3.5 px-4 rounded-xl bg-white/10 hover:bg-white text-white hover:text-black text-xs font-semibold uppercase tracking-wider transition-all duration-200 flex items-center justify-between group/btn"
                  >
                    <span>Consult on {service.title}</span>
                    <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover/btn:text-black group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
