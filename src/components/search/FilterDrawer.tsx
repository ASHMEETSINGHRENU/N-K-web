import React, { useState } from 'react';
import {
  X,
  Check,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  Search,
  Building,
  Key,
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';
import {
  PROPERTY_TYPES,
  COMPLETION_STATUSES,
  FURNISHING_STATUSES,
  LUXURY_AMENITIES,
  DUBAI_COMMUNITIES
} from '@nestandkey/constants';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: any;
  onChange: (newFilters: any) => void;
  onReset: () => void;
}

const CATEGORIES = [
  { id: 'RENT', label: 'Rent' },
  { id: 'BUY', label: 'Buy' },
  { id: 'OFF_PLAN', label: 'New Projects' },
  { id: 'COMMERCIAL_RENT', label: 'Commercial Rent' },
  { id: 'COMMERCIAL_BUY', label: 'Commercial Buy' }
];

const BEDROOM_OPTIONS = ['Studio', '1', '2', '3', '4', '5', '6', '7', '7+'];
const BATHROOM_OPTIONS = ['1', '2', '3', '4', '5', '6', '7', '7+'];
const RENTAL_PERIODS = ['Yearly', 'Monthly', 'Weekly', 'Daily'];
const PARKING_OPTIONS = ['No Parking', '1 Parking', '2 Parking', '3+ Parking'];
const PROPERTY_STATUSES = ['Available', 'Vacant', 'Occupied', 'Tenanted'];
const DEVELOPER_OPTIONS = [
  'Emaar Properties',
  'Meraas',
  'Nakheel',
  'Omniyat',
  'DAMAC Properties',
  'Sobha Realty',
  'Ellington Properties',
  'Aldar Properties'
];
const HANDOVER_YEARS = ['2024', '2025', '2026', '2027', '2028+'];
const HANDOVER_QUARTERS = ['Q1', 'Q2', 'Q3', 'Q4'];
const AGENTS = [
  'Omar Farooq',
  'Elena Rostova',
  'Tariq Mansoor',
  'Alexander Sterling'
];

