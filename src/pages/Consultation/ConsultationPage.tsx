import React, { useState } from 'react';
import { api } from '../../services/api';
import { CheckCircle2, ShieldCheck } from 'lucide-react';

export const ConsultationPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [intent, setIntent] = useState('BUY');
  const [budget, setBudget] = useState('35000000');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [leadRef, setLeadRef] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response: any = await api.submitLead({
        name,
        email,
        mobile,
        leadType: 'CONSULTATION',
        message: `[Intent: ${intent}] [Budget: AED ${Number(budget).toLocaleString()}] ${message}`,
        source: 'WEBSITE'
      });
      setLeadRef(response.leadReference || 'VIP-' + Math.floor(100000 + Math.random() * 900000));
      setIsSuccess(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-28 pb-24 bg-[#F7F3EA] min-h-screen font-ui">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <div className="mb-12 pb-6 border-b border-[#E9E1D4] text-center">
          <span className="text-xs uppercase tracking-[0.25em] text-[#B08D57] font-semibold block mb-2">
            Private Client Engagement
          </span>
          <h1 className="font-display text-4xl sm:text-5xl text-[#102A43] font-normal">
            Book a Private Property Consultation
          </h1>
          <p className="text-xs text-[#6B7280] mt-2 max-w-lg mx-auto">
            Discreet property acquisition advisory, off-market villa mandates, and luxury lifestyle representation across Dubai.
          </p>
        </div>

        <div className="bg-[#FFFDF8] border border-[#E9E1D4] p-8 sm:p-12 shadow-sm">
          {isSuccess ? (
            <div className="text-center py-12 space-y-4">
              <CheckCircle2 className="w-16 h-16 text-[#B08D57] mx-auto" />
              <h4 className="font-display text-3xl font-normal text-[#102A43]">
                Consultation Request Confirmed
              </h4>
              <p className="text-xs text-[#6B7280] max-w-md mx-auto leading-relaxed">
                Your mandate has been assigned reference <span className="font-mono font-bold text-[#102A43]">{leadRef}</span>. A Private Client Partner will review your acquisition criteria and reach out discreetly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 text-xs font-ui">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#102A43] mb-1 font-semibold">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lady Eleanor Sterling"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#FFFDF8] border border-[#E9E1D4] p-3 text-xs text-[#3E4852] focus:outline-none focus:border-[#B08D57]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#102A43] mb-1 font-semibold">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="client@privatewealth.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#FFFDF8] border border-[#E9E1D4] p-3 text-xs text-[#3E4852] focus:outline-none focus:border-[#B08D57]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#102A43] mb-1 font-semibold">
                    Contact Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+971 50 000 0000"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="w-full bg-[#FFFDF8] border border-[#E9E1D4] p-3 text-xs text-[#3E4852] focus:outline-none focus:border-[#B08D57]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#102A43] mb-1 font-semibold">
                    Acquisition Intent
                  </label>
                  <select
                    value={intent}
                    onChange={(e) => setIntent(e.target.value)}
                    className="w-full bg-[#FFFDF8] border border-[#E9E1D4] p-3 text-xs text-[#3E4852] focus:outline-none focus:border-[#B08D57]"
                  >
                    <option value="BUY">Primary Residence Acquisition</option>
                    <option value="INVEST">Capital Growth / Yield Investment</option>
                    <option value="OFF_PLAN">Off-Plan & Branded Allocation</option>
                    <option value="RENT">Ultra-Prime Luxury Lease</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#102A43] mb-1 font-semibold">
                  Approximate Budget Allocation (AED)
                </label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full bg-[#FFFDF8] border border-[#E9E1D4] p-3 text-xs text-[#3E4852] focus:outline-none focus:border-[#B08D57]"
                >
                  <option value="15000000">AED 10M – 20M</option>
                  <option value="35000000">AED 20M – 50M (Prime)</option>
                  <option value="75000000">AED 50M – 100M (Super-Prime)</option>
                  <option value="150000000">AED 100M+ (Ultra-Prime Landmark)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#102A43] mb-1 font-semibold">
                  Confidential Mandate Criteria or Specific Properties of Interest
                </label>
                <textarea
                  rows={4}
                  placeholder="Detail desired locations (e.g. Palm Jumeirah beachfront, Emirates Hills golf view), architectural preferences, and acquisition timeline..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-[#FFFDF8] border border-[#E9E1D4] p-3 text-xs text-[#3E4852] focus:outline-none focus:border-[#B08D57]"
                />
              </div>

              <div className="flex items-center gap-2 text-[10px] text-[#6B7280]">
                <ShieldCheck className="w-4 h-4 text-[#B08D57] shrink-0" />
                <span>Client privacy invariant: Personal information is strictly protected under institutional NDA standards.</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#102A43] hover:bg-[#0B2135] text-[#FFFDF8] hover:text-[#D8C3A5] py-3.5 text-xs uppercase tracking-[0.18em] font-semibold transition-all shadow-sm"
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
export default ConsultationPage;
