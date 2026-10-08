import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import {
  Building2,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  UploadCloud,
  DollarSign,
  MapPin,
  Calendar
} from 'lucide-react';
import { SpeakAdvisorModal } from '../../components/common/SpeakAdvisorModal';

export const SellPropertyPage: React.FC = () => {
  const { user } = useAuth();
  const { fetchNotifications } = useNotifications();

  const [isAdvisorModalOpen, setIsAdvisorModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [referenceId, setReferenceId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    ownerName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    community: 'Palm Jumeirah',
    propertyType: 'Villa',
    bedrooms: '5',
    builtUpAreaSqFt: '',
    askingPriceAED: '',
    propertyTitle: '',
    description: '',
    preferredTimeline: 'Immediate (0-30 Days)'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.ownerName || !formData.email || !formData.phone || !formData.askingPriceAED) {
      setErrorMessage('Please complete all required fields.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response: any = await api.submitLead({
        name: formData.ownerName,
        email: formData.email.trim().toLowerCase(),
        mobile: formData.phone,
        preferredContactMethod: 'WHATSAPP',
        leadType: 'INQUIRY',
        message: `[SELL MANDATE] ${formData.propertyTitle || formData.propertyType} in ${formData.community} | Asking: AED ${formData.askingPriceAED} | Beds: ${formData.bedrooms} | Area: ${formData.builtUpAreaSqFt || 'N/A'} sq.ft | Timeline: ${formData.preferredTimeline}. Description: ${formData.description}`,
        source: 'SELL_SUBMISSION'
      });

      setReferenceId(response.leadReference || `LIST-${Math.floor(1000 + Math.random() * 9000)}`);
      setIsSuccess(true);
      fetchNotifications();
    } catch (err: any) {
      setErrorMessage(err.message || 'Unable to submit listing mandate. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#F7F3EA] text-[#3E4852] font-ui pt-24 min-h-screen">
      {/* Header */}
      <section className="bg-[#102A43] text-[#F7F3EA] py-16 px-6 lg:px-12 border-b border-[#1E3A5F]">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="text-[10px] uppercase tracking-[0.28em] text-[#D8C3A5] font-mono font-semibold">
            Private Representation
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-light text-[#F7F3EA]">
            List Your Property with Crestshore
          </h1>
          <p className="text-xs sm:text-sm text-[#E9E1D4] font-light max-w-2xl mx-auto leading-relaxed">
            Discreet, international representation for prime Dubai villas, penthouses, and signature estates. Access verified global collectors, sovereign wealth funds, and private buyers.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        {isSuccess ? (
          <div className="bg-[#FFFDF8] border border-[#E9E1D4] p-10 text-center space-y-5 shadow-sm animate-in fade-in">
            <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-widest text-[#B08D57] font-mono font-semibold block">
                Reference Code: {referenceId}
              </span>
              <h2 className="font-display text-3xl text-[#102A43] mt-2">Listing Mandate Received</h2>
              <p className="text-xs text-[#3E4852] font-light mt-3 max-w-md mx-auto leading-relaxed">
                Thank you, {formData.ownerName}. Your property has been placed into our confidential listing review queue. A Crestshore private client director will contact you within 24 hours to schedule an inspection and discuss valuation strategy.
              </p>
            </div>
            <div className="pt-4 flex justify-center gap-4">
              <Link
                to="/properties"
                className="px-6 py-2.5 bg-[#102A43] hover:bg-[#1E3A5F] text-[#FFFDF8] text-xs uppercase tracking-wider font-semibold shadow-sm"
              >
                Browse Current Portfolio
              </Link>
              <button
                onClick={() => {
                  setIsSuccess(false);
                  setFormData({
                    ownerName: '',
                    email: '',
                    phone: '',
                    community: 'Palm Jumeirah',
                    propertyType: 'Villa',
                    bedrooms: '5',
                    builtUpAreaSqFt: '',
                    askingPriceAED: '',
                    propertyTitle: '',
                    description: '',
                    preferredTimeline: 'Immediate (0-30 Days)'
                  });
                }}
                className="px-6 py-2.5 border border-[#E9E1D4] bg-[#FFFDF8] text-[#102A43] text-xs uppercase tracking-wider hover:border-[#B08D57]"
              >
                Submit Another Property
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-[#FFFDF8] border border-[#E9E1D4] p-8 sm:p-12 shadow-sm space-y-8">
            <div className="border-b border-[#E9E1D4] pb-4">
              <h2 className="font-display text-2xl text-[#102A43]">Property Details & Valuation Request</h2>
              <p className="text-xs text-[#6B7280] mt-1">
                Provide preliminary details about your property. All submissions are held in strict commercial confidence.
              </p>
            </div>

            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 text-xs">
              {/* Row 1: Owner Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#6B7280] font-mono mb-1">
                    Owner / Representative Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Full Legal Name"
                    value={formData.ownerName}
                    onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                    className="w-full bg-[#F7F3EA] border border-[#E9E1D4] px-3 py-2.5 text-xs text-[#102A43] focus:outline-none focus:border-[#B08D57]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#6B7280] font-mono mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="contact@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#F7F3EA] border border-[#E9E1D4] px-3 py-2.5 text-xs text-[#102A43] focus:outline-none focus:border-[#B08D57]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#6B7280] font-mono mb-1">
                    Contact Phone (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+971 50 000 0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#F7F3EA] border border-[#E9E1D4] px-3 py-2.5 text-xs text-[#102A43] focus:outline-none focus:border-[#B08D57]"
                  />
                </div>
              </div>

              {/* Row 2: Location & Type */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#6B7280] font-mono mb-1">
                    Location / Community *
                  </label>
                  <select
                    value={formData.community}
                    onChange={(e) => setFormData({ ...formData, community: e.target.value })}
                    className="w-full bg-[#F7F3EA] border border-[#E9E1D4] px-3 py-2.5 text-xs text-[#102A43] focus:outline-none focus:border-[#B08D57]"
                  >
                    <option value="Palm Jumeirah">Palm Jumeirah</option>
                    <option value="Emirates Hills">Emirates Hills</option>
                    <option value="Jumeirah Bay Island">Jumeirah Bay Island</option>
                    <option value="Dubai Hills Estate">Dubai Hills Estate</option>
                    <option value="Downtown Dubai">Downtown Dubai</option>
                    <option value="Dubai Marina">Dubai Marina</option>
                    <option value="DIFC">DIFC</option>
                    <option value="Jumeirah Golf Estates">Jumeirah Golf Estates</option>
                    <option value="Other Dubai Enclave">Other Dubai Enclave</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#6B7280] font-mono mb-1">
                    Property Type *
                  </label>
                  <select
                    value={formData.propertyType}
                    onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                    className="w-full bg-[#F7F3EA] border border-[#E9E1D4] px-3 py-2.5 text-xs text-[#102A43] focus:outline-none focus:border-[#B08D57]"
                  >
                    <option value="Villa">Signature Villa</option>
                    <option value="Mansion">Super-Mansion</option>
                    <option value="Penthouse">Sky Penthouse</option>
                    <option value="Apartment">Luxury Apartment</option>
                    <option value="Townhouse">Townhouse</option>
                    <option value="Plot">Residential Plot</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#6B7280] font-mono mb-1">
                    Bedrooms *
                  </label>
                  <select
                    value={formData.bedrooms}
                    onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                    className="w-full bg-[#F7F3EA] border border-[#E9E1D4] px-3 py-2.5 text-xs text-[#102A43] focus:outline-none focus:border-[#B08D57]"
                  >
                    <option value="1">1 Bedroom</option>
                    <option value="2">2 Bedrooms</option>
                    <option value="3">3 Bedrooms</option>
                    <option value="4">4 Bedrooms</option>
                    <option value="5">5 Bedrooms</option>
                    <option value="6">6 Bedrooms</option>
                    <option value="7+">7+ Bedrooms / Estate</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Pricing & Area */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#6B7280] font-mono mb-1">
                    Target Asking Price (AED) *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 25000000"
                    value={formData.askingPriceAED}
                    onChange={(e) => setFormData({ ...formData, askingPriceAED: e.target.value })}
                    className="w-full bg-[#F7F3EA] border border-[#E9E1D4] px-3 py-2.5 text-xs text-[#102A43] font-mono focus:outline-none focus:border-[#B08D57]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#6B7280] font-mono mb-1">
                    Built-Up Area (Sq.Ft)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 7500"
                    value={formData.builtUpAreaSqFt}
                    onChange={(e) => setFormData({ ...formData, builtUpAreaSqFt: e.target.value })}
                    className="w-full bg-[#F7F3EA] border border-[#E9E1D4] px-3 py-2.5 text-xs text-[#102A43] font-mono focus:outline-none focus:border-[#B08D57]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#6B7280] font-mono mb-1">
                    Preferred Timeline
                  </label>
                  <select
                    value={formData.preferredTimeline}
                    onChange={(e) => setFormData({ ...formData, preferredTimeline: e.target.value })}
                    className="w-full bg-[#F7F3EA] border border-[#E9E1D4] px-3 py-2.5 text-xs text-[#102A43] focus:outline-none focus:border-[#B08D57]"
                  >
                    <option value="Immediate (0-30 Days)">Immediate (0-30 Days)</option>
                    <option value="1-3 Months">1-3 Months</option>
                    <option value="Flexible / Off-Market Only">Flexible / Off-Market Only</option>
                  </select>
                </div>
              </div>

              {/* Description & Overview */}
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#6B7280] font-mono mb-1">
                  Property Highlights & Architectural Upgrades (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Private beach access, full Italian marble refurbishment, private infinity pool, custom lighting..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-[#F7F3EA] border border-[#E9E1D4] p-3 text-xs text-[#102A43] focus:outline-none focus:border-[#B08D57]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-[#102A43] hover:bg-[#1E3A5F] text-[#FFFDF8] text-xs uppercase tracking-wider font-semibold transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <span>{isSubmitting ? 'Registering Mandate...' : 'Submit Property for Representation'}</span>
                  <ArrowRight className="w-4 h-4 text-[#B08D57]" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#6B7280] pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#B08D57]" />
                <span>Strictly private. We never publish listing details without owner approval and RERA permits.</span>
              </div>
            </form>
          </div>
        )}
      </div>

      <SpeakAdvisorModal
        isOpen={isAdvisorModalOpen}
        onClose={() => setIsAdvisorModalOpen(false)}
        defaultTopic="Selling / Listing Representation"
      />
    </div>
  );
};
