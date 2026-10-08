import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  ArrowUpRight,
  ExternalLink,
  Search,
  Sparkles,
  Award
} from 'lucide-react';
import { DUBAI_MASTER_DEVELOPERS } from '../../data/dubaiDevelopersData';

type DeveloperCategoryFilter = 'all' | 'master' | 'premium' | 'boutique';

export const DevelopersPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<DeveloperCategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDevelopers = useMemo(() => {
    return DUBAI_MASTER_DEVELOPERS.filter((dev) => {
      const matchesCategory =
        activeCategory === 'all' ? true : dev.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === ''
          ? true
          : dev.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            dev.flagships.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase())) ||
            dev.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="pt-28 pb-24 bg-[#F7F3EA] min-h-screen text-[#3E4852] font-ui">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Page Header */}
        <div className="mb-12 pb-8 border-b border-[#E9E1D4] flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#102A43] text-[#D8C3A5] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#B08D57]" />
              <span className="text-[10px] uppercase font-mono tracking-widest font-semibold">
                Official 2026 Dubai Real Estate Benchmark
              </span>
            </div>
            <h1 className="font-display text-4xl lg:text-5xl text-[#102A43] font-normal tracking-tight">
              Premier Dubai Master <span className="font-normal text-[#B08D57]">Developers</span>
            </h1>
            <p className="text-xs sm:text-sm text-[#6B7280] mt-2 font-normal leading-relaxed">
              From landmark master-planners (Emaar, Nakheel, DAMAC, Meraas) to quality-focused craftsmen (Sobha, Mira, Ellington) and emerging boutique pioneers — explore the builders defining Dubai luxury.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative min-w-[260px]">
            <Search className="w-3.5 h-3.5 text-[#6B7280] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter by brand or flagship project..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FFFDF8] border border-[#E9E1D4] focus:border-[#B08D57] text-xs text-[#102A43] pl-9 pr-8 py-2.5 rounded-xs focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#6B7280] hover:text-[#102A43]"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-[#E9E1D4] text-xs font-mono">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-xs uppercase tracking-wider transition-all ${
              activeCategory === 'all'
                ? 'bg-[#102A43] text-[#F7F3EA] font-bold shadow-sm'
                : 'bg-[#FFFDF8] text-[#6B7280] hover:text-[#102A43] border border-[#E9E1D4]'
            }`}
          >
            All Developers ({DUBAI_MASTER_DEVELOPERS.length})
          </button>
          <button
            onClick={() => setActiveCategory('master')}
            className={`px-4 py-2 rounded-xs uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              activeCategory === 'master'
                ? 'bg-[#102A43] text-[#F7F3EA] font-bold shadow-sm'
                : 'bg-[#FFFDF8] text-[#6B7280] hover:text-[#102A43] border border-[#E9E1D4]'
            }`}
          >
            <span>Major Master-Developers</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-[#B08D57]/20 text-[#B08D57] font-bold">4</span>
          </button>
          <button
            onClick={() => setActiveCategory('premium')}
            className={`px-4 py-2 rounded-xs uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              activeCategory === 'premium'
                ? 'bg-[#102A43] text-[#F7F3EA] font-bold shadow-sm'
                : 'bg-[#FFFDF8] text-[#6B7280] hover:text-[#102A43] border border-[#E9E1D4]'
            }`}
          >
            <span>Premium / Quality-Focused</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-[#B08D57]/20 text-[#B08D57] font-bold">4</span>
          </button>
          <button
            onClick={() => setActiveCategory('boutique')}
            className={`px-4 py-2 rounded-xs uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              activeCategory === 'boutique'
                ? 'bg-[#102A43] text-[#F7F3EA] font-bold shadow-sm'
                : 'bg-[#FFFDF8] text-[#6B7280] hover:text-[#102A43] border border-[#E9E1D4]'
            }`}
          >
            <span>Notable & Boutique Innovators</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-[#B08D57]/20 text-[#B08D57] font-bold">6</span>
          </button>
        </div>

        {/* Developers Grid */}
        {filteredDevelopers.length === 0 ? (
          <div className="text-center py-20 bg-[#FFFDF8] border border-[#E9E1D4] p-8 rounded-xs shadow-sm">
            <Building2 className="w-12 h-12 text-[#B08D57]/40 mx-auto mb-3" />
            <h3 className="font-display text-xl text-[#102A43]">No developers match "{searchQuery}"</h3>
            <p className="text-xs text-[#6B7280] mt-1 max-w-sm mx-auto">
              Please check your spelling or search for Emaar, Nakheel, DAMAC, Meraas, Sobha, or Ellington.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="mt-4 px-4 py-2 bg-[#102A43] text-[#D8C3A5] text-xs font-mono uppercase font-bold rounded-xs hover:bg-[#0B2135]"
            >
              Reset Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDevelopers.map((dev) => (
              <div
                key={dev.id}
                className="bg-[#FFFDF8] border border-[#E9E1D4] hover:border-[#B08D57] p-7 transition-all rounded-xs shadow-xs group flex flex-col justify-between hover:shadow-md"
              >
                <div>
                  {/* Top Bar: Monogram & Brand Badge */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xs bg-[#102A43] text-[#D8C3A5] border border-[#B08D57] flex items-center justify-center font-display text-lg font-bold shrink-0 group-hover:bg-[#B08D57] group-hover:text-[#102A43] transition-colors">
                        {dev.monogram}
                      </div>
                      <div>
                        {/* HIGHLIGHTED BRAND NAME */}
                        <h2 className="font-display text-2xl text-[#102A43] font-normal group-hover:text-[#B08D57] transition-colors">
                          {dev.name}
                        </h2>
                        <span className="text-[10px] font-mono text-[#B08D57] uppercase tracking-wider font-semibold block">
                          {dev.tierBadge}
                        </span>
                      </div>
                    </div>

                    <a
                      href={dev.citationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#6B7280] hover:text-[#B08D57] p-1 transition-colors"
                      title="Resident Authority Guide Citation"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  {/* Flagship Projects Pills */}
                  <div className="mb-4">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-[#6B7280] block mb-1.5 font-semibold">
                      Master Communities & Flagships:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {dev.flagships.map((f, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 text-[11px] font-ui bg-[#F7F3EA] border border-[#E9E1D4] text-[#102A43] rounded-xs font-medium"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-[#3E4852] leading-relaxed font-normal mb-6">
                    {dev.description}
                  </p>
                </div>

                {/* Footer Link */}
                <div className="pt-4 border-t border-[#E9E1D4] flex items-center justify-between text-xs font-mono">
                  <span className="text-[11px] text-[#6B7280] italic truncate max-w-[180px]">
                    {dev.signatureStyle}
                  </span>
                  <Link
                    to={`/properties?developer=${encodeURIComponent(dev.offPlanFilter)}`}
                    className="inline-flex items-center gap-1 text-[#102A43] group-hover:text-[#B08D57] uppercase font-bold tracking-wider transition-colors"
                  >
                    <span>View Projects</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#B08D57]" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Source Citation & Benchmark Note */}
        <div className="mt-16 p-6 bg-[#FFFDF8] border border-[#E9E1D4] rounded-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#6B7280] shadow-sm">
          <div className="flex items-center gap-3">
            <Award className="w-5 h-5 text-[#B08D57] shrink-0" />
            <div>
              <span className="text-[#102A43] font-semibold block font-ui text-sm">
                Resident Magazine Top 10 Dubai Real Estate Developers Guide (2026 Edition)
              </span>
              <span className="text-[11px]">
                Grounding data covering master-developers, vertically integrated construction leaders, and emerging boutique builders.
              </span>
            </div>
          </div>
          <a
            href="https://resident.com/resource-guide/2026/01/21/dubai-names-top-10-real-estate-developers-in-2026"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-[#102A43] hover:bg-[#0B2135] text-[#D8C3A5] text-xs uppercase tracking-wider font-bold rounded-xs flex items-center gap-1.5 shrink-0 transition-colors"
          >
            <span>Read Benchmark Source</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
export default DevelopersPage;
