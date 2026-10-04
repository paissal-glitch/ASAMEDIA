import React, { useEffect } from 'react';
import { Project } from '../data/content';
import { X, CheckCircle2, ArrowUpRight, BookOpen, Layers } from 'lucide-react';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
  onConsult: (serviceName?: string) => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose, onConsult }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md transition-opacity duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0E0E0E] border border-white/20 rounded-2xl p-6 sm:p-10 text-white shadow-2xl no-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white transition-colors"
          aria-label="Close Case Study"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Metadata */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-neutral-400 mb-6">
          <span className="text-[#188F42] font-semibold tracking-wider uppercase">
            {project.category}
          </span>
          <span>·</span>
          <span>PUBLISHED {project.year}</span>
          <span>·</span>
          <span>ID: {project.code}</span>
        </div>

        {/* Title & Organization */}
        <h2 className="text-3xl sm:text-5xl font-light tracking-tight mb-2 text-white">
          {project.client}
        </h2>
        <p className="text-xs sm:text-sm font-mono text-neutral-400 mb-8 font-light">
          {project.fullName}
        </p>

        {/* Overview Box */}
        <div className="p-6 sm:p-8 rounded-xl bg-white/[0.04] border border-white/10 mb-8">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#188F42] block mb-3 font-semibold">
            Executive Summary
          </span>
          <p className="text-base sm:text-lg text-neutral-200 font-light leading-relaxed mb-4">
            {project.description}
          </p>
          {project.highlight && (
            <p className="text-xs sm:text-sm text-neutral-400 font-light italic border-l-2 border-[#188F42] pl-4 py-1">
              &ldquo;{project.highlight}&rdquo;
            </p>
          )}
        </div>

        {/* 2-Column Details: Frameworks & Outcomes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Frameworks */}
          <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10">
            <div className="flex items-center gap-2 mb-4">
              <Layers className="w-4 h-4 text-[#188F42]" />
              <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-300 font-semibold">
                Standards & Governance
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.frameworks.map((fw, idx) => (
                <span
                  key={idx}
                  className="text-xs font-mono text-neutral-200 py-1.5 px-3 rounded-lg bg-white/10 border border-white/10"
                >
                  {fw}
                </span>
              ))}
            </div>
          </div>

          {/* Deliverables */}
          <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-4 h-4 text-[#188F42]" />
              <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-300 font-semibold">
                Scope of Deliverables
              </h3>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-neutral-300 font-light">
              {project.deliverables?.map((del, dIdx) => (
                <li key={dIdx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#188F42]" />
                  <span>{del}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Key Outcomes */}
        <div className="p-6 rounded-xl bg-white/[0.03] border border-white/10 mb-8">
          <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 block mb-4 font-semibold">
            Tangible Impact & Audit Outcomes
          </span>
          <div className="space-y-3">
            {project.keyOutcomes.map((outcome, idx) => (
              <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-300 font-light">
                <CheckCircle2 className="w-4 h-4 text-[#188F42] shrink-0 mt-0.5" />
                <span className="leading-relaxed">{outcome}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Action CTA */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs font-mono text-neutral-500">
            ASA Media Portfolio Archive
          </span>

          <button
            onClick={() => {
              onClose();
              onConsult(project.category);
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-lg bg-white text-black text-xs font-semibold uppercase tracking-wider hover:bg-neutral-100 transition-colors flex items-center justify-center gap-2 shadow-lg"
          >
            <span>Consult on Similar Project</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
