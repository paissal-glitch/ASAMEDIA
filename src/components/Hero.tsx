import React from 'react';
import { FadeIn } from './FadeIn';
import heroVideo from '../assets/hero.mp4';

interface HeroProps {
  onOpenConsultation: () => void;
  onExploreServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenConsultation, onExploreServices }) => {
  const headline = 'Begin With Hope, Lead With Sustainability.';
  // Split into words, each word containing animated characters, preserving non-breaking spaces between words
  const words = headline.split(' ');

  let charIndexOffset = 0;

  return (
    <section className="relative w-full min-h-[100svh] flex flex-col justify-between overflow-hidden bg-[#050705]">
      {/* 
        LAYER 1: Base background (#050705) is handled by section bg.
        LAYER 2: Video (Opacity 0.85, covers entire hero, object-fit: cover).
        OFFICIAL UPLOADED ASA MEDIA HERO VIDEO ASSET (Local, no external URL)
      */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-85 z-0"
        aria-hidden="true"
      >
        <source src={heroVideo} type="video/mp4" />
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* 
        LAYER 3: Subtle atmospheric ASA green treatment
        linear-gradient(135deg, rgba(24,143,66,0.10) 0%, rgba(0,0,0,0.00) 45%, rgba(0,0,0,0.16) 100%)
      */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            'linear-gradient(135deg, rgba(24,143,66,0.10) 0%, rgba(0,0,0,0.00) 45%, rgba(0,0,0,0.16) 100%)',
        }}
        aria-hidden="true"
      />

      {/* 
        LAYER 4: Very subtle vignette
        radial-gradient(ellipse at center, rgba(0,0,0,0) 45%, rgba(0,0,0,0.18) 100%)
      */}
      <div
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(0,0,0,0) 45%, rgba(0,0,0,0.18) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Spacer below fixed navbar */}
      <div className="h-28 sm:h-32" />

      {/* 
        LAYER 6 & 7: Hero Typography & Hero UI
        Bottom aligned container:
        px-6 md:px-12 lg:px-16
        flex-1 flex flex-col justify-end
        pb-12 lg:pb-16
        lg:grid lg:grid-cols-2 lg:items-end
      */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-16 flex-1 flex flex-col justify-end pb-12 lg:pb-16 max-w-[1600px] mx-auto">
        <div className="lg:grid lg:grid-cols-2 lg:items-end gap-12 xl:gap-16">
          {/* LEFT COLUMN */}
          <div className="max-w-3xl">
            {/* Responsive Continuous Headline (No <br>, Natural Word Wrapping) */}
            <h1
              className="text-white mb-6 select-none"
              style={{
                fontSize: 'clamp(2.75rem, 5.8vw, 6.5rem)',
                lineHeight: 0.98,
                letterSpacing: '-0.03em',
                fontWeight: 600,
                maxWidth: '100%',
                wordBreak: 'normal',
                overflowWrap: 'normal',
                hyphens: 'none',
              }}
            >
              {words.map((word, wordIndex) => {
                const wordChars = word.split('');
                const currentOffset = charIndexOffset;
                charIndexOffset += wordChars.length + 1;

                return (
                  <span key={`word-${wordIndex}`} className="inline-block whitespace-nowrap">
                    {wordChars.map((char, charIdx) => {
                      const totalIdx = currentOffset + charIdx;
                      return (
                        <span
                          key={`char-${totalIdx}`}
                          className="animate-char"
                          style={{
                            animationDelay: `${200 + totalIdx * 30}ms`,
                          }}
                        >
                          {char}
                        </span>
                      );
                    })}
                    {/* Preserve space after word unless it is the last word */}
                    {wordIndex < words.length - 1 && (
                      <span className="inline-block">&nbsp;</span>
                    )}
                  </span>
                );
              })}
            </h1>

            {/* Subheading */}
            <FadeIn delay={800} duration={1000}>
              <p className="text-base md:text-lg text-gray-300 mb-5 max-w-xl font-light leading-relaxed">
                Building sustainability stories through reporting, ESG, performance, and meaningful
                communication.
              </p>
            </FadeIn>

            {/* Buttons */}
            <FadeIn delay={1200} duration={1000}>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={onOpenConsultation}
                  className="bg-white text-black px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200 shadow-lg active:scale-[0.98]"
                >
                  Book a Consultation
                </button>
                <button
                  onClick={onExploreServices}
                  className="liquid-glass border border-white/20 text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-black transition-all duration-200 active:scale-[0.98]"
                >
                  Explore Services
                </button>
              </div>
            </FadeIn>
          </div>

          {/* RIGHT COLUMN TAG */}
          <div className="flex items-end justify-start lg:justify-end mt-8 lg:mt-0">
            <FadeIn delay={1400} duration={1000}>
              <div className="liquid-glass border border-white/20 px-6 py-3 rounded-xl shadow-xl">
                <span className="text-lg md:text-xl lg:text-2xl font-light text-white tracking-wide">
                  Reporting. ESG. Communication.
                </span>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-12 sm:mt-16 flex items-center justify-between border-t border-white/10 pt-4">
          <button
            onClick={onExploreServices}
            className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-gray-400 hover:text-white transition-colors group focus:outline-none"
            aria-label="Scroll to explore"
          >
            <span>SCROLL TO EXPLORE</span>
            <div className="w-4 h-6 rounded-full border border-white/30 flex items-start justify-center p-1">
              <div className="w-1 h-1.5 rounded-full bg-[#188F42] animate-bounce" />
            </div>
          </button>

          <span className="text-[11px] font-mono text-gray-400 hidden sm:inline-block">
            PT AZARYA SANJAYA ARUNIKA
          </span>
        </div>
      </div>
    </section>
  );
};
