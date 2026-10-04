import React, { useState } from 'react';
import { ArrowUpRight, X, Clock, Calendar } from 'lucide-react';

interface Article {
  id: string;
  category: 'Sustainability' | 'ESG' | 'Reporting' | 'Corporate Communication';
  title: string;
  date: string;
  readTime: string;
  summary: string;
  content: string[];
}

export const Insights: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const articles: Article[] = [
    {
      id: 'pojk-51',
      category: 'Sustainability',
      title: 'Navigating OJK POJK 51: Beyond Compliance to Genuine Impact',
      date: 'April 2026',
      readTime: '4 min read',
      summary:
        'Why Indonesian listed entities must shift from superficial box-ticking to rigorous, auditable ESG disclosure architectures.',
      content: [
        'Since the enactment of POJK No. 51/POJK.03/2017, Indonesian corporations have made commendable progress in publishing sustainability disclosures. However, as international asset allocators scrutinize Southeast Asian portfolios with increasing rigor, superficial compliance is no longer sufficient.',
        'Regulators and investors are looking for verifiable alignment between sustainability commitments and capital allocation. This requires rigorous greenhouse gas accounting across Scopes 1, 2, and 3, auditable community impact metrics, and board-level oversight.',
        'At ASA Media, we help our partners transform statutory disclosure obligations into an authentic competitive differentiator that attracts long-term capital and safeguards corporate reputation.',
      ],
    },
    {
      id: 'issb-standards',
      category: 'ESG',
      title: 'The Evolution of Global ESG Ratings: Preparing for IFRS S1 & S2',
      date: 'March 2026',
      readTime: '5 min read',
      summary:
        'How international sustainability standards will affect Indonesian conglomerates and regional supply chain participants.',
      content: [
        'The International Sustainability Standards Board (ISSB) has fundamentally altered the global corporate reporting landscape with IFRS S1 (General Requirements) and IFRS S2 (Climate-related Disclosures).',
        'While emerging markets navigate unique socio-economic transitions, global institutional investors increasingly demand uniform, comparable metrics. Conglomerates that integrate TCFD and ISSB disclosures early gain a marked advantage in global bond and equity markets.',
        'We work alongside Indonesian companies to conduct preliminary gap analyses, establish baseline GHG inventories, and format climate risk resilience narratives that meet international muster.',
      ],
    },
    {
      id: 'annual-report-craft',
      category: 'Reporting',
      title: 'The Craft of Annual Reporting: Integrating Numbers with Narrative',
      date: 'February 2026',
      readTime: '4 min read',
      summary:
        'Transforming the traditional annual report from an intimidating financial document into a compelling story of resilience.',
      content: [
        'An annual report is arguably the most authoritative cultural artifact a corporation produces each year. It is reviewed by institutional analysts, rating agencies, prospective partners, and judicial regulators.',
        'A truly effective annual report synthesizes financial performance tables with strategic leadership narrative, human capital culture, and long-term vision. Typography, pacing, and visual clarity are not mere aesthetic choices; they are instruments of corporate credibility.',
      ],
    },
    {
      id: 'corp-comm',
      category: 'Corporate Communication',
      title: 'Beyond Jargon: Translating Complex Environmental Data into Meaning',
      date: 'January 2026',
      readTime: '3 min read',
      summary:
        'How creative communication bridges the gap between technical sustainability documentation and employee culture.',
      content: [
        'Megawatts of renewable energy avoided, gigajoules of heat conservation, and biological diversity indices often mean little to the general public or company staff when presented as isolated numbers.',
        'Through bespoke executive calendars, internal culture magazines, and interactive data infographics, ASA Media translates complex technical data into inspiring stories that unite corporate culture and resonate with everyday stakeholders.',
      ],
    },
  ];

  return (
    <section id="insights" className="w-full bg-[#050505] text-[#F7F7F5] py-28 sm:py-36 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 sm:mb-20">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-[2px] bg-[#188F42]" />
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#188F42]">
                THOUGHT LEADERSHIP
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight leading-[1.05] text-white">
              Perspectives
            </h2>
          </div>

          <p className="text-sm sm:text-base text-neutral-400 max-w-md font-light leading-relaxed">
            Critical perspectives on Indonesian corporate governance, OJK compliance, ESG rating
            methodologies, and reporting strategy.
          </p>
        </div>

        {/* 4 Editorial Article Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {articles.map((article) => (
            <div
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="group cursor-pointer p-8 sm:p-10 rounded-2xl bg-[#0E0E0E] border border-white/10 hover:border-[#188F42]/80 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#188F42] font-semibold">
                    {article.category}
                  </span>
                  <div className="flex items-center gap-3 text-xs font-mono text-neutral-400">
                    <span>{article.date}</span>
                    <span>·</span>
                    <span>{article.readTime}</span>
                  </div>
                </div>

                <h3 className="text-2xl sm:text-3xl font-light tracking-tight text-white mb-4 group-hover:text-white transition-colors">
                  {article.title}
                </h3>

                <p className="text-sm text-neutral-400 font-light leading-relaxed mb-6">
                  {article.summary}
                </p>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-medium text-white group-hover:text-[#188F42] transition-colors">
                <span>Read Full Perspective</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Article Reader Modal */}
      {selectedArticle && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          onClick={() => setSelectedArticle(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto bg-[#111317] border border-white/20 rounded-2xl p-6 sm:p-10 text-white shadow-2xl no-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white transition-colors"
              aria-label="Close article modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-[#188F42] font-semibold">
                {selectedArticle.category}
              </span>
              <span className="text-neutral-500">·</span>
              <span className="text-xs font-mono text-neutral-400">{selectedArticle.date}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-white mb-6">
              {selectedArticle.title}
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-neutral-300 font-light leading-relaxed border-t border-white/10 pt-6">
              {selectedArticle.content.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-neutral-400">
              <span>ASA Media Research & Thought Leadership</span>
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-4 py-2 rounded-lg bg-white text-black font-semibold uppercase tracking-wider text-xs hover:bg-gray-100 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
