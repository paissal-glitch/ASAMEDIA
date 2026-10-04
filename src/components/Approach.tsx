import React from 'react';

export const Approach: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'UNDERSTAND',
      summary:
        'Understand business performance, sustainability priorities, stakeholders, and material issues.',
      detail:
        'Thorough materiality assessments and regulatory alignment (GRI Standards, OJK POJK 51, and ISSB).',
    },
    {
      num: '02',
      title: 'SHAPE',
      summary:
        'Transform information, data, and strategy into structured narratives and visual systems.',
      detail:
        'Synthesizing ESG indicators, GHG emissions metrics, and leadership vision into structured architecture.',
    },
    {
      num: '03',
      title: 'COMMUNICATE',
      summary:
        'Turn complex sustainability information into clear and meaningful communication.',
      detail:
        'Engaging print, digital, and stakeholder touchpoints designed to inspire investor and community trust.',
    },
  ];

  return (
    <section className="w-full bg-[#F7F7F5] text-[#0A0A0A] py-24 sm:py-32 border-t border-neutral-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 lg:mb-20">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-[2px] bg-[#188F42]" />
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#188F42]">
                OUR METHODOLOGY
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.06] tracking-tight text-[#0A0A0A]">
              Accompany Your <br />
              <span className="text-neutral-500 font-light">Sustainability Journey.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:flex lg:items-end">
            <p className="text-base sm:text-lg text-neutral-600 font-light leading-relaxed">
              We guide Indonesian and global institutions through every phase of the disclosure
              lifecycle, turning raw performance metrics into strategic corporate capital.
            </p>
          </div>
        </div>

        {/* 3 Stages with Oversized Numbered Typography */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div
              key={step.num}
              className="flex flex-col justify-between p-8 sm:p-10 rounded-2xl bg-white border border-neutral-200/90 shadow-sm hover:border-[#188F42] transition-all duration-300 group"
            >
              <div>
                {/* Oversized Number */}
                <div className="text-6xl sm:text-7xl font-extralight tracking-tighter text-neutral-300 group-hover:text-[#188F42] transition-colors duration-300 font-mono mb-8">
                  {step.num}
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <span className="w-4 h-[1.5px] bg-[#188F42]" />
                  <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#0A0A0A]">
                    {step.title}
                  </h3>
                </div>

                <p className="text-neutral-800 text-sm sm:text-base font-normal leading-relaxed mb-6">
                  {step.summary}
                </p>
              </div>

              <div className="pt-6 border-t border-neutral-100">
                <p className="text-xs text-neutral-500 leading-relaxed font-light">
                  {step.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
