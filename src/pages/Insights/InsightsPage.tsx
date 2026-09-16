import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import {
  DUBAI_GOVERNMENT_KPIS,
  OFFICIAL_DUBAI_INSIGHTS,
  OfficialInsightArticle
} from '../../data/dubaiGovernmentInsights';
import {
  HandoverTimelineChart,
  TopDevelopersChart,
  AreaHotspotsChart,
  SupplyZoningMetrics,
  BenchmarkValuationsTable
} from '../../components/insights/InsightsCharts';
import {
  TrendingUp,
  Award,
  MapPin,
  Layers,
  Clock,
  ArrowRight,
  ShieldCheck,
  Search,
  Database,
  Building,
  CheckCircle2,
  FileSpreadsheet
} from 'lucide-react';

const CATEGORIES = [
  'All Intelligence',
  'Market Report',
  'Supply & Delivery',
  'Developer Analysis',
  'Legal & Land',
  'Valuations & Pricing',
  'Industry Insights'
];

type AnalyticsTab = 'handover' | 'developers' | 'areas' | 'dynamics' | 'valuations';

export const InsightsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AnalyticsTab>('handover');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Intelligence');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [articles, setArticles] = useState<OfficialInsightArticle[]>(OFFICIAL_DUBAI_INSIGHTS);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function loadBackendInsights() {
      try {
        const res = await api.getInsights();
        if (res?.insights && res.insights.length > 0) {
          // Merge or prioritize official government articles
          const backendSlugs = new Set(res.insights.map((i: any) => i.slug));
          const merged = [
            ...OFFICIAL_DUBAI_INSIGHTS,
            ...res.insights.filter((i: any) => !backendSlugs.has(i.slug))
          ];
          setArticles(merged);
        }
      } catch (err) {
        // Fallback already set to OFFICIAL_DUBAI_INSIGHTS
        console.info('Using verified local Government of Dubai insights dataset.');
      }
    }
    loadBackendInsights();
  }, []);

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesCat =
        selectedCategory === 'All Intelligence' ||
        article.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch =
        !searchQuery ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCat && matchesSearch;
    });
  }, [articles, selectedCategory, searchQuery]);

  return (
    <div className="pt-28 pb-24 bg-[#FDFCF9] min-h-screen text-[#18181A]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Official Government Verification Header */}
        <div className="mb-10 pb-8 border-b border-[#E5E0D8]">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#18181A] text-[#C5A880] text-[10px] uppercase font-mono tracking-widest font-semibold rounded-xs mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Government of Dubai • Official Real Estate Intelligence</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#18181A] font-light tracking-tight leading-none">
                Dubai Market Intelligence
              </h1>
              <p className="text-xs sm:text-sm text-[#71717A] mt-3 max-w-2xl leading-relaxed font-light">
                Empirical market analytics, mega-project pipelines, and land valuations synthesized directly
                from the official Dubai Land Department (DLD) and Real Estate Regulatory Agency (RERA) registries.
              </p>
            </div>

            <div className="flex items-center gap-3 bg-[#F7F5F0] border border-[#E5E0D8] p-3 rounded-xs text-[11px] font-mono">
              <Database className="w-4 h-4 text-[#C5A880]" />
              <div>
                <span className="block text-[#18181A] font-semibold">Active Official Data Cycle</span>
                <span className="text-[#71717A]">{DUBAI_GOVERNMENT_KPIS.dataDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Executive Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          <div className="bg-[#18181A] text-white p-6 rounded-sm border border-[#2A2A2E] shadow-sm">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A880] font-mono block mb-2">
              DLD Pipeline Value
            </span>
            <div className="font-serif text-3xl sm:text-4xl text-white font-light mb-2">
              AED {DUBAI_GOVERNMENT_KPIS.totalPipelineValueBillion}B
            </div>
            <div className="flex items-center justify-between text-xs text-[#A1A1AA] pt-3 border-t border-[#2A2A2E] font-mono">
              <span>{DUBAI_GOVERNMENT_KPIS.totalProjects} Mega-Projects</span>
              <span className="text-[#C5A880] font-bold">75.9% Active</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-sm border border-[#E5E0D8] shadow-sm">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A880] font-mono block mb-2">
              Supply In Progress
            </span>
            <div className="font-serif text-3xl sm:text-4xl text-[#18181A] font-light mb-2">
              {DUBAI_GOVERNMENT_KPIS.totalUnits.toLocaleString()}
            </div>
            <div className="flex items-center justify-between text-xs text-[#71717A] pt-3 border-t border-[#E5E0D8] font-mono">
              <span>Units in Pipeline</span>
              <span className="text-[#18181A] font-bold">{DUBAI_GOVERNMENT_KPIS.totalVillas.toLocaleString()} Luxury Villas</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-sm border border-[#E5E0D8] shadow-sm">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A880] font-mono block mb-2">
              Supply Equilibrium
            </span>
            <div className="font-serif text-3xl sm:text-4xl text-[#18181A] font-light mb-2">
              {DUBAI_GOVERNMENT_KPIS.readyPct}% <span className="text-xl font-sans text-[#71717A]">/</span> {DUBAI_GOVERNMENT_KPIS.offplanPct}%
            </div>
            <div className="flex items-center justify-between text-xs text-[#71717A] pt-3 border-t border-[#E5E0D8] font-mono">
              <span>Ready vs. Off-Plan</span>
              <span className="text-[#18181A] font-bold">12,273 Buildings</span>
            </div>
          </div>

          <div className="bg-[#18181A] text-white p-6 rounded-sm border border-[#2A2A2E] shadow-sm">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A880] font-mono block mb-2">
              Regulated Ecosystem
            </span>
            <div className="font-serif text-3xl sm:text-4xl text-white font-light mb-2">
              {DUBAI_GOVERNMENT_KPIS.licensedBrokers.toLocaleString()}
            </div>
            <div className="flex items-center justify-between text-xs text-[#A1A1AA] pt-3 border-t border-[#2A2A2E] font-mono">
              <span>Licensed Brokers</span>
              <span className="text-[#C5A880] font-bold">194 Developers</span>
            </div>
          </div>
        </div>

        {/* Interactive Analytics Dashboard */}
        <section className="mb-20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-mono font-semibold block mb-1">
                Visual Market Graphs
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#18181A] font-light">
                Empirical Market Breakdown
              </h2>
            </div>

            {/* Tab Selector */}
            <div className="flex flex-wrap gap-1 bg-[#F7F5F0] p-1 border border-[#E5E0D8] rounded-xs text-xs font-mono">
              <button
                onClick={() => setActiveTab('handover')}
                className={`px-3 py-1.5 rounded-xs transition-all ${
                  activeTab === 'handover'
                    ? 'bg-[#18181A] text-[#C5A880] font-bold shadow-sm'
                    : 'text-[#71717A] hover:text-[#18181A]'
                }`}
              >
                Handover Wave
              </button>
              <button
                onClick={() => setActiveTab('developers')}
                className={`px-3 py-1.5 rounded-xs transition-all ${
                  activeTab === 'developers'
                    ? 'bg-[#18181A] text-[#C5A880] font-bold shadow-sm'
                    : 'text-[#71717A] hover:text-[#18181A]'
                }`}
              >
                Developer Capital
              </button>
              <button
                onClick={() => setActiveTab('areas')}
                className={`px-3 py-1.5 rounded-xs transition-all ${
                  activeTab === 'areas'
                    ? 'bg-[#18181A] text-[#C5A880] font-bold shadow-sm'
                    : 'text-[#71717A] hover:text-[#18181A]'
                }`}
              >
                Growth Hotspots
              </button>
              <button
                onClick={() => setActiveTab('dynamics')}
                className={`px-3 py-1.5 rounded-xs transition-all ${
                  activeTab === 'dynamics'
                    ? 'bg-[#18181A] text-[#C5A880] font-bold shadow-sm'
                    : 'text-[#71717A] hover:text-[#18181A]'
                }`}
              >
                Supply & Zoning
              </button>
              <button
                onClick={() => setActiveTab('valuations')}
                className={`px-3 py-1.5 rounded-xs transition-all ${
                  activeTab === 'valuations'
                    ? 'bg-[#18181A] text-[#C5A880] font-bold shadow-sm'
                    : 'text-[#71717A] hover:text-[#18181A]'
                }`}
              >
                Benchmark Valuations
              </button>
            </div>
          </div>

          {/* Render Active Chart */}
          <div className="transition-all duration-300">
            {activeTab === 'handover' && <HandoverTimelineChart />}
            {activeTab === 'developers' && <TopDevelopersChart />}
            {activeTab === 'areas' && <AreaHotspotsChart />}
            {activeTab === 'dynamics' && <SupplyZoningMetrics />}
            {activeTab === 'valuations' && <BenchmarkValuationsTable />}
          </div>
        </section>

        {/* Editorial Intelligence & Research Reports */}
        <section className="mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-4 border-b border-[#E5E0D8]">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-mono font-semibold block mb-1">
                Curated Analysis
              </span>
              <h2 className="font-serif text-3xl text-[#18181A] font-light">
                Official Intelligence Reports
              </h2>
              <p className="text-xs text-[#71717A] mt-1 font-light">
                Exhaustive quarterly studies and deep dives powered by Government of Dubai records.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-[#A1A1AA] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search reports or topics..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#E5E0D8] focus:border-[#C5A880] focus:outline-none rounded-xs font-mono"
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 mb-10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 text-xs font-mono uppercase tracking-wider transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#18181A] text-[#C5A880] font-bold shadow-xs'
                    : 'bg-[#F7F5F0] text-[#71717A] border border-[#E5E0D8] hover:text-[#18181A]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <Link
                key={article.slug}
                to={`/insights/${article.slug}`}
                className="group flex flex-col bg-white border border-[#E5E0D8] hover:border-[#C5A880] transition-all overflow-hidden shadow-xs hover:shadow-md"
              >
                {/* Image Cover */}
                <div className="aspect-[16/10] overflow-hidden bg-[#18181A] relative">
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 bg-[#18181A]/90 backdrop-blur-xs text-[#C5A880] text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 font-semibold border border-[#C5A880]/30">
                    {article.category}
                  </span>
                </div>

                {/* Content Box */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <div className="flex items-center gap-2 text-[10px] font-mono text-[#71717A] mb-2.5">
                      <span>{article.publishedDate}</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#C5A880]" />
                        <span>{article.readingTimeMinutes} min read</span>
                      </div>
                    </div>

                    <h3 className="font-serif text-xl text-[#18181A] group-hover:text-[#C5A880] transition-colors leading-snug mb-3">
                      {article.title}
                    </h3>

                    <p className="text-xs text-[#71717A] line-clamp-3 leading-relaxed font-light mb-4">
                      {article.excerpt}
                    </p>

                    {/* Key Stats Pill Strip */}
                    {article.keyStats && article.keyStats.length > 0 && (
                      <div className="grid grid-cols-2 gap-2 mb-4 pt-3 border-t border-[#E5E0D8]">
                        {article.keyStats.slice(0, 2).map((st) => (
                          <div key={st.label} className="bg-[#F7F5F0] p-2 rounded-xs">
                            <span className="text-[9px] uppercase font-mono text-[#71717A] block leading-tight">
                              {st.label}
                            </span>
                            <span className="text-[11px] font-mono font-bold text-[#18181A]">
                              {st.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-[#E5E0D8] text-[10px] uppercase font-mono tracking-wider flex justify-between items-center text-[#71717A]">
                    <span>{article.author.name}</span>
                    <span className="text-[#18181A] group-hover:text-[#C5A880] font-bold flex items-center gap-1">
                      Full Study <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-16 bg-[#F7F5F0] border border-[#E5E0D8] p-8">
              <p className="text-sm font-serif text-[#71717A] mb-2">No matching intelligence reports found.</p>
              <button
                onClick={() => {
                  setSelectedCategory('All Intelligence');
                  setSearchQuery('');
                }}
                className="text-xs uppercase font-mono text-[#C5A880] font-bold"
              >
                Clear filters
              </button>
            </div>
          )}
        </section>

        {/* Methodology & Official Data Transparency Footnote */}
        <section className="bg-[#18181A] text-white p-8 rounded-sm border border-[#2A2A2E]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#2A2A2E]">
            <div className="flex items-center gap-3">
              <FileSpreadsheet className="w-6 h-6 text-[#C5A880]" />
              <div>
                <h3 className="font-serif text-lg text-white font-normal">
                  Official Open Data Methodology & Statutory Compliance
                </h3>
                <p className="text-xs text-[#A1A1AA]">
                  Data Grounding: Dubai Land Department (DLD) & RERA Open Data Registries (Cycle: September 2026)
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-mono text-[#C5A880]">
              <CheckCircle2 className="w-4 h-4" />
              <span>Certified Open Records</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#A1A1AA] font-light leading-relaxed">
            <div>
              <span className="text-white font-mono font-medium block mb-1">
                1. Mega-Project Pipeline Auditing
              </span>
              Synthesized from 332 active municipal schemes. Capital valuations represent verified engineering escrow allocations deposited under UAE Law No. 8 of 2007.
            </div>
            <div>
              <span className="text-white font-mono font-medium block mb-1">
                2. Land Registry & Spatial Zoning
              </span>
              Calculated across 262,455 recorded land parcels, categorizing freehold boundaries, industrial masterplans, and commercial development corridors.
            </div>
            <div>
              <span className="text-white font-mono font-medium block mb-1">
                3. Brokerage & Regulatory Licensing
              </span>
              Cross-referenced with 43,388 certified real estate broker licenses (BRN) and 194 registered master developers authorized by RERA.
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
