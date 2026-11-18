import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Search, X } from 'lucide-react';
import { DUBAI_COMMUNITIES, PROPERTY_TYPES } from '@nestandkey/constants';

interface SearchHeroProps {
  className?: string;
}

type MenuKey = 'community' | 'type' | 'price' | 'status';

export type Choice = {
  value: string;
  label: string;
  min?: string;
  max?: string;
};

const BUY_PRICES: Choice[] = [
  { value: '', label: 'Any consideration', min: '', max: '' },
  { value: '500k-1m', label: 'AED 500K to 1M', min: '500000', max: '1000000' },
  { value: '1.5m-5m', label: 'AED 1.5M to 5M', min: '1500000', max: '5000000' },
  { value: 'to-5', label: 'Up to AED 5 million', min: '', max: '5000000' },
  { value: '5-15', label: 'AED 5 to 15 million', min: '5000000', max: '15000000' },
  { value: '15-40', label: 'AED 15 to 40 million', min: '15000000', max: '40000000' },
  { value: '40-plus', label: 'Above AED 40 million', min: '40000000', max: '' }
];

const RENT_PRICES: Choice[] = [
  { value: '', label: 'Any consideration', min: '', max: '' },
  { value: 'to-250', label: 'Up to AED 250,000 a year', min: '', max: '250000' },
  { value: '250-500', label: 'AED 250,000 to 500,000', min: '250000', max: '500000' },
  { value: '500-1', label: 'AED 500,000 to 1 million', min: '500000', max: '1000000' },
  { value: '1-plus', label: 'Above AED 1 million a year', min: '1000000', max: '' }
];

const STATUSES: Choice[] = [
  { value: '', label: 'Any residence' },
  { value: 'READY', label: 'Ready' },
  { value: 'OFF_PLAN', label: 'Off-plan' }
];

const BEDROOMS = [
  { value: '', label: 'Any' },
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
  { value: '6', label: '6' },
  { value: '7+', label: '7+' }
];

interface SearchableComboboxProps {
  label: string;
  value: string;
  placeholder: string;
  options: Choice[];
  open: boolean;
  onToggle: () => void;
  onOpen: () => void;
  onClose: () => void;
  onChange: (value: string) => void;
}

