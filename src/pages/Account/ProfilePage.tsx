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
      <div className="pt-32 pb-24 bg-[#FDFCF9] min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-[#18181A] border border-[#2A2A2E] text-white p-8 sm:p-10 rounded-sm text-center shadow-xl">
          <div className="w-12 h-12 rounded-full bg-[#212124] border border-[#C5A880]/40 flex items-center justify-center mx-auto mb-4 text-[#C5A880]">
            <Compass className="w-6 h-6" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-[#C5A880] block mb-2 font-semibold">
            Private Client Portal
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#FDFCF9] mb-3">
            Authentication Required
          </h2>
          <p className="text-xs text-[#A1A1AA] font-light leading-relaxed mb-6">
            Please sign in to access your personal vault, saved residences, private consultation history, and account settings.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => openAuthModal('login')}
              className="w-full bg-[#C5A880] hover:bg-[#B8976C] text-[#18181A] py-3 rounded-xs text-xs font-bold uppercase tracking-[0.16em] transition-all"
            >
              Sign In to Account
            </button>
            <button
              onClick={() => openAuthModal('register')}
              className="w-full bg-transparent border border-[#2A2A2E] hover:border-[#C5A880] text-white py-3 rounded-xs text-xs font-mono uppercase tracking-[0.16em] transition-all"
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 bg-[#FDFCF9] min-h-screen text-[#18181A]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Executive Profile Header Card */}
        <div className="bg-[#18181A] text-white rounded-sm border border-[#2A2A2E] p-8 sm:p-10 shadow-sm mb-10 relative overflow-hidden">
          {/* Subtle Top Gold Accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8F7453] via-[#C5A880] to-[#E5D2B8]" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            {/* Left: Avatar and Identity */}
            <div className="flex items-center gap-5">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-[#212124] border-2 border-[#C5A880] flex items-center justify-center font-serif text-2xl text-[#C5A880] font-light shadow-md overflow-hidden">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <span>{user.name.charAt(0).toUpperCase()}</span>
                  )}
                </div>
                <div className="absolute -bottom-1 -right-1 bg-[#C5A880] text-[#18181A] p-1 rounded-full" title="Verified Client">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="font-serif text-2xl sm:text-3xl text-white font-light">
                    {user.name}
                  </h1>
                  <span className="px-2 py-0.5 bg-[#C5A880]/20 text-[#C5A880] border border-[#C5A880]/40 text-[9px] font-mono uppercase tracking-widest font-semibold rounded-xs">
                    {user.role === 'ADMIN' ? 'Administrator' : user.role === 'BROKER' ? 'RERA Broker' : 'Private Client VIP'}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#A1A1AA]">
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-[#C5A880]" />
                    {user.email}
                  </span>
                  {user.phone && (
                    <span className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
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
                className="px-4 py-2 bg-[#212124] hover:bg-[#2A2A2E] border border-[#2A2A2E] hover:border-[#C5A880] text-xs font-mono text-[#F7F5F0] rounded-xs transition-all flex items-center gap-1.5"
              >
                <Heart className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Vault ({favorites.length})</span>
              </Link>
              <button
                onClick={handleLogoutClick}
                className="px-4 py-2 bg-[#212124] hover:bg-red-950/40 border border-[#2A2A2E] hover:border-red-800 text-xs font-mono text-[#A1A1AA] hover:text-red-300 rounded-xs transition-all flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-8 pt-6 border-t border-[#2A2A2E] grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
            <div>
              <span className="text-[10px] text-[#A1A1AA] uppercase block">Saved Residences</span>
              <span className="text-lg font-serif text-[#C5A880] font-medium">{favorites.length} Properties</span>
            </div>
            <div>
              <span className="text-[10px] text-[#A1A1AA] uppercase block">Connected Brokers</span>
              <span className="text-lg font-serif text-white font-medium">{leads.length} Inquiries</span>
            </div>
            <div>
              <span className="text-[10px] text-[#A1A1AA] uppercase block">Property Alerts</span>
              <span className="text-lg font-serif text-[#C5A880] font-medium">{unreadCount} Unread</span>
            </div>
            <div>
              <span className="text-[10px] text-[#A1A1AA] uppercase block">Client Status</span>
              <span className="text-lg font-serif text-white font-medium">Verified Active</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#E5E0D8] mb-8 font-mono text-xs overflow-x-auto">
          <button
            onClick={() => setActiveTab('details')}
            className={`py-3 px-5 uppercase tracking-wider transition-all whitespace-nowrap ${
              activeTab === 'details'
                ? 'border-b-2 border-[#18181A] text-[#18181A] font-bold'
                : 'text-[#71717A] hover:text-[#18181A]'
            }`}
          >
            Personal Details
          </button>
          <button
            onClick={() => setActiveTab('favorites')}
            className={`py-3 px-5 uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'favorites'
                ? 'border-b-2 border-[#18181A] text-[#18181A] font-bold'
                : 'text-[#71717A] hover:text-[#18181A]'
            }`}
          >
            <span>Saved Residences</span>
            <span className="text-[10px] bg-[#18181A] text-[#C5A880] px-1.5 py-0.5 rounded-full">
              {favorites.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`py-3 px-5 uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'inquiries'
                ? 'border-b-2 border-[#18181A] text-[#18181A] font-bold'
                : 'text-[#71717A] hover:text-[#18181A]'
            }`}
          >
            <span>My Inquiries & Brokers</span>
            <span className="text-[10px] bg-[#C5A880] text-[#18181A] px-1.5 py-0.5 rounded-full font-bold">
              {leads.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`py-3 px-5 uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'notifications'
                ? 'border-b-2 border-[#18181A] text-[#18181A] font-bold'
                : 'text-[#71717A] hover:text-[#18181A]'
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
                ? 'border-b-2 border-[#18181A] text-[#18181A] font-bold'
                : 'text-[#71717A] hover:text-[#18181A]'
            }`}
          >
            Private Advisory
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`py-3 px-5 uppercase tracking-wider transition-all whitespace-nowrap ${
              activeTab === 'security'
                ? 'border-b-2 border-[#18181A] text-[#18181A] font-bold'
                : 'text-[#71717A] hover:text-[#18181A]'
            }`}
          >
            Security & Access
          </button>
        </div>

        {/* Tab 1: Personal Details */}
        {activeTab === 'details' && (
          <div className="bg-white border border-[#E5E0D8] rounded-sm p-6 sm:p-8 max-w-3xl">
            <div className="mb-6 pb-4 border-b border-[#E5E0D8]">
              <h2 className="font-serif text-xl sm:text-2xl text-[#18181A] font-light">
                Personal & Contact Information
              </h2>
              <p className="text-xs text-[#71717A] mt-1 font-light">
                Keep your details updated so your dedicated luxury specialist can coordinate viewings and confidential briefings.
              </p>
            </div>

            {detailsSuccess && (
              <div className="mb-6 p-4 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-xs text-xs font-mono flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
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
                  <label className="block text-xs uppercase font-mono tracking-wider text-[#71717A] mb-2">
                    Full Legal Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#71717A] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#FDFCF9] border border-[#E5E0D8] focus:border-[#C5A880] rounded-xs pl-10 pr-4 py-2.5 text-xs text-[#18181A] focus:outline-none transition-colors font-sans"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase font-mono tracking-wider text-[#71717A] mb-2">
                    Email Address (Verified)
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#71717A] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      disabled
                      value={user.email}
                      className="w-full bg-[#F7F5F0] border border-[#E5E0D8] rounded-xs pl-10 pr-4 py-2.5 text-xs text-[#71717A] cursor-not-allowed font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase font-mono tracking-wider text-[#71717A] mb-2">
                    Phone / WhatsApp Number
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#71717A] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+971 50 123 4567"
                      className="w-full bg-[#FDFCF9] border border-[#E5E0D8] focus:border-[#C5A880] rounded-xs pl-10 pr-4 py-2.5 text-xs text-[#18181A] focus:outline-none transition-colors font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase font-mono tracking-wider text-[#71717A] mb-2">
                    Preferred Currency
                  </label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full bg-[#FDFCF9] border border-[#E5E0D8] focus:border-[#C5A880] rounded-xs px-3 py-2.5 text-xs text-[#18181A] focus:outline-none transition-colors font-mono"
                  >
                    <option value="AED">AED (UAE Dirham)</option>
                    <option value="USD">USD (US Dollar)</option>
                    <option value="EUR">EUR (Euro)</option>
                    <option value="GBP">GBP (British Pound)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-mono tracking-wider text-[#71717A] mb-2">
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
                          ? 'border-[#18181A] bg-[#18181A] text-[#C5A880] font-bold'
                          : 'border-[#E5E0D8] bg-[#F7F5F0] text-[#71717A] hover:text-[#18181A]'
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#E5E0D8] flex justify-end">
                <button
                  type="submit"
                  disabled={isSavingDetails}
                  className="bg-[#18181A] hover:bg-[#2A2A2E] text-[#C5A880] px-6 py-3 rounded-xs text-xs font-bold uppercase tracking-[0.16em] transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  {isSavingDetails ? (
                    <span className="inline-block w-4 h-4 border-2 border-[#C5A880] border-t-transparent rounded-full animate-spin" />
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
                <h2 className="font-serif text-2xl text-[#18181A] font-light">
                  Your Saved Portfolio ({savedProperties.length})
                </h2>
                <p className="text-xs text-[#71717A] mt-1 font-light">
                  Luxury properties saved to your private consideration vault.
                </p>
              </div>
              <Link to="/properties" className="text-xs uppercase font-mono text-[#C5A880] font-bold hover:underline">
                Explore More Residences →
              </Link>
            </div>

            {isLoadingProps ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="aspect-[4/5] bg-[#F7F5F0] animate-pulse border border-[#E5E0D8]" />
                ))}
              </div>
            ) : savedProperties.length === 0 ? (
              <div className="text-center py-20 bg-white border border-[#E5E0D8] p-8">
                <Heart className="w-12 h-12 text-[#C5A880]/30 mx-auto mb-3" />
                <h3 className="font-serif text-xl text-[#18181A] mb-1 font-light">
                  No Saved Properties Yet
                </h3>
                <p className="text-xs text-[#71717A] max-w-sm mx-auto mb-6">
                  Click the heart icon on any villa or penthouse in our portfolio to add it to your private list.
                </p>
                <Link
                  to="/properties"
                  className="bg-[#18181A] text-[#F7F5F0] hover:text-[#C5A880] px-6 py-2.5 text-xs uppercase tracking-widest font-semibold transition-all inline-flex items-center gap-2"
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
                <h2 className="font-serif text-2xl text-[#18181A] font-light">
                  My Inquiries & Connected Brokers ({leads.length})
                </h2>
                <p className="text-xs text-[#71717A] mt-1 font-light">
                  Track your private inquiries and stay directly connected with your assigned RERA-licensed advisors.
                </p>
              </div>
              <button
                onClick={loadLeads}
                className="text-xs uppercase font-mono text-[#C5A880] font-bold hover:underline flex items-center gap-1 self-start sm:self-auto"
              >
                <span>Refresh Pipeline</span>
              </button>
            </div>

            {isLoadingLeads ? (
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="h-40 bg-[#F7F5F0] animate-pulse border border-[#E5E0D8]" />
                ))}
              </div>
            ) : leads.length === 0 ? (
              <div className="text-center py-20 bg-white border border-[#E5E0D8] p-8 rounded-xs">
                <Building2 className="w-12 h-12 text-[#C5A880]/40 mx-auto mb-3" />
                <h3 className="font-serif text-xl text-[#18181A] mb-1 font-light">
                  No Active Inquiries or Connected Brokers
                </h3>
                <p className="text-xs text-[#71717A] max-w-md mx-auto mb-6 leading-relaxed">
                  You have not submitted inquiries yet. When you request a private viewing or brochure on any residence, your assigned luxury advisor (such as Elena Rostova) will connect directly to your mandate with live WhatsApp communication and viewing coordination.
                </p>
                <Link
                  to="/properties"
                  className="bg-[#18181A] text-[#F7F5F0] hover:text-[#C5A880] px-6 py-2.5 text-xs uppercase tracking-widest font-semibold transition-all inline-flex items-center gap-2"
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
                  const brokerAgency = broker?.agencyName || 'Nestandkey Luxury Real Estate LLC';
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
                      className="bg-white border border-[#E5E0D8] rounded-xs shadow-sm overflow-hidden hover:border-[#C5A880]/60 transition-all"
                    >
                      {/* Top Bar */}
                      <div className="bg-[#18181A] text-white px-6 py-3 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                        <div className="flex items-center gap-3">
                          <span className="text-[#C5A880] font-bold">
                            {lead.leadId || 'NK-MANDATE'}
                          </span>
                          <span className="text-[#71717A]">|</span>
                          <span className="text-[#A1A1AA] uppercase text-[10px]">
                            {lead.leadType?.replace('_', ' ') || 'INQUIRY'}
                          </span>
                          <span className="text-[#71717A]">|</span>
                          <span className="text-[#A1A1AA] text-[10px]">
                            {new Date(lead.createdAt).toLocaleDateString([], {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] uppercase text-[#71717A]">Pipeline Stage:</span>
                          <span
                            className={`px-2 py-0.5 text-[10px] uppercase font-bold border rounded-xs ${
                              statusColors[lead.status] || 'bg-neutral-100 text-neutral-800 border-neutral-300'
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
                          <div className="w-28 h-28 sm:w-32 sm:h-32 shrink-0 bg-[#F7F5F0] border border-[#E5E0D8] overflow-hidden rounded-xs">
                            <img
                              src={propImage}
                              alt={propTitle}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex flex-col justify-between py-0.5">
                            <div>
                              <span className="text-[10px] uppercase font-mono tracking-wider text-[#C5A880] font-semibold block">
                                {propCommunity}
                              </span>
                              <h4 className="font-serif text-base text-[#18181A] font-medium leading-snug line-clamp-2">
                                {propTitle}
                              </h4>
                              <span className="text-xs font-mono text-[#18181A] font-bold mt-1 block">
                                {propPrice}
                              </span>
                            </div>
                            {lead.property?.slug && (
                              <Link
                                to={`/property/${lead.property.slug}`}
                                className="text-[11px] font-mono uppercase text-[#18181A] hover:text-[#C5A880] font-bold tracking-wider inline-flex items-center gap-1 mt-2"
                              >
                                <span>View Residence</span>
                                <ArrowRight className="w-3 h-3" />
                              </Link>
                            )}
                          </div>
                        </div>

                        {/* Broker Details Card (7 cols) */}
                        <div className="lg:col-span-7 bg-[#FDFCF9] border border-[#E5E0D8] p-4 rounded-xs flex flex-col sm:flex-row justify-between gap-4">
                          <div className="flex gap-3">
                            <div className="w-14 h-14 rounded-full bg-[#18181A] border border-[#C5A880] shrink-0 overflow-hidden">
                              <img
                                src={brokerPhoto}
                                alt={brokerName}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="text-[9px] uppercase font-mono tracking-widest text-[#C5A880] font-semibold">
                                  Designated Advisor
                                </span>
                                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" title="Active" />
                              </div>
                              <h5 className="font-serif text-base text-[#18181A] font-medium">
                                {brokerName}
                              </h5>
                              <p className="text-xs text-[#71717A] leading-tight">
                                {brokerTitle}
                              </p>
                              <p className="text-[10px] font-mono text-[#A1A1AA] mt-0.5">
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
                              className="px-3 py-1.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-xs text-[11px] font-semibold tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-sm"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                              <span>WhatsApp</span>
                            </a>
                            <a
                              href={`tel:${cleanPhone}`}
                              className="px-3 py-1.5 bg-[#18181A] hover:bg-[#2A2A2E] text-[#C5A880] rounded-xs text-[11px] font-mono uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all"
                            >
                              <Phone className="w-3 h-3" />
                              <span>Direct Call</span>
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Client Inquired Message & Broker Stage Notes */}
                      <div className="px-6 py-3 bg-[#F7F5F0] border-t border-[#E5E0D8] text-xs space-y-2">
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
          <div className="bg-white border border-[#E5E0D8] rounded-sm p-6 sm:p-8 max-w-4xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E5E0D8] gap-3">
              <div>
                <h2 className="font-serif text-xl sm:text-2xl text-[#18181A] font-light">
                  Property & Mandate Alerts
                </h2>
                <p className="text-xs text-[#71717A] mt-1 font-light">
                  Real-time status updates, viewing confirmations, and communications from your luxury broker.
                </p>
              </div>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="bg-[#18181A] text-[#C5A880] px-4 py-2 text-xs font-mono uppercase tracking-wider rounded-xs hover:bg-[#2A2A2E] transition-colors self-start sm:self-auto"
                >
                  Mark All Read ({unreadCount})
                </button>
              )}
            </div>

            {notifications.length === 0 ? (
              <div className="text-center py-16 text-[#71717A] space-y-2">
                <Bell className="w-10 h-10 text-[#C5A880]/30 mx-auto mb-2" />
                <h3 className="font-serif text-lg text-[#18181A] font-light">No Notifications</h3>
                <p className="text-xs text-[#71717A] max-w-sm mx-auto">
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
                        ? 'bg-[#FDFCF9] border-[#C5A880] shadow-xs'
                        : 'bg-[#F7F5F0]/60 border-[#E5E0D8] text-[#71717A]'
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                        !notif.isRead
                          ? 'bg-[#18181A] text-[#C5A880] border border-[#C5A880]'
                          : 'bg-[#E5E0D8] text-[#71717A]'
                      }`}
                    >
                      <Bell className="w-4 h-4" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                        <h4
                          className={`font-serif text-base ${
                            !notif.isRead ? 'text-[#18181A] font-medium' : 'text-[#52525B]'
                          }`}
                        >
                          {notif.title}
                        </h4>
                        <div className="flex items-center gap-2">
                          {!notif.isRead && (
                            <span className="w-2 h-2 rounded-full bg-[#C5A880]" title="Unread" />
                          )}
                          <span className="text-[10px] font-mono text-[#71717A]">
                            {new Date(notif.createdAt).toLocaleDateString([], {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-[#52525B] leading-relaxed mb-2">
                        {notif.message}
                      </p>

                      <div className="flex items-center gap-3 font-mono text-[10px]">
                        <span className="uppercase text-[#C5A880] font-semibold">
                          {notif.type?.replace('_', ' ') || 'ALERT'}
                        </span>
                        {notif.link && (
                          <Link
                            to={notif.link}
                            className="text-[#18181A] hover:text-[#C5A880] uppercase underline font-semibold"
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
          <div className="bg-white border border-[#E5E0D8] rounded-sm p-6 sm:p-8 max-w-3xl">
            <div className="mb-6 pb-4 border-b border-[#E5E0D8]">
              <h2 className="font-serif text-xl sm:text-2xl text-[#18181A] font-light">
                Private Advisory & VIP Tour Services
              </h2>
              <p className="text-xs text-[#71717A] mt-1 font-light">
                Exclusive off-market acquisition support, confidential private jet tours, and concierge coordination.
              </p>
            </div>

            <div className="space-y-6">
              <div className="p-5 bg-[#F7F5F0] border border-[#E5E0D8] rounded-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#C5A880] font-semibold block mb-1">
                    Off-Market Desk
                  </span>
                  <h3 className="font-serif text-lg text-[#18181A]">
                    Book a Specialist Consultation
                  </h3>
                  <p className="text-xs text-[#71717A] mt-1">
                    Discuss off-market pocket listings on Palm Jumeirah, Emirates Hills, and Bulgari Lighthouse.
                  </p>
                </div>
                <Link
                  to="/consultation"
                  className="bg-[#18181A] hover:bg-[#2A2A2E] text-[#C5A880] px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap shrink-0 text-center"
                >
                  Schedule Call
                </Link>
              </div>

              <div className="p-5 bg-[#18181A] text-white border border-[#2A2A2E] rounded-xs">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#C5A880] font-semibold block mb-1">
                  Private Office Contacts
                </span>
                <h3 className="font-serif text-lg text-white mb-3">
                  Direct Specialist Hotline
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-[#A1A1AA]">
                  <div>
                    <span className="block text-[10px] text-[#71717A] uppercase">Telephone</span>
                    <span className="text-white">+971 4 456 7890</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-[#71717A] uppercase">WhatsApp VIP</span>
                    <span className="text-white">+971 50 112 3456</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-[#71717A] uppercase">Private Office</span>
                    <span className="text-white">ICD Brookfield Place, DIFC, Dubai</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-[#71717A] uppercase">Hours</span>
                    <span className="text-white">Monday – Saturday, 09:00 – 20:00 GST</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Security & Access */}
        {activeTab === 'security' && (
          <div className="bg-white border border-[#E5E0D8] rounded-sm p-6 sm:p-8 max-w-3xl">
            <div className="mb-6 pb-4 border-b border-[#E5E0D8]">
              <h2 className="font-serif text-xl sm:text-2xl text-[#18181A] font-light">
                Security & Account Credentials
              </h2>
              <p className="text-xs text-[#71717A] mt-1 font-light">
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
                <label className="block text-xs uppercase font-mono tracking-wider text-[#71717A] mb-1.5">
                  Current Password
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-[#71717A] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full bg-[#FDFCF9] border border-[#E5E0D8] focus:border-[#C5A880] rounded-xs pl-10 pr-10 py-2.5 text-xs text-[#18181A] focus:outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#71717A] hover:text-[#18181A]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase font-mono tracking-wider text-[#71717A] mb-1.5">
                  New Password
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Min. 8 characters"
                  className="w-full bg-[#FDFCF9] border border-[#E5E0D8] focus:border-[#C5A880] rounded-xs px-3 py-2.5 text-xs text-[#18181A] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-mono tracking-wider text-[#71717A] mb-1.5">
                  Confirm New Password
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat new password"
                  className="w-full bg-[#FDFCF9] border border-[#E5E0D8] focus:border-[#C5A880] rounded-xs px-3 py-2.5 text-xs text-[#18181A] focus:outline-none transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={isChangingPass}
                className="mt-4 bg-[#18181A] hover:bg-[#2A2A2E] text-[#C5A880] px-6 py-3 rounded-xs text-xs font-bold uppercase tracking-[0.16em] transition-all disabled:opacity-50 flex items-center gap-2"
              >
                {isChangingPass ? (
                  <span className="inline-block w-4 h-4 border-2 border-[#C5A880] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <span>Update Password</span>
                )}
              </button>
            </form>

            <div className="mt-12 pt-6 border-t border-[#E5E0D8] flex items-center justify-between">
              <div>
                <span className="font-serif text-base text-[#18181A] block">Sign Out of Session</span>
                <span className="text-xs text-[#71717A]">Terminate this browser session securely.</span>
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
