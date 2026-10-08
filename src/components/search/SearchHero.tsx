import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, SlidersHorizontal, MapPin, Building2, Bed } from 'lucide-react';
import { DUBAI_COMMUNITIES, PROPERTY_TYPES } from '@nestandkey/constants';

interface SearchHeroProps {
  onOpenFilters?: () => void;
}

export const SearchHero: React.FC<SearchHeroProps> = ({ onOpenFilters }) => {
  const navigate = useNavigate();
  const [purpose, setPurpose] = useState<'BUY' | 'RENT'>('BUY');
  const [community, setCommunity] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [bedrooms, setBedrooms] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set('purpose', purpose);
    if (community) params.set('community', community);
    if (propertyType) params.set('type', propertyType);
    if (bedrooms) params.set('beds', bedrooms);

    navigate(`/properties?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-[#FFFDF8] border border-[#E9E1D4] p-4 sm:p-6 shadow-2xl font-ui">
      {/* Purpose Switcher (Buy / Rent) */}
      <div className="flex items-center gap-6 mb-4 border-b border-[#E9E1D4] pb-3">
        <button
          type="button"
          onClick={() => setPurpose('BUY')}
          className={`text-xs uppercase tracking-[0.2em] font-medium pb-1 relative transition-colors ${
            purpose === 'BUY'
              ? 'text-[#102A43] font-semibold after:content-[""] after:absolute after:bottom-[-13px] after:left-0 after:right-0 after:h-[2px] after:bg-[#B08D57]'
              : 'text-[#6B7280] hover:text-[#102A43]'
          }`}
        >
          Buy Prime
        </button>
        <button
          type="button"
          onClick={() => setPurpose('RENT')}
          className={`text-xs uppercase tracking-[0.2em] font-medium pb-1 relative transition-colors ${
            purpose === 'RENT'
              ? 'text-[#102A43] font-semibold after:content-[""] after:absolute after:bottom-[-13px] after:left-0 after:right-0 after:h-[2px] after:bg-[#B08D57]'
              : 'text-[#6B7280] hover:text-[#102A43]'
          }`}
        >
          Lease Luxury
        </button>
      </div>

      <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
        {/* Community */}
        <div>
          <label className="block text-[11px] uppercase tracking-[0.14em] text-[#6B7280] mb-1 font-medium">
            Prime Community
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#B08D57] pointer-events-none" />
            <select
              value={community}
              onChange={(e) => setCommunity(e.target.value)}
              className="w-full bg-[#FFFDF8] border border-[#E9E1D4] pl-9 pr-3 py-2.5 text-xs text-[#3E4852] rounded-none focus:outline-none focus:border-[#B08D57] appearance-none"
            >
              <option value="">All Dubai Communities</option>
              {DUBAI_COMMUNITIES.map((c) => (
                <option key={c.slug} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Property Type */}
        <div>
          <label className="block text-[11px] uppercase tracking-[0.14em] text-[#6B7280] mb-1 font-medium">
            Property Typology
          </label>
          <div className="relative">
            <Building2 className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#B08D57] pointer-events-none" />
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full bg-[#FFFDF8] border border-[#E9E1D4] pl-9 pr-3 py-2.5 text-xs text-[#3E4852] rounded-none focus:outline-none focus:border-[#B08D57] appearance-none"
            >
              <option value="">All Typologies</option>
              {PROPERTY_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Bedrooms */}
        <div>
          <label className="block text-[11px] uppercase tracking-[0.14em] text-[#6B7280] mb-1 font-medium">
            Bedrooms
          </label>
          <div className="relative">
            <Bed className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#B08D57] pointer-events-none" />
            <select
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              className="w-full bg-[#FFFDF8] border border-[#E9E1D4] pl-9 pr-3 py-2.5 text-xs text-[#3E4852] rounded-none focus:outline-none focus:border-[#B08D57] appearance-none"
            >
              <option value="">Any Bedrooms</option>
              <option value="2">2+ Bedrooms</option>
              <option value="3">3+ Bedrooms</option>
              <option value="4">4+ Bedrooms</option>
              <option value="5">5+ Bedrooms</option>
              <option value="6">6+ Bedrooms</option>
              <option value="7">7+ Royal Bedrooms</option>
            </select>
          </div>
        </div>

        {/* Search & Filter Buttons */}
        <div className="flex items-center gap-2">
          {onOpenFilters && (
            <button
              type="button"
              onClick={onOpenFilters}
              className="px-3.5 py-2.5 border border-[#E9E1D4] hover:border-[#B08D57] bg-[#FFFDF8] text-[#102A43] text-xs flex items-center justify-center transition-colors"
              title="Advanced Filters"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#B08D57]" />
            </button>
          )}

          <button
            type="submit"
            className="flex-1 bg-[#102A43] hover:bg-[#1E3A5F] text-[#F7F3EA] hover:text-[#D8C3A5] py-2.5 px-4 text-xs font-semibold uppercase tracking-[0.16em] transition-all flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4 text-[#B08D57]" />
            <span>Discover</span>
          </button>
        </div>
      </form>
    </div>
  );
};
