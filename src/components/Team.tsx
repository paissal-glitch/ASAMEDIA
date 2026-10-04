import React from 'react';
import { TEAM } from '../data/content';

export const Team: React.FC = () => {
  return (
    <section
      id="teams"
      aria-label="People Behind the Work"
      className="relative w-full bg-[#F7F7F5] text-[#111111] py-24 sm:py-32 lg:py-40 border-t border-neutral-200/80 font-sans"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Editorial Section Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 sm:mb-20">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-[2px] bg-[#188F42]" aria-hidden="true" />
              <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-[#188F42]">
                CORE LEADERSHIP
              </span>
            </div>
            <h2
              className="font-light tracking-[-0.035em] text-[#111111] leading-[1.04]"
              style={{ fontSize: 'clamp(2.5rem, 5.2vw + 1rem, 5rem)' }}
            >
              People Behind <br />
              <span className="font-normal text-neutral-500">the Work.</span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-neutral-600 max-w-md font-light leading-relaxed">
            A dedicated collective of governance strategists, creative directors, and sustainability
            writers orchestrating disclosure excellence for leading organizations across Indonesia.
          </p>
        </header>

        {/* 4 Team Member Editorial Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {TEAM.map((member, index) => (
            <article
              key={member.name}
              className="group flex flex-col justify-between p-5 sm:p-6 rounded-[20px] bg-white border border-neutral-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(24,143,66,0.08)] hover:border-[#188F42]/60 transition-all duration-300"
            >
              <div>
                {/* Portrait Image Container with Liquid Glass Accent Badge */}
                <div className="relative w-full aspect-[4/5] rounded-[14px] overflow-hidden bg-[#EFEFEA] border border-neutral-200/60 mb-6">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={`${member.name} — ${member.role}`}
                      loading="lazy"
                      className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col justify-between p-5 bg-neutral-100">
                      <div className="text-3xl font-mono text-neutral-400">
                        {member.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                    </div>
                  )}

                  {/* Editorial Index Pill (Top Left) */}
                  <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-mono text-white font-medium">
                    0{index + 1}
                  </div>

                  {/* Refined Green Accent Indicator (Top Right) */}
                  <div className="absolute top-3 right-3 z-10 w-2.5 h-2.5 rounded-full bg-[#188F42] shadow-[0_0_8px_rgba(24,143,66,0.6)]" />

                  {/* Glass Experience Tag (Bottom Overlay) */}
                  {member.experience && (
                    <div
                      className="absolute inset-x-3 bottom-3 z-10 py-1.5 px-3 rounded-lg text-center"
                      style={{
                        background: 'rgba(255, 255, 255, 0.7)',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                        border: '1px solid rgba(255, 255, 255, 0.5)',
                      }}
                    >
                      <span className="text-[10px] font-mono uppercase tracking-wider font-semibold text-neutral-800">
                        {member.experience}
                      </span>
                    </div>
                  )}
                </div>

                {/* Member Info */}
                <div className="mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#188F42] font-semibold block mb-1">
                    {member.role}
                  </span>
                  <h3 className="text-xl font-medium tracking-tight text-[#111111] group-hover:text-[#188F42] transition-colors duration-200">
                    {member.name}
                  </h3>
                </div>

                <p className="text-xs text-neutral-600 leading-relaxed font-light mb-4 line-clamp-4">
                  {member.bio}
                </p>
              </div>

              {/* Specialization Discipline Footer */}
              <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                <span className="text-[11px] font-mono text-neutral-500 font-medium tracking-wide">
                  {member.specialization}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
