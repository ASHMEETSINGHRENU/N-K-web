import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Heart,
  Menu,
  X,
  ChevronDown,
  ArrowUpRight,
  User as UserIcon,
  LogOut,
  Bell,
  Compass,
  ArrowRight,
  ShieldCheck,
  FileText,
  KeyRound,
  Wrench,
  Eye,
  TrendingUp,
  FolderLock,
  Handshake,
  Lock,
  Phone,
  MessageSquare
} from 'lucide-react';
import { useFavorites } from '../../context/FavoritesContext';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { SpeakAdvisorModal } from './SpeakAdvisorModal';

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
          { label: 'All Properties for Sale', path: '/properties/buy' },
          { label: 'Signature Villas', path: '/properties/buy?type=Villa' },
          { label: 'Sky Penthouses', path: '/properties/buy?type=Penthouse' },
          { label: 'Waterfront Mansions', path: '/properties/buy?type=Mansion' },
          { label: 'Luxury Townhouses', path: '/properties/buy?type=Townhouse' },
          { label: 'Prime Plots & Land', path: '/properties/buy?type=Plot' }
        ]
      },
      {
        title: 'Buyer & Owner Tools',
        links: [
          { label: 'Dubai Mortgage Calculator', path: '/mortgage-calculator' },
          { label: 'Sell / List With Us', path: '/properties/sell' },
          { label: 'Sold House Prices', path: '/properties/buy?sort=price_desc' },
          { label: 'Prime Enclave Price Map', path: '/locations' }
        ]
      },
      {
        title: 'Buying Insights',
        path: '/insights',
        links: [
          { label: "Buyer's Advisory Guide", path: '/insights' },
          { label: 'Palm Jumeirah Insights', path: '/locations/palm-jumeirah' },
          { label: 'Prime Community Guides', path: '/communities' },
          { label: 'DLD Statutory Regulations', path: '/about' }
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
          { label: 'All Prime Rentals', path: '/properties/rent' },
          { label: 'Luxury Apartments', path: '/properties/rent?type=Apartment' },
          { label: 'Beachfront Villas', path: '/properties/rent?type=Villa' },
          { label: 'Panoramic Penthouses', path: '/properties/rent?type=Penthouse' },
          { label: 'Townhouses for Rent', path: '/properties/rent?type=Townhouse' }
        ]
      },
      {
        title: 'Renter Tools',
        links: [
          { label: 'Rent vs Buy Calculator', path: '/mortgage-calculator' },
          { label: 'Rental Yields & Indices', path: '/properties/rent?sort=price_asc' },
          { label: 'Ejari Lease Coordination', path: '/property-care' },
          { label: 'Prime Location Map', path: '/locations' }
        ]
      },
      {
        title: 'Renting Insights',
        path: '/insights',
        links: [
          { label: "High-Net-Worth Renter's Guide", path: '/insights' },
          { label: 'Dubai Tenancy Laws & Ejari', path: '/insights' },
          { label: 'Prime Waterfront Enclaves', path: '/communities' }
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
        title: 'All New Launches',
        path: '/properties/off-plan',
        links: [
          { label: 'All Off-Plan Portfolios', path: '/properties/off-plan' },
          { label: 'New Launches in Dubai', path: '/properties/new-launches' },
          { label: 'Palm Jumeirah Launches', path: '/properties/off-plan?community=Palm+Jumeirah' },
          { label: 'Downtown Dubai Launches', path: '/properties/off-plan?community=Downtown+Dubai' },
          { label: 'Jumeira Bay Island', path: '/properties/off-plan?community=Jumeira+Bay+Island' }
        ]
      },
      {
        title: 'Master Developers in UAE',
        path: '/developers',
        links: [
          { label: 'All Master Developers', path: '/developers' },
          { label: 'Emaar Properties', path: '/developers/emaar-properties' },
          { label: 'Omniyat Luxury', path: '/developers/omniyat' },
          { label: 'Nakheel Waterfront', path: '/developers/nakheel' },
          { label: 'Damac Properties', path: '/developers/damac-properties' },
          { label: 'Sobha Realty', path: '/developers/sobha-realty' }
        ]
      },
      {
        title: 'Investment Advisory',
        path: '/insights',
        links: [
          { label: "Global Investor's Guide", path: '/insights' },
          { label: 'UAE 10-Year Golden Visa', path: '/insights' },
          { label: 'High-Yield Investment Zones', path: '/locations' }
        ]
      }
    ]
  },
  {
    id: 'property-care',
    label: 'Property Care',
    path: '/property-care',
    columnsCount: 2,
    sections: [
      {
        title: 'The 6 Core Care Services',
        path: '/property-care',
        links: [
          { label: 'Handover & Snagging (400-Point Audit)', path: '/property-care' },
          { label: 'Rental Coordination & Ejari', path: '/property-care' },
          { label: 'Maintenance Coordination (24/7 HVAC)', path: '/property-care' },
          { label: 'Property Inspections (Quarterly)', path: '/property-care' },
          { label: 'Resale Preparation & Staging', path: '/property-care' },
          { label: 'Document Management & Custody', path: '/property-care' }
        ]
      },
      {
        title: 'Enduring Care Governance',
        path: '/property-care',
        links: [
          { label: 'Care Philosophy & Overview', path: '/property-care' },
          { label: 'Schedule Property Inspection', path: '/property-care' },
          { label: 'Emergency Technical Dispatch', path: '/property-care' },
          { label: 'Operational Care Records', path: '/property-care' }
        ]
      }
    ]
  },
  {
    id: 'partner-network',
    label: 'Partner Network',
    path: '/partner-network',
    columnsCount: 2,
    sections: [
      {
        title: 'Partner Portal',
        path: '/partner-network',
        links: [
          { label: 'For Wealth Managers & Family Offices', path: '/partner-network' },
          { label: 'Submit Referral Mandate', path: '/partner-network' },
          { label: 'My Referrals & Commission Ledger', path: '/partner-network' }
        ]
      },
      {
        title: 'Agreements & Support',
        path: '/partner-network',
        links: [
          { label: 'Partner Agreement & Terms', path: '/partner-network' },
          { label: '24-Hour Commission Settlement', path: '/partner-network' },
          { label: 'Direct WhatsApp Leadership', path: 'https://wa.me/971501123456', isExternal: true }
        ]
      }
    ]
  },
  {
    id: 'private-clients',
    label: 'Private Clients',
    path: '/private-clients',
    columnsCount: 1,
    sections: [
      {
        title: 'Private Client Office',
        path: '/private-clients',
        links: [
          { label: 'Client Sign In / Portal Access', path: '/private-clients?tab=portal-access' },
          { label: 'Client Portfolio Dashboard', path: '/private-clients?tab=dashboard' },
          { label: 'My Properties', path: '/private-clients?tab=properties' },
          { label: 'Encrypted Document Vault', path: '/private-clients?tab=documents' }
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
          { label: 'Community Guides', path: '/communities' }
        ]
      },
      {
        title: 'Renting',
        path: '/insights',
        links: [
          { label: "Renter's Guide", path: '/insights' },
          { label: 'Rental Area Insights', path: '/locations' },
          { label: 'Ejari Legal Handbook', path: '/insights' },
          { label: 'Schools & Enclaves', path: '/about' }
        ]
      },
      {
        title: 'Market & Wealth',
        path: '/insights',
        links: [
          { label: 'Quarterly Market Intelligence', path: '/insights' },
          { label: "Investor's Strategic Guide", path: '/insights' },
          { label: 'Prime Yield Analysis', path: '/locations' },
          { label: 'Latest Project Launches', path: '/properties/new-launches' }
        ]
      },
      {
        title: 'Explore Dubai',
        path: '/locations',
        links: [
          { label: 'Palm Jumeirah', path: '/locations/palm-jumeirah' },
          { label: 'Emirates Hills', path: '/locations' },
          { label: 'Downtown Dubai', path: '/locations' },
          { label: 'Jumeira Bay Island', path: '/locations' }
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
  const [isNotificationMenuOpen, setIsNotificationMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isAdvisorModalOpen, setIsAdvisorModalOpen] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const notificationMenuRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const location = useLocation();
  const { favorites } = useFavorites();
  const { user, isAuthenticated, logout, openAuthModal } = useAuth();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();

  // Background solid state on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setActiveMenu(null);
    setIsMobileMenuOpen(false);
    setIsNotificationMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [location.pathname]);

  // Click outside to close active mega menu or popups
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
      if (notificationMenuRef.current && !notificationMenuRef.current.contains(event.target as Node)) {
        setIsNotificationMenuOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
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
        setIsNotificationMenuOpen(false);
        setIsUserMenuOpen(false);
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
    <>
      <header
        ref={headerRef}
        onMouseLeave={handleMouseLeave}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || activeMenu !== null || isMobileMenuOpen
            ? 'bg-[#102A43] text-[#F7F3EA] border-b border-[#1E3A5F] shadow-lg'
            : 'bg-[#102A43]/95 backdrop-blur-md text-[#F7F3EA] border-b border-[#1E3A5F]/70 shadow-md'
        }`}
      >
        {/* Main Navigation Bar */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20">
          {/* Brand Wordmark & Monogram */}
          <Link
            to="/"
            onClick={() => setActiveMenu(null)}
            className="flex items-center gap-2.5 group shrink-0"
            aria-label="Crestshore Homepage"
          >
            <div className="w-9 h-9 rounded-full border border-[#B08D57] flex items-center justify-center text-[#D8C3A5] group-hover:bg-[#B08D57] group-hover:text-[#102A43] transition-colors">
              <span className="font-serif font-bold text-xs tracking-widest">CS</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl lg:text-2xl tracking-[0.18em] uppercase font-light leading-tight text-[#F7F3EA]">
                CRESTSHORE
              </span>
              <span className="text-[8px] lg:text-[9px] uppercase tracking-[0.32em] text-[#D8C3A5] font-sans font-medium">
                Where Summit Meets Shore
              </span>
            </div>
          </Link>

          {/* Desktop Primary Navigation with Rich Mega Menus */}
          <nav
            className="hidden xl:flex items-center space-x-1 lg:space-x-1.5"
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
                    className={`flex items-center gap-1 px-2.5 py-1 text-[11px] lg:text-xs uppercase tracking-[0.14em] font-medium transition-colors rounded-sm ${
                      isOpen || isPathActive
                        ? 'text-[#D8C3A5] font-semibold'
                        : 'text-[#F7F3EA] hover:text-[#D8C3A5]'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={`w-3 h-3 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#B08D57]' : 'opacity-70'
                      }`}
                    />
                  </button>
                </div>
              );
            })}
          </nav>

          {/* Right-Side Action Controls */}
          <div className="hidden lg:flex items-center space-x-4 shrink-0">
            {/* Favorites Icon */}
            <Link
              to="/account/favorites"
              onClick={() => setActiveMenu(null)}
              className="flex items-center gap-1 text-xs tracking-wider transition-colors relative p-1.5 text-[#F7F3EA] hover:text-[#D8C3A5]"
              title="Saved Residences"
              aria-label={`Saved Residences (${favorites.length})`}
            >
              <Heart className="w-4 h-4 text-[#B08D57]" />
              {favorites.length > 0 && (
                <span className="bg-[#B08D57] text-[#102A43] text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>

            {/* Notifications Menu */}
            <div className="relative" ref={notificationMenuRef}>
              <button
                type="button"
                onClick={() => setIsNotificationMenuOpen(!isNotificationMenuOpen)}
                className="p-1.5 text-[#F7F3EA] hover:text-[#D8C3A5] relative"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4 text-[#B08D57]" />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 w-2 h-2 bg-[#B08D57] rounded-full" />
                )}
              </button>

              {isNotificationMenuOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-[#0B2135] border border-[#1E3A5F] shadow-2xl py-3 z-50 text-xs">
                  <div className="px-4 pb-2 border-b border-[#1E3A5F] flex justify-between items-center">
                    <span className="font-semibold uppercase tracking-wider text-[#D8C3A5] text-[10px]">
                      Notifications ({unreadCount})
                    </span>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllAsRead}
                        className="text-[10px] text-[#B08D57] hover:underline"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>
                  <div className="max-h-60 overflow-y-auto divide-y divide-[#1E3A5F]/60">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-[#E9E1D4]/60">No new notifications</div>
                    ) : (
                      notifications.slice(0, 5).map((n) => (
                        <div
                          key={n._id}
                          onClick={() => markAsRead(n._id)}
                          className={`p-3 cursor-pointer hover:bg-[#102A43] transition-colors ${
                            !n.isRead ? 'bg-[#102A43]/50' : ''
                          }`}
                        >
                          <div className="font-medium text-[#F7F3EA] text-[11px]">{n.title}</div>
                          <div className="text-[#E9E1D4]/70 text-[10px] mt-0.5">{n.message}</div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Account / Profile */}
            <div className="relative" ref={userMenuRef}>
              {isAuthenticated ? (
                <button
                  type="button"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-1.5 text-xs text-[#F7F3EA] hover:text-[#D8C3A5] py-1 px-2 border border-[#1E3A5F] hover:border-[#B08D57] transition-colors"
                >
                  <UserIcon className="w-3.5 h-3.5 text-[#B08D57]" />
                  <span className="max-w-[100px] truncate">{user?.name?.split(' ')[0] || 'Client'}</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => openAuthModal('login')}
                  className="text-xs uppercase tracking-wider text-[#F7F3EA] hover:text-[#D8C3A5] font-medium"
                >
                  Sign In
                </button>
              )}

              {isUserMenuOpen && isAuthenticated && (
                <div className="absolute right-0 mt-2 w-48 bg-[#0B2135] border border-[#1E3A5F] shadow-2xl py-2 z-50 text-xs">
                  <div className="px-4 py-2 border-b border-[#1E3A5F]">
                    <div className="font-semibold text-[#F7F3EA] truncate">{user?.name}</div>
                    <div className="text-[10px] text-[#D8C3A5] truncate">{user?.email}</div>
                  </div>
                  <Link
                    to="/private-clients"
                    className="block px-4 py-2 text-[#E9E1D4] hover:text-[#D8C3A5] hover:bg-[#102A43] transition-colors"
                  >
                    Private Client Office
                  </Link>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-[#E9E1D4] hover:text-[#D8C3A5] hover:bg-[#102A43] transition-colors"
                  >
                    Account Profile
                  </Link>
                  <Link
                    to="/account/favorites"
                    className="block px-4 py-2 text-[#E9E1D4] hover:text-[#D8C3A5] hover:bg-[#102A43] transition-colors"
                  >
                    Saved Residences ({favorites.length})
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-red-300 hover:bg-[#102A43] flex items-center gap-2 border-t border-[#1E3A5F]/60 mt-1"
                  >
                    <LogOut className="w-3 h-3" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>

            {/* Universal CTA Button everywhere: "Speak with an Advisor" (Champagne Brass outlined) */}
            <button
              type="button"
              onClick={() => setIsAdvisorModalOpen(true)}
              className="border border-[#B08D57] hover:bg-[#B08D57] hover:text-[#102A43] text-[#F7F3EA] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] transition-all flex items-center gap-1.5 shadow-sm"
            >
              <span>Speak with an Advisor</span>
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => {
              setIsMobileMenuOpen(!isMobileMenuOpen);
              setActiveMenu(null);
            }}
            className="xl:hidden p-2 text-[#F7F3EA] hover:text-[#D8C3A5] transition-colors"
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
            className="hidden xl:block absolute top-full left-0 right-0 bg-[#0B2135] text-[#F7F3EA] border-b border-[#1E3A5F] shadow-2xl transition-all animate-in fade-in slide-in-from-top-1 duration-200"
            role="region"
            aria-label={`${activeCategory.label} Mega Menu`}
          >
            <div className="max-w-7xl mx-auto px-8 lg:px-12 py-10">
              <div
                className={`grid gap-10 lg:gap-12 ${
                  activeCategory.columnsCount === 4
                    ? 'grid-cols-4'
                    : activeCategory.columnsCount === 2
                    ? 'grid-cols-2 max-w-4xl'
                    : activeCategory.columnsCount === 1
                    ? 'grid-cols-1 max-w-md mx-auto'
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
                        className="group flex items-center justify-between pb-2 border-b border-[#1E3A5F] text-[11px] uppercase tracking-[0.2em] font-serif font-semibold text-[#D8C3A5] hover:text-[#FFFDF8] transition-colors"
                      >
                        <span>{section.title}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#B08D57] opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    ) : (
                      <div className="pb-2 border-b border-[#1E3A5F] text-[11px] uppercase tracking-[0.2em] font-serif font-semibold text-[#D8C3A5]">
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
                              className="text-xs text-[#E9E1D4]/80 hover:text-[#FFFDF8] hover:translate-x-0.5 transition-all inline-flex items-center gap-1"
                            >
                              <span>{link.label}</span>
                              <ArrowUpRight className="w-3 h-3 text-[#B08D57]" />
                            </a>
                          ) : (
                            <Link
                              to={link.path}
                              onClick={() => setActiveMenu(null)}
                              className="text-xs text-[#E9E1D4]/80 hover:text-[#FFFDF8] hover:translate-x-0.5 transition-all block font-normal"
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

              {/* Bottom Curated Bar */}
              <div className="mt-8 pt-5 border-t border-[#1E3A5F]/70 flex items-center justify-between text-[11px] text-[#E9E1D4]/70">
                <div className="flex items-center gap-2 font-mono uppercase tracking-widest text-[#B08D57] text-[10px]">
                  <span>Crestshore Global Real Estate & Wealth Advisory</span>
                  <span>•</span>
                  <span>Licensed RERA ORN 28941</span>
                </div>
                <Link
                  to={activeCategory.path}
                  onClick={() => setActiveMenu(null)}
                  className="text-[#D8C3A5] hover:text-[#FFFDF8] uppercase tracking-wider font-semibold transition-colors flex items-center gap-1"
                >
                  <span>Explore {activeCategory.label} Portal</span>
                  <ArrowUpRight className="w-3 h-3 text-[#B08D57]" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Mobile & Tablet Accordion Drawer (All Centered for Tablet View) */}
        {isMobileMenuOpen && (
          <div
            className="xl:hidden bg-[#0B2135] text-[#F7F3EA] border-b border-[#1E3A5F] max-h-[85vh] overflow-y-auto px-6 py-6 shadow-2xl space-y-6 text-center"
            role="region"
            aria-label="Mobile Navigation"
          >
            {/* Primary Accordions */}
            <div className="divide-y divide-[#1E3A5F]/70">
              {NAVIGATION_DATA.map((category) => {
                const isExpanded = !!mobileExpanded[category.id];

                return (
                  <div key={category.id} className="py-3">
                    <button
                      type="button"
                      onClick={() => toggleMobileCategory(category.id)}
                      className="w-full flex items-center justify-center gap-2.5 py-2.5 text-center text-sm uppercase tracking-[0.2em] font-medium text-[#F7F3EA] hover:text-[#D8C3A5] transition-colors"
                      aria-expanded={isExpanded}
                    >
                      <span>{category.label}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#B08D57] transition-transform duration-200 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {/* Expanded Accordion Links (Centered for Tablets) */}
                    {isExpanded && (
                      <div className="pt-3 pb-3 space-y-5 animate-in fade-in duration-200 flex flex-col items-center text-center">
                        {/* Centered description specifically when on Partner Network (Client Change 1) */}
                        {category.id === 'partner-network' && (
                          <div className="py-2.5 px-4 max-w-md mx-auto text-center border-y border-[#1E3A5F]/60 w-full mb-1">
                            <span className="text-[10px] uppercase tracking-[0.28em] text-[#D8C3A5] font-semibold block">
                              Crestshore Partner Network
                            </span>
                            <p className="text-xs text-[#E9E1D4]/80 mt-1 font-light italic leading-relaxed">
                              Private referrals. Clear progress. Trusted collaboration.
                            </p>
                          </div>
                        )}

                        {category.sections.map((section, secIdx) => (
                          <div key={`${section.title}-${secIdx}`} className="space-y-2 w-full flex flex-col items-center text-center">
                            <div className="text-[10px] uppercase tracking-[0.22em] font-mono text-[#D8C3A5] font-semibold text-center">
                              {section.title}
                            </div>
                            <ul className="space-y-2 flex flex-col items-center w-full text-center">
                              {section.links.map((link, linkIdx) => (
                                <li key={`${link.label}-${linkIdx}`} className="w-full text-center">
                                  {link.isExternal ? (
                                    <a
                                      href={link.path}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      onClick={() => setIsMobileMenuOpen(false)}
                                      className="py-1 text-xs text-[#E9E1D4]/80 hover:text-[#FFFDF8] inline-flex items-center justify-center gap-1.5 transition-colors text-center"
                                    >
                                      <span>{link.label}</span>
                                      <ArrowUpRight className="w-3 h-3 text-[#B08D57]" />
                                    </a>
                                  ) : (
                                    <Link
                                      to={link.path}
                                      onClick={() => setIsMobileMenuOpen(false)}
                                      className="py-1 text-xs text-[#E9E1D4]/80 hover:text-[#FFFDF8] block transition-colors text-center"
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
                    )}
                  </div>
                );
              })}
            </div>

            {/* Mobile Actions Bottom (Centered) */}
            <div className="pt-4 border-t border-[#1E3A5F] space-y-3 max-w-sm mx-auto w-full text-center">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsAdvisorModalOpen(true);
                }}
                className="w-full bg-[#B08D57] hover:bg-[#D8C3A5] text-[#102A43] py-3 text-xs uppercase tracking-wider font-semibold text-center block transition-colors shadow-sm"
              >
                Speak with an Advisor
              </button>

              <div className="flex gap-2 justify-center">
                <Link
                  to="/account/favorites"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex-1 py-2 text-center text-xs border border-[#1E3A5F] text-[#E9E1D4] hover:text-[#D8C3A5] transition-colors"
                >
                  Saved ({favorites.length})
                </Link>
                {isAuthenticated ? (
                  <Link
                    to="/private-clients"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex-1 py-2 text-center text-xs border border-[#1E3A5F] text-[#E9E1D4] hover:text-[#D8C3A5] transition-colors"
                  >
                    Private Office
                  </Link>
                ) : (
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      openAuthModal('login');
                    }}
                    className="flex-1 py-2 text-center text-xs border border-[#1E3A5F] text-[#E9E1D4] hover:text-[#D8C3A5] transition-colors"
                  >
                    Sign In
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Global Universal Advisor Modal */}
      <SpeakAdvisorModal
        isOpen={isAdvisorModalOpen}
        onClose={() => setIsAdvisorModalOpen(false)}
        initialService="Header Advisory Consultation"
      />
    </>
  );
};

export default Header;
