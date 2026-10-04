import React, { useEffect, useState, useRef } from 'react';
import heroVideo from '../assets/hero.mp4';

export const ServicesVisualBreak: React.FC = () => {
  const [offsetY, setOffsetY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      if (rect.top < viewportHeight && rect.bottom > 0) {
        const progress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
        setOffsetY((progress - 0.5) * 50);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[580px] sm:min-h-[660px] flex items-center justify-center overflow-hidden bg-[#050705] border-y border-white/10"
    >
      {/* 
        Cinematic Video Layer with Subtle Parallax (No Heavy Overlay)
      */}
      <div
        className="absolute inset-0 w-full h-[120%] -top-[10%] pointer-events-none transition-transform duration-100 ease-out"
        style={{ transform: `translateY(${offsetY}px)` }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover opacity-80"
          aria-hidden="true"
        >
          <source src={heroVideo} type="video/mp4" />
          <source src="/hero.mp4" type="video/mp4" />
        </video>

        {/* Subtle Brand Ambient Tint (#188F42) - Not a heavy filter */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(135deg, rgba(24,143,66,0.12) 0%, rgba(0,0,0,0.15) 50%, rgba(5,7,5,0.4) 100%)',
          }}
        />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center py-24">
        <div className="inline-flex items-center gap-2 mb-6">
          <span className="w-5 h-[1.5px] bg-[#188F42]" />
          <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#188F42] font-semibold">
            THE ASA MEDIA ETHOS
          </span>
          <span className="w-5 h-[1.5px] bg-[#188F42]" />
        </div>

        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-light text-white tracking-tight leading-[1.08] mb-6 text-balance">
          Good work deserves <br />
          <span className="font-normal text-white">to be understood.</span>
        </h2>

        <p className="text-base sm:text-xl text-neutral-200 max-w-xl mx-auto font-light leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          We transform sustainability efforts into stories, reports, and communication that create
          meaning.
        </p>

        {/* Minimalist brand identity note */}
        <div className="mt-12 flex items-center justify-center gap-4 text-[10px] font-mono tracking-widest text-neutral-300 uppercase">
          <span>JAKARTA</span>
          <span>·</span>
          <span>PT AZARYA SANJAYA ARUNIKA</span>
          <span>·</span>
          <span>INDONESIA</span>
        </div>
      </div>
    </section>
  );
};
