import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Compass,
  Heart,
  Menu,
  X,
  ChevronDown,
  ArrowUpRight
} from 'lucide-react';
import { useFavorites } from '../../context/FavoritesContext';

interface NavLinkItem {
  label: string;
  path: string;
  isExternal?: boolean;
}

interface NavSection {
  title: string;
  path?: string;
  links: NavLinkItem[];
}

interface NavCategory {
  id: string;
  label: string;
  path: string;
  columnsCount?: number;
  sections: NavSection[];
}

const NAVIGATION_DATA: NavCategory[] = [
  {
    id: 'buy',
    label: 'Buy',
    path: '/properties/buy',
    columnsCount: 3,
    sections: [
      {
        title: 'Residential Properties for Sale',
        path: '/properties/buy',
        links: [
          { label: 'Residential Properties for Sale', path: '/properties/buy' },
          { label: 'Apartments', path: '/properties/buy?type=Apartment' },
          { label: 'Villas', path: '/properties/buy?type=Villa' },
          { label: 'Townhouses', path: '/properties/buy?type=Townhouse' },
          { label: 'Land', path: '/properties/buy?type=Plot' }
        ]
      },
      {
        title: 'Buyer Tools',
        links: [
          { label: 'Mortgage Calculator', path: '/mortgage-calculator' },
          { label: 'Sold House Prices', path: '/properties/buy?sort=price_desc' },
          { label: 'Sale Price Map', path: '/locations' }
        ]
      },
      {
        title: 'Buying Insights',
        path: '/insights',
        links: [
          { label: "Buyer's Guide", path: '/insights' },
          { label: 'Area Insights', path: '/locations' },
          { label: 'Community Guides', path: '/communities' },
          { label: 'Tower & Compound Guides', path: '/properties/buy' },
          { label: 'Schools & University Guides', path: '/about' }
        ]
      }
    ]
  },
  {
    id: 'rent',
    label: 'Rent',
    path: '/properties/rent',
    columnsCount: 3,
    sections: [
      {
        title: 'Residential Properties for Rent',
        path: '/properties/rent',
        links: [
          { label: 'Residential Properties for Rent', path: '/properties/rent' },
          { label: 'Apartments', path: '/properties/rent?type=Apartment' },
          { label: 'Studios', path: '/properties/rent?type=Apartment&beds=0' },
          { label: 'Villas', path: '/properties/rent?type=Villa' },
          { label: 'Townhouses', path: '/properties/rent?type=Townhouse' }
        ]
      },
      {
        title: 'Renter Tools',
        links: [
          { label: 'Pay rent monthly', path: '/consultation' },
          { label: 'Rent vs Buy Calculator', path: '/mortgage-calculator' },
          { label: 'Rented House Prices', path: '/properties/rent?sort=price_asc' },
          { label: 'Rental Price Map', path: '/locations' }
        ]
      },
      {
        title: 'Renting Insights',
        path: '/insights',
        links: [
          { label: "Renter's Guide", path: '/insights' },
          { label: 'Area Insights', path: '/locations' },
          { label: 'Community Guides', path: '/communities' },
          { label: 'Tower & Compound Guides', path: '/properties/rent' },
          { label: 'Schools & University Guides', path: '/about' }
        ]
      }
    ]
  },
  {
    id: 'new-projects',
    label: 'New Projects',
    path: '/properties/off-plan',
    columnsCount: 3,
    sections: [
      {
        title: 'All New Projects',
        path: '/properties/off-plan',
        links: [
          { label: 'All New Projects', path: '/properties/off-plan' },
          { label: 'New Projects in Dubai', path: '/properties/off-plan?community=Dubai' },
          { label: 'New Projects in Abu Dhabi', path: '/properties/off-plan?location=Abu+Dhabi' },
          { label: 'New Projects in Sharjah', path: '/properties/off-plan?location=Sharjah' },
          { label: 'New Projects in Ras Al Khaimah', path: '/properties/off-plan?location=RAK' },
          { label: 'New Projects in Umm Al Quwain', path: '/properties/off-plan?location=UAQ' }
        ]
      },
      {
        title: 'Find Developers in the UAE',
        path: '/developers',
        links: [
          { label: 'Find Developers in the UAE', path: '/developers' },
          { label: 'Emaar Properties', path: '/developers/emaar-properties' },
          { label: 'Azizi Developments', path: '/developers/azizi-developments' },
          { label: 'Aldar Properties', path: '/developers/aldar-properties' },
          { label: 'Damac Properties', path: '/developers/damac-properties' },
          { label: 'Sobha Realty', path: '/developers/sobha-realty' }
        ]
      },
      {
        title: 'Investing Insights',
        path: '/insights',
        links: [
          { label: "Investor's Guide", path: '/insights' },
          { label: 'Areas to invest', path: '/locations' },
          { label: 'Latest Projects', path: '/properties/new-launches' }
        ]
      }
    ]
  },
  {
    id: 'find-agents',
    label: 'Find Agents',
    path: '/contact',
    columnsCount: 2,
    sections: [
      {
        title: 'Find Agents',
        path: '/contact',
        links: [
          { label: 'Find an Agent', path: '/contact' },
          { label: 'Top Rated Agents', path: '/about' },
          { label: 'Agents in Dubai', path: '/contact?city=Dubai' },
          { label: 'Agents in Abu Dhabi', path: '/contact?city=Abu+Dhabi' },
          { label: 'Agents in Sharjah', path: '/contact?city=Sharjah' },
          { label: 'Agents in Ajman', path: '/contact?city=Ajman' },
          { label: 'Agents in Ras Al Khaimah', path: '/contact?city=RAK' }
        ]
      },
      {
        title: 'Private Brokerage Services',
        path: '/consultation',
        links: [
          { label: 'Schedule Private Consultation', path: '/consultation' },
          { label: 'RERA Certified Specialists', path: '/about' },
          { label: 'Broker Operations Portal', path: 'http://localhost:5174', isExternal: true }
        ]
      }
    ]
  },
  {
    id: 'tools',
    label: 'Tools',
    path: '/mortgage-calculator',
    columnsCount: 3,
    sections: [
      {
        title: 'Tools',
        links: [
          { label: 'Mortgage Calculator', path: '/mortgage-calculator' },
          { label: 'Rent vs Buy Calculator', path: '/mortgage-calculator' },
          { label: 'Rental Transactions', path: '/properties/rent' },
          { label: 'Sale Transactions', path: '/properties/buy' }
        ]
      },
      {
        title: 'Insights',
        path: '/insights',
        links: [
          { label: 'Market Reports', path: '/insights' },
          { label: 'Renter Guides', path: '/insights' },
          { label: 'Buyer Guides', path: '/insights' },
          { label: 'Popular Communities', path: '/communities' },
          { label: 'Budget-Friendly Areas', path: '/locations' },
          { label: 'Property Blog', path: '/insights' }
        ]
      },
      {
        title: 'Area Insights',
        path: '/locations',
        links: [
          { label: 'Dubai', path: '/locations/palm-jumeirah' },
          { label: 'Abu Dhabi', path: '/locations' },
          { label: 'Sharjah', path: '/locations' },
          { label: 'Ajman', path: '/locations' },
          { label: 'Ras Al Khaimah', path: '/locations' }
        ]
      }
    ]
  },
  {
    id: 'insights',
    label: 'Insights',
    path: '/insights',
    columnsCount: 4,
    sections: [
      {
        title: 'Buying',
        path: '/insights',
        links: [
          { label: "Buyer's Guide", path: '/insights' },
          { label: 'Area Insights', path: '/locations' },
          { label: 'Community Guides', path: '/communities' },
          { label: 'Tower & Compound Guides', path: '/properties/buy' },
          { label: 'Schools & University Guides', path: '/about' }
        ]
      },
      {
        title: 'Renting',
        path: '/insights',
        links: [
          { label: "Renter's Guide", path: '/insights' },
          { label: 'Area Insights', path: '/locations' },
          { label: 'Community Guides', path: '/communities' },
          { label: 'Tower & Compound Guides', path: '/properties/rent' },
          { label: 'Schools & University Guides', path: '/about' }
        ]
      },
      {
        title: 'Market & Investment',
        path: '/insights',
        links: [
          { label: 'Market Reports', path: '/insights' },
          { label: "Investor's Guide", path: '/insights' },
          { label: 'Areas to invest', path: '/locations' },
          { label: 'Latest Projects', path: '/properties/new-launches' },
          { label: 'Sale Transactions', path: '/properties/buy' },
          { label: 'Rental Transactions', path: '/properties/rent' }
        ]
      },
      {
        title: 'Explore',
        path: '/locations',
        links: [
          { label: 'Popular Communities', path: '/communities' },
          { label: 'Budget-Friendly Areas', path: '/locations' },
          { label: 'Property Blog', path: '/insights' }
        ]
      }
    ]
  }
];

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<Record<string, boolean>>({});

  const headerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const location = useLocation();
  const { favorites } = useFavorites();

  const isHome = location.pathname === '/';
  const isSolid = isScrolled || !isHome || activeMenu !== null || isMobileMenuOpen;

  // Track window scroll for transparent/solid navbar transition
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setActiveMenu(null);
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Click outside to close active mega menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard accessibility: Escape key closes active menus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveMenu(null);
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Desktop hover interactions with grace period to prevent flickering
  const handleMouseEnter = (id: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveMenu(id);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 180);
  };

  const handleTriggerClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setActiveMenu((prev) => (prev === id ? null : id));
  };

  const toggleMobileCategory = (id: string) => {
    setMobileExpanded((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const activeCategory = NAVIGATION_DATA.find((item) => item.id === activeMenu);

  return (
    <header
      ref={headerRef}
      onMouseLeave={handleMouseLeave}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isSolid
          ? 'bg-[#FDFCF9] text-[#18181A] border-b border-[#E5E0D8] shadow-sm'
          : 'bg-gradient-to-b from-[#0B0B0C]/90 via-[#0B0B0C]/50 to-transparent text-[#F7F5F0]'
      }`}
    >
      {/* Top Main Bar */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20">
        {/* Brand Logo */}
        <Link
          to="/"
          onClick={() => setActiveMenu(null)}
          className="flex items-center gap-2.5 group shrink-0"
          aria-label="Nestandkey Homepage"
        >
          <div className="w-9 h-9 rounded-full border border-[#C5A880] flex items-center justify-center text-[#C5A880] group-hover:bg-[#C5A880] group-hover:text-[#18181A] transition-colors">
            <span className="font-serif font-bold text-xs tracking-widest">NK</span>
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl lg:text-2xl tracking-[0.18em] uppercase font-light leading-tight">
              NESTANDKEY
            </span>
            <span className="text-[8px] lg:text-[9px] uppercase tracking-[0.32em] text-[#C5A880] font-sans font-semibold">
              DUBAI LUXURY REAL ESTATE
            </span>
          </div>
        </Link>

        {/* Desktop Primary Navigation */}
        <nav
          className="hidden xl:flex items-center space-x-1 lg:space-x-2"
          aria-label="Primary Navigation"
        >
          {NAVIGATION_DATA.map((item) => {
            const isOpen = activeMenu === item.id;
            const isPathActive = location.pathname.startsWith(item.path);

            return (
              <div
                key={item.id}
                onMouseEnter={() => handleMouseEnter(item.id)}
                className="relative py-6"
              >
                <button
                  type="button"
                  onClick={(e) => handleTriggerClick(e, item.id)}
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                  className={`flex items-center gap-1 px-3 py-1.5 text-[11px] lg:text-xs uppercase tracking-[0.15em] font-medium transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C5A880] ${
                    isOpen || isPathActive
                      ? 'text-[#C5A880] font-semibold'
                      : isSolid
                      ? 'text-[#2E2E32] hover:text-[#C5A880]'
                      : 'text-[#EFECE6] hover:text-[#C5A880]'
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronDown
                    className={`w-3 h-3 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#C5A880]' : 'opacity-70'
                    }`}
                  />
                </button>
              </div>
            );
          })}
        </nav>

        {/* Right-Side Action Controls */}
        <div className="hidden lg:flex items-center space-x-5 shrink-0">
          {/* Favorites Link */}
          <Link
            to="/account/favorites"
            onClick={() => setActiveMenu(null)}
            className={`flex items-center gap-1.5 text-xs tracking-wider transition-colors relative p-1.5 rounded focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C5A880] ${
              isSolid ? 'text-[#18181A] hover:text-[#C5A880]' : 'text-[#F7F5F0] hover:text-[#C5A880]'
            }`}
            title="Saved Residences"
            aria-label={`Saved Residences (${favorites.length})`}
          >
            <Heart className="w-4 h-4 text-[#C5A880]" />
            {favorites.length > 0 && (
              <span className="bg-[#C5A880] text-[#18181A] text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {favorites.length}
              </span>
            )}
          </Link>

          {/* Ecosystem Portals */}
          <div className="flex items-center space-x-2 border-l border-[#C5A880]/30 pl-4">
            <a
              href="http://localhost:5174"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded border border-[#C5A880]/40 text-[#C5A880] hover:bg-[#C5A880] hover:text-[#18181A] transition-all"
              title="Open Broker Workspace"
            >
              Broker Portal
            </a>
            <a
              href="http://localhost:5175"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded border border-[#C5A880]/40 text-[#C5A880] hover:bg-[#C5A880] hover:text-[#18181A] transition-all"
              title="Open Admin Control Center"
            >
              Admin Panel
            </a>
          </div>

          {/* Primary CTA */}
          <Link
            to="/consultation"
            onClick={() => setActiveMenu(null)}
            className="bg-[#C5A880] hover:bg-[#B8976C] text-[#18181A] px-4 lg:px-5 py-2 rounded text-[11px] lg:text-xs font-semibold uppercase tracking-[0.14em] transition-all shadow-sm flex items-center gap-2"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Private Advisory</span>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => {
            setIsMobileMenuOpen(!isMobileMenuOpen);
            setActiveMenu(null);
          }}
          className={`xl:hidden p-2 rounded focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C5A880] ${
            isSolid ? 'text-[#18181A]' : 'text-[#F7F5F0]'
          }`}
          aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Desktop Mega Menu Dropdown */}
      {activeCategory && (
        <div
          onMouseEnter={() => {
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
              timeoutRef.current = null;
            }
          }}
          onMouseLeave={handleMouseLeave}
          className="hidden xl:block absolute top-full left-0 right-0 bg-[#FDFCF9] text-[#18181A] border-b border-[#E5E0D8] shadow-2xl transition-all animate-in fade-in slide-in-from-top-1 duration-200"
          role="region"
          aria-label={`${activeCategory.label} Mega Menu`}
        >
          {/* Subtle bridge so cursor never drops when crossing */}
          <div className="max-w-7xl mx-auto px-8 lg:px-12 py-10">
            <div
              className={`grid gap-10 lg:gap-12 ${
                activeCategory.columnsCount === 4
                  ? 'grid-cols-4'
                  : activeCategory.columnsCount === 2
                  ? 'grid-cols-2 max-w-3xl'
                  : 'grid-cols-3'
              }`}
            >
              {activeCategory.sections.map((section, idx) => (
                <div key={`${section.title}-${idx}`} className="space-y-4">
                  {/* Section Title */}
                  {section.path ? (
                    <Link
                      to={section.path}
                      onClick={() => setActiveMenu(null)}
                      className="group flex items-center justify-between pb-2 border-b border-[#E5E0D8] text-[11px] uppercase tracking-[0.2em] font-serif font-semibold text-[#18181A] hover:text-[#C5A880] transition-colors"
                    >
                      <span>{section.title}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#C5A880] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  ) : (
                    <div className="pb-2 border-b border-[#E5E0D8] text-[11px] uppercase tracking-[0.2em] font-serif font-semibold text-[#18181A]">
                      {section.title}
                    </div>
                  )}

                  {/* Section Links */}
                  <ul className="space-y-2.5">
                    {section.links.map((link, linkIdx) => (
                      <li key={`${link.label}-${linkIdx}`}>
                        {link.isExternal ? (
                          <a
                            href={link.path}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setActiveMenu(null)}
                            className="text-xs text-[#52525B] hover:text-[#C5A880] hover:translate-x-0.5 transition-all inline-flex items-center gap-1"
                          >
                            <span>{link.label}</span>
                            <ArrowUpRight className="w-3 h-3 text-[#71717A]" />
                          </a>
                        ) : (
                          <Link
                            to={link.path}
                            onClick={() => setActiveMenu(null)}
                            className="text-xs text-[#52525B] hover:text-[#C5A880] hover:translate-x-0.5 transition-all block font-normal"
                          >
                            {link.label}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Curated Bottom Strip */}
            <div className="mt-8 pt-5 border-t border-[#E5E0D8]/60 flex items-center justify-between text-[11px] text-[#71717A]">
              <div className="flex items-center gap-2 font-mono uppercase tracking-widest text-[#C5A880] text-[10px]">
                <span>Nestandkey Private Client Services</span>
                <span>•</span>
                <span>Verified RERA Registration</span>
              </div>
              <Link
                to={activeCategory.path}
                onClick={() => setActiveMenu(null)}
                className="text-[#18181A] hover:text-[#C5A880] uppercase tracking-wider font-semibold transition-colors flex items-center gap-1"
              >
                <span>View All In {activeCategory.label}</span>
                <ArrowUpRight className="w-3 h-3 text-[#C5A880]" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Accordion Navigation Drawer */}
      {isMobileMenuOpen && (
        <div
          className="xl:hidden bg-[#FDFCF9] text-[#18181A] border-b border-[#E5E0D8] max-h-[85vh] overflow-y-auto px-6 py-6 shadow-2xl space-y-6"
          role="region"
          aria-label="Mobile Navigation"
        >
          {/* Primary Accordions */}
          <div className="divide-y divide-[#E5E0D8]/60">
            {NAVIGATION_DATA.map((category) => {
              const isExpanded = !!mobileExpanded[category.id];

              return (
                <div key={category.id} className="py-3">
                  <button
                    type="button"
                    onClick={() => toggleMobileCategory(category.id)}
                    className="w-full flex items-center justify-between py-2 text-left text-sm uppercase tracking-wider font-medium text-[#18181A] hover:text-[#C5A880] transition-colors"
                    aria-expanded={isExpanded}
                  >
                    <span>{category.label}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#C5A880] transition-transform duration-200 ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Expanded Accordion Content */}
                  {isExpanded && (
                    <div className="pt-3 pb-2 pl-3 space-y-5 animate-in fade-in duration-200">
                      {category.sections.map((section, secIdx) => (
                        <div key={`${section.title}-${secIdx}`} className="space-y-2">
                          <div className="text-[10px] uppercase tracking-widest font-mono text-[#C5A880] font-semibold">
                            {section.title}
                          </div>
                          <ul className="space-y-2 pl-1 border-l border-[#E5E0D8]">
                            {section.links.map((link, linkIdx) => (
                              <li key={`${link.label}-${linkIdx}`}>
                                {link.isExternal ? (
                                  <a
                                    href={link.path}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block pl-3 py-1 text-xs text-[#52525B] hover:text-[#C5A880]"
                                  >
                                    {link.label}
                                  </a>
                                ) : (
                                  <Link
                                    to={link.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block pl-3 py-1 text-xs text-[#52525B] hover:text-[#C5A880]"
                                  >
                                    {link.label}
                                  </Link>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}

                      <div className="pt-2">
                        <Link
                          to={category.path}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#18181A] hover:text-[#C5A880] uppercase tracking-wider"
                        >
                          <span>Explore All {category.label}</span>
                          <ArrowUpRight className="w-3 h-3 text-[#C5A880]" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Saved Residences Link */}
          <div className="pt-2 border-t border-[#E5E0D8]">
            <Link
              to="/account/favorites"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between py-2 text-sm uppercase tracking-wider font-medium text-[#18181A] hover:text-[#C5A880]"
            >
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#C5A880]" />
                <span>Saved Residences</span>
              </div>
              <span className="bg-[#C5A880] text-[#18181A] text-xs px-2 py-0.5 rounded-full font-bold">
                {favorites.length}
              </span>
            </Link>
          </div>

          {/* Ecosystem Portals & CTA */}
          <div className="pt-4 border-t border-[#E5E0D8] space-y-3">
            <div className="flex gap-2">
              <a
                href="http://localhost:5174"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center text-xs uppercase tracking-wider py-2.5 rounded border border-[#C5A880] text-[#18181A] hover:bg-[#C5A880]/10 transition-colors"
              >
                Broker Portal
              </a>
              <a
                href="http://localhost:5175"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center text-xs uppercase tracking-wider py-2.5 rounded border border-[#C5A880] text-[#18181A] hover:bg-[#C5A880]/10 transition-colors"
              >
                Admin Panel
              </a>
            </div>

            <Link
              to="/consultation"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full text-center bg-[#C5A880] hover:bg-[#B8976C] text-[#18181A] py-3 rounded text-xs uppercase tracking-widest font-semibold transition-colors shadow-sm"
            >
              Request Private Advisory
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
