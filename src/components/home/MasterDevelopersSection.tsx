import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ExternalLink, Sparkles } from 'lucide-react';
import { DUBAI_MASTER_DEVELOPERS, IDeveloperBrand } from '../../data/dubaiDevelopersData';

type DeveloperCategoryTab = 'master' | 'premium' | 'boutique';

export const MasterDevelopersSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<DeveloperCategoryTab>('master');

  const activeDevelopers = DUBAI_MASTER_DEVELOPERS.filter(
    (dev) => dev.category === activeTab
  );

  return (
    <section className="py-16 lg:py-20 bg-[#0B2135] text-[#F7F3EA] relative overflow-hidden border-t border-b border-[#1E3A5F] font-ui">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#B08D57]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-[#1E3A5F] gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#102A43] border border-[#B08D57]/40 text-[#D8C3A5] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#B08D57]" />
              <span className="text-[10px] uppercase font-mono tracking-widest font-semibold">
                Dubai Master Builders & Pioneers
              </span>
            </div>
            <h2 className="font-display text-3xl lg:text-4xl text-[#F7F3EA] font-normal tracking-tight">
              Dubai's Landmark <span className="text-[#B08D57]">Developers</span>
            </h2>
            <p className="text-xs text-[#E9E1D4]/80 font-normal mt-1.5 max-w-xl leading-relaxed font-ui">
              Curated master-planners, branded residence innovators, and boutique design studios shaping Dubai's skyline.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/developers"
              className="text-xs uppercase font-mono tracking-wider text-[#B08D57] hover:text-[#D8C3A5] flex items-center gap-1.5 transition-colors font-medium"
            >
              <span>View Full Directory (14)</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Category Tabs: Compact & Interactive */}
        <div className="flex flex-wrap items-center gap-2 mb-8 text-xs font-mono">
          <button
            onClick={() => setActiveTab('master')}
            className={`px-4 py-2 rounded-xs uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === 'master'
                ? 'bg-[#B08D57] text-[#102A43] font-bold shadow-sm'
                : 'bg-[#102A43] text-[#E9E1D4]/80 hover:text-[#F7F3EA] border border-[#1E3A5F]'
            }`}
          >
            <span>Major Master-Developers</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-[#102A43]/20 font-bold">4</span>
          </button>
          <button
            onClick={() => setActiveTab('premium')}
            className={`px-4 py-2 rounded-xs uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === 'premium'
                ? 'bg-[#B08D57] text-[#102A43] font-bold shadow-sm'
                : 'bg-[#102A43] text-[#E9E1D4]/80 hover:text-[#F7F3EA] border border-[#1E3A5F]'
            }`}
          >
            <span>Premium / Quality-Focused</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-[#102A43]/20 font-bold">4</span>
          </button>
          <button
            onClick={() => setActiveTab('boutique')}
            className={`px-4 py-2 rounded-xs uppercase tracking-wider transition-all flex items-center gap-2 ${
              activeTab === 'boutique'
                ? 'bg-[#B08D57] text-[#102A43] font-bold shadow-sm'
                : 'bg-[#102A43] text-[#E9E1D4]/80 hover:text-[#F7F3EA] border border-[#1E3A5F]'
            }`}
          >
            <span>Notable & Boutique Innovators</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-[#102A43]/20 font-bold">6</span>
          </button>
        </div>

        {/* Compact Cards Grid (Only 4 or 6 cards displayed at a time) */}
        <div className={`grid gap-5 ${
          activeTab === 'boutique'
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
        }`}>
          {activeDevelopers.map((dev) => (
            <div
              key={dev.id}
              className="bg-[#102A43] border border-[#1E3A5F] hover:border-[#B08D57] p-5 rounded-xs transition-all group flex flex-col justify-between hover:shadow-lg"
            >
              <div>
                {/* Brand Monogram & High-Contrast Highlighted Name */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xs bg-[#0B2135] border border-[#B08D57] flex items-center justify-center font-display text-sm font-bold text-[#D8C3A5] group-hover:bg-[#B08D57] group-hover:text-[#102A43] transition-colors shrink-0">
                    {dev.monogram}
                  </div>
                  <div className="min-w-0">
                    {/* PROMINENT HIGHLIGHTED BRAND NAME */}
                    <h3 className="font-display text-lg lg:text-xl font-normal text-[#F7F3EA] group-hover:text-[#D8C3A5] transition-colors truncate">
                      {dev.name}
                    </h3>
                    <span className="text-[9px] font-mono text-[#B08D57] uppercase tracking-wider block font-semibold truncate">
                      {dev.tierBadge}
                    </span>
                  </div>
                </div>

                {/* Key Flagships Chips */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {dev.flagships.slice(0, 3).map((f, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 text-[10px] bg-[#0B2135] border border-[#1E3A5F] text-[#E9E1D4] rounded-xs font-ui line-clamp-1"
                    >
                      {f}
                    </span>
                  ))}
                  {dev.flagships.length > 3 && (
                    <span className="px-1.5 py-0.5 text-[9px] font-mono text-[#D8C3A5]">
                      +{dev.flagships.length - 3}
                    </span>
                  )}
                </div>

                {/* Concise Core Description */}
                <p className="text-xs text-[#E9E1D4]/75 font-normal leading-relaxed mb-4 line-clamp-3 font-ui">
                  {dev.description}
                </p>
              </div>

              {/* Card Footer Link */}
              <div className="pt-3 border-t border-[#1E3A5F] flex items-center justify-between text-xs font-mono">
                <span className="text-[10px] text-[#E9E1D4]/60 truncate max-w-[130px]">
                  {dev.signatureStyle}
                </span>
                <Link
                  to={`/properties/off-plan?developer=${encodeURIComponent(dev.offPlanFilter)}`}
                  className="text-[#B08D57] hover:text-[#D8C3A5] uppercase font-bold text-[11px] tracking-wider flex items-center gap-1 shrink-0 transition-colors"
                >
                  <span>Explore</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Sleek Bottom Strip: Brand Marquee & Citation Link */}
        <div className="mt-8 pt-5 border-t border-[#1E3A5F] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-[#E9E1D4]/60">
          <div className="flex items-center gap-2 text-[11px]">
            <span className="text-[#B08D57] font-semibold">2026 Dubai Real Estate Benchmark:</span>
            <span className="hidden md:inline">Emaar • Nakheel • DAMAC • Meraas • Sobha • Mira • Ellington • Azizi • Ithra • Deca</span>
          </div>

          <a
            href="https://resident.com/resource-guide/2026/01/21/dubai-names-top-10-real-estate-developers-in-2026"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] uppercase text-[#E9E1D4]/70 hover:text-[#B08D57] flex items-center gap-1 transition-colors shrink-0"
          >
            <span>Resident Authority Source Guide</span>
            <ExternalLink className="w-3 h-3 text-[#B08D57]" />
          </a>
        </div>
      </div>
    </section>
  );
};
