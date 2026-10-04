import React from 'react';
import { ArrowUpRight, ArrowDown } from 'lucide-react';

interface FinalCTAProps {
  onOpenConsultation: () => void;
  onExploreServices: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenConsultation, onExploreServices }) => {
  return (
    <section className="relative w-full min-h-[85vh] flex items-center justify-center bg-[#050505] text-white py-28 sm:py-36 px-6 md:px-12 lg:px-16 overflow-hidden border-t border-white/10">
      {/* Subtle organic light bloom with brand color #188F42 */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full blur-[140px] pointer-events-none opacity-20"
        style={{ background: '#188F42' }}
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 mb-8">
          <span className="w-6 h-[1.5px] bg-[#188F42]" />
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#188F42]">
            BEGIN THE CONVERSATION
          </span>
          <span className="w-6 h-[1.5px] bg-[#188F42]" />
        </div>

        {/* Large Headline with Subtle Typography Animation */}
        <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[1.04] mb-8 text-white text-balance">
          Let&rsquo;s shape a more <br />
          <span className="font-normal text-white">sustainable story.</span>
        </h2>

        {/* Supporting Copy */}
        <p className="text-base sm:text-xl text-neutral-300 max-w-xl mx-auto font-light leading-relaxed mb-12">
          Tell us where your sustainability journey is headed.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onOpenConsultation}
            className="px-8 sm:px-10 py-4 rounded-lg bg-white text-black text-xs sm:text-sm font-medium tracking-wider uppercase hover:bg-gray-100 transition-all duration-200 active:scale-[0.98] shadow-2xl flex items-center gap-2 group"
          >
            <span>Book a Consultation</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          <button
            onClick={onExploreServices}
            className="px-8 sm:px-10 py-4 rounded-lg liquid-glass border border-white/20 text-xs sm:text-sm font-medium tracking-wider uppercase text-white hover:bg-white hover:text-black transition-all duration-200 active:scale-[0.98] flex items-center gap-2 group"
          >
            <span>Explore Our Services</span>
            <ArrowDown className="w-4 h-4 text-neutral-300 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
