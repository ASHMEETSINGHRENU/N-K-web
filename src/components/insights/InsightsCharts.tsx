import React, { useState } from 'react';
import {
  DELIVERY_FORECAST,
  TOP_DEVELOPERS_CAPITAL,
  AREA_GROWTH_HOTSPOTS,
  TOP_BENCHMARK_VALUATIONS,
  DeliveryForecastYear
} from '../../data/dubaiGovernmentInsights';
import { TrendingUp, Award, MapPin, Building2, Layers, ShieldCheck } from 'lucide-react';

export const HandoverTimelineChart: React.FC = () => {
  const [activeYear, setActiveYear] = useState<DeliveryForecastYear>(DELIVERY_FORECAST[1]); // default to 2028 peak
  const maxBillion = Math.max(...DELIVERY_FORECAST.map((d) => d.estimatedValueBillion));

  return (
    <div className="bg-[#102A43] text-[#F7F3EA] p-6 sm:p-8 rounded-sm border border-[#1E3A5F] font-ui shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#D8C3A5] font-mono mb-1">
            <TrendingUp className="w-3.5 h-3.5 text-[#B08D57]" />
            <span>DLD Official Handover Forecast (2027 – 2032)</span>
          </div>
          <h3 className="font-display text-2xl text-[#F7F3EA] font-normal">
            Scheduled Mega-Project Delivery Crest
          </h3>
        </div>
        <div className="text-right">
          <span className="text-[10px] uppercase tracking-wider text-[#E9E1D4]/70 block">Peak Delivery Wave</span>
          <span className="font-display text-xl text-[#D8C3A5]">2028 • AED 39.8B</span>
        </div>
      </div>

      {/* Bar Chart Visualization */}
      <div className="grid grid-cols-5 gap-3 sm:gap-6 items-end h-64 pt-8 pb-4 border-b border-[#1E3A5F]">
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
                  isSelected ? 'text-[#D8C3A5] font-bold scale-105' : 'text-[#E9E1D4]/70 group-hover:text-white'
                }`}
              >
                <span>AED {item.estimatedValueBillion}B</span>
                <span className="hidden sm:block text-[9px] text-[#E9E1D4]/60 font-sans">
                  {item.projectsCount} projs
                </span>
              </div>

              {/* Bar */}
              <div className="w-full max-w-[48px] bg-[#0B2135] rounded-t-sm overflow-hidden flex flex-col justify-end h-full">
                <div
                  style={{ height: `${heightPct}%` }}
                  className={`w-full transition-all duration-500 relative ${
                    isSelected
                      ? 'bg-[#B08D57]'
                      : isPeak
                      ? 'bg-[#D8C3A5] group-hover:bg-[#B08D57]'
                      : 'bg-[#1E3A5F] group-hover:bg-[#B08D57]/70'
                  }`}
                >
                  {isPeak && (
                    <span className="absolute top-1 left-1/2 -translate-x-1/2 text-[8px] uppercase tracking-wider text-[#102A43] font-bold hidden sm:inline-block">
                      Peak
                    </span>
                  )}
                </div>
              </div>

              {/* X Axis Label */}
              <div className="mt-3 text-center">
                <span
                  className={`text-xs uppercase font-mono tracking-wider block ${
                    isSelected ? 'text-[#D8C3A5] font-bold' : 'text-[#E9E1D4]/80'
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
        <div className="bg-[#0B2135] p-3 rounded-sm border border-[#1E3A5F]">
          <span className="text-[10px] text-[#E9E1D4]/60 block uppercase">Scheduled Handovers</span>
          <span className="text-base text-white font-semibold">{activeYear.projectsCount} Projects</span>
        </div>
        <div className="bg-[#0B2135] p-3 rounded-sm border border-[#1E3A5F]">
          <span className="text-[10px] text-[#E9E1D4]/60 block uppercase">Committed Capital</span>
          <span className="text-base text-[#D8C3A5] font-semibold">AED {activeYear.estimatedValueBillion} Billion</span>
        </div>
        <div className="bg-[#0B2135] p-3 rounded-sm border border-[#1E3A5F]">
          <span className="text-[10px] text-[#E9E1D4]/60 block uppercase">Estimated Units</span>
          <span className="text-base text-white font-semibold">{activeYear.unitsCount.toLocaleString()} Units</span>
        </div>
        <div className="bg-[#0B2135] p-3 rounded-sm border border-[#1E3A5F]">
          <span className="text-[10px] text-[#E9E1D4]/60 block uppercase">Share of Pipeline</span>
          <span className="text-base text-white font-semibold">{activeYear.percentageOfPipeline}%</span>
        </div>
      </div>
    </div>
  );
};

