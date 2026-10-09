import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { api } from '../../services/api';
import {
  ShieldCheck,
  Building2,
  FolderLock,
  FileText,
  Download,
  UploadCloud,
  CheckCircle2,
  Clock,
  ArrowRight,
  Plus,
  Phone,
  MessageSquare,
  AlertCircle,
  Lock,
  ChevronRight
} from 'lucide-react';
import { SpeakAdvisorModal } from '../../components/common/SpeakAdvisorModal';

export type PrivateClientTab = 'portal-access' | 'dashboard' | 'properties' | 'documents';

export const PrivateClientsPage: React.FC = () => {
  const { user, isAuthenticated, login, logout } = useAuth();
  const { fetchNotifications } = useNotifications();
  const [searchParams, setSearchParams] = useSearchParams();

  const tabParam = searchParams.get('tab') as PrivateClientTab | null;
  const [activeTab, setActiveTab] = useState<PrivateClientTab>(
    tabParam && ['portal-access', 'dashboard', 'properties', 'documents'].includes(tabParam)
      ? tabParam
      : (isAuthenticated ? 'dashboard' : 'portal-access')
  );

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isAdvisorModalOpen, setIsAdvisorModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Portal Direct Sign In State
  const [portalEmail, setPortalEmail] = useState('');
  const [portalPassword, setPortalPassword] = useState('');
  const [isPortalLoggingIn, setIsPortalLoggingIn] = useState(false);
  const [portalAuthError, setPortalAuthError] = useState<string | null>(null);

  // Synchronize activeTab with URL search params
  useEffect(() => {
    const t = searchParams.get('tab') as PrivateClientTab | null;
    if (t && ['portal-access', 'dashboard', 'properties', 'documents'].includes(t)) {
      setActiveTab(t);
    }
  }, [searchParams]);

  const handleTabChange = (newTab: PrivateClientTab) => {
    setActiveTab(newTab);
    setSearchParams({ tab: newTab });
  };

  const handlePortalLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setPortalAuthError(null);
    if (!portalEmail || !portalPassword) {
      setPortalAuthError('Please enter both client email and password.');
      return;
    }
    setIsPortalLoggingIn(true);
    try {
      await login(portalEmail, portalPassword);
      setActiveTab('dashboard');
      setSearchParams({ tab: 'dashboard' });
    } catch (err: any) {
      setPortalAuthError(err?.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setIsPortalLoggingIn(false);
    }
  };

  // Document Upload State
  const [uploadProperty, setUploadProperty] = useState('Villa Aurum – Palm Jumeirah');
  const [uploadCategory, setUploadCategory] = useState('title');
  const [uploadFileName, setUploadFileName] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Client Properties
  const [properties] = useState([
    {
      id: 'prop-1',
      title: 'Villa Aurum',
      location: 'Palm Jumeirah, Frond G, Dubai',
      type: 'Signature Beachfront Villa',
      bedrooms: 6,
      areaSqFt: 11200,
      estimatedValueAED: 'AED 42,000,000',
      status: 'Handover & Snagging Phase',
      statusColor: 'text-amber-800 bg-amber-50 border-amber-200',
      advisor: 'Tariq Al-Mansoor',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
      latestMilestone: 'De-snagging inspection completed; final key handover scheduled Oct 14.'
    },
    {
      id: 'prop-2',
      title: 'The One Sky Duplex',
      location: 'Downtown Dubai, Opera District',
      type: 'Penthouse / Sky Duplex',
      bedrooms: 4,
      areaSqFt: 5400,
      estimatedValueAED: 'AED 16,500,000',
      status: 'Tenanted (Ejari Active)',
      statusColor: 'text-[#5D7A65] bg-[#5D7A65]/10 border-[#5D7A65]/30',
      advisor: 'Elena Rostova',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
      latestMilestone: 'Annual rental renewal registered with Dubai Land Department; rental cheque deposited.'
    }
  ]);

  // Document Vault with 8 official categories:
  // title, booking/contracts, mortgage/payments, handover, tenancy, visa, maintenance, other
  const [documents, setDocuments] = useState([
    {
      id: 'doc-1',
      title: 'Official DLD Title Deed (E-Certificate)',
      category: 'title',
      categoryLabel: 'Title',
      property: 'Villa Aurum – Palm Jumeirah',
      date: '2026-09-15',
      size: '2.4 MB',
      fileType: 'PDF'
    },
    {
      id: 'doc-2',
      title: 'Form F Unified Sale & Purchase Agreement',
      category: 'booking/contracts',
      categoryLabel: 'Booking / Contracts',
      property: 'Villa Aurum – Palm Jumeirah',
      date: '2026-08-20',
      size: '3.8 MB',
      fileType: 'PDF'
    },
    {
      id: 'doc-3',
      title: 'DLD Trustee Conveyance Escrow Receipt',
      category: 'mortgage/payments',
      categoryLabel: 'Mortgage / Payments',
      property: 'Villa Aurum – Palm Jumeirah',
      date: '2026-09-12',
      size: '1.2 MB',
      fileType: 'PDF'
    },
    {
      id: 'doc-4',
      title: '400-Point Architectural Snagging Audit Report',
      category: 'handover',
      categoryLabel: 'Handover',
      property: 'Villa Aurum – Palm Jumeirah',
      date: '2026-10-04',
      size: '14.2 MB',
      fileType: 'PDF'
    },
    {
      id: 'doc-5',
      title: 'Official Ejari Tenancy Contract (2026-2027)',
      category: 'tenancy',
      categoryLabel: 'Tenancy',
      property: 'The One Sky Duplex – Downtown',
      date: '2026-06-01',
      size: '1.9 MB',
      fileType: 'PDF'
    },
    {
      id: 'doc-6',
      title: 'UAE 10-Year Golden Visa Real Estate Nomination Certificate',
      category: 'visa',
      categoryLabel: 'Visa',
      property: 'Villa Aurum – Palm Jumeirah',
      date: '2026-09-28',
      size: '850 KB',
      fileType: 'PDF'
    },
    {
      id: 'doc-7',
      title: 'Annual HVAC & Pool Preventative Maintenance Agreement',
      category: 'maintenance',
      categoryLabel: 'Maintenance',
      property: 'Villa Aurum – Palm Jumeirah',
      date: '2026-09-30',
      size: '1.1 MB',
      fileType: 'PDF'
    },
    {
      id: 'doc-8',
      title: 'Architectural Blueprint & MEP Layout schematics',
      category: 'other',
      categoryLabel: 'Other',
      property: 'The One Sky Duplex – Downtown',
      date: '2026-05-10',
      size: '8.4 MB',
      fileType: 'PDF'
    }
  ]);

  const documentCategories = [
    { id: 'all', label: 'All Documents' },
    { id: 'title', label: 'Title Deeds' },
    { id: 'booking/contracts', label: 'Booking & Contracts' },
    { id: 'mortgage/payments', label: 'Mortgage / Payments' },
    { id: 'handover', label: 'Handover & Snagging' },
    { id: 'tenancy', label: 'Tenancy & Ejari' },
    { id: 'visa', label: 'Golden Visa' },
    { id: 'maintenance', label: 'Maintenance' },
    { id: 'other', label: 'Other Records' }
  ];

  const handleDocumentUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFileName) return;

    setIsUploading(true);
    setTimeout(() => {
      const newDoc = {
        id: `doc-${Date.now()}`,
        title: uploadFileName,
        category: uploadCategory,
        categoryLabel: documentCategories.find((c) => c.id === uploadCategory)?.label || 'Document',
        property: uploadProperty,
        date: new Date().toISOString().split('T')[0],
        size: '1.5 MB',
        fileType: 'PDF'
      };
      setDocuments([newDoc, ...documents]);
      setIsUploading(false);
      setUploadSuccess(true);
      setTimeout(() => {
        setIsUploadModalOpen(false);
        setUploadSuccess(false);
        setUploadFileName('');
      }, 1500);
    }, 600);
  };

  const filteredDocuments =
    selectedCategory === 'all'
      ? documents
      : documents.filter((d) => d.category === selectedCategory);

  return (
    <div className="bg-[#F7F3EA] text-[#3E4852] font-ui pt-24 min-h-screen">
      {/* 1. Header Banner - Deep Navy #102A43 */}
      <section className="bg-[#102A43] text-[#F7F3EA] py-14 px-6 lg:px-12 border-b border-[#1E3A5F]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-[0.28em] text-[#D8C3A5] font-semibold">
                Private Client Office
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#5D7A65]" />
              <span className="text-[10px] text-[#5D7A65] uppercase tracking-wider font-medium">
                Encrypted Vault Active
              </span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light text-[#F7F3EA]">
              Client Portfolio & Vault
            </h1>
            <p className="text-xs sm:text-sm text-[#E9E1D4]/80 font-light max-w-xl leading-relaxed">
              Institutional governance for your real estate holdings. Access deeds, contracts, maintenance logs, and confidential client portal.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="bg-[#B08D57] hover:bg-[#D8C3A5] text-[#102A43] px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm"
            >
              <UploadCloud className="w-4 h-4" />
              <span>Upload Document</span>
            </button>
            <button
              onClick={() => setIsAdvisorModalOpen(true)}
              className="border border-[#B08D57] hover:bg-[#B08D57] hover:text-[#102A43] text-[#F7F3EA] px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all"
            >
              Speak with an Advisor
            </button>
          </div>
        </div>
      </section>

      {/* 2. Client Menu Navigation (Client Change 9: 4 clean tabs) */}
      <div className="sticky top-20 z-40 bg-[#0B2135] border-b border-[#1E3A5F] shadow-sm">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <nav className="flex space-x-1 sm:space-x-4 overflow-x-auto py-2 text-xs uppercase tracking-[0.15em]">
            <button
              onClick={() => handleTabChange('portal-access')}
              className={`px-3 py-2 transition-all whitespace-nowrap border-b-2 font-medium ${
                activeTab === 'portal-access'
                  ? 'border-[#B08D57] text-[#D8C3A5]'
                  : 'border-transparent text-[#E9E1D4]/70 hover:text-[#F7F3EA]'
              }`}
            >
              Client Sign In / Portal Access
            </button>
            <button
              onClick={() => handleTabChange('dashboard')}
              className={`px-3 py-2 transition-all whitespace-nowrap border-b-2 font-medium ${
                activeTab === 'dashboard'
                  ? 'border-[#B08D57] text-[#D8C3A5]'
                  : 'border-transparent text-[#E9E1D4]/70 hover:text-[#F7F3EA]'
              }`}
            >
              Client Portfolio Dashboard
            </button>
            <button
              onClick={() => handleTabChange('properties')}
              className={`px-3 py-2 transition-all whitespace-nowrap border-b-2 font-medium ${
                activeTab === 'properties'
                  ? 'border-[#B08D57] text-[#D8C3A5]'
                  : 'border-transparent text-[#E9E1D4]/70 hover:text-[#F7F3EA]'
              }`}
            >
              My Properties ({properties.length})
            </button>
            <button
              onClick={() => handleTabChange('documents')}
              className={`px-3 py-2 transition-all whitespace-nowrap border-b-2 font-medium ${
                activeTab === 'documents'
                  ? 'border-[#B08D57] text-[#D8C3A5]'
                  : 'border-transparent text-[#E9E1D4]/70 hover:text-[#F7F3EA]'
              }`}
            >
              Encrypted Document Vault ({documents.length})
            </button>
          </nav>
        </div>
      </div>

      {/* 3. Main Workspace Area */}
      <main className="max-w-6xl mx-auto px-6 lg:px-12 py-12">
        {/* TAB 1: CLIENT SIGN IN / PORTAL ACCESS (Client Change 9) */}
        {activeTab === 'portal-access' && (
          <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in">
            {isAuthenticated ? (
              <div className="bg-[#FFFDF8] border border-[#E9E1D4] p-8 sm:p-10 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E9E1D4]">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#102A43] text-[#D8C3A5] flex items-center justify-center font-display text-base font-semibold">
                      <ShieldCheck className="w-6 h-6 text-[#B08D57]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="w-2 h-2 rounded-full bg-[#5D7A65]" />
                        <span className="text-[10px] text-[#5D7A65] uppercase tracking-wider font-semibold font-mono">
                          VIP Portal Session Active
                        </span>
                      </div>
                      <h2 className="font-display text-2xl text-[#102A43]">{user?.name || 'Private Client'}</h2>
                    </div>
                  </div>

                  <span className="text-[10px] uppercase font-mono px-3 py-1 bg-[#F7F3EA] border border-[#E9E1D4] text-[#B08D57] font-semibold tracking-wider self-start sm:self-center">
                    AES-256 Vault Active
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 bg-[#F7F3EA] border border-[#E9E1D4] space-y-1">
                    <span className="text-[10px] uppercase tracking-wider text-[#6B7280] font-medium block">Account Identity</span>
                    <span className="text-[#102A43] font-semibold block">{user?.email}</span>
                  </div>
                  <div className="p-4 bg-[#F7F3EA] border border-[#E9E1D4] space-y-1">
                    <span className="text-[10px] uppercase tracking-wider text-[#6B7280] font-medium block">Client Membership Tier</span>
                    <span className="text-[#B08D57] font-semibold block uppercase tracking-wider">Crestshore VIP Private Office</span>
                  </div>
                  <div className="p-4 bg-[#F7F3EA] border border-[#E9E1D4] space-y-1">
                    <span className="text-[10px] uppercase tracking-wider text-[#6B7280] font-medium block">Allocated Estates</span>
                    <span className="text-[#102A43] font-semibold block">{properties.length} Prime UAE Properties</span>
                  </div>
                  <div className="p-4 bg-[#F7F3EA] border border-[#E9E1D4] space-y-1">
                    <span className="text-[10px] uppercase tracking-wider text-[#6B7280] font-medium block">Assigned Senior Director</span>
                    <span className="text-[#102A43] font-semibold block">Tariq Al-Mansoor</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => handleTabChange('dashboard')}
                    className="flex-1 bg-[#102A43] hover:bg-[#1E3A5F] text-[#FFFDF8] py-3 text-xs uppercase tracking-wider font-semibold transition-all text-center flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>View Client Portfolio Dashboard</span>
                    <ArrowRight className="w-4 h-4 text-[#B08D57]" />
                  </button>
                  <button
                    onClick={() => logout()}
                    className="sm:w-36 border border-[#E9E1D4] hover:border-red-300 text-red-600 hover:bg-red-50 py-3 text-xs uppercase tracking-wider font-semibold transition-all text-center"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-[#FFFDF8] border border-[#E9E1D4] p-8 sm:p-10 shadow-sm space-y-6">
                <div className="text-center space-y-2 pb-6 border-b border-[#E9E1D4]">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#B08D57] font-semibold block">
                    Institutional Client Security
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl text-[#102A43]">
                    Client Sign In / Portal Access
                  </h2>
                  <p className="text-xs text-[#6B7280] max-w-md mx-auto leading-relaxed">
                    Secure single sign-on access to your confidential Dubai real estate holdings, encrypted title deeds, and dedicated advisory communications.
                  </p>
                </div>

                <form onSubmit={handlePortalLogin} className="space-y-4 max-w-md mx-auto text-xs">
                  {portalAuthError && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs">
                      {portalAuthError}
                    </div>
                  )}

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#102A43] font-semibold mb-1">
                      Client Email Address
                    </label>
                    <input
                      type="email"
                      value={portalEmail}
                      onChange={(e) => setPortalEmail(e.target.value)}
                      placeholder="client@crestshore.com"
                      required
                      className="w-full bg-[#FFFDF8] border border-[#E9E1D4] focus:border-[#B08D57] px-4 py-2.5 text-xs text-[#102A43] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#102A43] font-semibold mb-1">
                      Confidential Access Key / Password
                    </label>
                    <input
                      type="password"
                      value={portalPassword}
                      onChange={(e) => setPortalPassword(e.target.value)}
                      placeholder="••••••••••••"
                      required
                      className="w-full bg-[#FFFDF8] border border-[#E9E1D4] focus:border-[#B08D57] px-4 py-2.5 text-xs text-[#102A43] outline-none"
                    />
                  </div>

                  <div className="pt-2 space-y-2.5">
                    <button
                      type="submit"
                      disabled={isPortalLoggingIn}
                      className="w-full bg-[#102A43] hover:bg-[#1E3A5F] text-[#FFFDF8] py-3 text-xs uppercase tracking-wider font-semibold transition-all disabled:opacity-60 shadow-sm"
                    >
                      {isPortalLoggingIn ? 'Authenticating...' : 'Sign In to Client Portal'}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setPortalEmail('client@crestshore.com');
                        setPortalPassword('Client@123456');
                        setPortalAuthError(null);
                      }}
                      className="w-full bg-[#F7F3EA] hover:bg-[#E9E1D4] text-[#102A43] py-2 text-xs uppercase tracking-wider font-medium transition-colors"
                    >
                      Auto-Fill Verified Client Demo Key
                    </button>
                  </div>
                </form>

                <div className="p-4 bg-[#0B2135] text-[#F7F3EA] border border-[#1E3A5F] text-xs space-y-1 max-w-md mx-auto">
                  <div className="flex items-center gap-2 text-[#D8C3A5] font-semibold">
                    <Lock className="w-3.5 h-3.5 text-[#B08D57]" />
                    <span>Discreet Client Security Standard</span>
                  </div>
                  <p className="text-[#E9E1D4]/80 text-[11px] leading-relaxed">
                    Credentials are issue-managed directly by Crestshore Senior Leadership. All title queries are cross-referenced with Dubai REST blockchain.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: CLIENT PORTFOLIO DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-10 animate-in fade-in">
            {/* Latest Advisory Update (Brief Item #8: "See the latest update") */}
            <div className="bg-[#FFFDF8] border-l-4 border-l-[#B08D57] border border-[#E9E1D4] p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] uppercase tracking-wider text-[#B08D57] font-semibold">
                  Latest Advisory Update
                </span>
                <span className="text-[10px] text-[#6B7280]">Today, 10:45 AM GST</span>
              </div>
              <h3 className="font-display text-xl text-[#102A43] mb-1">
                Villa Aurum Handover Audit Progress
              </h3>
              <p className="text-xs text-[#3E4852] leading-relaxed">
                Developer de-snagging inspection completed for Villa Aurum (Palm Jumeirah). 14 of 16 developer rectification items have been certified by our structural engineering partner. The 2 remaining MEP adjustments are scheduled for sign-off on October 14, followed by final title key handover.
              </p>
              <div className="mt-4 pt-3 border-t border-[#E9E1D4] flex flex-wrap items-center justify-between gap-3 text-xs">
                <span className="text-[#6B7280]">Assigned Advisor: <strong className="text-[#102A43]">Tariq Al-Mansoor</strong></span>
                <a
                  href="https://wa.me/971501123456?text=Hello%20Tariq,%20regarding%20the%20latest%20Villa%20Aurum%20update."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#25D366] hover:underline font-semibold flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Discuss on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-[#FFFDF8] border border-[#E9E1D4] p-6 shadow-sm">
                <span className="text-[10px] uppercase tracking-wider text-[#6B7280] font-medium block mb-1">
                  Managed Properties
                </span>
                <div className="font-display text-3xl font-light text-[#102A43]">{properties.length} Estates</div>
                <div className="text-[11px] text-[#6B7280] mt-2">Palm Jumeirah & Downtown</div>
              </div>

              <div className="bg-[#FFFDF8] border border-[#E9E1D4] p-6 shadow-sm">
                <span className="text-[10px] uppercase tracking-wider text-[#6B7280] font-medium block mb-1">
                  Portfolio Valuation
                </span>
                <div className="font-display text-3xl font-light text-[#102A43]">AED 58.5M</div>
                <div className="text-[11px] text-[#5D7A65] font-semibold mt-2">+14.2% Capital Appreciation</div>
              </div>

              <div className="bg-[#FFFDF8] border border-[#E9E1D4] p-6 shadow-sm">
                <span className="text-[10px] uppercase tracking-wider text-[#6B7280] font-medium block mb-1">
                  Vault Documents
                </span>
                <div className="font-display text-3xl font-light text-[#102A43]">{documents.length} Files</div>
                <div className="text-[11px] text-[#6B7280] mt-2">DLD Deeds, Leases & Snags</div>
              </div>

              <div className="bg-[#FFFDF8] border border-[#E9E1D4] p-6 shadow-sm">
                <span className="text-[10px] uppercase tracking-wider text-[#6B7280] font-medium block mb-1">
                  Private Advisory Status
                </span>
                <div className="font-display text-2xl font-light text-[#5D7A65]">Active Mandate</div>
                <div className="text-[11px] text-[#6B7280] mt-2">Tariq Al-Mansoor Direct</div>
              </div>
            </div>

            {/* Quick Actions Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button
                onClick={() => handleTabChange('properties')}
                className="bg-[#102A43] hover:bg-[#1E3A5F] text-[#FFFDF8] p-5 text-left transition-colors shadow-sm flex items-center justify-between"
              >
                <div>
                  <h4 className="font-display text-lg">My Properties</h4>
                  <p className="text-[11px] text-[#E9E1D4]/80">View active real estate holdings & status</p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#B08D57]" />
              </button>

              <button
                onClick={() => setIsUploadModalOpen(true)}
                className="bg-[#FFFDF8] hover:border-[#B08D57] border border-[#E9E1D4] p-5 text-left transition-colors shadow-sm flex items-center justify-between"
              >
                <div>
                  <h4 className="font-display text-lg text-[#102A43]">Upload Document</h4>
                  <p className="text-[11px] text-[#6B7280]">Add deed, payment voucher or lease</p>
                </div>
                <UploadCloud className="w-4 h-4 text-[#B08D57]" />
              </button>

              <button
                onClick={() => setIsAdvisorModalOpen(true)}
                className="bg-[#FFFDF8] hover:border-[#B08D57] border border-[#E9E1D4] p-5 text-left transition-colors shadow-sm flex items-center justify-between"
              >
                <div>
                  <h4 className="font-display text-lg text-[#102A43]">Speak with Advisor</h4>
                  <p className="text-[11px] text-[#6B7280]">Direct hotline to Senior Leadership</p>
                </div>
                <Phone className="w-4 h-4 text-[#B08D57]" />
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: MY PROPERTIES (Client Change 9) */}
        {activeTab === 'properties' && (
          <div className="space-y-8 animate-in fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E9E1D4]">
              <div>
                <h2 className="font-display text-2xl text-[#102A43]">Your Real Estate Portfolio</h2>
                <p className="text-xs text-[#6B7280] mt-1">
                  Active assets monitored and managed by Crestshore advisory desk.
                </p>
              </div>
              <button
                onClick={() => setIsAdvisorModalOpen(true)}
                className="bg-[#102A43] hover:bg-[#1E3A5F] text-[#FFFDF8] px-4 py-2 text-xs uppercase tracking-wider font-semibold transition-all flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-[#B08D57]" />
                <span>Consult Senior Director</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {properties.map((prop) => (
                <div
                  key={prop.id}
                  className="bg-[#FFFDF8] border border-[#E9E1D4] overflow-hidden shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={prop.image}
                        alt={prop.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute top-3 right-3">
                        <span className={`text-[10px] px-2.5 py-1 border font-medium ${prop.statusColor}`}>
                          {prop.status}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 space-y-4">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-[#B08D57] font-semibold block mb-1">
                          {prop.location}
                        </span>
                        <h3 className="font-display text-2xl text-[#102A43]">{prop.title}</h3>
                        <p className="text-xs text-[#6B7280]">{prop.type} • {prop.bedrooms} Bedrooms • {prop.areaSqFt.toLocaleString()} sq.ft</p>
                      </div>

                      <div className="p-3 bg-[#F7F3EA] border border-[#E9E1D4] text-xs">
                        <span className="text-[10px] uppercase tracking-wider text-[#6B7280] block font-medium">Estimated Value</span>
                        <span className="font-display text-xl text-[#102A43] font-normal">{prop.estimatedValueAED}</span>
                      </div>

                      <div className="text-xs text-[#3E4852] space-y-1">
                        <span className="text-[10px] uppercase tracking-wider text-[#6B7280] block font-medium">Status & Milestone</span>
                        <p className="leading-relaxed">{prop.latestMilestone}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0 border-t border-[#E9E1D4] mt-4 flex items-center justify-between text-xs">
                    <span className="text-[#6B7280]">Advisor: <strong className="text-[#102A43]">{prop.advisor}</strong></span>
                    <button
                      onClick={() => {
                        setSelectedCategory('all');
                        setActiveTab('documents');
                      }}
                      className="text-[#B08D57] hover:text-[#102A43] font-medium flex items-center gap-1"
                    >
                      <span>View Documents</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: DOCUMENTS (Brief Item #8: View, download, upload, 8 categories) */}
        {activeTab === 'documents' && (
          <div className="space-y-8 animate-in fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E9E1D4]">
              <div>
                <h2 className="font-display text-2xl text-[#102A43]">Encrypted Document Vault</h2>
                <p className="text-xs text-[#6B7280] mt-1">
                  Institutional repository for titles, contracts, mortgage deeds, and snagging audits.
                </p>
              </div>

              <button
                onClick={() => setIsUploadModalOpen(true)}
                className="bg-[#102A43] hover:bg-[#1E3A5F] text-[#FFFDF8] px-4 py-2.5 text-xs uppercase tracking-wider font-semibold transition-all flex items-center gap-2 shadow-sm"
              >
                <UploadCloud className="w-4 h-4" />
                <span>Upload Requested Document</span>
              </button>
            </div>

            {/* Category Filter Pills (8 required categories) */}
            <div className="flex flex-wrap gap-2">
              {documentCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 text-xs transition-colors border ${
                    selectedCategory === cat.id
                      ? 'bg-[#102A43] text-[#F7F3EA] border-[#102A43] font-semibold'
                      : 'bg-[#FFFDF8] text-[#3E4852] border-[#E9E1D4] hover:border-[#B08D57]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Documents List */}
            <div className="bg-[#FFFDF8] border border-[#E9E1D4] overflow-hidden shadow-sm">
              <div className="divide-y divide-[#E9E1D4]">
                {filteredDocuments.length === 0 ? (
                  <div className="p-8 text-center text-xs text-[#6B7280]">
                    No documents found in this category.
                  </div>
                ) : (
                  filteredDocuments.map((doc) => (
                    <div
                      key={doc.id}
                      className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#F7F3EA]/50 transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded bg-[#102A43]/5 border border-[#1E3A5F]/20 text-[#102A43] flex items-center justify-center shrink-0">
                          <FileText className="w-5 h-5 text-[#B08D57]" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-[#F7F3EA] border border-[#E9E1D4] text-[#B08D57] font-semibold">
                              {doc.categoryLabel}
                            </span>
                            <span className="text-[10px] text-[#6B7280] font-mono">{doc.fileType} • {doc.size}</span>
                          </div>
                          <h4 className="text-sm font-medium text-[#102A43]">{doc.title}</h4>
                          <p className="text-xs text-[#6B7280] mt-0.5">{doc.property} • Uploaded {doc.date}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0 self-start sm:self-center">
                        <button
                          onClick={() => alert(`Downloading verified copy of: ${doc.title}`)}
                          className="bg-[#FFFDF8] hover:bg-[#F7F3EA] text-[#102A43] border border-[#E9E1D4] hover:border-[#B08D57] px-3.5 py-1.5 text-xs font-medium transition-colors flex items-center gap-1.5"
                        >
                          <Download className="w-3.5 h-3.5 text-[#B08D57]" />
                          <span>Download</span>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Vault Security Disclaimer */}
            <div className="p-4 bg-[#0B2135] text-[#F7F3EA] border border-[#1E3A5F] flex items-center gap-3 text-xs">
              <Lock className="w-5 h-5 text-[#B08D57] shrink-0" />
              <p className="leading-relaxed text-[#E9E1D4]/80">
                <strong>Vault Access & Integrity Notice:</strong> All documents stored in your Private Client Office are encrypted using AES-256 institutional standards with access history logging. Official Dubai Land Department deed tokens are verified against Dubai REST blockchain records.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Upload Document Modal (Brief Item #8: Select client/property → Upload document → Choose category → Save) */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#0B2135]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FFFDF8] border border-[#E9E1D4] max-w-lg w-full p-8 shadow-2xl animate-in zoom-in-95">
            <h3 className="font-display text-2xl text-[#102A43] mb-1">Upload Document to Vault</h3>
            <p className="text-xs text-[#6B7280] mb-6">
              Files are encrypted and cataloged directly under your property record.
            </p>

            {uploadSuccess ? (
              <div className="p-6 bg-[#5D7A65]/10 border border-[#5D7A65]/30 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-[#5D7A65] mx-auto" />
                <h4 className="text-sm font-semibold text-[#102A43]">Document Successfully Uploaded</h4>
                <p className="text-xs text-[#6B7280]">Added to your vault repository.</p>
              </div>
            ) : (
              <form onSubmit={handleDocumentUploadSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#6B7280] font-medium block mb-1">
                    Select Property
                  </label>
                  <select
                    value={uploadProperty}
                    onChange={(e) => setUploadProperty(e.target.value)}
                    className="w-full bg-[#FFFDF8] border border-[#E9E1D4] px-3 py-2 text-xs text-[#102A43] focus:outline-none focus:border-[#B08D57]"
                  >
                    <option value="Villa Aurum – Palm Jumeirah">Villa Aurum – Palm Jumeirah</option>
                    <option value="The One Sky Duplex – Downtown">The One Sky Duplex – Downtown</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#6B7280] font-medium block mb-1">
                    Document Category
                  </label>
                  <select
                    value={uploadCategory}
                    onChange={(e) => setUploadCategory(e.target.value)}
                    className="w-full bg-[#FFFDF8] border border-[#E9E1D4] px-3 py-2 text-xs text-[#102A43] focus:outline-none focus:border-[#B08D57]"
                  >
                    <option value="title">Title Deeds & Oqood</option>
                    <option value="booking/contracts">Booking & Sales Contracts</option>
                    <option value="mortgage/payments">Mortgage & Payment Receipts</option>
                    <option value="handover">Handover & Snagging Reports</option>
                    <option value="tenancy">Tenancy & Ejari</option>
                    <option value="visa">Golden Visa Documentation</option>
                    <option value="maintenance">Maintenance & Warranties</option>
                    <option value="other">Other Records & NOC</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#6B7280] font-medium block mb-1">
                    Document Title / Description
                  </label>
                  <input
                    type="text"
                    required
                    value={uploadFileName}
                    onChange={(e) => setUploadFileName(e.target.value)}
                    placeholder="e.g. DLD Trustee Registration Receipt"
                    className="w-full bg-[#FFFDF8] border border-[#E9E1D4] px-3 py-2 text-xs text-[#102A43] focus:outline-none focus:border-[#B08D57]"
                  />
                </div>

                <div className="border border-dashed border-[#E9E1D4] p-6 text-center bg-[#F7F3EA]/50">
                  <UploadCloud className="w-6 h-6 text-[#B08D57] mx-auto mb-2" />
                  <span className="text-xs text-[#3E4852] block font-medium">Select PDF, JPG, or PNG</span>
                  <span className="text-[10px] text-[#6B7280]">Max file size 25MB</span>
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsUploadModalOpen(false)}
                    className="flex-1 border border-[#E9E1D4] py-2.5 text-xs uppercase tracking-wider text-[#3E4852]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isUploading}
                    className="flex-1 bg-[#102A43] hover:bg-[#1E3A5F] text-[#FFFDF8] py-2.5 text-xs uppercase tracking-wider font-semibold transition-colors"
                  >
                    {isUploading ? 'Encrypting & Saving...' : 'Save to Vault'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Universal Advisor Consultation Modal */}
      <SpeakAdvisorModal
        isOpen={isAdvisorModalOpen}
        onClose={() => setIsAdvisorModalOpen(false)}
        initialService="Private Client Advisory"
      />
    </div>
  );
};

export default PrivateClientsPage;
