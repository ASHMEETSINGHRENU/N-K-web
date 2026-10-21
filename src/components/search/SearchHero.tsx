import React, { useEffect, useId, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { DUBAI_COMMUNITIES, PROPERTY_TYPES } from '@nestandkey/constants';

interface SearchHeroProps {
  className?: string;
}

type MenuKey = 'community' | 'type' | 'price' | 'status';

type Choice = {
  value: string;
  label: string;
  min?: string;
  max?: string;
};

const BUY_PRICES: Choice[] = [
  { value: '', label: 'Any consideration', min: '', max: '' },
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

function QuietMenu({
  label,
  value,
  placeholder,
  options,
  open,
  onToggle,
  onChange
}: {
  label: string;
  value: string;
  placeholder: string;
  options: Choice[];
  open: boolean;
  onToggle: () => void;
  onChange: (value: string) => void;
}) {
  const listId = useId();
  const current = options.find((option) => option.value === value)?.label ?? placeholder;

  return (
    <div className="relative min-w-0">
      <p className="text-[11px] uppercase tracking-[0.2em] text-[#6B7280]">{label}</p>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={listId}
        className="mt-3 flex w-full items-center justify-between gap-3 border-b border-[#E9E1D4] pb-3 text-left"
      >
        <span className="min-w-0 font-display text-[1.55rem] leading-tight text-[#102A43]">{current}</span>
        <ChevronDown className={`h-4 w-4 shrink-0 text-[#B08D57] transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <ul
          id={listId}
          role="listbox"
          className="absolute left-0 right-0 top-[calc(100%+8px)] z-40 max-h-72 overflow-y-auto border border-[#E9E1D4] bg-[#FFFDF8] py-2 shadow-[0_24px_50px_-28px_rgba(16,42,67,0.55)]"
        >
          {options.map((option) => {
            const selected = option.value === value;
            return (
              <li key={option.label}>
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => onChange(option.value)}
                  className={`block w-full px-4 py-2.5 text-left text-sm transition-colors ${
                    selected ? 'bg-[#F7F3EA] text-[#102A43]' : 'text-[#3E4852] hover:bg-[#F7F3EA] hover:text-[#102A43]'
                  }`}
                >
                  {option.label}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export const SearchHero: React.FC<SearchHeroProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  const panelRef = useRef<HTMLDivElement>(null);
  const [purpose, setPurpose] = useState<'BUY' | 'RENT'>('BUY');
  const [community, setCommunity] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [priceBand, setPriceBand] = useState('');
  const [completionStatus, setCompletionStatus] = useState('');
  const [openMenu, setOpenMenu] = useState<MenuKey | null>(null);

  const prices = purpose === 'RENT' ? RENT_PRICES : BUY_PRICES;
  const selectedPrice = prices.find((band) => band.value === priceBand) ?? prices[0];
  const hasChoices = Boolean(community || propertyType || bedrooms || priceBand || completionStatus || purpose === 'RENT');

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
    if (community) params.set('community', community);
    if (propertyType) params.set('type', propertyType);
    if (bedrooms) params.set('beds', bedrooms);
    if (selectedPrice.min) params.set('minPrice', selectedPrice.min);
    if (selectedPrice.max) params.set('maxPrice', selectedPrice.max);
    if (completionStatus) params.set('completionStatus', completionStatus);
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <div
      ref={panelRef}
      className={`w-full overflow-visible bg-[#FFFDF8] border border-[#E9E1D4] px-5 py-7 sm:px-8 sm:py-9 lg:px-10 lg:py-10 font-ui ${className}`}
    >
      <div className="flex flex-col gap-8 border-b border-[#E9E1D4] pb-7 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          <p className="crest-kicker text-[#B08D57]">A private search</p>
          <h2 className="mt-3 font-display text-4xl leading-none text-[#102A43] sm:text-5xl">Begin with a residence</h2>
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
        <div className="grid grid-cols-1 gap-x-8 gap-y-7 pt-8 md:grid-cols-2 xl:grid-cols-4">
          <QuietMenu
            label="Community"
            value={community}
            placeholder="All communities"
            options={[
              { value: '', label: 'All communities' },
              ...DUBAI_COMMUNITIES.map((item) => ({ value: item.name, label: item.name }))
            ]}
            open={openMenu === 'community'}
            onToggle={() => toggleMenu('community')}
            onChange={(next) => {
              setCommunity(next);
              setOpenMenu(null);
            }}
          />
          <QuietMenu
            label="Residence"
            value={propertyType}
            placeholder="All residences"
            options={[
              { value: '', label: 'All residences' },
              ...PROPERTY_TYPES.map((item) => ({ value: item, label: item }))
            ]}
            open={openMenu === 'type'}
            onToggle={() => toggleMenu('type')}
            onChange={(next) => {
              setPropertyType(next);
              setOpenMenu(null);
            }}
          />
          <QuietMenu
            label="Consideration"
            value={priceBand}
            placeholder="Any consideration"
            options={prices}
            open={openMenu === 'price'}
            onToggle={() => toggleMenu('price')}
            onChange={(next) => {
              setPriceBand(next);
              setOpenMenu(null);
            }}
          />
          <QuietMenu
            label="Completion"
            value={completionStatus}
            placeholder="Any residence"
            options={STATUSES}
            open={openMenu === 'status'}
            onToggle={() => toggleMenu('status')}
            onChange={(next) => {
              setCompletionStatus(next);
              setOpenMenu(null);
            }}
          />
        </div>

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
                className="text-[11px] uppercase tracking-[0.18em] text-[#6B7280] hover:text-[#102A43]"
              >
                Clear
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