export const TopDevelopersChart: React.FC = () => {
  const maxVal = TOP_DEVELOPERS_CAPITAL[0].capitalValueBillion;

  return (
    <div className="bg-[#FFFDF8] p-6 sm:p-8 rounded-sm border border-[#E9E1D4] font-ui shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#B08D57] font-mono mb-1">
            <Award className="w-3.5 h-3.5" />
            <span>Developer Capital Share</span>
          </div>
          <h3 className="font-display text-2xl text-[#102A43] font-normal">
            Top Master Developers by Capital Investment
          </h3>
        </div>
        <span className="text-xs text-[#6B7280]">Official DLD Registered Pipeline</span>
      </div>

      <div className="space-y-4">
        {TOP_DEVELOPERS_CAPITAL.map((dev, idx) => {
          const widthPct = Math.round((dev.capitalValueBillion / maxVal) * 100);
          return (
            <div key={dev.name} className="group">
              <div className="flex justify-between items-baseline text-xs mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-[#B08D57] font-bold w-4">{idx + 1}.</span>
                  <span className="font-medium text-[#102A43] group-hover:text-[#B08D57] transition-colors">
                    {dev.name}
                  </span>
                  <span className="text-[10px] text-[#6B7280] bg-[#F7F3EA] px-2 py-0.5 border border-[#E9E1D4]">
                    {dev.projectsCount} {dev.projectsCount === 1 ? 'project' : 'projects'}
                  </span>
                </div>
                <div className="font-mono text-right">
                  <span className="font-semibold text-[#102A43]">AED {dev.capitalValueBillion}B</span>
                  <span className="text-[10px] text-[#6B7280] ml-2">({dev.sharePct}%)</span>
                </div>
              </div>
              <div className="w-full bg-[#F7F3EA] h-3 rounded-xs overflow-hidden border border-[#E9E1D4]">
                <div
                  style={{ width: `${widthPct}%` }}
                  className="bg-[#102A43] group-hover:bg-[#B08D57] h-full transition-all duration-500 rounded-xs"
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
    <div className="bg-[#FFFDF8] p-6 sm:p-8 rounded-sm border border-[#E9E1D4] font-ui shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#B08D57] font-mono mb-1">
            <MapPin className="w-3.5 h-3.5" />
            <span>Growth Corridors</span>
          </div>
          <h3 className="font-display text-2xl text-[#102A43] font-normal">
            Top Districts by Pipeline Investment
          </h3>
        </div>
        <span className="text-xs text-[#6B7280]">Capital Allocation</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {AREA_GROWTH_HOTSPOTS.map((area) => (
          <div
            key={area.name}
            className="p-4 bg-[#F7F3EA] border border-[#E9E1D4] hover:border-[#B08D57] transition-all"
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-display text-base text-[#102A43] font-medium">{area.name}</h4>
              <span className="text-xs font-mono font-bold text-[#D8C3A5] bg-[#102A43] px-2 py-0.5">
                AED {area.capitalValueBillion}B
              </span>
            </div>
            <p className="text-[11px] text-[#6B7280] mb-3">{area.type}</p>
            <div className="flex items-center justify-between text-[11px] font-mono text-[#6B7280] border-t border-[#E9E1D4] pt-2">
              <span>Active Schemes:</span>
              <span className="font-semibold text-[#102A43]">{area.projectsCount} Mega Projects</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const SupplyZoningMetrics: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-ui">
      {/* Ready vs Off-Plan */}
      <div className="bg-[#102A43] text-[#F7F3EA] p-6 rounded-sm border border-[#1E3A5F] shadow-sm">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#D8C3A5] font-mono mb-3">
          <Layers className="w-3.5 h-3.5 text-[#B08D57]" />
          <span>Building Supply Mix</span>
        </div>
        <h4 className="font-display text-xl text-[#F7F3EA] font-normal mb-4">
          Ready vs. Off-Plan Supply
        </h4>
        <div className="flex h-4 rounded-xs overflow-hidden mb-3">
          <div style={{ width: '51%' }} className="bg-[#B08D57]" title="Ready: 51%" />
          <div style={{ width: '49%' }} className="bg-[#1E3A5F]" title="Off-Plan: 49%" />
        </div>
        <div className="flex justify-between text-xs font-mono">
          <div>
            <span className="inline-block w-2 h-2 rounded-full bg-[#B08D57] mr-1.5" />
            <span className="text-white font-bold">51% Ready</span>
            <span className="block text-[10px] text-[#E9E1D4]/70">6,252 completed</span>
          </div>
          <div className="text-right">
            <span className="inline-block w-2 h-2 rounded-full bg-[#D8C3A5] mr-1.5" />
            <span className="text-white font-bold">49% Off-Plan</span>
            <span className="block text-[10px] text-[#E9E1D4]/70">6,021 under build</span>
          </div>
        </div>
        <p className="text-[11px] text-[#E9E1D4]/70 mt-4 pt-3 border-t border-[#1E3A5F] leading-relaxed">
          From 12,273 registered buildings and villas, balanced parity prevents secondary market flooding.
        </p>
      </div>

      {/* Land Zoning Distribution */}
      <div className="bg-[#102A43] text-[#F7F3EA] p-6 rounded-sm border border-[#1E3A5F] shadow-sm">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#D8C3A5] font-mono mb-3">
          <Building2 className="w-3.5 h-3.5 text-[#B08D57]" />
          <span>DLD Land Registry</span>
        </div>
        <h4 className="font-display text-xl text-[#F7F3EA] font-normal mb-4">
          262,455 Land Parcels
        </h4>
        <div className="space-y-2 text-xs font-mono">
          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-[#D8C3A5]">Commercial Zoning</span>
              <span>57.0% (149,642)</span>
            </div>
            <div className="w-full bg-[#0B2135] h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#B08D57] h-full" style={{ width: '57%' }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-[#FFFDF8]">Residential Zoning</span>
              <span>22.9% (60,035)</span>
            </div>
            <div className="w-full bg-[#0B2135] h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#FFFDF8] h-full" style={{ width: '22.9%' }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-[#E9E1D4]/70">Industrial & Logistics</span>
              <span>4.3% (11,305)</span>
            </div>
            <div className="w-full bg-[#0B2135] h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#1E3A5F] h-full" style={{ width: '4.3%' }} />
            </div>
          </div>
        </div>
        <p className="text-[11px] text-[#E9E1D4]/70 mt-4 pt-3 border-t border-[#1E3A5F] leading-relaxed">
          129,433 parcels (49.3%) are designated 100% Freehold for international ownership.
        </p>
      </div>

      {/* Escrow & Project Execution Security */}
      <div className="bg-[#102A43] text-[#F7F3EA] p-6 rounded-sm border border-[#1E3A5F] shadow-sm">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#D8C3A5] font-mono mb-3">
          <ShieldCheck className="w-3.5 h-3.5 text-[#B08D57]" />
          <span>Project Governance</span>
        </div>
        <h4 className="font-display text-xl text-[#F7F3EA] font-normal mb-4">
          Execution & Escrow Health
        </h4>
        <div className="space-y-3 font-mono text-xs">
          <div className="flex justify-between items-center bg-[#0B2135] p-2.5 rounded-sm border border-[#1E3A5F]">
            <span className="text-[#D8C3A5]">Active Construction</span>
            <span className="font-bold text-white">252 Projects (75.9%)</span>
          </div>
          <div className="flex justify-between items-center bg-[#0B2135] p-2.5 rounded-sm border border-[#1E3A5F]">
            <span className="text-[#E9E1D4]/80">Pending Clearances</span>
            <span className="font-bold text-white">77 Projects (23.2%)</span>
          </div>
          <div className="flex justify-between items-center bg-[#0B2135] p-2.5 rounded-sm border border-[#1E3A5F]">
            <span className="text-red-400">Cancelled Schemes</span>
            <span className="font-bold text-white">2 Projects (&lt;0.6%)</span>
          </div>
        </div>
        <p className="text-[11px] text-[#E9E1D4]/70 mt-4 pt-3 border-t border-[#1E3A5F] leading-relaxed">
          Escrow Law No. 8 guarantees investor disbursements strictly upon verified engineering completion.
        </p>
      </div>
    </div>
  );
};

export const BenchmarkValuationsTable: React.FC = () => {
  return (
    <div className="bg-[#FFFDF8] p-6 sm:p-8 rounded-sm border border-[#E9E1D4] font-ui shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#B08D57] font-mono mb-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Official Transactions</span>
          </div>
          <h3 className="font-display text-2xl text-[#102A43] font-normal">
            Landmark DLD Benchmark Valuations
          </h3>
        </div>
        <span className="text-xs text-[#6B7280]">Audited Valuations Registry</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[#E9E1D4] text-[10px] uppercase font-mono tracking-wider text-[#6B7280]">
              <th className="pb-3">Location / Enclave</th>
              <th className="pb-3">Typology</th>
              <th className="pb-3">Area (Sq. Meters)</th>
              <th className="pb-3">Record Date</th>
              <th className="pb-3 text-right">Valuation (AED)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E9E1D4] font-mono">
            {TOP_BENCHMARK_VALUATIONS.map((row) => (
              <tr key={row.area + row.date} className="hover:bg-[#F7F3EA] transition-colors">
                <td className="py-3.5 font-sans font-medium text-[#102A43]">{row.area}</td>
                <td className="py-3.5 text-[#6B7280]">{row.subType}</td>
                <td className="py-3.5 text-[#6B7280]">{row.areaSqM.toLocaleString()} m²</td>
                <td className="py-3.5 text-[#6B7280]">{row.date}</td>
                <td className="py-3.5 text-right font-bold text-[#102A43]">
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