function SearchableCombobox({
  label,
  value,
  placeholder,
  options,
  open,
  onToggle,
  onOpen,
  onClose,
  onChange
}: SearchableComboboxProps) {
  const listId = useId();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Selected option label if any
  const selectedOption = useMemo(
    () => options.find((opt) => opt.value === value),
    [options, value]
  );

  // Filter options based on typed search term
  const filteredOptions = useMemo(() => {
    if (!searchTerm.trim()) return options;
    const q = searchTerm.toLowerCase().trim();
    return options.filter(
      (opt) =>
        opt.label.toLowerCase().includes(q) ||
        opt.value.toLowerCase().includes(q)
    );
  }, [options, searchTerm]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (open) {
      setSearchTerm('');
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }
  }, [open]);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setSearchTerm('');
    onClose();
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
    setSearchTerm('');
  };

  const displayTitle = selectedOption ? selectedOption.label : placeholder;
  const isDefaultSelected = !value;

  return (
    <div className="relative min-w-0">
      <p className="text-[11px] uppercase tracking-[0.2em] text-[#6B7280]">{label}</p>
      
      {/* Combobox Trigger: Clickable & displays selected/placeholder with live clear */}
      <div className="mt-3 flex w-full items-center justify-between gap-2 border-b border-[#E9E1D4] pb-3 text-left transition-colors focus-within:border-[#B08D57]">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={listId}
          className="flex-1 truncate text-left focus:outline-none"
        >
          <span
            className={`block truncate font-display text-[1.4rem] sm:text-[1.55rem] leading-tight transition-colors ${
              isDefaultSelected ? 'text-[#102A43]/75' : 'text-[#102A43] font-medium'
            }`}
          >
            {displayTitle}
          </span>
        </button>

        <div className="flex items-center gap-1.5 shrink-0">
          {!isDefaultSelected && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 text-[#9CA3AF] transition-colors hover:text-[#102A43]"
              title={`Clear ${label.toLowerCase()}`}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
          <button
            type="button"
            onClick={onToggle}
            className="p-1 text-[#B08D57] transition-colors hover:text-[#9B7A49]"
            aria-label={`Toggle ${label} options`}
          >
            <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {/* Dropdown with live search filter */}
      {open && (
        <div
          id={listId}
          role="listbox"
          className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 flex max-h-80 flex-col overflow-hidden border border-[#E9E1D4] bg-[#FFFDF8] shadow-[0_24px_50px_-28px_rgba(16,42,67,0.55)]"
        >
          {/* Search box inside dropdown */}
          <div className="border-b border-[#E9E1D4] bg-[#F7F3EA]/70 p-2.5">
            <div className="relative flex items-center">
              <Search className="pointer-events-none absolute left-2.5 h-3.5 w-3.5 text-[#B08D57]" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={`Search ${label.toLowerCase()}...`}
                className="w-full border border-[#E9E1D4] bg-[#FFFDF8] py-1.5 pl-8 pr-7 text-xs text-[#102A43] placeholder-[#9CA3AF] focus:border-[#B08D57] focus:outline-none"
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (filteredOptions.length > 0) {
                      handleSelect(filteredOptions[0].value);
                    } else if (searchTerm.trim()) {
                      handleSelect(searchTerm.trim());
                    }
                  } else if (e.key === 'Escape') {
                    onClose();
                  }
                }}
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="absolute right-2 p-1 text-[#9CA3AF] hover:text-[#102A43]"
                  title="Clear search"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
          </div>

          {/* Options list */}
          <div className="max-h-60 overflow-y-auto py-1.5">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => {
                const selected = option.value === value;
                return (
                  <button
                    key={option.label || option.value}
                    type="button"
                    role="option"
                    aria-selected={selected}
                    onClick={() => handleSelect(option.value)}
                    className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition-colors ${
                      selected
                        ? 'bg-[#F7F3EA] text-[#102A43] font-medium'
                        : 'text-[#3E4852] hover:bg-[#F7F3EA] hover:text-[#102A43]'
                    }`}
                  >
                    <span>{option.label}</span>
                    {selected && <span className="h-1.5 w-1.5 rounded-full bg-[#B08D57]" />}
                  </button>
                );
              })
            ) : (
              <div className="px-4 py-3 text-xs text-[#6B7280]">
                <p>No matching {label.toLowerCase()}</p>
                {searchTerm.trim() && (
                  <button
                    type="button"
                    onClick={() => handleSelect(searchTerm.trim())}
                    className="mt-2 block w-full text-left text-xs font-medium text-[#B08D57] hover:underline"
                  >
                    Use &ldquo;{searchTerm.trim()}&rdquo; as custom filter &rarr;
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export const SearchHero: React.FC<SearchHeroProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  const panelRef = useRef<HTMLDivElement>(null);
  const [purpose, setPurpose] = useState<'BUY' | 'RENT'>('BUY');
  const [searchQuery, setSearchQuery] = useState('');
  const [community, setCommunity] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [priceBand, setPriceBand] = useState('');
  const [completionStatus, setCompletionStatus] = useState('');
  const [openMenu, setOpenMenu] = useState<MenuKey | null>(null);

  const prices = purpose === 'RENT' ? RENT_PRICES : BUY_PRICES;
  const selectedPrice = prices.find((band) => band.value === priceBand) ?? prices[0];
  const hasChoices = Boolean(
    searchQuery ||
    community ||
    propertyType ||
    bedrooms ||
    priceBand ||
    completionStatus ||
    purpose === 'RENT'
  );

  useEffect(() => {
    const onPointer = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenMenu(null);
    };
    document.addEventListener('mousedown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  const toggleMenu = (key: MenuKey) => {
    setOpenMenu((current) => (current === key ? null : key));
  };

  const handlePurpose = (next: 'BUY' | 'RENT') => {
    setPurpose(next);
    setPriceBand('');
    setOpenMenu(null);
  };

  const handleReset = () => {
    setSearchQuery('');
    setCommunity('');
    setPropertyType('');
    setBedrooms('');
    setPriceBand('');
    setCompletionStatus('');
    setPurpose('BUY');
    setOpenMenu(null);
  };

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const params = new URLSearchParams();
    params.set('purpose', purpose);
    if (searchQuery.trim()) params.set('search', searchQuery.trim());
    if (community) params.set('community', community);
    if (propertyType) params.set('type', propertyType);
    if (bedrooms) params.set('beds', bedrooms);
    if (selectedPrice.min) params.set('minPrice', selectedPrice.min);
    if (selectedPrice.max) params.set('maxPrice', selectedPrice.max);
    if (completionStatus) params.set('completionStatus', completionStatus);
    navigate(`/properties?${params.toString()}`);
  };

  const communityOptions: Choice[] = useMemo(
    () => [
      { value: '', label: 'All communities' },
      ...DUBAI_COMMUNITIES.map((item) => ({ value: item.name, label: item.name }))
    ],
    []
  );

  const typeOptions: Choice[] = useMemo(
    () => [
      { value: '', label: 'All residences' },
      ...PROPERTY_TYPES.map((item) => ({ value: item, label: item }))
    ],
    []
  );

  return (
    <div
      ref={panelRef}
      className={`w-full overflow-visible border border-[#E9E1D4] bg-[#FFFDF8] px-5 py-7 font-ui sm:px-8 sm:py-9 lg:px-10 lg:py-10 ${className}`}
    >
      {/* Header section with title and Buy/Lease tabs */}
      <div className="flex flex-col gap-8 border-b border-[#E9E1D4] pb-7 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          <p className="crest-kicker text-[#B08D57]">A private search</p>
          <h2 className="mt-3 font-display text-4xl leading-none text-[#102A43] sm:text-5xl">
            Begin with a residence
          </h2>
        </div>
        <div className="flex flex-wrap items-end gap-8">
          {([
            ['BUY', 'Buy Prime'],
            ['RENT', 'Lease Luxury']
          ] as const).map(([value, label]) => {
            const active = purpose === value;
            return (
              <button
                key={value}
                type="button"
                onClick={() => handlePurpose(value)}
                className={`font-display text-3xl leading-none transition-colors sm:text-4xl ${
                  active ? 'text-[#102A43]' : 'text-[#6B7280] hover:text-[#102A43]'
                }`}
              >
                <span className="block">{label}</span>
                <span className={`mt-3 block h-px w-full ${active ? 'bg-[#B08D57]' : 'bg-transparent'}`} />
              </button>
            );
          })}
        </div>
      </div>

      <form onSubmit={handleSearch}>
        {/* User Search Input (Keywords, Property Title, Developer, Ref Number) */}
        <div className="border-b border-[#E9E1D4] py-6 transition-colors focus-within:border-[#B08D57]">
          <div className="flex items-center justify-between">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#6B7280]">
              Keyword, Project or Reference Search
            </p>
            {searchQuery && (
              <span className="text-[11px] font-medium tracking-[0.14em] text-[#B08D57]">
                Active Search Query
              </span>
            )}
          </div>
          <div className="mt-2.5 flex items-center">
            <Search className="mr-3 h-5 w-5 shrink-0 text-[#B08D57]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by community, residence name, reference ID (e.g. ADM262767), or developer..."
              className="w-full bg-transparent font-display text-xl text-[#102A43] placeholder:font-ui placeholder:text-sm placeholder:text-[#9CA3AF] focus:outline-none sm:text-2xl sm:placeholder:text-base"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="p-1 text-[#9CA3AF] transition-colors hover:text-[#102A43]"
                title="Clear keyword search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* 4 Searchable Combobox Columns (Dropdown + Searching) */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-7 pt-7 md:grid-cols-2 xl:grid-cols-4">
          <SearchableCombobox
            label="Community"
            value={community}
            placeholder="All communities"
            options={communityOptions}
            open={openMenu === 'community'}
            onToggle={() => toggleMenu('community')}
            onOpen={() => setOpenMenu('community')}
            onClose={() => setOpenMenu(null)}
            onChange={(next) => setCommunity(next)}
          />

          <SearchableCombobox
            label="Residence"
            value={propertyType}
            placeholder="All residences"
            options={typeOptions}
            open={openMenu === 'type'}
            onToggle={() => toggleMenu('type')}
            onOpen={() => setOpenMenu('type')}
            onClose={() => setOpenMenu(null)}
            onChange={(next) => setPropertyType(next)}
          />

          <SearchableCombobox
            label="Consideration"
            value={priceBand}
            placeholder="Any consideration"
            options={prices}
            open={openMenu === 'price'}
            onToggle={() => toggleMenu('price')}
            onOpen={() => setOpenMenu('price')}
            onClose={() => setOpenMenu(null)}
            onChange={(next) => setPriceBand(next)}
          />

          <SearchableCombobox
            label="Completion"
            value={completionStatus}
            placeholder="Any residence"
            options={STATUSES}
            open={openMenu === 'status'}
            onToggle={() => toggleMenu('status')}
            onOpen={() => setOpenMenu('status')}
            onClose={() => setOpenMenu(null)}
            onChange={(next) => setCompletionStatus(next)}
          />
        </div>

        {/* Bedrooms selector and Action buttons */}
        <div className="mt-8 flex flex-col gap-6 border-t border-[#E9E1D4] pt-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#6B7280]">Bedrooms</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {BEDROOMS.map((option) => {
                const active = bedrooms === option.value;
                return (
                  <button
                    key={option.label}
                    type="button"
                    onClick={() => setBedrooms(option.value)}
                    className={`min-w-11 px-3 py-2 text-[12px] uppercase tracking-[0.14em] transition-colors ${
                      active
                        ? 'bg-[#102A43] text-[#F7F3EA]'
                        : 'border border-[#E9E1D4] text-[#3E4852] hover:border-[#B08D57]'
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-5 lg:justify-end">
            {hasChoices && (
              <button
                type="button"
                onClick={handleReset}
                className="text-[11px] uppercase tracking-[0.18em] text-[#6B7280] transition-colors hover:text-[#102A43]"
              >
                Clear all filters
              </button>
            )}
            <button
              type="submit"
              className="bg-[#B08D57] px-8 py-4 text-[12px] font-medium uppercase tracking-[0.22em] text-[#102A43] transition-colors hover:bg-[#9B7A49]"
            >
              View the collection
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
