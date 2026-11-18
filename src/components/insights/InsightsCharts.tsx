import React, { useState } from 'react';
import {
  DELIVERY_FORECAST,
  TOP_DEVELOPERS_CAPITAL,
  AREA_GROWTH_HOTSPOTS,
  TOP_BENCHMARK_VALUATIONS,
  DeliveryForecastYear
} from '../../data/dubaiGovernmentInsights';
import { TrendingUp, Award, MapPin, Building2, Layers, ShieldCheck, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export const HandoverTimelineChart: React.FC = () => {
  const [activeYear, setActiveYear] = useState<DeliveryForecastYear>(DELIVERY_FORECAST[1]); // default to 2028 peak
  const maxBillion = Math.max(...DELIVERY_FORECAST.map((d) => d.estimatedValueBillion));

  return (
    <div className="bg-[#0B2135] text-[#F7F3EA] p-7 sm:p-10 border border-[#B08D57]/30 font-ui shadow-[0_24px_60px_-25px_rgba(11,33,53,0.65)] relative overflow-hidden">
      {/* Subtle luxury radial glow */}
      <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#B08D57]/10 blur-3xl" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#1E3A5F]">
        <div>
          <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#D8C3A5] font-mono mb-2.5 px-3 py-1 bg-[#102A43] border border-[#B08D57]/30">
            <TrendingUp className="w-3.5 h-3.5 text-[#B08D57]" />
            <span>DLD Official Handover Forecast (2027 – 2032)</span>
          </div>
          <h3 className="font-display text-3xl sm:text-4xl text-[#FFFDF8] font-normal tracking-tight">
            Scheduled Mega-Project <span className="italic text-[#D8C3A5]">Delivery Crest</span>
          </h3>
          <p className="text-xs text-[#E9E1D4]/70 mt-1.5 max-w-xl">
            Click any delivery year below to inspect committed escrow capital, project volume, and unit handover velocity.
          </p>
        </div>
        <div className="bg-[#102A43] border border-[#B08D57]/40 px-5 py-3.5 text-left md:text-right shrink-0">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#D8C3A5] block font-mono">
            Peak Delivery Wave
          </span>
          <span className="font-display text-2xl sm:text-3xl text-[#FFFDF8]">
            2028 <span className="text-[#B08D57]">•</span> AED 39.8B
          </span>
        </div>
      </div>

      {/* Bar Chart Visualization */}
      <div className="relative z-10 grid grid-cols-5 gap-4 sm:gap-8 items-end h-72 pt-12 pb-6 border-b border-[#1E3A5F]">
        {DELIVERY_FORECAST.map((item) => {
          const heightPct = Math.max(12, Math.round((item.estimatedValueBillion / maxBillion) * 100));
          const isSelected = activeYear.year === item.year;
          const isPeak = item.year === '2028';

          return (
            <div
              key={item.year}
              onClick={() => setActiveYear(item)}
              className="flex flex-col items-center h-full justify-end group cursor-pointer"
            >
              {/* Value indicator tooltip on hover/select */}
              <div
                className={`mb-3 text-center transition-all duration-300 ${
                  isSelected
                    ? 'text-[#D8C3A5] scale-105'
                    : 'text-[#E9E1D4]/70 group-hover:text-[#FFFDF8]'
                }`}
              >
                <span className="block font-display text-base sm:text-xl font-medium tracking-tight">
                  AED {item.estimatedValueBillion}B
                </span>
                <span className="hidden sm:block text-[10px] text-[#E9E1D4]/55 font-mono uppercase tracking-wider mt-0.5">
                  {item.projectsCount} Projects
                </span>
              </div>

              {/* Bar Track */}
              <div
                className={`w-full max-w-[68px] bg-[#102A43]/90 border transition-colors p-1 flex flex-col justify-end h-full ${
                  isSelected ? 'border-[#B08D57]' : 'border-[#1E3A5F] group-hover:border-[#B08D57]/50'
                }`}
              >
                <div
                  style={{ height: `${heightPct}%` }}
                  className={`w-full transition-all duration-500 relative ${
                    isSelected
                      ? 'bg-gradient-to-t from-[#9B7A49] via-[#B08D57] to-[#D8C3A5] shadow-[0_0_25px_rgba(176,141,87,0.45)]'
                      : isPeak
                      ? 'bg-gradient-to-t from-[#B08D57]/70 to-[#D8C3A5]/90 group-hover:from-[#B08D57] group-hover:to-[#D8C3A5]'
                      : 'bg-gradient-to-t from-[#163554] to-[#234B73] group-hover:from-[#B08D57]/60 group-hover:to-[#D8C3A5]/80'
                  }`}
                >
                  {isPeak && (
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#B08D57] text-[#102A43] px-2 py-0.5 text-[8px] uppercase tracking-[0.18em] font-bold hidden sm:inline-block shadow-sm">
                      Peak
                    </span>
                  )}
                </div>
              </div>

              {/* X Axis Label */}
              <div className="mt-3.5 text-center">
                <span
                  className={`text-xs sm:text-sm uppercase font-mono tracking-[0.18em] block transition-colors ${
                    isSelected ? 'text-[#D8C3A5] font-bold' : 'text-[#E9E1D4]/75 group-hover:text-white'
                  }`}
                >
                  {item.year}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Year Detail Strip */}
      <div className="relative z-10 mt-7 grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#102A43] p-4 border border-[#1E3A5F] hover:border-[#B08D57]/40 transition-colors">
          <span className="text-[10px] text-[#D8C3A5] block uppercase tracking-[0.18em] font-mono mb-1">
            Scheduled Handovers ({activeYear.year})
          </span>
          <span className="font-display text-2xl text-[#FFFDF8]">{activeYear.projectsCount} Mega-Projects</span>
        </div>
        <div className="bg-[#102A43] p-4 border border-[#B08D57]/40">
          <span className="text-[10px] text-[#D8C3A5] block uppercase tracking-[0.18em] font-mono mb-1">
            Committed Escrow Capital
          </span>
          <span className="font-display text-2xl text-[#D8C3A5]">AED {activeYear.estimatedValueBillion} Billion</span>
        </div>
        <div className="bg-[#102A43] p-4 border border-[#1E3A5F] hover:border-[#B08D57]/40 transition-colors">
          <span className="text-[10px] text-[#D8C3A5] block uppercase tracking-[0.18em] font-mono mb-1">
            Residential &amp; Commercial Inventory
          </span>
          <span className="font-display text-2xl text-[#FFFDF8]">{activeYear.unitsCount.toLocaleString()} Units</span>
        </div>
        <div className="bg-[#102A43] p-4 border border-[#1E3A5F] hover:border-[#B08D57]/40 transition-colors">
          <span className="text-[10px] text-[#D8C3A5] block uppercase tracking-[0.18em] font-mono mb-1">
            Proportional Pipeline Share
          </span>
          <span className="font-display text-2xl text-[#FFFDF8]">{activeYear.percentageOfPipeline}% of Total</span>
        </div>
      </div>
    </div>
  );
};

export const TopDevelopersChart: React.FC = () => {
  const maxVal = TOP_DEVELOPERS_CAPITAL[0].capitalValueBillion;

  return (
    <div className="bg-[#FFFDF8] p-7 sm:p-10 border border-[#E9E1D4] font-ui shadow-[0_20px_50px_-28px_rgba(16,42,67,0.25)]">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 mb-8 border-b border-[#E9E1D4]">
        <div>
          <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-[#B08D57] font-mono mb-2">
            <Award className="w-3.5 h-3.5" />
            <span>Sovereign &amp; Private Developer Capital Share</span>
          </div>
          <h3 className="font-display text-3xl sm:text-4xl text-[#102A43] font-normal">
            Top Master Developers by <span className="italic text-[#B08D57]">Capital Investment</span>
          </h3>
        </div>
        <span className="text-[11px] uppercase tracking-[0.16em] text-[#6B7280] font-mono bg-[#F7F3EA] px-3.5 py-1.5 border border-[#E9E1D4]">
          Official DLD Registered Pipeline
        </span>
      </div>

      <div className="space-y-5">
        {TOP_DEVELOPERS_CAPITAL.map((dev, idx) => {
          const widthPct = Math.round((dev.capitalValueBillion / maxVal) * 100);
          return (
            <div
              key={dev.name}
              className="group p-4 bg-[#F7F3EA]/50 border border-[#E9E1D4] hover:border-[#B08D57] hover:bg-[#FFFDF8] transition-all"
            >
              <div className="flex flex-wrap justify-between items-baseline gap-2 mb-2.5">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center bg-[#102A43] text-[#D8C3A5] font-mono text-[10px] font-bold">
                    0{idx + 1}
                  </span>
                  <span className="font-display text-xl text-[#102A43] group-hover:text-[#B08D57] transition-colors">
                    {dev.name}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider font-mono text-[#6B7280] bg-[#FFFDF8] px-2.5 py-0.5 border border-[#E9E1D4]">
                    {dev.projectsCount} {dev.projectsCount === 1 ? 'Mandate' : 'Mandates'}
                  </span>
                </div>
                <div className="font-mono text-right">
                  <span className="font-display text-xl font-semibold text-[#102A43]">
                    AED {dev.capitalValueBillion}B
                  </span>
                  <span className="text-[11px] text-[#B08D57] font-semibold ml-2">
                    ({dev.sharePct}% Share)
                  </span>
                </div>
              </div>
              <div className="w-full bg-[#E9E1D4]/70 h-2.5 overflow-hidden">
                <div
                  style={{ width: `${widthPct}%` }}
                  className="bg-gradient-to-r from-[#102A43] via-[#1E3A5F] to-[#B08D57] h-full transition-all duration-700"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const AreaHotspotsChart: React.FC = () => {
  return (
    <div className="bg-[#FFFDF8] p-7 sm:p-10 border border-[#E9E1D4] font-ui shadow-[0_20px_50px_-28px_rgba(16,42,67,0.25)]">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 mb-8 border-b border-[#E9E1D4]">
        <div>
          <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-[#B08D57] font-mono mb-2">
            <MapPin className="w-3.5 h-3.5" />
            <span>Prime Growth Corridors</span>
          </div>
          <h3 className="font-display text-3xl sm:text-4xl text-[#102A43] font-normal">
            Top Districts by <span className="italic text-[#B08D57]">Pipeline Investment</span>
          </h3>
        </div>
        <span className="text-[11px] uppercase tracking-[0.16em] text-[#6B7280] font-mono bg-[#F7F3EA] px-3.5 py-1.5 border border-[#E9E1D4]">
          Institutional Capital Allocation
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {AREA_GROWTH_HOTSPOTS.map((area, idx) => (
          <div
            key={area.name}
            className="group p-6 bg-[#F7F3EA]/60 border border-[#E9E1D4] hover:border-[#B08D57] hover:bg-[#FFFDF8] transition-all relative overflow-hidden"
          >
            <div className="flex justify-between items-start gap-4 mb-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#B08D57] block mb-1">
                  Corridor 0{idx + 1}
                </span>
                <h4 className="font-display text-2xl text-[#102A43] group-hover:text-[#B08D57] transition-colors">
                  {area.name}
                </h4>
              </div>
              <span className="font-display text-xl text-[#D8C3A5] bg-[#102A43] px-3.5 py-1.5 border border-[#B08D57]/40 shrink-0">
                AED {area.capitalValueBillion}B
              </span>
            </div>
            <p className="text-xs text-[#6B7280] mb-4 leading-relaxed">{area.type}</p>
            <div className="flex items-center justify-between text-[11px] font-mono text-[#6B7280] border-t border-[#E9E1D4] pt-3">
              <span className="uppercase tracking-wider">Registered Master Schemes</span>
              <span className="font-semibold text-[#102A43] flex items-center gap-1">
                {area.projectsCount} Mega-Projects
                <ArrowUpRight className="w-3.5 h-3.5 text-[#B08D57]" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const SupplyZoningMetrics: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-ui">
      {/* Ready vs Off-Plan */}
      <div className="bg-[#0B2135] text-[#F7F3EA] p-7 border border-[#B08D57]/30 shadow-md flex flex-col justify-between">
        <div>
          <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-[#D8C3A5] font-mono mb-3">
            <Layers className="w-3.5 h-3.5 text-[#B08D57]" />
            <span>Building Supply Mix</span>
          </div>
          <h4 className="font-display text-2xl sm:text-3xl text-[#FFFDF8] font-normal mb-5">
            Ready vs. Off-Plan <span className="italic text-[#D8C3A5]">Equilibrium</span>
          </h4>
          <div className="flex h-3.5 overflow-hidden mb-4 border border-[#B08D57]/40 p-0.5 bg-[#102A43]">
            <div style={{ width: '51%' }} className="bg-[#B08D57]" title="Ready: 51%" />
            <div style={{ width: '49%' }} className="bg-[#234B73]" title="Off-Plan: 49%" />
          </div>
          <div className="flex justify-between text-xs font-mono pt-1">
            <div>
              <span className="inline-block w-2.5 h-2.5 bg-[#B08D57] mr-2" />
              <span className="text-white font-bold">51% Ready Inventory</span>
              <span className="block text-[11px] text-[#E9E1D4]/65 mt-0.5">6,252 Completed Assets</span>
            </div>
            <div className="text-right">
              <span className="inline-block w-2.5 h-2.5 bg-[#234B73] border border-[#D8C3A5]/40 mr-2" />
              <span className="text-white font-bold">49% Off-Plan</span>
              <span className="block text-[11px] text-[#E9E1D4]/65 mt-0.5">6,021 Under Development</span>
            </div>
          </div>
        </div>
        <p className="text-xs text-[#E9E1D4]/75 mt-6 pt-4 border-t border-[#1E3A5F] leading-relaxed">
          Across 12,273 registered buildings and villa compounds, disciplined supply parity prevents secondary market oversupply.
        </p>
      </div>

      {/* Land Zoning Distribution */}
      <div className="bg-[#0B2135] text-[#F7F3EA] p-7 border border-[#B08D57]/30 shadow-md flex flex-col justify-between">
        <div>
          <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-[#D8C3A5] font-mono mb-3">
            <Building2 className="w-3.5 h-3.5 text-[#B08D57]" />
            <span>DLD Land Registry</span>
          </div>
          <h4 className="font-display text-2xl sm:text-3xl text-[#FFFDF8] font-normal mb-5">
            262,455 Sovereign <span className="italic text-[#D8C3A5]">Land Parcels</span>
          </h4>
          <div className="space-y-3.5 text-xs font-mono">
            <div>
              <div className="flex justify-between text-[11px] mb-1.5">
                <span className="text-[#D8C3A5]">Commercial &amp; Mixed Use</span>
                <span className="text-white font-semibold">57.0% (149,642)</span>
              </div>
              <div className="w-full bg-[#102A43] h-2 overflow-hidden border border-[#1E3A5F]">
                <div className="bg-[#B08D57] h-full" style={{ width: '57%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[11px] mb-1.5">
                <span className="text-[#FFFDF8]">Private Residential Zoning</span>
                <span className="text-white font-semibold">22.9% (60,035)</span>
              </div>
              <div className="w-full bg-[#102A43] h-2 overflow-hidden border border-[#1E3A5F]">
                <div className="bg-[#D8C3A5] h-full" style={{ width: '22.9%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[11px] mb-1.5">
                <span className="text-[#E9E1D4]/75">Industrial &amp; Strategic Logistics</span>
                <span className="text-white font-semibold">4.3% (11,305)</span>
              </div>
              <div className="w-full bg-[#102A43] h-2 overflow-hidden border border-[#1E3A5F]">
                <div className="bg-[#3B6E9B] h-full" style={{ width: '14%' }} />
              </div>
            </div>
          </div>
        </div>
        <p className="text-xs text-[#E9E1D4]/75 mt-6 pt-4 border-t border-[#1E3A5F] leading-relaxed">
          129,433 parcels (49.3%) carry unrestricted 100% Freehold title eligibility for international family offices.
        </p>
      </div>

      {/* Escrow & Project Execution Security */}
      <div className="bg-[#0B2135] text-[#F7F3EA] p-7 border border-[#B08D57]/30 shadow-md flex flex-col justify-between">
        <div>
          <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-[#D8C3A5] font-mono mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-[#B08D57]" />
            <span>RERA Project Governance</span>
          </div>
          <h4 className="font-display text-2xl sm:text-3xl text-[#FFFDF8] font-normal mb-5">
            Execution &amp; <span className="italic text-[#D8C3A5]">Escrow Health</span>
          </h4>
          <div className="space-y-3 font-mono text-xs">
            <div className="flex justify-between items-center bg-[#102A43] p-3 border border-[#B08D57]/35">
              <span className="text-[#D8C3A5] flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#B08D57]" />
                Active Construction
              </span>
              <span className="font-bold text-white">252 Projects (75.9%)</span>
            </div>
            <div className="flex justify-between items-center bg-[#102A43] p-3 border border-[#1E3A5F]">
              <span className="text-[#E9E1D4]/80">Pending Final Clearances</span>
              <span className="font-bold text-white">77 Projects (23.2%)</span>
            </div>
            <div className="flex justify-between items-center bg-[#102A43] p-3 border border-[#1E3A5F]">
              <span className="text-[#E9E1D4]/60">Cancelled Schemes</span>
              <span className="font-bold text-[#D8C3A5]">2 Projects (&lt;0.6%)</span>
            </div>
          </div>
        </div>
        <p className="text-xs text-[#E9E1D4]/75 mt-6 pt-4 border-t border-[#1E3A5F] leading-relaxed">
          Dubai Escrow Law No. 8 mandates milestone-verified trustee disbursements upon certified structural completion.
        </p>
      </div>
    </div>
  );
};

export const BenchmarkValuationsTable: React.FC = () => {
  return (
    <div className="bg-[#FFFDF8] p-7 sm:p-10 border border-[#E9E1D4] font-ui shadow-[0_20px_50px_-28px_rgba(16,42,67,0.25)]">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 mb-6 border-b border-[#E9E1D4]">
        <div>
          <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-[#B08D57] font-mono mb-2">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Official Sovereign Registry Transactions</span>
          </div>
          <h3 className="font-display text-3xl sm:text-4xl text-[#102A43] font-normal">
            Landmark DLD <span className="italic text-[#B08D57]">Benchmark Valuations</span>
          </h3>
        </div>
        <span className="text-[11px] uppercase tracking-[0.16em] text-[#6B7280] font-mono bg-[#F7F3EA] px-3.5 py-1.5 border border-[#E9E1D4]">
          Audited Valuations Registry
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b-2 border-[#102A43] bg-[#F7F3EA] text-[10px] uppercase font-mono tracking-[0.18em] text-[#102A43]">
              <th className="py-3.5 px-4">Location / Enclave</th>
              <th className="py-3.5 px-4">Asset Typology</th>
              <th className="py-3.5 px-4">Plot / BUA (Sq. Meters)</th>
              <th className="py-3.5 px-4">Registry Date</th>
              <th className="py-3.5 px-4 text-right">Audited Valuation (AED)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E9E1D4] font-mono">
            {TOP_BENCHMARK_VALUATIONS.map((row) => (
              <tr key={row.area + row.date} className="hover:bg-[#F7F3EA]/80 transition-colors group">
                <td className="py-4 px-4 font-display text-lg text-[#102A43] group-hover:text-[#B08D57] transition-colors">
                  {row.area}
                </td>
                <td className="py-4 px-4 text-xs text-[#3E4852] font-ui">{row.subType}</td>
                <td className="py-4 px-4 text-[#6B7280]">{row.areaSqM.toLocaleString()} m²</td>
                <td className="py-4 px-4 text-[#6B7280]">{row.date}</td>
                <td className="py-4 px-4 text-right font-display text-xl font-semibold text-[#102A43]">
                  AED {row.valueMillion}M
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
