import React from 'react';
import { ArrowUp, ArrowUpRight, Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  onOpenConsultation: () => void;
  onNavigateToAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenConsultation, onNavigateToAdmin }) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#050505] text-white pt-20 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand & Legal Name (5 cols) */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-2">
                ASA MEDIA
              </h3>
              <p className="text-xs font-mono tracking-widest uppercase text-[#188F42] mb-6 font-semibold">
                PT Azarya Sanjaya Arunika <br />
                <span className="text-neutral-400 font-normal">(PT ASA MEDIA)</span>
              </p>
              <p className="text-sm text-neutral-400 font-light leading-relaxed max-w-sm mb-6">
                An Indonesian sustainability and corporate reporting consultancy. Specializing in
                Annual Reports, Sustainability Reports, ESG Rating Assistance & PROPER, and
                Sustainability Communication.
              </p>
            </div>

            {/* Quick Action */}
            <div>
              <button
                onClick={onOpenConsultation}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-white hover:text-[#188F42] transition-colors py-2 group"
              >
                <span>Initiate a Consultation</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Navigation Links (3 cols) */}
          <div className="md:col-span-3">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-neutral-500 block mb-6 font-semibold">
              Navigation
            </span>
            <ul className="flex flex-col gap-3 text-sm text-neutral-300 font-light">
              <li>
                <button
                  onClick={() => scrollTo('about')}
                  className="hover:text-white transition-colors"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('services')}
                  className="hover:text-white transition-colors"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('portfolio')}
                  className="hover:text-white transition-colors"
                >
                  Portfolio
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('teams')}
                  className="hover:text-white transition-colors"
                >
                  Teams
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('contact')}
                  className="hover:text-white transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Office Address & Direct Contact (4 cols) */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-neutral-500 block font-semibold">
              Headquarters
            </span>

            {/* Address */}
            <div className="flex items-start gap-3 text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
              <MapPin className="w-4 h-4 text-[#188F42] shrink-0 mt-0.5" />
              <div>
                <p className="font-normal text-white">Infiniti Office, Permata Regency D/37</p>
                <p>Jl. H. Kelik Srengseng, Kembangan</p>
                <p>Jakarta Barat 11630, Indonesia</p>
              </div>
            </div>

            {/* Inquiries */}
            <div className="flex items-center gap-3 text-xs sm:text-sm text-neutral-300">
              <Phone className="w-4 h-4 text-[#188F42] shrink-0" />
              <div>
                <span className="text-neutral-500 block text-[10px] font-mono uppercase">
                  Inquiries
                </span>
                <a
                  href="tel:082114252531"
                  className="hover:text-white transition-colors font-mono"
                >
                  0821 1425 2531
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-3 text-xs sm:text-sm text-neutral-300">
              <Mail className="w-4 h-4 text-[#188F42] shrink-0" />
              <div>
                <span className="text-neutral-500 block text-[10px] font-mono uppercase">
                  Email
                </span>
                <a
                  href="mailto:info@asamedia.co.id"
                  className="hover:text-white transition-colors font-mono"
                >
                  info@asamedia.co.id
                </a>
              </div>
            </div>

            {/* Social Channels */}
            <div className="pt-2 flex items-center gap-4 text-xs font-mono text-neutral-400">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#188F42] transition-colors"
              >
                LinkedIn
              </a>
              <span>·</span>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#188F42] transition-colors"
              >
                Instagram
              </a>
              <span>·</span>
              <a
                href="https://wa.me/6282114252531"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#188F42] transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400 font-mono">
          <div className="flex items-center gap-3">
            <p>© 2026 ASA Media. All rights reserved.</p>
            <span>·</span>
            <a
              href="/admin"
              onClick={(e) => {
                if (onNavigateToAdmin) {
                  e.preventDefault();
                  onNavigateToAdmin();
                }
              }}
              className="hover:text-emerald-400 transition-colors underline decoration-neutral-700 underline-offset-4"
            >
              CMS Admin
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-white transition-colors focus:outline-none"
            aria-label="Scroll to top"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
