import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useFavorites } from '../../context/FavoritesContext';
import { useNotifications } from '../../context/NotificationContext';
import { api } from '../../services/api';
import { PropertyCard } from '../../components/property/PropertyCard';
import {
  User,
  Mail,
  Phone,
  Shield,
  Heart,
  Calendar,
  LogOut,
  Compass,
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles,
  Building,
  KeyRound,
  Eye,
  EyeOff,
  Bell,
  MessageSquare,
  Building2,
  Clock,
  Send
} from 'lucide-react';

type ProfileTab = 'details' | 'favorites' | 'inquiries' | 'notifications' | 'advisory' | 'security';

export const ProfilePage: React.FC = () => {
  const { user, logout, updateProfile, isAuthenticated, isLoading, openAuthModal } = useAuth();
  const { favorites } = useFavorites();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<ProfileTab>('details');
  const [savedProperties, setSavedProperties] = useState<any[]>([]);
  const [isLoadingProps, setIsLoadingProps] = useState(false);
  const [leads, setLeads] = useState<any[]>([]);
  const [isLoadingLeads, setIsLoadingLeads] = useState(false);

  // Form states for personal details
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [currency, setCurrency] = useState('AED');
  const [contactMethod, setContactMethod] = useState('WHATSAPP');
  const [isSavingDetails, setIsSavingDetails] = useState(false);
  const [detailsSuccess, setDetailsSuccess] = useState(false);
  const [detailsError, setDetailsError] = useState<string | null>(null);

  // Form states for password change
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isChangingPass, setIsChangingPass] = useState(false);
  const [passSuccess, setPassSuccess] = useState(false);
  const [passError, setPassError] = useState<string | null>(null);

  // Sync user details to local form
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setPhone(user.phone || '');
    }
  }, [user]);

  // Load saved properties for the favorites tab
  useEffect(() => {
    async function loadFavs() {
      if (favorites.length === 0) {
        setSavedProperties([]);
        return;
      }
      setIsLoadingProps(true);
      try {
        const res = await api.getProperties();
        const matched = (res.properties || []).filter((p: any) => favorites.includes(p._id));
        setSavedProperties(matched);
      } catch (err) {
        console.error('Failed to load favorites in profile:', err);
      } finally {
        setIsLoadingProps(false);
      }
    }
    loadFavs();
  }, [favorites]);

  const loadLeads = async () => {
    setIsLoadingLeads(true);
    try {
      const res = await api.getMyLeads();
      if (res?.success) {
        setLeads(res.leads || []);
      }
    } catch (err) {
      console.warn('Failed to load client inquiries:', err);
    } finally {
      setIsLoadingLeads(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadLeads();
    }
  }, [isAuthenticated, user?.email]);

  const handleUpdateDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    setDetailsError(null);
    setDetailsSuccess(false);

    if (!name.trim()) {
      setDetailsError('Name cannot be empty.');
      return;
    }

    setIsSavingDetails(true);
    try {
      await updateProfile({ name, phone });
      setDetailsSuccess(true);
      setTimeout(() => setDetailsSuccess(false), 4000);
    } catch (err: any) {
      setDetailsError(err.message || 'Failed to update profile.');
    } finally {
      setIsSavingDetails(false);
    }
  };

  const handleChangePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassError(null);
    setPassSuccess(false);

    if (!currentPassword || !newPassword) {
      setPassError('Please enter both current and new password.');
      return;
    }
    if (newPassword.length < 8) {
      setPassError('New password must be at least 8 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPassError('New passwords do not match.');
      return;
    }

    setIsChangingPass(true);
    try {
      await api.changePassword({ currentPassword, newPassword });
      setPassSuccess(true);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setPassSuccess(false), 5000);
    } catch (err: any) {
      setPassError(err.message || 'Failed to change password. Verify your current password.');
    } finally {
      setIsChangingPass(false);
    }
  };

  const handleLogoutClick = () => {
    logout();
    navigate('/');
  };

  // If still loading session
  if (isLoading) {
    return (
      <div className="pt-36 pb-24 text-center text-xs font-mono text-[#71717A] min-h-screen">
        Loading client profile...
      </div>
    );
  }

  // If not logged in, show luxury access gate
  if (!isAuthenticated || !user) {
    return (
      <div className="pt-32 pb-24 bg-[#F7F3EA] min-h-screen flex items-center justify-center px-4 font-ui">
        <div className="max-w-md w-full bg-[#FFFDF8] border border-[#E9E1D4] text-[#3E4852] p-8 sm:p-10 rounded-sm text-center shadow-xl">
          <div className="w-12 h-12 rounded-full bg-[#102A43] border border-[#B08D57]/40 flex items-center justify-center mx-auto mb-4 text-[#D8C3A5]">
            <Compass className="w-6 h-6" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#B08D57] block mb-2 font-semibold">
            Private Client Portal
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-medium text-[#102A43] mb-3">
            Authentication Required
          </h2>
          <p className="text-xs text-[#6B7280] font-normal leading-relaxed mb-6">
            Please sign in to access your personal vault, saved residences, private consultation history, and account settings.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => openAuthModal('login')}
              className="w-full bg-[#102A43] hover:bg-[#0B2135] text-[#FFFDF8] hover:text-[#D8C3A5] py-3 rounded-xs text-xs font-semibold uppercase tracking-[0.16em] transition-all shadow-sm"
            >
              Sign In to Account
            </button>
            <button
              onClick={() => openAuthModal('register')}
              className="w-full bg-[#FFFDF8] border border-[#E9E1D4] hover:border-[#B08D57] text-[#102A43] py-3 rounded-xs text-xs font-medium uppercase tracking-[0.16em] transition-all"
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 bg-[#F7F3EA] min-h-screen text-[#3E4852] font-ui">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Executive Profile Header Card - Deep Navy #102A43 */}
        <div className="bg-[#102A43] text-[#F7F3EA] rounded-sm border border-[#1E3A5F] p-8 sm:p-10 shadow-sm mb-10 relative overflow-hidden">
          {/* Subtle Top Gold Accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#B08D57] via-[#D8C3A5] to-[#B08D57]" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            {/* Left: Avatar and Identity */}
            <div className="flex items-center gap-5">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-[#0B2135] border-2 border-[#B08D57] flex items-center justify-center font-display text-2xl text-[#D8C3A5] font-normal shadow-md overflow-hidden">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <span>{user.name.charAt(0).toUpperCase()}</span>
                  )}
                </div>
                <div className="absolute -bottom-1 -right-1 bg-[#5D7A65] text-[#F7F3EA] p-1 rounded-full" title="Verified Client">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="font-display text-2xl sm:text-3xl text-[#F7F3EA] font-normal">
                    {user.name}
                  </h1>
                  <span className="px-2 py-0.5 bg-[#B08D57]/20 text-[#D8C3A5] border border-[#B08D57]/40 text-[9px] font-mono uppercase tracking-widest font-semibold rounded-xs">
                    {user.role === 'ADMIN' ? 'Administrator' : user.role === 'BROKER' ? 'RERA Broker' : 'Private Client VIP'}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#E9E1D4]/75">
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-[#B08D57]" />
                    {user.email}
                  </span>
                  {user.phone && (
                    <span className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-[#B08D57]" />
                      {user.phone}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Quick Action Controls */}
            <div className="flex items-center gap-3">
              <Link
                to="/account/favorites"
                className="px-4 py-2 bg-[#1E3A5F] hover:bg-[#1E3A5F]/80 border border-[#1E3A5F] hover:border-[#B08D57] text-xs font-mono text-[#F7F3EA] rounded-xs transition-all flex items-center gap-1.5"
              >
                <Heart className="w-3.5 h-3.5 text-[#B08D57]" />
                <span>Vault ({favorites.length})</span>
              </Link>
              <button
                onClick={handleLogoutClick}
                className="px-4 py-2 bg-[#1E3A5F] hover:bg-red-950/40 border border-[#1E3A5F] hover:border-red-800 text-xs font-mono text-[#E9E1D4]/70 hover:text-red-300 rounded-xs transition-all flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-8 pt-6 border-t border-[#1E3A5F] grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
            <div>
              <span className="text-[10px] text-[#E9E1D4]/60 uppercase block">Saved Residences</span>
              <span className="text-lg font-display text-[#D8C3A5] font-semibold">{favorites.length} Properties</span>
            </div>
            <div>
              <span className="text-[10px] text-[#E9E1D4]/60 uppercase block">Connected Brokers</span>
              <span className="text-lg font-display text-[#F7F3EA] font-semibold">{leads.length} Inquiries</span>
            </div>
            <div>
              <span className="text-[10px] text-[#E9E1D4]/60 uppercase block">Property Alerts</span>
              <span className="text-lg font-display text-[#D8C3A5] font-semibold">{unreadCount} Unread</span>
            </div>
            <div>
              <span className="text-[10px] text-[#E9E1D4]/60 uppercase block">Client Status</span>
              <span className="text-lg font-display text-[#5D7A65] font-semibold">Verified Active</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#E9E1D4] mb-8 font-mono text-xs overflow-x-auto">
          <button
            onClick={() => setActiveTab('details')}
            className={`py-3 px-5 uppercase tracking-wider transition-all whitespace-nowrap ${
              activeTab === 'details'
                ? 'border-b-2 border-[#102A43] text-[#102A43] font-bold'
                : 'text-[#6B7280] hover:text-[#102A43]'
            }`}
          >
            Personal Details
          </button>
          <button
            onClick={() => setActiveTab('favorites')}
            className={`py-3 px-5 uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'favorites'
                ? 'border-b-2 border-[#102A43] text-[#102A43] font-bold'
                : 'text-[#6B7280] hover:text-[#102A43]'
            }`}
          >
            <span>Saved Residences</span>
            <span className="text-[10px] bg-[#102A43] text-[#D8C3A5] px-1.5 py-0.5 rounded-full font-bold">
              {favorites.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`py-3 px-5 uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'inquiries'
                ? 'border-b-2 border-[#102A43] text-[#102A43] font-bold'
                : 'text-[#6B7280] hover:text-[#102A43]'
            }`}
          >
            <span>My Inquiries & Brokers</span>
            <span className="text-[10px] bg-[#B08D57] text-[#102A43] px-1.5 py-0.5 rounded-full font-bold">
              {leads.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`py-3 px-5 uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'notifications'
                ? 'border-b-2 border-[#102A43] text-[#102A43] font-bold'
                : 'text-[#6B7280] hover:text-[#102A43]'
            }`}
          >
            <span>Property Alerts</span>
            {unreadCount > 0 && (
              <span className="text-[10px] bg-red-600 text-white px-1.5 py-0.2 rounded-full font-bold">
                {unreadCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('advisory')}
            className={`py-3 px-5 uppercase tracking-wider transition-all whitespace-nowrap ${
              activeTab === 'advisory'
                ? 'border-b-2 border-[#102A43] text-[#102A43] font-bold'
                : 'text-[#6B7280] hover:text-[#102A43]'
            }`}
          >
            Private Advisory
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`py-3 px-5 uppercase tracking-wider transition-all whitespace-nowrap ${
              activeTab === 'security'
                ? 'border-b-2 border-[#102A43] text-[#102A43] font-bold'
                : 'text-[#6B7280] hover:text-[#102A43]'
            }`}
          >
            Security & Access
          </button>
        </div>

        {/* Tab 1: Personal Details - Warm White card */}
        {activeTab === 'details' && (
          <div className="bg-[#FFFDF8] border border-[#E9E1D4] rounded-sm p-6 sm:p-8 max-w-3xl shadow-sm">
            <div className="mb-6 pb-4 border-b border-[#E9E1D4]">
              <h2 className="font-display text-xl sm:text-2xl text-[#102A43] font-normal">
                Personal & Contact Information
              </h2>
              <p className="text-xs text-[#6B7280] mt-1 font-normal font-ui">
                Keep your details updated so your dedicated luxury specialist can coordinate viewings and confidential briefings.
              </p>
            </div>

            {detailsSuccess && (
              <div className="mb-6 p-4 bg-[#5D7A65]/10 border border-[#5D7A65]/30 text-[#5D7A65] rounded-xs text-xs font-mono flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#5D7A65] shrink-0" />
                <span>Profile details have been updated successfully.</span>
              </div>
            )}

            {detailsError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-300 text-red-900 rounded-xs text-xs font-mono">
                {detailsError}
              </div>
            )}

            <form onSubmit={handleUpdateDetails} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase font-mono tracking-wider text-[#6B7280] mb-2 font-medium">
                    Full Legal Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#6B7280] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#FFFDF8] border border-[#E9E1D4] focus:border-[#B08D57] rounded-xs pl-10 pr-4 py-2.5 text-xs text-[#3E4852] focus:outline-none transition-colors font-ui"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase font-mono tracking-wider text-[#6B7280] mb-2 font-medium">
                    Email Address (Verified)
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#6B7280] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      disabled
                      value={user.email}
                      className="w-full bg-[#F7F3EA] border border-[#E9E1D4] rounded-xs pl-10 pr-4 py-2.5 text-xs text-[#6B7280] cursor-not-allowed font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase font-mono tracking-wider text-[#6B7280] mb-2 font-medium">
                    Phone / WhatsApp Number
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#6B7280] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+971 50 123 4567"
                      className="w-full bg-[#FFFDF8] border border-[#E9E1D4] focus:border-[#B08D57] rounded-xs pl-10 pr-4 py-2.5 text-xs text-[#3E4852] focus:outline-none transition-colors font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase font-mono tracking-wider text-[#6B7280] mb-2 font-medium">
                    Preferred Currency
                  </label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full bg-[#FFFDF8] border border-[#E9E1D4] focus:border-[#B08D57] rounded-xs px-3 py-2.5 text-xs text-[#3E4852] focus:outline-none transition-colors font-mono"
                  >
                    <option value="AED">AED (UAE Dirham)</option>
                    <option value="USD">USD (US Dollar)</option>
                    <option value="EUR">EUR (Euro)</option>
                    <option value="GBP">GBP (British Pound)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-mono tracking-wider text-[#6B7280] mb-2 font-medium">
                  Preferred Advisory Channel
                </label>
                <div className="grid grid-cols-3 gap-3 font-mono text-xs">
                  {['WHATSAPP', 'PHONE', 'EMAIL'].map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setContactMethod(method)}
                      className={`p-2.5 text-center border rounded-xs transition-all ${
                        contactMethod === method
                          ? 'border-[#102A43] bg-[#102A43] text-[#D8C3A5] font-bold'
                          : 'border-[#E9E1D4] bg-[#FFFDF8] text-[#6B7280] hover:text-[#102A43]'
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#E9E1D4] flex justify-end">
                <button
                  type="submit"
                  disabled={isSavingDetails}
                  className="bg-[#102A43] hover:bg-[#1E3A5F] text-[#F7F3EA] px-6 py-3 rounded-xs text-xs font-semibold uppercase tracking-[0.16em] transition-all disabled:opacity-50 flex items-center gap-2 font-ui"
                >
                  {isSavingDetails ? (
                    <span className="inline-block w-4 h-4 border-2 border-[#B08D57] border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <span>Save Changes</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tab 2: Saved Residences */}
        {activeTab === 'favorites' && (
          <div>
            <div className="mb-6 flex justify-between items-baseline">
              <div>
                <h2 className="font-display text-2xl text-[#102A43] font-normal">
                  Your Saved Portfolio ({savedProperties.length})
                </h2>
                <p className="text-xs text-[#6B7280] mt-1 font-normal">
                  Luxury properties saved to your private consideration vault.
                </p>
              </div>
              <Link to="/properties" className="text-xs uppercase text-[#B08D57] font-semibold hover:underline">
                Explore More Residences →
              </Link>
            </div>

            {isLoadingProps ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="aspect-[4/5] bg-[#FFFDF8] animate-pulse border border-[#E9E1D4]" />
                ))}
              </div>
            ) : savedProperties.length === 0 ? (
              <div className="text-center py-20 bg-[#FFFDF8] border border-[#E9E1D4] p-8 shadow-sm">
                <Heart className="w-12 h-12 text-[#B08D57]/40 mx-auto mb-3" />
                <h3 className="font-display text-xl text-[#102A43] mb-1 font-normal">
                  No Saved Properties Yet
                </h3>
                <p className="text-xs text-[#6B7280] max-w-sm mx-auto mb-6">
                  Click the heart icon on any villa or penthouse in our portfolio to add it to your private list.
                </p>
                <Link
                  to="/properties"
                  className="bg-[#102A43] hover:bg-[#0B2135] text-[#FFFDF8] hover:text-[#D8C3A5] px-6 py-2.5 text-xs uppercase tracking-widest font-semibold transition-all inline-flex items-center gap-2 shadow-sm"
                >
                  <span>Browse Prime Properties</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {savedProperties.map((prop) => (
                  <PropertyCard key={prop._id} property={prop} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab: My Inquiries & Connected Brokers */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <div>
                <h2 className="font-display text-2xl text-[#102A43] font-normal">
                  My Inquiries & Connected Brokers ({leads.length})
                </h2>
                <p className="text-xs text-[#6B7280] mt-1 font-normal">
                  Track your private inquiries and stay directly connected with your assigned RERA-licensed advisors.
                </p>
              </div>
              <button
                onClick={loadLeads}
                className="text-xs uppercase text-[#B08D57] font-semibold hover:underline flex items-center gap-1 self-start sm:self-auto"
              >
                <span>Refresh Pipeline</span>
              </button>
            </div>

            {isLoadingLeads ? (
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="h-40 bg-[#FFFDF8] animate-pulse border border-[#E9E1D4]" />
                ))}
              </div>
            ) : leads.length === 0 ? (
              <div className="text-center py-20 bg-[#FFFDF8] border border-[#E9E1D4] p-8 rounded-xs shadow-sm">
                <Building2 className="w-12 h-12 text-[#B08D57]/40 mx-auto mb-3" />
                <h3 className="font-display text-xl text-[#102A43] mb-1 font-normal">
                  No Active Inquiries or Connected Brokers
                </h3>
                <p className="text-xs text-[#6B7280] max-w-md mx-auto mb-6 leading-relaxed">
                  You have not submitted inquiries yet. When you request a private viewing or brochure on any residence, your assigned luxury advisor (such as Elena Rostova) will connect directly to your mandate with live WhatsApp communication and viewing coordination.
                </p>
                <Link
                  to="/properties"
                  className="bg-[#102A43] hover:bg-[#0B2135] text-[#FFFDF8] hover:text-[#D8C3A5] px-6 py-2.5 text-xs uppercase tracking-widest font-semibold transition-all inline-flex items-center gap-2 shadow-sm"
                >
                  <span>Explore Prime Residences</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {leads.map((lead) => {
                  const broker = lead.broker;
                  const brokerUser = broker?.user;
                  const brokerName = brokerUser?.name || 'Elena Rostova';
                  const brokerTitle = broker?.title || 'Senior Private Client Director';
                  const brokerAgency = broker?.agencyName || 'Crestshore Luxury Real Estate LLC';
                  const brokerPhoto = broker?.photoUrl || brokerUser?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80';
                  const brokerPhone = broker?.whatsappNumber || brokerUser?.phone || '+971501123456';
                  const cleanPhone = brokerPhone.replace(/[^0-9+]/g, '');
                  const propTitle = lead.property?.title || 'Dubai Prime Residence';
                  const propCommunity = lead.property?.community || 'Dubai';
                  const propImage = lead.property?.featuredImage || (lead.property?.images && lead.property.images[0]) || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80';
                  const propPrice = lead.property?.priceAED ? `AED ${Number(lead.property.priceAED).toLocaleString()}` : 'Price on Request';

                  const statusColors: Record<string, string> = {
                    NEW: 'bg-blue-50 text-blue-800 border-blue-200',
                    CONTACTED: 'bg-purple-50 text-purple-800 border-purple-200',
                    QUALIFIED: 'bg-amber-50 text-amber-800 border-amber-200',
                    VIEWING: 'bg-emerald-50 text-emerald-800 border-emerald-300 font-bold',
                    NEGOTIATION: 'bg-rose-50 text-rose-800 border-rose-200',
                    CONVERTED: 'bg-emerald-100 text-emerald-900 border-emerald-400 font-bold',
                    CLOSED: 'bg-gray-100 text-gray-800 border-gray-300',
                    LOST: 'bg-gray-50 text-gray-500 border-gray-200'
                  };

                  return (
                    <div
                      key={lead._id}
                      className="bg-[#FFFDF8] border border-[#E9E1D4] rounded-xs shadow-sm overflow-hidden hover:border-[#B08D57]/60 transition-all"
                    >
                      {/* Top Bar - Deep Navy */}
                      <div className="bg-[#102A43] text-[#F7F3EA] px-6 py-3 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                        <div className="flex items-center gap-3">
                          <span className="text-[#D8C3A5] font-bold">
                            {lead.leadId || 'CS-MANDATE'}
                          </span>
                          <span className="text-[#1E3A5F]">|</span>
                          <span className="text-[#E9E1D4]/80 uppercase text-[10px]">
                            {lead.leadType?.replace('_', ' ') || 'INQUIRY'}
                          </span>
                          <span className="text-[#1E3A5F]">|</span>
                          <span className="text-[#E9E1D4]/80 text-[10px]">
                            {new Date(lead.createdAt).toLocaleDateString([], {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] uppercase text-[#E9E1D4]/70">Pipeline Stage:</span>
                          <span
                            className={`px-2 py-0.5 text-[10px] uppercase font-bold border rounded-xs ${
                              statusColors[lead.status] || 'bg-[#F7F3EA] text-[#102A43] border-[#E9E1D4]'
                            }`}
                          >
                            {lead.status}
                          </span>
                        </div>
                      </div>

                      {/* Main Body Grid */}
                      <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
                        {/* Property Preview (5 cols) */}
                        <div className="lg:col-span-5 flex gap-4">
                          <div className="w-28 h-28 sm:w-32 sm:h-32 shrink-0 bg-[#F7F3EA] border border-[#E9E1D4] overflow-hidden rounded-xs">
                            <img
                              src={propImage}
                              alt={propTitle}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex flex-col justify-between py-0.5">
                            <div>
                              <span className="text-[10px] uppercase font-mono tracking-wider text-[#B08D57] font-semibold block">
                                {propCommunity}
                              </span>
                              <h4 className="font-display text-base text-[#102A43] font-normal leading-snug line-clamp-2">
                                {propTitle}
                              </h4>
                              <span className="text-xs font-mono text-[#102A43] font-bold mt-1 block">
                                {propPrice}
                              </span>
                            </div>
                            {lead.property?.slug && (
                              <Link
                                to={`/property/${lead.property.slug}`}
                                className="text-[11px] font-mono uppercase text-[#102A43] hover:text-[#B08D57] font-bold tracking-wider inline-flex items-center gap-1 mt-2"
                              >
                                <span>View Residence</span>
                                <ArrowRight className="w-3 h-3" />
                              </Link>
                            )}
                          </div>
                        </div>

                        {/* Broker Details Card (7 cols) */}
                        <div className="lg:col-span-7 bg-[#FFFDF8] border border-[#E9E1D4] p-4 rounded-xs flex flex-col sm:flex-row justify-between gap-4">
                          <div className="flex gap-3">
                            <div className="w-14 h-14 rounded-full bg-[#102A43] border border-[#B08D57] shrink-0 overflow-hidden">
                              <img
                                src={brokerPhoto}
                                alt={brokerName}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="text-[9px] uppercase font-mono tracking-widest text-[#B08D57] font-semibold">
                                  Designated Advisor
                                </span>
                                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#5D7A65]" title="Active" />
                              </div>
                              <h5 className="font-display text-base text-[#102A43] font-normal">
                                {brokerName}
                              </h5>
                              <p className="text-xs text-[#6B7280] leading-tight">
                                {brokerTitle}
                              </p>
                              <p className="text-[10px] font-mono text-[#6B7280] mt-0.5">
                                {brokerAgency} {broker?.reraNumber ? `• RERA ${broker.reraNumber}` : ''}
                              </p>
                            </div>
                          </div>

                          {/* Action Buttons to connect with broker */}
                          <div className="flex flex-row sm:flex-col justify-center gap-2 shrink-0">
                            <a
                              href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                                `Hi ${brokerName}, I am following up on my inquiry for "${propTitle}" (Ref: ${lead.leadId || ''}).`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1.5 bg-[#5D7A65] hover:bg-[#4d6654] text-white rounded-xs text-[11px] font-semibold tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-sm"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                              <span>WhatsApp</span>
                            </a>
                            <a
                              href={`tel:${cleanPhone}`}
                              className="px-3 py-1.5 bg-[#102A43] hover:bg-[#0B2135] text-[#D8C3A5] rounded-xs text-[11px] font-mono uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all"
                            >
                              <Phone className="w-3 h-3" />
                              <span>Direct Call</span>
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Client Inquired Message & Broker Stage Notes */}
                      <div className="px-6 py-3 bg-[#F7F3EA] border-t border-[#E9E1D4] text-xs space-y-2">
                        {lead.message && (
                          <div className="flex gap-2">
                            <span className="text-[10px] uppercase font-mono text-[#71717A] shrink-0 pt-0.5">
                              Your Request:
                            </span>
                            <span className="italic text-[#52525B]">"{lead.message}"</span>
                          </div>
                        )}
                        {lead.status === 'VIEWING' && (
                          <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xs flex items-center gap-2 font-mono text-xs">
                            <Calendar className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>
                              Private viewing confirmed with advisor <strong>{brokerName}</strong>. Check your WhatsApp/email for tour itinerary.
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Tab: Property Notifications */}
        {activeTab === 'notifications' && (
          <div className="bg-[#FFFDF8] border border-[#E9E1D4] rounded-sm p-6 sm:p-8 max-w-4xl space-y-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E9E1D4] gap-3">
              <div>
                <h2 className="font-display text-xl sm:text-2xl text-[#102A43] font-normal">
                  Property & Mandate Alerts
                </h2>
                <p className="text-xs text-[#6B7280] mt-1 font-normal">
                  Real-time status updates, viewing confirmations, and communications from your luxury broker.
                </p>
              </div>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="bg-[#102A43] text-[#D8C3A5] px-4 py-2 text-xs font-mono uppercase tracking-wider rounded-xs hover:bg-[#0B2135] transition-colors self-start sm:self-auto"
                >
                  Mark All Read ({unreadCount})
                </button>
              )}
            </div>

            {notifications.length === 0 ? (
              <div className="text-center py-16 text-[#6B7280] space-y-2">
                <Bell className="w-10 h-10 text-[#B08D57]/30 mx-auto mb-2" />
                <h3 className="font-display text-lg text-[#102A43] font-normal">No Notifications</h3>
                <p className="text-xs text-[#6B7280] max-w-sm mx-auto">
                  You are all caught up. When a broker updates your inquiry status or schedules a viewing, you will receive real-time notifications here.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {notifications.map((notif) => (
                  <div
                    key={notif._id}
                    onClick={() => {
                      if (!notif.isRead) markAsRead(notif._id);
                    }}
                    className={`p-4 rounded-xs border transition-all cursor-pointer flex items-start gap-4 ${
                      !notif.isRead
                        ? 'bg-[#FFFDF8] border-[#B08D57] shadow-xs'
                        : 'bg-[#F7F3EA]/60 border-[#E9E1D4] text-[#6B7280]'
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                        !notif.isRead
                          ? 'bg-[#102A43] text-[#D8C3A5] border border-[#B08D57]'
                          : 'bg-[#E9E1D4] text-[#6B7280]'
                      }`}
                    >
                      <Bell className="w-4 h-4" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                        <h4
                          className={`font-display text-base ${
                            !notif.isRead ? 'text-[#102A43] font-normal' : 'text-[#6B7280]'
                          }`}
                        >
                          {notif.title}
                        </h4>
                        <div className="flex items-center gap-2">
                          {!notif.isRead && (
                            <span className="w-2 h-2 rounded-full bg-[#B08D57]" title="Unread" />
                          )}
                          <span className="text-[10px] font-mono text-[#6B7280]">
                            {new Date(notif.createdAt).toLocaleDateString([], {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-[#3E4852] leading-relaxed mb-2">
                        {notif.message}
                      </p>

                      <div className="flex items-center gap-3 font-mono text-[10px]">
                        <span className="uppercase text-[#B08D57] font-semibold">
                          {notif.type?.replace('_', ' ') || 'ALERT'}
                        </span>
                        {notif.link && (
                          <Link
                            to={notif.link}
                            className="text-[#102A43] hover:text-[#B08D57] uppercase underline font-semibold"
                          >
                            View Details →
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Advisory & Consultations */}
        {activeTab === 'advisory' && (
          <div className="bg-[#FFFDF8] border border-[#E9E1D4] rounded-sm p-6 sm:p-8 max-w-3xl shadow-sm">
            <div className="mb-6 pb-4 border-b border-[#E9E1D4]">
              <h2 className="font-display text-xl sm:text-2xl text-[#102A43] font-normal">
                Private Advisory & VIP Tour Services
              </h2>
              <p className="text-xs text-[#6B7280] mt-1 font-normal">
                Exclusive off-market acquisition support, confidential private jet tours, and concierge coordination.
              </p>
            </div>

            <div className="space-y-6">
              <div className="p-5 bg-[#F7F3EA] border border-[#E9E1D4] rounded-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#B08D57] font-semibold block mb-1">
                    Off-Market Desk
                  </span>
                  <h3 className="font-display text-lg text-[#102A43] font-normal">
                    Book a Specialist Consultation
                  </h3>
                  <p className="text-xs text-[#6B7280] mt-1">
                    Discuss off-market pocket listings on Palm Jumeirah, Emirates Hills, and Bulgari Lighthouse.
                  </p>
                </div>
                <Link
                  to="/consultation"
                  className="bg-[#102A43] hover:bg-[#0B2135] text-[#D8C3A5] px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap shrink-0 text-center shadow-sm"
                >
                  Schedule Call
                </Link>
              </div>

              <div className="p-5 bg-[#102A43] text-[#F7F3EA] border border-[#1E3A5F] rounded-xs shadow-sm">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#D8C3A5] font-semibold block mb-1">
                  Private Office Contacts
                </span>
                <h3 className="font-display text-lg text-[#F7F3EA] mb-3 font-normal">
                  Direct Specialist Hotline
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-[#E9E1D4]/80">
                  <div>
                    <span className="block text-[10px] text-[#E9E1D4]/60 uppercase">Telephone</span>
                    <span className="text-[#FFFDF8]">+971 4 456 7890</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-[#E9E1D4]/60 uppercase">WhatsApp VIP</span>
                    <span className="text-[#FFFDF8]">+971 50 112 3456</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-[#E9E1D4]/60 uppercase">Private Office</span>
                    <span className="text-[#FFFDF8]">ICD Brookfield Place, DIFC, Dubai</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-[#E9E1D4]/60 uppercase">Hours</span>
                    <span className="text-[#FFFDF8]">Monday – Saturday, 09:00 – 20:00 GST</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Security & Access */}
        {activeTab === 'security' && (
          <div className="bg-[#FFFDF8] border border-[#E9E1D4] rounded-sm p-6 sm:p-8 max-w-3xl shadow-sm">
            <div className="mb-6 pb-4 border-b border-[#E9E1D4]">
              <h2 className="font-display text-xl sm:text-2xl text-[#102A43] font-normal">
                Security & Account Credentials
              </h2>
              <p className="text-xs text-[#6B7280] mt-1 font-normal">
                Manage your confidential password and review your security status.
              </p>
            </div>

            {passSuccess && (
              <div className="mb-6 p-4 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-xs text-xs font-mono flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Password changed successfully. Your account is secure.</span>
              </div>
            )}

            {passError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-300 text-red-900 rounded-xs text-xs font-mono">
                {passError}
              </div>
            )}

            <form onSubmit={handleChangePasswordSubmit} className="space-y-4 max-w-md">
              <div>
                <label className="block text-xs uppercase font-mono tracking-wider text-[#6B7280] mb-1.5 font-medium">
                  Current Password
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-[#6B7280] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full bg-[#FFFDF8] border border-[#E9E1D4] focus:border-[#B08D57] rounded-xs pl-10 pr-10 py-2.5 text-xs text-[#102A43] focus:outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#102A43]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-mono tracking-wider text-[#6B7280] mb-1.5 font-medium">
                  New Password
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Min. 8 characters"
                  className="w-full bg-[#FFFDF8] border border-[#E9E1D4] focus:border-[#B08D57] rounded-xs px-3 py-2.5 text-xs text-[#102A43] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-mono tracking-wider text-[#6B7280] mb-1.5 font-medium">
                  Confirm New Password
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat new password"
                  className="w-full bg-[#FFFDF8] border border-[#E9E1D4] focus:border-[#B08D57] rounded-xs px-3 py-2.5 text-xs text-[#102A43] focus:outline-none transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={isChangingPass}
                className="mt-4 bg-[#102A43] hover:bg-[#0B2135] text-[#D8C3A5] px-6 py-3 rounded-xs text-xs font-semibold uppercase tracking-[0.16em] transition-all disabled:opacity-50 flex items-center gap-2 shadow-sm"
              >
                {isChangingPass ? (
                  <span className="inline-block w-4 h-4 border-2 border-[#D8C3A5] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <span>Update Password</span>
                )}
              </button>
            </form>

            <div className="mt-12 pt-6 border-t border-[#E9E1D4] flex items-center justify-between">
              <div>
                <span className="font-display text-base text-[#102A43] block font-normal">Sign Out of Session</span>
                <span className="text-xs text-[#6B7280]">Terminate this browser session securely.</span>
              </div>
              <button
                onClick={handleLogoutClick}
                className="px-4 py-2 border border-red-300 text-red-700 hover:bg-red-50 text-xs font-mono uppercase tracking-wider rounded-xs transition-colors"
              >
                Log Out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