export const FilterDrawer: React.FC<FilterDrawerProps> = ({
  isOpen,
  onClose,
  filters,
  onChange,
  onReset
}) => {
  const [showAllAmenities, setShowAllAmenities] = useState(false);

  if (!isOpen) return null;

  const currentCategory = filters.purpose || 'BUY';
  const isRent = currentCategory === 'RENT';
  const isCommercialRent = currentCategory === 'COMMERCIAL_RENT';
  const isCommercialBuy = currentCategory === 'COMMERCIAL_BUY';
  const isCommercial = isCommercialRent || isCommercialBuy;
  const isNewProjects = currentCategory === 'OFF_PLAN';
  const isBuy = currentCategory === 'BUY';

  // Toggle multi-select property type
  const handleTogglePropertyType = (type: string) => {
    const currentTypes = filters.propertyType
      ? String(filters.propertyType).split(',').map((t: string) => t.trim()).filter(Boolean)
      : [];
    const exists = currentTypes.includes(type);
    const updated = exists ? currentTypes.filter((t: string) => t !== type) : [...currentTypes, type];
    onChange({ ...filters, propertyType: updated.join(',') });
  };

  // Toggle multi-select bedrooms
  const handleToggleBedroom = (bed: string) => {
    const currentBeds = filters.bedrooms
      ? String(filters.bedrooms).split(',').map((b: string) => b.trim()).filter(Boolean)
      : [];
    const exists = currentBeds.includes(bed);
    const updated = exists ? currentBeds.filter((b: string) => b !== bed) : [...currentBeds, bed];
    onChange({ ...filters, bedrooms: updated.join(',') });
  };

  // Toggle multi-select bathrooms
  const handleToggleBathroom = (bath: string) => {
    const currentBaths = filters.bathrooms
      ? String(filters.bathrooms).split(',').map((b: string) => b.trim()).filter(Boolean)
      : [];
    const exists = currentBaths.includes(bath);
    const updated = exists ? currentBaths.filter((b: string) => b !== bath) : [...currentBaths, bath];
    onChange({ ...filters, bathrooms: updated.join(',') });
  };

  const selectedPropertyTypes = filters.propertyType
    ? String(filters.propertyType).split(',').map((t: string) => t.trim()).filter(Boolean)
    : [];
  const selectedBedrooms = filters.bedrooms
    ? String(filters.bedrooms).split(',').map((b: string) => b.trim()).filter(Boolean)
    : [];
  const selectedBathrooms = filters.bathrooms
    ? String(filters.bathrooms).split(',').map((b: string) => b.trim()).filter(Boolean)
    : [];

  const displayedAmenities = showAllAmenities ? LUXURY_AMENITIES : LUXURY_AMENITIES.slice(0, 10);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#0B0B0C]/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-lg bg-[#FDFCF9] text-[#18181A] shadow-2xl border-l border-[#E5E0D8] flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-[#E5E0D8] flex items-center justify-between bg-[#F7F5F0]">
            <div>
              <h3 className="font-serif text-2xl tracking-wide font-light">Refine Search</h3>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#C5A880] font-mono mt-0.5">
                Precision Discovery Parameters
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#71717A] hover:text-[#18181A] hover:bg-[#E5E0D8]/40 rounded transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Filter Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-7 text-xs">
            {/* 1. Category Filter */}
            <div>
              <label className="block text-[11px] uppercase tracking-[0.16em] font-semibold text-[#18181A] mb-2.5">
                Property Category
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {CATEGORIES.map((cat) => {
                  const isSelected = (filters.purpose || 'BUY') === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => onChange({ ...filters, purpose: cat.id })}
                      className={`py-2 px-3 text-[10px] uppercase tracking-wider border text-center transition-all ${
                        isSelected
                          ? 'border-[#C5A880] bg-[#18181A] text-[#C5A880] font-bold shadow-sm'
                          : 'border-[#E5E0D8] bg-[#F7F5F0] text-[#71717A] hover:border-[#C5A880]'
                      }`}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Location (City / Community) */}
            <div>
              <label className="block text-[11px] uppercase tracking-[0.16em] font-semibold text-[#18181A] mb-2">
                Location & Community
              </label>
              <select
                value={filters.community || ''}
                onChange={(e) => onChange({ ...filters, community: e.target.value })}
                className="w-full bg-[#F7F5F0] border border-[#E5E0D8] px-3 py-2 text-xs text-[#18181A] focus:outline-none focus:border-[#C5A880]"
              >
                <option value="">All Dubai Prime Communities</option>
                {DUBAI_COMMUNITIES.map((c) => (
                  <option key={c.slug} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 3. Keywords Search */}
            <div>
              <label className="block text-[11px] uppercase tracking-[0.16em] font-semibold text-[#18181A] mb-2">
                Keywords & Features
              </label>
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A]" />
                <input
                  type="text"
                  placeholder="e.g. Sea view, upgraded, brand new, private beach..."
                  value={filters.keywords || filters.search || ''}
                  onChange={(e) => onChange({ ...filters, keywords: e.target.value, search: e.target.value })}
                  className="w-full bg-[#F7F5F0] border border-[#E5E0D8] pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-[#C5A880]"
                />
              </div>
            </div>

            {/* 4. Property Type (Multi-select) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] uppercase tracking-[0.16em] font-semibold text-[#18181A]">
                  Property Type
                </label>
                {selectedPropertyTypes.length > 0 && (
                  <span className="text-[10px] text-[#C5A880] font-mono">
                    {selectedPropertyTypes.length} selected
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {PROPERTY_TYPES.map((type) => {
                  const isSelected = selectedPropertyTypes.includes(type);
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => handleTogglePropertyType(type)}
                      className={`py-2 px-2 text-[10px] uppercase tracking-wider border text-center transition-all truncate ${
                        isSelected
                          ? 'border-[#C5A880] bg-[#18181A] text-[#C5A880] font-semibold'
                          : 'border-[#E5E0D8] bg-[#F7F5F0] text-[#71717A] hover:border-[#C5A880]'
                      }`}
                    >
                      {type}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 5. Bedrooms & Bathrooms (Hidden for commercial properties) */}
            {!isCommercial && (
              <>
                {/* Bedrooms */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-[11px] uppercase tracking-[0.16em] font-semibold text-[#18181A]">
                      Bedrooms
                    </label>
                    {selectedBedrooms.length > 0 && (
                      <span className="text-[10px] text-[#C5A880] font-mono">
                        {selectedBedrooms.join(', ')}
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-5 sm:grid-cols-9 gap-1">
                    {BEDROOM_OPTIONS.map((bed) => {
                      const isSelected = selectedBedrooms.includes(bed);
                      return (
                        <button
                          key={bed}
                          type="button"
                          onClick={() => handleToggleBedroom(bed)}
                          className={`py-2 text-[10px] font-mono border text-center transition-all ${
                            isSelected
                              ? 'border-[#C5A880] bg-[#18181A] text-[#C5A880] font-bold'
                              : 'border-[#E5E0D8] bg-[#F7F5F0] text-[#71717A] hover:border-[#C5A880]'
                          }`}
                        >
                          {bed}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Bathrooms */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-[11px] uppercase tracking-[0.16em] font-semibold text-[#18181A]">
                      Bathrooms
                    </label>
                    {selectedBathrooms.length > 0 && (
                      <span className="text-[10px] text-[#C5A880] font-mono">
                        {selectedBathrooms.join(', ')}
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-4 sm:grid-cols-8 gap-1">
                    {BATHROOM_OPTIONS.map((bath) => {
                      const isSelected = selectedBathrooms.includes(bath);
                      return (
                        <button
                          key={bath}
                          type="button"
                          onClick={() => handleToggleBathroom(bath)}
                          className={`py-2 text-[10px] font-mono border text-center transition-all ${
                            isSelected
                              ? 'border-[#C5A880] bg-[#18181A] text-[#C5A880] font-bold'
                              : 'border-[#E5E0D8] bg-[#F7F5F0] text-[#71717A] hover:border-[#C5A880]'
                          }`}
                        >
                          {bath}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}

            {/* 6. Price Range (AED) */}
            <div>
              <label className="block text-[11px] uppercase tracking-[0.16em] font-semibold text-[#18181A] mb-2">
                Price Range (AED)
              </label>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  placeholder="Min Price (AED)"
                  value={filters.minPrice || ''}
                  onChange={(e) => onChange({ ...filters, minPrice: e.target.value })}
                  className="w-full bg-[#F7F5F0] border border-[#E5E0D8] px-3 py-2 text-xs focus:outline-none focus:border-[#C5A880]"
                />
                <input
                  type="number"
                  placeholder="Max Price (AED)"
                  value={filters.maxPrice || ''}
                  onChange={(e) => onChange({ ...filters, maxPrice: e.target.value })}
                  className="w-full bg-[#F7F5F0] border border-[#E5E0D8] px-3 py-2 text-xs focus:outline-none focus:border-[#C5A880]"
                />
              </div>
            </div>

            {/* 7. Rental Period & Number of Cheques (Only for Rent & Commercial Rent) */}
            {(isRent || isCommercialRent) && (
              <>
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.16em] font-semibold text-[#18181A] mb-2">
                    Rental Period
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {RENTAL_PERIODS.map((period) => {
                      const isSelected = (filters.rentalPeriod || 'Yearly').toLowerCase() === period.toLowerCase();
                      return (
                        <button
                          key={period}
                          type="button"
                          onClick={() => onChange({ ...filters, rentalPeriod: period.toUpperCase() })}
                          className={`py-2 px-2 text-[10px] uppercase tracking-wider border text-center transition-all ${
                            isSelected
                              ? 'border-[#C5A880] bg-[#18181A] text-[#C5A880] font-bold'
                              : 'border-[#E5E0D8] bg-[#F7F5F0] text-[#71717A] hover:border-[#C5A880]'
                          }`}
                        >
                          {period}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-[0.16em] font-semibold text-[#18181A] mb-2">
                    Number of Cheques
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      min={1}
                      max={12}
                      placeholder="From (e.g. 1)"
                      value={filters.chequesFrom || ''}
                      onChange={(e) => onChange({ ...filters, chequesFrom: e.target.value })}
                      className="w-full bg-[#F7F5F0] border border-[#E5E0D8] px-3 py-2 text-xs focus:outline-none focus:border-[#C5A880]"
                    />
                    <input
                      type="number"
                      min={1}
                      max={12}
                      placeholder="To (e.g. 4)"
                      value={filters.chequesTo || ''}
                      onChange={(e) => onChange({ ...filters, chequesTo: e.target.value })}
                      className="w-full bg-[#F7F5F0] border border-[#E5E0D8] px-3 py-2 text-xs focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>
                </div>
              </>
            )}

            {/* 8. Property Size (sqft) */}
            <div>
              <label className="block text-[11px] uppercase tracking-[0.16em] font-semibold text-[#18181A] mb-2">
                Property Size (sq.ft)
              </label>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  placeholder="Min sq.ft"
                  value={filters.minArea || ''}
                  onChange={(e) => onChange({ ...filters, minArea: e.target.value })}
                  className="w-full bg-[#F7F5F0] border border-[#E5E0D8] px-3 py-2 text-xs focus:outline-none focus:border-[#C5A880]"
                />
                <input
                  type="number"
                  placeholder="Max sq.ft"
                  value={filters.maxArea || ''}
                  onChange={(e) => onChange({ ...filters, maxArea: e.target.value })}
                  className="w-full bg-[#F7F5F0] border border-[#E5E0D8] px-3 py-2 text-xs focus:outline-none focus:border-[#C5A880]"
                />
              </div>
            </div>

            {/* 9. Furnishing Status (Only for residential or lease) */}
            {!isCommercial && (
              <div>
                <label className="block text-[11px] uppercase tracking-[0.16em] font-semibold text-[#18181A] mb-2">
                  Furnishing
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['ALL', ...FURNISHING_STATUSES].map((f) => {
                    const isSelected = (filters.furnishing || 'ALL') === f;
                    return (
                      <button
                        key={f}
                        type="button"
                        onClick={() => onChange({ ...filters, furnishing: f })}
                        className={`py-2 px-2 text-[10px] uppercase tracking-wider border text-center transition-all ${
                          isSelected
                            ? 'border-[#C5A880] bg-[#18181A] text-[#C5A880] font-bold'
                            : 'border-[#E5E0D8] bg-[#F7F5F0] text-[#71717A] hover:border-[#C5A880]'
                        }`}
                      >
                        {f === 'ALL' ? 'All Furnishings' : f.replace('_', ' ')}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 10. Developer & Handover (Conditional for New Projects) */}
            {isNewProjects && (
              <>
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.16em] font-semibold text-[#18181A] mb-2">
                    Master Developer
                  </label>
                  <select
                    value={filters.developer || ''}
                    onChange={(e) => onChange({ ...filters, developer: e.target.value })}
                    className="w-full bg-[#F7F5F0] border border-[#E5E0D8] px-3 py-2 text-xs text-[#18181A] focus:outline-none focus:border-[#C5A880]"
                  >
                    <option value="">All Institutional Developers</option>
                    {DEVELOPER_OPTIONS.map((dev) => (
                      <option key={dev} value={dev}>
                        {dev}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-[0.16em] font-semibold text-[#18181A] mb-2">
                    Handover Year
                  </label>
                  <div className="grid grid-cols-5 gap-1">
                    {HANDOVER_YEARS.map((yr) => {
                      const isSelected = filters.handoverYear === yr;
                      return (
                        <button
                          key={yr}
                          type="button"
                          onClick={() => onChange({ ...filters, handoverYear: isSelected ? '' : yr })}
                          className={`py-2 text-[10px] font-mono border text-center transition-all ${
                            isSelected
                              ? 'border-[#C5A880] bg-[#18181A] text-[#C5A880] font-bold'
                              : 'border-[#E5E0D8] bg-[#F7F5F0] text-[#71717A] hover:border-[#C5A880]'
                          }`}
                        >
                          {yr}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}

            {/* 11. Completion Status (Conditional for Buy & New Projects) */}
            {(isBuy || isNewProjects) && (
              <div>
                <label className="block text-[11px] uppercase tracking-[0.16em] font-semibold text-[#18181A] mb-2">
                  Completion Status
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {COMPLETION_STATUSES.map((status) => {
                    const isSelected = filters.completionStatus === status;
                    return (
                      <button
                        key={status}
                        type="button"
                        onClick={() => onChange({ ...filters, completionStatus: isSelected ? '' : status })}
                        className={`py-2 px-2 text-[10px] uppercase tracking-wider border text-center transition-all ${
                          isSelected
                            ? 'border-[#C5A880] bg-[#18181A] text-[#C5A880] font-bold'
                            : 'border-[#E5E0D8] bg-[#F7F5F0] text-[#71717A] hover:border-[#C5A880]'
                        }`}
                      >
                        {status.replace('_', ' ')}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 12. Parking & Property Status */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-[0.16em] font-semibold text-[#18181A] mb-2">
                  Parking
                </label>
                <select
                  value={filters.parking || ''}
                  onChange={(e) => onChange({ ...filters, parking: e.target.value })}
                  className="w-full bg-[#F7F5F0] border border-[#E5E0D8] px-3 py-2 text-xs focus:outline-none focus:border-[#C5A880]"
                >
                  <option value="">Any Parking</option>
                  {PARKING_OPTIONS.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-[0.16em] font-semibold text-[#18181A] mb-2">
                  Status
                </label>
                <select
                  value={filters.propertyStatus || ''}
                  onChange={(e) => onChange({ ...filters, propertyStatus: e.target.value })}
                  className="w-full bg-[#F7F5F0] border border-[#E5E0D8] px-3 py-2 text-xs focus:outline-none focus:border-[#C5A880]"
                >
                  <option value="">All Statuses</option>
                  {PROPERTY_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 13. Agency / Agent */}
            <div>
              <label className="block text-[11px] uppercase tracking-[0.16em] font-semibold text-[#18181A] mb-2">
                Dedicated Specialist / Agent
              </label>
              <select
                value={filters.agent || ''}
                onChange={(e) => onChange({ ...filters, agent: e.target.value })}
                className="w-full bg-[#F7F5F0] border border-[#E5E0D8] px-3 py-2 text-xs text-[#18181A] focus:outline-none focus:border-[#C5A880]"
              >
                <option value="">All RERA Certified Specialists</option>
                {AGENTS.map((agent) => (
                  <option key={agent} value={agent}>
                    {agent}
                  </option>
                ))}
              </select>
            </div>

            {/* 14. Floor Plan & Virtual Tours */}
            <div className="space-y-2 pt-2 border-t border-[#E5E0D8]">
              <label className="block text-[11px] uppercase tracking-[0.16em] font-semibold text-[#18181A] mb-2">
                Floor Plans & Virtual Media
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'hasFloorPlan', label: 'Floor Plan Available' },
                  { id: 'hasVirtualTour', label: '360° Virtual Tour' },
                  { id: 'hasVideoTour', label: 'Video Walkthrough' },
                  { id: 'isUpgraded', label: 'Upgraded Residence' }
                ].map((item) => {
                  const isChecked = Boolean(filters[item.id]);
                  return (
                    <label
                      key={item.id}
                      className={`flex items-center gap-2 p-2 border cursor-pointer text-xs transition-all ${
                        isChecked
                          ? 'border-[#C5A880] bg-[#C5A880]/10 text-[#18181A]'
                          : 'border-[#E5E0D8] bg-[#F7F5F0] text-[#71717A]'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => onChange({ ...filters, [item.id]: e.target.checked })}
                        className="rounded border-[#E5E0D8] text-[#C5A880] focus:ring-0"
                      />
                      <span className="text-[11px]">{item.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* 15. Verified Amenities (With Show More / Show Less) */}
            <div className="pt-2 border-t border-[#E5E0D8]">
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] uppercase tracking-[0.16em] font-semibold text-[#18181A]">
                  Verified Amenities ({LUXURY_AMENITIES.length})
                </label>
                <button
                  type="button"
                  onClick={() => setShowAllAmenities(!showAllAmenities)}
                  className="text-[11px] text-[#C5A880] hover:text-[#B8976C] font-semibold flex items-center gap-0.5"
                >
                  <span>{showAllAmenities ? 'Show Less' : 'Show All'}</span>
                  {showAllAmenities ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
                {displayedAmenities.map((amenity) => {
                  const isChecked = filters.amenities?.includes(amenity);
                  return (
                    <label
                      key={amenity}
                      className="flex items-center gap-2 cursor-pointer text-xs text-[#3E3E42] hover:text-[#18181A] p-1.5 hover:bg-[#F7F5F0]"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked || false}
                        onChange={() => {
                          const current = filters.amenities || [];
                          const updated = isChecked
                            ? current.filter((a: string) => a !== amenity)
                            : [...current, amenity];
                          onChange({ ...filters, amenities: updated });
                        }}
                        className="rounded border-[#E5E0D8] text-[#C5A880] focus:ring-[#C5A880]"
                      />
                      <span className="truncate">{amenity}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer Controls */}
          <div className="p-6 border-t border-[#E5E0D8] bg-[#F7F5F0] flex items-center gap-4">
            <button
              type="button"
              onClick={onReset}
              className="px-5 py-2.5 border border-[#E5E0D8] text-xs uppercase tracking-wider text-[#71717A] hover:text-[#18181A] hover:bg-[#E5E0D8]/40 transition-colors"
            >
              Clear All
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-[#18181A] hover:bg-[#0B0B0C] text-[#F7F5F0] hover:text-[#C5A880] py-2.5 px-4 text-xs font-semibold uppercase tracking-widest transition-all shadow-sm"
            >
              Apply Criteria
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterDrawer;
