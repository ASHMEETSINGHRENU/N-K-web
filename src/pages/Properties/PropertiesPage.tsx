import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { api } from '../../services/api';
import { PropertyCard } from '../../components/property/PropertyCard';
import { PropertyMap } from '../../components/property/PropertyMap';
import { FilterDrawer } from '../../components/search/FilterDrawer';
import { LeadEnquiryModal } from '../../components/forms/LeadEnquiryModal';
import {
  SlidersHorizontal,
  LayoutGrid,
  List,
  Search,
  MapPin,
  X,
  ChevronDown,
  RotateCcw,
  Map as MapIcon
} from 'lucide-react';
import { formatAED } from '@nestandkey/utils';
import { DUBAI_COMMUNITIES, PROPERTY_TYPES } from '@nestandkey/constants';

const CATEGORIES = [
  { id: 'BUY', label: 'Buy' },
  { id: 'RENT', label: 'Rent' },
  { id: 'OFF_PLAN', label: 'New Projects' },
  { id: 'COMMERCIAL_RENT', label: 'Commercial Rent' },
  { id: 'COMMERCIAL_BUY', label: 'Commercial Buy' }
];

const BEDROOM_OPTIONS = ['All', 'Studio', '1', '2', '3', '4', '5', '6', '7+'];

