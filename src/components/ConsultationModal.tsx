import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, MessageSquare, Mail } from 'lucide-react';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  preselectedService,
}) => {
  const [fullName, setFullName] = useState('');
  const [corporateEmail, setCorporateEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [projectContext, setProjectContext] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (preselectedService && !projectContext) {
      setProjectContext(`Inquiry regarding ${preselectedService}: `);
    }
  }, [preselectedService]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const targetEmail = 'info@asamedia.co.id';
  const whatsappNumber = '6282114252531';

  const formatMessage = () => {
    return (
      `Halo ASA Media / PT Azarya Sanjaya Arunika,\n\n` +
      `Saya ingin berkonsultasi mengenai proyek corporate reporting / sustainability:\n\n` +
      `• Full Name: ${fullName || '-'}\n` +
      `• Corporate Email: ${corporateEmail || '-'}\n` +
      `• Phone / WhatsApp: ${phone || '-'}\n` +
      `• Project Context: ${projectContext || '-'}\n`
    );
  };

  const handleDirectWhatsApp = () => {
    if (!fullName || !phone) {
      alert('Mohon lengkapi Full Name dan Phone / WhatsApp terlebih dahulu.');
      return;
    }
    const text = encodeURIComponent(formatMessage());
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank');
  };

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !corporateEmail) return;

    const subject = encodeURIComponent(`Consultation Inquiry: ${fullName}`);
    const body = encodeURIComponent(
      `Halo ASA Media,\n\nBerikut rincian konsultasi saya:\n\n` +
      `Full Name: ${fullName}\n` +
      `Corporate Email: ${corporateEmail}\n` +
      `Phone / WhatsApp: ${phone}\n` +
      `Project Context:\n${projectContext}\n\n` +
      `---\nDikirim melalui ASA Media Consultation Portal`
    );

    window.location.href = `mailto:${targetEmail}?subject=${subject}&body=${body}`;
    setIsSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm transition-opacity duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-[#0E0E0E] border border-white/20 rounded-2xl p-5 sm:p-7 text-white shadow-2xl no-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {isSubmitted ? (
          <div className="py-6 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#188F42]/20 border border-[#188F42] flex items-center justify-center text-[#188F42] mb-4">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <h3 className="text-xl sm:text-2xl font-light text-white mb-2">
              Inquiry Dispatched
            </h3>

            <p className="text-xs sm:text-sm text-neutral-300 max-w-xs mx-auto leading-relaxed mb-6 font-light">
              Inquiry email telah disiapkan menuju{' '}
              <span className="font-mono text-[#188F42] font-semibold">{targetEmail}</span>. Tim konsultan
              kami akan segera merespons Anda.
            </p>

            <div className="flex flex-col sm:flex-row gap-2 w-full max-w-xs">
              <button
                type="button"
                onClick={handleDirectWhatsApp}
                className="flex-1 py-2.5 px-3 rounded-lg bg-[#25d366]/20 border border-[#25d366]/40 hover:bg-[#25d366]/30 text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#25d366]" />
                <span>WhatsApp</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  onClose();
                }}
                className="flex-1 py-2.5 px-3 rounded-lg bg-white text-black text-xs font-semibold uppercase tracking-wider hover:bg-neutral-100 transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="mb-5 pr-6">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#188F42] font-semibold block mb-1">
                ASA MEDIA · ADVISORY
              </span>
              <h2 className="text-xl sm:text-2xl font-normal tracking-tight text-white">
                Book a Consultation
              </h2>
              <p className="text-xs text-neutral-400 font-light mt-0.5">
                Kirimkan kebutuhan pelaporan perusahaan Anda ke konsultan kami.
              </p>
            </div>

            {/* Compact 4-Field Form */}
            <form onSubmit={handleSubmitInquiry} className="space-y-3.5">
              {/* 1. Full Name */}
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Nama Lengkap"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs sm:text-sm text-white focus:outline-none focus:border-[#188F42] focus:ring-1 focus:ring-[#188F42] placeholder:text-neutral-500 transition-colors"
                />
              </div>

              {/* 2. Corporate Email */}
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-300 mb-1">
                  Corporate Email *
                </label>
                <input
                  type="email"
                  required
                  value={corporateEmail}
                  onChange={(e) => setCorporateEmail(e.target.value)}
                  placeholder="email@perusahaan.co.id"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs sm:text-sm text-white focus:outline-none focus:border-[#188F42] focus:ring-1 focus:ring-[#188F42] placeholder:text-neutral-500 transition-colors"
                />
              </div>

              {/* 3. Phone / WhatsApp */}
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-300 mb-1">
                  Phone / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0812-XXXX-XXXX"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-xs sm:text-sm text-white focus:outline-none focus:border-[#188F42] focus:ring-1 focus:ring-[#188F42] placeholder:text-neutral-500 transition-colors"
                />
              </div>

              {/* 4. Project Context */}
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-300 mb-1">
                  Project Context *
                </label>
                <textarea
                  required
                  rows={3}
                  value={projectContext}
                  onChange={(e) => setProjectContext(e.target.value)}
                  placeholder="Deskripsikan kebutuhan pelaporan (Annual Report, Sustainability Report, PROPER, dll.)..."
                  className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/15 text-xs sm:text-sm text-white focus:outline-none focus:border-[#188F42] focus:ring-1 focus:ring-[#188F42] placeholder:text-neutral-500 resize-none transition-colors"
                />
              </div>

              {/* Two Sending Options at the Bottom */}
              <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row gap-2.5">
                {/* Pilihan 1: Direct WhatsApp */}
                <button
                  type="button"
                  onClick={handleDirectWhatsApp}
                  className="flex-1 py-2.5 px-3 rounded-lg bg-[#25d366]/15 hover:bg-[#25d366]/25 border border-[#25d366]/30 text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#25d366]" />
                  <span>Direct WhatsApp</span>
                </button>

                {/* Pilihan 2: Submit Inquiry ke info@asamedia.co.id */}
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-3 rounded-lg bg-[#188F42] hover:bg-[#157d39] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors shadow-lg active:scale-[0.99]"
                >
                  <Mail className="w-3.5 h-3.5 text-white" />
                  <span>Kirim ke Email</span>
                </button>
              </div>

              <div className="text-center pt-1">
                <span className="text-[10px] font-mono text-neutral-400">
                  Email tujuan: <span className="text-neutral-300">{targetEmail}</span>
                </span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
