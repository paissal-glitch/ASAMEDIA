import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle2 } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [details, setDetails] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const targetEmail = 'info@asamedia.co.id';
  const whatsappNumber = '6282114252531';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;

    const subject = encodeURIComponent(`Consultation Request: ${fullName}`);
    const body = encodeURIComponent(
      `Halo ASA Media / PT Azarya Sanjaya Arunika,\n\n` +
      `Berikut rincian konsultasi saya:\n` +
      `• Full Name: ${fullName}\n` +
      `• Email: ${email}\n` +
      `• Phone Number: ${phone}\n` +
      `• More Details:\n${details}\n\n` +
      `---\nDikirim melalui situs resmi ASA Media`
    );

    window.location.href = `mailto:${targetEmail}?subject=${subject}&body=${body}`;
    setIsSubmitted(true);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Halo ASA Media, saya ${fullName || 'Klien'}.\nEmail: ${email || '-'}\nPhone: ${phone || '-'}\nKebutuhan: ${details || 'Konsultasi Sustainability / Annual Report'}`
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <section id="contact" className="w-full bg-[#050505] text-[#F7F7F5] py-24 sm:py-32 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Direct Inquiries & Jakarta HQ (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-[2px] bg-[#188F42]" />
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#188F42]">
                  CONSULTATION
                </span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white mb-6">
                Initiate a <br />
                <span className="font-normal text-white">Conversation.</span>
              </h2>

              <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed mb-8 max-w-md">
                Whether you are preparing for your upcoming OJK POJK 51 filing, targeting PROPER Emas,
                or planning your annual corporate report, our senior consultants are ready to assist.
              </p>

              <div className="space-y-4 text-xs sm:text-sm text-neutral-300 font-light">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#188F42] shrink-0 mt-1" />
                  <div>
                    <p className="font-medium text-white">Infiniti Office, Permata Regency D/37</p>
                    <p className="text-neutral-400">Jl. H. Kelik Srengseng, Kembangan</p>
                    <p className="text-neutral-400">Jakarta Barat 11630, Indonesia</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#188F42] shrink-0" />
                  <a href="tel:082114252531" className="hover:text-white transition-colors font-mono">
                    0821 1425 2531
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#188F42] shrink-0" />
                  <a
                    href="mailto:info@asamedia.co.id"
                    className="hover:text-white transition-colors font-mono"
                  >
                    info@asamedia.co.id
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-white/10">
              <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 block mb-2 font-medium">
                LEGAL ENTITY
              </span>
              <p className="text-xs text-neutral-400 font-mono">
                PT Azarya Sanjaya Arunika (PT ASA MEDIA)
              </p>
            </div>
          </div>

          {/* Right Column: Modern & Minimal Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-2xl bg-[#0A0A0A] border border-white/10">
              {isSubmitted ? (
                <div className="py-12 text-center flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-[#188F42]/20 border border-[#188F42] flex items-center justify-center text-[#188F42] mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-light text-white mb-2">Inquiry Ready</h3>
                  <p className="text-sm text-neutral-400 max-w-md font-light leading-relaxed mb-6">
                    Inquiry Anda telah disiapkan. Email composer telah terbuka menuju{' '}
                    <span className="text-white font-mono">{targetEmail}</span>. Tim kami akan segera
                    menghubungi Anda.
                  </p>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={handleWhatsApp}
                      className="px-6 py-2.5 rounded-lg bg-[#25d366]/20 border border-[#25d366]/40 text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#25d366]/30 transition-colors flex items-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4 text-[#25d366]" />
                      <span>WhatsApp Langsung</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsSubmitted(false)}
                      className="px-6 py-2.5 rounded-lg bg-white text-black text-xs font-semibold uppercase tracking-wider hover:bg-neutral-100 transition-colors"
                    >
                      Reset Form
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Budi Pratama"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#188F42] focus:ring-1 focus:ring-[#188F42] transition-colors"
                    />
                  </div>

                  {/* 2-Column: Email & Phone Number */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@company.co.id"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#188F42] focus:ring-1 focus:ring-[#188F42] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="0812-XXXX-XXXX"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#188F42] focus:ring-1 focus:ring-[#188F42] transition-colors"
                      />
                    </div>
                  </div>

                  {/* More Details */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-2">
                      More Details
                    </label>
                    <textarea
                      rows={4}
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      placeholder="Tell us where your sustainability journey is headed..."
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#188F42] focus:ring-1 focus:ring-[#188F42] transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button & Direct WhatsApp */}
                  <div className="pt-2 flex flex-col sm:flex-row gap-3 items-center justify-between">
                    <button
                      type="button"
                      onClick={handleWhatsApp}
                      className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                    >
                      <MessageSquare className="w-4 h-4 text-[#25d366]" />
                      <span>Direct WhatsApp</span>
                    </button>

                    <button
                      type="submit"
                      className="w-full sm:w-auto px-10 py-3.5 rounded-xl bg-[#188F42] hover:bg-[#157d39] text-white text-xs font-semibold uppercase tracking-wider transition-all duration-200 shadow-lg active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
