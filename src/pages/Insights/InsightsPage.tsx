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
import { SpeakAdvisorModal } from '../../components/common/SpeakAdvisorModal';
import dubaiMarina from '../../../assets/landing pages image/dubai-marina.jpg';
import {
  Clock,
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Search,
  Database,
  BarChart3,
  BookOpen,
  Building2,
  Landmark,
  Sparkles,
  X
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

const ANALYTICS_TABS: Array<{ id: AnalyticsTab; index: string; label: string; sub: string }> = [
  { id: 'handover', index: '01', label: 'Handover Wave', sub: '2027–2032 Delivery Forecast' },
  { id: 'developers', index: '02', label: 'Developer Capital', sub: 'Master Developer Share' },
  { id: 'areas', index: '03', label: 'Growth Hotspots', sub: 'District Capital Allocation' },
  { id: 'dynamics', index: '04', label: 'Supply & Zoning', sub: 'Freehold & Escrow Metrics' },
  { id: 'valuations', index: '05', label: 'Benchmark Valuations', sub: 'Audited DLD Transactions' }
];

export const InsightsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AnalyticsTab>('handover');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Intelligence');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [articles, setArticles] = useState<OfficialInsightArticle[]>(OFFICIAL_DUBAI_INSIGHTS);
  const [isAdvisorModalOpen, setIsAdvisorModalOpen] = useState(false);

  useEffect(() => {
    async function loadBackendInsights() {
      try {
        const res = await api.getInsights();
        if (res?.insights && res.insights.length > 0) {
          const backendSlugs = new Set(res.insights.map((i: any) => i.slug));
          const merged = [
            ...OFFICIAL_DUBAI_INSIGHTS,
            ...res.insights.filter((i: any) => !backendSlugs.has(i.slug))
          ];
          setArticles(merged);
        }
      } catch (err) {
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

  const flagshipArticle = filteredArticles.length > 0 ? filteredArticles[0] : null;
  const secondaryArticles = filteredArticles.length > 1 ? filteredArticles.slice(1) : [];

  return (
    <div className="bg-[#F7F3EA] min-h-screen text-[#3E4852] font-ui antialiased">
      {/* ================================================================= */}
      {/* 1. LUXURY ARCHITECTURAL HERO BANNER                               */}
      {/* ================================================================= */}
      <section className="relative bg-[#0B2135] text-[#F7F3EA] pt-36 pb-28 lg:pt-44 lg:pb-36 overflow-hidden border-b border-[#B08D57]/30">
        <img
          src={dubaiMarina}
          alt="Dubai Market Intelligence & Sovereign Analytics"
          className="absolute inset-0 w-full h-full object-cover opacity-30 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B2135] via-[#0B2135]/85 to-[#0B2135]/60 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B2135] via-transparent to-[#0B2135]/50 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-[#102A43]/90 border border-[#B08D57]/40 text-[#D8C3A5] text-[10px] uppercase font-mono tracking-[0.25em] mb-6">
                <ShieldCheck className="w-3.5 h-3.5 text-[#B08D57]" />
                <span>Government of Dubai • Official Real Estate Intelligence</span>
              </div>

              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl text-[#FFFDF8] font-normal tracking-tight leading-[1.05]">
                Dubai Market <span className="italic text-[#D8C3A5]">Intelligence</span> &amp; Sovereign Analytics
              </h1>

              <p className="text-sm sm:text-base text-[#E9E1D4]/85 mt-6 max-w-2xl leading-relaxed font-light">
                Empirical market studies, mega-project capital pipelines, and audited land valuations synthesized
                directly from official Dubai Land Department (DLD) and Real Estate Regulatory Agency (RERA) registries
                for private clients and family offices.
              </p>
            </div>

            {/* Official Registry Cycle Badge Card */}
            <div className="bg-[#102A43]/95 backdrop-blur-md border border-[#B08D57]/40 p-6 lg:w-80 shrink-0 shadow-2xl">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#1E3A5F]">
                <span className="text-[10px] uppercase tracking-[0.22em] text-[#D8C3A5] font-mono">
                  Registry Provenance
                </span>
                <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-[#5D7A65] bg-[#5D7A65]/15 px-2 py-0.5 border border-[#5D7A65]/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5D7A65] animate-pulse" />
                  Verified
                </span>
              </div>
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 bg-[#0B2135] border border-[#B08D57]/40 flex items-center justify-center shrink-0 mt-0.5">
                  <Database className="w-4 h-4 text-[#B08D57]" />
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-wider text-[#E9E1D4]/70 font-mono">
                    Active Data Cycle
                  </span>
                  <span className="font-display text-xl text-[#FFFDF8] block mt-0.5">
                    {DUBAI_GOVERNMENT_KPIS.dataDate}
                  </span>
                  <span className="text-[11px] text-[#D8C3A5] font-mono block mt-1">
                    DLD &amp; RERA Audited Feed
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAdvisorModalOpen(true)}
                className="mt-5 w-full bg-[#B08D57] hover:bg-[#9B7A49] text-[#102A43] py-3 px-4 text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors flex items-center justify-center gap-2"
              >
                <span>Request Private Briefing</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 2. EXECUTIVE SOVEREIGN LEDGER (OVERLAPPING HERO)                  */}
      {/* ================================================================= */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-20 -mt-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 bg-[#FFFDF8] border border-[#E9E1D4] shadow-[0_28px_60px_-28px_rgba(16,42,67,0.35)] divide-y sm:divide-y-0 sm:divide-x divide-[#E9E1D4]">
          {/* KPI 1 */}
          <div className="p-7 lg:p-8 bg-[#102A43] text-[#F7F3EA] relative overflow-hidden">
            <span className="text-[10px] uppercase tracking-[0.22em] text-[#D8C3A5] font-mono block mb-3">
              01 • DLD Pipeline Value
            </span>
            <div className="font-display text-4xl lg:text-5xl text-[#FFFDF8] font-normal tracking-tight mb-4">
              AED {DUBAI_GOVERNMENT_KPIS.totalPipelineValueBillion}B
            </div>
            <div className="flex items-center justify-between text-[11px] text-[#E9E1D4]/80 pt-3.5 border-t border-[#1E3A5F] font-mono">
              <span>{DUBAI_GOVERNMENT_KPIS.totalProjects} Mega-Projects</span>
              <span className="text-[#D8C3A5] font-semibold">75.9% Active</span>
            </div>
          </div>

          {/* KPI 2 */}
          <div className="p-7 lg:p-8 bg-[#FFFDF8] hover:bg-[#F7F3EA]/40 transition-colors">
            <span className="text-[10px] uppercase tracking-[0.22em] text-[#B08D57] font-mono block mb-3">
              02 • Supply In Progress
            </span>
            <div className="font-display text-4xl lg:text-5xl text-[#102A43] font-normal tracking-tight mb-4">
              {DUBAI_GOVERNMENT_KPIS.totalUnits.toLocaleString()}
            </div>
            <div className="flex items-center justify-between text-[11px] text-[#6B7280] pt-3.5 border-t border-[#E9E1D4] font-mono">
              <span>Units in Pipeline</span>
              <span className="text-[#102A43] font-semibold">
                {DUBAI_GOVERNMENT_KPIS.totalVillas.toLocaleString()} Villas
              </span>
            </div>
          </div>

          {/* KPI 3 */}
          <div className="p-7 lg:p-8 bg-[#FFFDF8] hover:bg-[#F7F3EA]/40 transition-colors">
            <span className="text-[10px] uppercase tracking-[0.22em] text-[#B08D57] font-mono block mb-3">
              03 • Supply Equilibrium
            </span>
            <div className="font-display text-4xl lg:text-5xl text-[#102A43] font-normal tracking-tight mb-4">
              {DUBAI_GOVERNMENT_KPIS.readyPct}%
              <span className="text-2xl text-[#B08D57] mx-1.5">/</span>
              {DUBAI_GOVERNMENT_KPIS.offplanPct}%
            </div>
            <div className="flex items-center justify-between text-[11px] text-[#6B7280] pt-3.5 border-t border-[#E9E1D4] font-mono">
              <span>Ready vs. Off-Plan</span>
              <span className="text-[#102A43] font-semibold">12,273 Buildings</span>
            </div>
          </div>

          {/* KPI 4 */}
          <div className="p-7 lg:p-8 bg-[#102A43] text-[#F7F3EA] relative overflow-hidden">
            <span className="text-[10px] uppercase tracking-[0.22em] text-[#D8C3A5] font-mono block mb-3">
              04 • Regulated Ecosystem
            </span>
            <div className="font-display text-4xl lg:text-5xl text-[#FFFDF8] font-normal tracking-tight mb-4">
              {DUBAI_GOVERNMENT_KPIS.licensedBrokers.toLocaleString()}
            </div>
            <div className="flex items-center justify-between text-[11px] text-[#E9E1D4]/80 pt-3.5 border-t border-[#1E3A5F] font-mono">
              <span>Licensed Brokers</span>
              <span className="text-[#D8C3A5] font-semibold">194 Developers</span>
            </div>
          </div>
        </div>
      </div>

      {/* ================================================================= */}
      {/* 3. INTERACTIVE EMPIRICAL MARKET TERMINAL                          */}
      {/* ================================================================= */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-20 pb-24">
        <section className="mb-24">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 pb-6 border-b border-[#E9E1D4]">
            <div>
              <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#B08D57] font-mono mb-2">
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Quantitative Research Terminal</span>
              </div>
              <h2 className="font-display text-3xl sm:text-5xl text-[#102A43] font-normal tracking-tight">
                Empirical Market <span className="italic text-[#B08D57]">Breakdown</span>
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#6B7280] max-w-md leading-relaxed">
              Select an intelligence module below to examine capital commitments, district pipelines, and official DLD valuation benchmarks.
            </p>
          </div>

          {/* Luxury Indexed Module Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 bg-[#FFFDF8] border border-[#E9E1D4] mb-8 divide-y sm:divide-y-0 sm:divide-x divide-[#E9E1D4] shadow-sm">
            {ANALYTICS_TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`p-5 text-left transition-all relative group ${
                    isActive
                      ? 'bg-[#102A43] text-[#FFFDF8]'
                      : 'bg-[#FFFDF8] text-[#3E4852] hover:bg-[#F7F3EA]'
                  }`}
                >
                  <span
                    className={`block text-[10px] font-mono uppercase tracking-[0.22em] mb-1.5 ${
                      isActive ? 'text-[#D8C3A5]' : 'text-[#B08D57]'
                    }`}
                  >
                    Module {tab.index}
                  </span>
                  <span
                    className={`block font-display text-xl leading-snug ${
                      isActive ? 'text-[#FFFDF8]' : 'text-[#102A43] group-hover:text-[#B08D57]'
                    }`}
                  >
                    {tab.label}
                  </span>
                  <span
                    className={`block text-[11px] mt-1 truncate ${
                      isActive ? 'text-[#E9E1D4]/70' : 'text-[#6B7280]'
                    }`}
                  >
                    {tab.sub}
                  </span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B08D57]" />
                  )}
                </button>
              );
            })}
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

        {/* ================================================================= */}
        {/* 4. CURATED INTELLIGENCE REPORTS & FLAGSHIP DOSSIER                */}
        {/* ================================================================= */}
        <section className="mb-24">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-8 pb-6 border-b border-[#E9E1D4]">
            <div>
              <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#B08D57] font-mono mb-2">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Curated Editorial Library</span>
              </div>
              <h2 className="font-display text-3xl sm:text-5xl text-[#102A43] font-normal tracking-tight">
                Official Intelligence <span className="italic text-[#B08D57]">Dossiers</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#6B7280] mt-2 max-w-xl">
                Quarterly research monographs and regulatory briefings prepared for institutional investors and private family offices.
              </p>
            </div>

            {/* Luxury Search Input */}
            <div className="w-full lg:w-96">
              <label className="text-[10px] uppercase tracking-[0.2em] text-[#6B7280] font-mono block mb-2">
                Filter Publications
              </label>
              <div className="relative flex items-center bg-[#FFFDF8] border border-[#E9E1D4] focus-within:border-[#B08D57] transition-colors">
                <Search className="w-4 h-4 text-[#B08D57] ml-3.5 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search reports, corridors, or topics..."
                  className="w-full pl-3 pr-9 py-3 text-xs bg-transparent focus:outline-none text-[#102A43] placeholder:text-[#9CA3AF]"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="pr-3 text-[#9CA3AF] hover:text-[#102A43]"
                    title="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Editorial Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-12">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 text-[11px] uppercase tracking-[0.18em] transition-all ${
                    active
                      ? 'bg-[#102A43] text-[#F7F3EA] font-medium border border-[#102A43] shadow-sm'
                      : 'bg-[#FFFDF8] text-[#3E4852] border border-[#E9E1D4] hover:border-[#B08D57] hover:text-[#102A43]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Flagship Editorial Spotlight (First Article) */}
          {flagshipArticle && (
            <Link
              to={`/insights/${flagshipArticle.slug}`}
              className="group grid grid-cols-1 lg:grid-cols-12 bg-[#FFFDF8] border border-[#E9E1D4] hover:border-[#B08D57] transition-all mb-12 shadow-[0_24px_55px_-28px_rgba(16,42,67,0.28)] overflow-hidden"
            >
              <div className="lg:col-span-7 relative min-h-[320px] sm:min-h-[420px] bg-[#102A43] overflow-hidden">
                <img
                  src={flagshipArticle.coverImage}
                  alt={flagshipArticle.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B2135]/75 via-transparent to-transparent" />
                <div className="absolute top-5 left-5 flex flex-wrap items-center gap-2">
                  <span className="bg-[#102A43]/95 text-[#D8C3A5] text-[10px] font-mono uppercase tracking-[0.22em] px-3.5 py-1.5 border border-[#B08D57]/50">
                    Flagship Dossier
                  </span>
                  <span className="bg-[#FFFDF8]/95 text-[#102A43] text-[10px] font-mono uppercase tracking-[0.2em] px-3 py-1.5 font-semibold">
                    {flagshipArticle.category}
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 p-8 sm:p-10 lg:p-12 flex flex-col justify-between bg-[#FFFDF8]">
                <div>
                  <div className="flex items-center gap-3 text-[11px] font-mono text-[#6B7280] mb-4">
                    <span>{flagshipArticle.publishedDate}</span>
                    <span className="text-[#B08D57]">•</span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#B08D57]" />
                      {flagshipArticle.readingTimeMinutes} min read
                    </span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl text-[#102A43] group-hover:text-[#B08D57] transition-colors leading-[1.18] mb-4 font-normal">
                    {flagshipArticle.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#3E4852] leading-relaxed mb-6 font-light">
                    {flagshipArticle.excerpt}
                  </p>

                  {flagshipArticle.keyStats && flagshipArticle.keyStats.length > 0 && (
                    <div className="grid grid-cols-2 gap-3 mb-6 pt-5 border-t border-[#E9E1D4]">
                      {flagshipArticle.keyStats.slice(0, 4).map((st) => (
                        <div key={st.label} className="bg-[#F7F3EA] p-3 border border-[#E9E1D4]">
                          <span className="text-[9px] uppercase font-mono tracking-wider text-[#6B7280] block mb-1">
                            {st.label}
                          </span>
                          <span className="font-display text-lg font-semibold text-[#102A43]">
                            {st.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-5 border-t border-[#E9E1D4] flex items-center justify-between">
                  <div>
                    <span className="block text-[10px] uppercase tracking-wider text-[#6B7280] font-mono">
                      Published By
                    </span>
                    <span className="text-xs font-medium text-[#102A43]">
                      {flagshipArticle.author.name}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#102A43] group-hover:text-[#B08D57] transition-colors">
                    <span>Read Full Dossier</span>
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          )}

          {/* Secondary Articles 3-Column Grid */}
          {secondaryArticles.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {secondaryArticles.map((article) => (
                <Link
                  key={article.slug}
                  to={`/insights/${article.slug}`}
                  className="group flex flex-col bg-[#FFFDF8] border border-[#E9E1D4] hover:border-[#B08D57] transition-all overflow-hidden shadow-[0_18px_40px_-28px_rgba(16,42,67,0.25)] hover:shadow-[0_24px_50px_-24px_rgba(16,42,67,0.38)]"
                >
                  {/* Image Cover */}
                  <div className="aspect-[16/10] overflow-hidden bg-[#102A43] relative">
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B2135]/60 via-transparent to-transparent opacity-60" />
                    <span className="absolute top-3.5 left-3.5 bg-[#102A43]/95 text-[#D8C3A5] text-[10px] font-mono uppercase tracking-[0.2em] px-3 py-1 font-medium border border-[#B08D57]/40">
                      {article.category}
                    </span>
                  </div>

                  {/* Content Box */}
                  <div className="p-7 flex flex-col justify-between flex-grow">
                    <div>
                      <div className="flex items-center gap-2.5 text-[10px] font-mono text-[#6B7280] mb-3">
                        <span>{article.publishedDate}</span>
                        <span className="text-[#B08D57]">•</span>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#B08D57]" />
                          <span>{article.readingTimeMinutes} min read</span>
                        </div>
                      </div>

                      <h3 className="font-display text-2xl text-[#102A43] group-hover:text-[#B08D57] transition-colors leading-snug mb-3 font-normal">
                        {article.title}
                      </h3>

                      <p className="text-xs text-[#6B7280] line-clamp-3 leading-relaxed font-light mb-5">
                        {article.excerpt}
                      </p>

                      {/* Key Stats Pill Strip */}
                      {article.keyStats && article.keyStats.length > 0 && (
                        <div className="grid grid-cols-2 gap-2.5 mb-5 pt-4 border-t border-[#E9E1D4]">
                          {article.keyStats.slice(0, 2).map((st) => (
                            <div key={st.label} className="bg-[#F7F3EA] p-2.5 border border-[#E9E1D4]/80">
                              <span className="text-[9px] uppercase font-mono text-[#6B7280] block leading-tight mb-0.5">
                                {st.label}
                              </span>
                              <span className="font-display text-base font-semibold text-[#102A43]">
                                {st.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="pt-4 border-t border-[#E9E1D4] text-[10px] uppercase font-mono tracking-[0.18em] flex justify-between items-center text-[#6B7280]">
                      <span className="truncate pr-2">{article.author.name}</span>
                      <span className="text-[#102A43] group-hover:text-[#B08D57] font-semibold flex items-center gap-1.5 shrink-0">
                        <span>Read Study</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {filteredArticles.length === 0 && (
            <div className="text-center py-20 bg-[#FFFDF8] border border-[#E9E1D4] p-10 shadow-sm">
              <p className="font-display text-2xl text-[#102A43] mb-2">
                No matching intelligence dossiers found
              </p>
              <p className="text-xs text-[#6B7280] mb-6">
                Adjust your search keywords or reset the category filter to view all sovereign reports.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('All Intelligence');
                  setSearchQuery('');
                }}
                className="bg-[#102A43] text-[#F7F3EA] hover:bg-[#B08D57] hover:text-[#102A43] px-6 py-3 text-xs uppercase tracking-[0.2em] transition-colors"
              >
                Reset Intelligence Filters
              </button>
            </div>
          )}
        </section>

        {/* ================================================================= */}
        {/* 5. INSTITUTIONAL METHODOLOGY & PRIVATE RESEARCH DESK MANDATE      */}
        {/* ================================================================= */}
        <section className="bg-[#0B2135] text-[#F7F3EA] border border-[#B08D57]/40 p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
          <div className="pointer-events-none absolute -bottom-28 -left-28 w-96 h-96 rounded-full bg-[#B08D57]/10 blur-3xl" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#D8C3A5] font-mono">
                <Landmark className="w-3.5 h-3.5 text-[#B08D57]" />
                <span>Private Wealth &amp; Family Office Research Desk</span>
              </div>
              <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#FFFDF8] font-normal leading-tight">
                Commission a Bespoke <span className="italic text-[#D8C3A5]">Portfolio Valuation</span> or Market Mandate
              </h3>
              <p className="text-xs sm:text-sm text-[#E9E1D4]/80 max-w-2xl leading-relaxed font-light">
                Beyond our public intelligence library, Crestshore prepares confidential feasibility studies,
                custom plot yield models, and off-market acquisition memoranda grounded in live Dubai Land Department title registries.
              </p>
              <div className="pt-3 flex flex-wrap gap-6 text-[11px] font-mono text-[#D8C3A5]">
                <span className="flex items-center gap-2">
                  <Building2 className="w-3.5 h-3.5 text-[#B08D57]" />
                  12,273 Audited Buildings
                </span>
                <span className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#B08D57]" />
                  262,455 Sovereign Land Parcels
                </span>
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#B08D57]" />
                  RERA Escrow Law No. 8 Compliant
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3.5">
              <button
                type="button"
                onClick={() => setIsAdvisorModalOpen(true)}
                className="w-full bg-[#B08D57] hover:bg-[#9B7A49] text-[#102A43] px-8 py-4 text-xs font-semibold uppercase tracking-[0.22em] transition-colors text-center"
              >
                Speak with Research Desk
              </button>
              <Link
                to="/properties"
                className="w-full border border-[#D8C3A5]/60 hover:bg-[#F7F3EA] hover:text-[#102A43] text-[#F7F3EA] px-8 py-4 text-xs font-medium uppercase tracking-[0.22em] transition-colors text-center"
              >
                Explore Prime Collection
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Private Research & Advisory Modal */}
      <SpeakAdvisorModal
        isOpen={isAdvisorModalOpen}
        onClose={() => setIsAdvisorModalOpen(false)}
        initialService="Private Market Intelligence & Research Briefing"
      />
    </div>
  );
};

export default InsightsPage;
