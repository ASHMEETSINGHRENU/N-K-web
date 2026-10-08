import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import {
  Handshake,
  CheckCircle2,
  Clock,
  DollarSign,
  FileText,
  ShieldCheck,
  Send,
  MessageSquare,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  AlertCircle,
  Copy,
  Download,
  Building2,
  Sparkles,
  Phone,
  Lock,
  KeyRound,
  UserCheck,
  Check,
  HelpCircle,
  X,
  FileCheck
} from 'lucide-react';
import { SpeakAdvisorModal } from '../../components/common/SpeakAdvisorModal';

export const PartnerNetworkPage: React.FC = () => {
  const { user } = useAuth();
  const { fetchNotifications } = useNotifications();

  // Mode: 'public' (landing screen) or 'portal' (workspace)
  const [viewMode, setViewMode] = useState<'public' | 'portal'>('portal');

  // Partner Account & ID (CP-0048 as specified in Brief Item #4)
  const [partnerId] = useState('CP-0048');
  const [partnerName] = useState(user?.name || 'Alexander Wright');
  const [partnerCompany] = useState('Wright Wealth Advisory Ltd.');

  // Agreement Statuses: Not Uploaded, Uploaded, Sent for Review, Viewed, Signed/Approved, Declined, Expired, Superseded, Suspended
  const [agreementStatus, setAgreementStatus] = useState<
    'Not Uploaded' | 'Uploaded' | 'Sent for Review' | 'Viewed' | 'Signed/Approved' | 'Declined' | 'Expired' | 'Superseded' | 'Suspended'
  >('Signed/Approved');

  // Signing form state
  const [typedSignName, setTypedSignName] = useState('');
  const [hasAgreedTerms, setHasAgreedTerms] = useState(false);
  const [signingSuccess, setSigningSuccess] = useState(false);

  // Portal tabs: Dashboard | Submit Referral | My Referrals | Commission | Agreement
  const [activeTab, setActiveTab] = useState<'dashboard' | 'submit' | 'referrals' | 'commission' | 'agreement'>('dashboard');

  // Modals
  const [isAdvisorModalOpen, setIsAdvisorModalOpen] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Application Form State (Brief Item #4)
  const [applyForm, setApplyForm] = useState({
    fullName: '',
    companyName: '',
    partnerType: 'wealth manager',
    cityMarket: 'Dubai / DIFC',
    phone: '',
    email: '',
    acknowledgedAgreement: false
  });
  const [isSubmittingApp, setIsSubmittingApp] = useState(false);
  const [appSuccessMessage, setAppSuccessMessage] = useState('');

  // Submit Referral Form State (Brief Item #8: NO client name/phone/email required)
  const [referralForm, setReferralForm] = useState({
    marketLocation: 'Palm Jumeirah, Dubai',
    referralType: 'buyer',
    propertyType: 'Signature Villa',
    budgetRange: 'AED 25M – AED 50M',
    oneLineRequirement: 'Cash family office seeking turnkey beachfront modern villa with private berth.',
    optionalNote: 'Principal resides in Zurich; visiting Dubai for viewings next week.',
    consentCheckbox: false
  });
  const [isSubmittingReferral, setIsSubmittingReferral] = useState(false);
  const [referralSuccess, setReferralSuccess] = useState(false);
  const [createdRefId, setCreatedRefId] = useState('');
  const [isPossibleDuplicate, setIsPossibleDuplicate] = useState(false);
  const [referralError, setReferralError] = useState('');

  // Referral Register (Brief Item #10: strictly 4 statuses: Received, In Progress, Closed, Not Proceeding)
  const [referralsList, setReferralsList] = useState([
    {
      id: 'CS-R-000123',
      dateSubmitted: '2026-10-02',
      marketLocation: 'Palm Jumeirah',
      referralType: 'Buyer',
      propertyType: 'Signature Villa',
      budget: 'AED 45,000,000',
      status: 'In Progress',
      statusColor: 'text-[#B08D57] bg-[#B08D57]/10 border-[#B08D57]/30',
      lastUpdated: 'Today, 11:20 AM',
      crestshoreUpdate: 'Initial shortlist of 3 off-market beachfront villas shared with private desk.',
      phoneDirect: '+971501123456',
      agreementVersion: 'Partner Agreement v1.2'
    },
    {
      id: 'CS-R-000098',
      dateSubmitted: '2026-09-18',
      marketLocation: 'Downtown Dubai',
      referralType: 'Buyer',
      propertyType: 'Sky Penthouse',
      budget: 'AED 32,000,000',
      status: 'In Progress',
      statusColor: 'text-amber-800 bg-amber-50 border-amber-200',
      lastUpdated: 'Yesterday, 3:45 PM',
      crestshoreUpdate: 'Form F executed at trustee office; security deposit escrow acknowledged.',
      phoneDirect: '+971501123456',
      agreementVersion: 'Partner Agreement v1.2'
    },
    {
      id: 'CS-R-000045',
      dateSubmitted: '2026-08-14',
      marketLocation: 'DIFC',
      referralType: 'Investor',
      propertyType: 'Full Floor Commercial/Duplex',
      budget: 'AED 60,000,000',
      status: 'Closed',
      statusColor: 'text-[#5D7A65] bg-[#5D7A65]/10 border-[#5D7A65]/30',
      lastUpdated: '2026-09-05',
      crestshoreUpdate: 'Conveyance completed at Dubai Land Department. Partner commission disbursed.',
      phoneDirect: '+971501123456',
      agreementVersion: 'Partner Agreement v1.1'
    }
  ]);

  // Commission Ledger (Brief Item #12: statuses: Pending, Approved, Paid)
  const [commissions] = useState([
    {
      referralId: 'CS-R-000045',
      property: 'DIFC Sky Residence Full Floor',
      transactionAED: 'AED 60,000,000',
      split: '50% of Crestshore Fee',
      amountAED: 'AED 125,000',
      status: 'Paid',
      statusColor: 'text-[#5D7A65] bg-[#5D7A65]/10 border-[#5D7A65]/30',
      date: '2026-09-05',
      agreementVersion: 'Partner Agreement v1.1'
    },
    {
      referralId: 'CS-R-000098',
      property: 'Downtown Sky Duplex Penthouse',
      transactionAED: 'AED 32,000,000',
      split: '50% of Crestshore Fee',
      amountAED: 'AED 40,000',
      status: 'Pending',
      statusColor: 'text-amber-800 bg-amber-50 border-amber-200',
      date: 'Est. Oct 2026',
      agreementVersion: 'Partner Agreement v1.2'
    },
    {
      referralId: 'CS-R-000123',
      property: 'Palm Jumeirah Signature Villa',
      transactionAED: 'AED 45,000,000',
      split: '50% of Crestshore Fee',
      amountAED: 'AED 15,000',
      status: 'Under Review',
      statusColor: 'text-[#1E3A5F] bg-[#1E3A5F]/10 border-[#1E3A5F]/30',
      date: 'Pending Negotiation',
      agreementVersion: 'Partner Agreement v1.2'
    }
  ]);

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Submit Partner Application (Brief Item #4)
  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyForm.fullName || !applyForm.phone || !applyForm.email) {
      alert('Please fill out all required fields.');
      return;
    }
    setIsSubmittingApp(true);
    try {
      await api.submitLead({
        name: applyForm.fullName,
        email: applyForm.email,
        mobile: applyForm.phone,
        preferredContactMethod: 'WHATSAPP',
        leadType: 'PARTNER_APPLICATION',
        message: `[PARTNER APPLICATION] Type: ${applyForm.partnerType} | Company: ${applyForm.companyName || 'Individual'} | City: ${applyForm.cityMarket}`,
        source: 'PARTNER_NETWORK_APPLICATION'
      });
      setAppSuccessMessage(
        'Application received. Crestshore will review your credentials, generate your unique Partner ID (e.g. CP-0048), and upload your personalized agreement.'
      );
      fetchNotifications();
    } catch (err: any) {
      alert(err.message || 'Unable to submit application.');
    } finally {
      setIsSubmittingApp(false);
    }
  };

  // Agreement Signing (Brief Item #6)
  const handleSignAgreement = () => {
    if (!hasAgreedTerms || !typedSignName) {
      alert('Please type your legal full name and check the agreement acceptance box.');
      return;
    }
    setAgreementStatus('Signed/Approved');
    setSigningSuccess(true);
    setTimeout(() => {
      setSigningSuccess(false);
    }, 4000);
  };

  // Submit Referral (Brief Item #8 & #9: strictly NO client name/phone/email)
  const handleReferralSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (agreementStatus !== 'Signed/Approved') {
      alert('Referral access is disabled until your Partner Agreement is signed.');
      return;
    }
    if (!referralForm.consentCheckbox) {
      setReferralError('Please confirm consent checkbox.');
      return;
    }

    setIsSubmittingReferral(true);
    setReferralError('');

    try {
      // Generate system reference in client's requested format: CS-R-000123
      const nextNum = Math.floor(100000 + Math.random() * 900000);
      const generatedRef = `CS-R-${nextNum}`;

      // Simulate private duplicate detection check
      const isDupe = Math.random() < 0.15;
      setIsPossibleDuplicate(isDupe);

      await api.submitLead({
        name: `${partnerName} (${partnerId})`,
        email: user?.email || 'partner@crestshore.com',
        mobile: '+971 50 112 3456',
        preferredContactMethod: 'WHATSAPP',
        leadType: 'REFERRAL',
        message: `[PARTNER REFERRAL ${generatedRef}] Type: ${referralForm.referralType} | Property: ${referralForm.propertyType} | Market: ${referralForm.marketLocation} | Budget: ${referralForm.budgetRange} | One-Line: ${referralForm.oneLineRequirement} | Notes: ${referralForm.optionalNote || 'None'} | Terms: Partner Agreement v1.2 (50% Split)`,
        source: 'PARTNER_PORTAL'
      });

      const newEntry = {
        id: generatedRef,
        dateSubmitted: new Date().toISOString().split('T')[0],
        marketLocation: referralForm.marketLocation,
        referralType: referralForm.referralType.charAt(0).toUpperCase() + referralForm.referralType.slice(1),
        propertyType: referralForm.propertyType,
        budget: referralForm.budgetRange,
        status: isDupe ? 'Possible Duplicate' : 'Received',
        statusColor: isDupe
          ? 'text-purple-800 bg-purple-50 border-purple-200'
          : 'text-[#1E3A5F] bg-[#1E3A5F]/10 border-[#1E3A5F]/30',
        lastUpdated: 'Just now',
        crestshoreUpdate: isDupe
          ? 'Referral under priority review by senior director.'
          : 'Referral received and logged. Assigned to private advisory desk.',
        phoneDirect: '+971501123456',
        agreementVersion: 'Partner Agreement v1.2'
      };

      setReferralsList([newEntry, ...referralsList]);
      setCreatedRefId(generatedRef);
      setReferralSuccess(true);
      fetchNotifications();
    } catch (err: any) {
      setReferralError(err.message || 'Unable to register referral.');
    } finally {
      setIsSubmittingReferral(false);
    }
  };

  const isAgreementSigned = agreementStatus === 'Signed/Approved';

  return (
    <div className="bg-[#F7F3EA] text-[#3E4852] font-ui pt-24 min-h-screen">
      {/* View Switcher Bar (Public View vs. Authenticated Portal Workspace) */}
      <div className="bg-[#0B2135] text-[#D8C3A5] py-2 px-6 lg:px-12 text-[11px] border-b border-[#1E3A5F] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#5D7A65]" />
          <span>
            {viewMode === 'portal'
              ? `Partner Workspace • Logged in as ${partnerName} (${partnerId})`
              : 'Public Partner Network Gateway'}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setViewMode(viewMode === 'public' ? 'portal' : 'public')}
            className="text-[10px] uppercase tracking-wider underline hover:text-[#FFFDF8]"
          >
            Switch to {viewMode === 'public' ? 'Partner Portal' : 'Public Information'}
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 1. PUBLIC PARTNER PAGE VIEW (Brief Item #3)              */}
      {/* ======================================================== */}
      {viewMode === 'public' && (
        <div className="animate-in fade-in">
          {/* Hero Section */}
          <section className="bg-[#102A43] text-[#F7F3EA] py-20 px-6 lg:px-12 border-b border-[#1E3A5F] text-center">
            <div className="max-w-4xl mx-auto space-y-5">
              <span className="text-[10px] uppercase tracking-[0.28em] text-[#D8C3A5] font-semibold">
                Private Referrals • Clear Progress • Trusted Collaboration
              </span>
              <h1 className="font-display text-4xl sm:text-6xl font-light text-[#F7F3EA]">
                Crestshore Partner Network
              </h1>
              <p className="text-sm sm:text-base text-[#E9E1D4]/90 max-w-2xl mx-auto leading-relaxed font-light">
                Approved brokers, agents, advisors and strategic partners can submit qualified property and investment opportunities, track referral progress and collaborate with Crestshore.
              </p>

              <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => setIsApplyModalOpen(true)}
                  className="w-full sm:w-auto bg-[#F7F3EA] hover:bg-[#FFFDF8] text-[#102A43] px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] transition-all shadow-md"
                >
                  Apply as a Partner
                </button>
                <button
                  onClick={() => setViewMode('portal')}
                  className="w-full sm:w-auto border border-[#B08D57] hover:bg-[#B08D57] hover:text-[#102A43] text-[#F7F3EA] px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] transition-all"
                >
                  Log In to Partner Portal
                </button>
              </div>
            </div>
          </section>

          {/* Three Core Principles */}
          <section className="py-20 px-6 lg:px-12 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-[#FFFDF8] border border-[#E9E1D4] p-8 shadow-sm space-y-3">
                <ShieldCheck className="w-6 h-6 text-[#B08D57]" />
                <h3 className="font-display text-xl text-[#102A43]">Lightweight & Discreet</h3>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  A simple, mobile-friendly record-keeping tool, not a bloated CRM. Submit referrals in under two minutes without requiring client name, phone or email upfront.
                </p>
              </div>

              <div className="bg-[#FFFDF8] border border-[#E9E1D4] p-8 shadow-sm space-y-3">
                <FileCheck className="w-6 h-6 text-[#B08D57]" />
                <h3 className="font-display text-xl text-[#102A43]">Individualized Agreement</h3>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  No generic commission rules. Crestshore uploads your partner-specific agreement with agreed split terms, securely accepted and signed online.
                </p>
              </div>

              <div className="bg-[#FFFDF8] border border-[#E9E1D4] p-8 shadow-sm space-y-3">
                <MessageSquare className="w-6 h-6 text-[#5D7A65]" />
                <h3 className="font-display text-xl text-[#102A43]">One-Click Direct Support</h3>
                <p className="text-xs text-[#6B7280] leading-relaxed">
                  No support tickets. Direct WhatsApp and phone communication beside every referral to preserve Crestshore’s trust-based way of doing business.
                </p>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. AUTHENTICATED PARTNER WORKSPACE VIEW                   */}
      {/* ======================================================== */}
      {viewMode === 'portal' && (
        <>
          {/* Header Banner - Deep Navy #102A43 */}
          <section className="bg-[#102A43] text-[#F7F3EA] py-12 px-6 lg:px-12 border-b border-[#1E3A5F]">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-[0.28em] text-[#D8C3A5] font-semibold">
                    Crestshore Partner Portal
                  </span>
                  <span className="text-[10px] font-mono text-[#D8C3A5]">• Partner ID: {partnerId}</span>
                </div>
                <h1 className="font-display text-3xl sm:text-4xl font-light text-[#F7F3EA]">
                  {partnerName}
                </h1>
                <p className="text-xs text-[#E9E1D4]/80 font-light">
                  {partnerCompany} • Agreement Status:{' '}
                  <span
                    className={`font-semibold ${
                      isAgreementSigned ? 'text-[#5D7A65]' : 'text-amber-400'
                    }`}
                  >
                    {agreementStatus}
                  </span>
                </p>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="https://wa.me/971501123456?text=Hello%20Crestshore,%20Partner%20ID%20CP-0048%20inquiring."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#1EBE5D] text-white px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>One-Click WhatsApp</span>
                </a>
                <button
                  onClick={() => setIsAdvisorModalOpen(true)}
                  className="border border-[#B08D57] hover:bg-[#B08D57] hover:text-[#102A43] text-[#F7F3EA] px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all"
                >
                  Speak with an Advisor
                </button>
              </div>
            </div>
          </section>

          {/* 5-Item Final Menu (Brief Item #2) */}
          <div className="sticky top-20 z-40 bg-[#0B2135] border-b border-[#1E3A5F] shadow-sm">
            <div className="max-w-6xl mx-auto px-6 lg:px-12">
              <nav className="flex space-x-1 sm:space-x-4 overflow-x-auto py-2 text-xs uppercase tracking-[0.15em]">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`px-3 py-2 transition-all whitespace-nowrap border-b-2 font-medium ${
                    activeTab === 'dashboard'
                      ? 'border-[#B08D57] text-[#D8C3A5]'
                      : 'border-transparent text-[#E9E1D4]/70 hover:text-[#F7F3EA]'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => {
                    setActiveTab('submit');
                    setReferralSuccess(false);
                  }}
                  className={`px-3 py-2 transition-all whitespace-nowrap border-b-2 font-medium ${
                    activeTab === 'submit'
                      ? 'border-[#B08D57] text-[#D8C3A5]'
                      : 'border-transparent text-[#E9E1D4]/70 hover:text-[#F7F3EA]'
                  }`}
                >
                  Submit Referral
                </button>
                <button
                  onClick={() => setActiveTab('referrals')}
                  className={`px-3 py-2 transition-all whitespace-nowrap border-b-2 font-medium ${
                    activeTab === 'referrals'
                      ? 'border-[#B08D57] text-[#D8C3A5]'
                      : 'border-transparent text-[#E9E1D4]/70 hover:text-[#F7F3EA]'
                  }`}
                >
                  My Referrals ({referralsList.length})
                </button>
                <button
                  onClick={() => setActiveTab('commission')}
                  className={`px-3 py-2 transition-all whitespace-nowrap border-b-2 font-medium ${
                    activeTab === 'commission'
                      ? 'border-[#B08D57] text-[#D8C3A5]'
                      : 'border-transparent text-[#E9E1D4]/70 hover:text-[#F7F3EA]'
                  }`}
                >
                  Commission
                </button>
                <button
                  onClick={() => setActiveTab('agreement')}
                  className={`px-3 py-2 transition-all whitespace-nowrap border-b-2 font-medium ${
                    activeTab === 'agreement'
                      ? 'border-[#B08D57] text-[#D8C3A5]'
                      : 'border-transparent text-[#E9E1D4]/70 hover:text-[#F7F3EA]'
                  }`}
                >
                  Agreement ({agreementStatus})
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content Area */}
          <main className="max-w-6xl mx-auto px-6 lg:px-12 py-12">
            {/* ======================================================== */}
            {/* TAB 1: DASHBOARD (Brief Item #7)                         */}
            {/* ======================================================== */}
            {activeTab === 'dashboard' && (
              <div className="space-y-10 animate-in fade-in">
                {/* Agreement Status & Activation Alert (Brief Item #4 & #7) */}
                {!isAgreementSigned ? (
                  <div className="bg-amber-50 border-l-4 border-l-amber-600 border border-amber-200 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs uppercase tracking-wider text-amber-900 font-bold">
                          Partner Agreement Awaiting Signature
                        </h4>
                        <p className="text-[11px] text-amber-800 mt-0.5">
                          Referral submission is disabled until your partner agreement is signed online.
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveTab('agreement')}
                      className="bg-amber-800 hover:bg-amber-900 text-white px-4 py-2 text-xs uppercase tracking-wider font-semibold whitespace-nowrap self-start sm:self-auto"
                    >
                      Review & Sign Agreement
                    </button>
                  </div>
                ) : (
                  <div className="bg-[#FFFDF8] border-l-4 border-l-[#5D7A65] border border-[#E9E1D4] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#5D7A65] shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs uppercase tracking-wider text-[#102A43] font-bold">
                          Active Partner Agreement: Version v1.2
                        </h4>
                        <p className="text-[11px] text-[#6B7280] mt-0.5">
                          Partner ID: <strong className="text-[#102A43]">{partnerId}</strong> • Authoritative split: <strong className="text-[#102A43]">50% of Crestshore Gross Agency Fee</strong>.
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveTab('agreement')}
                      className="text-xs text-[#B08D57] hover:text-[#102A43] font-medium flex items-center gap-1 self-start sm:self-auto"
                    >
                      <span>View Signed Agreement</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {/* Dashboard Metrics (Brief Item #7: Partner name/ID, Agreement status, Large submit button, Active referrals, Total paid, Total pending, Latest update) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-[#FFFDF8] border border-[#E9E1D4] p-6 shadow-sm">
                    <span className="text-[10px] uppercase tracking-wider text-[#6B7280] font-medium block mb-1">
                      Partner ID & Name
                    </span>
                    <div className="font-display text-2xl font-light text-[#102A43]">{partnerId}</div>
                    <div className="text-[11px] text-[#6B7280] mt-2 truncate">{partnerName}</div>
                  </div>

                  <div className="bg-[#FFFDF8] border border-[#E9E1D4] p-6 shadow-sm">
                    <span className="text-[10px] uppercase tracking-wider text-[#6B7280] font-medium block mb-1">
                      Active Referrals
                    </span>
                    <div className="font-display text-3xl font-light text-[#102A43]">2 Active</div>
                    <div className="text-[11px] text-[#5D7A65] mt-2 font-medium">1 Closed & Settled</div>
                  </div>

                  <div className="bg-[#FFFDF8] border border-[#E9E1D4] p-6 shadow-sm">
                    <span className="text-[10px] uppercase tracking-wider text-[#6B7280] font-medium block mb-1">
                      Total Commission Paid
                    </span>
                    <div className="font-display text-3xl font-light text-[#5D7A65]">AED 125,000</div>
                    <div className="text-[11px] text-[#6B7280] mt-2">Disbursed post-conveyance</div>
                  </div>

                  <div className="bg-[#FFFDF8] border border-[#E9E1D4] p-6 shadow-sm">
                    <span className="text-[10px] uppercase tracking-wider text-[#6B7280] font-medium block mb-1">
                      Total Commission Pending
                    </span>
                    <div className="font-display text-3xl font-light text-[#B08D57]">AED 40,000</div>
                    <div className="text-[11px] text-[#6B7280] mt-2">+ AED 15,000 Under Review</div>
                  </div>
                </div>

                {/* Large Submit Referral Button (Brief Item #7: enabled ONLY after agreement acceptance) */}
                <div className="bg-[#102A43] text-[#F7F3EA] p-8 border border-[#1E3A5F] flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-md">
                  <div className="space-y-1">
                    <h3 className="font-display text-2xl sm:text-3xl font-light text-[#F7F3EA]">
                      Submit a New Client Referral
                    </h3>
                    <p className="text-xs text-[#E9E1D4]/80 max-w-xl">
                      Fast 2-minute referral. No client name, phone number or email address required.
                    </p>
                  </div>

                  {isAgreementSigned ? (
                    <button
                      onClick={() => {
                        setActiveTab('submit');
                        setReferralSuccess(false);
                      }}
                      className="bg-[#F7F3EA] hover:bg-[#FFFDF8] text-[#102A43] px-8 py-3.5 text-xs uppercase tracking-[0.16em] font-semibold transition-all shadow-sm whitespace-nowrap self-start sm:self-auto"
                    >
                      + Submit Referral Now
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 bg-[#0B2135] p-3 border border-amber-600/50 text-amber-300 text-xs">
                      <Lock className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Disabled until agreement is signed</span>
                    </div>
                  )}
                </div>

                {/* Latest Update & Recent Referrals */}
                <div className="bg-[#FFFDF8] border border-[#E9E1D4] p-6 shadow-sm space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E9E1D4]">
                    <span className="text-xs uppercase tracking-wider text-[#102A43] font-semibold">
                      Latest Activity Update
                    </span>
                    <span className="text-[11px] text-[#6B7280]">Today, 11:20 AM GST</span>
                  </div>
                  <div className="p-4 bg-[#F7F3EA] border border-[#E9E1D4] text-xs leading-relaxed text-[#3E4852]">
                    <strong>Referral CS-R-000123:</strong> Initial shortlist of 3 off-market beachfront villas shared with private desk. Buyer viewing scheduling in progress with assigned Senior Director.
                  </div>
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* TAB 2: SUBMIT REFERRAL (Brief Item #8 & #9)              */}
            {/* ======================================================== */}
            {activeTab === 'submit' && (
              <div className="max-w-3xl mx-auto animate-in fade-in">
                {!isAgreementSigned ? (
                  <div className="bg-[#FFFDF8] border border-amber-300 p-10 text-center space-y-4 shadow-sm">
                    <Lock className="w-10 h-10 text-amber-700 mx-auto" />
                    <h3 className="font-display text-2xl text-[#102A43]">
                      Referral Submissions Locked
                    </h3>
                    <p className="text-xs text-[#6B7280] max-w-md mx-auto leading-relaxed">
                      As per Crestshore governance, your individualized partner agreement must be signed online before submitting client opportunities.
                    </p>
                    <button
                      onClick={() => setActiveTab('agreement')}
                      className="bg-[#102A43] hover:bg-[#1E3A5F] text-[#FFFDF8] px-6 py-3 text-xs uppercase tracking-wider font-semibold transition-all"
                    >
                      Go to Agreement & Sign Online
                    </button>
                  </div>
                ) : referralSuccess ? (
                  <div className="bg-[#FFFDF8] border border-[#E9E1D4] p-10 text-center space-y-6 shadow-sm">
                    <div className="w-14 h-14 rounded-full bg-[#5D7A65]/10 border border-[#5D7A65]/30 text-[#5D7A65] mx-auto flex items-center justify-center">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <div>
                      <span className="text-[11px] uppercase tracking-widest text-[#B08D57] font-semibold block mb-1">
                        Referral Registered
                      </span>
                      <h3 className="font-display text-3xl text-[#102A43]">
                        Reference: {createdRefId}
                      </h3>
                      {isPossibleDuplicate ? (
                        <div className="mt-3 p-4 bg-purple-50 border border-purple-200 text-purple-900 text-xs max-w-lg mx-auto">
                          <strong>Notice:</strong> This referral may already exist in our records. Crestshore will review it and notify you.
                        </div>
                      ) : (
                        <p className="text-xs text-[#6B7280] max-w-lg mx-auto mt-2 leading-relaxed">
                          Referral received — under review. Status: <strong className="text-[#102A43]">Received</strong>.
                          Your referral is linked to Partner Agreement v1.2.
                        </p>
                      )}
                    </div>

                    <div className="bg-[#F7F3EA] border border-[#E9E1D4] p-3 max-w-xs mx-auto flex items-center justify-between text-xs">
                      <span className="font-mono text-[#102A43] font-semibold">{createdRefId}</span>
                      <button
                        onClick={() => handleCopyId(createdRefId)}
                        className="text-[#B08D57] hover:text-[#102A43] font-medium"
                      >
                        {copiedId === createdRefId ? 'Copied' : 'Copy'}
                      </button>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                      <a
                        href={`https://wa.me/971501123456?text=Regarding%20Referral%20Reference:%20${createdRefId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#25D366] hover:bg-[#1EBE5D] text-white px-6 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Confirm via WhatsApp</span>
                      </a>
                      <button
                        onClick={() => setActiveTab('referrals')}
                        className="border border-[#102A43] text-[#102A43] hover:bg-[#102A43] hover:text-[#FFFDF8] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all"
                      >
                        View in Pipeline
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#FFFDF8] border border-[#E9E1D4] p-8 sm:p-10 shadow-sm space-y-6">
                    <div className="border-b border-[#E9E1D4] pb-5">
                      <span className="text-[10px] uppercase tracking-[0.25em] text-[#B08D57] font-semibold block mb-1">
                        Fast Referral Desk
                      </span>
                      <h2 className="font-display text-2xl sm:text-3xl text-[#102A43]">
                        Submit Opportunity
                      </h2>
                      <p className="text-xs text-[#6B7280] mt-1">
                        Do not enter the client’s name, phone number or email address.
                      </p>
                    </div>

                    {referralError && (
                      <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs">
                        {referralError}
                      </div>
                    )}

                    <form onSubmit={handleReferralSubmit} className="space-y-5 text-xs">
                      {/* Market / location */}
                      <div>
                        <label className="text-[11px] uppercase tracking-wider text-[#6B7280] font-medium block mb-1">
                          Market / Location *
                        </label>
                        <input
                          type="text"
                          required
                          value={referralForm.marketLocation}
                          onChange={(e) => setReferralForm({ ...referralForm, marketLocation: e.target.value })}
                          placeholder="e.g. Palm Jumeirah, Dubai / Downtown / DIFC"
                          className="w-full bg-[#FFFDF8] border border-[#E9E1D4] px-3.5 py-2.5 text-xs text-[#102A43] focus:outline-none focus:border-[#B08D57]"
                        />
                      </div>

                      {/* Referral type & Property type */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="text-[11px] uppercase tracking-wider text-[#6B7280] font-medium block mb-1">
                            Referral Type *
                          </label>
                          <select
                            value={referralForm.referralType}
                            onChange={(e) => setReferralForm({ ...referralForm, referralType: e.target.value })}
                            className="w-full bg-[#FFFDF8] border border-[#E9E1D4] px-3.5 py-2.5 text-xs text-[#102A43] focus:outline-none focus:border-[#B08D57]"
                          >
                            <option value="buyer">Buyer</option>
                            <option value="seller">Seller</option>
                            <option value="landlord">Landlord</option>
                            <option value="tenant">Tenant</option>
                            <option value="investor">Investor</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-[11px] uppercase tracking-wider text-[#6B7280] font-medium block mb-1">
                            Property Type *
                          </label>
                          <select
                            value={referralForm.propertyType}
                            onChange={(e) => setReferralForm({ ...referralForm, propertyType: e.target.value })}
                            className="w-full bg-[#FFFDF8] border border-[#E9E1D4] px-3.5 py-2.5 text-xs text-[#102A43] focus:outline-none focus:border-[#B08D57]"
                          >
                            <option value="Signature Villa">Signature Villa</option>
                            <option value="Beachfront Mansion">Beachfront Mansion</option>
                            <option value="Sky Penthouse">Sky Penthouse</option>
                            <option value="Luxury Townhouse">Luxury Townhouse</option>
                            <option value="Branded Residence">Branded Residence</option>
                            <option value="Full Floor / Commercial">Full Floor / Commercial</option>
                            <option value="Prime Plot">Prime Plot</option>
                          </select>
                        </div>
                      </div>

                      {/* Budget range */}
                      <div>
                        <label className="text-[11px] uppercase tracking-wider text-[#6B7280] font-medium block mb-1">
                          Budget Range *
                        </label>
                        <select
                          value={referralForm.budgetRange}
                          onChange={(e) => setReferralForm({ ...referralForm, budgetRange: e.target.value })}
                          className="w-full bg-[#FFFDF8] border border-[#E9E1D4] px-3.5 py-2.5 text-xs text-[#102A43] focus:outline-none focus:border-[#B08D57]"
                        >
                          <option value="AED 10M – AED 25M">AED 10M – AED 25M</option>
                          <option value="AED 25M – AED 50M">AED 25M – AED 50M</option>
                          <option value="AED 50M – AED 100M">AED 50M – AED 100M</option>
                          <option value="AED 100M+ (Ultra-Prime)">AED 100M+ (Ultra-Prime)</option>
                        </select>
                      </div>

                      {/* One-line requirement */}
                      <div>
                        <label className="text-[11px] uppercase tracking-wider text-[#6B7280] font-medium block mb-1">
                          One-Line Requirement *
                        </label>
                        <input
                          type="text"
                          required
                          value={referralForm.oneLineRequirement}
                          onChange={(e) => setReferralForm({ ...referralForm, oneLineRequirement: e.target.value })}
                          placeholder="e.g. Cash buyer seeking beachfront modern villa with private berth."
                          className="w-full bg-[#FFFDF8] border border-[#E9E1D4] px-3.5 py-2.5 text-xs text-[#102A43] focus:outline-none focus:border-[#B08D57]"
                        />
                      </div>

                      {/* Optional note */}
                      <div>
                        <label className="text-[11px] uppercase tracking-wider text-[#6B7280] font-medium block mb-1">
                          Optional Note (Timelines, preferences, etc.)
                        </label>
                        <textarea
                          rows={2}
                          value={referralForm.optionalNote}
                          onChange={(e) => setReferralForm({ ...referralForm, optionalNote: e.target.value })}
                          placeholder="Additional context without personal contact identifiers..."
                          className="w-full bg-[#FFFDF8] border border-[#E9E1D4] p-3 text-xs text-[#102A43] focus:outline-none focus:border-[#B08D57]"
                        />
                      </div>

                      {/* Required consent checkbox */}
                      <div className="p-4 bg-[#F7F3EA] border border-[#E9E1D4]">
                        <label className="flex items-start gap-3 cursor-pointer text-xs">
                          <input
                            type="checkbox"
                            required
                            checked={referralForm.consentCheckbox}
                            onChange={(e) => setReferralForm({ ...referralForm, consentCheckbox: e.target.checked })}
                            className="mt-0.5 accent-[#B08D57]"
                          />
                          <span className="text-[#3E4852] leading-relaxed">
                            I confirm I have permission from the principal to refer this opportunity to Crestshore under Partner Agreement v1.2.
                          </span>
                        </label>
                      </div>

                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={isSubmittingReferral}
                          className="w-full bg-[#102A43] hover:bg-[#1E3A5F] text-[#FFFDF8] py-3.5 text-xs font-semibold uppercase tracking-[0.16em] transition-all shadow-sm"
                        >
                          {isSubmittingReferral ? 'Registering...' : 'Submit Referral & Generate Reference'}
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            )}

            {/* ======================================================== */}
            {/* TAB 3: MY REFERRALS (Brief Item #10: 4 statuses)         */}
            {/* ======================================================== */}
            {activeTab === 'referrals' && (
              <div className="space-y-6 animate-in fade-in">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E9E1D4]">
                  <div>
                    <h2 className="font-display text-2xl text-[#102A43]">My Referrals</h2>
                    <p className="text-xs text-[#6B7280] mt-1">
                      Real-time pipeline tracking with one-click direct communication beside each referral.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setActiveTab('submit');
                      setReferralSuccess(false);
                    }}
                    className="bg-[#102A43] hover:bg-[#1E3A5F] text-[#FFFDF8] px-4 py-2 text-xs uppercase tracking-wider font-semibold transition-all"
                  >
                    + Submit Referral
                  </button>
                </div>

                <div className="bg-[#FFFDF8] border border-[#E9E1D4] overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#102A43] text-[#F7F3EA] uppercase tracking-wider text-[10px]">
                        <tr>
                          <th className="py-3 px-4">Referral ID</th>
                          <th className="py-3 px-4">Date</th>
                          <th className="py-3 px-4">Market / Type</th>
                          <th className="py-3 px-4">Status</th>
                          <th className="py-3 px-4">Last Updated</th>
                          <th className="py-3 px-4">Crestshore Update</th>
                          <th className="py-3 px-4 text-right">Support</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E9E1D4]">
                        {referralsList.map((ref) => (
                          <tr key={ref.id} className="hover:bg-[#F7F3EA]/50 transition-colors">
                            <td className="py-4 px-4 font-mono font-semibold text-[#102A43]">
                              {ref.id}
                            </td>
                            <td className="py-4 px-4 text-[#6B7280] font-mono text-[11px]">
                              {ref.dateSubmitted}
                            </td>
                            <td className="py-4 px-4">
                              <span className="font-medium text-[#102A43] block">{ref.marketLocation}</span>
                              <span className="text-[10px] text-[#6B7280]">{ref.referralType} • {ref.propertyType}</span>
                            </td>
                            <td className="py-4 px-4">
                              <span className={`text-[10px] px-2 py-0.5 border font-semibold ${ref.statusColor}`}>
                                {ref.status}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-[11px] text-[#6B7280] font-mono">
                              {ref.lastUpdated}
                            </td>
                            <td className="py-4 px-4 text-xs text-[#3E4852] max-w-xs leading-relaxed">
                              {ref.crestshoreUpdate}
                            </td>
                            <td className="py-4 px-4 text-right whitespace-nowrap">
                              <a
                                href={`https://wa.me/971501123456?text=Regarding%20Referral%20ID:%20${ref.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white px-3 py-1.5 rounded-sm text-[11px] font-semibold transition-colors"
                              >
                                <MessageSquare className="w-3 h-3" />
                                <span>WhatsApp</span>
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* TAB 4: COMMISSION (Brief Item #12: Pending/Approved/Paid)*/}
            {/* ======================================================== */}
            {activeTab === 'commission' && (
              <div className="space-y-8 animate-in fade-in">
                <div className="pb-4 border-b border-[#E9E1D4] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="font-display text-2xl text-[#102A43]">Commission Statement</h2>
                    <p className="text-xs text-[#6B7280] mt-1">
                      Authoritative terms governed by Partner Agreement v1.2.
                    </p>
                  </div>
                  <a
                    href="https://wa.me/971501123456?text=Inquiry%20regarding%20partner%20commission%20ledger"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-[#B08D57] text-[#102A43] hover:bg-[#B08D57] hover:text-[#FFFDF8] px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#B08D57]" />
                    <span>Commission Support</span>
                  </a>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
                  <div className="bg-[#FFFDF8] border border-[#E9E1D4] p-6 shadow-sm">
                    <span className="text-[10px] uppercase tracking-wider text-[#6B7280] font-medium block mb-1">
                      Paid Commission
                    </span>
                    <div className="font-display text-3xl font-light text-[#5D7A65]">AED 125,000</div>
                    <p className="text-[11px] text-[#6B7280] mt-2 font-mono">Last paid: 05 Sep 2026</p>
                  </div>

                  <div className="bg-[#FFFDF8] border border-[#E9E1D4] p-6 shadow-sm">
                    <span className="text-[10px] uppercase tracking-wider text-[#6B7280] font-medium block mb-1">
                      Pending Commission
                    </span>
                    <div className="font-display text-3xl font-light text-[#B08D57]">AED 40,000</div>
                    <p className="text-[11px] text-[#6B7280] mt-2 font-mono">DLD Escrow Conveyance</p>
                  </div>

                  <div className="bg-[#FFFDF8] border border-[#E9E1D4] p-6 shadow-sm">
                    <span className="text-[10px] uppercase tracking-wider text-[#6B7280] font-medium block mb-1">
                      Under Review
                    </span>
                    <div className="font-display text-3xl font-light text-[#102A43]">AED 15,000</div>
                    <p className="text-[11px] text-[#6B7280] mt-2 font-mono">Awaiting Contract Sign</p>
                  </div>

                  <div className="bg-[#FFFDF8] border border-[#E9E1D4] p-6 shadow-sm">
                    <span className="text-[10px] uppercase tracking-wider text-[#6B7280] font-medium block mb-1">
                      Governing Terms
                    </span>
                    <div className="font-display text-xl text-[#102A43] truncate">Partner Agreement v1.2</div>
                    <p className="text-[11px] text-[#B08D57] mt-2 font-semibold">50% Gross Split</p>
                  </div>
                </div>

                {/* Ledger Table */}
                <div className="bg-[#FFFDF8] border border-[#E9E1D4] overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#102A43] text-[#F7F3EA] uppercase tracking-wider text-[10px]">
                        <tr>
                          <th className="py-3 px-4">Referral ID</th>
                          <th className="py-3 px-4">Property / Mandate</th>
                          <th className="py-3 px-4">Deal Volume</th>
                          <th className="py-3 px-4">Commission Split</th>
                          <th className="py-3 px-4">Amount</th>
                          <th className="py-3 px-4">Status</th>
                          <th className="py-3 px-4">Agreement Version</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E9E1D4]">
                        {commissions.map((c) => (
                          <tr key={c.referralId} className="hover:bg-[#F7F3EA]/50">
                            <td className="py-4 px-4 font-mono font-semibold text-[#102A43]">{c.referralId}</td>
                            <td className="py-4 px-4 text-[#3E4852] font-medium">{c.property}</td>
                            <td className="py-4 px-4 text-[#6B7280] font-mono">{c.transactionAED}</td>
                            <td className="py-4 px-4 text-[#102A43]">{c.split}</td>
                            <td className="py-4 px-4 font-bold text-[#102A43]">{c.amountAED}</td>
                            <td className="py-4 px-4">
                              <span className={`text-[10px] px-2 py-0.5 border font-semibold ${c.statusColor}`}>
                                {c.status}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-[11px] text-[#B08D57] font-mono">{c.agreementVersion}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* TAB 5: AGREEMENT (Brief Item #6: Review & Sign Screen)   */}
            {/* ======================================================== */}
            {activeTab === 'agreement' && (
              <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in">
                {signingSuccess && (
                  <div className="p-4 bg-[#5D7A65]/10 border border-[#5D7A65]/30 text-[#5D7A65] text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>
                      Agreement accepted successfully — Version v1.2 recorded. Referral submissions are now fully unlocked.
                    </span>
                  </div>
                )}

                <div className="bg-[#FFFDF8] border border-[#E9E1D4] p-8 sm:p-10 shadow-sm space-y-6">
                  {/* Agreement Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E9E1D4]">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.25em] text-[#B08D57] font-semibold block mb-1">
                        Individual Partner Agreement
                      </span>
                      <h2 className="font-display text-2xl sm:text-3xl text-[#102A43]">
                        Master Referral Agreement
                      </h2>
                      <p className="text-xs text-[#6B7280] font-mono mt-0.5">
                        Version: v1.2 • Effective Date: October 1, 2026
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] uppercase tracking-wider px-3 py-1 font-semibold border ${
                          isAgreementSigned
                            ? 'bg-[#5D7A65]/10 text-[#5D7A65] border-[#5D7A65]/30'
                            : 'bg-amber-100 text-amber-900 border-amber-300'
                        }`}
                      >
                        {agreementStatus}
                      </span>
                    </div>
                  </div>

                  {/* Partner Metadata Summary */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-[#F7F3EA] border border-[#E9E1D4] text-xs">
                    <div>
                      <span className="text-[10px] uppercase text-[#6B7280] block font-medium">Partner Legal Name</span>
                      <span className="font-semibold text-[#102A43]">{partnerName} ({partnerId})</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-[#6B7280] block font-medium">Authoritative Split</span>
                      <span className="font-semibold text-[#B08D57]">50% of Crestshore Gross Agency Fee</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-[#6B7280] block font-medium">Client Protection</span>
                      <span className="font-semibold text-[#102A43]">24 Months Non-Circumvention</span>
                    </div>
                  </div>

                  {/* Embedded Document Viewer (Brief Item #6) */}
                  <div className="border border-[#E9E1D4] p-6 bg-[#FFFDF8] space-y-4 max-h-[380px] overflow-y-auto text-xs text-[#3E4852] leading-relaxed">
                    <div className="flex items-center justify-between pb-3 border-b border-[#E9E1D4]">
                      <span className="font-serif font-bold text-sm text-[#102A43]">CRESTSHORE LUXURY REAL ESTATE LLC</span>
                      <button
                        onClick={() => alert('Downloading official Agreement PDF (v1.2)...')}
                        className="text-[11px] text-[#B08D57] hover:underline flex items-center gap-1 font-medium"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download PDF</span>
                      </button>
                    </div>

                    <h4 className="font-bold text-[#102A43]">1. PURPOSE & INDIVIDUAL COMMERCIAL TERMS</h4>
                    <p>
                      This Master Referral Agreement sets forth the definitive terms under which the Partner ({partnerName}, {partnerCompany}, Partner ID: {partnerId}) introduces prospective buyers, sellers, landlords, and investors to Crestshore.
                    </p>

                    <h4 className="font-bold text-[#102A43]">2. COMMISSION SPLIT & SETTLEMENT PROTOCOL</h4>
                    <p>
                      Crestshore shall disburse exactly <strong>50% (fifty percent)</strong> of all gross conveyance fees earned on closed transactions arising from registered Referral IDs. Settlements occur within 48 hours of Dubai Land Department escrow clearance.
                    </p>

                    <h4 className="font-bold text-[#102A43]">3. 24-MONTH CLIENT PROTECTION & NON-CIRCUMVENTION</h4>
                    <p>
                      Crestshore covenant that any referral generated under this agreement remains exclusively credited to the Partner for 24 months. Crestshore shall not circumvent or transact with the principal directly without crediting the agreed split.
                    </p>

                    <h4 className="font-bold text-[#102A43]">4. NO CLIENT PII REQUIRED AT INCEPTION</h4>
                    <p>
                      The introducing partner is expressly protected from having to disclose client names, phone numbers, or email addresses at the initial referral registration stage.
                    </p>
                  </div>

                  <div className="text-xs text-[#6B7280] italic">
                    “Please review the attached agreement carefully. The uploaded agreement controls the agreed commercial terms.”
                  </div>

                  {/* Signature Form (If not signed) */}
                  {!isAgreementSigned ? (
                    <div className="p-6 bg-[#F7F3EA] border border-[#E9E1D4] space-y-4 text-xs">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={hasAgreedTerms}
                          onChange={(e) => setHasAgreedTerms(e.target.checked)}
                          className="mt-0.5 accent-[#B08D57]"
                        />
                        <span className="text-[#102A43] font-medium leading-relaxed">
                          I confirm I have read, understood, and accept the terms of this Partner Agreement (v1.2).
                        </span>
                      </label>

                      <div>
                        <label className="text-[11px] uppercase tracking-wider text-[#6B7280] font-medium block mb-1">
                          Type Legal Full Name for Digital Signature *
                        </label>
                        <input
                          type="text"
                          value={typedSignName}
                          onChange={(e) => setTypedSignName(e.target.value)}
                          placeholder="e.g. Alexander Wright"
                          className="w-full bg-[#FFFDF8] border border-[#E9E1D4] px-3.5 py-2.5 text-xs text-[#102A43] focus:outline-none focus:border-[#B08D57]"
                        />
                      </div>

                      <div className="text-[11px] text-[#6B7280] font-mono">
                        Session Record: 185.120.44.12 • Device Authenticated • Timestamp will be permanently logged.
                      </div>

                      <div className="flex gap-3 pt-2">
                        <button
                          type="button"
                          onClick={handleSignAgreement}
                          className="bg-[#102A43] hover:bg-[#1E3A5F] text-[#FFFDF8] px-6 py-3 text-xs uppercase tracking-wider font-semibold transition-colors"
                        >
                          Sign and Accept Agreement
                        </button>
                        <button
                          type="button"
                          onClick={handleSignAgreement}
                          className="border border-[#B08D57] text-[#102A43] hover:bg-[#B08D57] hover:text-[#FFFDF8] px-6 py-3 text-xs uppercase tracking-wider font-semibold transition-colors"
                        >
                          Approve Agreement
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 bg-[#102A43] text-[#F7F3EA] border border-[#1E3A5F] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase tracking-widest text-[#D8C3A5] font-semibold">
                          Digital Execution Record
                        </span>
                        <div className="text-[11px] text-[#E9E1D4]/80 font-mono">
                          Signed by: {partnerName} ({partnerId}) • Version: v1.2 • IP: 185.120.44.12 • Fully Executed
                        </div>
                      </div>
                      <button
                        onClick={() => alert('Master Referral Agreement PDF downloaded.')}
                        className="bg-[#B08D57] hover:bg-[#D8C3A5] text-[#102A43] px-4 py-2 text-xs uppercase tracking-wider font-semibold transition-colors flex items-center gap-1.5 self-start sm:self-auto"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download PDF Copy</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </main>
        </>
      )}

      {/* ======================================================== */}
      {/* 3. PARTNER APPLICATION MODAL (Brief Item #4)             */}
      {/* ======================================================== */}
      {isApplyModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#0B2135]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FFFDF8] border border-[#E9E1D4] max-w-lg w-full p-8 shadow-2xl animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#E9E1D4] mb-6">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#B08D57] font-semibold block">
                  Institutional Application
                </span>
                <h3 className="font-display text-2xl text-[#102A43]">Apply as a Partner</h3>
              </div>
              <button
                onClick={() => setIsApplyModalOpen(false)}
                className="text-[#6B7280] hover:text-[#102A43]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {appSuccessMessage ? (
              <div className="p-6 bg-[#5D7A65]/10 border border-[#5D7A65]/30 text-center space-y-3">
                <CheckCircle2 className="w-8 h-8 text-[#5D7A65] mx-auto" />
                <h4 className="font-display text-lg text-[#102A43]">Application Submitted</h4>
                <p className="text-xs text-[#6B7280] leading-relaxed">{appSuccessMessage}</p>
                <button
                  onClick={() => {
                    setIsApplyModalOpen(false);
                    setAppSuccessMessage('');
                  }}
                  className="mt-2 bg-[#102A43] text-white px-4 py-2 text-xs uppercase tracking-wider"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="space-y-4 text-xs">
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#6B7280] font-medium block mb-1">
                    Full Legal Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={applyForm.fullName}
                    onChange={(e) => setApplyForm({ ...applyForm, fullName: e.target.value })}
                    placeholder="e.g. Alexander Wright"
                    className="w-full bg-[#FFFDF8] border border-[#E9E1D4] px-3 py-2 text-xs text-[#102A43] focus:outline-none focus:border-[#B08D57]"
                  />
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#6B7280] font-medium block mb-1">
                    Company or Firm Name (if applicable)
                  </label>
                  <input
                    type="text"
                    value={applyForm.companyName}
                    onChange={(e) => setApplyForm({ ...applyForm, companyName: e.target.value })}
                    placeholder="e.g. Wright Wealth Advisory Ltd."
                    className="w-full bg-[#FFFDF8] border border-[#E9E1D4] px-3 py-2 text-xs text-[#102A43] focus:outline-none focus:border-[#B08D57]"
                  />
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#6B7280] font-medium block mb-1">
                    Partner Type *
                  </label>
                  <select
                    value={applyForm.partnerType}
                    onChange={(e) => setApplyForm({ ...applyForm, partnerType: e.target.value })}
                    className="w-full bg-[#FFFDF8] border border-[#E9E1D4] px-3 py-2 text-xs text-[#102A43] focus:outline-none focus:border-[#B08D57]"
                  >
                    <option value="broker/agent">Broker / Agent</option>
                    <option value="CA/tax advisor">CA / Tax Advisor</option>
                    <option value="wealth manager">Wealth Manager / Family Office</option>
                    <option value="developer/project representative">Developer / Project Representative</option>
                    <option value="consultant">Consultant</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#6B7280] font-medium block mb-1">
                    City and Market Served *
                  </label>
                  <input
                    type="text"
                    required
                    value={applyForm.cityMarket}
                    onChange={(e) => setApplyForm({ ...applyForm, cityMarket: e.target.value })}
                    placeholder="e.g. Dubai, London, Zurich, Singapore"
                    className="w-full bg-[#FFFDF8] border border-[#E9E1D4] px-3 py-2 text-xs text-[#102A43] focus:outline-none focus:border-[#B08D57]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#6B7280] font-medium block mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={applyForm.phone}
                      onChange={(e) => setApplyForm({ ...applyForm, phone: e.target.value })}
                      placeholder="+971 50 ..."
                      className="w-full bg-[#FFFDF8] border border-[#E9E1D4] px-3 py-2 text-xs text-[#102A43] focus:outline-none focus:border-[#B08D57]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#6B7280] font-medium block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={applyForm.email}
                      onChange={(e) => setApplyForm({ ...applyForm, email: e.target.value })}
                      placeholder="alexander@..."
                      className="w-full bg-[#FFFDF8] border border-[#E9E1D4] px-3 py-2 text-xs text-[#102A43] focus:outline-none focus:border-[#B08D57]"
                    />
                  </div>
                </div>

                <div className="p-3 bg-[#F7F3EA] border border-[#E9E1D4] text-[11px] text-[#6B7280]">
                  Agreement acceptance occurs at the later signing stage after admin review and approval.
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsApplyModalOpen(false)}
                    className="flex-1 border border-[#E9E1D4] py-2.5 text-xs uppercase tracking-wider text-[#3E4852]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmittingApp}
                    className="flex-1 bg-[#102A43] hover:bg-[#1E3A5F] text-[#FFFDF8] py-2.5 text-xs uppercase tracking-wider font-semibold transition-colors"
                  >
                    {isSubmittingApp ? 'Submitting...' : 'Apply Now'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Global Universal Advisor Modal */}
      <SpeakAdvisorModal
        isOpen={isAdvisorModalOpen}
        onClose={() => setIsAdvisorModalOpen(false)}
        initialService="Partner Network Consultation"
      />
    </div>
  );
};

export default PartnerNetworkPage;
