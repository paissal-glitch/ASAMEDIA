import React from 'react';

export const BrandStatement: React.FC = () => {
  const metadataItems = [
    { label: 'ANNUAL REPORT', sub: 'Comprehensive Disclosure' },
    { label: 'SUSTAINABILITY REPORT', sub: 'GRI · POJK 51 · ISSB' },
    { label: 'ESG', sub: 'Ratings & Benchmarks' },
    { label: 'PROPER', sub: 'Beyond Compliance' },
    { label: 'COMMUNICATION', sub: 'Strategic Narratives' },
  ];

  return (
    <section id="about" className="relative w-full bg-[#F7F7F5] text-[#0A0A0A] py-24 sm:py-32 lg:py-36 border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Section Kicker */}
        <div className="flex items-center gap-3 mb-12 sm:mb-16">
          <span className="w-8 h-[2px] bg-[#188F42]" />
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#188F42]">
            ABOUT ASA MEDIA
          </span>
        </div>

        {/* Asymmetric Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Main Statement (Left 8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] tracking-tight text-[#0A0A0A]">
              Turning sustainability <br />
              <span className="text-neutral-500 font-light">into a story that matters.</span>
            </h2>

            <div className="w-16 h-[2px] bg-[#188F42]" />

            <p className="text-lg sm:text-xl md:text-2xl text-neutral-700 font-light leading-relaxed max-w-2xl">
              ASA Media is a consultant specializing in crafting comprehensive Annual and
              Sustainability Reports. We work alongside businesses to communicate performance,
              values, and sustainability commitments with clarity, creativity, and professionalism.
            </p>
          </div>

          {/* Right Metadata Column (Right 4 cols) */}
          <div className="lg:col-span-4 lg:pl-8 flex flex-col gap-6 pt-2 lg:border-l lg:border-neutral-200">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-neutral-400 block font-semibold">
              Discipline & Practice
            </span>

            <ul className="flex flex-col gap-3 text-xs tracking-wider uppercase text-neutral-900 font-medium">
              {metadataItems.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between py-3 border-b border-neutral-200 group hover:border-[#188F42] transition-colors"
                >
                  <span className="group-hover:text-[#188F42] transition-colors font-semibold">
                    {item.label}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-500 font-normal">
                    {item.sub}
                  </span>
                </li>
              ))}
            </ul>

            {/* Corporate identity pill */}
            <div className="mt-4 p-4 rounded-xl bg-white border border-neutral-200 text-xs text-neutral-600 leading-relaxed shadow-sm">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#188F42] font-semibold block mb-1">
                PT Azarya Sanjaya Arunika
              </span>
              Empowering Indonesian and multinational corporations to navigate ESG accountability and
              inspire stakeholder trust.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
