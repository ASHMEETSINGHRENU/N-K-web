import React, { useState } from 'react';
import {
  DELIVERY_FORECAST,
  TOP_DEVELOPERS_CAPITAL,
  AREA_GROWTH_HOTSPOTS,
  TOP_BENCHMARK_VALUATIONS,
  DUBAI_GOVERNMENT_KPIS,
  DeliveryForecastYear,
  DeveloperMetric,
  ValuationRecord
} from '../../data/dubaiGovernmentInsights';
import { TrendingUp, Award, MapPin, Building2, Layers, ShieldCheck, ExternalLink } from 'lucide-react';

export const HandoverTimelineChart: React.FC = () => {
  const [activeYear, setActiveYear] = useState<DeliveryForecastYear>(DELIVERY_FORECAST[1]); // default to 2028 peak
  const maxBillion = Math.max(...DELIVERY_FORECAST.map((d) => d.estimatedValueBillion));

  return (
    <div className="bg-[#18181A] text-white p-6 sm:p-8 rounded-sm border border-[#2A2A2E]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C5A880] font-mono mb-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>DLD Official Handover Forecast (2027 – 2032)</span>
          </div>
          <h3 className="font-serif text-2xl text-[#FDFCF9] font-light">
            Scheduled Mega-Project Delivery Crest
          </h3>
        </div>
        <div className="text-right">
          <span className="text-[10px] uppercase tracking-wider text-[#A1A1AA] block">Peak Delivery Wave</span>
          <span className="font-serif text-xl text-[#C5A880]">2028 • AED 39.8B</span>
        </div>
      </div>

      {/* Bar Chart Visualization */}
      <div className="grid grid-cols-5 gap-3 sm:gap-6 items-end h-64 pt-8 pb-4 border-b border-[#2A2A2E]">
        {DELIVERY_FORECAST.map((item) => {
          const heightPct = Math.round((item.estimatedValueBillion / maxBillion) * 100);
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
                className={`mb-2 text-[11px] font-mono transition-all text-center ${
                  isSelected ? 'text-[#C5A880] font-bold scale-105' : 'text-[#71717A] group-hover:text-white'
                }`}
              >
                <span>AED {item.estimatedValueBillion}B</span>
                <span className="hidden sm:block text-[9px] text-[#A1A1AA] font-sans">
                  {item.projectsCount} projs
                </span>
              </div>

              {/* Bar */}
              <div className="w-full max-w-[48px] bg-[#2A2A2E] rounded-t-sm overflow-hidden flex flex-col justify-end h-full">
                <div
                  style={{ height: `${heightPct}%` }}
                  className={`w-full transition-all duration-500 relative ${
                    isSelected
                      ? 'bg-[#C5A880]'
                      : isPeak
                      ? 'bg-[#8F7453] group-hover:bg-[#C5A880]'
                      : 'bg-[#3E3E42] group-hover:bg-[#52525B]'
                  }`}
                >
                  {isPeak && (
                    <span className="absolute top-1 left-1/2 -translate-x-1/2 text-[8px] uppercase tracking-wider text-[#18181A] font-bold hidden sm:inline-block">
                      Peak
                    </span>
                  )}
                </div>
              </div>

              {/* X Axis Label */}
              <div className="mt-3 text-center">
                <span
                  className={`text-xs uppercase font-mono tracking-wider block ${
                    isSelected ? 'text-[#C5A880] font-bold' : 'text-[#A1A1AA]'
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
      <div className="mt-6 pt-2 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
        <div className="bg-[#212124] p-3 rounded-sm border border-[#2A2A2E]">
          <span className="text-[10px] text-[#A1A1AA] block uppercase">Scheduled Handovers</span>
          <span className="text-base text-white font-semibold">{activeYear.projectsCount} Projects</span>
        </div>
        <div className="bg-[#212124] p-3 rounded-sm border border-[#2A2A2E]">
          <span className="text-[10px] text-[#A1A1AA] block uppercase">Committed Capital</span>
          <span className="text-base text-[#C5A880] font-semibold">AED {activeYear.estimatedValueBillion} Billion</span>
        </div>
        <div className="bg-[#212124] p-3 rounded-sm border border-[#2A2A2E]">
          <span className="text-[10px] text-[#A1A1AA] block uppercase">Estimated Units</span>
          <span className="text-base text-white font-semibold">{activeYear.unitsCount.toLocaleString()} Units</span>
        </div>
        <div className="bg-[#212124] p-3 rounded-sm border border-[#2A2A2E]">
          <span className="text-[10px] text-[#A1A1AA] block uppercase">Share of Pipeline</span>
          <span className="text-base text-white font-semibold">{activeYear.percentageOfPipeline}%</span>
        </div>
      </div>
    </div>
  );
};

export const TopDevelopersChart: React.FC = () => {
  const maxVal = TOP_DEVELOPERS_CAPITAL[0].capitalValueBillion;

  return (
    <div className="bg-white p-6 sm:p-8 rounded-sm border border-[#E5E0D8]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C5A880] font-mono mb-1">
            <Award className="w-3.5 h-3.5" />
            <span>Developer Capital Share</span>
          </div>
          <h3 className="font-serif text-2xl text-[#18181A] font-light">
            Top Master Developers by Capital Investment
          </h3>
        </div>
        <span className="text-xs text-[#71717A]">Official DLD Registered Pipeline</span>
      </div>

      <div className="space-y-4">
        {TOP_DEVELOPERS_CAPITAL.map((dev, idx) => {
          const widthPct = Math.round((dev.capitalValueBillion / maxVal) * 100);
          return (
            <div key={dev.name} className="group">
              <div className="flex justify-between items-baseline text-xs mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-[#C5A880] font-bold w-4">{idx + 1}.</span>
                  <span className="font-medium text-[#18181A] group-hover:text-[#C5A880] transition-colors">
                    {dev.name}
                  </span>
                  <span className="text-[10px] text-[#71717A] bg-[#F7F5F0] px-2 py-0.5 border border-[#E5E0D8]">
                    {dev.projectsCount} {dev.projectsCount === 1 ? 'project' : 'projects'}
                  </span>
                </div>
                <div className="font-mono text-right">
                  <span className="font-semibold text-[#18181A]">AED {dev.capitalValueBillion}B</span>
                  <span className="text-[10px] text-[#71717A] ml-2">({dev.sharePct}%)</span>
                </div>
              </div>
              <div className="w-full bg-[#F7F5F0] h-3 rounded-xs overflow-hidden border border-[#E5E0D8]">
                <div
                  style={{ width: `${widthPct}%` }}
                  className="bg-[#18181A] group-hover:bg-[#C5A880] h-full transition-all duration-500 rounded-xs"
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
    <div className="bg-white p-6 sm:p-8 rounded-sm border border-[#E5E0D8]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C5A880] font-mono mb-1">
            <MapPin className="w-3.5 h-3.5" />
            <span>Growth Corridors</span>
          </div>
          <h3 className="font-serif text-2xl text-[#18181A] font-light">
            Top Districts by Pipeline Investment
          </h3>
        </div>
        <span className="text-xs text-[#71717A]">Capital Allocation</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {AREA_GROWTH_HOTSPOTS.map((area) => (
          <div
            key={area.name}
            className="p-4 bg-[#F7F5F0] border border-[#E5E0D8] hover:border-[#C5A880] transition-all"
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-serif text-base text-[#18181A] font-medium">{area.name}</h4>
              <span className="text-xs font-mono font-bold text-[#C5A880] bg-[#18181A] text-white px-2 py-0.5">
                AED {area.capitalValueBillion}B
              </span>
            </div>
            <p className="text-[11px] text-[#71717A] mb-3">{area.type}</p>
            <div className="flex items-center justify-between text-[11px] font-mono text-[#71717A] border-t border-[#E5E0D8] pt-2">
              <span>Active Schemes:</span>
              <span className="font-semibold text-[#18181A]">{area.projectsCount} Mega Projects</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const SupplyZoningMetrics: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Ready vs Off-Plan */}
      <div className="bg-[#18181A] text-white p-6 rounded-sm border border-[#2A2A2E]">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C5A880] font-mono mb-3">
          <Layers className="w-3.5 h-3.5" />
          <span>Building Supply Mix</span>
        </div>
        <h4 className="font-serif text-xl text-white font-light mb-4">
          Ready vs. Off-Plan Supply
        </h4>
        <div className="flex h-4 rounded-xs overflow-hidden mb-3">
          <div style={{ width: '51%' }} className="bg-[#C5A880]" title="Ready: 51%" />
          <div style={{ width: '49%' }} className="bg-[#3E3E42]" title="Off-Plan: 49%" />
        </div>
        <div className="flex justify-between text-xs font-mono">
          <div>
            <span className="inline-block w-2 h-2 rounded-full bg-[#C5A880] mr-1.5" />
            <span className="text-white font-bold">51% Ready</span>
            <span className="block text-[10px] text-[#A1A1AA]">6,252 completed</span>
          </div>
          <div className="text-right">
            <span className="inline-block w-2 h-2 rounded-full bg-[#71717A] mr-1.5" />
            <span className="text-white font-bold">49% Off-Plan</span>
            <span className="block text-[10px] text-[#A1A1AA]">6,021 under build</span>
          </div>
        </div>
        <p className="text-[11px] text-[#A1A1AA] mt-4 pt-3 border-t border-[#2A2A2E] leading-relaxed">
          From 12,273 registered buildings and villas, balanced parity prevents secondary market flooding.
        </p>
      </div>

      {/* Land Zoning Distribution */}
      <div className="bg-[#18181A] text-white p-6 rounded-sm border border-[#2A2A2E]">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C5A880] font-mono mb-3">
          <Building2 className="w-3.5 h-3.5" />
          <span>DLD Land Registry</span>
        </div>
        <h4 className="font-serif text-xl text-white font-light mb-4">
          262,455 Land Parcels
        </h4>
        <div className="space-y-2 text-xs font-mono">
          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-[#C5A880]">Commercial Zoning</span>
              <span>57.0% (149,642)</span>
            </div>
            <div className="w-full bg-[#2A2A2E] h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#C5A880] h-full" style={{ width: '57%' }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-white">Residential Zoning</span>
              <span>22.9% (60,035)</span>
            </div>
            <div className="w-full bg-[#2A2A2E] h-1.5 rounded-full overflow-hidden">
              <div className="bg-white h-full" style={{ width: '22.9%' }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-[#A1A1AA]">Industrial & Logistics</span>
              <span>4.3% (11,305)</span>
            </div>
            <div className="w-full bg-[#2A2A2E] h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#71717A] h-full" style={{ width: '4.3%' }} />
            </div>
          </div>
        </div>
        <p className="text-[11px] text-[#A1A1AA] mt-4 pt-3 border-t border-[#2A2A2E] leading-relaxed">
          129,433 parcels (49.3%) are designated 100% Freehold for international ownership.
        </p>
      </div>

      {/* Escrow & Project Execution Security */}
      <div className="bg-[#18181A] text-white p-6 rounded-sm border border-[#2A2A2E]">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C5A880] font-mono mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Project Governance</span>
        </div>
        <h4 className="font-serif text-xl text-white font-light mb-4">
          Execution & Escrow Health
        </h4>
        <div className="space-y-3 font-mono text-xs">
          <div className="flex justify-between items-center bg-[#212124] p-2.5 rounded-sm border border-[#2A2A2E]">
            <span className="text-[#C5A880]">Active Construction</span>
            <span className="font-bold text-white">252 Projects (75.9%)</span>
          </div>
          <div className="flex justify-between items-center bg-[#212124] p-2.5 rounded-sm border border-[#2A2A2E]">
            <span className="text-[#A1A1AA]">Pending Clearances</span>
            <span className="font-bold text-white">77 Projects (23.2%)</span>
          </div>
          <div className="flex justify-between items-center bg-[#212124] p-2.5 rounded-sm border border-[#2A2A2E]">
            <span className="text-red-400">Cancelled Schemes</span>
            <span className="font-bold text-white">2 Projects (&lt;0.6%)</span>
          </div>
        </div>
        <p className="text-[11px] text-[#A1A1AA] mt-4 pt-3 border-t border-[#2A2A2E] leading-relaxed">
          Escrow Law No. 8 guarantees investor disbursements strictly upon verified engineering completion.
        </p>
      </div>
    </div>
  );
};

export const BenchmarkValuationsTable: React.FC = () => {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-sm border border-[#E5E0D8]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C5A880] font-mono mb-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Official Transactions</span>
          </div>
          <h3 className="font-serif text-2xl text-[#18181A] font-light">
            Landmark DLD Benchmark Valuations
          </h3>
        </div>
        <span className="text-xs text-[#71717A]">Audited Valuations Registry</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[#E5E0D8] text-[10px] uppercase font-mono tracking-wider text-[#71717A]">
              <th className="pb-3">Location / Enclave</th>
              <th className="pb-3">Typology</th>
              <th className="pb-3">Area (Sq. Meters)</th>
              <th className="pb-3">Record Date</th>
              <th className="pb-3 text-right">Valuation (AED)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E0D8] font-mono">
            {TOP_BENCHMARK_VALUATIONS.map((row) => (
              <tr key={row.area + row.date} className="hover:bg-[#F7F5F0] transition-colors">
                <td className="py-3.5 font-sans font-medium text-[#18181A]">{row.area}</td>
                <td className="py-3.5 text-[#71717A]">{row.subType}</td>
                <td className="py-3.5 text-[#71717A]">{row.areaSqM.toLocaleString()} m²</td>
                <td className="py-3.5 text-[#71717A]">{row.date}</td>
                <td className="py-3.5 text-right font-bold text-[#18181A]">
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
