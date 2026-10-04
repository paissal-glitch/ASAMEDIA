import React from 'react';

export const WhyAsaMedia: React.FC = () => {
  const principles = [
    {
      num: '01',
      title: 'CLARITY',
      summary: 'Making complex information understandable.',
      description:
        'Translating intricate ESG frameworks, operational GHG numbers, and supply chain data into lucid, intuitive narratives that stakeholders understand immediately.',
    },
    {
      num: '02',
      title: 'CREDIBILITY',
      summary: 'Grounding communication in accurate information.',
      description:
        'Building unassailable disclosures backed by verifiable data, compliance with OJK POJK 51, GRI Standards, and rigorous technical cross-checking.',
    },
    {
      num: '03',
      title: 'CREATIVITY',
      summary: 'Combining strategic thinking with strong visual communication.',
      description:
        'Refining complex annual reports through Swiss-grade typography, thoughtful hierarchy, and cinematic art direction that elevates corporate reputation.',
    },
    {
      num: '04',
      title: 'COLLABORATION',
      summary: 'Working closely with clients throughout the sustainability journey.',
      description:
        'Operating as trusted long-term advisors beside boards, corporate secretaries, and sustainability task forces through every audit and executive milestone.',
    },
  ];

  return (
    <section className="w-full bg-[#0A0A0A] text-[#F7F7F5] py-28 sm:py-36 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Section Headline */}
        <div className="max-w-4xl mb-20 sm:mb-24">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-[2px] bg-[#188F42]" />
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#188F42]">
              WHY ASA MEDIA
            </span>
          </div>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight leading-[1.06] text-white">
            Complex information. <br />
            <span className="font-normal text-white">Clear communication.</span>
          </h2>
          <p className="mt-8 text-base sm:text-xl text-neutral-400 font-light max-w-2xl leading-relaxed">
            Four guiding principles that shape how we research, structure, write, and design every
            corporate report and ESG publication.
          </p>
        </div>

        {/* 4 Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {principles.map((principle) => (
            <div
              key={principle.num}
              className="p-8 sm:p-12 rounded-2xl bg-[#0E0E0E] border border-white/10 hover:border-[#188F42]/60 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-baseline justify-between mb-8 pb-4 border-b border-white/10">
                  <span className="text-4xl sm:text-5xl font-mono font-light text-neutral-600 group-hover:text-[#188F42] transition-colors">
                    {principle.num}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#188F42]" />
                </div>

                <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-3">
                  {principle.title}
                </h3>

                <p className="text-base sm:text-lg text-neutral-200 font-medium mb-4">
                  {principle.summary}
                </p>
              </div>

              <div className="pt-6 border-t border-white/5">
                <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
                  {principle.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