export const PropertiesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const [properties, setProperties] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileTab, setMobileTab] = useState<'list' | 'map'>('list');
  const [selectedPropertyForInquiry, setSelectedPropertyForInquiry] = useState<any | null>(null);

  // Map & Card bidirectional sync
  const [hoveredPropertyId, setHoveredPropertyId] = useState<string | null>(null);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);

  // Determine initial purpose from route path or searchParams
  const getInitialPurpose = () => {
    if (location.pathname.includes('/rent')) return 'RENT';
    if (location.pathname.includes('/off-plan')) return 'OFF_PLAN';
    if (location.pathname.includes('/new-launches')) return 'OFF_PLAN';
    if (location.pathname.includes('/buy')) return 'BUY';
    const p = searchParams.get('purpose');
    if (p) return p.toUpperCase();
    return 'BUY';
  };

  const [filters, setFilters] = useState<any>({
    purpose: getInitialPurpose(),
    community: searchParams.get('community') || '',
    propertyType: searchParams.get('type') || searchParams.get('propertyType') || '',
    bedrooms: searchParams.get('beds') || searchParams.get('bedrooms') || '',
    bathrooms: searchParams.get('bathrooms') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    minArea: searchParams.get('minArea') || '',
    maxArea: searchParams.get('maxArea') || '',
    rentalFrequency: searchParams.get('rentalFrequency') || searchParams.get('rentalPeriod') || '',
    cheques: searchParams.get('cheques') || '',
    furnishing: searchParams.get('furnishing') || '',
    completionStatus: searchParams.get('completionStatus') || '',
    developer: searchParams.get('developer') || '',
    handoverYear: searchParams.get('handoverYear') || '',
    handoverQuarter: searchParams.get('handoverQuarter') || '',
    parking: searchParams.get('parking') || '',
    propertyStatus: searchParams.get('propertyStatus') || '',
    agent: searchParams.get('agent') || '',
    amenities: searchParams.get('amenities') || '',
    sort: searchParams.get('sort') || 'price_desc',
    search: searchParams.get('search') || searchParams.get('keywords') || ''
  });

  const loadProperties = async () => {
    setIsLoading(true);
    try {
      const activeQuery: Record<string, any> = {};
      Object.entries(filters).forEach(([key, val]) => {
        if (val !== undefined && val !== null && val !== '') {
          activeQuery[key] = val;
        }
      });
      const res = await api.getProperties(activeQuery);
      setProperties(res.properties || []);
      setPagination(res.pagination);
    } catch (err) {
      console.error('Failed to load properties:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProperties();
  }, [filters]);

  const handleApplyFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== '') {
        params.set(key, String(val));
      }
    });
    setSearchParams(params, { replace: true });
  };

  const handleCategoryChange = (category: string) => {
    const updated = {
      ...filters,
      purpose: category
    };
    // Reset category-specific filters if switching away
    if (category === 'BUY') {
      delete updated.rentalFrequency;
      delete updated.cheques;
    } else if (category === 'RENT') {
      delete updated.completionStatus;
      delete updated.developer;
      delete updated.handoverYear;
      delete updated.handoverQuarter;
    }
    handleApplyFilterChange(updated);
  };

  const handleResetFilters = () => {
    const cleanFilters = {
      purpose: filters.purpose || 'BUY',
      community: '',
      propertyType: '',
      bedrooms: '',
      bathrooms: '',
      minPrice: '',
      maxPrice: '',
      minArea: '',
      maxArea: '',
      rentalFrequency: '',
      cheques: '',
      furnishing: '',
      completionStatus: '',
      developer: '',
      handoverYear: '',
      handoverQuarter: '',
      parking: '',
      propertyStatus: '',
      agent: '',
      amenities: '',
      sort: 'price_desc',
      search: ''
    };
    handleApplyFilterChange(cleanFilters);
  };

  const removeSingleFilter = (key: string) => {
    const updated = { ...filters, [key]: '' };
    handleApplyFilterChange(updated);
  };

  // Compute active chips
  const activeChips = useMemo(() => {
    const chips: { key: string; label: string; value: string }[] = [];
    if (filters.community) {
      chips.push({ key: 'community', label: 'Community', value: filters.community });
    }
    if (filters.propertyType) {
      chips.push({ key: 'propertyType', label: 'Type', value: filters.propertyType });
    }
    if (filters.bedrooms) {
      chips.push({ key: 'bedrooms', label: 'Beds', value: `${filters.bedrooms} Beds` });
    }
    if (filters.bathrooms) {
      chips.push({ key: 'bathrooms', label: 'Baths', value: `${filters.bathrooms} Baths` });
    }
    if (filters.minPrice || filters.maxPrice) {
      const minStr = filters.minPrice ? formatAED(Number(filters.minPrice)) : '0';
      const maxStr = filters.maxPrice ? formatAED(Number(filters.maxPrice)) : 'Any';
      chips.push({ key: 'minPrice', label: 'Price', value: `${minStr} – ${maxStr}` });
    }
    if (filters.minArea || filters.maxArea) {
      chips.push({
        key: 'minArea',
        label: 'Area',
        value: `${filters.minArea || '0'} – ${filters.maxArea || 'Any'} sq.ft`
      });
    }
    if (filters.furnishing) {
      chips.push({ key: 'furnishing', label: 'Furnishing', value: filters.furnishing });
    }
    if (filters.completionStatus) {
      chips.push({ key: 'completionStatus', label: 'Status', value: filters.completionStatus });
    }
    if (filters.developer) {
      chips.push({ key: 'developer', label: 'Developer', value: filters.developer });
    }
    if (filters.rentalFrequency) {
      chips.push({ key: 'rentalFrequency', label: 'Frequency', value: filters.rentalFrequency });
    }
    if (filters.cheques) {
      chips.push({ key: 'cheques', label: 'Cheques', value: `${filters.cheques} Cheques` });
    }
    if (filters.amenities) {
      chips.push({ key: 'amenities', label: 'Amenities', value: filters.amenities });
    }
    if (filters.search) {
      chips.push({ key: 'search', label: 'Keyword', value: `"${filters.search}"` });
    }
    return chips;
  }, [filters]);

  const activeFilterCount = activeChips.length;

  const currentCategoryObj =
    CATEGORIES.find((c) => c.id === (filters.purpose || 'BUY')) || CATEGORIES[0];

  return (
    <div className="pt-28 pb-20 bg-[#FDFCF9] min-h-screen text-[#18181A]">
      <div className="max-w-[1740px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header Title Section */}
        <div className="mb-6 pb-4 border-b border-[#E5E0D8] flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold font-mono">
                Dubai Prime Portfolio
              </span>
              <span className="text-[#E5E0D8]">/</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#71717A] font-medium">
                {currentCategoryObj.label}
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#18181A] font-light tracking-tight">
              {filters.purpose === 'RENT'
                ? 'Prime Dubai Residences For Lease'
                : filters.purpose === 'OFF_PLAN'
                ? 'Off-Plan & New Launch Projects'
                : filters.purpose === 'COMMERCIAL_RENT'
                ? 'Commercial Spaces For Lease'
                : filters.purpose === 'COMMERCIAL_BUY'
                ? 'Commercial Real Estate For Sale'
                : 'Luxury Dubai Properties For Sale'}
            </h1>
            <p className="text-xs text-[#71717A] mt-1.5">
              Showing <span className="font-medium text-[#18181A]">{properties.length}</span> curated
              exceptional residences across Dubai's most prestigious enclaves.
            </p>
          </div>

          {/* View Mode & Sort Controls */}
          <div className="flex items-center gap-3">
            {/* Sort Select */}
            <div className="relative">
              <select
                value={filters.sort}
                onChange={(e) => handleApplyFilterChange({ ...filters, sort: e.target.value })}
                className="bg-[#F7F5F0] border border-[#E5E0D8] px-3 py-2 text-xs text-[#18181A] uppercase tracking-wider focus:outline-none focus:border-[#C5A880] transition-colors cursor-pointer"
              >
                <option value="price_desc">Price: High to Low</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="beds_desc">Most Bedrooms</option>
                <option value="area_desc">Largest Area</option>
                <option value="newest">Latest Additions</option>
              </select>
            </div>

            {/* Desktop Grid/List toggle */}
            <div className="hidden sm:flex border border-[#E5E0D8] bg-[#F7F5F0]">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 transition-colors ${
                  viewMode === 'grid' ? 'bg-[#18181A] text-[#C5A880]' : 'text-[#71717A] hover:text-[#18181A]'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 transition-colors ${
                  viewMode === 'list' ? 'bg-[#18181A] text-[#C5A880]' : 'text-[#71717A] hover:text-[#18181A]'
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 1. Category Filter Tabs */}
        <div className="mb-4">
          <div className="inline-flex flex-wrap gap-1.5 p-1 bg-[#F7F5F0] border border-[#E5E0D8]">
            {CATEGORIES.map((cat) => {
              const isActive = (filters.purpose || 'BUY') === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`px-4 py-2 text-xs uppercase tracking-[0.14em] font-medium transition-all ${
                    isActive
                      ? 'bg-[#18181A] text-[#C5A880] shadow-sm font-semibold'
                      : 'text-[#71717A] hover:text-[#18181A] hover:bg-[#E5E0D8]/40'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Quick Filter Toolbar */}
        <div className="bg-[#F7F5F0] border border-[#E5E0D8] p-3 mb-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2.5 items-center">
            {/* Keyword / Free text search */}
            <div className="relative lg:col-span-2">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A]" />
              <input
                type="text"
                placeholder="Search villas, penthouses, Burj Khalifa..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                onKeyDown={(e) => e.key === 'Enter' && handleApplyFilterChange(filters)}
                className="w-full bg-[#FDFCF9] border border-[#E5E0D8] pl-8 pr-3 py-2 text-xs text-[#18181A] focus:outline-none focus:border-[#C5A880] transition-colors"
              />
              {filters.search && (
                <button
                  onClick={() => {
                    const u = { ...filters, search: '' };
                    handleApplyFilterChange(u);
                  }}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#71717A] hover:text-[#18181A]"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Location / Community Dropdown */}
            <div>
              <select
                value={filters.community}
                onChange={(e) => handleApplyFilterChange({ ...filters, community: e.target.value })}
                className="w-full bg-[#FDFCF9] border border-[#E5E0D8] px-3 py-2 text-xs text-[#18181A] focus:outline-none focus:border-[#C5A880] transition-colors cursor-pointer"
              >
                <option value="">All Communities</option>
                {DUBAI_COMMUNITIES.map((comm) => (
                  <option key={comm.slug} value={comm.name}>
                    {comm.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Property Type Dropdown */}
            <div>
              <select
                value={filters.propertyType}
                onChange={(e) => handleApplyFilterChange({ ...filters, propertyType: e.target.value })}
                className="w-full bg-[#FDFCF9] border border-[#E5E0D8] px-3 py-2 text-xs text-[#18181A] focus:outline-none focus:border-[#C5A880] transition-colors cursor-pointer"
              >
                <option value="">All Property Types</option>
                {PROPERTY_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Bedrooms Quick Dropdown */}
            <div>
              <select
                value={filters.bedrooms}
                onChange={(e) => handleApplyFilterChange({ ...filters, bedrooms: e.target.value === 'All' ? '' : e.target.value })}
                className="w-full bg-[#FDFCF9] border border-[#E5E0D8] px-3 py-2 text-xs text-[#18181A] focus:outline-none focus:border-[#C5A880] transition-colors cursor-pointer"
              >
                <option value="">Any Bedrooms</option>
                {BEDROOM_OPTIONS.filter((b) => b !== 'All').map((bed) => (
                  <option key={bed} value={bed}>
                    {bed === 'Studio' ? 'Studio' : `${bed} Bedrooms`}
                  </option>
                ))}
              </select>
            </div>

            {/* Open Filter Drawer button */}
            <div className="flex gap-2">
              <button
                onClick={() => setIsFilterDrawerOpen(true)}
                className="w-full flex items-center justify-center gap-2 bg-[#18181A] text-[#F7F5F0] hover:text-[#C5A880] hover:bg-[#232326] px-4 py-2 text-xs uppercase tracking-wider font-semibold transition-all border border-[#18181A]"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Filters</span>
                {activeFilterCount > 0 && (
                  <span className="ml-1 bg-[#C5A880] text-[#18181A] text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {activeFilterCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* 3. Active Filters Chips Bar */}
        {activeChips.length > 0 && (
          <div className="mb-6 flex flex-wrap items-center gap-2 pt-1 pb-2">
            <span className="text-[11px] uppercase tracking-wider text-[#71717A] font-semibold mr-1">
              Active Filters:
            </span>
            {activeChips.map((chip) => (
              <span
                key={chip.key + chip.value}
                className="inline-flex items-center gap-1.5 bg-[#F7F5F0] border border-[#C5A880]/50 text-[#18181A] px-2.5 py-1 text-xs font-medium"
              >
                <span className="text-[10px] text-[#71717A] uppercase">{chip.label}:</span>
                <span className="font-semibold text-[#18181A]">{chip.value}</span>
                <button
                  onClick={() => removeSingleFilter(chip.key)}
                  className="text-[#71717A] hover:text-[#B91C1C] transition-colors ml-0.5"
                  title="Remove filter"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1 text-xs text-[#71717A] hover:text-[#B91C1C] underline uppercase tracking-wider ml-2 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Clear All</span>
            </button>
          </div>
        )}

        {/* 4. Mobile View Switcher (< 1024px) */}
        <div className="lg:hidden flex border border-[#E5E0D8] bg-[#F7F5F0] mb-6 p-1">
          <button
            onClick={() => setMobileTab('list')}
            className={`flex-1 py-2 text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-all ${
              mobileTab === 'list'
                ? 'bg-[#18181A] text-[#C5A880] shadow-sm'
                : 'text-[#71717A] hover:text-[#18181A]'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            <span>List ({properties.length})</span>
          </button>
          <button
            onClick={() => setMobileTab('map')}
            className={`flex-1 py-2 text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-all ${
              mobileTab === 'map'
                ? 'bg-[#18181A] text-[#C5A880] shadow-sm'
                : 'text-[#71717A] hover:text-[#18181A]'
            }`}
          >
            <MapIcon className="w-3.5 h-3.5" />
            <span>Map View</span>
          </button>
        </div>

        {/* 5. Main Split View: Left Listings / Right Google Map */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* LEFT: Property Listings (58% / 60% on desktop) */}
          <div
            className={`w-full ${
              mobileTab === 'map' ? 'hidden lg:block' : 'block'
            } lg:w-[58%] xl:w-[60%] flex-shrink-0`}
          >
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="aspect-[4/5] bg-[#F7F5F0] border border-[#E5E0D8] animate-pulse"
                  />
                ))}
              </div>
            ) : properties.length === 0 ? (
              /* Empty State */
              <div className="text-center py-24 border border-dashed border-[#E5E0D8] bg-[#F7F5F0] p-8">
                <h3 className="font-serif text-2xl text-[#18181A] mb-2 font-light">
                  No matching residences found
                </h3>
                <p className="text-xs text-[#71717A] max-w-md mx-auto mb-6">
                  Try broadening your search criteria, adjusting your budget range, or selecting
                  different Dubai communities.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="bg-[#18181A] text-[#F7F5F0] hover:text-[#C5A880] px-6 py-2.5 text-xs uppercase tracking-widest font-semibold transition-all"
                >
                  Reset All Filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              /* Grid View (2 columns in desktop split-view) */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {properties.map((prop) => (
                  <PropertyCard
                    key={prop._id}
                    property={prop}
                    isHighlighted={hoveredPropertyId === prop._id}
                    onMouseEnter={() => setHoveredPropertyId(prop._id)}
                    onMouseLeave={() => setHoveredPropertyId(null)}
                    onClick={() => setSelectedPropertyId(prop._id)}
                    onInquire={(p) => setSelectedPropertyForInquiry(p)}
                  />
                ))}
              </div>
            ) : (
              /* List View */
              <div className="space-y-5">
                {properties.map((prop) => {
                  const isHighlighted = hoveredPropertyId === prop._id;
                  return (
                    <div
                      key={prop._id}
                      onMouseEnter={() => setHoveredPropertyId(prop._id)}
                      onMouseLeave={() => setHoveredPropertyId(null)}
                      onClick={() => setSelectedPropertyId(prop._id)}
                      className={`bg-[#FDFCF9] border p-4 flex flex-col sm:flex-row gap-5 transition-all duration-300 shadow-sm ${
                        isHighlighted
                          ? 'border-[#C5A880] ring-2 ring-[#C5A880]/60 scale-[1.005]'
                          : 'border-[#E5E0D8] hover:border-[#C5A880]'
                      }`}
                    >
                      <div className="w-full sm:w-64 aspect-[4/3] bg-[#18181A] shrink-0 overflow-hidden relative">
                        <img
                          src={prop.featuredImage}
                          alt={prop.title}
                          className="w-full h-full object-cover luxury-image-zoom"
                        />
                        <span className="absolute top-2 left-2 bg-[#0B0B0C]/85 text-[#F7F5F0] text-[9px] uppercase tracking-widest px-2 py-0.5 border border-[#E5E0D8]/20">
                          {prop.propertyType}
                        </span>
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-mono font-semibold">
                              {prop.community}, Dubai
                            </span>
                            <span className="font-serif text-lg lg:text-xl font-medium text-[#18181A]">
                              {formatAED(prop.priceAED)}
                              {prop.purpose === 'RENT' && (
                                <span className="text-[11px] text-[#71717A] font-light ml-1">
                                  / yr
                                </span>
                              )}
                            </span>
                          </div>
                          <a href={`/property/${prop.slug}`}>
                            <h3 className="font-serif text-lg text-[#18181A] hover:text-[#C5A880] transition-colors line-clamp-1 mb-1.5">
                              {prop.title}
                            </h3>
                          </a>
                          <p className="text-xs text-[#71717A] line-clamp-2 leading-relaxed">
                            {prop.description}
                          </p>
                        </div>
                        <div className="pt-3 border-t border-[#E5E0D8] flex items-center justify-between text-xs text-[#3E3E42]">
                          <div className="flex gap-4">
                            <span>{prop.bedrooms} Beds</span>
                            <span>{prop.bathrooms} Baths</span>
                            <span>{prop.builtUpAreaSqFt?.toLocaleString()} sq.ft</span>
                          </div>
                          <div className="flex gap-3">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedPropertyForInquiry(prop);
                              }}
                              className="text-[11px] uppercase tracking-wider text-[#C5A880] hover:text-[#B8976C] font-semibold"
                            >
                              Enquire
                            </button>
                            <a
                              href={`/property/${prop.slug}`}
                              className="text-[11px] uppercase tracking-wider bg-[#18181A] text-[#F7F5F0] hover:text-[#C5A880] px-3.5 py-1.5 font-medium transition-colors"
                            >
                              View Residence
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* RIGHT: Google Map (42% / 40% on desktop, sticky viewport height) */}
          <div
            className={`w-full ${
              mobileTab === 'list' ? 'hidden lg:block' : 'block'
            } lg:w-[42%] xl:w-[40%] sticky top-24 h-[calc(100vh-7.5rem)] min-h-[500px]`}
          >
            <PropertyMap
              properties={properties}
              hoveredPropertyId={hoveredPropertyId}
              selectedPropertyId={selectedPropertyId}
              onPropertySelect={(prop) => {
                setSelectedPropertyId(prop._id);
              }}
              onPropertyHover={(id) => {
                setHoveredPropertyId(id);
              }}
              onInquire={(prop) => setSelectedPropertyForInquiry(prop)}
              className="w-full h-full border border-[#E5E0D8] shadow-sm overflow-hidden"
            />
          </div>
        </div>
      </div>

      {/* Slide-out 16-Category Filter Drawer */}
      <FilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        filters={filters}
        onChange={handleApplyFilterChange}
        onReset={handleResetFilters}
      />

      {/* Private Lead Enquiry Modal */}
      <LeadEnquiryModal
        isOpen={Boolean(selectedPropertyForInquiry)}
        onClose={() => setSelectedPropertyForInquiry(null)}
        property={selectedPropertyForInquiry}
      />
    </div>
  );
};

