import React, { useState } from 'react';
import { api } from '../../services/api';
import { Compass, ShieldCheck, CheckCircle2, Clock, MapPin } from 'lucide-react';

export const ConsultationPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [budget, setBudget] = useState('50000000');
  const [intent, setIntent] = useState('BUY');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [leadRef, setLeadRef] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await api.submitLead({
        name,
        email,
        mobile,
        preferredContactMethod: 'WHATSAPP',
        leadType: 'CONSULTATION',
        estimatedBudgetAED: Number(budget),
        source: 'CAMPAIGN',
        message: `VIP Advisory Request: [Intent: ${intent}] [Budget: AED ${budget}] - ${message}`
      });
      setLeadRef(res.leadReference);
      setIsSuccess(true);
    } catch (err) {
      alert('Consultation request failed. Please contact our desk directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-28 pb-24 bg-[#FDFCF9] min-h-screen">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <div className="mb-12 pb-6 border-b border-[#E5E0D8] text-center">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-semibold block mb-2">
            Private Client Engagement
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-[#18181A] font-light">
            Book a Private Property Consultation
          </h1>
          <p className="text-xs text-[#71717A] mt-2 max-w-lg mx-auto">
            Discreet property acquisition advisory, off-market villa mandates, and luxury lifestyle representation across Dubai.
          </p>
        </div>

        <div className="bg-[#F7F5F0] border border-[#E5E0D8] p-8 sm:p-12 shadow-sm">
          {isSuccess ? (
            <div className="text-center py-12 space-y-4">
              <CheckCircle2 className="w-16 h-16 text-[#C5A880] mx-auto" />
              <h4 className="font-serif text-3xl font-light text-[#18181A]">
                Consultation Request Confirmed
              </h4>
              <p className="text-xs text-[#71717A] max-w-md mx-auto leading-relaxed">
                Your mandate has been assigned reference <span className="font-mono font-bold text-[#18181A]">{leadRef}</span>. A Private Client Partner will review your acquisition criteria and reach out discreetly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 text-xs font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#71717A] mb-1 font-medium">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lady Eleanor Sterling"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#FDFCF9] border border-[#E5E0D8] p-3 text-xs focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#71717A] mb-1 font-medium">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="client@privatewealth.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#FDFCF9] border border-[#E5E0D8] p-3 text-xs focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#71717A] mb-1 font-medium">
                    Contact Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+971 50 000 0000"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="w-full bg-[#FDFCF9] border border-[#E5E0D8] p-3 text-xs focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#71717A] mb-1 font-medium">
                    Acquisition Intent
                  </label>
                  <select
                    value={intent}
                    onChange={(e) => setIntent(e.target.value)}
                    className="w-full bg-[#FDFCF9] border border-[#E5E0D8] p-3 text-xs focus:outline-none focus:border-[#C5A880]"
                  >
                    <option value="BUY">Primary Residence Acquisition</option>
                    <option value="INVEST">Capital Growth / Yield Investment</option>
                    <option value="OFF_PLAN">Off-Plan & Branded Allocation</option>
                    <option value="RENT">Ultra-Prime Luxury Lease</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#71717A] mb-1 font-medium">
                  Approximate Budget Allocation (AED)
                </label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full bg-[#FDFCF9] border border-[#E5E0D8] p-3 text-xs focus:outline-none focus:border-[#C5A880]"
                >
                  <option value="15000000">AED 10M – 20M</option>
                  <option value="35000000">AED 20M – 50M (Prime)</option>
                  <option value="75000000">AED 50M – 100M (Super-Prime)</option>
                  <option value="150000000">AED 100M+ (Ultra-Prime Landmark)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#71717A] mb-1 font-medium">
                  Confidential Mandate Criteria or Specific Properties of Interest
                </label>
                <textarea
                  rows={4}
                  placeholder="Detail desired locations (e.g. Palm Jumeirah beachfront, Emirates Hills golf view), architectural preferences, and acquisition timeline..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-[#FDFCF9] border border-[#E5E0D8] p-3 text-xs focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div className="flex items-center gap-2 text-[10px] text-[#71717A]">
                <ShieldCheck className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span>Client privacy invariant: Personal information is strictly protected under institutional NDA standards.</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#18181A] hover:bg-[#0B0B0C] text-[#F7F5F0] hover:text-[#C5A880] py-3.5 text-xs uppercase tracking-[0.18em] font-semibold transition-all"
              >
                {isSubmitting ? 'Registering Mandate...' : 'Submit Confidential Consultation Request'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
